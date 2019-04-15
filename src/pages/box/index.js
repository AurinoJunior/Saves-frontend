import React, { Component } from 'react';
import { FaFile } from 'react-icons/fa';
import {distanceInWords} from 'date-fns'
import Dropzone from 'react-dropzone'
import socket from 'socket.io-client'

import api from '../../services/boxes-api';

import logo from '../../assets/logo-original.png'
import './style.css';

export default class box extends Component {

  state = {
    box:{}
  }

  async componentDidMount(){
    this.subiscribeToNewFiles();
    const box = this.props.match.params.id
    const response = await api.get(`/boxes/${box}`)

    this.setState({box:response.data})
  }

  subiscribeToNewFiles = () => {
    const box = this.props.match.params.id
    const io = socket('https://saves-backend.herokuapp.com')

    io.emit('connectRoom', box)

    io.on('file', data => {
      this.setState({ box: { ...this.state.box, files: [data, ...this.state.box.files] } })
    })
  }

  handleUpload = files =>{
    files.forEach(file =>{
      const data = new FormData(); 

      data.append('file', file);

      api.post(`/boxes/${this.state.box._id}/files`, data);
    })
  }

  render() {
    return(
      <div id="box-container">
        <header>
          <img src={logo} />
          <h1>{this.state.box.title}</h1>
        </header>

        <Dropzone onDropAccepted={this.handleUpload}>
          {({getRootProps, getInputProps}) => (
            <div className="upload" {...getRootProps()}>  
              <input {...getInputProps()}/>

              <p>Arraste arquivos ou clique aqui</p>
            </div>
          )}
        </Dropzone>

        <ul>
          {/* Validação para ver se o array files não está vazio */}
          {this.state.box.files && this.state.box.files.map( file => (
            <li key={file._id}>
            <a className="fileInfo" target="blank" href={file.url}>
              <FaFile size={24} color="#A5Cfff"/>
              <strong>{file.title}</strong>
            </a>
              <span>
              {
                distanceInWords(file.createdAt, new Date())
              }
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
