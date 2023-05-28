import styled from "styled-components";

export const ContainerHead = styled.div`
    display: flex;
    height: 4rem;
    width: 100%;
    align-items: center;
    justify-content: center;
  `;

  export const CancelButton = styled.button`
    position: absolute;
    top: 1rem;
    left: 1rem;
    margin: 0;
    font-size: 1rem;
    color: #0063b8;
    margin-top: 1rem;
    margin-left: 1rem;
  `;

  export const PostButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    margin: 0;
    font-size: 1rem;
    color: #fff;
    border-radius: 20px;
    background-color: #0063b8;
    margin-top: 1rem;
    margin-right: 1rem;
    padding: 0.34rem 1rem;
  `;

  export const InputContainer = styled.div`
    width: 95%;
    margin: auto;
  `;

  export const InputTextarea = styled.textarea`
    width: 100%;
    padding: 6px;
    border: none;
    border-radius: 8px;
    resize: vertical;
    font-size: 16px;
    outline: none;
    overflow: hidden;
    height: 10rem;
  `;

export const InputTitle = styled.textarea`
width: 100%;
padding: 12px;
border: none;
border-radius: 8px;
resize: vertical;
font-size: 20px;
font-weight: 400;
outline: none;
overflow: hidden;
rows: 1;
`;


  export const PersonContainer = styled.div`
    height: 4rem;
    width: 100%;
    display: flex;
    align-items: center;
  `;

 export  const ProfileImageContainer = styled.div`
    margin-left: 1.5rem;
  `;

  export const ProfileInfo = styled.div`
    margin-left: 0;
    display: flex;
    flex-direction: column;
`;

  export const ProfileImage = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 100%;
  `;

 export  const ProfileName = styled.h4`
  margin: 0.7rem;
  margin-top: 0;
  margin-bottom: 0;
  `;

  export const Privacy = styled.h4`
  margin: 0.7rem;
  color: #0063b8;
  margin-top: 0;
  margin-bottom: 0;
  `;