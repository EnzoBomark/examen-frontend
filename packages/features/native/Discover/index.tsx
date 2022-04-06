import * as React from 'react';
import * as Native from 'react-native';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { HomeParamList, Screen } from '@racket-native/router/stacks/HomeStack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = DrawerScreenProps<HomeParamList, Screen.Discover>;

const Discover: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [accordion, setAccordion] = React.useState(false);
  const [avoidHeader, setAvoidHeader] = React.useState<number>(0);

  return (
    <S.Screen top={true}>
      <S.Scroll>
        <Native.View style={{ paddingTop: avoidHeader - insets.top }}>
          <S.Padding size="xs"></S.Padding>
        </Native.View>
      </S.Scroll>

      <Native.View
        onLayout={(i) => setAvoidHeader(i.nativeEvent.layout.height)}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
        }}
      >
        <S.Blur
          blurType="thinMaterialLight"
          style={{
            paddingTop: insets.top,
          }}
        >
          <S.Padding size="xs">
            <S.Row align="center">
              <S.Clickable onPress={() => navigation.openDrawer()}>
                <S.Svg src="hamburger" width="24px" color="g1000" />
              </S.Clickable>

              <S.Fill />

              <S.Clickable>
                <S.Svg src="plus" width="24px" color="g1000" />
              </S.Clickable>

              <S.Spacer size="xs" />

              <S.Clickable onPress={() => navigation.navigate('Profile')}>
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
            <Native.FlatList
              style={{ paddingTop: 5, paddingBottom: 15 }}
              data={[
                { center: 'Lund Padelcenter', dateTime: '2022-04-05' },
                { center: 'Tyresö Padelcenter', dateTime: '2022-04-06' },
                { center: 'Stockholm Tennis', dateTime: '2022-04-07' },
                { center: 'Stockholm Tennis', dateTime: '2022-04-07' },
              ]}
              keyExtractor={(i, index) => `${new Date()}_${i.center}_${index}`}
              horizontal={true}
              ItemSeparatorComponent={() => <S.Spacer size="xs" />}
              ListHeaderComponent={() => <S.Spacer size="xs" />}
              ListFooterComponent={() => <S.Spacer size="xs" />}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <C.UpcomingMatchCard
                  center={item.center}
                  dateTime={item.dateTime}
                />
              )}
            />
          )}

          <S.UnderLine />
        </S.Blur>
      </Native.View>
    </S.Screen>
  );
};

export default Discover;
