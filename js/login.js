//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    sessionStorage.setItem("isLoggedIn", true);
});
//guardar elementos html en variables
var user = document.forms["form-login"]["usuario"];
var passwd = document.forms["form-login"]["password"];
var error_user = document.getElementById("error-user");
var error_passwd = document.getElementById("error-passwd");

//validacion para onblur de inputs
function validarLogin(value, name){
    if (value == "" || value == null){
        if (name == "usuario"){
            error_user.style.display = "block";
            document.forms["form-login"]["usuario"].style.border = "1px solid red";
            return false;
        }
        if (name == "password"){
            error_passwd.style.display = "block";
            document.forms["form-login"]["password"].style.border = "1px solid red";
            return false;
        }
    }
}

user.addEventListener("textInput", userInput);
passwd.addEventListener("textInput", passwdInput);

//validacion al presionar "ingresar"
function validarForm() {
    if (user.value.lenght == 0 || user.value == "" || user.value == null) {
        error_user.style.display = "block";
        document.forms["form-login"]["usuario"].style.border = "1px solid red";
        return false;
    }

    if (passwd.value.lenght == 0 || passwd.value == "" || passwd.value == null){
        error_passwd.style.display = "block";
        document.forms["form-login"]["password"].style.border = "1px solid red";
        return false;
    }
    sessionStorage.setItem("user",userDisplay);

    return true;
}



//remueve mensaje de error al completar campo
function userInput(){
    if (user.value.lenght != 0){
        error_user.style.display = "none";
        document.forms["form-login"]["usuario"].style.border = "1px solid grey";
        return true;
    }
}
function passwdInput(){
    if (passwd.value.lenght != 0){
        error_passwd.style.display = "none";
        document.forms["form-login"]["password"].style.border = "1px solid grey";
        return true;
    }
}

//entrega 2 grupal
