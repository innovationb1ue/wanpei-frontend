// the index page of match making
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useCurrentUser} from "@services/api";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent, CardMedia, Divider} from "@mui/material";
import image from "@/static/img.png"
import Image from "next/image";
import GameCard from "@components/GameCard";
import Box from "@mui/material/Box";
import styles from "./index.module.scss"
import Typography from "@mui/material/Typography";


export default function Main(){
    const {res, isLoading, isError} = useCurrentUser()
    const router = useRouter()
    if (!isLoading && !isError){
        const user = res.data as API.CurrentUser
        if (!user?.["Gorm.Model"].ID === undefined || user["Gorm.Model"].ID < 0){
            console.log("pushed")
            router.push("/user/login")
            return
        }
    }
    if (isLoading){
        return
    }
    return (
        <Box className={styles.main}>
            {/* card list */}
            <Box className={styles.cardContainer}>
                <Grid container spacing={4}>
                    {games.map((game, index) => {
                        return (
                                <Grid item xs={3} key={game.gameIntId}>
                                    <GameCard gameName={game.gameName} description={game.description}
                                              gameIntId={game.gameIntId}></GameCard>
                                </Grid>
                        )
                    })}

                </Grid>
            </Box>
            <Divider orientation="vertical" flexItem />
            {/* match making column items*/}
            <Box className={styles.matchMakingContainer} flexGrow={1} flexDirection={"column"}>
                <p>Match makings 12312312321312312313123</p>
                <Typography flexGrow={1} >Place holder </Typography>
                <Button className={styles.matchMakingButton} >
                    <p>
                        开始匹配
                    </p>
                </Button>
            </Box>

        </Box>

    )
}

const games = [
    {
        gameName: "DOTA2",
        description: "Best game ever",
        gameIntId: 0
    },{
        gameName: "DOTA2",
        description: "Best game ever",
        gameIntId: 1
    },{
        gameName: "DOTA2",
        description: "Best game ever",
        gameIntId: 2
    },{
        gameName: "DOTA2",
        description: "Best game ever",
        gameIntId: 3
    },{
        gameName: "DOTA2",
        description: "Best game ever",
        gameIntId: 4
    },{
        gameName: "DOTA2",
        description: "Best game ever",
        gameIntId: 5
    },{
        gameName: "DOTA2",
        description: "Best game ever",
        gameIntId: 6
    },{
        gameName: "DOTA2",
        description: "Best game ever",
        gameIntId: 7
    },{
        gameName: "DOTA2",
        description: "Best game ever",
        gameIntId: 8
    },
]

