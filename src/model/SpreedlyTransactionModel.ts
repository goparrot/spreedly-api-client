import { SpreedlyStoredCredentialInitiatorEnum } from '../enum';
import { ISpreedlyPaymentMethod, ISpreedlyShippingAddress, ISpreedlyTransaction, ISpreedlyTransactionRes, ISpreedlyTransactionResponse } from '../interface';

export class SpreedlyTransactionResModel implements ISpreedlyTransactionRes {
    transaction: SpreedlyTransactionModel;
}

export class SpreedlyTransactionModel implements ISpreedlyTransaction {
    on_test_gateway: boolean;
    succeeded: boolean;
    state: string;
    token: string;
    transaction_type: string;
    order_id: string | null;
    ip: string | null;
    description: string | null;
    email: string | null;
    merchant_name_descriptor: string | null;
    merchant_location_descriptor: string | null;
    gateway_specific_fields: Record<string, any>;
    gateway_specific_response_fields: Record<string, any>;
    gateway_transaction_id: string;
    gateway_latency_ms: number;
    stored_credential_initiator: SpreedlyStoredCredentialInitiatorEnum | null;
    stored_credential_reason_type: string | null;
    warning: string | null;
    amount: number;
    currency_code: string;
    retain_on_success: boolean;
    payment_method_added: boolean;
    smart_routed: boolean;
    message_key: string;
    message: string;
    gateway_token: string;
    gateway_type: string;
    response: ISpreedlyTransactionResponse;
    shipping_address: ISpreedlyShippingAddress;
    api_urls: [{ referencing_transaction: Record<string, any> }, { failover_transaction: Record<string, any> }];
    attempt_3dsecure: boolean;
    payment_method: ISpreedlyPaymentMethod;
}
