// the index page of match making
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {useCurrentUser} from "@services/api";
import {useRouter} from "next/router";
import {Divider, FormControl, FormGroup, Tooltip} from "@mui/material";

import Box from "@mui/material/Box";
import styles from "./index.module.scss";
import Typography from "@mui/material/Typography";
import GameList from "@/components/Game/GameList";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CustomizedTabs from "@components/Tabs";
import {HelpOutlineRounded} from "@mui/icons-material";
import baseResult = API.baseResult;

let socket: WebSocket | undefined;

export default function Main() {
    const router = useRouter();
    // checkbox state in menu
    const [checked, setChecked] = useState({ck1: false, ck2: true});
    // the start matching button text
    const [matchBtnText, setMatchBtnText] = useState("开始匹配")
    // MatchMaking button status for debouncing.
    const [isDisabled, setIsDisabled] = useState(false)
    // flag for doing match making.
    const [isMatching, setIsMatching] = useState(false)
    // state for selected game card
    const [selectedGames, setSelectedGames] = useState([]);
    // variate the btn text when matching status changed
    useEffect(() => {
        setMatchBtnText(isMatching ? "取消匹配" : "开始匹配")
    }, [isMatching])

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
                body: JSON.stringify({selectedGame: selectedGames}),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(async (res) => {
                    const body = (await res.json()) as { message: string; data: string };
                    const token = body.data as string;
                    socket = new WebSocket(
                        `wss://${window.location.hostname}:8096/match/socket?auth=${token}&selectedGame=${selectedGames}`
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
                                    sx={{whiteSpace: "nowrap", fontSize: "40px"}}>
                            匹配设置
                        </Typography>
                    </Box>
                    <Box className={styles.matchMakingMiddleEle}>
                        <FormControl>
                            <FormGroup color={"white"}>
                                <FormControlLabel
                                    control={<Checkbox checked={checked.ck1}/>}
                                    checked={checked.ck1}
                                    onChange={(event: React.SyntheticEvent, checked) => {
                                        setChecked((old) => {
                                            return {...old, ck1: checked};
                                        });
                                        console.log(`ck1 = ${checked}`);
                                    }}
                                    label="可以点着玩"
                                />
                            </FormGroup>
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
