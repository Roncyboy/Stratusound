import Image from 'next/image';
import { PalLotties, WindowWeather } from '@/components/Lotties/WindowLotties';
import { createStyles } from '@mantine/core';
import window from '@/data/window.json';

const useStyles = createStyles((theme) => ({
    window: {
        position: 'absolute',
        right: "5em",
        top: "3em",
        display: 'flex',
        width: "20%",
        zIndex: 10,
        height: "20em",
        maxWidth: "20em",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'flex-end',
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
    windowFrame: {
        position: 'absolute',
        width: "70%",
        height: "70%",
        display: 'flex',
        zIndex: 7,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
    windowScene: {
        position: 'absolute',
        width: "70%",
        height: "70%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 6,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
    windowSill: {
        position: 'absolute',
        width: "25%",
        height: "25%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 8,
        bottom: 0,
        left: 0,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
    windowBackground: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        display: 'flex',
        borderRadius: "1em",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4,
        backgroundSize: "contain",
    },
    weatherOverlay: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        display: 'flex',
        zIndex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    weatherBg: {
        position: 'absolute',
        width: "70%",
        height: "70%",
        zIndex: 2,
        alignItems: 'center',
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
    },
}));





export default function HomeWindow ({ selectedBackground, selectedRoom, selectedWindowFrame, selectedWindowSill }) {
    
    const backgroundScene = window.backgroundScene;
    const roomScene = window.roomScene;
    const windowFrame = window.windowFrame;
    const windowSill = window.windowSill;

    const { classes, cx }  = useStyles();

    return (
        <div className={classes.window}>
            <div className={classes.windowBackground} 
                // style={{backgroundImage: `url(${selectedBackground})`}}>
                style={{backgroundImage: `url(${roomScene[selectedRoom].image})`}}>
                    <div className={classes.weatherBg} 
                        style={{
                            backgroundImage: "url('/windowAssets/bgWeather/drizzle-rain.png')",
                        }}>
                </div>
                    <div className={classes.windowScene}
                        style={{backgroundImage: `url(${backgroundScene[selectedBackground].image})`}}
                        >
                            
                            {/* <Image src="/windowAssets/scene/bg_forest.png" alt="Picture of the author" width={300} height={300} className={classes.windowScene} /> */}
                        </div>
                <div className={classes.windowFrame}
                    style={{backgroundImage: `url(${windowFrame[selectedWindowFrame].image})`}}>

                <div className={classes.weatherOverlay}>
                    <WindowWeather weather='Sunny' />
                </div>
                
                    <div className={classes.windowSill}
                        style={{backgroundImage: `url(${windowSill[selectedWindowSill].image})`}}
                    >
                        {/* style={{backgroundImage:url('/images/windowAssets/')}}> */}
                        {/* <WindowWeather weather={selectedRoom.weather} /> */}
                        {/* <PalLotties pal='Cat' /> */}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}