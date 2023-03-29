import Head from 'next/head';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import window from '../data/window';
import { Drawer, Button, Group } from '@mantine/core';
import { PalLotties, WindowWeather } from '@/components/Lotties/WindowLotties';
import { createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';




const useStyles = createStyles((theme) => ({
    window: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // width: "100vw",
    },
    windowContainer: {
    },
    windowContainerLeft: {
    },
    windowContainerLeftBackground: {
        zIndex: "3",
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
    windowContainerLeftRoom: {
        display: "flex",
        position: "absolute",
        left: "0",
        top: "0",
        zIndex: "1",
        width: "100%",
        height: "100%",
    },
    windowContainerLeftCurtains: {
        position: "absolute",
        zIndex: "6",
        height: "50vh",
        width: "50vw",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
    window__container__left : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        
        // height: "100vh",
        // width: "100vw",
        // position: "relative",
    },
    drawerButton: {
        position: "fixed",
        bottom: "4rem",
        right: "4rem",
        zIndex: "999",
    },
    windowContainerPal: {
        display: "flex",
        position: "absolute",
        height: "25%",
        width: "25%",
        zIndex: "9",
        bottom: "0",
        left: "0",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
    windowSizing: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        width: "50vw",
        position: "relative",
        margin: "0 auto",
    },
    weatherOverlay: {
        position: "absolute",
        top: '1',
        left: '0',
        justifyContent: "center",
        alignItems: "center",
        height: "50%",
        width: "50%",
        zIndex: "4",
    },

    weatherBg : {
        position: 'absolute',
        height: "100%",
        width: "100%",
        bottom: "0",
        left: "0",
        zIndex: "2",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },

}));



export default function Window() {
    const [selectedBackground, setSelectedBackground] = useState([0]);
    const [selectedRoom, setSelectedRoom] = useState([0]);
    const [selectedWindowFrame, setSelectedWindowFrame] = useState([0]);
    const [selectedWindowSill, setSelectedWindowSill] = useState([0]);
    const [selectedWeather, setSelectedWeather] = useState([3]);

    const backgroundScene = window.backgroundScene;
    const roomScene = window.roomScene;
    const windowFrame = window.windowFrame;
    const windowSill = window.windowSill;
    const weatherBg = window.weatherBg;
    const { classes, cx } = useStyles();

    useEffect (() => {
        const background = localStorage.getItem('background');
        const room = localStorage.getItem('room');
        const windowFrame = localStorage.getItem('windowFrame');
        const windowSill = localStorage.getItem('windowSill');
        const weather = localStorage.getItem('weather');

        if (background) {
            setSelectedBackground(JSON.parse(background));
        }
        if (room) {
            setSelectedRoom(JSON.parse(room));
        }
        if (windowFrame) {
            setSelectedWindowFrame(JSON.parse(windowFrame));
        }
        if (windowSill) {
            setSelectedWindowSill(JSON.parse(windowSill));
        }
        // if (weather) {
        //     setSelectedWeather(JSON.parse(weather));
        // }

    }, []);

    function saveChanges () {
        localStorage.setItem('background', JSON.stringify(selectedBackground));
        localStorage.setItem('room', JSON.stringify(selectedRoom));
        localStorage.setItem('windowFrame', JSON.stringify(selectedWindowFrame));
        localStorage.setItem('windowSill', JSON.stringify(selectedWindowSill));
        // localStorage.setItem('weather', JSON.stringify(selectedWeather));
        console.log(selectedWindowSill, selectedWindowFrame, selectedRoom, selectedBackground, "set");
    }

    const [opened, setOpened] = useState(true);

    return (
    <>
        <Head>
          <title>Window</title>
          <meta name="description" content="Stratusound window" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
        </Head>
        <div className={classes.window}>
            <div className={classes.windowContainer}>
                <div className={classes.windowContainerLeftRoom}
                    style={{
                        backgroundImage: `url(${roomScene[selectedRoom].image})`,
                    }}
                >
                </div>
                <div className={classes.windowSizing}>
                <div className={classes.windowContainerLeftBackground}
                    style={{
                        backgroundImage: `url(${backgroundScene[selectedBackground].image})`,
                    }}
                >
                </div>
                
                <div className={classes.windowContainerLeftCurtains}
                    style={{
                        backgroundImage: `url(${windowFrame[selectedWindowFrame].image})`,
                    }}
                >
                </div>
                <div className={classes.weatherOverlay}>
                    <WindowWeather weather={selectedWeather} />
                </div>
                <div className={classes.weatherBg} 
                        style={{
                            backgroundImage: `url(${weatherBg[selectedWeather].image})`,
                        }}>
                        </div>
                <div className={classes.windowContainerPal}
                    style={{
                        backgroundImage: `url(${windowSill[selectedWindowSill].image})`,
                    }}
                >
                    {/* <PalLotties pal={windowSill[selectedWindowSill].name} /> */}
                </div>
            </div>
            </div>
                <div className={classes.drawerButton}>
                    {opened ? <Button onClick={() => {setOpened(false), saveChanges()}}>Save</Button> : <Button onClick={() => setOpened(true)}>Customize</Button>}

                </div>
                <Drawer
                opened={opened}
                onClose={() => {setOpened(false), saveChanges()} }
                position="right"
                title="Window Settings"
                padding="xl"
                size={600}
                closeOnClickOutside={false}
                overlayBlur={0}
                overlayColor="rgba(0, 0, 0, 0.1)"
                >
                    <div className="Select">
                        <h2>Scene</h2>
                        <div className="SelectOptions">
                            {backgroundScene.map((background) => (
                                <button onClick={()=> setSelectedBackground(background.id - 1)}>
                                    <Image src={background.image} alt={background.name} key={background.id} width={100} height={100} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="Select">
                        <h2>Room</h2>
                        <div className="SelectOptions">
                            {roomScene.map((room) => (
                                <button onClick={()=> setSelectedRoom(room.id - 1)}>
                                <Image src={room.image} alt={room.name} key={room.id} width={100} height={100} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="Select">
                        <h2>Window Frame</h2>
                        <div className="SelectOptions">
                            {windowFrame.map((windowFrame) => (
                                <button onClick={()=> setSelectedWindowFrame(windowFrame.id - 1)}>
                                    <Image src={windowFrame.image} alt={windowFrame.name} key={windowFrame.id} width={100} height={100} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="Select">
                        <h2>Window Pal</h2>
                        <div className="SelectOptions">
                            {windowSill.map((window) => (
                                <button onClick={()=> setSelectedWindowSill(window.id - 1)}>
                                    <Image src={window.image} alt={window.name} key={window.id} width={100} height={100} />
                                </button>
                            ))}
                        </div>
                    </div>
                </Drawer>
            </div>
        </>
    )
}