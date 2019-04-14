import React, { Component } from 'react';

import logo from '../../assets/logo-original.png'
import './style.css'

export default class main extends Component {
  render() {
    return (
      <div id="main-container">
        <form>
          <img src={logo}/>
          <input placeholder="Digite o nome da Box"/>
          <button type="submit">Criar</button>
        </form>
      </div>
    )}
}
