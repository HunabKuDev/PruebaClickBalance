let ligaphp = "php/CtrPrueba.php";
let metodoRealizar = '';
let tipoPersona = 0;
let opcion = 0;
let idPErsona = 0;
let botonOpcion = '';
let datosCliente = {};
let rfcParam = '';
$(document).ready(function(){
    
    // Función que obtiene el valor del parámetro de la URL
    $.urlParam = function(name){
        const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return decodeURI(results[1]) || 0;
        }
    }

    
    
    tipoPersona = $.urlParam('tipoPersona');// 1 = Fisica, 2 = Moral
    opcion = $.urlParam('opcion'); // 1 = Agregar, 2 = Modificar
    
    llenarCatalogos(1);
    llenarCatalogos(2);
    llenarCatalogos(3);
    llenarCatalogos(4);

    // Si agregamos usuario precargamos el rfc que cargo al inicio
    if (opcion == 1){
        rfcParam = $.urlParam('rfc');
        if (tipoPersona == 1){
            txtRfc = $("#txtRfc").val(rfcParam);
        }
        else{
            txtRfc = $("#txtRfcM").val(rfcParam);
        }
    }
    else { // Si es una actualizacion cargamos los datos
        idPErsona = $.urlParam('idPErsona');
        obtenerInfoCliente(2, idPErsona);
    }
    

    // Cambia el texto del boton segun si es agregar o modificar usuario
    botonOpcion = $('#btnAgreaForm');
    if (opcion == 1){
        botonOpcion.text('Registrar');
        metodoRealizar = "registraUsuario";
    }
    else{
        botonOpcion.text('Actualizar');
        metodoRealizar = "modificarUsuario";
    }

    // Si es una persona fisica se muesta su contenedor y oculta el del moral
    // Si es una persona moral muestra su contenedor y oculta el de la fisica
    if (tipoPersona == 1) {
        $('#contPersonaFisica').show();
        $('#contPersonaMoral').hide();
    }
    else if (tipoPersona == 2) {
        $('#contPersonaMoral').show();
        $('#contPersonaFisica').hide();
    }


    $("#btnAgreaForm").on("click", function() {
        // Validamos que los campos hayan sido llenados y de ser así obtenemos su contenido
        if (validarCampos()){
            obtenerDatos();
        }
        else{
            setTimeout(function() {
                $('#alertAdvertencia').hide();
            }, 3000)
        }
    });

    $('#txtCodigoPostal,#txtNumeroExterior,#txtNumeroInterior,#txtTelefono,#txtTelefonoMovil').on('keydown', function(e) {

        if ((e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105) && (e.which != 8)) {
            e.preventDefault();
        }
    });
    
    $('#txtNombre,#txtApellidoPaterno,#txtApellidoMaterno,#txtRazonSocialM,#txtMunicipio,#txtCiudad,#txtColonia,#txtCalle,#txtNombreContacto').on('keydown', function(e) {
        if ((e.which < 65 || e.which > 90) && (e.which < 97 || e.which > 122) && (e.which > 32)) {
            e.preventDefault();
        }
    });

    $('#cbUsoCFDI, #cbEstatus, #cbUsoCFDIM, #cbEstatusM, #cbPais, #cbEstadoP').on('change', function(){
        // Quita el foco y el borde rojo del combo
        $(this).css("border", "");
    });

    $('#txtRfc, #txtNombre, #txtApellidoPaterno, #txtApellidoMaterno, #txtRfcM, #txtNombreComercialM, #txtRazonSocialM, #txtCodigoPostal, #txtMunicipio, #txtCiudad, #txtColonia, #txtCalle, #txtNumeroExterior, #txtNumeroInterior, #txtNombreContacto, #txtTelefono, #txtTelefonoMovil, #txtEmail, #txtObservaciones').on('keyup', function(e){
        let campo = $(this);
        
        if (campo.val.length > 0){
            // Quita el foco y el borde rojo de la caja de texto
            $(this).css("border", "");
        }
    });

});

