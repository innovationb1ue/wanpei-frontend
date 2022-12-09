import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import styles from "./register.module.scss"
import {useFormControl} from "@mui/material";
import Copyright from "@components/CopyRight";
import {useRouter} from "next/router";
import Button from "@mui/material/Button";
import {ArrowBack} from "@mui/icons-material";

const theme = createTheme();

const Register: React.FC = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    // submit register request
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const registerCall = await fetch("/api/user/register", {method: "POST", body: data})
        const registerResult = await registerCall.json() as API.baseResult<API.CurrentUser>
        setIsLoading(false)
        if (registerResult.code === 1) {
            await router.push("/match/index")
        } else {
            alert(`Failed. ${registerResult.message}`)
        }
    };
    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState({
        email: false,
        password: false,
        confirmPassword: false,
    })
    const msg = "两次输入的密码不一致"
    const [confirmHelper, setConfirmHelper] = useState("")

    const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        let {name, value} = evt.target
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
        validateInput(evt)
    }
    const validateInput = (evt: ChangeEvent<HTMLInputElement>) => {
        setError(prev => {
            const errorStateObj = {...prev}
            if (evt.target.name === "confirmPassword") {
                errorStateObj["confirmPassword"] = input.password !== evt.target.value;
                if (errorStateObj["confirmPassword"]) {
                    setConfirmHelper(msg)
                } else {
                    errorStateObj["confirmPassword"] = false
                    setConfirmHelper("")
                }
            }
            return errorStateObj
        })
    }

    let formCtl = useFormControl()
    if (formCtl) {
        formCtl.onFocus = () => console.log('focused')
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    className={styles.container}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignSelf: "flex-start"
                    }}>
                        <Button onClick={evt => {
                            evt.preventDefault()
                            router.push("/user/login")
                        }}
                                fullWidth
                                variant="outlined"
                                sx={{mt: 3, mb: 1, fontSize: "1rem"}}
                                endIcon={<ArrowBack/>}
                        >Login</Button>
                    </Box>

                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        注册
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            error={error.password}
                            onChange={onInputChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Repeat Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="current-password"
                            error={error.confirmPassword}
                            onChange={onInputChange}
                            helperText={confirmHelper}
                        />
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 1, fontSize: "1rem"}}
                            loading={isLoading}
                            disabled={error.confirmPassword}
                        >
                            注册
                        </LoadingButton>

                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}

export default Register