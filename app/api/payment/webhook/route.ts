import { NextRequest, NextResponse } from 'next/server';
import { midtransService } from '@/lib/midtrans';

/**
 * Midtrans Webhook Handler
 * This endpoint receives payment notifications from Midtrans
 * Configure this URL in Midtrans Dashboard: Settings > Configuration > Payment Notification URL
 *
 * URL should be: https://your-domain.com/api/payment/webhook
 */
export async function POST(request: NextRequest) {
  try {
    const notification = await request.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      payment_type,
    } = notification;

    console.log('Received notification:', {
      order_id,
      transaction_status,
      payment_type,
    });

    // Verify signature
    const isValid = midtransService.verifySignature(
      order_id,
      status_code,
      gross_amount,
      signature_key
    );

    if (!isValid) {
      console.error('Invalid signature for order:', order_id);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 403 }
      );
    }

    // Handle different transaction statuses
    let orderStatus = 'pending';

    if (transaction_status === 'capture') {
      if (fraud_status === 'accept') {
        orderStatus = 'success';
      }
    } else if (transaction_status === 'settlement') {
      orderStatus = 'success';
    } else if (
      transaction_status === 'cancel' ||
      transaction_status === 'deny' ||
      transaction_status === 'expire'
    ) {
      orderStatus = 'failed';
    } else if (transaction_status === 'pending') {
      orderStatus = 'pending';
    }

    // TODO: Update your database here
    // Example:
    // await db.orders.update({
    //   where: { orderId: order_id },
    //   data: {
    //     status: orderStatus,
    //     transactionStatus: transaction_status,
    //     paymentType: payment_type,
    //     updatedAt: new Date(),
    //   },
    // });

    console.log(`Order ${order_id} status updated to: ${orderStatus}`);

    // Send confirmation email to customer if payment is successful
    if (orderStatus === 'success') {
      // TODO: Send email notification
      console.log(`Sending confirmation email for order: ${order_id}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Notification processed',
    });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process notification' },
      { status: 500 }
    );
  }
}
