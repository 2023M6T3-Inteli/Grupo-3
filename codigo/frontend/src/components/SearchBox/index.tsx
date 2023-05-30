import React from 'react';
import { FormSearch, Input } from './style';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox: React.FC = () => {
  return (
    <FormSearch>
      <SearchIcon sx={{ color: '#0672CB', 'margin-right': '5px' }} />
      <Input placeholder="Seach in dell contents" type="text" />
    </FormSearch>
  );
}

export default SearchBox;