function obtenerDatos() {
    let txtNombre = '';
    let txtApellidoPaterno = '';
    let txtApellidoMaterno = '';
    let txtNombreComercial = '';
    let txtRazonSocial = '';
    let txtRfc = '';
    let cbUsoCFDI = 0;
    let cbEstatus = '';
    if (tipoPersona == 1) {
        txtRfc = $("#txtRfc").val();
        cbUsoCFDI = $("#cbUsoCFDI").val();
        cbEstatus = $("#cbEstatus").val();
        txtNombre = $("#txtNombre").val();
        txtApellidoPaterno = $("#txtApellidoPaterno").val();
        txtApellidoMaterno = $("#txtApellidoMaterno").val();
    }
    else {
        txtRfc = $("#txtRfcM").val();
        cbUsoCFDI = $("#cbUsoCFDIM").val();
        cbEstatus = $("#cbEstatusM").val();
        txtNombreComercial = $("#txtNombreComercialM").val();
        txtRazonSocial = $("#txtRazonSocialM").val();
    }
    let txtCodigoPostal = $("#txtCodigoPostal").val();
    let cbPais = $("#cbPais").find(':selected').text();
    let cbEstadoP = $("#cbEstadoP").find(':selected').text();
    let txtMunicipio = $("#txtMunicipio").val();
    let txtCiudad = $("#txtCiudad").val();
    let txtColonia = $("#txtColonia").val();
    let txtCalle = $("#txtCalle").val();
    let txtNumeroExterior = $("#txtNumeroExterior").val();
    let txtNumeroInterior = $("#txtNumeroInterior").val();
    let txtNombreContacto = $("#txtNombreContacto").val();
    let txtTelefono = $("#txtTelefono").val();
    let txtTelefonoMovil = $("#txtTelefonoMovil").val();
    let txtEmail = $("#txtEmail").val();
    let txtObservaciones = $("#txtObservaciones").val();

    RegistraActualizaBD(txtRfc, cbUsoCFDI, cbEstatus, txtNombre, txtApellidoPaterno, txtApellidoMaterno, txtNombreComercial, txtRazonSocial, txtCodigoPostal, cbPais, cbEstadoP, txtMunicipio, txtCiudad, txtColonia, txtCalle, txtNumeroExterior, txtNumeroInterior, txtNombreContacto, txtTelefono, txtTelefonoMovil, txtEmail, txtObservaciones);
}

function RegistraActualizaBD(txtRfc, cbUsoCFDI, cbEstatus, txtNombre, txtApellidoPaterno, txtApellidoMaterno, txtNombreComercial, txtRazonSocial, txtCodigoPostal, cbPais, cbEstadoP, txtMunicipio, txtCiudad, txtColonia, txtCalle, txtNumeroExterior, txtNumeroInterior, txtNombreContacto, txtTelefono, txtTelefonoMovil, txtEmail, txtObservaciones) {
    
    datos = {metodo: metodoRealizar, id: idPErsona, tipopersona: tipoPersona,
            rfc: txtRfc, usocdfi: cbUsoCFDI, estatus: cbEstatus,
            nombre: txtNombre, appaterno: txtApellidoPaterno, apmaterno: txtApellidoMaterno,
            nombrecomercial: txtNombreComercial, razonsocial: txtRazonSocial,
            codigopostal: txtCodigoPostal, pais: cbPais, estadores: cbEstadoP, municipio: txtMunicipio, ciudad: txtCiudad, colonia: txtColonia, calle: txtCalle, numext: txtNumeroExterior, numint: txtNumeroInterior,
            nombrecontact: txtNombreContacto, telefono: txtTelefono, movil: txtTelefonoMovil, email: txtEmail, observaciones: txtObservaciones};

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

            if (opcion == 1){
                if (responseData > 0){
                    mostrarMensajeCorrecto('Se realizo correctamente el guardado');
                    setTimeout(function() {
                        window.open('inicio.html', '_self');
                    }, 5000);
                }
                else{
                    mostrarMensajecuidado('El RFC ya existe');
                }
            }
            else {
                if (responseData > 0){
                    mostrarMensajeCorrecto('Se realizo correctamente la actualizacion');
                    setTimeout(function() {
                        window.open('inicio.html', '_self');
                    }, 5000);
                }
            }
          })
          .catch((error) => {
            mostrarMensajeError("Error al ejecutar: "+error);
          });
    });
}


