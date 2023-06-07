import { createContext, useState } from "react";

interface CardModalContextProps {
  showModal: boolean;
  modalParams: any;
  setShowModal: (show: boolean, params?: any) => void;
}

const CardModal = createContext<CardModalContextProps>({
  showModal: false,
  modalParams: null,
  setShowModal: () => {},
});

interface CardModalProviderProps {
  children: React.ReactNode;
}

export const CardModalProvider = (props: CardModalProviderProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalParams, setModalParams] = useState<any>(null);

  const setShowModalParams = (params?: any) => {
    setShowModal(!showModal);
    setModalParams(params);
  };

  return (
    <CardModal.Provider
      value={{
        showModal,
        modalParams,
        setShowModal: setShowModalParams,
      }}
    >
      {props.children}
    </CardModal.Provider>
  );
};

export default CardModal;