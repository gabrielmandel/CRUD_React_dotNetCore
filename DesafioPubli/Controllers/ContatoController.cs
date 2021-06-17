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
    [Route("api/contato")]
    [ApiController]
    public class ContatoController : ControllerBase
    {
        private readonly DesafioPubliDbContext _DbContext;

        public ContatoController(DesafioPubliDbContext contexto)
        {
            _DbContext = contexto;
        }
        
        // GET: api/<ContatoController>
        [HttpGet]
        public IEnumerable<Contato> GetContatos()
        {
            return _DbContext.Contato;
        }

        // GET api/<ContatoController>/5
        [HttpGet("{codCliente}")]
        public IActionResult GetContato(int codCliente)
        {
            var contato = _DbContext.Contato.Where(u => u.CodigoCliente == codCliente).ToList();

            if (contato == null)
                return NotFound();

            return Ok(contato);
        }

        [HttpGet("detalhe/{id}")]
        public IActionResult GetContatoDetalhe(int id)
        {
            var contato = _DbContext.Contato.FirstOrDefault(u => u.Id == id);

            if (contato == null)
                return NotFound();

            return Ok(contato);
        }

        // POST api/<ContatoController>
        [HttpPost]
        public IActionResult Post([FromBody] Contato novoContato)
        {
            _DbContext.Contato.Add(novoContato);
            _DbContext.SaveChanges();

            return CreatedAtAction("GetContato", new { id = novoContato.Id }, novoContato);
        }

        // PUT api/<ContatoController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Contato atualizaContato)
        {
            var cliente = _DbContext.Contato.SingleOrDefault(u => u.Id == id);

            if (cliente == null)
                return NotFound();

            _DbContext.Entry(atualizaContato).State = EntityState.Modified;

            _DbContext.SaveChanges();

            return NoContent();
        }

        // DELETE api/<ContatoController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var contato = _DbContext.Contato.SingleOrDefault(u => u.Id == id);

            _DbContext.Contato.Remove(contato);
            _DbContext.SaveChanges();

            return Ok();
        }
    }
}
