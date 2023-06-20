import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import CancelIcon from '@mui/icons-material/Cancel';

interface TagsInputProps {
  selectedTags?: (tags: string[]) => void;
  onSubmit?: (tags: string[]) => void;
}

const TagsInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TagsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
`;

const TagItem = styled.li`
  background-color: #e0e0e0;
  border-radius: 4px;
  padding: 6px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

const CloseIcon = styled.i`
  margin-left: 8px;
  cursor: pointer;
`;

const TagsInputField = styled.input`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  margin: 10px auto; /* Adiciona "auto" para centralizar horizontalmente */
  width: 95%;
  margin-top: 8px;
`;

const CancelTagButton = styled(CancelIcon)`
  cursor: pointer;
  color: #7E7E7E; 
  margin-left: 8px;
  height: 20px;
  width: 20px;
  border-radius:0;
`;

const TagsInput: React.FC<TagsInputProps> = (props) => {
  const [tags, setTags] = useState<string[]>([]);

  const addTags = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value !== "") {
      const newTags = [...tags, event.currentTarget.value];
      setTags(newTags);
      if(props.onSubmit){
        props.onSubmit(newTags);
      }
      event.currentTarget.value = "";
    }
  };

  const removeTags = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <TagsInputContainer>
      <TagsList>
        {tags.map((tag, index) => (
          <TagItem key={index}>
            <span>{tag}</span>
            <CancelTagButton  onClick={() => removeTags(index)}/>            
          </TagItem>
        ))}
      </TagsList>
      <TagsInputField
        type="text"
        onKeyUp={addTags}
        placeholder="Press enter to add tags"
      />
    </TagsInputContainer>
  );
};

export default TagsInput;
