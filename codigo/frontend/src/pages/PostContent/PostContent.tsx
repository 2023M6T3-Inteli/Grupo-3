import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const UserProfile: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const username = 'matheusmacedosantos'; // Substitua pelo nome de usuário do GitHub desejado
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        setAvatarUrl(data.avatar_url);
      } catch (error) {
        console.error('Ocorreu um erro ao obter os dados do usuário:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const ContainerHead = styled.div`
    display: flex;
    height: 4rem;
    width: 100%;
    align-items: center;
    justify-content: center;
  `;

  const CancelButton = styled.button`
    position: absolute;
    top: 1rem;
    left: 1rem;
    margin: 0;
    font-size: 1rem;
    color: #0063b8;
    margin-top: 1rem;
    margin-left: 1rem;
  `;

  const PostButton = styled.button`
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

  const InputContainer = styled.div`
    width: 95%;
    margin: auto;
  `;

  const InputTextarea = styled.textarea`
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    resize: vertical;
    font-size: 16px;
    outline: none;
    overflow: hidden;
    rows: 1;
  `;

  const PersonContainer = styled.div`
    height: 4rem;
    width: 100%;
    display: flex;
    align-items: center;
  `;

  const ProfileImageContainer = styled.div`
    margin-left: 1.5rem;
  `;

  const ProfileInfo = styled.div`
    margin-left: 0;
    display: flex;
    flex-direction: column;
  `;

  const ProfileImage = styled.img`
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 100%;
  `;

  const ProfileName = styled.h4`
    margin: 0.7rem;
    margin-top: 0;
    margin-bottom: 0;
  `;

  const Privacy = styled.h4`
    margin: 0.7rem;
    color: #0063b8;
    margin-top: 0;
    margin-bottom: 0;
  `;

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <ContainerHead>
        <CancelButton>Cancel</CancelButton>
        <PostButton>Post</PostButton>
      </ContainerHead>
      <PersonContainer>
        <ProfileImageContainer>
          <ProfileImage src={avatarUrl} alt="Foto de perfil" />
        </ProfileImageContainer>
        <ProfileInfo>
          <ProfileName>Matuesssss</ProfileName>
          <Privacy>Public</Privacy>
        </ProfileInfo>
      </PersonContainer>
      <InputContainer>
        <InputTextarea
          ref={inputRef}
          placeholder="Digite seu texto..."
          rows={1}
          onChange={(e) => {
            const textarea = e.target as HTMLTextAreaElement;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
          }}
        />
      </InputContainer>
    </>
  );
};

export default UserProfile;

