import Image from 'next/image';
import { PalLotties, WindowWeather } from '@/components/Lotties/WindowLotties';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    window: {
        position: 'absolute',
        right: "5em",
        top: "5em",
        display: 'flex',
        width: "20%",
        zIndex: 10,
        height: "20em",
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
        width: "70%",
        height: "70%",
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
        zIndex: 3,
        backgroundSize: "contain",
    },
}));





export default function HomeWindow ({ selectedBackground, selectedRoom, selectedWindowFrame, selectedWindowSill }) {
    
    const { classes, cx }  = useStyles();

    return (
        <div className={classes.window}>
            <div className={classes.windowBackground} 
                // style={{backgroundImage: `url(${selectedBackground})`}}>
                style={{backgroundImage: "url('/windowAssets/wall/wall_brick.png')"}}>
                    <div className={classes.windowScene}
                        style={{backgroundImage: "url('/windowAssets/scene/test1.png')"}}
                        >
                            {/* <Image src="/windowAssets/scene/bg_forest.png" alt="Picture of the author" width={300} height={300} className={classes.windowScene} /> */}
                        </div>
                <div className={classes.windowFrame}
                    style={{backgroundImage: "url('/windowAssets/frame/frame1.png')"}}>
                        
                    <div className={classes.windowSill}>
                        {/* style={{backgroundImage:url('/images/windowAssets/')}}> */}
                        {/* <WindowWeather weather={selectedRoom.weather} />
                        <PalLotties pal={selectedRoom.pal} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}