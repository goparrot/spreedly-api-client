export type SpreedlyTransactionType =
    | 'Authorization'
    | 'Capture'
    | 'Credit'
    | 'DeliverPaymentMethod'
    | 'Void'
    | 'AddPaymentMethod'
    | 'RetainPaymentMethod'
    | 'RedactPaymentMethod'
    | string;
