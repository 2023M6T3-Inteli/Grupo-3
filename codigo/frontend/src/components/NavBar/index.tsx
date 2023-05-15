import React from 'react';
import { FormSearch, Input } from '../../pages/Feed/FeedMain/style';
import SearchIcon from '@mui/icons-material/Search';

// import { Container } from './styles';

const NavBar: React.FC = () => {
  return (
      <FormSearch>
          <SearchIcon sx={{ color: 'Black', 'margin-right': '5px' }} />
          <Input placeholder="Seach in dell contents" type="text" />
      </FormSearch>
  );
}

export default NavBar;