import Image from "next/image";
import {createElement, FC} from "react";
import styles from "@/styles/Sections/Features.module.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


const Features: FC = () => {
    return (
        <section aria-label="Features" className={styles.main}>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2} sx={{flexDirection: "row"}}>
                    {elements.map(({image, text, title}, id) => {
                        console.log(id)
                        return (
                            <Grid key={`Feature-${id}`} xs={6} item>
                                <Image
                                    width={75}
                                    height={75}
                                    src={image}
                                    objectFit="contain"
                                    priority
                                    alt=""
                                />
                                {createElement(`h${1 + id}`, null, title)}
                                <Box className={styles.textBox}>
                                    <p>{text}</p>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </section>
    );
};


export default Features;

const elements = [
    {
        image: "/icon-security.svg",
        title: "安全聊天",
        text: `1对1或者多人在线群聊，数据加密保障。`,
    },
    {
        image: "/icon-access-anywhere.svg",
        title: "随时登陆",
        text: `只需要浏览器，无论是电脑还是手机，随时匹配游戏好友`,
    },
    {
        image: "/icon-collaboration.svg",
        title: "短延时",
        text: `实时交流无障碍`,
    },
    {
        image: "/icon-any-file.svg",
        title: "可拓展性",
        text: `适配多平台`,
    },
];
