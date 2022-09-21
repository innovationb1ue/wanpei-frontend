// the index page of match making
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {fetcher, useCurrentUser} from "@services/api";
import {useRouter} from "next/router";
import {Card, CardActions, CardContent, CardMedia, Divider} from "@mui/material";

import Box from "@mui/material/Box";
import styles from "./index.module.scss"
import Typography from "@mui/material/Typography";
import useSWR from "swr";
import GameList from "@/components/Game/GameList";
import {createSocket} from "dgram";
import {bool} from "prop-types";
import socketMessage = SOCKET.socketMessage;


let socket: WebSocket

export default function Main() {
    const [selectedGames, setSelectedGames] = useState([])
    const [token, setToken] = useState("")
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

    const handleSocketMessage = (data: socketMessage) => {
        // handle the Websocket meesage here
        if (data.action === "close"){
            console.log("server closing the socket")
            socket.close()
        }
        if (data.action === "success"){
            router.push("/match/success")
        }
    }

    const startMatchMaking = () => {
        fetch("/api/match/start", {
                method: "POST", body: JSON.stringify(
                    {"selectedGame": selectedGames}),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).then(async res => {
            const body = await res.json() as {message: string, data: string}
            const token = body.data as string
            setToken(body.data)
            socket  = new WebSocket(`ws://localhost:8096/match/socket?auth=${token}`)
            socket.onmessage = (ev => {
                console.log(ev)
                handleSocketMessage(JSON.parse(ev.data) as socketMessage)
            })
        })
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

