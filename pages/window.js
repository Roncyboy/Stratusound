import { useState } from 'react';
import Image from 'next/image';
import window from '../data/window';
import { Drawer, Button, Group } from '@mantine/core';

export default function Window() {
    const [selectedBackground, setSelectedBackground] = useState([0]);
    const [selectedRoom, setSelectedRoom] = useState([0]);
    const [selectedCurtain, setSelectedCurtain] = useState([0]);
    const [selectedWindowSill, setSelectedWindowSill] = useState([0]);

    const backgroundScene = window.backgroundScene;
    const roomScene = window.roomScene;
    const curtains = window.curtains;
    const windowSill = window.windowSill;

    const [opened, setOpened] = useState(true);

    return (
        <div className="window">
            <div className="window__container">
                <div className="window__container__left">
                    <div className="window__container__left__background">
                        <Image src={backgroundScene[selectedBackground].image} alt={selectedBackground.name} width={100} height={100}/>
                    </div>
                    <div className="window__container__left__room">
                        <Image src={roomScene[selectedRoom].image} alt={selectedRoom.name} width={100} height={100} />
                    </div>
                    <div className="window__container__left__curtains">
                            <Image src={curtains[selectedCurtain].image} alt={selectedCurtain.name} width={100} height={100} />
                    </div>
                    <div className="window__container__left__windowsill">
                            <Image src={windowSill[selectedWindowSill].image} alt={selectedWindowSill.name} width={100} height={100} />
                    </div>
                </div>
                <div classname="drawerButton">
                    <Button onClick={() => setOpened(true)}>Open drawer</Button>
                </div>
                <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                position="right"
                title="Window Settings"
                padding="xl"
                size={600}
                closeOnClickOutside={false}
                overlayBlur={0}
                overlayColor="rgba(0, 0, 0, 0.1)"
                >
                    <div className="window__container__right__background">
                        <h2>Background</h2>
                        <div className="window__container__right__background__images">
                            {backgroundScene.map((background) => (
                                <button onClick={()=> setSelectedBackground(background.id - 1)}>
                                    <Image src={background.image} alt={background.name} key={background.id} width={100} height={100} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="window__container__right__room">
                        <h2>Room</h2>
                        <div className="window__container__right__room__images">
                            {roomScene.map((room) => (
                                <button onClick={()=> setSelectedRoom(room.id - 1)}>
                                <Image src={room.image} alt={room.name} key={room.id} width={100} height={100} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="window__container__right__curtains">
                        <h2>Curtains</h2>
                        <div className="window__container__right__curtains__images">
                            {curtains.map((curtain) => (
                                <button onClick={()=> setSelectedCurtain(curtain.id - 1)}>
                                    <Image src={curtain.image} alt={curtain.name} key={curtain.id} width={100} height={100} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="window__container__right__windowsill">
                        <h2>Window Sill</h2>
                        <div className="window__container__right__windowsill__images">
                            {windowSill.map((window) => (
                                <button onClick={()=> setSelectedWindowSill(window.id - 1)}>
                                    <Image src={window.image} alt={window.name} key={window.id} width={100} height={100} />
                                </button>
                            ))}
                        </div>
                    </div>
                </Drawer>
            </div>
        </div>
    )
}