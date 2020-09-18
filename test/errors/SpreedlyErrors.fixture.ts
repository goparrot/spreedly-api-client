export interface ISpreedlyError {
    key: string;
    message: string;
    attribute?: string;
    count?: string;
}

export const accessDeniedErrors: ISpreedlyError[] = [
    {
        key: 'errors.access_denied',
        message: 'Unable to authenticate using the given environment_key and access_token.  Please check your credentials.',
    },
];

export const accountInactiveErrors: ISpreedlyError[] = [
    {
        key: 'errors.account_inactive',
        message:
            "Your environment (SJvv22RySSCgEeMoANtJ2ZOvQCC) has not been activated for real transactions with real payment methods. If you're using a Test Gateway you can *ONLY* use Test payment methods - ( https://docs.spreedly.com/test-data). All other credit card numbers are considered real credit cards; real credit cards are not allowed when using a Test Gateway.",
    },
];
export const paymentMethodNotFoundErrors: ISpreedlyError[] = [
    {
        key: 'errors.payment_method_not_found',
        message: 'Unable to find the specified payment method.',
    },
];

export const serviceUnavailableErrors: ISpreedlyError[] = [
    {
        key: 'errors.circuit_breaker_open',
        message: 'Due to persistent errors while communicating with the gateway, this transaction has not been sent. You can try again in 30 seconds.',
    },
];
