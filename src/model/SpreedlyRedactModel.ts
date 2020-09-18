import { ISpreedlyPaymentMethod } from '../interface';
import { ISpreedlyRedactRes } from '../interface/ISpreedlyRedact';
import { SpreedlyTransactionType } from '../type';
import { SpreedlyRedactTransactionType } from '../type/SpreedlyRedactTransactionType';

export class SpreedlyRedactModel implements ISpreedlyRedactRes {
    token: string;
    succeeded: boolean;
    transaction_type: string;
    state: string;
    message_key: string;
    message: string;
    transaction: SpreedlyRedactTransactionModel;
}

export class SpreedlyRedactTransactionModel implements SpreedlyRedactTransactionType {
    on_test_gateway: boolean;
    succeeded: boolean;
    token: string;
    state: string;
    gateway_specific_fields: Record<string, any> | null;
    gateway_specific_response_fields: Record<string, any>;
    transaction_type: SpreedlyTransactionType;
    order_id: string | null;
    ip: string | null;
    gateway_transaction_id: string;
    gateway_latency_ms: number;
    message_key: string;
    message: string;
    payment_method: ISpreedlyPaymentMethod;
}
