CREATE TABLE catalogo_tipo_persona (
    id INT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE catalogo_estatus_persona (
    id INT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE catalogo_uso_cfdi (
    id INT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE catalogo_pais (
    id INT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE catalogo_estado (
    id INT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL
);




CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_persona INT NOT NULL REFERENCES catalogo_tipo_persona(id),
    rfc VARCHAR(13) NOT NULL,
    uso_cfdi INT NOT NULL REFERENCES catalogo_uso_cfdi(id),
    estatus INT NOT NULL REFERENCES catalogo_estatus_persona(id)
);


CREATE TABLE persona_fisica (
    cliente_id INT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido_paterno VARCHAR(255) NOT NULL,
    apellido_materno VARCHAR(255),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE
);


CREATE TABLE persona_moral (
    cliente_id INT PRIMARY KEY,
    razon_social VARCHAR(255) NOT NULL,
	nombre_comercial VARCHAR(255) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE
);



CREATE TABLE datos_contacto (
    cliente_id INT,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    telefono_movil VARCHAR(20),
    correo_electronico VARCHAR(255),
    observaciones TEXT,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE
);


CREATE TABLE direccion_fiscal (
    cliente_id INT,
    pais INT NOT NULL REFERENCES catalogo_pais(id),
    estado INT NOT NULL REFERENCES catalogo_estado(id),
    municipio_delegacion VARCHAR(255) NOT NULL,
    ciudad_localidad VARCHAR(255) NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL,
    colonia VARCHAR(255) NOT NULL,
    calle VARCHAR(255) NOT NULL,
    numero_exterior VARCHAR(10),
    numero_interior VARCHAR(10),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE
);