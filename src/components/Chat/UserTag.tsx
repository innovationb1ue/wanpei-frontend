import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import React from "react";
import styles from "./usertag.module.scss"
import Typography from "@mui/material/Typography";
import {Tooltip} from "@mui/material";

interface UserTagProps {
    nickname: string
    avatar_url?: string
}

const UserTag = ({nickname}: UserTagProps): JSX.Element => {
    return (
        <Box className={styles.tag}>
            <Avatar>{nickname.slice(0, 2)}</Avatar>
            <Tooltip title={<Typography>{nickname}</Typography>} placement={"top"} followCursor sx={{fontSize: "25px"}}
                     enterDelay={500}>
                <Typography
                    sx={{cursor: "default"}}>{nickname.length > 12 ? nickname.slice(0, 12) + "..." : nickname}
                </Typography>
            </Tooltip>

        </Box>
    )
}

export default UserTag