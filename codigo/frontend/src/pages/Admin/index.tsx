import React, {useState, useEffect, useContext} from 'react';
import { Container, Header, Content } from './style';
import userService from '../../services/userService';
import UserContext from '../../context/UserContext';
import FlagIcon from '@mui/icons-material/Flag';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from "react-router-dom";
import BottomNavbar from '../../elements/BottomNavbar/BottomNavbar';

const Admin: React.FC = () => {
  const [user,setUser]= useState<string[]>([])
  const { loggedInUserId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGet = await userService.getUserById(loggedInUserId);
        setUser(responseGet.data);
      } catch (err) {
        console.error('Error in GET request:', err);
      }
    };

    fetchData();
  }, []);

  const clickReports = () => {
    navigate("/reports", { replace: true })
  }

  const clickUsers = () => {
    navigate("/users", { replace: true })
  }

  return(
    <Container>
      <Header>
        <div>
          <h1>Admin panel</h1>
        </div>
        <div>
        <img style={{width: 40, height: 40 , borderRadius: 20 }}
            src={"https://github.com/" + user.username + ".png"}
            alt="profileImg"
        />
        </div>
      </Header>
      <Content>
        <div onClick={clickReports}>
          <FlagIcon sx={{ color: 'black', width: '30px', height: '30px', marginRight:'5px' }}></FlagIcon>
          <h1>Reports</h1>
        </div>
        <div onClick={clickUsers}>
          <GroupIcon sx={{ color: 'black', width: '30px', height: '30px', marginRight:'5px' }}></GroupIcon>
          <h1>Users</h1>
        </div>
      </Content>
      <BottomNavbar></BottomNavbar>
    </Container>
  );
}

export default Admin;