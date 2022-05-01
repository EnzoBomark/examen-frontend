import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';
import {
  useFetchMatches,
  useMatches,
  useRefreshMatches,
} from '@racket-traits/api/match';

type Props = DrawerScreenProps<MatchParamList, 'Discover'>;

const dummy = [
  { center: 'Lund Padelcenter', dateTime: '2022-04-05' },
  { center: 'Tyresö Padelcenter', dateTime: '2022-04-06' },
  { center: 'Stockholm Tennis', dateTime: '2022-04-07' },
  { center: 'Stockholm Tennis', dateTime: '2022-04-07' },
];

const Discover: React.FC<Props> = ({ navigation }) => {
  const matches = useMatches();
  const fetchMatches = useFetchMatches();
  const refreshMatches = useRefreshMatches();
  const [accordion, setAccordion] = React.useState(false);
  const [headerHeight, setHeaderHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (!matches.hasLoaded) fetchMatches(matches.page);
  }, []);

  return (
    <React.Fragment>
      <S.List
        headerHeight={headerHeight}
        onEndReached={() => fetchMatches(matches.page)}
        onRefresh={refreshMatches}
        data={matches.data}
        renderItem={({ item }) => <C.MatchCard {...item} />}
        fullScreen={true}
      />

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Row align="center">
            <S.Clickable onPress={() => navigation.openDrawer()}>
              <S.Svg src="hamburger" width="24px" color="g1000" />
            </S.Clickable>

            <S.Fill />

            <S.Clickable onPress={() => navigation.navigate('CreateMatch')}>
              <S.Svg src="plus" width="24px" color="g1000" />
            </S.Clickable>

            <S.Spacer size="xs" />

            <S.Clickable onPress={() => navigation.navigate('ProfileStack')}>
              <S.Image src="TEST" width="44px" />
            </S.Clickable>
          </S.Row>

          <S.Spacer size="xs" />

          <S.TextInput placeholder="Search" height="38px" icon="search" />

          <S.Spacer size="xs" />

          <S.Row align="center">
            <S.Spacer size="xxs" />

            <S.Clickable onPress={() => setAccordion((prev) => !prev)}>
              <S.Row align="center">
                <S.Svg
                  src={accordion ? 'upArrow' : 'downArrow'}
                  width="10px"
                  color="g1000"
                />
                <S.Spacer size="xxs" />
                <S.H5 color="g1000" bold={true}>
                  {accordion ? 'Upcoming Matches' : 'Show Upcoming Matches'}
                </S.H5>
              </S.Row>
            </S.Clickable>

            <S.Fill />

            <S.Clickable>
              <S.Body color="p600">See All</S.Body>
            </S.Clickable>

            <S.Spacer size="xs" />
          </S.Row>
        </S.Padding>

        {accordion && (
          <S.List
            data={dummy}
            renderItem={({ item }) => <C.UpcomingMatchCard {...item} />}
          />
        )}
      </S.Header>
    </React.Fragment>
  );
};

export default Discover;
