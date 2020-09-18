import { SpreedlyPaymentMethodEnum, SpreedlyPaymentOrderEnum } from '../enum';
import { SpreedlyPaymentMetadataType, SpreedlyStorageStateType, SpreedlyTransactionType } from '../type';

export interface ISpreedlyPaymentListParams {
    order: SpreedlyPaymentOrderEnum;
    // The token of the item to start
    since_token: string;
    metadata: SpreedlyPaymentMetadataType;
    //The number of payment methods to return. By default returns 20, maximum allowed is 100.
    count: number;
}

export interface ISpreedlyPaymentMethodUpdateReq {
    // One or more non-sensitive attributes to update.
    [key: string]: any;
    allow_blank_name?: boolean;
    allow_expired_date?: boolean;
    allow_blank_date?: boolean;
    eligible_for_card_updater?: boolean;
    metadata?: SpreedlyPaymentMetadataType;
}

export interface ISpreedlyPaymentRes {
    payment_methods: ISpreedlyPaymentMethod[];
}

export interface ISpreedlyPaymentMethod {
    token: string;
    email: string | null;
    data: Record<string, any> | null;
    storage_state: SpreedlyStorageStateType;
    test: boolean;
    metadata: SpreedlyPaymentMetadataType | null;
    callback_url: string | null;
    last_four_digits: string;
    first_six_digits: string;
    card_type: string;
    first_name: string;
    last_name: string;
    month: number;
    year: number;
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
    phone_number: string | null;
    company: string | null;
    full_name: string;
    eligible_for_card_updater: boolean;
    shipping_address1: string | null;
    shipping_address2: string | null;
    shipping_city: string | null;
    shipping_state: string | null;
    shipping_zip: string | null;
    shipping_country: string | null;
    shipping_phone_number: string | null;
    payment_method_type: SpreedlyPaymentMethodEnum;
    errors: Record<string, any>[];
    fingerprint: string;
    verification_value: string;
    number: string;
}

export interface ICreateCreditCardPaymentRes {
    transaction: ICreateCreditCardTransaction;
}

export interface ICreateCreditCardTransaction {
    token: string;
    succeeded: boolean;
    transaction_type: SpreedlyTransactionType;
    retained: boolean;
    state: string;
    message_key: string;
    message: string;
    payment_method: ISpreedlyPaymentMethod;
}
