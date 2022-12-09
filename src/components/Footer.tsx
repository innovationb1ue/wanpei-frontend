import {FC} from "react";
import styles from "/src/styles/Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import {IoLogoFacebook, IoLogoInstagram, IoLogoTwitter,} from "react-icons/io5";

const Footer: FC = () => {
    return (
        <footer className={styles.main}>
            <div className={styles.lgFlexMain}>
                <address>
                    <div className={styles.flex}>
                        <Icon src="location"/>
                        <p>
                            Location Unknown
                        </p>
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.flex}>
                            <Icon src="email"/>
                            <a href="mailto:realjeffblue@gmail.com">realjeffblue@gmail.com</a>
                        </div>
                    </div>
                </address>
                <nav aria-label="Footer Navigation">
                    <Links from={0} to={-3}/>
                    <br/>
                    <Links from={-3} to={links.length}/>
                </nav>
                <nav aria-label="Social Links">
                    <Link href="#">
                        <a role="link" aria-label="Facebook">
                            <IoLogoFacebook/>
                        </a>
                    </Link>
                    <Link href="#">
                        <a role="link" aria-label="Twitter">
                            <IoLogoTwitter/>
                        </a>
                    </Link>
                    <Link href="#">
                        <a role="link" aria-label="Instagram">
                            <IoLogoInstagram/>
                        </a>
                    </Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;

const Links: FC<{ from: number; to: number }> = ({from, to}) => {
    return (
        <ul>
            {links.slice(from, to).map((item, idx) => {
                return (
                    <li key={item}>
                        <Link href={hrefs[idx]}>
                            <a>{item}</a>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

const Icon: FC<{
    src: string;
}> = ({src}) => (
    <Image
        src={`/Footer-icons/icon-${src}.svg`}
        alt=""
        width={18}
        height={18}
        objectFit="contain"
    />
);

const links = [
    "About Us",
];

const hrefs = [
    "https://www.github.com/innovationb1ue"
]
