let index = parseInt(localStorage.getItem("loggedInAccountIndex"));
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
