import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import { PROJECTS } from './services/data'
import './App.css';


export default function App() {
  return (
      <Switch>
        {
          PROJECTS.map(({ name, component }) => 
              <Route path={`/${name.toLowerCase()}`} key={name}>
                {component}
              </Route>
            )
        }
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
  );
}

