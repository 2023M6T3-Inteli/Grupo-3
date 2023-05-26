import { Box, Card, CardMedia, Divider, List, Typography } from "@mui/material";
import User from "../../assets/users";
import { Link } from "react-router-dom";
import React from "react";

interface RankingData {
  id: string;
  image: string;
  username: string;
  score: number;
}

interface RankingComponentProps {
  item: RankingData;
  index: number;
}

const RankingComponent: React.FC<RankingComponentProps> = ({ item, index }) => {
  return (
    <List>
      <Link
        to={`/user/${item.id}`}
        style={{ textDecoration: "none" }}
        color="inherit"
      >
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
          {index !== -1 && <Divider />}
        </React.Fragment>
      </Link>
    </List>
)};

export default RankingComponent;
