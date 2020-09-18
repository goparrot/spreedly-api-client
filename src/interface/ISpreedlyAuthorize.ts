import { SpreedlyStoredCredentialInitiatorEnum } from '../enum';
import { SpreedlyStoredCredentialReasonType } from '../type';
import { ISpreedlyBillingAddress } from './ISpreedlyBillingAddress';
import { ISpreedlyShippingAddress } from './ISpreedlyShipingAddress';

export interface ISpreedlyAuthTokenizedPaymentMethodReq {
    transaction: ISpreedlyAuthTransaction;
}

export interface ISpreedlyAuthTransaction {
    payment_method_token: string;
    amount: number;
    // The currency of the funds, as ISO 4217 alpha currency codes, e.g., USD for US dollars.
    currency_code: string;
    order_id?: string;
    description?: string;
    // If the card is verified, retain it so it can be used for future transactions
    retain_on_success?: boolean;
    ip?: boolean;
    email?: string;
    stored_credential_initiator?: SpreedlyStoredCredentialInitiatorEnum;
    stored_credential_reason_type?: SpreedlyStoredCredentialReasonType;
    shipping_address?: Partial<ISpreedlyShippingAddress>;
    billing_address?: Partial<ISpreedlyBillingAddress>;
}
