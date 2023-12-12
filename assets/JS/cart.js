import createOrder from "./orders.js";

let productsInCart = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];
function renderFromCart() {
  var container = document.querySelector(".cart--body__products");
  var htmls = productsInCart.map((element, index) => {
    return `
    <div class="product--item" data-product-id="${
      element.id
    }" data-product-quycach="${element.quycach}">
      <div class="product--item__btnDel">Xóa</div>
      <div class="product--item__img">
        <img
          src="${element.imgSrc}"
          alt=""
        />
      </div>
      <div class="product--item__info">
        <div class="info--name">
          ${element.name}
        </div>
        <div class="info--quantity">${
          element.quycach == 1 ? "1 sp" : element.quycach
        }</div>
      </div>
      <div class="product--item__total">${(function getTotal() {
        var result = element.soluong * element.price;
        var resultFomatted = new Intl.NumberFormat().format(result);
        return resultFomatted;
      })()}₫</div>
      <div class="product--item__UpDown">
        <div class="down"><span>-</span></div>
        <div class="quantity"><span>${element.soluong}</span></div>
        <div class="up"><span>+</span></div>
      </div>
    </div>
    `;
  });
  container.innerHTML = htmls.join("\n");
}

// calender
const daysContainer = document.getElementById("daysContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const monthYear = document.getElementById("monthYear");
const dateInput = document.getElementById("dateInput");
const calendar = document.getElementById("calendar");

let currentDate = new Date();
let selectedDate = null;

function handleDayClick(day) {
  selectedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    day
  );
  dateInput.value = selectedDate.toLocaleDateString("en-US");
  calendar.style.display = "none";
  renderCalendar();
}

function createDayElement(day) {
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  const dayElement = document.createElement("div");
  dayElement.classList.add("day");

  if (date.toDateString() === new Date().toDateString()) {
    dayElement.classList.add("current");
  }
  if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
    dayElement.classList.add("selected");
  }

  dayElement.textContent = day;
  dayElement.addEventListener("click", () => {
    handleDayClick(day);
  });
  daysContainer.appendChild(dayElement);
}

function renderCalendar() {
  daysContainer.innerHTML = "";
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  monthYear.textContent = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${currentDate.getFullYear()}`;

  for (let day = 1; day <= lastDay.getDate(); day++) {
    createDayElement(day);
  }
}

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

dateInput.addEventListener("click", () => {
  calendar.style.display = "block";
  positionCalendar();
});

document.addEventListener("click", (event) => {
  if (!dateInput.contains(event.target) && !calendar.contains(event.target)) {
    calendar.style.display = "none";
  }
});

function positionCalendar() {
  const inputRect = dateInput.getBoundingClientRect();
  calendar.style.top = inputRect.bottom + "px";
  calendar.style.left = inputRect.left + "px";
}

window.addEventListener("resize", positionCalendar);

renderCalendar();

// End calender

function renderTotalPrice() {
  var total = 0;
  productsInCart.forEach((item) => {
    total += item.soluong * item.price;
  });
  var resultFomatted = new Intl.NumberFormat().format(total);
  document.querySelector(
    ".infoCus--total__price"
  ).innerText = `${resultFomatted}₫`;
}

function renderCart() {
  renderFromCart();
  renderTotalPrice();
  deleteProduct();
}
renderCart();

function downQuantity() {
  var container = document.querySelector(".cart--body__products");

  container.addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("down")) {
      var productElement = target.closest(".product--item");
      var productId = productElement.dataset.productId;
      var productQuycach = productElement.dataset.productQuycach;
      var productIndex = productsInCart.findIndex(
        (product) =>
          product.id == parseInt(productId) && product.quycach == productQuycach
      );
      if (productIndex !== -1 && productsInCart[productIndex].soluong > 1) {
        productsInCart[productIndex].soluong -= 1;
        localStorage.setItem("products", JSON.stringify(productsInCart));
        renderCart();
        updateCartQuantity();
      }
    }
  });
}

function upQuantity() {
  var container = document.querySelector(".cart--body__products");

  container.addEventListener("click", function (event) {
    var target = event.target;

    if (target.classList.contains("up")) {
      var productElement = target.closest(".product--item");
      var productId = productElement.dataset.productId;
      var productQuycach = productElement.dataset.productQuycach;
      console.log(productQuycach);
      var productIndex = productsInCart.findIndex(
        (product) =>
          product.id == parseInt(productId) && product.quycach == productQuycach
      );
      if (productIndex !== -1) {
        productsInCart[productIndex].soluong += 1;
        localStorage.setItem("products", JSON.stringify(productsInCart));
        renderCart();
        updateCartQuantity();
      }
    }
  });
}

function deleteProduct() {
  var btnDeletes = document.querySelectorAll(".product--item__btnDel");
  btnDeletes.forEach((item, index) => {
    item.addEventListener("click", () => {
      productsInCart.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(productsInCart));
      renderCart();
      updateCartQuantity();
    });
  });
}

// Login/ LogOut
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
                        <a href="./infoUser.html">Chào, ${UserInfo[loggedInAccountIndex].firstNameUser}</a>
                        <a href="/" class="btn-logOut">Đăng xuất</a>
                      </div>`;
    logOut();
  } else {
    boxUser.innerHTML = `<i class="fa-solid fa-circle-user"></i>
                      <div class="header__item-body d-flex flex-column">
                        <a href="./login.html">Đăng nhập</a>
                        <a href="./register.html">Đăng ký</a>
                      </div>`;
  }
});

