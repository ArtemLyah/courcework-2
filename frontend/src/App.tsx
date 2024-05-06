import React from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from './components/menu/menu';
import Styles from './styles';

function App() {
  return (
    <div className="App">
      <Styles/>
      <Menu/>
      <Outlet/>
    </div>
  );
}

export default App;
