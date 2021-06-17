using DesafioPubli.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DesafioPubli.Controllers
{
    [Route("api/clientes")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly DesafioPubliDbContext _DbContext;

        public ClientesController(DesafioPubliDbContext contexto)
        {
            _DbContext = contexto;
        }

        // GET: api/<clientes>
        [HttpGet]
        public IEnumerable<Cliente> GetClientes()
        {
            return _DbContext.Cliente.Include(c => c.Contato);
        }

        // GET api/<clientes>/5
        [HttpGet("{id}")]
        public IActionResult GetCliente(int id)
        {
            var cliente = _DbContext.Cliente
                            .Include(c => c.Contato)
                            .FirstOrDefault(u => u.Codigo == id);

            if (cliente == null)
                return NotFound();

            return Ok(cliente);
        }

        // POST api/<clientes>
        [HttpPost]
        public IActionResult PostCliente([FromBody] Cliente novoCliente)
        {
            novoCliente.DataContrato = DateTime.Today.ToString();
            novoCliente.DataInclusao = DateTime.Today.ToString();

            _DbContext.Cliente.Add(novoCliente);
            _DbContext.SaveChanges();

            return CreatedAtAction("GetCliente", new { id = novoCliente.Codigo }, novoCliente);
        }

        // PUT api/<clientes>/5
        [HttpPut("{id}")]
        public IActionResult PutCliente(int id, [FromBody] Cliente atualizaCliente)
        {
            //atualizaCliente.DataInclusao = DateTime.Today.ToString();
            var cliente = _DbContext.Cliente.SingleOrDefault(u => u.Codigo == id);

            cliente.ClienteAtivo = atualizaCliente.ClienteAtivo;
            cliente.Nome = atualizaCliente.Nome;
            cliente.Telefone = atualizaCliente.Telefone;
            cliente.Municipio = atualizaCliente.Municipio;
            cliente.ValorMensalContrato = atualizaCliente.ValorMensalContrato;
            cliente.Observacoes = atualizaCliente.Observacoes;

            try
            {

                _DbContext.Entry(cliente).State = EntityState.Modified;
                _DbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw;
            }

            return NoContent();
        }

        // DELETE api/<clientes>/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCliente(int id)
        {
            var cliente = _DbContext.Cliente.SingleOrDefault(u => u.Codigo == id);

            _DbContext.Cliente.Remove(cliente);
            _DbContext.SaveChanges();

            return Ok();
        }

    }
}
