import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  useFetchUsers,
  useRefreshUsers,
  useUsers,
} from '@racket-traits/api/user';
import { MatchParamList } from '@racket-native/router/stacks/MatchStack';

type Props = StackScreenProps<MatchParamList, 'Invite'>;

const Invite: React.FC<Props> = ({ navigation }) => {
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

  return (
    <React.Fragment>
      {!users.hasError ? (
        <S.List
          fullScreen
          spacer="xxs"
          data={users.data}
          headerHeight={headerHeight}
          onEndReached={() => fetchUsers(query, users.page)}
          onRefresh={() => refreshUsers(query)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <C.InviteCard {...item} />}
        />
      ) : (
        <S.Body color="error" style={{ paddingTop: headerHeight }}>
          {users.hasError.message}
        </S.Body>
      )}

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Clickable onPress={() => navigation.goBack()}>
            <S.Svg src="leftArrow" width="20px" color="g1000" />
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

export default Invite;
