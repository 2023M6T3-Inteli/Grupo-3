import React, {useState, useContext, useEffect} from 'react';
import { Container, Header, Content, UserCard } from './style';
import UserContext from '../../context/UserContext';
import userService from '../../services/userService';
import { useNavigate } from "react-router-dom";
import BottomNavbar from '../../elements/BottomNavbar/BottomNavbar';
import DeleteIcon from '@mui/icons-material/Delete';

const Users: React.FC = () => {
  const [user,setUser]= useState<string[]>([])
  const [newUsers, setNewUsers]= useState<string[]>([])
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

      try {
        const responseGetUsers = await userService.getAllUsers();
        setNewUsers(responseGetUsers.data);
      } catch (err) {
        console.error('Error in GET request:', err);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId: string) => {
    console.log("TESTEEE")
    try {
      const responseDelUsers = await userService.deleteUser(userId);
      console.log(responseDelUsers.data);
    } catch (err) {
      console.error('Error in Delete request:', err);
    }
  }
  
  return (
    <Container>
      <Header>
        <div>
          <h1>Users</h1>
        </div>
        <div>
          <img style={{width: 40, height: 40 , borderRadius: 20 }}
              src={"https://github.com/" + user.username + ".png"}
              alt="profileImg"
          />
        </div>
      </Header>
      <Content>
        {
          newUsers.map((newUser: any) => {
            return (
              <UserCard key={newUser.id}>
                <div>
                  <img style={{width: 40, height: 40 , borderRadius: 20, marginRight: '5px' }}
                    src={"https://github.com/" + newUser.username + ".png"}
                    alt="profileImg"
                  />
                  <h3>{newUser.name}</h3>
                </div>
                <div>
                  <button style={{zIndex:2, cursor:"pointer"}} onClick={() => deleteUser(newUser.id)}>
                    <DeleteIcon></DeleteIcon>
                  </button>
                </div>
              </UserCard>
            );
          })
        }
      </Content>
      <BottomNavbar></BottomNavbar>
    </Container>
  );
}

export default Users;