import styled from "styled-components";

export const TagsInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TagsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
`;

export const TagItem = styled.li`
  background-color: #e0e0e0;
  border-radius: 4px;
  padding: 6px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

export const CloseIcon = styled.i`
  margin-left: 8px;
  cursor: pointer;
`;

export const TagsInputField = styled.input`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  width: 200px;
  margin-top: 8px;
`;