function logOut() {
  let btnLogOut = document.querySelector("a.btn-logOut");
  btnLogOut.addEventListener("click", () => {
    localStorage.setItem("isLogin", false);
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
  // toPayment();
}

rendercartContent();

document.addEventListener("DOMContentLoaded", () => {
  var quantityBreadscumb = document.querySelector(
    ".breadcrumb--desc p:last-child span"
  );
  var cartQuantityValue = 0;
  productsInCart.forEach((item) => {
    cartQuantityValue += item.soluong;
  });
  quantityBreadscumb.innerHTML = cartQuantityValue;
});

function updateCartQuantity() {
  var cartQuantity = document.querySelector(".cart__quantity");
  var quantityBreadscumb = document.querySelector(
    ".breadcrumb--desc p:last-child span"
  );
  var cartQuantityValue = 0;
  productsInCart.forEach((item) => {
    cartQuantityValue += item.soluong;
  });
  cartQuantity.innerHTML = cartQuantityValue;
  quantityBreadscumb.innerHTML = cartQuantityValue;
}

downQuantity();
upQuantity();

// Modal

let btnAcceptpayment = document.querySelector(".infoCus--submit-btn");
let isLogin = JSON.parse(localStorage.getItem("isLogin")) || false;
let modalpayment = document.querySelector(".modal-payment");
btnAcceptpayment.addEventListener("click", () => {
  if (isLogin) {
    modalpayment.style.display = "block";
  } else {
    alert("Vui lòng đăng nhập để mua hàng!!!");
  }
});

window.addEventListener("click", (event) => {
  if (event.target == modalpayment) {
    modalpayment.style.display = "none";
  }
});

// Modal payment
function modalPayment() {
  let container = document.querySelector(".product-in-cart");
  container.innerHTML = productsInCart
    .map((product) => {
      return `
    <div class="product-item">
              <div class="box-img">
                <img
                  src="${product.imgSrc}"
                  alt=""
                  class="img line-clamp"
                />
                <div class="quantity">${product.soluong}</div>
              </div>
              <div class="desc">
                <div class="name">${product.name}</div>
                <div class="quycach">${product.quycach}</div>
              </div>
              <div class="price">${(() => {
                var resultFomatted = new Intl.NumberFormat().format(
                  product.price
                );
                return resultFomatted;
              })()}₫</div>
            </div>
  `;
    })
    .join("");
  function renderTotalPrice() {
    var total = 0;
    productsInCart.forEach((item) => {
      total += item.soluong * item.price;
    });
    var resultFomatted = new Intl.NumberFormat().format(total);
    document.querySelectorAll(
      ".total-products.space-between .total"
    )[0].innerHTML = `${resultFomatted}₫`;
  }
  renderTotalPrice();

  let users = JSON.parse(localStorage.getItem("UsersInfo")) || [];
  let indexLoged = localStorage.getItem("loggedInAccountIndex") || null;
  // render Info
  function renderInfo() {
    let boxInfo = document.querySelector(".section-information");
    boxInfo.innerHTML = `
    <img
    src="../../assets/img/Users/avatar${(() => {
      var randomNumber = Math.floor(Math.random() * 5) + 1;
      return randomNumber;
    })()}.png"
    alt="ảnh người dùng"
  />
  <p>${users[indexLoged].firstNameUser} (${users[indexLoged].emailUser})</p>
    `;
  }
  renderInfo();

  let district = document.getElementById("district");
  var total = 0;
  productsInCart.forEach((item) => {
    total += item.soluong * item.price;
  });
  var finalTotal = new Intl.NumberFormat().format(total);
  document.querySelector(
    ".final-price.space-between .total"
  ).innerHTML = `${finalTotal}₫`;
  district.addEventListener("change", () => {
    if (district.value == "000") {
      document.querySelector(".not-district").style.display = "flex";
      document.querySelector(".has-district").style.display = "none";
      document.querySelector(
        ".ship-fee.space-between .total"
      ).innerHTML = `---`;
      var total = 0;
      productsInCart.forEach((item) => {
        total += item.soluong * item.price;
      });
      var finalTotal = new Intl.NumberFormat().format(total);
      document.querySelector(
        ".final-price.space-between .total"
      ).innerHTML = `${finalTotal}₫`;
    } else {
      document.querySelector(".not-district").style.display = "none";
      document.querySelector(".has-district").style.display = "flex";
      document.querySelector(".has-district p").innerHTML = `${
        district.options[district.selectedIndex].text
      } phí vận chuyển là: `;
      document.querySelector(".has-district span").innerHTML = `100k`;
      var resultFomatted = new Intl.NumberFormat().format(100000);
      document.querySelector(
        ".ship-fee.space-between .total"
      ).innerHTML = `${resultFomatted}₫`;
      var total = 0;
      productsInCart.forEach((item) => {
        total += item.soluong * item.price;
      });
      var finalTotal = new Intl.NumberFormat().format(total + 100000);
      document.querySelector(
        ".final-price.space-between .total"
      ).innerHTML = `${finalTotal}₫`;
    }
  });
  createOrder();
}

modalPayment();

export default renderCart;
