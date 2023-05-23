import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import RankingComponent from "../../components/RankingComponent";
import BottomNavbar from "../../elements/BottomNavbar/BottomNavbar";
import "../../styles/GlobalStyles";

const Ranking: React.FC = () => {
  interface Ranking {
    id: string;
    image: string;
    username: string;
    score: number;
  }

  const [data, setData] = useState<Ranking[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get("/ranking")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUsers();
  }, []);

  if (!data) return null;

  return (
    <Container>
      <Typography variant="h4" fontFamily="Roboto">
        Ranking
      </Typography>

      {data ? (
        data.map((item, index) => {
          return <RankingComponent index={index} item={item} />;
        })
      ) : (
        <p className="text-xl text-gray-500">Loading...</p>
      )}
      <BottomNavbar />
    </Container>
  );
};

export default Ranking;
