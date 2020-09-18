var product = {};
var commentsArray = [];
var productsArray = [];
var relatedProductstoLoad = [];

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComments(array) {

    let htmlContentToAppend = "";
    

    //Leo score y lo convierto en estrellas ascii

    for (let i = 0; i < array.length; i++) {
        let comment = array[i];
        let starTreatment = "";

        for (let a = 0; a < 5; a++){
            if(comment.score>a){
                starTreatment += `<span class="fa fa-star checked"></span>`;
            } else {
                starTreatment += `<span class="fa fa-star"></span>`;
            }

        }
        htmlContentToAppend+= `
        <div class="list-group-item list-group-item-action">
          <div class="row">
            <div class="col">
              <div class="d-flex w-90 justify-content-between">
                <h4 class="mb-1">`+ comment.user + " - " + starTreatment +`</h4>
                <small class="text-muted">` + comment.dateTime + `</small>
              </div>
              <p>"` + comment.description + `"</p>
            </div>
          </div>
        </div>
        `;

        document.getElementById("comentarios-previos").innerHTML = htmlContentToAppend;
    }
}

/*function searchProducts(array) {
    let htmlContentToAppend = "";

    for (let i=0; i<array.lenght; i++){
        let relatedProd = array[i];
        
        for(a=0; a<relatedProductstoLoad; a++){
            if (relatedProd === relatedProductstoLoad){
                document.getElementById("relatedProducts").innerHTML = i;
            }
        }

        }
    } 
} */

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let vendidosCountHTML = document.getElementById("vendidosCount");
            let productCategoryHTML = document.getElementById("productCategory");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + " " + product.currency;
            vendidosCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            relatedProductstoLoad = product.relatedProducts;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
            //Muestro comentarios
            showComments(commentsArray);
        }
    }
    )
});

//validar comentario
