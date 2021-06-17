import http from "./httpService";
import config from "../config.json";

const ClienteService = {
    GetClientes: async () => {
        const clientes = await http.get("/clientes");
        return clientes.data;
    },

    GetClienteDetalhe: async id => {
        const clientes = await http.get(`/clientes/${id}`);
        return clientes.data;
    },

    UpdateClienteDetalhe: async (id, body) => {
        console.log(body);
        const cliente = await http.put(`/clientes/${id}`, body);
        return cliente.data;
    },
    
    CriarCliente: async data => {
        const clientes = await http.post(`/clientes`, data);
        return clientes.data;
    }
}

export default ClienteService;