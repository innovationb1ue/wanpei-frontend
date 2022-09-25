import {Tab, Tabs} from "@mui/material";
import {styled} from '@mui/material/styles';
import React from "react";
import Box from "@mui/material/Box";
import {useRouter} from "next/router";


interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{children: <span className="MuiTabs-indicatorSpan"/>}}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
    },
});

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({theme}) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
        color: '#fff',
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
}));

interface CustomizedTabsProps {
    currentActiveIdx?: number
}

const CustomizedTabs = ({currentActiveIdx}: CustomizedTabsProps) => {
    const [value, setValue] = React.useState(currentActiveIdx ? currentActiveIdx : 0);
    const router = useRouter()
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (newValue === 1) {
            router.push("/match/personal")
        } else if (newValue === 0) {
            router.push("/match/index")
        }
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{bgcolor: '#2e1534'}}>
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                >
                    <StyledTab label="玩家匹配"/>
                    <StyledTab label="个人中心"/>
                </StyledTabs>
            </Box>
        </Box>
    );
}

export default CustomizedTabs
