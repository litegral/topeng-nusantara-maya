import { NextRequest, NextResponse } from 'next/server';
import { midtransService } from '@/lib/midtrans';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      orderId,
      amount,
      paymentType,
      paymentMethod,
      customerDetails,
    } = body;

    // Validate required fields
    if (!orderId || !amount || !paymentType || !customerDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transactionDetails = {
      order_id: orderId,
      gross_amount: amount,
    };

    const customer = {
      first_name: customerDetails.name,
      email: customerDetails.email,
      phone: customerDetails.phone,
    };

    let result;

    // Handle Bank Transfer
    if (paymentType === 'bank_transfer') {
      if (!paymentMethod || !['bca', 'bni', 'bri', 'permata', 'cimb'].includes(paymentMethod)) {
        return NextResponse.json(
          { error: 'Invalid bank selection' },
          { status: 400 }
        );
      }

      result = await midtransService.createBankTransfer({
        payment_type: 'bank_transfer',
        transaction_details: transactionDetails,
        customer_details: customer,
        bank_transfer: {
          bank: paymentMethod as 'bca' | 'bni' | 'bri' | 'permata' | 'cimb',
        },
      });
    }
    // Handle E-Money (GoPay, ShopeePay)
    else if (paymentType === 'gopay' || paymentType === 'shopeepay') {
      const emoneyRequest: any = {
        payment_type: paymentType,
        transaction_details: transactionDetails,
        customer_details: customer,
      };

      // Add callback for mobile devices
      if (paymentType === 'gopay') {
        emoneyRequest.gopay = {
          enable_callback: true,
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/agenda/payment-callback`,
        };
      } else if (paymentType === 'shopeepay') {
        emoneyRequest.shopeepay = {
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/agenda/payment-callback`,
        };
      }

      result = await midtransService.createEMoneyPayment(emoneyRequest);
    } else {
      return NextResponse.json(
        { error: 'Invalid payment type' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payment' },
      { status: 500 }
    );
  }
}
