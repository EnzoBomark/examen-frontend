import * as React from 'react';
import * as S from '@racket-styles/native';
import { useCenters, useGetCenters } from '@racket-traits/api/center';

type Props = {
  setCenter: (center: string) => void;
  center: string;
};

export const CenterModal: React.FC<Props> = (props) => {
  const [label, setLabel] = React.useState('Choose center');
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const centers = useCenters();
  const getCenters = useGetCenters();

  React.useEffect(() => {
    if (!centers.hasLoaded) getCenters(centers.page);
  }, []);

  return (
    <S.Modal>
      <S.ModalOpenButton>
        <S.ArrowButton label={label} icon="infoDrop" />
      </S.ModalOpenButton>

      <S.ModalContents height="92%">
        <S.List
          underline={true}
          fullScreen={true}
          data={centers.data}
          headerHeight={headerHeight}
          renderItem={({ item }) => (
            <S.ModalDismissButton
              onPress={() => {
                setLabel(item.name);
                props.setCenter(item.id);
              }}
            >
              <S.ArrowButton label={item.name} />
            </S.ModalDismissButton>
          )}
        />

        <S.ModalHeader setHeaderHeight={setHeaderHeight}>
          <S.Align type="center">
            <S.Absolute left="8px">
              <S.ModalDismissButton>
                <S.Clickable>
                  <S.Svg src="leftArrow" width="20px" color="g1000" />
                </S.Clickable>
              </S.ModalDismissButton>
            </S.Absolute>
            <S.H5>Centers</S.H5>
          </S.Align>
        </S.ModalHeader>
      </S.ModalContents>
    </S.Modal>
  );
};
