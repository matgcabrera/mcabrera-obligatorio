//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

var user = document.forms["form-login"]["usuario"].value;
var passwd = document.forms["form-login"]["password"].value;
var error_user = document.getElementById("error-user");
var error_passwd = document.getElementById("error-passwd");

function validarLogin(value, name){
    if (value == "" || value == null){
        document.getElementById("error-login").innerHTML = "Debe ingresar su " + name;
        error_user.style.display = "block";
        return false;
    }
}

function validarButton() {
    if (user == "" || user == null) {
        document.getElementById("error-login").innerHTML = "Debe ingresar su usuario";
        error_user.style.display = "block";
        return false;
    }

    if (passwd == "" || passwd == null){
        document.getElementById("error-login").innerHTML = "Debe ingresar su contraseña";
        alert("Debe ingresar su contraseña");
        return false;
    }
}

function validarForm(){
    if (user.lenght == 0) {
        error_user.style.display = "block";
        user.focus();
    }
}