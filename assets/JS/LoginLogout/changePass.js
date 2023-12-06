const email = document.querySelector("#email");
const retrieval = document.querySelector(".button-change button");
retrieval.addEventListener("click", (e) => {
  e.preventDefault();
  checkEmail(email);
  if (booleanEmail && password != "") {
    alert(`Mật khẩu của bạn được hỗ trợ lấy lại là ${password}`);
    document.querySelector(".error").innerHTML =
      "<i class='bx bx-check-circle'></i> Lấy lại thành công";
    document.querySelector(".error").style.color = "green";
    document.querySelector(".error").style.fontSize = "14px";
    booleanEmail = false;
  } else {
    document.querySelector(".error").innerHTML =
      "<i class='bx bx-error-circle'></i> Email vẫn chưa được đăng ký";
    document.querySelector(".error").style.color = "red";
    document.querySelector(".error").style.fontSize = "14px";
  }
});

let password = "";
let booleanEmail = false;
let checkEmail = (email) => {
  let Users = JSON.parse(localStorage.getItem("UsersInfo"));
  if (Users === null) {
    booleanEmail = false;
    return;
  }
  for (let i = 0; i < Users.length; i++) {
    if (Users[i].emailUser === email.value) {
      booleanEmail = true;
      password = Users[i].passwordUser;
      break;
    }
  }
};

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

const back = document.querySelector(".button-back button");
back.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/views/web/login.html";
});
