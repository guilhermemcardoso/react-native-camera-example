import React from 'react';
import CameraScreen from './CameraScreen';
import ImageScreen from './ImageScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// const App = () => {
//   return (
//     <CameraScreen />
//   );
// };

// export default App;

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: CameraScreen
        },
        Image: {
            screen: ImageScreen
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);
