Sistema PruebaClickBalance
Es un sistema con la cual el administrador pueda agregar, modificar o eliminar usuarios que sean personas morales o físicas.


Se requiere antes de usar el sistema ejecutar el contenido en la base de datos MySQL de la carpeta 'sql' en el siguiente orden.
1: tablas.sql
2: inserts_Catalogos.sql
3: Procedure.sql
4: Funciones.sql

El nombre de la base de datos utilizada se llama 'pruebaclickbalance' si desea usar otra puede cambiar el nombre de esta en el archivo PruebaClickBalance\php\CtrPrueba.php
cuyo nombre es $nombre_bd en la línea 5 de dicho archivo.

El sistema comienza con una página llamada 'inicio' donde en una tabla aparecerán todos los usuarios registrados en la cual aparecen 3 botones 'Agregar', 'Modificar' y 'Eliminar'
Agregar: El botón agregar siempre está activo, al seleccionarlo aparece una ventana donde se debe teclear el RFC del usuario que se quiere agregar,
		 dentro de la ventana aparecerá un botón 'Agregar' el cual solo se activara cuando la longitud del texto dentro sea 12 o 13, si la longitud es de 12 es una persona moral
		 si la longitud es de 13 entonces es una persona física y redireccionará a la página 'formulario' y le manda de parámetro 'tipoPersona' si es una persona física le manda un 1
		 pero si es una persona moral le manda un 2, también le mandará él la 'opcion' 1 la cual indica que se requiere agregar un usuario y el 'RFC' que tecleo.

Modificar: Este botón está deshabilitado, el cual se habilitara solo cuando se seleccione un usuario en la tabla, una vez que seleccione el botón redireccionara a la página 'formulario'
		   le manda de parámetro 'tipoPersona' y el 'id' del usuario y como 'opcion' el 2 para identificar que es una modificación.

Eliminar: De igual manera que el botón Modificar este estará deshabilitado y se habilitara, de igual manera, cuando se seleccione este botón eliminara de base de datos al usuario
		  y cargará de nuevo la lista de usuarios.


Página Formulario: En esta página se accederá cuando en la página inicio se haya seleccionado 'Agregar' o 'Modificar'

Agregar: Obtendrá los parámetros 'tipoPersona', 'opcion' y 'RFC' con lo cual realizara lo siguiente:
		 1: Como la 'opcion' es 1 le aparecerá el botón 'Registrar'.
		 2: Dependiendo si es una persona física o moral solicitará unos datos diferentes en 'Datos generales' para ambos pedirá RFC, Uso CFDI, estatus y
		    las diferencias son las siguientes:
			Física: Nombre, Apellido paterno y Apellido materno.
			Moral: Razón social y Nombre comercial.
		 3: El 'RFC' que se obtuvo de la página anterior sé pre cargara en el campo RFC tanto para la persona física como para la moral.

Modificar: Con los parámetros 'tipoPersona', 'opcion' y 'id' realizará lo siguiente:
		   1: Como la 'opcion' es 2 le aparecerá el botón 'Modificar'.
		   2: Con el parámetro 'tipoPersona' se hace lo mismo que el punto 2 para la opción agregar.
		   3: Con el 'id' del usuario consultará en la base de datos para obtener toda la información y pre cargarla en los campos requeridos.


Tanto para el agregar como el actualizar se deben de llenar todos los datos, si falta algún campo aparecerán un mensaje que falta un dato y este se pondrá en rojo
una vez que se haga el cambio se quitara el color, cuando todos los campos estén bien procederá en agregar o actualizar una vez echo devolverá a la página inicio
con la tabla actualizada.


--------------------------------------------------------------------------------------------------------
Funcionamiento de la Base de datos

Catálogos:
catalogo_tipo_persona: Para saber el tipo de persona que es el usuario.

Los catálogos siguientes se usan para llenar los combos de la página formulario
catalogo_estatus_persona, catalogo_uso_cfdi, catalogo_pais, catalogo_estado



Tablas de guardado:
cliente, persona_fisica, persona_moral, datos_contacto y direccion_fiscal

cliente: Esta tabla contiene la información básica de cada cliente y es la tabla principal.

persona_fisica y persona_moral: Estas dos tablas contienen información específica para personas físicas y personas morales, respectivamente.
								Al mantenerlos separados, facilita la gestión de datos y evita la redundancia de información.
								
datos_contacto: Esta tabla contiene la información de contacto de cada cliente.

direccion_fiscal: Esta tabla contiene la dirección fiscal de cada cliente.

Todas las tablas están relacionadas con la tabla cliente a través de la columna cliente_id, lo que permite realizar consultas y operaciones relacionadas
con un cliente específico de manera eficiente.



Funcionalidad en base de datos
inserta_cliente: Esta función inserta un nuevo cliente en la base de datos, si el cliente ya existe, no se realizará ninguna acción y se devolverá el ID del cliente.

actualiza_cliente: Esta función actualiza la información de un cliente existente en la base de datos.

elimina_cliente: Esta función elimina un cliente de la base de datos al eliminar en la tabla cliente en automático elimina en las demás tablas.

obtener_datos_cliente: Este procedimiento almacenado obtiene la información sobre uno o todos los clientes.

obtener_catalogos: Este procedimiento almacenado obtiene la descripción y el id de los catálogos.
