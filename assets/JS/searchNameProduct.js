import fruitList from "./fruitList.js";
import foreinFruit from "./foreinFruit.js";
import hotDealFruits from "./hotDealFruit.js";

const productFruit = document.querySelector(".product-container");
let currentPage = 1;
let perPage;

const updateIds = (arr, startId) => {
  return arr.map((item, index) => ({
    ...item,
    id: startId + index + 1,
  }));
};

const updatedFruitList = updateIds(fruitList, 0);
const updatedForeignFruit = updateIds(foreinFruit, fruitList.length);
const updatedHotDealFruits = updateIds(
  hotDealFruits,
  fruitList.length + foreinFruit.length
);

const allProducts = updatedFruitList.concat(
  updatedForeignFruit,
  updatedHotDealFruits
);
function removeVietnameseDiacritics(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function containsKeyword(productName, keyword) {
  const normalizedProductName = removeVietnameseDiacritics(productName);
  const normalizedKeyword = removeVietnameseDiacritics(keyword);

  return normalizedProductName.includes(normalizedKeyword);
}

// Render
function render(list, elementContainer) {
  elementContainer.innerHTML = "";
  list.forEach((item, index) => {
    let elementLink = document.createElement("a");
    elementLink.setAttribute("href", "#");
    elementLink.setAttribute("data-value", item.id);
    let fruitElement = document.createElement("div");
    fruitElement.classList.add("product-item");
    let boxImg = document.createElement("div");
    boxImg.classList.add("box-image");
    // img
    let imgElement = document.createElement("img");
    imgElement.src = item.srcImg;
    imgElement.setAttribute("alt", item.name);
    imgElement.classList.add("product-img");

    boxImg.appendChild(imgElement);
    // product name
    let productName = document.createElement("p");
    productName.classList.add("product-name");
    productName.classList.add("line-clamp");
    productName.innerText = item.name;
    // product Price
    let productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    // Format number
    const formattedNumber = new Intl.NumberFormat().format(item.price);
    productPrice.innerText = formattedNumber + "₫";

    fruitElement.append(boxImg, productName, productPrice);

    elementLink.append(fruitElement);
    elementContainer.append(elementLink);
  });
}

// Pagination
function pagiNation(list) {
  let currentPage = 1;
  let limit = 12;
  perPage = [];
  perPage = list.slice(
    (currentPage - 1) * limit,
    (currentPage - 1) * limit + limit
  );
  render(perPage, productFruit);
}

pagiNation(allProducts);

// xy ly khi chuyen trang

function handlePagenumber(number) {
  let products = allProducts;
  let limit = 12;
  currentPage = number;
  perPage = products.slice(
    (currentPage - 1) * limit,
    (currentPage - 1) * limit + limit
  );
  render(perPage, productFruit);
  goToDetail();

  // Xóa lớp "active" từ tất cả các li
  const pageNumberItems = document.querySelectorAll(
    ".pagination-row .page-list .page-item"
  );
  pageNumberItems.forEach((item) => item.classList.remove("active"));

  // Đặt lớp "active" cho li của trang hiện tại
  const currentPageItem = document.querySelector(
    `.pagination-row .page-list .page-item:nth-child(${number})`
  );
  currentPageItem.classList.add("active");
}

// render so luong trang
function renderPageNumber(list) {
  let limit = 12;
  let totalPages = Math.ceil(list.length / limit);
  let pageNumber = document.querySelector(".pagination-row .page-list");
  pageNumber.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    let newPage = document.createElement("li");
    newPage.innerText = i;
    newPage.classList.add("page-item");
    if (i == currentPage) {
      newPage.classList.add("active");
    }
    newPage.addEventListener("click", function () {
      handlePagenumber(i);
    });
    pageNumber.appendChild(newPage);
  }
}
renderPageNumber(allProducts);

function redirectToProductDetail(productId) {
  var redirectPath;
  if (productId < 26) {
    redirectPath = "./productDetailFruitList.html?id=" + productId;
  } else if (productId >= 26 && productId < 52) {
    productId = productId - 26;
    redirectPath = "./productDetailForeignList.html?id=" + productId;
  } else {
    productId = productId - 52;
    redirectPath = "./productDetailHotDeal.html?id=" + productId;
  }
  window.location.href = redirectPath;
}

