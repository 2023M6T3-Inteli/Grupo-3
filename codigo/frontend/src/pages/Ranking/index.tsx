import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import BottomNavbar from "../../elements/BottomNavbar/BottomNavbar";

const Ranking: React.FC = () => {
  //o código comentado abaixo representa a integração
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   const getUsers = async () => {
  //     await axios.get("/ranking").then(res => {
  //       setData(res.data)
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   }

  //   getUsers()
  // }, [])

  const data = [
    {
      name: "Yves",
      score: 10,
    },
    {
      name: "Marcos",
      score: 5,
    },
    {
      name: "Livia",
      score: 15,
    },
    {
      name: "Gabriel",
      score: 5,
    },
    {
      name: "Raissa",
      score: 5,
    },
    {
      name: "Bruno",
      score: 5,
    },
    {
      name: "Matheus",
      score: 5,
    },
    {
      name: "Manon",
      score: 5,
    },
    {
      name: "Ze",
      score: 5,
    },
    {
      name: "Goya",
      score: 5,
    },
    {
      name: "Goya",
      score: 5,
    },
    {
      name: "Goya",
      score: 5,
    },
    {
      name: "Goya",
      score: 5,
    },
    {
      name: "Goya",
      score: 5,
    },
    {
      name: "Goya",
      score: 5,
    },
    {
      name: "Goya",
      score: 5,
    },
  ];

  data.sort((a, b) => b.score - a.score);
  return (
    <Container maxWidth="sm">
      <Typography
        fontFamily="roboto"
        variant="h4"
        fontSize="24px"
        component="h1"
        align="left"
        gutterBottom
      >
        Ranking
      </Typography>
      <List>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    fontFamily='roboto'
                    fontSize='14px'                    
                  >
                    <span>{`${index + 1}. ${item.name}`}</span>
                    <span>{item.score}</span>
                  </Box>
                }
              />
            </ListItem>
            {index !== data.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <footer><BottomNavbar/></footer>
    </Container>
  );
};

export default Ranking;
