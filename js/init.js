const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var miStorage = window.sessionStorage;
var currentLocation = window.location.href;
var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//login

//entrega2 grupal

function guardarUsuario(){
  var userDisplay = document.getElementById("iduser").value;
  miStorage.setItem("user",userDisplay);
}

document.addEventListener("DOMContentLoaded", function(e){
  document.getElementById("displayuser").innerHTML = miStorage.getItem("user");
  const ISLOGGEDIN = miStorage.getItem("isLoggedIn");
  if (!ISLOGGEDIN && location.href !== "login.html"){
    location.href = "login.html"
  }
  if (ISLOGGEDIN && location.href == "login.html"){
    location.href = "/"
  }
});

//entrega4 grupal
function logout(){
  window.sessionStorage.clear();
  window.localStorage.clear();
  location.reload();
}