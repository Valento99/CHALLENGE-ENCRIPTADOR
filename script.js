//Llamado de todos los botones con los que se tendra interracion.
const btn_encriptar = document.getElementById("btn-encriptar");
const btn_desencriptar = document.getElementById("btn-desencriptar");
const btn_copiar = document.getElementById("btn-copiar");
const btn_borrar_1 = document.getElementById("btn-borrar-1");
const btn_borrar_2 = document.getElementById("btn-borrar-2");
const filtro = /[A-Z~!@#$%^&*()_+|}{[\]\\\/?=><áéíóúàèìòù]/g;

// Función verificar
function verificar() {
    let texto_nuevo = document.getElementById("texto-encriptar").value; 
    if (texto_nuevo.match(filtro) !==null) {
        limpiar();
        foco();
        ocultarImagen();
        // Alerta de error
        Swal.fire({
            title: 'Error!',
            text: 'Solo se permiten letras minúsculas sin acentos',
            imageUrl: './images/errado.PNG',
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: 'Imagen de alerta',
        });
    }
}

//Funcion encriptar lista
function encriptar() {
    //tomar texto y eliminar los espacios
    if(document.getElementById("texto-encriptar").value==="")
    {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "No se ha ingresado texto para encriptar",
            showConfirmButton: false,
            timer: 1500,
        });
    }
    else
    {
        let texto_nuevo = document.getElementById("texto-encriptar").value.trim();
        // Reemplazar las vocales por lo siguiente.
        let texto_encriptado = texto_nuevo.replace(/[aeiou]/g, function(match) {
            switch(match) {
                case 'a':
                    return 'ai';
                case 'e':
                    return 'enter';
                case 'i':
                    return 'imes';
                case 'o':
                    return 'ober';
                case 'u':
                    return 'ufat';
            }
        });
        // Asignar el texto encriptado al elemento de texto desencriptado
        let textoEncriptado = document.getElementById("texto-desencriptar");
        textoEncriptado.value = texto_encriptado;
    textoEncriptado.style.color = "#38424C"; // Cambiar color de texto a negro
    ocultarImagen();
}
}

//Funcion desencriptar lista
function desencriptar(){
    if(document.getElementById("texto-encriptar").value==="")
    {
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "No se ha ingresado texto para desencriptar",
            showConfirmButton: false,
            timer: 1500,
        });
    }
    else
    {
        let texto_nuevo = document.getElementById("texto-encriptar").value;
        let texto_desencriptado = texto_nuevo
            .replace(/ai/g, "a")
            .replace(/enter/g, "e")
            .replace(/imes/g, "i")
            .replace(/ober/g, "o")
            .replace(/ufat/g, "u");
    
        let textoDesencriptado = document.getElementById("texto-desencriptar");
        textoDesencriptado.value = texto_desencriptado;
        textoDesencriptado.style.color = "#38424C"; // Cambiar color de texto a negro
        ocultarImagen();
    }
}

//Funcion copiar.
function copiar(){
    let texto_vacio = "";
    let texto_des = document.getElementById("texto-desencriptar").value;
    document.getElementById("texto-encriptar").placeholder = "Texto Copiado...";

    let text_copi = document.getElementById("texto-desencriptar");
    text_copi.select();
    document.execCommand("copy");
    if(texto_vacio !== texto_des){
        foco();
        limpiar();
        //Alerta de completado.
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Texto copiado",
            showConfirmButton: false,
            timer: 1500,
        });
    }
    else
    {//Alerta de error en caso de nos haber texto para copiar.
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "No se ha encotrado ningún texto a copiar",
            showConfirmButton: false,
            timer: 1500,
        });
        document.getElementById("texto-encriptar").placeholder = "Ingrese el texto aquí"; 
    }
}

//Funcion ocultar imagen.
function ocultarImagen() {
    let texto_vacio = "";
    let text_area = document.getElementById("texto-desencriptar").value;
    if (texto_vacio !== text_area) {
        document.getElementById("cubierta").style.display = "none";
        $(".animacion").fadeIn(100, function() {
            $(".animacion").fadeOut(800);
        });
        $(".animacion").css("display", "block"); // Mostrar el GIF
    } else {  
        document.getElementById("cubierta").style.display = "";
        $(".animacion").css("display", "none"); // Ocultar el GIF
    } 
}

//Funcion limpiar.
function limpiar(){
    document.getElementById("texto-encriptar").value = "";
    document.getElementById("texto-desencriptar").value = "";
}

//Funcion foco.
function foco(){
    document.getElementById("texto-encriptar").focus();
    ocultarImagen();
}

//Funcion borrar y condiciones iniciales
function borrar(){
    document.getElementById("texto-encriptar").placeholder = "Ingrese el texto aqui";
    document.getElementById("texto-desencriptar").placeholder = "";
    document.getElementById("texto-desencriptar").style.color = "#495057";
    limpiar();
    foco();
    ocultarImagen();
}

foco();

