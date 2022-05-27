import * as React from 'react';
import { Linking } from 'react-native';

const BASE_URL = 'swish://';
const PAYMENT_END = 'payment?data=';

export const useSwish = () => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasPayed, setHasPayed] = React.useState(false);

  const onPay = async (
    payee: string,
    amount: number,
    message?: string
  ): Promise<void> => {
    try {
      setHasError(false);
      setIsLoading(true);

      const data = {
        version: 1,
        payee: {
          value: Number(payee),
        },
        amount: {
          value: amount,
        },
        message: {
          value: message ?? 'The payment is sent in partnership with Racket',
        },
      };

      await Linking.openURL(
        BASE_URL + PAYMENT_END + encodeURIComponent(JSON.stringify(data))
      );

      setHasPayed(true);
    } catch (error) {
      setHasError(true);
    }

    setIsLoading(false);
  };

  const swish = {
    hasError,
    isLoading,
    hasPayed,
  };

  return [swish, onPay] as const;
};
