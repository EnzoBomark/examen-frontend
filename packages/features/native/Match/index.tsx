import * as React from 'react';
import * as S from '@racket-styles/native';
import { StackScreenProps } from '@react-navigation/stack';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import { useUnloadMatch } from '@racket-traits/api/match';

type Props = StackScreenProps<MatchParamList, 'Match'>;

const Match: React.FC<Props> = ({ navigation, route }) => {
  const unloadMatch = useUnloadMatch();
  const [headerHeight, setHeaderHeight] = React.useState(0);

  return (
    <S.AvoidKeyboard>
      <S.Screen headerHeight={headerHeight}>
        <S.Padding size="xs">
          <S.Align type="start">
            <S.H1 bold={true}>{route.params.id}</S.H1>
          </S.Align>
        </S.Padding>
      </S.Screen>

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Align type="center">
            <S.Absolute left="0">
              <S.Clickable
                onPress={() => {
                  unloadMatch();
                  navigation.navigate('Discover');
                }}
              >
                <S.Svg src="leftArrow" width="20px" color="g1000" />
              </S.Clickable>
            </S.Absolute>

            <S.H5>{route.params.center?.name}</S.H5>
            <S.Detail color="g500">
              {route.params.users?.length}{' '}
              {route.params.users?.length === 1 ? 'member' : 'members'}
            </S.Detail>
          </S.Align>
        </S.Padding>
      </S.Header>
    </S.AvoidKeyboard>
  );
};

export default Match;
