import TextField from "@mui/material/TextField";
import CustomizedTabs from "@components/Tabs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useSWR, {useSWRConfig} from "swr";
import {fetcher} from "@services/api";
import {useEffect, useState} from "react";
import styles from "./personal.module.scss"
import {useRouter} from "next/router";


const Personal = (): JSX.Element => {
    const {mutate} = useSWRConfig()
    const router = useRouter()
    const {data, error} = useSWR("/api/user/current", fetcher)
    // have to provide default value here. otherwise, the input will be rendered as uncontrolled
    const [formInput, setFormInput] = useState({
        nickname: "",
        steam_code: "",
        avatar_url: "",
        description: ""
    } as API.CurrentUser)
    // only set once when the user data is loaded from server
    useEffect(() => {
        const user = data?.data as API.CurrentUser
        if (user) {
            setFormInput(user)
            console.log(user)
        }
    }, [data?.data])

    const handleSubmit = async () => {
        console.log(formInput)
        await fetch("/api/user/modify", {method: "POST", body: JSON.stringify(formInput)}).then(async res => {
            await mutate("/api/user/current")
            router.reload()  // just brutally force reload the page
        })
    }

    if (!data && !error) {
        return <>Loading</>
    }

    return (
        <Box display={"flex"} flexDirection={"column"}>
            <CustomizedTabs currentActiveIdx={1}/>
            <Box className={styles.formBox}>
                {Object.entries(formInput).map(([key, val], idx) => {
                    if (typeof val !== "string") {
                        // console.log(key, val)
                        return
                    }
                    return <TextField variant={"outlined"} label={alias[key as keyof typeof alias] ?? key} value={val}
                                      onChange={(evt) => {
                                          setFormInput({...formInput, [key]: evt.target.value})
                                      }} InputLabelProps={{shrink: val !== ""}}
                                      key={idx}
                                      className={styles.input}/>
                })}
                <Button sx={{
                    backgroundColor: '#2e1534', borderRadius: "15px", color: "white",
                    ":hover": {backgroundColor: '#2e1534', opacity: 0.8}
                }} onClick={handleSubmit}>提交修改</Button>
            </Box>
        </Box>
    )
}

export default Personal


const alias = {
    steam_code: "Steam好友代码",
    games: "游戏列表",
    nickname: "昵称",
    email: "邮箱",
    description: "简介"
}