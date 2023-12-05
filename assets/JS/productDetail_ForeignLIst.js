import foreinFruit from "./foreinFruit.js";
import handleAddProductToCart from "./addProductIntoCart.js";
var fruitList = foreinFruit;
const btnKgAct = document.querySelector(".position-relative.active");
const mainProduct = document.querySelector(".product");
const listImg = document.querySelectorAll(".product-left .slide img");
const mainImg = document.querySelector(".product-left .list-img img");
var list1, list2;

function updatePrice(_this) {
  var price = document.querySelector(".price-box .price").dataset.price;
  var total = price * parseFloat(_this.children[0].getAttribute("value"), 10);
  var formattedNumber = new Intl.NumberFormat().format(total);
  document.querySelector(".price-box .price").innerHTML = `${formattedNumber}đ`;
}

// On||Off Active Kg
function activeBtnKg() {
  const btnKg = document.querySelectorAll(".position-relative");
  btnKg.forEach((item) => {
    item.addEventListener("click", function () {
      updatePrice(this);
      document
        .querySelector(".position-relative.active")
        .classList.remove("active");
      item.classList.add("active");
    });
  });
}

var count = 1;
function plusQuantity() {
  var btnUp = document.querySelector(".btn-up");
  btnUp.addEventListener("click", function () {
    count++;
    document.querySelector(".soluong .quantity").innerText = "";
    document.querySelector(".soluong .quantity").innerText = count;
    document.querySelector(".soluong .quantity").dataset.quantity = count;
  });
}

function subQuantity() {
  var btnUp = document.querySelector(".btn-down");
  btnUp.addEventListener("click", function () {
    if (count > 1) {
      count--;
      document.querySelector(".soluong .quantity").innerText = "";
      document.querySelector(".soluong .quantity").innerText = count;
      document.querySelector(".soluong .quantity").dataset.quantity = count;
    }
  });
}

function changeImg() {
  var listImg = document.querySelectorAll(".product-left .slide");
  listImg.forEach((img, index) => {
    img.addEventListener("click", function () {
      document
        .querySelector(".product-left .slide.active")
        .classList.remove("active");
      this.classList.add("active");
      updateMainImg(index);
    });
  });
}

// chia mang same produtc
function divideList(list) {
  var list8Items = list.slice(0, 8);
  list1 = list8Items.slice(0, 4);
  list2 = list8Items.slice(4, 8);
}

function renderSameProduct(list) {
  var container = document.querySelector(".same-product--container");
  var htmls = list.map(
    (item, index) => `
    <div class="same-product--item" data-value="${item.id}">  
    <div class="box-img">
      <img
        src="${item.srcImg}"
        alt="${item.name}"
        class="product-img"
      />
    </div>
    <p class="product-name line-clamp">${item.name}</p>
    <p class="product-price">${(function (item) {
      var formattedNumber = new Intl.NumberFormat().format(item.price);
      return formattedNumber;
    })(item)}₫</p>
  </div>
  `
  );
  container.innerHTML = htmls.join(" ");
}

// Dieu huong san pham cung loai
function updateSameProduct() {
  let btnRight = document.querySelector(".same-product--actRight");
  let btnLeft = document.querySelector(".same-product--actLeft");
  btnRight.addEventListener("click", () => {
    renderSameProduct(list2);
    goToDetail();
    btnRight.style.display = "none";
    btnLeft.style.display = "flex";
  });
  btnLeft.addEventListener("click", () => {
    renderSameProduct(list1);
    goToDetail();
    btnLeft.style.display = "none";
    btnRight.style.display = "flex";
  });
}

// chuyen anh
var currenIndex = 0;

function updateMainImg(index) {
  currenIndex = index;
  const listImg = document.querySelectorAll(".product-left .slide img");
  const mainImg = document.querySelector(".product-left .list-img img");
  if (currenIndex == 0) {
    document.querySelector(".slide-main--btnLeft").style.display = "none";
  } else {
    document.querySelector(".slide-main--btnLeft").style.display = "flex";
  }
  if (currenIndex == listImg.length - 1) {
    document.querySelector(".slide-main--btnRight").style.display = "none";
  } else {
    document.querySelector(".slide-main--btnRight").style.display = "flex";
  }
  mainImg.src = listImg[currenIndex].getAttribute("src");
}

