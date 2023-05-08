<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$nombre_bd = "pruebaclickbalance";
// Obtén datos enviados desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);

$datosRetorno = array();
switch ($data["metodo"]) {
    case "obtenerClientes": {
        $datosRetorno = obtenerClientes($data);
        echo json_encode($datosRetorno);
        break;
    }
    case "registraUsuario": {
        $datosRetorno = registraUsuario($data);
        echo json_encode($datosRetorno);
        break;
    }
    case "modificarUsuario": {
        $datosRetorno = modificarUsuario($data);
        echo json_encode($datosRetorno);
        break;
    }
    case "eliminarUsuario": {
        $datosRetorno = eliminarUsuario($data);
        echo json_encode($datosRetorno);
        break;
    }
    case "llenarCatalogos": {
        $datosRetorno = llenarCatalogos($data);
        echo json_encode($datosRetorno);
        break;
    }
}

function obtenerClientes($datos){
    
    // Configurar las credenciales de la base de datos
    $nombre_servidor = "localhost";
    $usuario = "root";
    $pass = "";
    $clientes = array();
    global $nombre_bd;
    // Crear conexion
    $conn = new mysqli($nombre_servidor, $usuario, $pass, $nombre_bd);

    // Verificar conexion
    if ($conn->connect_error) {
        die("Error de conexion: " . $conn->connect_error);
    }

    // Obtener opcion e id de $datos
    $opcion = $datos['opcion'];
    $id = $datos['id'];

    // Ejecutar el procedimiento almacenado
    $query = "CALL obtener_datos_cliente(?, ?)";
    $stmt = $conn->prepare($query);

    if ($stmt === false) {
        die("Error en la preparación: " . $conn->error);
    }

    $stmt->bind_param("ii", $opcion, $id);
    if (!$stmt->execute()) {
        die("Error al ejecutar: " . $stmt->error);
    }

    // Obtener resultados
    $result = $stmt->get_result();
    
    while ($row = $result->fetch_assoc()) {
        $clientes[] = $row;
    }

    // Cerrar conexion
    $stmt->close();
    $conn->close();

    return $clientes;
}

function registraUsuario($datos) {

    // Configurar las credenciales de la base de datos
    $nombre_servidor = "localhost";
    $usuario = "root";
    $pass = "";
    global $nombre_bd;
    // Crear conexion
    $conn = new mysqli($nombre_servidor, $usuario, $pass, $nombre_bd);

    // Verificar conexion
    if ($conn->connect_error) {
        die("Error de conexion: " . $conn->connect_error);
    }

    // Se crea la funcion inserta_cliente
    $query = "SELECT inserta_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) AS id_cliente";
    $stmt = $conn->prepare($query);

    if ($stmt === false) {
        die("Error en la preparación: " . $conn->error);
    }

    // Poner parametros
    $stmt->bind_param("ississsssssssssssssssss",
        $datos['tipopersona'],
        $datos['rfc'],
        $datos['usocdfi'],
        $datos['estatus'],
        $datos['nombre'],
        $datos['appaterno'],
        $datos['apmaterno'],
        $datos['nombrecomercial'],
        $datos['razonsocial'],
        $datos['nombrecontact'],
        $datos['telefono'],
        $datos['movil'],
        $datos['email'],
        $datos['observaciones'],
        $datos['pais'],
        $datos['estadores'],
        $datos['municipio'],
        $datos['ciudad'],
        $datos['codigopostal'],
        $datos['colonia'],
        $datos['calle'],
        $datos['numext'],
        $datos['numint']
    );

    if (!$stmt->execute()) {
        die("Error al ejecutar: " . $stmt->error);
    }

    $result = $stmt->get_result();
    if ($result instanceof mysqli_result) {
        $row = $result->fetch_assoc();
        $id_cliente = $row['id_cliente'];
    }
    else {
        die("Error al obtener el resultado: " . $conn->error);
    }

    // Cerrar conexion
    $stmt->close();
    $conn->close();

    return $id_cliente;
}

