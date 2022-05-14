import theme from '@racket-styles/core/theme';
import * as React from 'react';
import * as Native from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../layout/Spacer';
import { UnderLine } from '../layout/UnderLine';

type HorizontalList = {
  inverted?: boolean | null | undefined;
  data: ReadonlyArray<unknown>;
  renderItem: Native.ListRenderItem<any>;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: (info: { distanceFromEnd: number }) => void;
  padding?: number;
  fullScreen?: boolean;
  spacer?: keyof theme['space'];
};

const Separator = styled(UnderLine)`
  margin: ${theme.space.xs} 0;
`;

const EnableScroll = styled.TouchableOpacity``;

export const HorizontalList: React.FC<HorizontalList> = (props) => {
  const wrapper = () => (
    <EnableScroll>
      <Spacer size={props.spacer || 'xs'} />
    </EnableScroll>
  );

  return (
    <Native.FlatList
      {...props}
      horizontal
      refreshing={props.refreshing || false}
      nestedScrollEnabled
      onEndReachedThreshold={0.2}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => `${new Date()}${index}`}
      ListHeaderComponent={wrapper}
      ListFooterComponent={wrapper}
      ItemSeparatorComponent={wrapper}
      contentContainerStyle={{
        paddingVertical: props.padding || 16,
        minHeight: props.fullScreen ? '100%' : 0,
      }}
    />
  );
};
