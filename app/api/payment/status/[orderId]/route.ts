import { NextRequest, NextResponse } from 'next/server';
import { midtransService } from '@/lib/midtrans';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = params.orderId;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const status = await midtransService.getTransactionStatus(orderId);

    return NextResponse.json({
      success: true,
      data: status,
    });
  } catch (error: any) {
    console.error('Transaction status error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get transaction status' },
      { status: 500 }
    );
  }
}
