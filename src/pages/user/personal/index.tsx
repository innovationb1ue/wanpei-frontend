import TextField from "@mui/material/TextField";
import CustomizedTabs from "@components/Tabs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useSWR, {useSWRConfig} from "swr";
import {fetcher} from "@services/api";
import {useEffect, useState} from "react";
import styles from "./personal.module.scss"
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";


interface fields {
    nickname: boolean
    steam_code: boolean
    avatar_url: symbol
    description: boolean
}


const Personal = (): JSX.Element => {
    const {mutate} = useSWRConfig()
    const router = useRouter()
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const {data, error} = useSWR("/api/user/current", fetcher)
    // have to provide default value here. otherwise, the input will be rendered as uncontrolled
    const [formInput, setFormInput] = useState({
        nickname: "",
        steam_code: "",
        avatar_url: "",
        description: ""
    } as API.CurrentUser)
    const [errorStatus, setErrorStatus] = useState({} as fields)
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
        if (!steamCodeRegex.test(formInput.steam_code)) {
            setErrorStatus(prev => {
                return {...prev, steam_code: true}
            })
            enqueueSnackbar("invalid steam code", {variant: 'error'})
            return
        }
        await fetch("/api/user/modify", {method: "POST", body: JSON.stringify(formInput)}).then(async res => {
            enqueueSnackbar("修改成功")
            await mutate("/api/user/current")
            setErrorStatus(prev => {
                return {} as fields
            })
        })
    }

    if (!data && !error) {
        return <>Loading</>
    }

    return (
        <Box display={"flex"} flexDirection={"column"} maxHeight={"100vh"}>
            <CustomizedTabs currentActiveIdx={1}/>
            <Box className={styles.bottomContainer}>
                <Box className={styles.formBox}>
                    {Object.entries(formInput).map(([key, val], idx) => {
                        if (typeof val !== "string") {
                            return
                        }
                        return <TextField variant={"outlined"} label={alias[key as keyof typeof alias] ?? key}
                                          value={val}
                                          onChange={(evt) => {
                                              setFormInput({...formInput, [key]: evt.target.value})
                                          }} InputLabelProps={{shrink: val !== ""}}
                                          key={idx}
                                          className={styles.input}
                                          error={errorStatus[key as keyof typeof errorStatus] as boolean ?? false}
                                          helperText={helpers[key as keyof typeof helpers]}
                        />
                    })}
                    <Button sx={{
                        backgroundColor: '#2e1534', borderRadius: "15px", color: "white", margin: "auto", minWidth: 200,
                        ":hover": {backgroundColor: '#2e1534', opacity: 0.8}
                    }} onClick={handleSubmit}>提交修改</Button>
                </Box>
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

const helpers = {
    steam_code: "正确的好友代码可以让你们更快的开始游戏！",
    description: "其他人可以在聊天页面看到你的简介！"
}

const emailRegex = new RegExp(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
);

const steamCodeRegex = new RegExp(/^\d+$/);