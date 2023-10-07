import { useState, useCallback } from 'react';

const useModal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return { modalVisible, toggleModal, openModal, closeModal };
};

export default useModal;
