import Navbar from "@/components/Navbar";
import Intro from "@/components/Sections/Intro";
import type {NextPage} from "next";
import Head from "next/head";

import styles from "../styles/index.module.scss"
import Box from "@mui/material/Box";

const Home: NextPage = () => {
    return (
        <Box className={styles.body}>
            <Head>
                <title>
                    玩配 - 让你的游戏不再孤单
                </title>
            </Head>
            <Navbar/>
            <main className={`${styles.main} ${styles.body}`}>
                <Intro/>
                {/*<Features/>*/}
                {/*<Productivity/>*/}
                {/*<Reviews/>*/}
                {/*<Form/>*/}
                {/*<Footer/>*/}
            </main>
        </Box>
    );
};

export default Home;