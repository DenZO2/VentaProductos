function ObtenerVentas() {
    fetch('https://localhost:7245/ventas')
    .then(result => result.json())
    .then(data => MostrarVentas(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarVentas(data) {
    $("#todasLasVentas").empty();
    
    $.each(data, function(index, item) {
        var date = new Date(item.fechaExamen);
        
        $('#todosLasInscripciones').append(
            "<tr>",
            "<td>" + item.id + "</td>",
            "<td>" + item.cliente.nombre + "</td>",
            "<td>" + item.index.nombre + "</td>",
            "<td>" + item.cantidad + "</td>",
            "<td>" + item.ventafinalizo + "</td>",
            "<td><button class='btn btn-info' onclick='BuscarVentaId(" + item.id + ")'>Modificar</button></td>",
            "<td><button class='btn btn-danger' onclick='EliminarVenta(" + item.id + ")'>Eliminar</button></td>",
            "</tr>"
        )
    })
}

function CrearVenta() {
    let venta = {
        cliente: document.getElementById("Cliente").value,
        productoId: document.getElementById("Producto").value,
        cantidadId: document.getElementById("Cantidad").value,
        ventafinalizada: document.getElementById("VentaFinalizo").checked,
        produto: null,
        cantidad: null
    };

    fetch('https://localhost:7245/Ventas',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(venta)
        }
    )
    // .then(response => response.json())
    .then(data =>{
        // if(data.status == undefined){
            document.getElementById("Cantidad").value = "";
            document.getElementById("ClienteId").value = 0;
            document.getElementById("ProductoId").value = 0;

            $('#modalAgregarVenta').modal('hide');
            ObtenerVentas();
        // }
        // else{
        //     // mensajesError('#error', data);
        // }
    })
    .catch(error => console.log("Hubo un error al guardar la Venta, verifique el mensaje de error: ", error))
}

function EliminarVenta(id) {
    var siElimina = confirm("¿Esta seguro de borrar esta venta?.")
    if (siElimina == true) {
        EliminarSi(id);
    }
}

function EliminarSi(id) {
    fetch(`https://localhost:7245/Ventas/${id}`,
    {
        method: "DELETE"
    })
    .then(() => {
        ObtenerVentas();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}

function EliminarSi(id) {
    fetch(`https://localhost:7245/Ventas/${id}`,
    {
        method: "DELETE"
    })
    .then(() => {
        ObtenerVentas();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}

function BuscarVentaId(id) {
    fetch(`https://localhost:7245/Ventas/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("IdVenta").value = data.id;
        document.getElementById("VentaFinalizoEditar").checked = data.ventafinalizada;
        document.getElementById("ClienteEditar").value = data.clienteId;
        document.getElementById("ProductotEditar").value = data.productoId;

        document.getElementById("VentaFinalizoEditar").setAttribute("disabled", true);
        document.getElementById("ClienteEditar").setAttribute("disabled", true);
        document.getElementById("ProductotEditar").setAttribute("disabled", true);

        $('#modalEditarVenta').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}


function EditarVenta() {
    let idVenta = document.getElementById("IdVenta").value;
    
    let editarventa = {
        id: idVenta,
        clienteId: document.getElementById("ClienteEditar").value,
        productoId: document.getElementById("ProductoEditar").value,
        ventafinalizada: document.getElementById("VentaFinalizoEditar").checked,
        cliente: null,
        producto: null
    }
    fetch(`https://localhost:7245/Ventas/${idVenta}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarventa)
    })
    .then(data => {

            document.getElementById("IdProducto").value = 0;
            document.getElementById("ClienteEditar").value = "";
            document.getElementById("ProductoEditar").value = "";
            document.getElementById("CantidadEditar").value = 0;
            document.getElementById("VentaFinalizoEditar").checked = false;
            $('#modalEditarVenta').modal('hide');
            ObtenerVentas();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
    }

    function mensajesError(id, data, mensaje) {
        $(id).empty();
        if (data != null) {
            $.each(data.errors, function(index, item) {
                $(id).append(
                    "<ol>",
                    "<li>" + item + "</li>",
                    "</ol>"
                )
            })
        }
        else{
            $(id).append(
                "<ol>",
                "<li>" + mensaje + "</li>",
                "</ol>"
            )
        }
       
        $(id).attr("hidden", false);
    }