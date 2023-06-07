import React, { useContext } from 'react';
import { ModalWrapper, Header, Content, Interaction, Comments } from './style';
import AddCarCtx from '../../context/CardModal';
import { AnimatePresence, motion } from "framer-motion";
import styles from "./style.module.scss";

const confirmPopup: React.FC = () => {
  const modalCtx = useContext(AddCarCtx);
  
  return(
    <AnimatePresence>
      {modalCtx.showModal && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.3,
              },
            }}
            onClick={() => modalCtx.showModalHandler()}
            className={styles.modalBackdrop}
          ></motion.div>
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              scale: 0,
              transition: {
                delay: 0.3,
              },
            }}
            className={styles.modalContentWrapper}
          >
            <motion.div
              initial={{
                x: 100,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  delay: 0.3,
                  duration: 0.3,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.3,
                },
              }}
              className={styles.modalContent}
            >
              <ModalWrapper>
                <Header></Header>
                <Content></Content>
                <Interaction></Interaction>
                <Comments></Comments>
              </ModalWrapper>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default confirmPopup;