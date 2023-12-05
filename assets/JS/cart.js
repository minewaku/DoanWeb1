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

export default renderCart;
