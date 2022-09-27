import {Tab, Tabs, Theme} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import {useRouter} from "next/router";
import {SxProps} from "@mui/system";
import Link from "@mui/material/Link";

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{children: <Link className="MuiTabs-indicatorSpan"/>}}
    />
))({
    "& .MuiTabs-indicator": {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
        maxWidth: 40,
        width: "100%",
        backgroundColor: "#635ee6",
    },
});

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({theme}) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
        color: "#fff",
    },
    "&.Mui-focusVisible": {
        backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
}));

interface CustomizedTabsProps {
    currentActiveIdx?: number;
}

const CustomizedTabs = ({currentActiveIdx}: CustomizedTabsProps) => {
    const [value, setValue] = React.useState(
        currentActiveIdx ? currentActiveIdx : 0
    );
    const router = useRouter();
    const handleChange = (event: React.SyntheticEvent, idx: number) => {
        setValue(idx);
        event.preventDefault();
        switch (idx) {
            case 0:
                router.push("/match/index");
                break;
            case 1:
                router.push("/user/personal");
                break;
            case 3:
                fetch("/api/user/logout").then((res: Response) => {
                });
                document.cookie = "wanpei-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.location.href = "/user/login";
        }
    };

    return (
        <Box sx={{width: "100%"}}>
            <Box sx={{bgcolor: "#2e1534"}}>
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                >
                    <StyledTab label="玩家匹配"/>
                    <StyledTab label="个人中心"/>
                    <Tab
                        sx={{
                            flexGrow: 1,
                            maxWidth: "100vw",
                            minWidth: 0,
                            margin: 0,
                            padding: 0,
                        }}
                    />
                    <StyledTab label="退出登陆"/>
                </StyledTabs>
            </Box>
        </Box>
    );
};

export default CustomizedTabs;
