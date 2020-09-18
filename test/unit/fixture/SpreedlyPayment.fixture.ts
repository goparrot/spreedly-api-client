import { SpreedlyPaymentMethodEnum } from '../../../src/enum';
import { ISpreedlyPaymentListParams, ISpreedlyPaymentMethod, ISpreedlyPaymentMethodUpdateReq, ISpreedlyPaymentRes } from '../../../src/interface';

export const fakeSpreedlyValidPaymentListParams: Partial<ISpreedlyPaymentListParams> = { metadata: { userId: 'valid_user_id' } };

//@ts-expect-error
export const fakeSpreedlyInvalidPaymentListParams: Partial<ISpreedlyPaymentListParams> = { metadata: { userId: ['invalid_user_id'] } };

export const fakeSpreedlyPaymentMethodUpdateReq: ISpreedlyPaymentMethodUpdateReq = { metadata: { userId: 'valid_user_id' } };

export const fakeSpreedlyPayment: ISpreedlyPaymentMethod = {
    token: 'DqQ2CJhEBXLNKvcNYDwYk8H46kr',
    email: 'joey@example.com',
    data: null,
    storage_state: 'retained',
    test: true,
    metadata: {
        key: 'string value',
        another_key: 123,
        final_key: true,
        user_id: '31',
    },
    callback_url: null,
    last_four_digits: '4444',
    first_six_digits: '555555',
    card_type: 'master',
    first_name: 'Tudor',
    last_name: 'B',
    month: 3,
    year: 2032,
    address1: '33 Lane Road',
    address2: 'Apartment 4',
    city: 'Wanaque',
    state: 'NJ',
    zip: '31331',
    country: 'US',
    phone_number: '919.331.3313',
    company: 'Acme Inc.',
    full_name: 'Tudor B',
    eligible_for_card_updater: true,
    shipping_address1: '33 Lane Road',
    shipping_address2: 'Apartment 4',
    shipping_city: 'Wanaque',
    shipping_state: 'NJ',
    shipping_zip: '31331',
    shipping_country: 'US',
    shipping_phone_number: '919.331.3313',
    payment_method_type: SpreedlyPaymentMethodEnum.CREDIT_CARD,
    errors: [],
    fingerprint: 'b5fe350d5135ab64a8f3c1097fadefd9effb',
    verification_value: '',
    number: 'XXXX-XXXX-XXXX-4444',
};

export const fakeSpreedlyPaymentRes: ISpreedlyPaymentRes = {
    payment_methods: [fakeSpreedlyPayment],
};
