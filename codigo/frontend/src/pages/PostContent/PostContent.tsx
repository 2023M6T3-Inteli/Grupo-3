import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TagsInput from './Components/tagsinput';
import { CancelButton, ContainerHead, InputContainer, InputTextarea, InputTitle, PersonContainer, PostButton, Privacy, ProfileImage, ProfileImageContainer, ProfileInfo, ProfileName } from './styles';
import GlobalStyles from '../../styles/GlobalStyles';

const PostContent: React.FC = () => {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    tags: [] as string[],
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handlePost = () => {
    axios
      .post('/api/posts', postData)
      .then((response) => {
        console.log('Post criado com sucesso:', response.data);
        setPostData({
          title: '',
          description: '',
          content: '',
          image: '',
          tags: [],
        });
        setSelectedTags([]);
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao criar o post:', error);
      });
  };

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const username = 'brun0meira'; // Substitua pelo nome de usuário do GitHub desejado
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        setAvatarUrl(data.avatar_url);
      } catch (error) {
        console.error('Ocorreu um erro ao obter os dados do usuário:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const navigate = useNavigate();
  const handleOnClickHome = useCallback(
    () => navigate("/feed", { replace: true }),
    [navigate]
);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  return (
    <>
    <GlobalStyles/>                 
      <ContainerHead>
        <CancelButton onClick={handleOnClickHome}>Cancel</CancelButton>
        <PostButton onClick={handlePost}>Post</PostButton>
      </ContainerHead>
      <PersonContainer>
        <ProfileImageContainer>
          <ProfileImage src={avatarUrl} alt="Foto de perfil" />
        </ProfileImageContainer>
        <ProfileInfo>
          <ProfileName>Bruno</ProfileName>
          <Privacy>Public</Privacy>
        </ProfileInfo>
      </PersonContainer>
      <InputContainer>
        <InputTitle
          ref={titleRef}
          placeholder="Digite seu título aqui..."
          onChange={(e) => {
            const input = e.target as HTMLInputElement;
            setPostData((prevData) => ({
              ...prevData,
              title: input.value,
            }));
          }}
        />

        <InputTextarea
          ref={contentRef}
          placeholder="Digite seu texto..."
          rows={7}
          onChange={(e) => {
            const textarea = e.target as HTMLTextAreaElement;
            setPostData((prevData) => ({
              ...prevData,
              content: textarea.value,
            }));
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
          }}
        />

        <TagsInput
          selectedTags={selectedTags}
          onChange={(tags) => {
            setPostData((prevData) => ({
              ...prevData,
              tags: tags,
            }));
            setSelectedTags(tags);
          }}
        />
      </InputContainer>
    </>
   );
  };
  
  export default PostContent;
  
