import { Drawer } from "@mantine/core";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

export default function Menu() {
    return (
        <Drawer
        opened={true}
        position="left"
        withCloseButton={false}
        onClose={() => {}}
        >
            <div>
                Logo
                StastusSound
            </div>
        <div>
            <HomeIcon/>
            Menu
        </div>
        <div>
            <LibraryMusicIcon/>
            Window
        </div>
        <div>
            <AccountCircleIcon/>
            Profile
        </div>
        <div>
            <SettingsIcon/>
            Settings
        </div>
        </Drawer>
    );
    }
