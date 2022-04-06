import * as React from 'react';
import * as S from '@racket-styles/native';

const Matches: React.FC = () => {
  const [bool, setBool] = React.useState<boolean>(false);

  return (
    <S.Screen>
      <S.Padding size="xs">
        <S.Align type="start">
          <S.TextInput placeholder="Placeholder" label="Label" />

          <S.Spacer size="s" />

          <S.TextInput placeholder="Placeholder" />

          <S.Spacer size="s" />

          <S.TextInput placeholder="Placeholder" icon="search" />

          <S.Spacer size="s" />

          <S.TextInput placeholder="Placeholder" label="Label" />

          <S.Spacer size="s" />

          <S.TextInput placeholder="Placeholder" />

          <S.Spacer size="s" />

          <S.TextInput placeholder="Placeholder" icon="search" />

          <S.Spacer size="s" />

          <S.Modal>
            <S.ModalOpenButton>
              <S.Button label="Modal button" icon="infoDrop" />
            </S.ModalOpenButton>
            <S.ModalContents>
              <S.ModalDismissButton>
                <S.Clickable>
                  <S.Padding size="xxs">
                    <S.Svg src="leftArrow" width="23px" color="g1000" />
                  </S.Padding>
                </S.Clickable>
              </S.ModalDismissButton>

              <S.Spacer size="xs" />

              <S.TextInput placeholder="Placeholder" />

              <S.Spacer size="s" />

              <S.TextInput placeholder="Placeholder" />

              <S.Spacer size="s" />

              <S.TextInput placeholder="Placeholder" />

              <S.Spacer size="s" />

              <S.ModalDismissButton>
                <S.Button label="Close" icon="exit" background="g1000" />
              </S.ModalDismissButton>
            </S.ModalContents>
          </S.Modal>
        </S.Align>
      </S.Padding>
    </S.Screen>
  );
};

export default Matches;
