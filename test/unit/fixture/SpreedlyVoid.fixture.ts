import { ISpreedlyVoidTransactionRes } from '../../../src/interface';

export const fakeSpreedlyVoidTransactionRes: ISpreedlyVoidTransactionRes = {
    on_test_gateway: true,
    succeeded: true,
    state: 'succeeded',
    token: '****************',
    transaction_type: 'Void',
    order_id: null,
    ip: null,
    description: null,
    email: null,
    merchant_name_descriptor: null,
    merchant_location_descriptor: null,
    gateway_specific_fields: null,
    gateway_specific_response_fields: {},
    gateway_transaction_id: '46',
    gateway_latency_ms: 0,
    stored_credential_initiator: null,
    stored_credential_reason_type: null,
    warning: null,
    message_key: 'messages.transaction_succeeded',
    message: 'Succeeded!',
    gateway_token: '***********************',
    gateway_type: 'test',
    response: {
        success: true,
        message: 'Successful void',
        avs_code: null,
        avs_message: null,
        cvv_code: null,
        cvv_message: null,
        pending: false,
        result_unknown: false,
        error_code: null,
        error_detail: null,
        cancelled: false,
        fraud_review: null,
    },
    shipping_address: {
        name: '***********',
        address1: null,
        address2: null,
        city: null,
        state: null,
        zip: null,
        country: null,
        phone_number: null,
    },
    reference_token: '',
};
