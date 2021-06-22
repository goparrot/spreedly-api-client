import { SpreedlyPaymentMethodEnum } from '../../../src/enum';
import { ISpreedlyDeliverReq, ISpreedlyDeliverRes } from '../../../src/interface';
import { fakeSpreedlyPayment } from '.';

export const fakeSpreedlyDeliverReq: ISpreedlyDeliverReq = {
    delivery: {
        continue_caching: true,
        payment_method_token: 'payment_method_token',
        request_method: 'PUT',
        url: 'https://ws-sandbox-api.eng.toasttab.com/ccpartner/v1/merchants/toast-restaurant-external-id/payments/paymentUuid',
        headers: 'Content-Type: application/json\r\nToast-Restaurant-External-ID: toast-restaurant-external-id\r\nAuthorization: Bearer bearer_token',
        body: '{"encryptedCardData":"{{#base64}}{{#rsa}}-----BEGIN PUBLIC KEY-----\n******\n-----END PUBLIC KEY-----,pkcs1,{"cardNumber":"{{credit_card_number}}","zipCode":"{{credit_card_zip}}","expMonth":"{{credit_card_month}}","expYear":"{{#format_date}}%y,{{credit_card_expiration_date}}{{/format_date}}", "country":"USA"}{{/rsa}}{{/base64}}","keyId":"RSAES-PKCS1-v1_5::ccpartner_sandbox", "amount":2.62,"tipAmount":0.00, "willSaveCard":true, "cardNumberOrigin":"PARTNER_VAULT", "requestMetadata":{"localTransactionDate":"2020-09-14T16:00:00.000+0000","partnerServiceInfo":{"instanceId":"TESTINGDATA"}}}',
    },
};

export const fakeInvalidSpreedlyDeliverReq: ISpreedlyDeliverReq = {
    delivery: {
        continue_caching: true,
        payment_method_token: 'payment_method_token',
        request_method: 'PUT',
        url: 'https://ws-sandbox-api.eng.toasttab.com/ccpartner/v1/merchants/toast-restaurant-external-id/payments/paymentUuid',
        headers: 'Content-Type: application/json\r\nToast-Restaurant-External-ID: toast-restaurant-external-id\r\nAuthorization: Bearer bearer_token',
        body: '{"encryptedCardData":"{{#base64}}{{#rsa}}-----BEGIN PUBLIC KEY-----\ninvalid_rsa_key\n-----END PUBLIC KEY-----,pkcs1,{"cardNumber":"{{credit_card_number}}","zipCode":"{{credit_card_zip}}","expMonth":"{{credit_card_month}}","expYear":"{{#format_date}}%y,{{credit_card_expiration_date}}{{/format_date}}", "country":"USA"}{{/rsa}}{{/base64}}","keyId":"RSAES-PKCS1-v1_5::ccpartner_sandbox", "amount":2.62,"tipAmount":0.00, "willSaveCard":true, "cardNumberOrigin":"PARTNER_VAULT", "requestMetadata":{"localTransactionDate":"2020-09-14T16:00:00.000+0000","partnerServiceInfo":{"instanceId":"TESTINGDATA"}}}',
    },
};

export const fakeSpreedlyDeliverError: ISpreedlyDeliverRes = {
    transaction: {
        token: '******',
        transaction_type: 'DeliverPaymentMethod',
        state: 'failed',
        succeeded: false,
        message:
            'There was an error parsing your request template. Please make sure you adhere to the variable and function syntax and have matching {{ }} characters.',
        url: 'https://ws-sandbox-api.eng.toasttab.com/ccpartner/v1/merchants/bfaa32ad-768f-4c9d-88a9-0b673933572b/payments/b9f85707-435b-47cf-99cf-4f04a45ed3b6',
        response: {
            status: null,
            headers: null,
            body: null,
        },
        receiver: {
            company_name: 'TEST',
            receiver_type: 'test',
            token: 'MscyKkEhNzK2jvYLAQ3Y3EQKlO',
            state: 'retained',
            credentials: null,
            hostnames: null,
        },
        payment_method: {
            token: 'BpIHLkIihBEQXCnCOWyGF3n0OBm',
            email: null,
            data: null,
            storage_state: 'retained',
            test: true,
            metadata: {
                user_id: 'b9f85707-435b-47cf-99cf-4f04a45ed3b6',
                userId: 11111,
            },
            callback_url: null,
            last_four_digits: '***',
            first_six_digits: '***',
            card_type: 'master',
            first_name: '***',
            last_name: '***',
            month: 3,
            year: 2025,
            address1: null,
            address2: null,
            city: null,
            state: null,
            zip: null,
            country: null,
            phone_number: null,
            company: null,
            full_name: '****',
            eligible_for_card_updater: true,
            shipping_address1: null,
            shipping_address2: null,
            shipping_city: null,
            shipping_state: null,
            shipping_zip: null,
            shipping_country: null,
            shipping_phone_number: null,
            payment_method_type: SpreedlyPaymentMethodEnum.CREDIT_CARD,
            errors: [],
            fingerprint: 'b5fe350d5135ab64a8f3c1097fadefd9effb',
            verification_value: '',
            number: 'XXXX-XXXX-XXXX-4444',
        },
    },
};

export const fakeSpreedlyDeliverRes: ISpreedlyDeliverRes = {
    transaction: {
        token: 'OUlztRoX3F1HRB8yZhoprnJIxGL',
        transaction_type: 'DeliverPaymentMethod',
        state: 'succeeded',
        succeeded: true,
        message: 'Succeeded!',
        url: 'https://ws-sandbox-api.eng.toasttab.com/ccpartner/v1/merchants/bfaa32ad-768f-4c9d-88a9-0b673933572b/payments/b9f85707-435b-47cf-99cf-4f04a45ed3b6',
        response: {
            status: 200,
            headers: 'Server: Spreedly Echo Server\r\nConnection: close\r\nContent-Length: 628',
            body: '{"encryptedCardData":"&&&&&&&","keyId":"RSAES-PKCS1-v1_5::ccpartner_sandbox", "amount":2.62,"tipAmount":0.00, "willSaveCard":true, "cardNumberOrigin":"PARTNER_VAULT", "requestMetadata":{"localTransactionDate":"2020-09-14T16:00:00.000+0000","partnerServiceInfo":{"instanceId":"TESTINGDATA"}}}',
        },
        receiver: {
            company_name: 'TEST',
            receiver_type: 'test',
            token: 'MscyKkEhNzK2jvYLAQ3Y3EQKlO',
            hostnames: null,
            state: 'retained',
            credentials: null,
        },
        payment_method: fakeSpreedlyPayment,
    },
};
