var product = {};
var commentsArray = [];
var productsArray = [];
var relatedProductstoLoad = [];
var relatedProductsArray = [];

//Cargo las imagenes dentro del carrousel
function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        if (i===0){
            htmlContentToAppend +=`
            <div class="carousel-item active">
              <img src="` + imageSrc + `" class="d-block w-100 image-fluid" alt="Auto`+ i +`">
            </div>
            `
            document.getElementById("carouselImagesGallery").innerHTML = htmlContentToAppend;
        } else {
            htmlContentToAppend +=`
            <div class="carousel-item">
              <img src="` + imageSrc + `" class="d-block w-100 image-fluid" alt="Auto `+ i +`">
            </div>
            `
            document.getElementById("carouselImagesGallery").innerHTML = htmlContentToAppend;
        }
    }
}

//Cargo los comentarios preexistentes
function showComments(array) {

    let htmlContentToAppend = "";


    //Leo score y lo convierto en estrellas ascii

    for (let i = 0; i < array.length; i++) {
        let comment = array[i];
        let starTreatment = "";

        for (let a = 0; a < 5; a++) {
            if (comment.score > a) {
                starTreatment += `<span class="fa fa-star checked"></span>`;
            } else {
                starTreatment += `<span class="fa fa-star"></span>`;
            }

        }
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
          <div class="row">
            <div class="col">
              <div class="d-flex w-90 justify-content-between">
                <h4 class="mb-1">`+ comment.user + " - " + starTreatment + `</h4>
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

//Muestro productos relacionados
function showRelatedProducts(array) {
    let htmlContentToAppend = "";

    for (let o = 0; o < array.length; o++) {
        

        for (u = 0; u < relatedProductstoLoad.length; u++) {
            if (o === relatedProductstoLoad[u]) {
                let relatedProd = array[o];

                htmlContentToAppend += `
                
                <div class="col-md-3 float-left">
                <div class="thumbnail">
                  <a href="#">
                    <img src="`+ relatedProd.imgSrc +`" alt="`+ relatedProd.name +`" style="width:100%" class="img-fluid img-thumbnail">
                    <div class="caption">
                        <h4 class="mb-1">`+ relatedProd.name + `</h4>
                        <p>` + relatedProd.cost + ` ` + relatedProd.currency + `</p>
                    </div>
                  </a>
                </div>
              </div>
                `

                document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
            }
        }

    }
}



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
    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            relatedProductsArray = resultObj.data;
            //Muestro productos relacionados
            showRelatedProducts(relatedProductsArray);
        }
    });
});

//validar comentario
