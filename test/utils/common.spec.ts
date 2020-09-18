import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createAxiosInstance } from '../../src/utils';

describe('common', () => {
    it('catch ECONNABORTED error', async () => {
        const axios: AxiosInstance = createAxiosInstance({
            axiosConfig: {
                auth: {
                    username: 'username',
                    password: 'password',
                },
            },
        });

        const mock: MockAdapter = new MockAdapter(axios);
        mock.onPost('/test').timeout();
        await axios.post('/test').catch((error) => {
            expect(error.code).toBe('ECONNABORTED');
        });
    });
});
