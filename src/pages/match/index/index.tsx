// the index page of match making
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {fetcher, useCurrentUser} from "@services/api";
import {useRouter} from "next/router";
import {Divider, FormControl, Radio, RadioGroup, Tooltip} from "@mui/material";

import Box from "@mui/material/Box";
import styles from "./index.module.scss";
import Typography from "@mui/material/Typography";
import GameList from "@/components/Game/GameList";
import FormControlLabel from "@mui/material/FormControlLabel";
import CustomizedTabs from "@components/Tabs";
import {HelpOutlineRounded} from "@mui/icons-material";
import {settings} from "@custom.settings";
import useSWR from "swr";
import baseResult = API.baseResult;

const socketHost = settings.socketHost

let socket: WebSocket | undefined;


export default function Main() {
    const router = useRouter();
    // checkbox state in menu
    const [matchType, setMatchType] = useState("1v1");
    // the start matching button text
    const [matchBtnText, setMatchBtnText] = useState("开始匹配")
    // MatchMaking button status for debouncing.
    const [isDisabled, setIsDisabled] = useState(false)
    // flag for doing match making.
    const [isMatching, setIsMatching] = useState(false)
    // state for selected game card
    const [selectedGames, setSelectedGames] = useState([]);
    // current online players
    const [playerCount, setPlayerCount] = useState(0);
    // variate the btn text when matching status changed
    useEffect(() => {
        setMatchBtnText(isMatching ? "取消匹配" : "开始匹配")
    }, [isMatching])

    // current matchmaking player count
    const {data, error} = useSWR("/api/match/count", fetcher)
    // login status check
    const {res, isLoading, isError} = useCurrentUser();
    if (!isLoading && !isError) {
        const user = res.data as API.CurrentUser;
        if (user === undefined || user?.["Gorm.Model"]?.ID < 0) {
            router.push("/user/login");
            return;
        }
    }
    if (isLoading) {
        return;
    }

    // handle match type selection
    const handleMatchTypeSelect = (evt: any, p2: string) => {
        setMatchType(p2)
    }

    // handle the Websocket message here
    const handleSocketMessage = (data: SOCKET.socketMessage<{ ID: string }>) => {
        console.log(data)
        switch (data.action) {
            case "close":
                console.log("server closing the socket");
                socket?.close();
                return;
            case "success":
                const roomID = data.data.ID;
                router.push(`/match/success?ID=${roomID}`);
        }
    };

    const clickedMatchBtn = () => {
        if (!isMatching) {
            fetch("/api/match/start", {
                method: "POST",
                body: JSON.stringify({selectedGame: selectedGames, matchType: matchType}),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(async (res) => {
                    const body = (await res.json()) as { message: string; data: string };
                    const token = body.data as string;
                    socket = new WebSocket(
                        `${socketHost()}/match/socket?auth=${token}&selectedGame=${selectedGames}`
                    );
                    socket.onmessage = (ev) => {
                        handleSocketMessage(JSON.parse(ev.data));
                    };
                    setIsMatching(true)
                })
                .catch((e) => {
                    throw e;
                });
        } else {
            // Debounce the button when performing request.
            setIsDisabled(true)
            fetch("/api/match/stop", {method: "POST"}).then(async (r) => {
                console.log(r)
                const res = await r.json() as baseResult<undefined>
                if (res.code === 1) {
                    socket?.close(1000) // normal closure
                    socket = undefined
                    setIsMatching(false)
                    setIsDisabled(false)
                } else {
                    console.log(res.code)
                }
            }).catch((res) => {
                console.log(res)
                setIsDisabled(false)
            })
        }

    };

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Navbar */}
            <CustomizedTabs/>
            <Box className={styles.main}>
                {/* card list */}
                <Tooltip title={"点击游戏卡片选取要匹配的游戏"}>

                    <HelpOutlineRounded color={"info"} sx={{fontSize: "30px", marginRight: "5px"}}/>
                </Tooltip>
                <GameList
                    setSelectedGame={setSelectedGames}
                    selectedGame={selectedGames}
                />
                <Divider orientation="vertical" flexItem color={"white"}/>
                {/* match making column items*/}
                <Box className={styles.matchMakingContainer}>
                    <Box className={styles.matchMakingTopEle}>
                        <Typography className={styles.matchMakingTitle} fontWeight={"bold"}
                                    sx={{whiteSpace: "nowrap", fontSize: "40px", textAlign: "center"}}>
                            匹配设置
                        </Typography>
                        <Typography sx={{fontSize: "12px", alignSelf: "flex-start"}}>
                            当前匹配中人数 {data ? data.count : "null"}
                        </Typography>
                    </Box>
                    <Box className={styles.matchMakingMiddleEle}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={matchType}
                                onChange={handleMatchTypeSelect}
                            >
                                <FormControlLabel value="1v1" control={<Radio/>} label="1v1"/>
                                <FormControlLabel value="1v2" control={<Radio/>} label="1v2"/>
                                <FormControlLabel value="1v3" control={<Radio/>} label="1v3"/>
                                <FormControlLabel value="1v4" control={<Radio/>} label="1v4"/>
                            </RadioGroup>
                        </FormControl>

                    </Box>
                    <Box className={styles.matchMakingBottomEle}>
                        <Button
                            onClick={(evt) => {
                                evt.preventDefault()
                                clickedMatchBtn()
                            }}
                            className={isMatching ? styles.DoingMatchMaking : styles.matchMakingButton}
                            sx={{borderRadius: "50%"}}
                            disabled={isDisabled}
                        >
                            <p>{matchBtnText}</p>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
