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
import React from "react";
import User from "../../assets/users";
import BottomNavbar from "../../elements/BottomNavbar/BottomNavbar";
import "../../styles/GlobalStyles";

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
      id: "",
      image: "https://github.com/yveslevi.png",
      name: "Yves",
      score: 10,
    },
    {
      id: "",
      image: "https://github.com/mar-vin2004.png",
      name: "Marcos",
      score: 5,
    },
    {
      id: "",
      image: "https://github.com/Livia-Coutinho.png",
      name: "Livia",
      score: 15,
    },
    {
      id: "",
      image: "https://github.com/gabreurt.png",
      name: "Gabriel",
      score: 5,
    },
    {
      id: "",
      image: "https://github.com/Ra2861.png",
      name: "Raissa",
      score: 5,
    },
    {
      id: "",
      image: "https://github.com/brun0meira.png",
      name: "Bruno",
      score: 5,
    },
    {
      id: "",
      image: "https://github.com/matheusmacedosantos.png",
      name: "Matheus",
      score: 5,
    },
  ];

  data.sort((a, b) => b.score - a.score);

  return (
    <Container>
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
                        alt={item.name}
                        sx={{ width: 50, height: 50 }}
                      />
                    ) : (
                      <User width={50} color="rgba(0,0,0,0.7)" />
                    )}

                    <Typography
                      variant="h6"
                      component="p"
                      marginLeft="1em"
                    >{`${item.name}`}</Typography>
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
