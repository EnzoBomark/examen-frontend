import * as React from 'react';
import * as Native from 'react-native';
import * as S from '@racket-styles/native';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { useCenterFunctions } from '@racket-traits/api/center/useCenterFunctions';

const screen = Native.Dimensions.get('screen');

const Container = styled.View``;

export const CenterInfo: React.FC<Center> = (center) => {
  const { formatAddress } = useCenterFunctions();

  const find = () => {
    const scheme = Native.Platform.select({
      ios: 'http://maps.apple.com/?address=',
      android: 'http://www.google.com/maps/place/:',
    });

    const url = Native.Platform.select({
      ios: center.address.split(/(?:,| )+/).join(','),
      android: center.address.split(/(?:,| )+/).join('+'),
    });

    if (!scheme || !url) return Native.Alert.alert('Något gick snett');

    Native.Linking.openURL(scheme + url);
  };

  return (
    <Container>
      <S.Align type="center">
        <S.Image
          src={center.picture}
          width={`${screen.width / 3}px`}
          border="xxxl"
        />

        <S.Spacer size="m" />

        <S.H2 bold>{center.name}</S.H2>

        <S.Spacer size="xs" />

        <S.H4>{center.city?.name}</S.H4>

        <S.Spacer size="xxxs" />

        <S.H5 align="center" color="g500">
          {formatAddress(center.address)}
        </S.H5>

        <S.Spacer size="xl" />

        <S.Button
          label={'Maps'}
          icon="infoDrop"
          width={`${screen.width / 1.5}px`}
          onPress={find}
        />

        <S.Spacer size="xs" />

        <S.Button
          label={'Booking'}
          icon="ball"
          width={`${screen.width / 1.5}px`}
          onPress={() => Native.Linking.openURL(center.bookingUrl)}
        />

        <S.Spacer size="xs" />

        <S.Button
          label={'Contact'}
          icon="info"
          width={`${screen.width / 1.5}px`}
          onPress={() => Native.Linking.openURL(center.contactUrl)}
        />

        <S.Spacer size="xxl" />
      </S.Align>
    </Container>
  );
};
