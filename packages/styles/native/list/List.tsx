import theme from '@racket-styles/core/theme';
import * as React from 'react';
import * as Native from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../layout/Spacer';
import { UnderLine } from '../layout/UnderLine';

type List = {
  data: ReadonlyArray<unknown>;
  renderItem: Native.ListRenderItem<any>;
  onRefresh?: () => void;
  onEndReached?: (info: { distanceFromEnd: number }) => void;
  horizontal?: boolean;
  headerHeight?: number;
  fullScreen?: boolean;
  underline?: boolean;
};

const Separator = styled(UnderLine)`
  margin: ${theme.space.xs} 0;
`;

const EnableScroll = styled.TouchableOpacity``;

export const List: React.FC<List> = (props) => {
  const separator = () => (
    <EnableScroll activeOpacity={1}>
      {props.underline ? <Separator /> : <Spacer size="xs" />}
    </EnableScroll>
  );

  const wrapper = () => (
    <EnableScroll>
      <Spacer size="xs" />
    </EnableScroll>
  );

  return (
    <Native.FlatList
      {...props}
      nestedScrollEnabled
      refreshing={false}
      onEndReachedThreshold={0.2}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => `${new Date()}${index}`}
      ListHeaderComponent={wrapper}
      ListFooterComponent={wrapper}
      ItemSeparatorComponent={separator}
      contentContainerStyle={{
        paddingVertical: 16,
        paddingTop: props.headerHeight,
        paddingHorizontal: props.horizontal ? 0 : 16,
        minHeight: props.fullScreen ? '100%' : 0,
      }}
    />
  );
};
