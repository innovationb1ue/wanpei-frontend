import Image from "next/image";
import styles from "@/styles/Navbar.module.scss";
import Link from "next/link";
import React from "react";
import {useRouter} from "next/router";

const Navbar: React.FC<{}> = () => {
    const router = useRouter();
    return (
        <nav className={styles.main} aria-label="Navbar">
            <Link href="/">
                <a tabIndex={0} title="Go to the Homepage">
                    <Image
                        objectFit="contain"
                        src="/logo.png"
                        width={80}
                        height={80}
                        alt=""
                    />
                </a>
            </Link>
            <ul>
                <li>
                    <Link href="/user/register">
                        <a>Register</a>
                    </Link>
                </li>
                <li>
                    <Link href="/user/login">
                        <a>Sign In</a>
                    </Link>
                </li>

            </ul>
        </nav>
    );
};
export default Navbar;
