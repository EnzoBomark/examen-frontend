import * as React from 'react';
import { Animated, Easing } from 'react-native';
import styled from 'styled-components/native';
import { Svg } from './Svg';

const Container = styled(Animated.View)`
  width: 0;
  height: 0;
  align-items: center;
  justify-content: center;
`;

export const Spinner: React.FC<SpinnerType> = (props) => {
  const [spinAnim] = React.useState(new Animated.Value(0));

  const interpolateRotation = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [{ rotate: interpolateRotation }],
  };

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  });

  return (
    <Container style={animatedStyle}>
      <Svg src="spinner" width="23px" color={props.color} />
    </Container>
  );
};
