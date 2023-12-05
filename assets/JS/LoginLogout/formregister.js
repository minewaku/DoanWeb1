let Users = JSON.parse(localStorage.getItem("UsersInfo"));
console.log(Users);
if (Users === null) {
  Users = [
    {
      firstNameUser: "Admin",
      lastNameUser: "Admin",
      phoneUser: "09123456789",
      emailUser: "admin@gmail.com",
      passwordUser: "123456789",
      confirmUser: "123456789",
    },
  ];
  localStorage.setItem("UsersInfo", JSON.stringify(Users));
}
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const phone = document.querySelector("#phone");
const confirm = document.querySelector("#confirm");
const save = document.querySelector(".submit .btn");
save.addEventListener("click", (e) => {
  e.preventDefault();
  checkRe();
  if (
    booleanFirstName &&
    booleanLastName &&
    booleanPhone &&
    booleanConfirm &&
    booleanPassword &&
    booleanEmail
  ) {
    Users.push({
      firstNameUser: firstName.value,
      lastNameUser: lastName.value,
      phoneUser: phone.value,
      emailUser: email.value,
      passwordUser: password.value,
      confirmUser: confirm.value,
    });
    localStorage.setItem("UsersInfo", JSON.stringify(Users));
    alert("ĐĂNG KÝ THÀNH CÔNG");
    window.location.href = "http://127.0.0.1:5500/views/web/login.html";
  }
});
let booleanFirstName = false;
let booleanLastName = false;
let booleanPhone = false;
let booleanEmail = false;
let booleanPassword = false;
let booleanConfirm = false;
let checkFirstname = () => {
  if (firstName.value === "") {
    firstName.style.border = "1px solid red";
    document.querySelector(".firstname-error").style.color = "red";
    document.querySelector(".firstname-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mời nhập, không được để trống";
    document.querySelector(".check-firstname").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-firstname").style.color = "red";
    booleanFirstName = false;
  } else if (!firstName.value.match(/^[a-zA-Z]{3,}$/g)) {
    firstName.style.border = "1px solid red";
    document.querySelector(".firstname-error").style.color = "red";
    document.querySelector(".firstname-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Thông tin này, phải nhập chính xác";
    document.querySelector(".check-firstname").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-firstname").style.color = "red";
    booleanFirstName = false;
  } else {
    firstName.style.border = "1px solid green";
    document.querySelector(".check-firstname").innerHTML =
      "<i class='bx bx-check-circle' ></i>";
    document.querySelector(".check-firstname").style.color = "green";
    document.querySelector(".firstname-error").innerHTML =
      "<i class='bx bx-like' ></i> Hợp lý";
    document.querySelector(".firstname-error").style.color = "green";
    booleanFirstName = true;
  }
};

let checkLastname = () => {
  if (lastName.value === "") {
    lastName.style.border = "1px solid red";
    document.querySelector(".lastname-error").style.color = "red";
    document.querySelector(".lastname-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mời nhập, không được để trống";
    document.querySelector(".check-lastname").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-lastname").style.color = "red";
    booleanLastName = false;
  } else if (!lastName.value.match(/^[a-zA-Z]{3,}$/g)) {
    lastName.style.border = "1px solid red";
    document.querySelector(".lastname-error").style.color = "red";
    document.querySelector(".lastname-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Thông tin này, phải nhập chính xác";
    document.querySelector(".check-lastname").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-lastname").style.color = "red";
    booleanLastName = false;
  } else {
    lastName.style.border = "1px solid green";
    document.querySelector(".check-lastname").innerHTML =
      "<i class='bx bx-check-circle' ></i>";
    document.querySelector(".check-lastname").style.color = "green";
    document.querySelector(".lastname-error").innerHTML =
      "<i class='bx bx-like' ></i> Hợp lý";
    document.querySelector(".lastname-error").style.color = "green";
    booleanLastName = true;
  }
};

let checkPhone = () => {
  if (phone.value === "") {
    phone.style.border = "1px solid red";
    document.querySelector(".phone-error").style.color = "red";
    document.querySelector(".phone-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mời nhập, không được để trống";
    document.querySelector(".check-phone").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-phone").style.color = "red";
    booleanPhone = false;
  } else if (!phone.value.match(/^0[0-9]{8,10}$/g)) {
    phone.style.border = "1px solid red";
    document.querySelector(".phone-error").style.color = "red";
    document.querySelector(".phone-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Số điện thoại không xác định";
    document.querySelector(".check-phone").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-phone").style.color = "red";
    booleanPhone = false;
  } else {
    phone.style.border = "1px solid green";
    document.querySelector(".check-phone").innerHTML =
      "<i class='bx bx-check-circle' ></i>";
    document.querySelector(".check-phone").style.color = "green";
    document.querySelector(".phone-error").innerHTML =
      "<i class='bx bx-like' ></i> Hợp lý";
    document.querySelector(".phone-error").style.color = "green";
    booleanPhone = true;
  }
};

let checkEmail = () => {
  if (email.value === "") {
    email.style.border = "1px solid red";
    document.querySelector(".email-error").style.color = "red";
    document.querySelector(".email-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mời nhập, không được để trống";
    document.querySelector(".check-email").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-email").style.color = "red";
    booleanEmail = false;
  } else if (!email.value.match(/^[A-Za-z0-9._]+@gmail.com$/g)) {
    email.style.border = "1px solid red";
    document.querySelector(".email-error").style.color = "red";
    document.querySelector(".email-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Email không chính xác";
    document.querySelector(".check-email").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-email").style.color = "red";
    booleanEmail = false;
  } else {
    email.style.border = "1px solid green";
    document.querySelector(".check-email").innerHTML =
      "<i class='bx bx-check-circle' ></i>";
    document.querySelector(".check-email").style.color = "green";
    document.querySelector(".email-error").innerHTML =
      "<i class='bx bx-like' ></i> Hợp lý";
    document.querySelector(".email-error").style.color = "green";
    booleanEmail = true;
  }
};

let checkPassword = () => {
  if (password.value === "") {
    password.style.border = "1px solid red";
    document.querySelector(".password-error").style.color = "red";
    document.querySelector(".password-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mời nhập, không được để trống";
    document.querySelector(".check-password").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-password").style.color = "red";
    booleanPassword = false;
  } else if (!password.value.match(/^[A-Za-z0-9.!@#$%^&*_]{8,16}$/g)) {
    password.style.border = "1px solid red";
    document.querySelector(".password-error").style.color = "red";
    document.querySelector(".password-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Tối thiểu 8 kí tự, tối đa 16 kí tự";
    document.querySelector(".check-password").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-password").style.color = "red";
    booleanPassword = false;
  } else {
    password.style.border = "1px solid green";
    document.querySelector(".check-password").innerHTML =
      "<i class='bx bx-check-circle' ></i>";
    document.querySelector(".check-password").style.color = "green";
    document.querySelector(".password-error").innerHTML =
      "<i class='bx bx-like' ></i> Hợp lý";
    document.querySelector(".password-error").style.color = "green";
    booleanPassword = true;
  }
};

let checkConfirm = () => {
  if (confirm.value === "") {
    confirm.style.border = "1px solid red";
    document.querySelector(".confirm-error").style.color = "red";
    document.querySelector(".confirm-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mời nhập, không được để trống";
    document.querySelector(".check-confirm").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-confirm").style.color = "red";
    booleanConfirm = false;
  } else if (confirm.value !== password.value) {
    confirm.style.border = "1px solid red";
    document.querySelector(".confirm-error").style.color = "red";
    document.querySelector(".confirm-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mật khẩu xác nhận không trùng khớp";
    document.querySelector(".check-confirm").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-confirm").style.color = "red";
    booleanConfirm = false;
  } else if (booleanPassword == false) {
    confirm.style.border = "1px solid red";
    document.querySelector(".confirm-error").style.color = "red";
    document.querySelector(".confirm-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Điều kiện của mật khẩu chưa được thỏa mãn";
    document.querySelector(".check-confirm").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-confirm").style.color = "red";
    booleanConfirm == false;
  } else {
    confirm.style.border = "1px solid green";
    document.querySelector(".check-confirm").innerHTML =
      "<i class='bx bx-check-circle' ></i>";
    document.querySelector(".check-confirm").style.color = "green";
    document.querySelector(".confirm-error").innerHTML =
      "<i class='bx bx-like' ></i> Hợp lý";
    document.querySelector(".confirm-error").style.color = "green";
    booleanConfirm = true;
  }
};

let checkRe = () => {
  if (firstName.value === "") {
    firstName.style.border = "1px solid red";
    document.querySelector(".firstname-error").style.color = "red";
    document.querySelector(".firstname-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mời nhập, không được để trống";
    document.querySelector(".check-firstname").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-firstname").style.color = "red";
    booleanFirstName = false;
  } else if (!firstName.value.match(/^[a-zA-Z]{3,}$/g)) {
    firstName.style.border = "1px solid red";
    document.querySelector(".firstname-error").style.color = "red";
    document.querySelector(".firstname-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Thông tin này, phải nhập chính xác";
    document.querySelector(".check-firstname").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-firstname").style.color = "red";
    booleanFirstName = false;
  } else {
    firstName.style.border = "1px solid green";
    document.querySelector(".check-firstname").innerHTML =
      "<i class='bx bx-check-circle' ></i>";
    document.querySelector(".check-firstname").style.color = "green";
    document.querySelector(".firstname-error").innerHTML =
      "<i class='bx bx-like' ></i> Hợp lý";
    document.querySelector(".firstname-error").style.color = "green";
    booleanFirstName = true;
  }

  if (lastName.value === "") {
    lastName.style.border = "1px solid red";
    document.querySelector(".lastname-error").style.color = "red";
    document.querySelector(".lastname-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mời nhập, không được để trống";
    document.querySelector(".check-lastname").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-lastname").style.color = "red";
    booleanLastName = false;
  } else if (!lastName.value.match(/^[a-zA-Z]{3,}$/g)) {
    lastName.style.border = "1px solid red";
    document.querySelector(".lastname-error").style.color = "red";
    document.querySelector(".lastname-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Thông tin này, phải nhập chính xác";
    document.querySelector(".check-lastname").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-lastname").style.color = "red";
    booleanLastName = false;
  } else {
    lastName.style.border = "1px solid green";
    document.querySelector(".check-lastname").innerHTML =
      "<i class='bx bx-check-circle' ></i>";
    document.querySelector(".check-lastname").style.color = "green";
    document.querySelector(".lastname-error").innerHTML =
      "<i class='bx bx-like' ></i> Hợp lý";
    document.querySelector(".lastname-error").style.color = "green";
    booleanLastName = true;
  }

  if (phone.value === "") {
    phone.style.border = "1px solid red";
    document.querySelector(".phone-error").style.color = "red";
    document.querySelector(".phone-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mời nhập, không được để trống";
    document.querySelector(".check-phone").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-phone").style.color = "red";
    booleanPhone = false;
  } else if (!phone.value.match(/^0[0-9]{8,10}$/g)) {
    phone.style.border = "1px solid red";
    document.querySelector(".phone-error").style.color = "red";
    document.querySelector(".phone-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Số điện thoại không xác định";
    document.querySelector(".check-phone").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-phone").style.color = "red";
    booleanPhone = false;
  } else {
    phone.style.border = "1px solid green";
    document.querySelector(".check-phone").innerHTML =
      "<i class='bx bx-check-circle' ></i>";
    document.querySelector(".check-phone").style.color = "green";
    document.querySelector(".phone-error").innerHTML =
      "<i class='bx bx-like' ></i> Hợp lý";
    document.querySelector(".phone-error").style.color = "green";
    booleanPhone = true;
  }

  if (email.value === "") {
    email.style.border = "1px solid red";
    document.querySelector(".email-error").style.color = "red";
    document.querySelector(".email-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mời nhập, không được để trống";
    document.querySelector(".check-email").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-email").style.color = "red";
    booleanEmail = false;
  } else if (!email.value.match(/^[A-Za-z0-9._]+@gmail.com$/g)) {
    email.style.border = "1px solid red";
    document.querySelector(".email-error").style.color = "red";
    document.querySelector(".email-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Email không chính xác";
    document.querySelector(".check-email").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-email").style.color = "red";
    booleanEmail = false;
  } else {
    email.style.border = "1px solid green";
    document.querySelector(".check-email").innerHTML =
      "<i class='bx bx-check-circle' ></i>";
    document.querySelector(".check-email").style.color = "green";
    document.querySelector(".email-error").innerHTML =
      "<i class='bx bx-like' ></i> Hợp lý";
    document.querySelector(".email-error").style.color = "green";
    booleanEmail = true;
  }

  if (password.value === "") {
    password.style.border = "1px solid red";
    document.querySelector(".password-error").style.color = "red";
    document.querySelector(".password-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mời nhập, không được để trống";
    document.querySelector(".check-password").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-password").style.color = "red";
    booleanPassword = false;
  } else if (!password.value.match(/^[A-Za-z0-9.!@#$%^&*_]{8,16}$/g)) {
    password.style.border = "1px solid red";
    document.querySelector(".password-error").style.color = "red";
    document.querySelector(".password-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Tối thiểu 8 kí tự, tối đa 16 kí tự";
    document.querySelector(".check-password").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-password").style.color = "red";
    booleanPassword = false;
  } else {
    password.style.border = "1px solid green";
    document.querySelector(".check-password").innerHTML =
      "<i class='bx bx-check-circle' ></i>";
    document.querySelector(".check-password").style.color = "green";
    document.querySelector(".password-error").innerHTML =
      "<i class='bx bx-like' ></i> Hợp lý";
    document.querySelector(".password-error").style.color = "green";
    booleanPassword = true;
  }
  if (confirm.value === "") {
    confirm.style.border = "1px solid red";
    document.querySelector(".confirm-error").style.color = "red";
    document.querySelector(".confirm-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mời nhập, không được để trống";
    document.querySelector(".check-confirm").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-confirm").style.color = "red";
    booleanConfirm = false;
  } else if (confirm.value !== password.value) {
    confirm.style.border = "1px solid red";
    document.querySelector(".confirm-error").style.color = "red";
    document.querySelector(".confirm-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Mật khẩu xác nhận không trùng khớp";
    document.querySelector(".check-confirm").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-confirm").style.color = "red";
    booleanConfirm = false;
  } else if (booleanPassword == false) {
    confirm.style.border = "1px solid red";
    document.querySelector(".confirm-error").style.color = "red";
    document.querySelector(".confirm-error").innerHTML =
      "<i class='bx bx-error-circle'></i> Điều kiện của mật khẩu chưa được thỏa mãn";
    document.querySelector(".check-confirm").innerHTML =
      "<i class='bx bx-error-circle'></i>";
    document.querySelector(".check-confirm").style.color = "red";
    booleanConfirm == false;
  } else {
    confirm.style.border = "1px solid green";
    document.querySelector(".check-confirm").innerHTML =
      "<i class='bx bx-check-circle' ></i>";
    document.querySelector(".check-confirm").style.color = "green";
    document.querySelector(".confirm-error").innerHTML =
      "<i class='bx bx-like' ></i> Hợp lý";
    document.querySelector(".confirm-error").style.color = "green";
    booleanConfirm = true;
  }
};
