import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";

interface gameCardProps {
    gameName: string,
    description?: string,
    gameIntId: number
}

const GameCard = (props: gameCardProps) => {
    return (
        <>
            <Card sx={{maxWidth: 345, cursor: "pointer"}} onClick={(evt) => {
                console.log(evt)
            }} >
                <CardMedia
                    component="img"
                    height="140"
                    src="/lizzard.png"
                >
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.gameName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}


export default GameCard