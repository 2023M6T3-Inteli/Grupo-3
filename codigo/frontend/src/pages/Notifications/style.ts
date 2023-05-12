import { display } from '@mui/system';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  height: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* background-color: violet; */
  margin: 1em;
`;

export const SearchBar = styled.div`
  max-width: 1280px;
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  background-color: white;
  color: #0561FC;
  border: 2px solid #D9D9D9;
  margin: 1px;
  padding: 0.5em 0.5em;
`;

export const Search = styled.input`
  max-width: 1280px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  background-color: white;
  color: red;
  border: 1em;
  border-color: #D9D9D9;
  margin-left: 0em;
  margin-right: 0em;
  padding: 0em 0em;
  font-size:0.9em;
  font-style: roboto;
`;

export const Trending = styled.div`
  max-width: 1280px;
  width: 300px;
  height: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: left;
  background-color: white;
  margin: 0em 0em 1em -3.7em;
  padding: 0em 0em 0em 0em;
  color: #0561FC;
`;

export const TrendingText = styled.p`
  max-width: 1280px;
  width: 38vw;
  height: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: left;
  background-color: white;
  margin: 0em 1em 1em 1em;
  padding: 0em 0em 0em 0em;
  font-size: 15px;
  color: black;
`;

export const Notificationsfeed = styled.div`
  max-width: 1280px;
  width: 300px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  background-color: white;
  margin: 0em 0em 1em -3.7em;
  padding: 0em 0em 0em 0em;
  color: black;
`;

export const Favoritedcard = styled.button`
  max-width: 1280px;
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  background-color: white;
  color: black;
  border: 2px solid #D9D9D9;
  margin: 10px 0px 0px 0px;
  padding: 0.5em 0.5em;
`;

export const Trendingcard = styled.button`
  max-width: 1280px;
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  background-color: white;
  color: black;
  border: 2px solid #D9D9D9;
  margin: 10px 0px 0px 0px;
  padding: 0.5em 0.5em;
`;