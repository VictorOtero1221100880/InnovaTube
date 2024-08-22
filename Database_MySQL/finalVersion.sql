-- Usuario que tendra acceso a la base de datos con los permisos basicos
CREATE USER 'admin_InnovaTube'@'localhost' IDENTIFIED BY '@hola1234';
GRANT SELECT, INSERT, UPDATE, DELETE ON innovatube.* TO 'admin_InnovaTube'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS InnovaTube CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- Se pone en uso la base de datos
USE innovaTube;

-- Se crea la atabla usuario para almacenar los principales datos del usuario
CREATE TABLE IF NOT EXISTS usuario(
    id_usuario VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apP VARCHAR(100) NOT NULL,
    apM VARCHAR(100) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    genero VARCHAR(100) NOT NULL,

    CONSTRAINT pk_id_usuario PRIMARY KEY (id_usuario)
);

-- Creacion de la tabla cuenta que se relacion con la tabla usuario 
CREATE TABLE IF NOT EXISTS cuenta(
    correo_electronico VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_registro DATE NOT NULL,
    id_usuario VARCHAR(255) NOT NULL,
    CONSTRAINT pk_correo_electronico_cuenta PRIMARY KEY (correo_electronico),
    CONSTRAINT fk_id_usuario_cuenta FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- Creacion de la tablla inicio sesion con la tabla de cuenta. Su utilidad es registrar todos los inicios de sesion exitosos/intentos
CREATE TABLE IF NOT EXISTS inicio_sesion (
    id_inicio_sesion INT NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL,
    tipo_inicio_sesion INT NOT NULL,
    dispositivo VARCHAR(255) NOT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_id_inicio_sesion PRIMARY KEY (id_inicio_sesion),
    CONSTRAINT fk_correo_electronico_inicio_sesion FOREIGN KEY (correo_electronico) REFERENCES cuenta(correo_electronico) ON DELETE CASCADE 
);

-- Creacion de la tabla videos con la relacion a cuenta para guardar los favoritos
CREATE TABLE IF NOT EXISTS videos_favoritos(
    id_video_favorito INT NOT NULL AUTO_INCREMENT,
    correo_electronico VARCHAR(255) NOT NULL,
    id_video VARCHAR(500) NOT NULL,
    CONSTRAINT pk_id_video_favorito PRIMARY KEY (id_video_favorito),
    CONSTRAINT fk_correo_electronico_video_favorito FOREIGN KEY (correo_electronico) REFERENCES cuenta(correo_electronico) ON DELETE CASCADE 
);

-- Creacion de la tabla comentarios con relacion a cuenta y video para guardar los
CREATE TABLE IF NOT EXISTS historial_video(
    id_historial_video INTEGER,
    id_video VARCHAR(500) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comentario TEXT NOT NULL,
    CONSTRAINT pk_historial_video PRIMARY KEY (id_historial_video),
    CONSTRAINT fk_correo_electronico_historial_video FOREIGN KEY  (correo_electronico) REFERENCES cuenta(correo_electronico) ON DELETE CASCADE 
);

DELIMITER //

CREATE PROCEDURE registrar_usuario_cuenta(
    IN p_id_usuario VARCHAR(255),
    IN p_nombre VARCHAR(100),
    IN p_apP VARCHAR(100),
    IN p_apM VARCHAR(100),
    IN p_fechaNacimiento DATE,
    IN p_genero VARCHAR(100),
    IN p_correo_electronico VARCHAR(255),
    IN p_contrasena VARCHAR(255),
    IN p_fecha_registro DATE
)
BEGIN
    -- Insertar datos en la tabla usuario
    INSERT INTO usuario (
        id_usuario,
        nombre,
        apP,
        apM,
        fechaNacimiento,
        genero
    ) VALUES (
        p_id_usuario,
        p_nombre,
        p_apP,
        p_apM,
        p_fechaNacimiento,
        p_genero
    );

    -- Insertar datos en la tabla cuenta
    INSERT INTO cuenta (
        correo_electronico,
        contrasena,
        fecha_registro,
        id_usuario
    ) VALUES (
        p_correo_electronico,
        p_contrasena,
        p_fecha_registro,
        p_id_usuario
    );
    
END //

DELIMITER ;

DROP USER admin_InnovaTube@localhost;