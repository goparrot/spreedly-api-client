import { SpreedlyStoredCredentialInitiatorEnum } from '../enum';
import { ISpreedlyShippingAddress, ISpreedlyTransactionResponse, ISpreedlyVoidInterface } from '../interface';

export class SpreedlyVoidModel implements ISpreedlyVoidInterface {
    transaction: SpreedlyVoidTransactionRes;
}

export class SpreedlyVoidTransactionRes implements SpreedlyVoidTransactionRes {
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
    gateway_specific_fields: Record<string, any> | null;
    gateway_specific_response_fields: Record<string, any>;
    gateway_transaction_id: string;
    gateway_latency_ms: number;
    stored_credential_initiator: SpreedlyStoredCredentialInitiatorEnum | null;
    stored_credential_reason_type: string | null;
    warning: string | null;
    message_key: string;
    message: string;
    gateway_token: string;
    gateway_type: string;
    response: ISpreedlyTransactionResponse;
    shipping_address: ISpreedlyShippingAddress;
    reference_token: string;
}
