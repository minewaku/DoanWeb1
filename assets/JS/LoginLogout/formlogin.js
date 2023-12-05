const putOut = document.querySelector(".form-login .login .btn");

let booleanEmailLogin = false;
let booleanPasswordLogin = false;

putOut.addEventListener("click", (e) => {
  e.preventDefault();
  const emailLogin = document.querySelector("#email");
  const passwordLogin = document.querySelector("#password");
  checkLo(emailLogin, passwordLogin);
  if (booleanEmailLogin && booleanPasswordLogin) {
    document.location.href = "http://127.0.0.1:5500";
  } else {
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
    if (booleanEmailLogin == true && booleanPasswordLogin == true) {
      break;
    }
  }
}