import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import ClienteService from "../services/clienteService";
import ContatoService from "../services/contatoService";
import './ClienteDetalhe.css';

export class ClienteDetalhe extends Component {
    static displayName = ClienteDetalhe.name;

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            menu: {
                titulo: 'Cadastrar novo Cliente',
                botao: 'Cadastrar',
            },
            cliente: {
                nome: '',
                telefone: '',
                municipio: '',
                valorMensalContrato: '',
                observacoes: ''
            },

            contato: [],

            loading: true
        };

        this.handleChange =
            this.handleChange.bind(this);
        this.handleNovoCliente =
            this.handleNovoCliente.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id != null) {
            this.state.id = this.props.match.params.id;
            const data = await ClienteService.GetClienteDetalhe(this.state.id);

            const contatos = await ContatoService.GetContatoCliente(this.state.id);
            console.log(contatos);
            const menuData = {
                titulo: 'Alterar Cliente',
                botao: 'Alterar'
            }
            this.setState({ cliente: data, contato: contatos, menu: menuData, loading: false });
        }
    }

    async handleNovoCliente(e) {
        e.preventDefault();

        if (this.state.id != null) {
            const data = this.state.cliente;
            const clienteAtualizado = await ClienteService.UpdateClienteDetalhe(this.state.id, data);
            console.log(clienteAtualizado);
        }
        else {
            const data = this.state.cliente;
            const novoCliente = await ClienteService.CriarCliente(data);
            console.log(novoCliente);
        }
    }

    static renderClienteTable(cliente, contato, menu, handleChange, handleNovoCliente) {
        return (
            <div className="new-incident-container">
                <section>
                    <h1> {menu.titulo}</h1>
                    <Link className="back-link" to="/clientes">
                        Voltar
                    </Link>
                </section>

                <div className="content">
                    <section>
                        <form onSubmit={handleNovoCliente}>
                            <input
                                placeholder="Nome"
                                value={cliente.nome || ''}
                                name="nome"
                                onChange={handleChange}
                            />
                            <input
                                placeholder="Telefone"
                                name="telefone"
                                value={cliente.telefone || ''}
                                onChange={handleChange}
                            />
                            <input
                                placeholder="Cidade"
                                name="municipio"
                                value={cliente.municipio || ''}
                                onChange={handleChange}
                            />
                            <input
                                placeholder="Mensalidade"
                                name="valorMensalContrato"
                                value={cliente.valorMensalContrato || ''}
                                onChange={handleChange}
                            />
                            <textarea
                                name="observacoes"
                                placeholder="Observações"
                                value={cliente.observacoes || ''}
                                onChange={handleChange}
                            />
                            <div className='checkbox'>
                                <div>
                                    Ativo:
                                </div>
                                <div>
                                    <input
                                        name='clienteAtivo'
                                        type='checkbox'
                                        value={cliente.clienteAtivo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button className="button" type="submit">{menu.botao}</button>
                        </form>
                    </section>

                    {(() => {
                        if (menu.titulo == 'Alterar Cliente') {
                            return (
                                <section>
                                    <div className='tituloSessao'>
                                        <h5>Contatos:</h5>
                                        <Link to='/contato/criar'>
                                            <FontAwesomeIcon className='icon' icon={faPlusSquare} size='2x' />
                                        </Link>
                                    </div>
                                    {contato.map(contato =>
                                        <article className='col grid-clienteDetalhe' key={contato.id} >
                                            <div className='acoes'>
                                                <Link to={`/contato-detalhe/${contato.id}`}>
                                                    <FontAwesomeIcon className='icon' icon={faPenSquare} size='2x' />
                                                </Link>
                                            </div>
                                            <div className='cabecalho'>
                                                <div><label className='titulos'>Nome: </label> {contato.nome} </div>
                                            </div>
                                            <div><label className='titulos'>E-mail: </label> {contato.email}</div>
                                            <div><label className='titulos'>Telefone: </label> {contato.telefone}</div>
                                            <div><label className='titulos'>Nascimento: </label> {contato.dataNascimento}</div>
                                        </article>
                                    )}
                                </section>
                            )
                        }
                    })()}
                </div>
            </div>
        );
    }

    handleChange(e) {
        const inputChange = { [e.target.name]: e.target.value };
        this.setState(state => ({
            cliente: {
                ...state.cliente,
                ...inputChange
            }
        }))
        console.log(this.state.cliente);
    }

    render() {
        // let contents = this.state.loading
        //     ? <p><em>Loading...</em></p> :
        let contents = ClienteDetalhe.renderClienteTable(this.state.cliente,
            this.state.contato,
            this.state.menu,
            this.handleChange,
            this.handleNovoCliente);
        return (
            <div>
                {contents}
            </div>
        );
    }

}