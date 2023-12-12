let index = parseInt(localStorage.getItem("loggedInAccountIndex"));
let Orders = JSON.parse(localStorage.getItem("Orders"));

if (index !== null) {
  document.querySelector("p .username").innerHTML = `${
    JSON.parse(localStorage.getItem("UsersInfo"))[index].lastNameUser
  } ${JSON.parse(localStorage.getItem("UsersInfo"))[index].firstNameUser} !`;
  document.querySelector("p #username").innerHTML = `${
    JSON.parse(localStorage.getItem("UsersInfo"))[index].lastNameUser
  } ${JSON.parse(localStorage.getItem("UsersInfo"))[index].firstNameUser} !`;
  document.querySelector("p .username").style.fontSize = "14px";
  document.querySelector("p .username").style.fontWeight = "bold";

  document.querySelector("p #username").style.fontSize = "14px";
  document.querySelector("p #username").style.fontWeight = "bold";

  document.querySelector("div .phoneuser").innerHTML = `${
    JSON.parse(localStorage.getItem("UsersInfo"))[index].phoneUser
  }`;
  document.querySelector("div .phoneuser").style.fontSize = "14px";
}

//Appointment history
document.addEventListener("DOMContentLoaded", () => {
  let table = `<tr>
  <th>Mã đơn hàng</th>
  <th>Ngày đặt</th>
  <th>Thành tiền</th>
  <th>TT thanh toán</th>
  <th>TT vận chuyển</th>
</tr>`;
  let tableAppointment = document.querySelector(".appointment-history tbody");
  if (Orders[index].orderUser.length == 0) {
    tableAppointment.innerHTML = ``;
    tableAppointment.innerHTML =
      table + `<p> Chưa có đơn hàng nào được tạo </p>`;
  } else {
    Orders[index].orderUser.forEach((order) => {
      return (table += `<tr>
    <td>${order.idOrder}</td>
    <td>${order.dateTime}</td>
    <td>${order.total}</td>
    <td>${order.chose}</td>
    <td>${order.address}</td>
  </tr>`);
    });
  }
  tableAppointment.innerHTML = ``;
  tableAppointment.innerHTML = table;
});

// Login / LogOut
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
}

rendercartContent();