function goToDetail() {
  var allProducts = document.querySelectorAll(".product-container a");
  allProducts.forEach((product) => {
    product.addEventListener("click", () => {
      var productId = product.getAttribute("data-value");
      console.log(productId);
      redirectToProductDetail(productId);
    });
  });
}

goToDetail();

let nameValue = document.querySelector(".search-name-product");
let btnSubmit = document.querySelector(
  ".header__searchbar-icon.d-flex.justify-content-center.align-items-center"
);
btnSubmit.addEventListener("click", (event) => {
  let heading = document.querySelector(".name-heading");
  let affterSearch = [];
  if (nameValue.value.trim() == "") {
    event.stopPropagation();
  } else {
    let keyword = nameValue.value;
    allProducts.map((product) => {
      if (containsKeyword(product.name, keyword)) {
        affterSearch.push(product);
      }
    });
  }
  heading.innerHTML = "";
  heading.innerHTML = `Có ${affterSearch.length} sản phẩm tìm thấy`;
  pagiNation(affterSearch);
  renderPageNumber(affterSearch);
  goToDetail();
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    nameValue.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        let heading = document.querySelector(".name-heading");
        let affterSearch = [];
        if (nameValue.value.trim() == "") {
          event.stopPropagation();
        } else {
          let keyword = nameValue.value;
          allProducts.map((product) => {
            if (containsKeyword(product.name, keyword)) {
              affterSearch.push(product);
            }
          });
        }
        heading.innerHTML = "";
        heading.innerHTML = `Có ${affterSearch.length} sản phẩm tìm thấy`;
        pagiNation(affterSearch);
        renderPageNumber(affterSearch);
        goToDetail();
      }
    });
  });
});

let productsInCart = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];
document.addEventListener("DOMContentLoaded", () => {
  var cartQuantity = document.querySelector(".cart__quantity");
  var cartQuantityValue = 0;
  productsInCart.forEach((item) => {
    cartQuantityValue += item.soluong;
  });
  cartQuantity.innerHTML = cartQuantityValue;
});

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

// Detele item
function btnCancelCardContent(event) {
  const index = event.currentTarget.getAttribute("data-index");
  productsInCart.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productsInCart));
  var cartQuantity = document.querySelector(".cart__quantity");
  var cartQuantityValue = 0;
  productsInCart.forEach((item) => {
    cartQuantityValue += item.soluong;
  });
  cartQuantity.innerHTML = cartQuantityValue;
  rendercartContent();
}

// Cart content
function rendercartContent() {
  let cartContent = document.querySelectorAll(".cart__content-list.p-0");
  cartContent[0].innerHTML = "";
  let htmls = productsInCart.map((item, index) => {
    return `
                  <li class="cart__content-item d-flex px-3">
                    <div class="content__item-img me-3">
                      <img
                        src="${item.imgSrc}"
                        alt="${item.name}"
                      />
                    </div>

                    <div class="content__item-details">
                      <div class="content__item-name">
                        <a href=""> ${item.name}</a>
                      </div>

                      <div class="">
                        <span class="content__item-price">${item.price}</span>
                        <span class="content__item-quantity">x${item.soluong}</span>
                      </div>
                    </div>

                    <div  class="content__item-delete">
                      <div  data-index="${index}" class="content__item-delete--btn text-end">
                        <i class="fa-solid fa-xmark"></i>
                      </div>
                    </div>
                  </li>
      `;
  });
  cartContent[0].innerHTML = htmls.join("");

  let deleteButtons = document.querySelectorAll(".content__item-delete--btn");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", btnCancelCardContent);
  });

  // Render Total
  function renderTotalPrice() {
    var total = 0;
    productsInCart.forEach((item) => {
      total += item.soluong * item.price;
    });
    var resultFomatted = new Intl.NumberFormat().format(total);
    document.querySelectorAll(
      "div.cart__content-total.py-2.d-flex.align-items-center b.ms-2"
    )[0].innerHTML = `${resultFomatted}₫`;
  }

  renderTotalPrice();
}

rendercartContent();
