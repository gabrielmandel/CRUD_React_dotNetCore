using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DesafioPubli.Models
{
    public class DesafioPubliDbContext : DbContext
    {
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Contato> Contato { get; set; }

        public DesafioPubliDbContext(DbContextOptions<DesafioPubliDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>(e =>
            {
                e.HasKey(u => u.Codigo);

                e.HasMany(u => u.Contato)
                    .WithOne()
                    .HasForeignKey(m => m.CodigoCliente)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Contato>(e =>
            {
                e.HasKey(m => m.Id);
            });
        }
    }
}

