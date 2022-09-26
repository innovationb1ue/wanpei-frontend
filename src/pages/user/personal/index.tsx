import {FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import CustomizedTabs from "@components/Tabs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useSWR from "swr";
import {fetcher} from "@services/api";
import {useEffect, useState} from "react";
import {setIn} from "immutable";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";


const Personal = (): JSX.Element => {
    const {data, error} = useSWR("/api/user/current", fetcher)
    // have to provide default value here. otherwise, the input will be rendered as uncontrolled
    const [input, setInput] = useState({nickname: ""} as API.CurrentUser)
    // only set once when the user data is loaded from server
    useEffect(() => {
        const user = data?.data as API.CurrentUser
        if (user) {
            setInput(user)
            console.log(user)
        }
    }, [data?.data])

    const handleSubmit = () => {
        fetch("/api/user/mod")
    }

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <CustomizedTabs currentActiveIdx={1}/>
            <Box sx={{
                margin: "auto",
                justifyContent: "center",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                <TextField variant={"outlined"} label={"昵称"} value={input.nickname}
                           onChange={(evt) => {
                               setInput({...input, nickname: evt.target.value})
                           }} InputLabelProps={{shrink: input.nickname !== ""}}/>
                <Button sx={{
                    backgroundColor: '#2e1534', borderRadius: "15px", color: "white",
                    ":hover": {backgroundColor: '#2e1534', opacity: 0.8}
                }} onClick={handleSubmit}>提交修改</Button>
            </Box>
        </Box>
    )
}

export default Personal