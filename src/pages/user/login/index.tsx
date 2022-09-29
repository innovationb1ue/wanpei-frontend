import * as React from "react";
import {useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Copyright from "@components/CopyRight";
import {useRouter} from "next/router";
import {useCurrentUser} from "@services/api";
import {Alert, Snackbar} from "@mui/material";

const theme = createTheme();

export default function SignIn() {
    const router = useRouter();
    const [loginErrorOpen, setLoginErrorOpen] = useState(false);
    const [user, setUser] = useState({} as API.CurrentUser)
    const {res, isLoading, isError} = useCurrentUser();

    if (!isLoading && !isError) {
        const user = res.data as API.CurrentUser;
        if (user !== undefined && user?.["Gorm.Model"]?.ID >= 0) {
            console.log("should push to match/index");
            router.push("/match/index");
        }
    }
    if (isLoading) {
        return;
    }

    if (user?.id > 0) {
        router.push("/match/index")
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        JSON.stringify(Object.fromEntries(data));
        const req = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(data)),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = (await req.json()) as API.baseResult<any>;
        if (res.message !== "ok") {
            setLoginErrorOpen(true);
            return;
        }
        const currentReq = await fetch("/api/user/current", {method: "GET"});
        const currentRes =
            (await currentReq.json()) as API.baseResult<API.CurrentUser>;

        if (
            currentRes?.data?.["Gorm.Model"]?.ID !== undefined &&
            currentRes?.data?.["Gorm.Model"]?.ID >= 0
        ) {
            console.log("should push to match/index");
            event.preventDefault()
            await router.push("/match/index")
            return
        } else {
            console.log("unknown error")
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        登陆
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{mt: 1}}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/user/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
            <Snackbar
                open={loginErrorOpen}
                autoHideDuration={4000}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                onClose={(event?: React.SyntheticEvent | Event, reason?: string) => {
                    if (reason === "clickaway") {
                        return;
                    }
                    setLoginErrorOpen(false);
                }}
                sx={{marginTop: 0, opacity: 0.9}}
            >
                <Alert severity={"error"}> Wrong password or user not exist</Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
