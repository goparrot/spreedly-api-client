import { ISpreedlyTransaction } from '../interface';

export type SpreedlyRedactTransactionType = Pick<
    ISpreedlyTransaction,
    | 'on_test_gateway'
    | 'succeeded'
    | 'token'
    | 'state'
    | 'gateway_specific_fields'
    | 'gateway_specific_response_fields'
    | 'transaction_type'
    | 'order_id'
    | 'ip'
    | 'gateway_transaction_id'
    | 'gateway_latency_ms'
    | 'message_key'
    | 'message'
    | 'payment_method'
>;
