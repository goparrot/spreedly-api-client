import { SpreedlyStoredCredentialInitiatorEnum } from '../enum';
import { SpreedlyGatewayType, SpreedlyStoredCredentialReasonType, SpreedlyTransactionType } from '../type';
import { ISpreedlyPaymentMethod } from './ISpreedlyPayment';
import { ISpreedlyShippingAddress } from './ISpreedlyShipingAddress';

export interface ISpreedlyTransactionRes {
    transaction: ISpreedlyTransaction;
}

export interface ISpreedlyTransaction {
    on_test_gateway: boolean;
    succeeded: boolean;
    state: string;
    token: string;
    transaction_type: SpreedlyTransactionType;
    order_id: string | null;
    ip: string | null;
    description: string | null;
    email: string | null;
    merchant_name_descriptor: string | null;
    merchant_location_descriptor: string | null;
    gateway_specific_fields: Record<string, any> | null;
    gateway_specific_response_fields: Record<string, any>;
    gateway_transaction_id: string | null;
    gateway_latency_ms: number | null;
    stored_credential_initiator: SpreedlyStoredCredentialInitiatorEnum | null;
    stored_credential_reason_type: SpreedlyStoredCredentialReasonType | null;
    warning: string | null;
    message_key: string;
    message: string;
    gateway_token: string;
    gateway_type: SpreedlyGatewayType;
    response: ISpreedlyTransactionResponse;
    shipping_address: ISpreedlyShippingAddress;
    currency_code: string;
    retain_on_success: boolean;
    amount: number;
    payment_method_added: boolean;
    smart_routed: boolean;
    api_urls: [{ referencing_transaction: Record<string, any> }, { failover_transaction: Record<string, any> }];
    attempt_3dsecure: boolean;
    payment_method: ISpreedlyPaymentMethod;
}

export interface ISpreedlyTransactionResponse {
    success: boolean;
    message: string;
    avs_code: null;
    avs_message: null;
    cvv_code: null;
    cvv_message: null;
    pending: boolean;
    result_unknown: boolean;
    error_code: null;
    error_detail: null;
    cancelled: boolean;
    fraud_review: null;
}
