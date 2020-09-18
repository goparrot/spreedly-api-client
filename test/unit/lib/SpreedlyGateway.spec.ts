import MockAdapter from 'axios-mock-adapter';
import { SpreedlyGateway } from '../../../src/lib';
import { SpreedlyGatewayResModel } from '../../../src/model';
import { fakeGatewayReq, fakeGatewayRes } from '../fixture';

describe('SpreedlyGateway (unit)', (): void => {
    const baseUrl: string = 'https://core.spreedly.com/v1';
    let gateway: SpreedlyGateway;
    let mock: MockAdapter;

    beforeEach(() => {
        gateway = new SpreedlyGateway({ username: 'username', password: 'password', baseUrl, maxRetries: 3 });
        mock = new MockAdapter(gateway.client);
    });

    describe('#show', () => {
        it('should return plain to class data', async () => {
            mock.onGet('/gateways/gateway_token').reply(200, fakeGatewayRes);
            const data = await gateway.show('gateway_token');
            expect(JSON.parse(JSON.stringify(fakeGatewayRes))).toEqual(data);
            expect(data instanceof SpreedlyGatewayResModel).toBe(true);
        });
    });

    describe('#create', () => {
        it('should return plain to class data', async () => {
            mock.onPost('/gateways', fakeGatewayReq).reply(200, fakeGatewayRes);
            const data = await gateway.create(fakeGatewayReq);
            expect(JSON.parse(JSON.stringify(fakeGatewayRes))).toEqual(data);
            expect(data instanceof SpreedlyGatewayResModel).toBe(true);
        });
    });
});
