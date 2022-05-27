import * as React from 'react';
import * as S from '@racket-styles/native';
import { currency } from '@racket-traits/misc';

type Props = {
  setCurrency: (currency: string) => void;
  currency: string;
};

export const CurrencyModal: React.FC<Props> = (props) => {
  const [label, setLabel] = React.useState(props.currency);
  const [headerHeight, setHeaderHeight] = React.useState(0);

  return (
    <S.Modal>
      <S.ModalOpenButton>
        <S.ArrowButton label={label} icon="currency" />
      </S.ModalOpenButton>

      <S.ModalContents height="92%">
        <S.List
          underline
          fullScreen
          data={currency}
          headerHeight={headerHeight}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <S.ModalDismissButton
              onPress={() => {
                setLabel(item);
                props.setCurrency(item);
              }}
            >
              <S.ArrowButton label={item} />
            </S.ModalDismissButton>
          )}
        />

        <S.ModalHeader setHeaderHeight={setHeaderHeight}>
          <S.Align type="center">
            <S.Absolute left="8px">
              <S.ModalDismissButton>
                <S.Clickable>
                  <S.Svg src="leftArrow" width="20px" color="g1000" />
                </S.Clickable>
              </S.ModalDismissButton>
            </S.Absolute>
            <S.H5>Currency</S.H5>
          </S.Align>
        </S.ModalHeader>
      </S.ModalContents>
    </S.Modal>
  );
};
