import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import React from "react";
import styles from "./usertag.module.scss"
import Typography from "@mui/material/Typography";
import {ThemeProvider, Tooltip} from "@mui/material";
import UserCard from "@components/Chat/UserCard";
import {createTheme} from "@mui/material/styles";

interface UserTagProps {
    nickname: string
    avatar_url?: string
    description?: string
    steam_code?: string
}

const theme = createTheme({
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    padding: 0 // remove the unnecessary padding in player card
                }
            }
        }
    }
})


const UserTag = ({nickname, steam_code, description}: UserTagProps): JSX.Element => {
    return (
        <Box className={styles.tag}>
            <Avatar>{nickname.slice(0, 2)}</Avatar>
            <ThemeProvider theme={theme}>
                <Tooltip title={<UserCard nickname={nickname} steam_code={steam_code} description={description}/>}
                         placement={"top"}
                         sx={{fontSize: "25px", paddingLeft: 0}}
                         enterDelay={1000} leaveDelay={200}
                         className={styles.tooltip}>
                    <Typography className={styles.name}
                                sx={{
                                    cursor: "default"
                                }}>{nickname.length > 10 ? nickname.slice(0, 10) + "..." : nickname}
                    </Typography>
                </Tooltip>
            </ThemeProvider>
        </Box>
    )
}

export default UserTag