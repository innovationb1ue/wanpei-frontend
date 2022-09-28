import React from "react";
import Box from "@mui/material/Box";
import UserTag from "@components/Chat/UserTag";
import useSWR from "swr";
import {fetcher} from "@services/api";


interface userListInterface {
    nickname: string
    avatar_url: string
    steam_code: string
    description: string
}

const ChatUserList: React.FC<{ HubID: string }> = (
    props,
    context
) => {
    const {
        data,
        error
    } = useSWR(["/api/hub/users?" + new URLSearchParams({HubID: props.HubID})], fetcher, {refreshInterval: 5000})
    if (!data && !error) {
        return <>Loading</>
    }
    if (!props.HubID) {
        return <>Empty HubID</>
    }
    if (error) {
        return <>Load failed</>
    }
    console.log(data)
    const userList = data.data as userListInterface[]
    return (
        <Box sx={{overflow: "scroll", overflowY: "hidden"}}>
            {
                userList.sort().map((val, idx) => {
                    return <UserTag nickname={val.nickname} steam_code={val.steam_code} description={val.description}
                                    key={idx}/>
                })
            }
        </Box>
    )
};

export default ChatUserList;
