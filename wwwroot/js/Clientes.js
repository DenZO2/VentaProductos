function ObtenerClientes() {
    fetch('https://localhost:7245/Clientes')
    .then(response => response.json())
    .then(data => MostrarClientes(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarClientes(data) {
    let tbody = document.getElementById('todosLosClientes');
    tbody.innerHTML = '';

    data.forEach(element => {
        let tr = tbody.insertRow();

        let td0 = tr.insertCell(0);
        let tdId = document.createTextNode(element.id)
        td0.appendChild(tdId)

        let td1 = tr.insertCell(1);
        let tdNombreCliente = document.createTextNode(element.nombreCliente)
        td1.appendChild(tdNombreCliente)

        let td2 = tr.insertCell(2);
        let tdApellidoCliente = document.createTextNode(element.apellidoCliente)
        td2.appendChild(tdApellidoCliente)

        let td3 = tr.insertCell(3);
        let tdDNI = document.createTextNode(element.dni)
        td3.appendChild(tdDNI)

        let td4 = tr.insertCell(4);
        let tdSaldo = document.createTextNode(element.saldo)
        td4.appendChild(tdSaldo)

        let btnEditar = document.createElement('button');
        btnEditar.innerText = 'Modificar';
        btnEditar.setAttribute('class', 'btn btn-info');
        btnEditar.setAttribute('onclick', `BuscarClienteId(${element.id})`);
        let td5 = tr.insertCell(5);
        td5.appendChild(btnEditar);

        let btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.setAttribute('class', 'btn btn-danger');
        btnEliminar.setAttribute('onclick', `EliminarCliente(${element.id})`);
        let td6 = tr.insertCell(6);
        td6.appendChild(btnEliminar);
    });
}
 function MostrarClientes(data) {
     $("#todosLosClientes").empty();
     $.each(data, function(index, item) {
         $('#todosLosClientes').append(
             "<tr>",
             "<td>" + item.id + "</td>",
             "<td>" + item.nombreCliente + "</td>",
             "<td>" + item.apellidoCliente + "</td>",
             "<td>" + item.dni + "</td>",
             "<td>" + item.saldo + "</td>",
             "<td><button class='btn btn-info' onclick='BuscarClienteId(" + item.id + ")'>Modificar</button></td>",
             "<td><button class='btn btn-danger' onclick='EliminarCliente(" + item.id + ")'>Eliminar</button></td>",
             "</tr>"
         )
     })
 }

function CrearCliente() {
   //  var dniCliente = document.getElementById("DNI").value;
     //if (dniCliente == "" || dniCliente == null) {
       //  return mensajesError('#error', null, "Por favor ingrese un DNI para el Cliente.");
     //}

    let cliente = {
        nombreCliente: document.getElementById("Nombre").value,
        apellidoCliente: document.getElementById("Apellido").value,
        dni: document.getElementById("DNI").value,
        saldo: document.getElementById("Saldo").value,
    };

    fetch('https://localhost:7245/Clientes',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(cliente)
        }
    )
    .then(response => response.json())
    .then(data =>{
         if(data.status == undefined){
            document.getElementById("Nombre").value = "";
            document.getElementById("Apellido").value = "";
            document.getElementById("DNI").value = 0;
            document.getElementById("Saldo").value = 0;

            $('#modalAgregarClientes').modal('hide');
            ObtenerClientes();
       } else {
           mensajesError('#error', data);
       }
            
    })
    .catch(error => console.log("Hubo un error al guardar el Producto nuevo, verifique el mensaje de error: ", error))
}


function EliminarCliente(id) {
    var siElimina = confirm("¿Esta seguro de borrar este cliente?.")
    if (siElimina == true) {
        EliminarSi(id);
    }
}

function EliminarSi(id) {
    fetch(`https://localhost:7245/Clientes/${id}`,
    {
        method: "DELETE"
    })
    .then(() => {
        ObtenerClientes();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}


function BuscarClienteId(id) {
    fetch(`https://localhost:7245/Clientes/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("IdCliente").value = data.id;
        document.getElementById("NombreEditar").value = data.nombreCliente;
        document.getElementById("ApellidoEditar").value = data.apellidoCliente;
        document.getElementById("DNIEditar").value = data.dni;
        document.getElementById("SaldoEditar").value = data.saldo;

        $('#modalEditarClientes').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}


function EditarCliente() {
    let idCliente = document.getElementById("IdCliente").value;

    let editarCliente = {
        id: idProducto,
        nombreCliente: document.getElementById("NombreEditar").value,
        apellidoCliente: document.getElementById("ApellidoEditar").value,
        dni: document.getElementById("DNIEditar").value,
        saldo: document.getElementById("SaldoEditar").value
    }

    fetch(`https://localhost:7245/Clientes/${idCliente}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarCliente)
    })
    .then(data => {

            document.getElementById("IdCliente").value = 0;
            document.getElementById("NombreEditar").value = "";
            document.getElementById("ApellidoEditar").value = "";
            document.getElementById("DNIEditar").value = 0;
            document.getElementById("SaldoEditar").value = 0;
            $('#modalEditarClientes').modal('hide');
            ObtenerClientes();
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