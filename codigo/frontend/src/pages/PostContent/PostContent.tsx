import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TagsInput from './Components/tagsinput';
import { CancelButton, ContainerHead, InputContainer, InputTextarea, InputTitle, PersonContainer, PostButton, Privacy, ProfileImage, ProfileImageContainer, ProfileInfo, ProfileName } from './styles';

const PostContent: React.FC = () => {
  const [postData, setPostData] = useState({
    content: '',
    image: '',
    tags: [] as string[],
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // const selectedTags = tags => console.log(tags)};

  const handlePost = () => {
    axios
      .post('/api/posts', postData)
      .then((response) => {
        console.log('Post criado com sucesso:', response.data);
        setPostData({
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
        <PostButton onClick={handlePost}>Post</PostButton>
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
      <InputTitle
          ref={inputRef}
          placeholder="Digite seu título aqui..."
          rows={1}
          onChange={(e) => {
            const textarea = e.target as HTMLTextAreaElement;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight} px`;
          }}
        />

        <InputTextarea
          ref={inputRef}
          placeholder="Digite seu texto..."
          rows={7}
          onChange={(e) => {
            const textarea = e.target as HTMLTextAreaElement;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight} px`;
          }}
        />
        
        <TagsInput selectedTags={selectedTags} />

      </InputContainer>
    </>
  );
};

export default PostContent;
