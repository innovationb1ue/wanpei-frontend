import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface cardProps {
    nickname: string;
    description?: string
    steam_code?: string
}

const UserCard = ({nickname, description, steam_code}: cardProps): JSX.Element => {
    return (
        <Card sx={{minWidth: 275, padding: 0, maxWidth: 350}}>
            <CardContent>
                <Typography variant={"h5"} gutterBottom>
                    {nickname}
                </Typography>
                <h3>简介</h3>
                <Typography component="div" fontSize={14} color={"text.secondary"} gutterBottom>
                    {description}
                </Typography>
                <Box flexDirection={"column"} display={"flex"}>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        Steam Friend Code:
                        {steam_code}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default UserCard