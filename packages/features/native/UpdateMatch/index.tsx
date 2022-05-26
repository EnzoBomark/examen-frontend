import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import criteria, { v } from '@racket-traits/validation';
import { StackScreenProps } from '@react-navigation/stack';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import { useMatch, useUpdateMatch } from '@racket-traits/api/match';

type Props = StackScreenProps<MatchParamList, 'CreateMatch'>;

const UpdateMatch: React.FC<Props> = ({ navigation }) => {
  const match = useMatch();
  const updateMatch = useUpdateMatch();

  const [isBooked, setIsBooked] = React.useState(match.data.isBooked || false);
  const [isPublic, setIsPublic] = React.useState(match.data.isPublic || false);
  const [dateTime, setDateTime] = React.useState(match.data.dateTime || '');
  const [court, setCourt] = React.useState(match.data.court || '');
  const [price, setPrice] = React.useState(match.data.price || '');
  const [phone, setPhone] = React.useState(match.data.phone || '');
  const [center, setCenter] = React.useState(match.data.center?.id || '');
  const [duration, setDuration] = React.useState(match.data.duration || '90');
  const [currency, setCurrency] = React.useState(match.data.currency || 'SEK');
  const [description, setDescription] = React.useState(
    match.data.description || ''
  );

  const validate = criteria(
    new Map([
      [{ phone }, [v.isPhone]],
      [{ center }, []],
      [{ dateTime }, []],
      [{ court }, [v.max(20)]],
      [{ price }, [v.numeric, v.max(10)]],
      [{ duration }, []],
      [{ currency }, []],
      [{ description }, [v.allowEmpty, v.max(300)]],
    ])
  );

  return (
    <S.AvoidKeyboard>
      <S.Screen>
        <S.Padding size="xs">
          <S.Row justify="center">
            <S.Absolute left="0" bottom="0">
              <S.Clickable onPress={() => navigation.goBack()}>
                <S.Svg src="leftArrow" color="g1000" width="20px" />
              </S.Clickable>
            </S.Absolute>

            <S.H5 bold>Update match</S.H5>
          </S.Row>

          <S.Spacer size="m" />

          <S.StaticList
            items={[
              <C.CenterModal
                setCenter={setCenter}
                center={center}
                label={match.data.center?.name}
              />,

              <C.DateTimeModal
                setDateTime={setDateTime}
                dateTime={dateTime}
                label={`${new Date(
                  match.data.dateTime
                ).toDateString()} : ${new Date(match.data.dateTime)
                  .toLocaleTimeString()
                  .substring(0, 5)}`}
              />,

              <C.DurationModal setDuration={setDuration} duration={duration} />,

              !match.data.isBooked ? (
                <S.Radio
                  label="Booked court"
                  icon="ball"
                  active={isBooked}
                  toggle={setIsBooked}
                />
              ) : null,

              !match.data.isBooked && isBooked ? (
                <S.StaticSubList
                  items={[
                    <S.ListInput
                      label="Court"
                      placeholder="0"
                      value={court}
                      onTextChange={setCourt}
                      error={validate({ court })}
                    />,
                    <S.ListInput
                      label="Phone number"
                      placeholder="0"
                      value={phone}
                      onTextChange={setPhone}
                      error={validate({ phone })}
                    />,
                    <S.ListInput
                      label="Price"
                      placeholder="0"
                      value={price}
                      onTextChange={setPrice}
                      error={validate({ price })}
                    />,
                    <C.CurrencyModal
                      setCurrency={setCurrency}
                      currency={currency}
                    />,
                  ]}
                />
              ) : null,
              <S.Radio
                label="Public"
                icon={isPublic ? 'lockOpen' : 'lock'}
                active={isPublic}
                toggle={setIsPublic}
              />,
            ]}
          />

          <S.Spacer size="xs" />

          <S.TextArea
            label
            placeholder={'Description'}
            value={description}
            onTextChange={setDescription}
            error={validate({ description })}
          />
        </S.Padding>

        <S.Fill />

        <S.Padding size="xs" vertical={false}>
          <S.Button
            loading={match.isLoading}
            label="Update match"
            onPress={() =>
              updateMatch(
                match.data,
                isBooked,
                isPublic,
                dateTime,
                duration,
                currency,
                description,
                center,
                court,
                price,
                phone
              )
            }
            disabled={
              !!validate({
                center,
                duration,
                dateTime,
                ...(isBooked && { court, price, phone, currency }),
              })?.length
            }
          />
        </S.Padding>
      </S.Screen>
    </S.AvoidKeyboard>
  );
};

export default UpdateMatch;
