import * as React from 'react';
import * as S from '@racket-styles/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ProfileParamList } from '@racket-native/router/stacks/ProfileStack';
import {
  useCenters,
  useFetchCenters,
  useRefreshCenters,
} from '@racket-traits/api/center';
import { useSetCenter } from '@racket-traits/api/center/single/handlers/setCenter';

type Props = DrawerScreenProps<ProfileParamList, 'Centers'>;

const Centers: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const centers = useCenters();
  const fetchCenters = useFetchCenters();
  const refreshCenters = useRefreshCenters();
  const setCenter = useSetCenter();
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (!centers.hasLoaded) fetchCenters(query, centers.page);
  }, []);

  React.useEffect(() => {
    if (centers.hasLoaded) refreshCenters(query);
  }, [query]);

  return (
    <React.Fragment>
      <S.List
        underline
        fullScreen
        headerHeight={headerHeight}
        onEndReached={() => fetchCenters(query, centers.page)}
        onRefresh={() => refreshCenters(query)}
        keyExtractor={(item) => item.id}
        data={centers.data}
        renderItem={({ item }) => (
          <S.ArrowButton
            label={item.name}
            onPress={() => {
              setCenter(item);
              navigation.navigate('Center');
            }}
          />
        )}
      />

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
