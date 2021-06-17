import axios from "axios";
import config from "../config.json";
import { toast } from "react-toastify";

const baseURL = config.apiUrl;
const http = axios.create({ baseURL: baseURL });

http.interceptors.response.use(res => {
    return Promise.resolve(res);
}, error => {
    const expectedError = error.response && error.response.status === 404;

    if (error.response && error.response.status === 405) {
        console.log("erro", error.response);
        toast.error("Ocorreu um erro inesperado!" + error.response.data, error.response.data);
    }

    if (!expectedError) {
        let jsonError = JSON.parse(JSON.stringify(error));

        if (jsonError.message == "Network Error") toast.error("Problema de conexão!", error); else { toast.error("Erro: " + jsonError.message, error); }
    }
    else {
        toast.error("Ação não encontrada! objeto não existe.");
    }

    return Promise.reject(error.response);
});

export default http;