import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

interface gameCardProps {
    gameName: string,
    description?: string,
    gameIntId: number,
    imgUrl: string,
    onClick?: Function,
}

const GameCard: React.FC<gameCardProps> = (props: gameCardProps) => {
    return (
        <Card sx={{maxWidth: 345, cursor: "pointer", height: 300, overflow: "hidden"}}
              onClick={(evt => {
                  props.onClick?.(props.gameIntId)
              })}>
            <CardMedia
                component="img"
                height="60.6%"
                src={props.imgUrl}
            >
            </CardMedia>
            <CardContent sx={{maxHeight: "30%"}}>
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