//Modelo base de registro de usuario [traspasar con sequelize]
export const userModel = {
    id_usuario: String,
    nombre: String,
    apP : String,
    apM : String,
    fecha_nacimiento: Date,
    genero: String,
    correo_electronico: String,
    contrasena1: String,
    contrasena2: String
}

//Modelo base de inicio de sesion [traspasar con sequelize]
export const inicioSesion = {
    id_inicio_sesion : String,
    correo_electronico : String,
    tipo_inicio_sesion : String,
    dispositivo : String,
    fecha_nacimiento : Date,
}