import { ISpreedlyDeliverRes, ISpreedlyDeliverResponseInterface, ISpreedlyDeliverTransaction } from '../interface/ISpreedlyDeliver';
import { SpreedlyPaymentModel } from './SpreedlyPaymentModel';
import { SpreedlyReceiverModel } from './SpreedlyReceiverModel';

export class SpreedlyDeliverModel implements ISpreedlyDeliverRes {
    transaction: SpreedlyDeliverTransactionModel;
}

export class SpreedlyDeliverTransactionModel implements ISpreedlyDeliverTransaction {
    token: string;
    transaction_type: string;
    state: string;
    succeeded: boolean;
    message: string;
    url: string;
    payment_method: SpreedlyPaymentModel;
    receiver: SpreedlyReceiverModel;
    response: SpreedlyDeliverResponseModel;
}

export class SpreedlyDeliverResponseModel implements ISpreedlyDeliverResponseInterface {
    status: number | null;
    headers: string | null;
    body: string | null;
}
