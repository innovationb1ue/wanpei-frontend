// the index page of match making
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {useCurrentUser} from "@services/api";
import {useRouter} from "next/router";
import {Divider, FormControl, FormGroup} from "@mui/material";

import Box from "@mui/material/Box";
import styles from "./index.module.scss";
import Typography from "@mui/material/Typography";
import GameList from "@/components/Game/GameList";
import {SOCKET} from "@api/socket";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CustomizedTabs from "@components/Tabs";

let socket: WebSocket;

export default function Main() {
    const [checked, setChecked] = useState({ck1: false, ck2: true})
    const [selectedGames, setSelectedGames] = useState([]);
    const router = useRouter();
    const {res, isLoading, isError} = useCurrentUser();
    if (!isLoading && !isError) {
        const user = res.data as API.CurrentUser;
        if (user === undefined || user?.["Gorm.Model"]?.ID < 0) {
            console.log("pushed");
            router.push("/user/login");
            return;
        }
    }
    if (isLoading) {
        return;
    }

    // handle the Websocket message here
    // todo: abstract this ugly thing..
    const handleSocketMessage = (data: SOCKET.socketMessage<{ ID: string }>) => {
        switch (data.action) {
            case "close":
                console.log("server closing the socket");
                socket.close();
                return;
            case "success":
                const roomID = data.data.ID;
                router.push(`/match/success?ID=${roomID}`);
        }
    };

    const startMatchMaking = () => {
        fetch("/api/match/start", {
            method: "POST",
            body: JSON.stringify({selectedGame: selectedGames}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                const body = (await res.json()) as { message: string; data: string };
                const token = body.data as string;
                socket = new WebSocket(
                    `ws://${window.location.hostname}:8096/match/socket?auth=${token}&selectedGame=${selectedGames}`
                );
                socket.onmessage = (ev) => {
                    console.log(ev);
                    handleSocketMessage(JSON.parse(ev.data));
                };
            })
            .catch((e) => {
                throw e;
            });
    };

    return (
        <Box sx={{width: "100vw", height: '100vh', display: "flex", flexDirection: 'column'}}>
            <CustomizedTabs/>
            <Box className={styles.main}>
                {/* card list */}
                <GameList
                    setSelectedGame={setSelectedGames}
                    selectedGame={selectedGames}
                />
                <Divider orientation="vertical" flexItem color={"white"}/>
                {/* match making column items*/}
                <Box className={styles.matchMakingContainer}>
                    <Box className={styles.matchMakingTopEle}>
                        <Typography className={styles.matchMakingTitle}>
                            匹配菜单
                        </Typography>
                    </Box>
                    <Box className={styles.matchMakingMiddleEle}>
                        <FormControl>
                            <FormGroup color={"white"}>
                                <FormControlLabel control={<Checkbox checked={checked.ck1}/>}
                                                  checked={checked.ck1}
                                                  onChange={(event: React.SyntheticEvent, checked) => {
                                                      setChecked((old) => {
                                                          return {...old, ck1: checked}
                                                      });
                                                      console.log(`ck1 = ${checked}`)
                                                  }}
                                                  label="Label"/>
                            </FormGroup>
                        </FormControl>

                        <Typography>Place holder </Typography>
                    </Box>
                    <Box className={styles.matchMakingBottomEle}>
                        <Button onClick={startMatchMaking} className={styles.matchMakingButton}>
                            <p>开始匹配</p>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
