import {
  Box,
  Card,
  CardMedia,
  Container,
  Divider,
  Link,
  List,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import User from "../../assets/users";
import BottomNavbar from "../../elements/BottomNavbar/BottomNavbar";
import "../../styles/GlobalStyles";
import axios from "../../axios";

const Ranking: React.FC = () => {

  interface Ranking {
    id: string;
    image: string;
    username: string;
    score: number;
  }

  
  const [data, setData] = useState<Ranking[]>([])

  useEffect(() => {
    const getUsers = async () => {
      await axios.get("/ranking").then(res => {
        setData(res.data)
      }).catch(err => {
        console.log(err)
      })
    }

    getUsers()
  }, [])

  if(!data) return null;

  return (
    <Container>
      <Typography variant="h4" fontFamily="Roboto" >Ranking</Typography>
      <List>
        {data.map((item, index) => (
          <Link href={`/user/${item.id}`} underline="none" color="inherit">
            <React.Fragment key={index}>
              <Card
                sx={{
                  my: 2,
                  border:
                    index < 1
                      ? "2px solid #EFB959"
                      : index < 2
                      ? "2px solid #B8B8B8"
                      : index < 3
                      ? "2px solid #D47D43"
                      : "2px solid #D9D9D9",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    {item.image ? (
                      <CardMedia
                        component="img"
                        src={item.image}
                        alt={item.username}
                        sx={{ width: 50, height: 50 }}
                      />
                    ) : (
                      <User width={50} color="rgba(0,0,0,0.7)" />
                    )}

                    <Typography
                      variant="h6"
                      component="p"
                      marginLeft="1em"
                    >{`${item.username}`}</Typography>
                  </Box>
                  <Typography variant="h6" marginRight="1em" component="p">
                    {item.score}
                  </Typography>
                </Box>
              </Card>
              {index !== data.length - 1 && <Divider />}
            </React.Fragment>
          </Link>
        ))}
      </List>

      <BottomNavbar />
    </Container>
  );
};

export default Ranking;
