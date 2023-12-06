import fruitList from "./fruitList.js";
import hotDealFruits from "./hotDealFruit.js";
import foreinFruit from "./foreinFruit.js";

function getNameFileUrl() {
  const pathArray = window.location.pathname.split("/");
  const htmlFileName = pathArray[pathArray.length - 1];
  return htmlFileName;
}

function getIdOnUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));
  return id;
}
// CArt in localStorage
let productsInCart = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];

function handleAddProductToCart() {
  var quycach;
  var soluong = document.querySelector(".soluong .quantity").dataset.quantity;
  var htmlFileName = getNameFileUrl();
  var id = getIdOnUrl();
  var elementSelected;
  if (htmlFileName == "productDetailForeignList.html") {
    elementSelected = foreinFruit.find((product) => product.id === id);
  } else if (htmlFileName == "productDetailFruitList.html") {
    elementSelected = fruitList.find((product) => product.id === id);
  } else if (htmlFileName == "productDetailHotDeal.html") {
    elementSelected = hotDealFruits.find((product) => product.id === id);
  } else {
    console.error("Khong tim thay san pham nay");
    return;
  }

  if (elementSelected.desc.quyCach.length == 0) {
    quycach = 1;
  } else {
    quycach = document.querySelector(
      ".position-relative.active div"
    ).textContent;
  }

  var newProduct = {
    id: id,
    name: elementSelected.name,
    price: elementSelected.price,
    imgSrc: elementSelected.srcImg,
    quycach: quycach ? quycach : 1,
    soluong: parseInt(soluong),
  };

  let checkProduct = false;
  productsInCart.forEach((item) => {
    if (item.name == newProduct.name && item.quycach == newProduct.quycach) {
      checkProduct = true;
    }
  });
  if (checkProduct) {
    let getIndex = productsInCart.findIndex(
      (product) =>
        product.name == newProduct.name && product.quycach == newProduct.quycach
    );
    productsInCart[getIndex].soluong += newProduct.soluong;
  } else {
    productsInCart.unshift(newProduct);
  }

  localStorage.setItem("products", JSON.stringify(productsInCart));

  updateCartQuantity();
}

// Login / Logout
document.addEventListener("DOMContentLoaded", () => {
  let boxUser = document.querySelector(
    "li.header__item.d-none.d-md-flex.d-none.align-items-center.me-4"
  );
  let loggedInAccountIndex = JSON.parse(
    localStorage.getItem("loggedInAccountIndex")
  );
  let UserInfo = JSON.parse(localStorage.getItem("UsersInfo"));
  let isLogin = JSON.parse(localStorage.getItem("isLogin"));

  if (isLogin) {
    boxUser.innerHTML = "";
    boxUser.innerHTML = `<i class="fa-solid fa-circle-user"></i>
                      <div class="header__item-body d-flex flex-column">
                        <a href="#!">Chào, ${UserInfo[loggedInAccountIndex].firstNameUser}</a>
                        <a href="/" class="btn-logOut">Đăng xuất</a>
                      </div>`;
    logOut();
  } else {
    boxUser.innerHTML = `<i class="fa-solid fa-circle-user"></i>
                      <div class="header__item-body d-flex flex-column">
                        <a href="./views/web/login.html">Đăng nhập</a>
                        <a href="./views/web/register.html">Đăng ký</a>
                      </div>`;
  }
});

function logOut() {
  let btnLogOut = document.querySelector("a.btn-logOut");
  btnLogOut.addEventListener("click", () => {
    localStorage.removeItem("isLogin");
  });
}

function updateCartQuantity() {
  var cartQuantity = document.querySelector(".cart__quantity");
  var cartQuantityValue = 0;
  productsInCart.forEach((item) => {
    cartQuantityValue += item.soluong;
  });
  cartQuantity.innerHTML = cartQuantityValue;
}
export default handleAddProductToCart;