function modificarUsuario($datos) {

    // Configurar las credenciales de la base de datos
    $nombre_servidor = "localhost";
    $usuario = "root";
    $pass = "";
    global $nombre_bd;

    // Crear conexion
    $conn = new mysqli($nombre_servidor, $usuario, $pass, $nombre_bd);

    // Verificar conexion
    if ($conn->connect_error) {
        die("Error de conexion: " . $conn->connect_error);
    }

    // Se crea la funcion actualiza_cliente
    $query = "SELECT actualiza_cliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) AS id_cliente";
    $stmt = $conn->prepare($query);

    if ($stmt === false) {
        die("Error en la preparación: " . $conn->error);
    }

    // Poner parametros
    $stmt->bind_param("iissiisssssssssiisssssss",
        $datos['id'],
        $datos['tipopersona'],
        $datos['rfc'],
        $datos['usocdfi'],
        $datos['estatus'],
        $datos['nombre'],
        $datos['appaterno'],
        $datos['apmaterno'],
        $datos['nombrecomercial'],
        $datos['razonsocial'],
        $datos['nombrecontact'],
        $datos['telefono'],
        $datos['movil'],
        $datos['email'],
        $datos['observaciones'],
        $datos['pais'],
        $datos['estadores'],
        $datos['municipio'],
        $datos['ciudad'],
        $datos['codigopostal'],
        $datos['colonia'],
        $datos['calle'],
        $datos['numext'],
        $datos['numint']
    );

    if (!$stmt->execute()) {
        die("Error al ejecutar: " . $stmt->error);
    }

    $result = $stmt->get_result();
    if ($result instanceof mysqli_result) {
        $row = $result->fetch_assoc();
        $id_cliente = $row['id_cliente'];
    }
    else {
        die("Error al obtener el resultado: " . $conn->error);
    }

    // Cerrar conexion
    $stmt->close();
    $conn->close();

    return $id_cliente;
    
}

function eliminarUsuario($datos) {
    
    // Configurar las credenciales de la base de datos
    $nombre_servidor = "localhost";
    $usuario = "root";
    $pass = "";
    global $nombre_bd;

    // Crear conexion
    $conn = new mysqli($nombre_servidor, $usuario, $pass, $nombre_bd);

    // Verificar conexion
    if ($conn->connect_error) {
        die("Error de conexion: " . $conn->connect_error);
    }

    // Obtener opcion e id de $datos
    $id = $datos['id'];

    $query = "SELECT elimina_cliente(?) AS id_cliente";
    $stmt = $conn->prepare($query);

    if ($stmt === false) {
        die("Error en la preparación: " . $conn->error);
    }

    $stmt->bind_param("i", $id);
    if (!$stmt->execute()) {
        die("Error al ejecutar: " . $stmt->error);
    }


    $result = $stmt->get_result();
    if ($result instanceof mysqli_result) {
        $row = $result->fetch_assoc();
        $id_cliente = $row['id_cliente'];
    }
    else {
        die("Error al obtener el resultado: " . $conn->error);
    }

    // Cerrar conexion
    $stmt->close();
    $conn->close();

    return $id_cliente;
}

function llenarCatalogos($datos) {
    
    // Configurar las credenciales de la base de datos
    $nombre_servidor = "localhost";
    $usuario = "root";
    $pass = "";
    global $nombre_bd;
    $clientes = array();

    // Crear conexion
    $conn = new mysqli($nombre_servidor, $usuario, $pass, $nombre_bd);

    // Verificar conexion
    if ($conn->connect_error) {
        die("Error de conexion: " . $conn->connect_error);
    }

    // Obtener opcion e id de $datos
    $opcion = $datos['opcion'];

    // Ejecutar el procedimiento almacenado
    $query = "CALL obtener_catalogos(?)";
    $stmt = $conn->prepare($query);

    if ($stmt === false) {
        die("Error en la preparación: " . $conn->error);
    }

    $stmt->bind_param("i", $opcion);
    if (!$stmt->execute()) {
        die("Error al ejecutar: " . $stmt->error);
    }

    // Obtener resultados
    $result = $stmt->get_result();
    
    while ($row = $result->fetch_assoc()) {
        $combos[] = $row;
    }

    // Cerrar conexion
    $stmt->close();
    $conn->close();

    return $combos;

}
?>