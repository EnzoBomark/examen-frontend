import * as React from 'react';
import * as S from '@racket-styles/web';
import { Routes, Route } from 'react-router-dom';

const Routing: React.FC = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
      width: '100vw',
      height: '100vh',
    }}
  >
    <S.Svg src="clock" width="100px" height="100px" color="g1000" />
  </div>
);

export default Routing;
