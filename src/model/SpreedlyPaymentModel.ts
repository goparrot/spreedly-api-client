import { SpreedlyPaymentMethodEnum } from '../enum';
import { ISpreedlyPaymentMethod, ISpreedlyPaymentRes } from '../interface';
import { SpreedlyPaymentMetadataType, SpreedlyStorageStateType } from '../type';

export class SpreedlyPaymentResModel implements ISpreedlyPaymentRes {
    payment_methods: SpreedlyPaymentModel[];
}

export class SpreedlyPaymentModel implements ISpreedlyPaymentMethod {
    callback_url: string | null;
    token: string;
    email: string | null;
    data: Record<string, any> | null;
    storage_state: SpreedlyStorageStateType;
    test: boolean;
    metadata: SpreedlyPaymentMetadataType | null;
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
