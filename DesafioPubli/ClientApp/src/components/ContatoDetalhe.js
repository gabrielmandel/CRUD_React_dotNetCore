import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import ClienteService from "../services/clienteService";
import ContatoService from "../services/contatoService";
import './ContatoDetalhe.css';

export class ContatoDetalhe extends Component {
    static displayName = ContatoDetalhe.name;

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            menu: {
                titulo: 'Cadastrar novo contato',
                botao: 'Cadastrar',
            },
            contato: [],
            loading: true
        };

        this.handleChange =
            this.handleChange.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id != null) {
            this.state.id = this.props.match.params.id;

            const contatos = await ContatoService.GetContatoDetalhe(this.state.id);
            console.log(contatos);
            const menuData = {
                titulo: 'Alterar Contato',
                botao: 'Alterar'
            }
            this.setState({ contato: contatos, menu: menuData, loading: false });
        }
    }

    async handleNewIncident(e) {
        e.preventDefault();

        if (this.props.match.params.id != null) {
            const data = this.state.contato;
            const clienteAtualizado = await ContatoService.UpdateContatoDetalhe(this.state.id, data);
            console.log(clienteAtualizado);
        }
        else {
            const data = this.state.contato;
            const novoCliente = await ContatoService.CriarContatoDetalhe(data);
            console.log(novoCliente);
        }
    }

    static renderClienteTable(contato, menu, handleChange) {
        return (
            <div className="new-incident-container">
                <section>
                    <h1> {menu.titulo}</h1>
                    <Link className="back-link" to={`/clientes`}>
                        Voltar
                    </Link>
                </section>
                <div className="contentContato">
                    <form onSubmit={this.handleNewIncident}>
                        <input
                            placeholder="Nome"
                            value={contato.nome || ''}
                            name="nome"
                            onChange={handleChange}
                        />
                        <input
                            placeholder="Telefone"
                            name="telefone"
                            value={contato.telefone || ''}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="E-mail"
                            name="email"
                            value={contato.email || ''}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="Nascimento"
                            name="dataNascimento"
                            value={contato.dataNascimento || ''}
                            onChange={handleChange}
                        />
                        <button className="button" type="submit">{menu.botao}</button>
                    </form>
                </div>
            </div>
        );
    }

    handleChange(e) {
        const inputChange = { [e.target.name]: e.target.value };
        this.setState(state => ({
            contato: {
                ...state.contato,
                ...inputChange
            }
        }))
        console.log(this.state.contato);
    }

    render() {
        // let contents = this.state.loading
        //     ? <p><em>Loading...</em></p> :
        let contents = ContatoDetalhe.renderClienteTable(this.state.contato, this.state.menu, this.handleChange);
        return (
            <div>
                {contents}
            </div>
        );
    }
}