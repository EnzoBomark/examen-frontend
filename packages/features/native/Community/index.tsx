import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
  useFetchUsers,
  useRefreshUsers,
  useUsers,
} from '@racket-traits/api/user';
import { CommunityParamList } from '@racket-native/router/stacks/CommunityStack';

type Props = DrawerScreenProps<CommunityParamList, 'Community'>;

const Community: React.FC<Props> = ({ navigation }) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const users = useUsers();
  const fetchUsers = useFetchUsers();
  const refreshUsers = useRefreshUsers();
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (!users.hasLoaded) fetchUsers(query, users.page);
  }, []);

  React.useEffect(() => {
    if (users.hasLoaded) refreshUsers(query);
  }, [query]);

  const emptyList = (
    <C.EmptyListReload
      title="Oh no!"
      message={
        query.length
          ? 'No search result found'
          : 'Looks like no users where found'
      }
      onPress={() => refreshUsers(query)}
      headerHeight={headerHeight}
    />
  );

  return (
    <React.Fragment>
      <S.List
        fullScreen
        spacer="xxs"
        data={users.data}
        ListEmptyComponent={emptyList}
        headerHeight={headerHeight}
        onRefresh={() => refreshUsers(query)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <C.UserCard {...item} />}
        onEndReached={() => users.hasMore && fetchUsers(query, users.page)}
      />

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Clickable onPress={() => navigation.openDrawer()}>
            <S.Svg src="hamburger" width="24px" color="g1000" />
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

export default Community;
