import * as React from 'react';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileParamList } from '@racket-native/router/stacks/ProfileStack';

const Card = styled.View`
  width: 100%;
  border-radius: ${theme.radius.xs};
  background-color: ${theme.colors.p100};
  padding: 16px;
  margin-bottom: 15px;
`;

type Navigation = StackNavigationProp<ProfileParamList, 'Profile'>;

export const ProfileSettingsCard: React.FC = () => {
  const navigation = useNavigation<Navigation>();

  return (
    <Card style={{ ...theme.shadow }}>
      <S.Button
        arrow
        label={'Match history'}
        background="g100"
        color="g500"
        onPress={() => navigation.navigate('MatchHistory')}
      />

      <S.Spacer size={'xxs'} />

      <S.Button
        arrow
        label={'Centers'}
        background="g100"
        color="g500"
        onPress={() => navigation.navigate('Centers')}
      />

      <S.Spacer size={'xxs'} />

      <S.Button
        arrow
        label={'Settings'}
        background="g100"
        color="g500"
        onPress={() => navigation.navigate('Settings')}
      />
    </Card>
  );
};
