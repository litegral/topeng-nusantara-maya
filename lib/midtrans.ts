/**
 * Midtrans Core API Integration
 * Documentation: https://docs.midtrans.com/docs/custom-interface-core-api
 */

// Types for Midtrans API
export interface TransactionDetails {
  order_id: string;
  gross_amount: number;
}

export interface CustomerDetails {
  first_name: string;
  email: string;
  phone: string;
}

export interface BankTransferRequest {
  payment_type: 'bank_transfer';
  transaction_details: TransactionDetails;
  customer_details?: CustomerDetails;
  bank_transfer: {
    bank: 'bca' | 'bni' | 'bri' | 'permata' | 'cimb';
  };
}

export interface EMoneyRequest {
  payment_type: 'gopay' | 'shopeepay';
  transaction_details: TransactionDetails;
  customer_details?: CustomerDetails;
  gopay?: {
    enable_callback?: boolean;
    callback_url?: string;
  };
  shopeepay?: {
    callback_url?: string;
  };
}

export interface VirtualAccount {
  bank: string;
  va_number: string;
}

export interface BankTransferResponse {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  va_numbers?: VirtualAccount[];
  permata_va_number?: string;
  expiry_time?: string;
}

export interface EMoneyAction {
  name: string;
  method: string;
  url: string;
}

export interface EMoneyResponse {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  actions?: EMoneyAction[];
  expiry_time?: string;
}

export interface TransactionStatusResponse {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: 'settlement' | 'pending' | 'expire' | 'cancel' | 'deny';
  fraud_status: string;
  va_numbers?: VirtualAccount[];
  permata_va_number?: string;
  actions?: EMoneyAction[];
}

export class MidtransService {
  private serverKey: string;
  private isProduction: boolean;
  private baseUrl: string;

  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY || '';
    this.isProduction = process.env.MIDTRANS_ENVIRONMENT === 'production';
    this.baseUrl = this.isProduction
      ? 'https://api.midtrans.com'
      : 'https://api.sandbox.midtrans.com';
  }

  /**
   * Generate Basic Auth header
   */
  private getAuthHeader(): string {
    const auth = Buffer.from(this.serverKey + ':').toString('base64');
    return `Basic ${auth}`;
  }

  /**
   * Create Bank Transfer payment
   */
  async createBankTransfer(
    data: BankTransferRequest
  ): Promise<BankTransferResponse> {
    const response = await fetch(`${this.baseUrl}/v2/charge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || 'Failed to create payment');
    }

    return response.json();
  }

  /**
   * Create E-Money payment (GoPay, ShopeePay)
   */
  async createEMoneyPayment(data: EMoneyRequest): Promise<EMoneyResponse> {
    const response = await fetch(`${this.baseUrl}/v2/charge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.getAuthHeader(),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || 'Failed to create payment');
    }

    return response.json();
  }

  /**
   * Check transaction status
   */
  async getTransactionStatus(
    orderId: string
  ): Promise<TransactionStatusResponse> {
    const response = await fetch(`${this.baseUrl}/v2/${orderId}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || 'Failed to get transaction status');
    }

    return response.json();
  }

  /**
   * Cancel transaction
   */
  async cancelTransaction(orderId: string): Promise<TransactionStatusResponse> {
    const response = await fetch(`${this.baseUrl}/v2/${orderId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || 'Failed to cancel transaction');
    }

    return response.json();
  }

  /**
   * Verify notification signature
   */
  verifySignature(
    orderId: string,
    statusCode: string,
    grossAmount: string,
    signatureKey: string
  ): boolean {
    const crypto = require('crypto');
    const hash = crypto
      .createHash('sha512')
      .update(`${orderId}${statusCode}${grossAmount}${this.serverKey}`)
      .digest('hex');

    return hash === signatureKey;
  }
}

export const midtransService = new MidtransService();
