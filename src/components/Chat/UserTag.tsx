import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import React from "react";
import styles from "./usertag.module.scss"
import Typography from "@mui/material/Typography";
import {Tooltip} from "@mui/material";
import UserCard from "@components/Chat/UserCard";

interface UserTagProps {
    nickname: string
    avatar_url?: string
    description?: string
    steam_code?: string
}

const UserTag = ({nickname, steam_code, description}: UserTagProps): JSX.Element => {
    return (
        <Box className={styles.tag}>
            <Avatar>{nickname.slice(0, 2)}</Avatar>
            <Tooltip title={<UserCard nickname={nickname} steam_code={steam_code} description={description}/>}
                     placement={"top"}
                     sx={{fontSize: "25px", padding: "0"}}
                     enterDelay={500} leaveDelay={200}>
                <Typography
                    sx={{cursor: "default"}}>{nickname.length > 12 ? nickname.slice(0, 12) + "..." : nickname}
                </Typography>
            </Tooltip>

        </Box>
    )
}

export default UserTag