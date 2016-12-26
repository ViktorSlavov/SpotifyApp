import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import Main from './main.jsx';
import Login from './loginComponents/login.jsx';
import Home from './home.jsx';
import Callback from './loginComponents/callback.jsx';
import AudioFilterContainer from './audioFilterComponents/audioFilterContainer.jsx';



export default(
    <Route path="/" component={Main} >
     <Route path="home" component={Home}/>
     <Route path="login" component={Login}/>
     <Route path="callback" component={Callback}/>
     <Route path="filter" component={AudioFilterContainer}/>
    </Route>
    
);