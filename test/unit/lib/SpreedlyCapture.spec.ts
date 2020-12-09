import MockAdapter from 'axios-mock-adapter';
import { ISpreedlyTransactionRes } from '../../../src/interface';
import { SpreedlyCapture } from '../../../src/lib';
import { SpreedlyTransactionResModel } from '../../../src/model';
import { fakeSpreedlyTransaction } from '../fixture';

describe('SpreedlyCapture (unit)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let capture: SpreedlyCapture;
    let mock: MockAdapter;

    beforeEach(() => {
        capture = new SpreedlyCapture({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });

        mock = new MockAdapter(capture.client);
    });

    describe('#create', () => {
        it('should return plain to class data', async () => {
            const transactionToken = 'AE97510D-1283-4752-9FFA-00BC99D40AFD';

            const fakeSpreedlyCaptureTransaction: ISpreedlyTransactionRes = {
                transaction: {
                    ...fakeSpreedlyTransaction,
                    transaction_type: 'Capture',
                    response: { ...fakeSpreedlyTransaction.response, message: 'Successful capture' },
                },
            };

            mock.onPost(`transactions/${transactionToken}/capture`).reply(200, fakeSpreedlyCaptureTransaction);
            const data = await capture.create(transactionToken);
            expect(JSON.parse(JSON.stringify(fakeSpreedlyCaptureTransaction))).toEqual(data);
            expect(data instanceof SpreedlyTransactionResModel).toBe(true);
        });
    });
});