function obtenerInfoCliente(opcion, id) {
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
            llenarFormulario(responseData);
          })
          .catch((error) => {
              console.error("Error al cargar los datos de respuesta:", error);
              reject(error);
            });
        });
    }
    
function llenarFormulario(datosCliente) {

    if (tipoPersona == 1) {
        $("#txtRfc").val(datosCliente[0].rfc);
        $("#cbUsoCFDI").val(datosCliente[0].uso_cfdi);
        $("#cbEstatus").val(datosCliente[0].estatus);
        $("#txtNombre").val(datosCliente[0].nombre);
        $("#txtApellidoPaterno").val(datosCliente[0].apellido_materno);
        $("#txtApellidoMaterno").val(datosCliente[0].apellido_paterno);
    }
    else {
        $("#txtRfcM").val(datosCliente[0].rfc);
        $("#cbUsoCFDIM").val(datosCliente[0].uso_cfdi);
        $("#cbEstatusM").val(datosCliente[0].estatus);
        $("#txtNombreComercialM").val(datosCliente[0].nombre_comercial);
        $("#txtRazonSocialM").val(datosCliente[0].razon_social);
    }
    $("#txtCodigoPostal").val(datosCliente[0].codigo_postal);
    $("#cbPais").val(datosCliente[0].pais);
    $("#cbEstadoP").val(datosCliente[0].estado);
    $("#txtMunicipio").val(datosCliente[0].municipio_delegacion);
    $("#txtCiudad").val(datosCliente[0].ciudad_localidad);
    $("#txtColonia").val(datosCliente[0].colonia);
    $("#txtCalle").val(datosCliente[0].calle);
    $("#txtNumeroExterior").val(datosCliente[0].numero_exterior);
    $("#txtNumeroInterior").val(datosCliente[0].numero_interior);
    $("#txtNombreContacto").val(datosCliente[0].nombre);
    $("#txtTelefono").val(datosCliente[0].telefono);
    $("#txtTelefonoMovil").val(datosCliente[0].telefono_movil);
    $("#txtEmail").val(datosCliente[0].correo_electronico);
    $("#txtObservaciones").val(datosCliente[0].observaciones);
}

