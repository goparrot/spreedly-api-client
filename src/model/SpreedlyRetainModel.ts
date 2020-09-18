import { ISpreedlyRetainRes, ISpreedlyRetainTransaction } from '../interface';
import { SpreedlyPaymentModel } from '.';

export class SpreedlyRetainModel implements ISpreedlyRetainRes {
    token: string;
    succeeded: boolean;
    transaction_type: string;
    state: string;
    message_key: string;
    message: string;
    transaction: ISpreedlyRetainTransaction;
}

export class SpreedlyRetainTransaction implements ISpreedlyRetainTransaction {
    payment_method: SpreedlyPaymentModel;
}
