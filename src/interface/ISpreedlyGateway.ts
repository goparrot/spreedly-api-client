import { SpreedlyGatewayCharacteristicEnum, SpreedlyGatewaySpecificFieldEnum, SpreedlyPaymentMethodEnum } from '../enum';
import { SpreedlyGatewayType, SpreedlyStorageStateType } from '../type';

export interface ISpreedlyGatewayReq {
    gateway: ISpreedlyGatewayReqPayload;
}

export interface ISpreedlyGatewayReqPayload {
    [key: string]: any;
    gateway_type: SpreedlyGatewayType;
    description?: string;
    sandbox?: boolean;
}

export interface ISpreedlyGatewayRes {
    gateway: ISpreedlyGatewayPayload;
}

export interface ISpreedlyGatewayPayload {
    token: string;
    payment_methods: SpreedlyPaymentMethodEnum[];
    state: SpreedlyStorageStateType;
    name: string;
    characteristics: SpreedlyGatewayCharacteristicEnum[];
    credentials: Record<string, any>[];
    gateway_settings: Record<string, any>;
    gateway_specific_fields: SpreedlyGatewaySpecificFieldEnum[];
    redacted: boolean;
    gateway_type: SpreedlyGatewayType;
    description: string | null;
    sandbox: boolean | null;
}
