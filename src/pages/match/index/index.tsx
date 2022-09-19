// the index page of match making
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {fetcher, useCurrentUser} from "@services/api";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent, CardMedia, Divider} from "@mui/material";
import image from "@/static/img.png"
import Image from "next/image";
import GameCard from "@components/GameCard";
import Box from "@mui/material/Box";
import styles from "./index.module.scss"
import Typography from "@mui/material/Typography";
import useSWR from "swr";
import GameList from "@/components/Game/GameList";


export default function Main() {
    const [selectedGames, setSelectedGames] = useState([])
    const router = useRouter()
    const {res, isLoading, isError} = useCurrentUser()
    if (!isLoading && !isError) {
        const user = res.data as API.CurrentUser
        if (user === undefined || user?.["Gorm.Model"]?.ID < 0) {
            console.log("pushed")
            router.push("/user/login")
            return
        }
    }
    if (isLoading) {
        return
    }

    const startMatchMaking = () => {
        fetch("/api/match/start", {
                method: "POST", body: JSON.stringify(
                    {"selectedGame": selectedGames}),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
    }


    return (
        <Box className={styles.main}>
            {/* card list */}
            <GameList setSelectedGame={setSelectedGames} selectedGame={selectedGames}/>
            <Divider orientation="vertical" flexItem light/>
            {/* match making column items*/}
            <Box className={styles.matchMakingContainer} flexGrow={1} flexDirection={"column"}>
                <Box sx={{
                    backgroundColor: "lightblue",
                    height: "5%",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Typography sx={{textAlign: "center"}}>Title for Match makings</Typography>
                </Box>
                <Typography flexGrow={1}>Place holder </Typography>
                <Button className={styles.matchMakingButton} onClick={startMatchMaking}>
                    <p>
                        开始匹配
                    </p>
                </Button>
            </Box>

        </Box>

    )
}

