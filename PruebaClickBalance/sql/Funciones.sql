DELIMITER $$
CREATE FUNCTION inserta_cliente(
    p_tipo_persona INT, p_rfc VARCHAR(13), p_uso_cfdi INT, p_estatus INT,
    p_nombre VARCHAR(255), p_apellido_paterno VARCHAR(255), p_apellido_materno VARCHAR(255),
    p_razon_social VARCHAR(255), p_nombre_comercial VARCHAR(255),
    p_nombre_contacto VARCHAR(255), p_telefono VARCHAR(20), p_telefono_movil VARCHAR(20),
    p_correo_electronico VARCHAR(255), p_observaciones TEXT,
    p_pais INT, p_estado INT, p_municipio_delegacion VARCHAR(255),
    p_ciudad_localidad VARCHAR(255), p_codigo_postal VARCHAR(10), p_colonia VARCHAR(255),
    p_calle VARCHAR(255), p_numero_exterior VARCHAR(10), p_numero_interior VARCHAR(10)
) RETURNS INT
BEGIN
    DECLARE id_cliente INT DEFAULT 0;
    DECLARE cliente_existe INT;

    SELECT COUNT(*) INTO cliente_existe FROM cliente WHERE rfc = p_rfc;

    IF cliente_existe = 0 THEN

        INSERT INTO cliente (tipo_persona, rfc, uso_cfdi, estatus)
        VALUES (p_tipo_persona, p_rfc, p_uso_cfdi, p_estatus);

        SET id_cliente = LAST_INSERT_ID();

        IF (p_tipo_persona = 1) THEN
            INSERT INTO persona_fisica (cliente_id, nombre, apellido_paterno, apellido_materno)
            VALUES (id_cliente, p_nombre, p_apellido_paterno, p_apellido_materno);
        ELSEIF (p_tipo_persona = 2) THEN
            INSERT INTO persona_moral (cliente_id, razon_social, nombre_comercial)
            VALUES (id_cliente, p_razon_social, p_nombre_comercial);
        END IF;

        INSERT INTO datos_contacto (cliente_id, nombre, telefono, telefono_movil, correo_electronico, observaciones)
        VALUES (id_cliente, p_nombre_contacto, p_telefono, p_telefono_movil, p_correo_electronico, p_observaciones);

        INSERT INTO direccion_fiscal (cliente_id, pais, estado, municipio_delegacion, ciudad_localidad, codigo_postal, colonia, calle, numero_exterior, numero_interior)
        VALUES (id_cliente, p_pais, p_estado, p_municipio_delegacion, p_ciudad_localidad, p_codigo_postal, p_colonia, p_calle, p_numero_exterior, p_numero_interior);

    END IF;
    RETURN id_cliente;
END$$

DELIMITER ;

DELIMITER $$

CREATE FUNCTION actualiza_cliente(
    p_cliente_id INT,
    p_tipo_persona INT, p_rfc VARCHAR(13), p_uso_cfdi INT, p_estatus INT,
    p_nombre VARCHAR(255), p_apellido_paterno VARCHAR(255), p_apellido_materno VARCHAR(255),
    p_razon_social VARCHAR(255), p_nombre_comercial VARCHAR(255),
    p_nombre_contacto VARCHAR(255), p_telefono VARCHAR(20), p_telefono_movil VARCHAR(20),
    p_correo_electronico VARCHAR(255), p_observaciones TEXT,
    p_pais INT, p_estado INT, p_municipio_delegacion VARCHAR(255),
    p_ciudad_localidad VARCHAR(255), p_codigo_postal VARCHAR(10), p_colonia VARCHAR(255),
    p_calle VARCHAR(255), p_numero_exterior VARCHAR(10), p_numero_interior VARCHAR(10)
) RETURNS INT
BEGIN
    UPDATE cliente
    SET rfc = p_rfc,
        uso_cfdi = p_uso_cfdi,
        estatus = p_estatus
    WHERE id = p_cliente_id;

    IF (p_tipo_persona = 1) THEN
        UPDATE persona_fisica
        SET nombre = p_nombre,
            apellido_paterno = p_apellido_paterno,
            apellido_materno = p_apellido_materno
        WHERE cliente_id = p_cliente_id;
    ELSEIF (p_tipo_persona = 2) THEN
        UPDATE persona_moral
        SET razon_social = p_razon_social,
            nombre_comercial = p_nombre_comercial
        WHERE cliente_id = p_cliente_id;
    END IF;

    UPDATE datos_contacto
    SET nombre = p_nombre_contacto,
        telefono = p_telefono,
        telefono_movil = p_telefono_movil,
        correo_electronico = p_correo_electronico,
        observaciones = p_observaciones
    WHERE cliente_id = p_cliente_id;

    UPDATE direccion_fiscal
    SET pais = p_pais,
        estado = p_estado,
        municipio_delegacion = p_municipio_delegacion,
        ciudad_localidad = p_ciudad_localidad,
        codigo_postal = p_codigo_postal,
        colonia = p_colonia,
        calle = p_calle,
        numero_exterior = p_numero_exterior,
        numero_interior = p_numero_interior
    WHERE cliente_id = p_cliente_id;

    RETURN p_cliente_id;
END$$

DELIMITER ;




DELIMITER $$

CREATE FUNCTION elimina_cliente(
    p_cliente_id INT
) RETURNS INT
BEGIN

    DELETE FROM cliente
    WHERE id = p_cliente_id;

    RETURN p_cliente_id;
END$$

DELIMITER ;