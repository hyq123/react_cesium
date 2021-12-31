import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//使用React构建的单页面应用，要想实现页面间的跳转，首先想到的就是使用路由。在React中，常用的有两个包可以实现这个需求，那就是react-router和react-router-dom。
import {
  BrowserRouter as Router,
} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    
    <Router>
        <App/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
