let users = JSON.parse(localStorage.getItem("UsersInfo")) || [];

function renderUser() {
  let tableValue = document.querySelector(
    ".table.table-striped.table-valign-middle.users tbody"
  );

  let values = users.map((user) => {
    return `
    <tr>
    <td>${user.phoneUser}</td>
    <td>${user.firstNameUser}</td>
    <td>${user.lastNameUser}</td>
    <td>${user.phoneUser}</td>
    <td>${user.emailUser}</td>
    <td>${user.passwordUser}</td>
    <td class="btn btn-danger" style="width: 100px;
    height: 50px;
    margin-left: 20px">${user.acceptLogin ? "Chặn" : "Bỏ chặn"}</td>
  </tr>
    `;
  });
  tableValue.innerHTML = ``;
  tableValue.innerHTML = values.join("\n");
  let btnBanUser = document.querySelectorAll(".btn.btn-danger");
  btnBanUser.forEach((user, index) => {
    user.addEventListener("click", () => {
      if (users[index].acceptLogin) {
        users[index].acceptLogin = false;
        localStorage.setItem("UsersInfo", JSON.stringify(users));
        alert("Đã chặn người dùng này");
      } else {
        users[index].acceptLogin = true;
        localStorage.setItem("UsersInfo", JSON.stringify(users));
        alert("Đã gỡ chặn người dùng này");
      }
    });
  });
}

renderUser();
