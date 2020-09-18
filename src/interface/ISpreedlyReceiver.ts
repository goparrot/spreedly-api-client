import { SpreedlyReceiverType, SpreedlyStorageStateType } from '../type';

export interface ISpreedlyReceiver {
    receiver_type: SpreedlyReceiverType;
    // Don't specify a 'hostnames' property when adding a production receiver.
    hostnames?: string;
    credentials?: ISpreedlyReceiverCredential;
}

export interface ISpreedlyReceiverReq {
    receiver: ISpreedlyReceiver;
}

export interface ISpreedlyReceiverResponse {
    receiver: ISpreedlyReceiverRes;
}

export interface ISpreedlyReceiverRes {
    company_name: string;
    token: string;
    state: SpreedlyStorageStateType;
    hostnames: string | null;
    receiver_type: SpreedlyReceiverType;
    credentials: ISpreedlyReceiverCredential | null;
}

export interface ISpreedlyReceiverCredential {
    name: string;
    value: number;
    safe?: boolean;
}
