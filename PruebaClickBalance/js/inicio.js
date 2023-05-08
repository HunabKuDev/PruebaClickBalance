let ligaphp = "php/CtrPrueba.php";
let tipoPersona = 0;
let datosSeleccionCliente = [];
let tablausuarios = "";
let idPErsona = 0;
let rfcModal = '';

$(document).ready(function(){

    obtenerClientes(1, 0);

    //Validacion de checkbox
    $('#gridUsuarios').on('click', '.row-checkbox', function() {
      
      let $checkbox = $(this);
      if ($checkbox.is(':checked')) {
        $('#gridUsuarios .row-checkbox').not($checkbox).prop('checked', false);
        $('#btnModificar').prop('disabled', false);
        $('#btnEliminar').prop('disabled', false);
      } else {
        $('#btnModificar').prop('disabled', true);
        $('#btnEliminar').prop('disabled', true);
      }
    });
    
    //Levantar modal
    $("#btnAgregar").on("click", function() {
        $("#modalAgregar").modal("show");
    });

    //Validar el texto RFC
    $('#inputRFC').on('keyup', function() {
      let input = $('#inputRFC');
      let longitud = input.val().length;

      if (longitud == 12 || longitud == 13) {
        $('#btnAgregarRFC').prop('disabled', false);

        if (longitud == 13) {
          tipoPersona = 1;
        }
        else if (longitud == 12) {
          tipoPersona = 2;
        }
        rfcModal = $('#inputRFC').val().toUpperCase();
      }
      else{
        $('#btnAgregarRFC').prop('disabled', true);
      }
    });

    //Boton para agregar cliente
    $("#btnAgregarRFC").on("click", function() {
      window.open('formulario.html?tipoPersona='+tipoPersona+'&opcion=1&rfc='+rfcModal, '_self');
    });

    // Obtener los datos del usuario que selecciono
    $('#gridUsuarios').on('change', '.row-checkbox', function() {
      let datos = tablausuarios.row($(this).closest('tr')).data();
      ObtenerDatosRenglon(datos);
    });

    $("#btnModificar").on("click", function() {
        modificarUsuario();
    });
    $("#btnEliminar").on("click", function() {
        eliminarUsuario();
    });

    $('#inputRFC').on('keydown', function(e) {
      if ((e.which == 32)) {
          e.preventDefault();
      }
  });
});


function obtenerClientes(opcion, id) {
  datos = {metodo: "obtenerClientes", opcion: opcion, id: id};

  return new Promise((resolve, reject) => {
      fetch(ligaphp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la solicitud");
          }
          return response.json();
        })
        .then((responseData) => {
            llenarTabla(responseData);
        })
        .catch((error) => {
          console.error("Error al cargar los datos de respuesta:", error);
          reject(error);
        });
  });
}

function llenarTabla(clientes) {

    if ($.fn.DataTable.isDataTable('#gridUsuarios')) {
      tablausuarios.destroy();
    }

    tablausuarios = $('#gridUsuarios').DataTable({
    data: clientes,
    columns: [
      {
        data: null,
        orderable: false,
        className: 'select-checkbox',
        render: function() {
          return '<input type="checkbox" class="row-checkbox">';
        }
      },
      { data: 'descpersona' },
      { data: 'rfc' },
      { data: 'desccfdi' },
      { data: 'descestatus' },
      { data: 'nombre' },
      { data: 'apellido_paterno' },
      { data: 'apellido_materno' },
      { data: 'razon_social' },
      { data: 'nombre_comercial' },
      { data: 'nombre' },
      { data: 'telefono' },
      { data: 'telefono_movil' },
      { data: 'correo_electronico' },
      { data: 'observaciones' },
      { data: 'descpais' },
      { data: 'descestado' },
      { data: 'municipio_delegacion' },
      { data: 'ciudad_localidad' },
      { data: 'codigo_postal' },
      { data: 'colonia' },
      { data: 'calle' },
      { data: 'numero_exterior' },
      { data: 'numero_interior' }
    ],
    responsive: true,
    scrollX: true,
    scrollCollapse: true,
    autoWidth: false,
    language: tb_español
  });
}

function ObtenerDatosRenglon(datos) {
  datosSeleccionCliente = [];
  datosSeleccionCliente.push(datos);
}

function modificarUsuario() {
  tipoPersona = datosSeleccionCliente[0]["tipo_persona"];
  idPErsona = datosSeleccionCliente[0]["id"];
  window.open('formulario.html?tipoPersona='+tipoPersona+'&opcion=2&idPErsona='+idPErsona, '_self');
}

function eliminarUsuario() {
  idPErsona = datosSeleccionCliente[0]["id"];
  datos = {metodo: "eliminarUsuario", id: idPErsona};

  return new Promise((resolve, reject) => {
      fetch(ligaphp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la solicitud");
          }
          return response.json();
        })
        .then((responseData) => {
            if (responseData > 0) {
              mostrarMensajeCorrecto('Lo elimino correctamente');
              $('#btnModificar').prop('disabled', true);
              $('#btnEliminar').prop('disabled', true);
              setTimeout(function() {
                  $('#alertCorrecto').hide();
              }, 3000);
              obtenerClientes(1, 0);
            }
        })
        .catch((error) => {
          console.error("Error al cargar los datos de respuesta:", error);
          reject(error);
        });
  });
}

function mostrarMensajeCorrecto(mensaje) {
  $('#alertCorrecto').text(mensaje).show();
}