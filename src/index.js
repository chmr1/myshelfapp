import React from 'react';
import Routes from './routes';
import './config/StatusBarConfig';

import { MenuProvider } from 'react-native-popup-menu';

//const App = () => <Routes />;

export const App = () => (
    <MenuProvider>
        <Routes />
    </MenuProvider>
);

export default App;