import * as React from 'react';
import * as S from '@racket-styles/native';

type Props = {
  title: string;
  message?: string;
  onPress: () => void;
  headerHeight?: number;
  loading?: boolean;
};

export const EmptyListReload: React.FC<Props> = (props) => {
  return (
    <S.Center>
      <S.H2 color="g1000" align="center">
        {props.title}
      </S.H2>

      <S.Body color="g600" align="center">
        {props.message}
      </S.Body>

      <S.Spacer size="xxs" />

      <S.Button
        label={'Reload'}
        loading={props.loading}
        height="40px"
        width="100px"
        onPress={props.onPress}
      />

      <S.Spacer size="xxxl" />
    </S.Center>
  );
};
