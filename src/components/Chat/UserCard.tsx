import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

interface cardProps {
    nickname: string;
    description?: string
    steam_code?: string
}

const UserCard = ({nickname, description, steam_code}: cardProps): JSX.Element => {
    return (
        <>
            <Card sx={{minWidth: 275, padding: 0}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {nickname}
                    </Typography>
                    <Typography variant="h5" component="div" minHeight={"20px"} maxHeight={"100px"}>
                        {description}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        Steam Friend Code
                    </Typography>
                    <Typography variant="body2">
                        {steam_code}
                        <br/>
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default UserCard