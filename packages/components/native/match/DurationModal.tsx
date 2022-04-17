import * as React from 'react';
import * as S from '@racket-styles/native';

type Props = {
  setDuration: (dateTime: string) => void;
  duration: string;
};

export const DurationModal: React.FC<Props> = (props) => {
  const [label, setLabel] = React.useState(props.duration);

  const handleChange = (duration: string) => {
    setLabel(`${duration} min`);
    props.setDuration(duration);
  };

  return (
    <S.Modal>
      <S.ModalOpenButton>
        <S.ArrowButton label={label} icon="calender" />
      </S.ModalOpenButton>

      <S.ModalContents>
        <S.Padding size="xs">
          <S.ModalDismissButton onPress={() => handleChange('60')}>
            <S.Button
              label="60 min"
              height="40px"
              background={props.duration === '60' ? 'p600' : 'g100'}
              color={props.duration === '60' ? 'g0' : 'g500'}
            />
          </S.ModalDismissButton>

          <S.Spacer size="xs" />

          <S.ModalDismissButton onPress={() => handleChange('90')}>
            <S.Button
              label="90 min"
              height="40px"
              background={props.duration === '90' ? 'p600' : 'g100'}
              color={props.duration === '90' ? 'g0' : 'g500'}
            />
          </S.ModalDismissButton>

          <S.Spacer size="xs" />

          <S.ModalDismissButton onPress={() => handleChange('120')}>
            <S.Button
              label="120 min"
              height="40px"
              background={props.duration === '120' ? 'p600' : 'g100'}
              color={props.duration === '120' ? 'g0' : 'g500'}
            />
          </S.ModalDismissButton>
        </S.Padding>
      </S.ModalContents>
    </S.Modal>
  );
};
