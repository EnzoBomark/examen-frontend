import * as React from 'react';
import * as S from '@racket-styles/native';
import DatePicker from 'react-native-date-picker';

type Props = {
  setDateTime: (dateTime: string) => void;
  dateTime: string;
};

export const DateTimeModal: React.FC<Props> = (props) => {
  const [label, setLabel] = React.useState('Choose date & time');

  const onDateChange = (date: Date) => {
    setLabel(
      `${date.toDateString()} : ${date.toLocaleTimeString().substring(0, 5)}`
    );
    props.setDateTime(date.toISOString());
  };

  return (
    <S.Modal>
      <S.ModalOpenButton>
        <S.ArrowButton label={label} icon="calender" />
      </S.ModalOpenButton>

      <S.ModalContents>
        <S.Padding size="xs">
          <S.Align type="center">
            <DatePicker
              mode="datetime"
              textColor="black"
              date={props.dateTime ? new Date(props.dateTime) : new Date()}
              onDateChange={onDateChange}
            />
          </S.Align>
        </S.Padding>
      </S.ModalContents>
    </S.Modal>
  );
};
