import React, { Component } from 'react';

import api from '../../services/boxes-api';
import logo from '../../assets/logo-original.png'
import './style.css'

export default class main extends Component {
  state = {
    newBox: ''
  }

  //A funcao e criada no estilo arrow function pelo fato de não ter this então o this sera associado a classe e não a funcao.
  handleSubmit = async event => {
    event.preventDefault();

    const response = await api.post('/boxes',{
      title: this.state.newBox
    })

    this.props.history.push(`/box/${response.data._id}`);
  }

  handleInput = event => {
    this.setState({newBox: event.target.value});
  }
  render() {
    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <img src={logo}/>
          <input
            onChange={this.handleInput}
            placeholder="Digite o nome da Box"
          />
          <button type="submit">Criar</button>
        </form>
      </div>
    )}
}
