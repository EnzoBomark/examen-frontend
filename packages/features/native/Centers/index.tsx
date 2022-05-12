import * as React from 'react';
import * as S from '@racket-styles/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ProfileParamList } from '@racket-native/router/stacks/ProfileStack';

type Props = DrawerScreenProps<ProfileParamList, 'Centers'>;

const Centers: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [query, setQuery] = React.useState('');

  return (
    <React.Fragment>
      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Clickable onPress={() => navigation.goBack()}>
            <S.Svg src="leftArrow" color="g1000" width="20px" />
          </S.Clickable>

          <S.Spacer size="s" />

          <S.TextInput
            placeholder="Search"
            height="38px"
            icon="search"
            value={query}
            onTextChange={setQuery}
          />
        </S.Padding>
      </S.Header>
    </React.Fragment>
  );
};

export default Centers;
