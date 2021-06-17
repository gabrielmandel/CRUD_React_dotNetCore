import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
//import { FetchData } from './components/FetchData';
import { Clientes } from './components/Clientes';
import { ClienteDetalhe } from './components/ClienteDetalhe';
import { ContatoDetalhe } from './components/ContatoDetalhe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/clientes' component={Clientes} />
        <Route path='/cliente-detalhe/:id' component={ClienteDetalhe} />
        <Route path='/cliente/criar' component={ClienteDetalhe} />
        <Route path='/contato-detalhe/:id' component={ContatoDetalhe} />
        <Route path='/contato/criar' component={ContatoDetalhe} />
      </Layout>
    );
  }
}