function llenarCatalogos(opcion) {
    datos = {metodo: "llenarCatalogos", opcion: opcion};
    
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
            if (opcion == 1){
                if (tipoPersona == 1){
                    $('#cbEstatus').empty();

                    $('#cbEstatus').append('<option selected>Elige una opción</option>');
                    $.each(responseData, function (index, item) {
                        $('#cbEstatus').append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });
                }
                else {
                    $('#cbEstatusM').empty();

                    $('#cbEstatusM').append('<option selected>Elige una opción</option>');
                    $.each(responseData, function (index, item) {
                        $('#cbEstatusM').append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });

                }
            }
            else if (opcion == 2){

                if (tipoPersona == 1){
                    $('#cbUsoCFDI').empty();

                    $('#cbUsoCFDI').append('<option selected>Elige una opción</option>');
                    $.each(responseData, function (index, item) {
                        $('#cbUsoCFDI').append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });
                }
                else {
                    $('#cbUsoCFDIM').empty();

                    $('#cbUsoCFDIM').append('<option selected>Elige una opción</option>');
                    $.each(responseData, function (index, item) {
                        $('#cbUsoCFDIM').append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                    });

                }

            }
            else if (opcion == 3){
                $('#cbPais').empty();

                $('#cbPais').append('<option selected>Elige una opción</option>');
                $.each(responseData, function (index, item) {
                    $('#cbPais').append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                });
            }
            else if (opcion == 4){
                $('#cbEstadoP').empty();

                $('#cbEstadoP').append('<option selected>Elige una opción</option>');
                $.each(responseData, function (index, item) {
                    $('#cbEstadoP').append('<option value="' + item.id + '">' + item.descripcion + '</option>');
                });
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
function mostrarMensajeError(mensaje) {
    $('#alertError').text(mensaje).show();
}
function mostrarMensajecuidado(mensaje) {
    $('#alertAdvertencia').text(mensaje).show();
}

function validarCampos() {   
    
    // Validar los campos del contenedor Datos generales
    if (tipoPersona == 1){

        let textPersonaFisica = $("#contPersonaFisica input[type='text']");
        for (let i = 0; i < textPersonaFisica.length; i++) {

            if (textPersonaFisica[i].value.trim() === "") {

                mostrarMensajecuidado("Por favor, completa todos los campos de texto de Datos generales.");

                // Para darle el foco marcarla en rojo
                $(textPersonaFisica[i]).css("border", "2px solid red").focus();

                return false;
            }
        }
        let comboPersonaFisica = $("#contPersonaFisica select");

        for (let i = 0; i < comboPersonaFisica.length; i++) {
            if (comboPersonaFisica[i].selectedIndex < 1) {
                mostrarMensajecuidado("Por favor, selecciona una opción válida en todos los cuadros combinados de Datos generales.");
    
                // Para darle el foco marcarla en rojo
                $(comboPersonaFisica[i]).css("border", "2px solid red").focus();
    
                return false;
            }
        }
    }
    else{
        let textPersonaMoral = $("#contPersonaMoral input[type='text']");
        for (let i = 0; i < textPersonaMoral.length; i++) {

            if (textPersonaMoral[i].value.trim() === "") {

                mostrarMensajecuidado("Por favor, completa todos los campos de texto de Datos generales.");

                // Para darle el foco marcarla en rojo
                $(textPersonaMoral[i]).css("border", "2px solid red").focus();

                return false;
            }
        }
        let comboPersonaMoral = $("#contPersonaMoral select");
        for (let i = 0; i < comboPersonaMoral.length; i++) {
            if (comboPersonaMoral[i].selectedIndex < 1) {
                mostrarMensajecuidado("Por favor, selecciona una opción válida en todos los cuadros combinados de Datos generales.");
    
                // Para darle el foco marcarla en rojo
                $(comboPersonaMoral[i]).css("border", "2px solid red").focus();
    
                return false;
            }
        }
    }
    // Validar los campos del contenedor Datos generales

    // Validar campos Direccion
    let textDireccion = $("#contDireccion input[type='text']");
    for (let i = 0; i < textDireccion.length; i++) {

        if (textDireccion[i].value.trim() === "") {

            mostrarMensajecuidado("Por favor, completa todos los campos de texto de Datos Direccion.");

            // Para darle el foco marcarla en rojo
            $(textDireccion[i]).css("border", "2px solid red").focus();

            return false;
        }
    }
    let comboDireccion = $("#contDireccion select");
    for (let i = 0; i < comboDireccion.length; i++) {
        if (comboDireccion[i].selectedIndex < 1) {
            mostrarMensajecuidado("Por favor, selecciona una opción válida en todos los cuadros combinados de Datos Direccion.");

            // Para darle el foco marcarla en rojo
            $(comboDireccion[i]).css("border", "2px solid red").focus();

            return false;
        }
    }
    // Validar campos Direccion

    // Validar campos Datos contacto
    let textContacto = $("#contDatosContacto input[type='text']");
    for (let i = 0; i < textContacto.length; i++) {

        if (textContacto[i].value.trim() === "") {

            mostrarMensajecuidado("Por favor, completa todos los campos de texto de Datos Contacto.");

            // Para darle el foco marcarla en rojo
            $(textContacto[i]).css("border", "2px solid red").focus();

            return false;
        }
    }
    // Validar campos Datos contacto

    return true;
}