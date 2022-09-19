import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
        <Card sx={{maxWidth: 345, cursor: "pointer", height: 300}} onClick={(evt => {
            props.onClick?.(props.gameIntId)
        })}>
            <CardMedia
                component="img"
                height="66.6%"
                src={props.imgUrl}
            >
            </CardMedia>
            <CardContent sx={{maxHeight: "30%"}}>
                <Typography gutterBottom variant="h5" component="div">
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