import { ISpreedlyReceiverRes, ISpreedlyReceiverResponse } from '../interface';
import { SpreedlyReceiverType, SpreedlyStorageStateType } from '../type';
import { SpreedlyCredentialModel } from './SpreedlyCredentialModel';

export class SpreedlyReceiverResModel implements ISpreedlyReceiverResponse {
    receiver: SpreedlyReceiverModel;
}

export class SpreedlyReceiverModel implements ISpreedlyReceiverRes {
    company_name: string;
    receiver_type: SpreedlyReceiverType;
    token: string;
    hostnames: string | null;
    state: SpreedlyStorageStateType;
    credentials: SpreedlyCredentialModel | null;
}
