using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesafioPubli.Models
{
    public class Cliente
    {
        public int Codigo { get; set; }
        public string Nome { get; set; }
        public string ClienteAtivo { get; set; }
        public string Telefone { get; set; }
        public string Municipio { get; set; }
        public string DataContrato { get; set; }
        public decimal ValorMensalContrato { get; set; }
        public string Observacoes { get; set; }
        public string DataInclusao { get; set; }
        public List<Contato> Contato { get; set; }
    }
}
