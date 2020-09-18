import { ISpreedlyReceiverCredential } from '../interface';

export class SpreedlyCredentialModel implements ISpreedlyReceiverCredential {
    name: string;
    value: number;
    safe?: boolean;
}
