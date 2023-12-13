const putOut = document.querySelector(".form-login .login .btn");

let booleanEmailLogin = false;
let booleanPasswordLogin = false;
let acceptLogin = true;
let Orders = JSON.parse(localStorage.getItem("Orders"));

let Users = JSON.parse(localStorage.getItem("UsersInfo")) || [];
let indexLoged = JSON.parse(localStorage.getItem("loggedInAccountIndex"));
if (!Orders) {
  let orders = Users.map((user) => {
    return {
      nameUser: user.firstNameUser,
      idUser: user.phoneUser,
      orderUser: [],
    };
  });
  localStorage.setItem("Orders", JSON.stringify(orders));
}

function createOrderForNewUser() {
  let Orders = JSON.parse(localStorage.getItem("Orders")) || [];
  let indexLoged = JSON.parse(localStorage.getItem("loggedInAccountIndex"));
  let Users = JSON.parse(localStorage.getItem("UsersInfo")) || [];

  if (indexLoged >= Orders.length) {
    let order = {
      nameUser: Users[indexLoged].firstNameUser,
      idUser: Users[indexLoged].phoneUser,
      orderUser: [],
    };
    Orders.push(order);
  }

  localStorage.setItem("Orders", JSON.stringify(Orders));
}

putOut.addEventListener("click", (e) => {
  e.preventDefault();
  const emailLogin = document.querySelector("#email");
  const passwordLogin = document.querySelector("#password");
  checkLo(emailLogin, passwordLogin);
  if (booleanEmailLogin && booleanPasswordLogin && acceptLogin) {
    document.location.href = "http://127.0.0.1:5500";
    createOrderForNewUser();
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
