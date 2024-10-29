using Microsoft.EntityFrameworkCore;
using VentaProductos.Models;
using InscripcionExamenes.Models;


namespace VentaProductos.Models;

public class Context : DbContext
{
    public Context(DbContextOptions<Context> options)
        : base(options)
    {
    }

    public DbSet<Producto> Productos { get; set;} = null!;

    public DbSet<Cliente> Clientes { get; set; } = null!;

public DbSet<InscripcionExamenes.Models.Venta> Venta { get; set; } = default!;
}