import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import Popup from 'react-native-modal';
import theme from '@racket-styles/core/theme';

const ModalContainer = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const Background = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const Bar = styled.View`
  align-self: center;
  position: absolute;
  top: 5px;
  left: auto;
  right: auto;
  background-color: ${theme.colors.g100};
  height: 5px;
  width: 15%;
  border-radius: 10px;
`;

const Foreground = styled.View<{ height?: string }>`
  position: absolute;
  bottom: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: ${({ height }) => height || 'auto'};
  width: 100%;
  background-color: ${theme.colors.g0};
`;

export type ModalContext = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = React.createContext<ModalContext>({
  isOpen: false,
  setIsOpen: () => null,
});

const Modal: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

const ModalDismissButton: React.FC<{ onPress?: () => void }> = ({
  children,
  onPress,
}) => {
  const { setIsOpen } = React.useContext(ModalContext);

  if (!React.isValidElement(children))
    throw new Error('ModalDismissButton child is not a valid element');

  return React.cloneElement(children, {
    onPress: () => {
      if (onPress) onPress();
      setIsOpen(false);
    },
  });
};

const ModalOpenButton: React.FC<{ onPress?: () => void }> = ({
  children,
  onPress,
}) => {
  const { setIsOpen } = React.useContext(ModalContext);

  if (!React.isValidElement(children))
    throw new Error('ModalOpenButton child is not a valid element');

  return React.cloneElement(children, {
    onPress: () => {
      if (onPress) onPress();
      setIsOpen(true);
    },
  });
};

type ModalContents = {
  height?: string;
  onDismiss?: () => void;
};

const ModalContents: React.FC<ModalContents> = ({
  children,
  height,
  onDismiss,
}) => {
  const { isOpen, setIsOpen } = React.useContext(ModalContext);
  const insets = useSafeAreaInsets();

  return (
    <Popup
      onDismiss={onDismiss}
      style={{ margin: 0 }}
      isVisible={isOpen}
      propagateSwipe={true}
      swipeDirection={'down'}
      onSwipeComplete={() => setIsOpen(false)}
    >
      <ModalContainer>
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <Background />
        </TouchableWithoutFeedback>
        <Foreground height={height} style={{ paddingBottom: insets.bottom }}>
          {children}
          <Bar />
        </Foreground>
      </ModalContainer>
    </Popup>
  );
};

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
