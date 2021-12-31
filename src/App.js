import React from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import Home from './pages/Home';
import CesiumPage from './pages/CesiumPage';

// 高阶组件中的withRouter, 作用是将一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中.
const App = withRouter((props)=> {
  return (
    <div className="App">
      <Switch>
            <Route path='/' exact component={CesiumPage}/>
            {/* <Route path='/CesiumPage' exact component={CesiumPage}/> */}
      </Switch>
    </div>
    );
})
export default App;

