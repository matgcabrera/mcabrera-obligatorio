var cartArray = [];
var subIndividual = 0;
var arrayCuenta = [];
var subtotalGlobal=0;

function calcSubtotal(cost, idNumber, currency) {
    //Toma costo y cantidad de un producto idNumber, devuelve subtotal en tiempo real
    let htmlContentToAppend = "";
    var cartCount = document.getElementById("inputCantidad" + idNumber).value;
    var sub = cost * cartCount;
    htmlContentToAppend = sub + " " + currency;
    document.getElementById("subtotalId" + idNumber).innerHTML = htmlContentToAppend;
    calcSubGlobal();
}
function calcSubGlobal(){
    //Calcula suma de todos los articulos, los pasa a dólares
    var arraySubtotales = document.getElementsByClassName("subLocal");
    var arrayCuenta = document.getElementsByClassName("countinput");
    var total = 0;
    for (let i=0; i<arraySubtotales.length; i++){
        
        //separa el subtotal y la moneda en que está expresado
        var moneda = (arraySubtotales[i].innerHTML).slice(-3);
        var costo = (arraySubtotales[i].innerHTML).slice(0, -4);
        var currentCuenta = arrayCuenta[i].value;
        var temp = 0
        if(moneda == "UYU"){
            temp = costo * currentCuenta/40;
            total += temp;
        }else{
            temp = costo * currentCuenta;
            total += temp;
        }
    }
    var htmlContentToAppend=`Subtotal: ` + total + ` USD`;
    document.getElementById("subglobal").innerHTML = htmlContentToAppend;
    subtotalGlobal = total;
}
function calcCostoEnvio(subglobalcurrent){
    //obtiene porcentaje seleccionado
    var selectedEnvio = document.getElementsByName("radioEnvio");
    var envioValue = 0;
    for (var i = 0; i<selectedEnvio.length; i++){
        if(selectedEnvio[i].checked){
            envioValue = selectedEnvio[i].value;
        }
    }
    //calcula porcentaje sobre subtotal
    var envioValueDecimal = (envioValue / 100);
    var envioCost = envioValueDecimal * subglobalcurrent;
    var totalGlobal = envioCost + subglobalcurrent;
    var htmlContentToAppend1 =`Costo envío: ` + envioCost + ` USD`;
    var htmlContentToAppend2 =`Total: ` +totalGlobal+ ` USD`;
    document.getElementById("envioglobal").innerHTML = htmlContentToAppend1;
    document.getElementById("totalglobal").innerHTML = htmlContentToAppend2;
}

function carritoProducts(cartArray) {

    let htmlContentToAppend = "";
    for (let i = 0; i < cartArray["articles"].length; i++) {
        let cart = cartArray["articles"][i];

        //Agrego "calcSubtotal()" al input #inputCantidad, paso costo y valor de i dentro del for como parámetro
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action" id="">
            <div class="row">
                <div class="col-md-2">
                    <img src="` + cart.src + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ cart.name + `</h4>
                    </div>
                </div>
                <div class="col-md-3">
                    <p>`+ cart.unitCost + " " + cart.currency + `</p>
                    <input id="inputCantidad`+ i + `"class="number input-sm countinput" type="number" min="1" value="` + cart.count + `" onchange="calcSubtotal(` + cart.unitCost + `, ` + i + `, '`+ cart.currency+`')">
                    <br>
                    <p>Subtotal: </p>
                    <div id="subtotalId`+ i + `" class="subLocal">`+ cart.unitCost * cart.count +` `+ cart.currency + `</div>
                </div>
            </div>
        </div>
        `;

        document.getElementById("carritocontainer").innerHTML = htmlContentToAppend;

    }
    calcSubGlobal();
}

function validateCalle(){
    //validacion calle
    var calle = document.getElementById("calle").value;
    if (calle == ""){
        document.getElementById("errorcalle").style.display = "block";

    } else {
        document.getElementById("errorcalle").style.display = "none";

    }
}
function validatePuerta(){
    //validacion puerta
    var puerta = document.getElementById("puerta").value;
    if (puerta == ""){
        document.getElementById("errorpuerta").style.display = "block";
    
    } else {
        document.getElementById("errorpuerta").style.display = "none";

    }
}
function validateEsquina(){
    //validacion esquna
    var esquina = document.getElementById("esquina").value;
    if (esquina == ""){
        document.getElementById("erroresquina").style.display = "block";

    } else {
        document.getElementById("erroresquina").style.display = "none";
  
    }
}

function validatePais(){
    //chequea que haya un país seleccionado
    var selectedPais = document.getElementById("pais").value
    if (selectedPais=="empty"){
        document.getElementById("errorpais").style.display="block";
    
    }else{
        document.getElementById("errorpais").style.display="none";
    
    }
}
function validateRadiosEnvio() {
    //chequea que haya un método de envio seleccionado
    var arrayRadios = document.getElementsByName("radioEnvio");
    var isChecked = false;
    for (let i=0;i<arrayRadios.length;i++){
        if(arrayRadios[i].checked){
            isChecked = true;
            
        }
    }
    if(!isChecked) {
        document.getElementById("errorenvio").style.display = "block";

    } else {
        document.getElementById("errorenvio").style.display = "none";

    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data;

            //Muestro los contenidos del carrito
            carritoProducts(cartArray);
        }
    });

});