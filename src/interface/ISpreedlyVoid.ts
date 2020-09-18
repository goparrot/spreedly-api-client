import { ISpreedlyTransaction } from './ISpreedlyTransaction';

export interface ISpreedlyVoidInterface {
    transaction: ISpreedlyVoidTransactionRes;
}

export interface ISpreedlyVoidTransactionRes
    extends Omit<
        ISpreedlyTransaction,
        'amount' | 'currency_code' | 'retain_on_success' | 'smart_routed' | 'api_urls' | 'payment_method' | 'payment_method_added' | 'attempt_3dsecure'
    > {
    reference_token: string;
}
