
using System.ComponentModel.DataAnnotations;
using InscripcionExamenes.Models;

namespace VentaProductos.Models;

public class Producto
{
    public int Id { get; set; }
    
    [StringLength(100, ErrorMessage = "El nombre debe contener entre {2} y {1} caracteres.", MinimumLength = 3)]
    public string? NombreProducto { get; set; }
    public int Cantidad { get; set; }
    public float PrecioVenta { get; set; }
    public float PrecioCompra { get; set; }
     public virtual Cliente? Cliente {get; set;}
     public virtual Venta? Venta { get; set; }

}