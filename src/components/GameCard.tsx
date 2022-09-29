import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";

interface gameCardProps {
    gameName: string,
    description?: string,
    gameIntId: number,
    imgUrl: string,
    onClick?: Function,
}

const GameCard: React.FC<gameCardProps> = (props: gameCardProps) => {
    return (
        <Card sx={{
            maxWidth: 345,
            cursor: "pointer",
            height: 300,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
        }}
              onClick={(evt => {
                  props.onClick?.(props.gameIntId)
              })}>
            <Box height={"60%"} width={"100%"} overflow={"hidden"} justifyContent={"center"} display={"flex"}>
                <CardMedia
                    component="img"
                    sx={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        padding: "auto"
                    }}
                    src={props.imgUrl}
                />
            </Box>
            <CardContent sx={{minHeight: "40%", maxHeight: "40%", height: "40%"}}>
                <Typography gutterBottom variant="h6" component="div">
                    {props.gameName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    )
}


export default GameCard