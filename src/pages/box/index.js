import React, { Component } from 'react';
import { FaFile } from 'react-icons/fa';
import {distanceInWords} from 'date-fns'
import {pt} from 'date-fns/locale/pt'

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
          {/* Validação para ver se o array files não está vazio */}
          {this.state.box.files && this.state.box.files.map( file => (
            <li>
            <a className="fileInfo" target="blank" href={file.url}>
              <FaFile size={24} color="#A5Cfff"/>
              <strong>{file.title}</strong>
            </a>
              <span> há {" "}
              {
                distanceInWords(file.createdAt, new Date(), 
                {locale: pt})
              } {" "} atrás
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
