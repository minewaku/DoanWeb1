import hotDealFruits from "./hotDealFruit.js";
var fruitList = hotDealFruits;
const productFruit = document.querySelector(".product-container");
const checkboxes = document.querySelectorAll(".checkbox");
const seclectedFillter = document.querySelectorAll(".selected-fillter-item");
const closeFillters = document.querySelectorAll(".selected-fillter-item__icon");
const pagination = document.querySelector(".page-list");
let currentPage = 1;
let perPage;

render(fruitList, productFruit);

// Selected Fillter
checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener("click", () => {
    let isChecked = checkbox.checked;
    if (isChecked) {
      seclectedFillter[index].classList.remove("hidden");
    } else {
      seclectedFillter[index].classList.add("hidden");
    }
  });
});

// Fillter Product
checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener("click", () => {
    let isChecked = checkbox.checked;
    switch (index) {
      case 0: {
        if (isChecked) {
          renderFill(fruitList, 0, 99000, productFruit);
          goToDetail();
        } else {
          render(fruitList, productFruit);
          goToDetail();
        }
        break;
      }
      case 1: {
        if (isChecked) {
          renderFill(fruitList, 99000, 201000, productFruit);
          goToDetail();
        } else {
          render(fruitList, productFruit);
          goToDetail();
        }
        break;
      }
      case 2: {
        if (isChecked) {
          renderFill(fruitList, 201000, 301000, productFruit);
          goToDetail();
        } else {
          render(fruitList, productFruit);
          goToDetail();
        }
        break;
      }

      case 3: {
        if (isChecked) {
          renderFill(fruitList, 301000, 501000, productFruit);
          goToDetail();
        } else {
          render(fruitList, productFruit);
          goToDetail();
        }
        break;
      }

      case 4: {
        if (isChecked) {
          renderFill(fruitList, 501000, 1000000, productFruit);
          goToDetail();
        } else {
          render(fruitList, productFruit);
          goToDetail();
        }
        break;
      }
      case 5: {
        if (isChecked) {
          renderFill(fruitList, 1000000, Infinity, productFruit);
          goToDetail();
        } else {
          render(fruitList, productFruit);
          goToDetail();
        }
        break;
      }
    }
  });
});

//  Close Fillter
closeFillters.forEach((closeFillter, index) => {
  closeFillter.addEventListener("click", () => {
    seclectedFillter[index].classList.add("hidden");
    checkboxes[index].checked = false;
  });
});

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

// Render Fill
function renderFill(list, min, max, containerElement) {
  const filteredList = list.filter((item) => {
    return item.price > min && item.price < max;
  });
  render(filteredList, containerElement);
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

pagiNation(fruitList);

// xy ly khi chuyen trang

function handlePagenumber(number) {
  let products = fruitList;
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

function redirectToProductDetail(productId) {
  var redirectPath = "./productDetailHotDeal.html?id=" + productId;
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

renderPageNumber(fruitList);
