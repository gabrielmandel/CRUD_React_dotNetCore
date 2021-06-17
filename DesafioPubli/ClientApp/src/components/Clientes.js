import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import ClienteService from "../services/clienteService";
import ContatoService from "../services/contatoService";
import './Clientes.css';
import { Link } from 'react-router-dom';

export class Clientes extends Component {
    static displayName = Clientes.name;

    constructor(props) {
        super(props);
        this.state = { clientes: {}, contato: {}, loading: true };
    }

    async componentDidMount() {
        const data = await ClienteService.GetClientes();
        const contatos = await ContatoService.GetContatos();
        this.setState({ clientes: data, contato: contatos, loading: false });
        console.log(this.state.contato);
    }

    static renderClienteTable(clientes, contatos) {
        return (
            <div className='grid-container'>
                <div className='row'>
                    {clientes.map(clientes =>
                        <article className='col grid-cliente' key={clientes.codigo} >
                            <div className='acoes'>
                                <Link to={`/cliente-detalhe/${clientes.codigo}`}>
                                    <FontAwesomeIcon className='icon' icon={faPenSquare} size='2x' />
                                </Link>
                            </div>
                            <div className='cabecalho'>
                                <div><label className='titulos'>Nome: </label> {clientes.nome} </div>
                                <div><label className='titulos'>Codigo:</label> {clientes.codigo} </div>
                            </div>
                            <div><label className='titulos'>Telefone: </label> {clientes.telefone}</div>
                            <div><label className='titulos'>Cidade: </label> {clientes.municipio} </div>
                            <div> <label className='titulos'>Data de Contrato: </label> {clientes.dataContrato} </div>
                            <div><label className='titulos'>Valor Mensal: </label> {clientes.valorMensalContrato} </div>
                            <div> <label className='titulos'>Data de inclusão: </label> {clientes.dataInclusao} </div>
                            <label className='titulos'>Observações: </label>
                            <div>{clientes.observacoes.substring(0, 40)}...</div>
                        </article>
                    )}
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Clientes.renderClienteTable(this.state.clientes, this.state.contato);

        return (
            <div>
                <h1 id="TabelaClientes">Clientes</h1>
                <p><Link className="button" to='/cliente/criar'>Novo Cliente</Link></p>
                {contents}
            </div>
        );
    }
}