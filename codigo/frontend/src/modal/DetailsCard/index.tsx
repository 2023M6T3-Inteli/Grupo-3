import React, { useContext, useState, useEffect } from 'react';
import { ModalWrapper, Header, Content,FooterContent, Interaction, PostComments } from './style';
import AddCarCtx from '../../context/CardModal';
import { AnimatePresence, motion } from "framer-motion";
import styles from "./style.module.scss";
import CircleIcon from '@mui/icons-material/Circle';
import contentService from '../../services/contentService';
import Comments from '../../components/Comments';

const DetailsCard: React.FC = () => {
  const modalCtx = useContext(AddCarCtx);
  const { modalParams } = modalCtx;
  console.log(modalParams)

  
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
            onClick={() => modalCtx.setShowModal()}
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
                <Header>
                <img style={{width: 60, height: 60 , borderRadius: 30, marginRight:'10px' }}
                  src={"https://github.com/" + modalParams.Username + ".png"}
                  alt="profileImg"
                />
                  <div>
                    <h2>{modalParams.OwnerPost}</h2>
                    <h3>@{modalParams.Username}</h3>
                  </div>
                </Header>
                <Content>
                  <h2><b>{modalParams.title}</b></h2>
                  <img></img>
                  <p>{modalParams.description}</p>
                </Content>
                <FooterContent>
                  <p>{modalParams.timeStamp}</p>
                  <CircleIcon sx={{ color: '#808080',marginRight: '5px', marginLeft: '5px', width: '5px', height: '5px' }}></CircleIcon>
                  <p><span>{modalParams.likes} </span>likes</p>
                </FooterContent>
                <Interaction>
                  <p>Report Post</p>
                  <p>Not interested</p>
                </Interaction>
                <PostComments>
                  <Comments commentParams={modalParams.id}></Comments>
                </PostComments>
              </ModalWrapper>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DetailsCard;