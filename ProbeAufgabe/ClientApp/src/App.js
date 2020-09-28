import React, { Component } from 'react';
import { Route } from 'react-router';
import { ProbeContainer } from './components/ProbeContainer';
import { Container } from 'reactstrap';
import './custom.css'
import { extend } from 'jquery';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
    
          < div >
         
          <Container>
            < ProbeContainer />
          </Container>
      </div >
        
    );
  }
}

