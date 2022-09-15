import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

export default function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright ©  '}
            <Link color="inherit" href="https://github.com/innovationb1ue/">
                innovationb1ue
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}