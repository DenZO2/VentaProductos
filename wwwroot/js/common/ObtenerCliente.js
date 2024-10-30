function ObtenerClientes() {
    fetch('https://localhost:7245/Clientes')
    .then(response => response.json())
    .then(data => CompletarDropdown(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}


function CompletarDropdown(data) {
    $("#ClienteId").empty();
    $.each(data, function(index, item) {
        $('#ClienteId').append(
            "<option value='"+ item.id + "'>" + item.nombreCliente + "</option>"            
        )
    })

    $("#ClienteIdEditar").empty();
    $.each(data, function(index, item) {
        $('#ClienteIdEditar').append(
            "<option value='"+ item.id + "'>" + item.nombreCliente + "</option>"            
        )
    })
}