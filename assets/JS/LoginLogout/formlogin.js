const putOut = document.querySelector(".form-login .login .btn");

let booleanEmailLogin = false;
let booleanPasswordLogin = false;
let acceptLogin = true;

putOut.addEventListener("click", (e) => {
  e.preventDefault();
  const emailLogin = document.querySelector("#email");
  const passwordLogin = document.querySelector("#password");
  checkLo(emailLogin, passwordLogin);
  if (booleanEmailLogin && booleanPasswordLogin && acceptLogin) {
    // document.location.href = "http://127.0.0.1:5500";
    alert("chuyen");
    localStorage.setItem("isLogin", "true");
  } else if (acceptLogin == false) {
    alert("Tài khoản của bạn không thể đăng nhập");
  } else {
    localStorage.removeItem("isLogin");
    document.querySelector(".notification").innerHTML =
      "<i class='bx bx-error-circle'></i> Email hoặc mật khẩu không chính xác";
    document.querySelector(".notification").style.color = "red";
    document.querySelector(".notification").style.fontSize = "12px";
  }
});

function checkLo(emailLogin, passwordLogin) {
  for (
    let i = 0;
    i < JSON.parse(localStorage.getItem("UsersInfo")).length;
    i++
  ) {
    if (
      JSON.parse(localStorage.getItem("UsersInfo"))[i].emailUser ===
      emailLogin.value
    ) {
      booleanEmailLogin = true;
    } else {
      booleanEmailLogin = false;
    }
    if (
      JSON.parse(localStorage.getItem("UsersInfo"))[i].passwordUser ===
      passwordLogin.value
    ) {
      booleanPasswordLogin = true;
    } else {
      booleanPasswordLogin = false;
    }
    if (JSON.parse(localStorage.getItem("UsersInfo"))[i].acceptLogin === true) {
      acceptLogin = true;
    } else {
      acceptLogin = false;
      console.log(1);
    }
    if (
      booleanEmailLogin == true &&
      booleanPasswordLogin == true &&
      acceptLogin == true
    ) {
      localStorage.setItem("loggedInAccountIndex", i);
      alert("Login");
      break;
    }
  }
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
