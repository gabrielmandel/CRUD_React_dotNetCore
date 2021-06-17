import http from "./httpService";
import config from "../config.json";

const ContatoService = {
    GetContatos: async () => {
        const clientes = await http.get("/contato");
        return clientes.data;
    },
    
    GetContatoCliente: async id => {
        const clientes = await http.get(`/contato/${id}`);
        return clientes.data;
    },

    GetContatoDetalhe: async id => {
        const clientes = await http.get(`/contato/detalhe/${id}`);
        return clientes.data;
    },

    UpdateContatoDetalhe: async (id, body) => {
        const cliente = await http.put(`/contato/${id}`, body);
        return cliente.data;
    },
    
    CriarContato: async data => {
        const clientes = await http.post(`/contato`, data);
        return clientes.data;
    }
}

export default ContatoService;