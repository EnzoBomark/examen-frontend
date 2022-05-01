import theme from '@racket-styles/core/theme';
import * as React from 'react';
import * as Native from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../layout/Spacer';
import { UnderLine } from '../layout/UnderLine';

type List = {
  inverted?: boolean | null | undefined;
  data: ReadonlyArray<unknown>;
  renderItem: Native.ListRenderItem<any>;
  onRefresh?: () => void;
  onEndReached?: (info: { distanceFromEnd: number }) => void;
  padding?: number;
  headerHeight?: number;
  fullScreen?: boolean;
  underline?: boolean;
  spacer?: keyof theme['space'];
};

const Separator = styled(UnderLine)`
  margin: ${theme.space.xs} 0;
`;

const EnableScroll = styled.TouchableOpacity``;

export const List: React.FC<List> = (props) => {
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
        paddingTop: props.inverted ? 0 : props.headerHeight,
        paddingBottom: props.inverted ? props.headerHeight : 0,
        paddingVertical: props.padding || 16,
        paddingHorizontal: props.padding || 16,
        minHeight: props.fullScreen ? '100%' : 0,
      }}
    />
  );
};
