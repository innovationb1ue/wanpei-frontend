import {FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import CustomizedTabs from "@components/Tabs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface PersonalProps {
    nickname: string
}

const Personal = ({nickname = "Fetching..."}: PersonalProps): JSX.Element => {
    // todo: use SWR to fetch personal info like nickname
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <CustomizedTabs currentActiveIdx={1}></CustomizedTabs>
            <Box sx={{margin: "auto", justifyContent: "center", marginTop: "10px"}}>
                <FormControl sx={{justifyContent: "center", marginTop: "10px"}}>
                    <TextField variant={"outlined"} label={"昵称"} defaultValue={nickname}></TextField>
                    <TextField variant={"outlined"} label={"Steam个人页url"}></TextField>
                    <Button sx={{
                        backgroundColor: '#2e1534', borderRadius: "15px",
                        ":hover": {backgroundColor: '#2e1534', opacity: 0.8}
                    }}>Submit</Button>
                </FormControl>
            </Box>
        </Box>
    )
}

export default Personal