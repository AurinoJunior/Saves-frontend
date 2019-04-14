import React, { Component } from 'react';
import { FaFile } from 'react-icons/fa';

import api from '../../services/boxes-api';

import logo from '../../assets/logo-original.png'
import './style.css';

export default class box extends Component {

  state = {
    box:{}
  }

  async componentDidMount(){
    const box = this.props.match.params.id
    const response = await api.get(`/boxes/${box}`)

    this.setState({box:response.data})
  }

  render() {
    return(
      <div id="box-container">
        <header>
          <img src={logo} />
          <h1>{this.state.box.title}</h1>
        </header>
        <ul>
          <li>
            <a className="fileInfo" href=""> 
              <FaFile size={24} color="#A5Cfff"/>
              <strong>arquivo.pdf</strong>
            </a>
              <span>Atualizado a 3 dias</span>
          </li>
        </ul>
      </div>
    );
  }
}
