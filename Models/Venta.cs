using VentaProductos.Models;

namespace InscripcionExamenes.Models;

public class Venta
{
    public int Id { get; set; }
    public bool? VentaFinalizada { get; set;}
    public int ProductoId { get; set; }
    public int ClienteId { get; set; }
    public virtual ICollection<Producto>? Producto { get; set; }
    public virtual Cliente? Cliente { get; set; }
}