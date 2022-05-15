import * as React from 'react';
import * as S from '@racket-styles/native';
import { useCenters, useFetchCenters } from '@racket-traits/api/center';

type Props = {
  setCenter: (center: string) => void;
  center: string;
  label?: string;
};

export const CenterModal: React.FC<Props> = (props) => {
  const [label, setLabel] = React.useState(props.label || 'Choose center');
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const centers = useCenters();
  const fetchCenters = useFetchCenters();

  React.useEffect(() => {
    if (!centers.hasLoaded) fetchCenters('', centers.page);
  }, []);

  return (
    <S.Modal>
      <S.ModalOpenButton>
        <S.ArrowButton label={label} icon="infoDrop" />
      </S.ModalOpenButton>

      <S.ModalContents height="92%">
        <S.List
          underline
          fullScreen
          data={centers.data}
          headerHeight={headerHeight}
          keyExtractor={(item) => item.id}
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
