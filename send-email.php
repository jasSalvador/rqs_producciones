<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Recibe los datos del formulario
    $data = json_decode(file_get_contents("php://input"));
    // Asigna los input a una variable
    $nombre = $data->nombre;
    $apellido = $data->apellido;
    $email = $data->email;
    $comuna = $data->comuna;
    $fecha = $data->fecha;
    $asistentes = $data->asistentes;
    $inicio = $data->inicio;
    $termino = $data->termino;
    $pack = $data->pack;
    $mensaje = $data->mensaje;
    // Configuración del destinatario y asunto
    $destinatario1 = "contacto@rqsproducciones.cl";
    $destinatario2 = "rquiroga15@gmail.com";
    //$destinatario2 = "yasmin_cxy@hotmail.com";
    $asunto = "Nuevo mensaje de formulario [Rqsproducciones]";

    // Cuerpo del correo electrónico
    $cuerpoMensaje = "Nombre: $nombre $apellido\n";
    $cuerpoMensaje .= "Correo Electrónico: $email\n";
    $cuerpoMensaje .= "Comuna: $comuna\n";
    $cuerpoMensaje .= "Fecha: $fecha\n";
    $cuerpoMensaje .= "Asistentes: $asistentes\n";
    $cuerpoMensaje .= "Hora inicio: $inicio\n";
    $cuerpoMensaje .= "Hora termino: $termino\n";
    $cuerpoMensaje .= "Pack: $pack\n";
    $cuerpoMensaje .= "Mensaje:\n$mensaje";

    // Enviar correo
    $enviado = mail("$destinatario1, $destinatario2", $asunto, $cuerpoMensaje);

    if ($enviado) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
}

?>
