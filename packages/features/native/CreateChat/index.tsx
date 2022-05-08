import * as React from 'react';
import * as S from '@racket-styles/native';
import * as C from '@racket-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ChatParamList } from '@racket-native/router/stacks/ChatStack';
import { useCreateChat, useUnloadChat } from '@racket-traits/api/chat';
import {
  useFetchUsers,
  useRefreshUsers,
  useUsers,
} from '@racket-traits/api/user';

type Props = StackScreenProps<ChatParamList, 'CreateChat'>;

const CreateChat: React.FC<Props> = ({ navigation }) => {
  const users = useUsers();
  const fetchUsers = useFetchUsers();
  const createChat = useCreateChat();
  const refreshUsers = useRefreshUsers();
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (!users.hasLoaded) fetchUsers(query, users.page);
  }, []);

  React.useEffect(() => {
    if (users.hasLoaded) refreshUsers(query);
  }, [query]);

  return (
    <React.Fragment>
      <S.List
        headerHeight={headerHeight}
        fullScreen={true}
        onEndReached={() => fetchUsers(query, users.page)}
        onRefresh={() => refreshUsers(query)}
        data={users.data}
        renderItem={({ item }) => (
          <C.ChatUserCard
            user={item}
            addUser={setSelectedUsers}
            isAdded={selectedUsers.some((u) => u.id === item.id)}
          />
        )}
      />

      <S.Header setHeaderHeight={setHeaderHeight}>
        <S.Padding size="xs">
          <S.Spacer size="s" />

          <S.Row justify="center">
            <S.Absolute left="0" bottom="0">
              <S.Clickable onPress={() => navigation.goBack()}>
                <S.Svg src="leftArrow" color="g1000" width="20px" />
              </S.Clickable>
            </S.Absolute>

            <S.Absolute right="0" bottom="-5px">
              <S.SmallButton
                height="30px"
                label="Create chat"
                icon="add"
                disabled={!selectedUsers.length}
                onPress={() =>
                  createChat(selectedUsers, () => navigation.navigate('Chat'))
                }
              />
            </S.Absolute>
          </S.Row>

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

export default CreateChat;
