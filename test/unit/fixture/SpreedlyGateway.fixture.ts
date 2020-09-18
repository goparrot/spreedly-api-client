import { SpreedlyGatewayCharacteristicEnum, SpreedlyGatewaySpecificFieldEnum, SpreedlyPaymentMethodEnum } from '../../../src/enum';
import type { ISpreedlyGatewayReq, ISpreedlyGatewayRes } from '../../../src/interface';

export const fakeGatewayReq: ISpreedlyGatewayReq = {
    gateway: {
        gateway_type: 'test',
    },
};

export const fakeInvalidGatewayReq: ISpreedlyGatewayReq = {
    gateway: {
        gateway_type: 'test1',
    },
};

export const fakeGatewayRes: ISpreedlyGatewayRes = {
    gateway: {
        token: 'AJIly6ZZ8aXCuBcz83sMV4mxNMu',
        gateway_type: 'test',
        description: null,
        payment_methods: [SpreedlyPaymentMethodEnum.CREDIT_CARD],
        state: 'retained',
        name: 'Spreedly Test',
        characteristics: [SpreedlyGatewayCharacteristicEnum.ADJUST],
        credentials: [],
        gateway_settings: {},
        gateway_specific_fields: [SpreedlyGatewaySpecificFieldEnum.ACCOUNT_ID],
        redacted: false,
        sandbox: false,
    },
};
