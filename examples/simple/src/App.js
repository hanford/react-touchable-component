import React, { Component } from 'react'
import './App.css'
import Drag from './lib'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1 style={{marginBottom: 5}}>Drag the ball!</h1>
        <small>on a device with touch enabled</small>
        <br />
        <br />

        <Drag>
          {({ x, y }) => {
            console.log(x,y)
            return (
              <div className='ball' style={{transform: `translate3d(${x}px,${y}px,0)`}}/>
            )
          }}
        </Drag>
      </div>
    )
  }
}

export default App
