var cartArray = [];
var subIndividual = 0;

function calcSubtotal(cost, idNumber,) {
    var cartCount = document.getElementById("inputCantidad" + idNumber).value;
    var sub = cost * cartCount;
    document.getElementById("subtotalId" + idNumber).innerHTML = sub;
}

function carritoProducts(cartArray) {

    let htmlContentToAppend = "";
    for (let i = 0; i < cartArray["articles"].length; i++) {
        let cart = cartArray["articles"][i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action" id="">
            <div class="row">
                <div class="col-2">
                    <img src="` + cart.src + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ cart.name + `</h4>
                    </div>
                </div>
                <div class="col-3">
                    <p>`+ cart.unitCost + " " + cart.currency + `</p>
                    <input id="inputCantidad`+ i + `"class="col-xs-1 number input-sm countinput" type="number" value="` + cart.count + `" onchange="calcSubtotal(` + cart.unitCost + `, ` + i + `)">
                    <br>
                    <p>Subtotal: </p>
                    <div id="subtotalId`+ i + `" >`+ cart.unitCost * cart.count +`</div>
                </div>
            </div>
        </div>
        `

        document.getElementById("carritocontainer").innerHTML = htmlContentToAppend;

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