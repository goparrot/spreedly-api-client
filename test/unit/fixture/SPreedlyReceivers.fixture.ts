import { ISpreedlyReceiverReq, ISpreedlyReceiverResponse } from '../../../src/interface';

export const fakeReceiverReq: ISpreedlyReceiverReq = {
    receiver: {
        receiver_type: 'test',
    },
};

export const fakeInvalidReceiverReq: ISpreedlyReceiverReq = {
    receiver: {
        receiver_type: 'test1',
    },
};

export const fakeSpreedlyReceiverRes: ISpreedlyReceiverResponse = {
    receiver: {
        company_name: 'TEST',
        receiver_type: 'test',
        token: 'MscyKkEhNzK2jvYLAQ3Y3EQKlO',
        hostnames: null,
        state: 'retained',
        credentials: null,
    },
};
