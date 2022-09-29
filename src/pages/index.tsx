import Navbar from "@/components/Navbar";
import Intro from "@/components/Sections/Intro";
import type {NextPage} from "next";
import Head from "next/head";

import styles from "../styles/index.module.scss"

const Home: NextPage = () => {
    return (
        <div className={`${styles.body}`}>
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
        </div>
    );
};

export default Home;