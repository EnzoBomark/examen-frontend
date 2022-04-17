import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import validate, { v } from '@racket-traits/validation';
import { StackScreenProps } from '@react-navigation/stack';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import { useProfile } from '@racket-traits/api/profile';
import { useMatch, usePostMatch } from '@racket-traits/api/match';

type Props = StackScreenProps<MatchParamList, 'CreateMatch'>;

const CreateMatch: React.FC<Props> = ({ navigation }) => {
  const profile = useProfile();
  const match = useMatch();
  const postMatch = usePostMatch();

  React.useEffect(() => {
    if (!match.isLoading && match.hasLoaded)
      navigation.navigate('Match', match.data);
  }, [match]);

  const [type, setType] = React.useState(false);
  const [isBooked, setIsBooked] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);
  const [center, setCenter] = React.useState('');
  const [dateTime, setDateTime] = React.useState('');
  const [duration, setDuration] = React.useState('90');
  const [court, setCourt] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [currency, setCurrency] = React.useState('SEK');
  const [phone, setPhone] = React.useState(profile.data.phone || '');

  const criteria = new Map([
    [{ phone }, [v.isPhone]],
    [{ center }, []],
    [{ dateTime }, []],
    [{ court }, [v.max(20)]],
    [{ price }, [v.numeric, v.max(10)]],
    [{ duration }, []],
    [{ currency }, []],
  ]);

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

            <S.H5 bold={true}>Create match</S.H5>
          </S.Row>

          <S.Spacer size="l" />

          <S.ToggleButton
            labelOne="4 players"
            labelTwo="2 payers"
            toggle={setType}
            value={type}
          />

          <S.Spacer size="xxs" />

          <S.StaticList
            items={[
              <C.CenterModal setCenter={setCenter} center={center} />,
              <C.DateTimeModal setDateTime={setDateTime} dateTime={dateTime} />,
              <C.DurationModal setDuration={setDuration} duration={duration} />,
              <S.Radio
                label="Booked court"
                icon="ball"
                active={isBooked}
                toggle={setIsBooked}
              />,
              isBooked ? (
                <S.StaticSubList
                  items={[
                    <S.ListInput
                      label="Court"
                      placeholder="0"
                      value={court}
                      onTextChange={setCourt}
                      error={validate(criteria, { court })}
                    />,
                    <S.ListInput
                      label="Phone number"
                      placeholder="0"
                      value={phone}
                      onTextChange={setPhone}
                      error={validate(criteria, { phone })}
                    />,
                    <S.ListInput
                      label="Price"
                      placeholder="0"
                      value={price}
                      onTextChange={setPrice}
                      error={validate(criteria, { price })}
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
        </S.Padding>

        <S.Fill />

        <S.Padding size="xs" vertical={false}>
          <S.Button
            loading={match.isLoading}
            onPress={() =>
              postMatch(
                type,
                isBooked,
                isPublic,
                center,
                dateTime,
                duration,
                court,
                price,
                currency,
                phone
              )
            }
            label="Create match"
            disabled={
              !!validate(criteria, {
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

export default CreateMatch;
