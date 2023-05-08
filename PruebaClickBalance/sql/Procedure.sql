DELIMITER $$

CREATE PROCEDURE obtener_datos_cliente(IN p_opcion INT, IN p_id INT)
BEGIN

    SELECT
      cli.id, cli.tipo_persona, ctp.descripcion AS descpersona, cli.rfc, cli.uso_cfdi, cuc.descripcion AS desccfdi, cli.estatus, cep.descripcion AS descestatus,
      pf.nombre, pf.apellido_paterno, pf.apellido_materno,
      pm.razon_social, pm.nombre_comercial,
      dc.nombre, dc.telefono, dc.telefono_movil, dc.correo_electronico, dc.observaciones,
      df.pais, cp.descripcion AS descpais, df.estado, ce.descripcion AS descestado, df.municipio_delegacion, df.ciudad_localidad, df.codigo_postal,
      df.colonia, df.calle, df.numero_exterior, df.numero_interior
    FROM
      cliente cli
      LEFT JOIN persona_fisica AS pf ON (cli.id = pf.cliente_id)
      LEFT JOIN persona_moral AS pm ON (cli.id = pm.cliente_id)
      LEFT JOIN datos_contacto AS dc ON (cli.id = dc.cliente_id)
      LEFT JOIN direccion_fiscal AS df ON (cli.id = df.cliente_id)
	    LEFT JOIN catalogo_tipo_persona AS ctp ON (cli.tipo_persona = ctp.id)
	    LEFT JOIN catalogo_estatus_persona AS cep ON (cli.estatus = cep.id)
      LEFT JOIN catalogo_uso_cfdi AS cuc ON (cli.uso_cfdi = cuc.id)
      LEFT JOIN catalogo_pais AS cp ON (df.pais = cp.id)
      LEFT JOIN catalogo_estado AS ce ON (df.estado = ce.id)
    WHERE
      (p_opcion = 2 AND cli.id = p_id) OR p_opcion != 2;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE obtener_catalogos(IN p_opcion INT)
BEGIN

	IF (p_opcion = 1) THEN # Catalogo estatus persona
        SELECT id, descripcion
        FROM catalogo_estatus_persona;
	ELSEIF (p_opcion = 2) THEN # Catalogo uso CFDI
        SELECT id, descripcion
        FROM catalogo_uso_cfdi;
    ELSEIF (p_opcion = 3) THEN # Catalogo Pais
        SELECT id, descripcion
        FROM catalogo_pais;
    ELSEIF (p_opcion = 4) THEN # Catalogo estado
        SELECT id, descripcion
        FROM catalogo_estado;
    END IF;
END $$

DELIMITER ;