let myStorage = window.localStorage;

function enableInputs() {
    document.getElementById("inputNombre").disabled = false;
    document.getElementById("inputApellido").disabled = false;
    document.getElementById("inputEdad").disabled = false;
    document.getElementById("inputEmail01").disabled = false;
    document.getElementById("inputTel").disabled = false;
}

function disableInputs() {
    document.getElementById("inputNombre").disabled = true;
    document.getElementById("inputApellido").disabled = true;
    document.getElementById("inputEdad").disabled = true;
    document.getElementById("inputEmail01").disabled = true;
    document.getElementById("inputTel").disabled = true;
}

function datosUser() {
    var JSONUser = {
        "nombre": document.getElementById("inputNombre").value,
        "apellido": document.getElementById("inputApellido").value,
        "edad": document.getElementById("inputEdad").value,
        "email": document.getElementById("inputEmail01").value,
        "tel": document.getElementById("inputTel").value
    }
    console.log(JSONUser);
    myStorage.setItem("userData", JSON.stringify(JSONUser));
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("inputEmail01").placeholder = miStorage.getItem("user");
    
    JSONUserSaved = JSON.parse(myStorage.getItem("userData"));

    document.getElementById("inputNombre").placeholder = JSONUserSaved.nombre;
    document.getElementById("inputApellido").placeholder = JSONUserSaved.apellido;
    document.getElementById("inputEdad").placeholder = JSONUserSaved.edad;
    document.getElementById("inputEmail01").placeholder = JSONUserSaved.email;
    document.getElementById("inputTel").placeholder = JSONUserSaved.tel;
});