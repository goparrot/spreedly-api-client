import { SpreedlyTransactionType } from '../type';
import { ISpreedlyPaymentMethod } from './ISpreedlyPayment';
import { ISpreedlyReceiverRes } from './ISpreedlyReceiver';

export interface ISpreedlyDeliverReq {
    delivery: ISpreedlyDeliver;
}

export interface ISpreedlyDeliver {
    continue_caching?: boolean;
    payment_method_token: string;
    url: string;
    // Acceptable values are PUT, PATCH, and POST, default value is POST.
    request_method?: string;
    headers?: string;
    body: string;
    //default: false
    encode_response?: boolean;
}

export interface ISpreedlyDeliverRes {
    transaction: ISpreedlyDeliverTransaction;
}

export interface ISpreedlyDeliverTransaction {
    token: string;
    transaction_type: SpreedlyTransactionType;
    succeeded: boolean;
    state: string;
    message: string;
    url: string;
    response: ISpreedlyDeliverResponseInterface;
    payment_method: ISpreedlyPaymentMethod;
    receiver: ISpreedlyReceiverRes;
}

export interface ISpreedlyDeliverResponseInterface {
    status: number | null;
    headers: string | null;
    body: string | null;
}