function btnActRightMain() {
  document
    .querySelector(".slide-main--btnRight")
    .addEventListener("click", () => {
      if (currenIndex == 0) {
        var listImg = document.querySelectorAll(".product-left .slide");
        var listImgAct = document.querySelector(".product-left .slide.active");
        currenIndex++;
        updateMainImg(currenIndex);
        listImgAct.classList.remove("active");
        listImg[currenIndex].classList.add("active");
      }
    });
}

function btnActLeftMain() {
  document
    .querySelector(".slide-main--btnLeft")
    .addEventListener("click", () => {
      if (currenIndex > 0) {
        document
          .querySelector(".product-left .slide.active")
          .classList.remove("active");
        var listImg = document.querySelectorAll(".product-left .slide");
        currenIndex--;
        updateMainImg(currenIndex);
        listImg[currenIndex].classList.add("active");
      }
    });
}

function changeMainImg() {
  btnActRightMain();
  btnActLeftMain();
  document.querySelector(".slide-main--btnLeft").style.display = "none";
  listImg.forEach((item, index) => {
    item.addEventListener("click", () => {
      updateMainImg(index);
    });
  });
}

// Remder mainProduct
function renderMainProduct(productId) {
  var productSelected = fruitList[productId - 1];
  document.title = productSelected.name;
  const breadcrumb = document.querySelector(".breadcrumb");
  breadcrumb.innerHTML = `
  <div class="container">
  <nav>
    <ul>
      <li>
        <a href="">Trang chủ</a>
      </li>
      <span>/</span>
      <li>
        <a href="">Trái cây</a>
      </li>
      <span>/</span>
      <li class="itemlist active">
        <a href="#!">${productSelected.name}</a>
      </li>
    </ul>
  </nav>
</div>
  `;
  mainProduct.innerHTML = `
  <div class="container">
          <div class="product-left">
            <div class="slide-main">
              <div class="list-img">
                <img
                  src="${productSelected.srcImg}"
                  alt=""
                  width="450"
                />
              </div>
              <div class="slide-main--btnRight" ${(function () {
                if (!productSelected.isSlide) {
                  return `style="display: none"`;
                }
              })()}>
                <i class="fa-solid fa-chevron-right fa-2xl"></i>
              </div>
              <div class="slide-main--btnLeft">
                <i class="fa-solid fa-chevron-left fa-2xl"></i>
              </div>
            </div>
            <div ${(function () {
              if (!productSelected.isSlide) {
                return `style="visibility: hidden;
                opacity: 0;"`;
              }
            })()}>
              <div class="slide active">
                <img
                  src="${productSelected.srcImg}"
                  alt=""
                  width="100"
                />
              </div>
              <div class="slide">
                <img
                  src="${productSelected.srcImg2}"
                  alt=""
                  width="100"
                />
              </div>
            </div>
          </div>
          <div class="product-center">
            <h1 class="title-product">${productSelected.name}</h1>
            <div class="colum">
              <div class="column-1">
                <div class="status">
                  <p>Thương hiệu: <span style="color: #12487f">${
                    productSelected.desc.thuongHieu
                  }</span></p>
                  <p>|</p>
                  <p>Tình trạng: <span style="color: #12487f">${
                    productSelected.desc.tinhTrang
                  }</span></p>
                </div>
                <div class="price-box">
                  <span class="price" data-price="${
                    productSelected.price
                  }">${(function () {
    var formattedNumber = new Intl.NumberFormat().format(productSelected.price);
    var dongia = parseFloat(productSelected.desc.quyCach[0]);
    var result = dongia * productSelected.price;
    var resultFomatted = new Intl.NumberFormat().format(result);
    if (productSelected.desc.quyCach.length === 0) {
      return `${formattedNumber}đ`;
    } else {
      return `${resultFomatted}đ`;
    }
  })()}</span>
                </div>
                <div class="form">
                  <strong style="align-self: center" ${(function () {
                    if (productSelected.desc.quyCach.length === 0) {
                      return "hidden";
                    }
                  })()}>Quy Cách:</strong>
                  ${(function () {
                    var init = "";
                    productSelected.desc.quyCach.forEach((item, index) => {
                      init += `
                        <div class="position-relative ${
                          index == 0 ? "active" : ""
                        }">
                        <div value="${
                          productSelected.desc.soluong[index]
                        }" class="product-available">
                          <span>${item}</span>
                        </div>
                      </div>
                      `;
                    });
                    return init;
                  })()}
                </div>
                <div><hr /></div>
                <div class="soluong">
                  <span>Số lượng:</span>
                  <div class="input-number">
                    <button type="button" onclick="" class="btn-down">-</button>
                    <span class="quantity" data-quantity="1">1</span>
                    <button type="button" onclick="" class="btn-up">+</button>
                  </div>
                </div>
                <div class="button-action">
                  <button id="addtoCart" type="button">Thêm vào giỏ</button>
                  <button id="check-out">Thanh toán</button>
                </div>
              </div>
              <div class="column-2">
                <div>
                  <strong>Chỉ có ở Farmers Market</strong>
                  <ul>
                    <li class="media">
                      <div class="media-picture">
                        <img src="../../assets/img/cam_ket_1.webp" alt="#" />
                      </div>
                      <div class="media-body">Giao hàng nội thành</div>
                    </li>
                    <li class="media">
                      <div class="media-picture">
                        <img src="../../assets/img/cam_ket_2.webp" alt="#" />
                      </div>
                      <div class="media-body">
                        Đổi trả trong 48H nếu sản phẩm không đạt chất lượng cam
                        kết
                      </div>
                    </li>
                    <li class="media">
                      <div class="media-picture">
                        <img src="../../assets/img/cam_ket_3.webp" alt="#" />
                      </div>
                      <div class="media-body">
                        Giá có thể thay đổi theo thời điểm
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
  `;
}

// Render Desc Product
function renderDesc(productId) {
  var productSelected = fruitList[productId - 1];
  var descContainer = document.querySelector(".content-detail-tab");
  descContainer.innerHTML = `
  <div class="container">
        <div class="detail">
          <div class="container-2-tab-title">
            <h2>Mô tả sản phẩm</h2>
          </div>
          <hr />
          <div class="container-2-tab-content">
            <p><strong>Xuất xứ: </strong>${productSelected.desc.xuatXu}</p>
            <p><strong>Chất lượng: </strong>Nhập khẩu</p>
            <br />
            <p><strong>Đặc điểm nổi bật:</strong></p>
            <ul>
            ${(function (arrDesc) {
              var desc = "";
              for (var sentent of arrDesc) {
                desc += `<li>
                ${sentent}
              </li>`;
              }
              return desc;
            })(productSelected.desc.dacDiem)}
            </ul>
            <br />
          </div>
        </div>
      </div>
  `;
}

function goToDetail() {
  var allProducts = document.querySelectorAll(
    ".same-product--container .same-product--item"
  );
  allProducts.forEach((product) => {
    product.addEventListener("click", () => {
      var productId = product.getAttribute("data-value");
      var redirectPath = "./productDetail.html?id=" + productId;
      window.location.href = redirectPath;
    });
  });
}

function addToCart() {
  var btnAddToCart = document.querySelector(".button-action #addtoCart");
  var btnCheckOut = document.querySelector(".button-action #check-out");
  btnAddToCart.addEventListener("click", handleAddProductToCart);
  btnCheckOut.addEventListener("click", handleAddProductToCart);
}

function start(productId) {
  renderMainProduct(productId);
  renderDesc(productId);

  changeMainImg();

  updateSameProduct();
  activeBtnKg();
  plusQuantity();
  subQuantity();
  changeImg();

  divideList(fruitList);
  renderSameProduct(list1);
  goToDetail();
  addToCart();
}

function renderProductDetail() {
  var productId = new URLSearchParams(window.location.search).get("id");
  start(productId);
}
document.addEventListener("DOMContentLoaded", renderProductDetail);
