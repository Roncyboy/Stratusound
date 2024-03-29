import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import styles from '@/styles/Menu.module.css';
import { Logo } from "../Logo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createStyles, Burger } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import ThemeToggle from "../ThemeToggle";

const useStyles = createStyles((theme) => ({
    navbar: {
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
        width: "15em",
        height: "100vh",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        transition: "all 0.2s ease-in-out",
        '@media (max-width: 768px)': {
            width: '5em',
        },
    },
    navLogo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem 0.5rem",
    },

    linkCont: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "80%",
    },
    link: {
    textDecoration: "none",
    fontSize: "1.5rem",
    fontWeight: 500,
    padding: "0.5rem 1rem",
    margin: "1rem 0.5rem",
    borderRadius: "0.5rem",
    transition: "all 0.2s ease-in-out",
    display: "flex",
    alignItems: "center",
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.lg,
    '@media (max-width: 768px)': {
        display: "none",
    },



    '&:hover': {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[5],
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }},

    smallLink: {
        display: "none",
        '@media (max-width: 768px)': {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem 0.5rem",
            fontSize: "1.5rem",
            fontWeight: 500,
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            transition: "all 0.2s ease-in-out",
            display: "flex",
            alignItems: "center",
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
            fontSize: theme.fontSizes.lg,
        },
    },
    linkActive: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[5],
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

    '&:hover': {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[5],
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }},
    linkIcon: {
        marginRight: "0.5rem",
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    },
    linkIconActive: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[5],
    },
    
}));



export default function Menu({ links }) {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();
    const router = useRouter();
  
    const items = links.map((link) => (
      <a
        key={link.label}
        href={link.link}
        className={cx(classes.link, { [classes.linkActive]: active === link.link })}
        onClick={(event) => {
          event.preventDefault();
          router.push(link.link);
          setActive(link.link);
          close();
        }}
      >
        <Image src={`/images/${link.icon}.svg`} width={20} height={20} className={cx(classes.linkIcon, { [classes.linkIconActive]: active === link.link })}/>
        {link.label}
      </a>
    ));

    const smallItems = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.smallLink, { [classes.linkActive]: active === link.link })}
            onClick={(event) => {
            event.preventDefault();
            router.push(link.link);
            setActive(link.link);
            close();
            }}
        >
            <Image src={`/images/${link.icon}.svg`} width={30} height={30} className={cx(classes.linkIcon, { [classes.linkIconActive]: active === link.link })}/>
        </a>
    ));

  
    return (
        <div className={classes.navbar}>
            
          <ThemeToggle />
            <div className={classes.navLogo}>
                <Logo />
            </div>
    <div className={classes.linkCont}>
        {items}
        {smallItems}
        </div>
        </div>
    );
    }
