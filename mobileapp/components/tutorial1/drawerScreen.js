import {DrawerNavigator} from '@react-navigation/drawer';
import Screen1 from './screen1';
import Screen2 from './screen2';

const DrawerScreen = DrawerNavigator({
    Screen1: {screen: Screen1},
    Screen2: {screen: Screen2}
},{
    headerMode: 'none',
})

export default DrawerScreen;