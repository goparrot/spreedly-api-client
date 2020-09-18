import { SpreedlyGatewayCharacteristicEnum, SpreedlyPaymentMethodEnum, SpreedlyGatewaySpecificFieldEnum } from '../enum';
import { ISpreedlyGatewayRes, ISpreedlyGatewayPayload } from '../interface';
import { SpreedlyStorageStateType, SpreedlyGatewayType } from '../type';

export class SpreedlyGatewayResModel implements ISpreedlyGatewayRes {
    gateway: SpreedlyGatewayModel;
}

export class SpreedlyGatewayModel implements ISpreedlyGatewayPayload {
    token: string;
    gateway_type: SpreedlyGatewayType;
    description: string;
    payment_methods: SpreedlyPaymentMethodEnum[];
    state: SpreedlyStorageStateType;
    name: string;
    characteristics: SpreedlyGatewayCharacteristicEnum[];
    credentials: Record<string, any>[];
    gateway_settings: Record<string, any>;
    gateway_specific_fields: SpreedlyGatewaySpecificFieldEnum[];
    redacted: boolean;
    sandbox: boolean;
}
