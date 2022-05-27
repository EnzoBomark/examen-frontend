import * as React from 'react';
import { Spacer } from '../layout/Spacer';
import { UnderLine } from '../layout/UnderLine';

export const StaticList: React.FC<StaticList> = (props) => {
  return (
    <React.Fragment>
      {props.items
        .filter((i) => i)
        .map((i, index) => (
          <React.Fragment key={index}>
            <Spacer size="xs" />
            {i}
            <Spacer size="xs" />
            {index !== props.items.length - 1 && <UnderLine />}
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};
