let orders = JSON.parse(localStorage.getItem("Orders")) || [];
function renderOrder() {
  let bodydata = document.querySelector(
    ".table.table-striped.table-valign-middle tbody"
  );
  let data = "";
  if (orders.length > 1) {
    for (var i = 1; i < orders.length; i++) {
      data = orders[i].orderUser.map((order) => {
        return `
        <tr>
        <td>${order.idOrder}</td>
        <td>${order.phoneNumber}</td>
        <td>${order.dateTime}</td>
        <td>${order.chose}</td>
        <td>${order.total}</td>
        <td>${order.address}</td>
      </tr>
        `;
      });
    }
  }
  if (data == "") {
    bodydata.innerHTML = "Chưa có đơn hàng nào";
  } else {
    bodydata.innerHTML += data.join("");
  }
}
renderOrder();
