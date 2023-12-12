import generateID from "./generateID.js";
let productsInCart = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];
let Orders = JSON.parse(localStorage.getItem("Orders"));

let Users = JSON.parse(localStorage.getItem("UsersInfo")) || [];
let indexLoged = JSON.parse(localStorage.getItem("loggedInAccountIndex"));
console.log(Orders[indexLoged].orderUser);
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

export function createOrderForNewUser() {
  let Orders = JSON.parse(localStorage.getItem("Orders"));
  let indexLoged = JSON.parse(localStorage.getItem("loggedInAccountIndex"));
  let Users = JSON.parse(localStorage.getItem("UsersInfo")) || [];

  let order = {
    nameUser: Users[indexLoged].firstNameUser,
    idUser: Users[indexLoged].phoneUser,
    orderUser: [],
  };
  Orders.push(order);
  localStorage.setItem("Orders", JSON.stringify(Orders));
}

function createOrder() {
  let btnSubmit = document.querySelector(".submitOrder");
  btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    let name = document.querySelector("#name").value;
    if (name == "") {
      alert("Vui long nhap ten nguoi nhan hang");
      return;
    }
    let phoneNumber = document.querySelector("#tel").value;
    if (phoneNumber == "") {
      alert("Vui long nhap so dien thaoi nguoi nhan");
      return;
    }
    let addressDetails = document.querySelector("#address").value;
    if (addressDetails == "") {
      alert("Vui long nhap dia chi nhan hang");
      return;
    }

    let ward =
      document.querySelector("#ward").options[
        document.querySelector("#ward").selectedIndex
      ].text;

    let district =
      document.querySelector("#district").options[
        document.querySelector("#district").selectedIndex
      ].text;

    let city =
      document.querySelector("#city").options[
        document.querySelector("#city").selectedIndex
      ].text;
    let chose = document.querySelector("input[type=radio]:checked");
    if (chose) {
      chose = chose.value;
    } else {
      alert("Chon phuong thuc gioa hang de tiep tuc");
    }

    let dateTime = new Date().toLocaleString();
    let idOrder = generateID(4);
    var total = 0;
    productsInCart.forEach((item) => {
      total += item.soluong * item.price;
    });
    var resultFomatted = new Intl.NumberFormat().format(total + 100000);

    let order = {
      idOrder,
      dateTime,
      total: resultFomatted,
      chose,
      address: `${addressDetails}, ${ward}, ${district}, ${city}`,
      name,
      phoneNumber,
    };
    Orders[indexLoged].orderUser.push(order);
    localStorage.setItem("Orders", JSON.stringify(Orders));
  });
}

export default createOrder;
