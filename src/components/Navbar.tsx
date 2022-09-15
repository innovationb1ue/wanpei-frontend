import Image from "next/image";
import styles from "@/styles/Navbar.module.scss";
import Link from "next/link";
import logo from "/src/public/logo.svg"
import React from "react";

const Navbar: React.FC = (props, context) => {
    return (
        <nav className={styles.main} aria-label="Navbar">
            <Link href="/">
                <a tabIndex={0} title="Go to the Homepage">
                    <Image
                        objectFit="contain"
                        src={logo}
                        width={80}
                        height={24}
                        alt="Fylo Logo"
                        priority
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
