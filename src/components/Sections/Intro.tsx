import Image from "next/image";
import styles from "@/styles/Sections/Intro.module.scss";
import Link from "next/link";
import {useRouter} from "next/router";
import Button from "@mui/material/Button";

const Intro = () => {
    const router = useRouter()
    return (
        <section aria-labelledby="section1-title" className={styles.main}>
            <Image
                width={720}
                height={534}
                src="/illustration-intro.png"
                alt=""
                objectFit="contain"
                priority
            />
            <h1 id="section1-title">
                玩配 - 让你的游戏不再孤单
            </h1>
            <p>
                玩游戏一个朋友才是最高配置
            </p>
            <Link href={"/user/login"}>
                <Button onClick={() => {
                    router.push("/user/login")
                }}>
                    Get Started
                </Button>
            </Link>
        </section>
    );
}


export default Intro;
