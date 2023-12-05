const email = document.querySelector("#email");
const retrieval = document.querySelector(".button-change button");
retrieval.addEventListener("click", (e) => {
  e.preventDefault();
  checkEmail(email);
  if (booleanEmail && password != "") {
    alert(`Mật khẩu của bạn được hỗ trợ lấy lại là ${password}`);
    document.querySelector(".error").innerHTML =
      "<i class='bx bx-check-circle'></i> Lấy lại thành công";
    document.querySelector(".error").style.color="green";
    document.querySelector(".error").style.fontSize="14px";
    booleanEmail=false;
  } else {
    document.querySelector(".error").innerHTML =
      "<i class='bx bx-error-circle'></i> Email vẫn chưa được đăng ký";
    document.querySelector(".error").style.color="red";
    document.querySelector(".error").style.fontSize="14px";
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

const back = document.querySelector(".button-back button");
back.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/views/web/login.html";
});
