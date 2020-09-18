import { SpreedlyTransactionType } from '../type';
import { ISpreedlyPaymentMethod } from './ISpreedlyPayment';

export interface ISpreedlyRetainRes {
    token: string;
    succeeded: boolean;
    transaction_type: SpreedlyTransactionType;
    state: string;
    message_key: string;
    message: string;
    transaction: ISpreedlyRetainTransaction;
}

export interface ISpreedlyRetainTransaction {
    payment_method: ISpreedlyPaymentMethod;
}
