import theme from '@racket-styles/core/theme';
import * as React from 'react';
import * as Native from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../layout/Spacer';
import { UnderLine } from '../layout/UnderLine';

type List<T> = {
  inverted?: boolean | null | undefined;
  data: ReadonlyArray<T>;
  extraData?: ReadonlyArray<T>;
  renderItem: Native.ListRenderItem<T>;
  refreshing?: boolean;
  onRefresh?: () => void;
  padding?: number;
  headerHeight?: number;
  fullScreen?: boolean;
  underline?: boolean;
  spacer?: keyof theme['space'];
  keyExtractor?: (item: T, index: number) => string;
  onEndReached?: (info: { distanceFromEnd: number }) => void;
};

const Separator = styled(UnderLine)`
  margin: ${theme.space.xs} 0;
`;

const EnableScroll = styled.TouchableOpacity``;

export const List = <T,>(props: List<T>) => {
  const separator = () => (
    <EnableScroll activeOpacity={1}>
      {props.underline ? <Separator /> : <Spacer size={props.spacer || 'xs'} />}
    </EnableScroll>
  );

  const wrapper = () => (
    <EnableScroll>
      <Spacer size={props.spacer || 'xs'} />
    </EnableScroll>
  );

  return (
    <Native.FlatList
      data={props.data}
      extraData={props.extraData}
      renderItem={props.renderItem}
      inverted={props.inverted}
      keyExtractor={props.keyExtractor}
      onEndReached={props.onEndReached}
      refreshControl={
        <Native.RefreshControl
          refreshing={false}
          tintColor={'transparent'}
          onRefresh={props.onRefresh}
        />
      }
      nestedScrollEnabled
      onEndReachedThreshold={0.1}
      refreshing={props.refreshing || false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={wrapper}
      ListFooterComponent={wrapper}
      ItemSeparatorComponent={separator}
      contentContainerStyle={{
        paddingTop: props.inverted ? 0 : props.headerHeight,
        paddingBottom: props.inverted ? props.headerHeight : 0,
        paddingVertical: props.padding || 16,
        paddingHorizontal: props.padding || 16,
        minHeight: props.fullScreen ? '100%' : 0,
      }}
    />
  );
};
