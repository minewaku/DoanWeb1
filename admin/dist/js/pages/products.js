let fruitList = JSON.parse(localStorage.getItem("fruitList"));
let foreinFruit = JSON.parse(localStorage.getItem("foreinFruit"));
let hotDealFruits = JSON.parse(localStorage.getItem("hotDealFruits"));

let rowVisibility = 6;

let allList = [fruitList, foreinFruit, hotDealFruits];

function renderFruitList() {
  let container = document.querySelector(
    "table.table-striped.table-valign-middle.fruit-list"
  );
  let headerTable = `<thead>
  <tr>
    <th>Product</th>
    <th>Price</th>
    <th>Sales</th>
    <th>More</th>
  </tr>
</thead>
`;

  let tableValue = fruitList.map((product, index) => {
    return `<tr>
    <td>
      <img
        src="${product.srcImg}"
        alt="${product.name}"
        class="img-circle img-size-32 mr-2"
      />
      ${product.name}
    </td>
    <td>${(() => {
      let formattedNumber = new Intl.NumberFormat().format(product.price);
      return formattedNumber;
    })()} VND</td>
    <td>
      <small class="text-success mr-1">
        <i class="fas fa-arrow-up"></i>
        ${(() => {
          let randomNumber = Math.floor(Math.random() * 30) + 1;
          return randomNumber;
        })()}%
      </small>
      ${(() => {
        let randomNumber =
          Math.floor(Math.random() * (12000 - 4000 + 1)) + 4000;
        return randomNumber;
      })()} Sold
    </td>
    <td>
      <a href="http://127.0.0.1:5500/views/web/productDetailFruitList.html?id=${parseInt(
        index + 1
      )}" class="text-muted">
        <i class="fas fa-search"></i>
      </a>
    </td>
  </tr>`;
  });
  let tableBody = `<tbody>
  ${tableValue.join("")}
  </tbody>`;
  //Inner HTML
  container.innerHTML = `${headerTable} ${tableBody}`;

  let tableRowList = document.querySelectorAll("tbody tr");
  for (let i = rowVisibility; i < tableRowList.length; i++) {
    tableRowList[i].style.display = "none";
  }
}

function renderForeignlist() {
  let container = document.querySelector(
    "table.table-striped.table-valign-middle.foreign-list"
  );
  let headerTable = `<thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Sales</th>
      <th>More</th>
    </tr>
  </thead>
  `;

  let tableValue = foreinFruit.map((product, index) => {
    return `<tr>
      <td>
        <img
          src="${product.srcImg}"
          alt="${product.name}"
          class="img-circle img-size-32 mr-2"
        />
        ${product.name}
      </td>
      <td>${(() => {
        let formattedNumber = new Intl.NumberFormat().format(product.price);
        return formattedNumber;
      })()} VND</td>
      <td>
        <small class="text-success mr-1">
          <i class="fas fa-arrow-up"></i>
          ${(() => {
            let randomNumber = Math.floor(Math.random() * 30) + 1;
            return randomNumber;
          })()}%
        </small>
        ${(() => {
          let randomNumber =
            Math.floor(Math.random() * (12000 - 4000 + 1)) + 4000;
          return randomNumber;
        })()} Sold
      </td>
      <td>
        <a href="http://127.0.0.1:5500/views/web/productDetailForeignList.html?id=${parseInt(
          index + 1
        )}" class="text-muted">
          <i class="fas fa-search"></i>
        </a>
      </td>
    </tr>`;
  });
  let tableBody = `<tbody>
    ${tableValue.join("")}
    </tbody>`;
  //Inner HTML
  container.innerHTML = `${headerTable} ${tableBody}`;
  let tableRowList = document.querySelectorAll("tbody tr");
  for (let i = 6; i < tableRowList.length; i++) {
    tableRowList[i].style.display = "none";
  }
}

function renderHotDeal() {
  let container = document.querySelector(
    "table.table-striped.table-valign-middle.hot-deal"
  );
  let headerTable = `<thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Sales</th>
        <th>More</th>
      </tr>
    </thead>
    `;

  let tableValue = hotDealFruits.map((product, index) => {
    return `<tr>
        <td>
          <img
            src="${product.srcImg}"
            alt="${product.name}"
            class="img-circle img-size-32 mr-2"
          />
          ${product.name}
        </td>
        <td>${(() => {
          let formattedNumber = new Intl.NumberFormat().format(product.price);
          return formattedNumber;
        })()} VND</td>
        <td>
          <small class="text-success mr-1">
            <i class="fas fa-arrow-up"></i>
            ${(() => {
              let randomNumber = Math.floor(Math.random() * 30) + 1;
              return randomNumber;
            })()}%
          </small>
          ${(() => {
            let randomNumber =
              Math.floor(Math.random() * (12000 - 4000 + 1)) + 4000;
            return randomNumber;
          })()} Sold
        </td>
        <td>
          <a href="http://127.0.0.1:5500/views/web/productDetailHotDeal.html?id=${parseInt(
            index + 1
          )}" class="text-muted">
            <i class="fas fa-search"></i>
          </a>
        </td>
      </tr>`;
  });
  let tableBody = `<tbody>
      ${tableValue.join("")}
      </tbody>`;
  //Inner HTML
  container.innerHTML = `${headerTable} ${tableBody}`;
  let tableRowList = document.querySelectorAll("tbody tr");
  for (let i = 6; i < tableRowList.length; i++) {
    tableRowList[i].style.display = "none";
  }
}

document.querySelectorAll(".btn-viewmore").forEach((button) => {
  button.addEventListener("click", () => {
    let listType = button.getAttribute("data-list");
    let tableRowList = document.querySelectorAll(`.${listType} tbody tr`);

    for (let i = rowVisibility; i < tableRowList.length; i++) {
      if (tableRowList[i].style.display === "none") {
        tableRowList[i].style.display = "table-row";
      } else {
        tableRowList[i].style.display = "none";
      }
    }
  });
});

function removeVietnameseDiacritics(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function containsKeyword(productName, keyword) {
  const normalizedProductName = removeVietnameseDiacritics(productName);
  const normalizedKeyword = removeVietnameseDiacritics(keyword);

  return normalizedProductName.includes(normalizedKeyword);
}

function editProduct() {
  let btnEditProduct = document.querySelectorAll(".btn.btn-secondary");
  btnEditProduct.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      let modal = document.querySelector(".modal-edit-product");
      modal.style.display = "block";
      modal.addEventListener("click", (e) => {
        // e.preventDefault();
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
      let submitBtn = document.querySelector(
        ".modal-edit-product .btn.btn-secondary"
      );
      submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let nameSearch = document.querySelector(
          ".modal-edit-product #product-name"
        ).value;

        if (nameSearch == "") {
          alert("Chua co ten san pham");
        } else {
          const normalizedKeyword = removeVietnameseDiacritics(nameSearch);

          let tmpList = [];
          console.log(allList[index]);
          allList[index].forEach((product) => {
            let normalizedProductName = removeVietnameseDiacritics(
              product.name
            );

            if (normalizedProductName.includes(normalizedKeyword)) {
              tmpList.push(product);
            }
          });

          if (tmpList.length > 0) {
            document.querySelector(
              ".modal-edit-product .result-search"
            ).innerHTML = `<table
            class="table table-striped table-valign-middle foreign-list"
          >
          <thead>
            <tr>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
          ${(() => {
            let htmls = tmpList.map((product) => {
              return `
              <tr data-position=${product.id}>
              <td>
                <img src="${product.srcImg}" alt="Thanh long ruột đỏ" class="img-circle img-size-32 mr-2">
                ${product.name}
              </td>
              </tr>`;
            });
            return htmls.join(" ");
          })()}
          </tbody>
          </table>`;
          } else {
            document.querySelector(
              ".modal-edit-product .result-search"
            ).innerHTML = "";
            document.querySelector(
              ".modal-edit-product .result-search"
            ).innerHTML = "Không có sản phẩm với tên này";
          }
          document
            .querySelectorAll(".result-search tbody tr")
            .forEach((item) => {
              item.addEventListener("click", () => {
                let position = parseInt(item.getAttribute("data-position"));
                document.querySelector(".modal-child-edit").style.display =
                  "block";

                document
                  .querySelector(".modal-child-edit .btn.btn-secondary")
                  .addEventListener("click", function () {
                    let indexInArray = 1;
                    allList[index].forEach((product, indexFor) => {
                      if (product.id == position) {
                        indexInArray = indexFor;
                      }
                    });
                    let inputName = document.querySelector(
                      ".modal-child-edit #product-name"
                    ).value;
                    let inputPrice = document.querySelector(
                      ".modal-child-edit #product-price"
                    ).value;
                    let inputDesc = document.querySelector(
                      ".modal-child-edit #product-desc"
                    ).value;
                    allList[index][indexInArray].name = inputName;
                    allList[index][indexInArray].price = inputPrice;
                    allList[index][indexInArray].desc.dacDiem = [inputDesc];
                    if (index == 0) {
                      localStorage.setItem(
                        "fruitList",
                        JSON.stringify(allList[index])
                      );
                    } else if (index == 1) {
                      localStorage.setItem(
                        "foreinFruit",
                        JSON.stringify(allList[index])
                      );
                    } else {
                      localStorage.setItem(
                        "hotDealFruits",
                        JSON.stringify(allList[index])
                      );
                    }
                    alert("Chỉnh sửa sản phẩm thành công");
                    document.querySelector(".modal-child-edit").style.display =
                      "none";
                    modal.style.display = "none";
                  });
              });
            });
        }
      });
    });
  });
}

function deleteProduct() {
  let btnDltProduct = document.querySelectorAll(".btn.btn-danger");
  btnDltProduct.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      let modal = document.querySelector(".modal-delete-product");
      modal.style.display = "block";
      modal.addEventListener("click", (e) => {
        // e.preventDefault();
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });

      let submitBtn = document.querySelector(
        ".modal-delete-product .btn.btn-primary"
      );
      submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let nameSearch = document.querySelector(
          ".modal-delete-product #product-name"
        ).value;

        if (nameSearch == "") {
          alert("Chua co ten san pham");
        } else {
          const normalizedKeyword = removeVietnameseDiacritics(nameSearch);

          let tmpList = [];
          allList[index].forEach((product) => {
            let normalizedProductName = removeVietnameseDiacritics(
              product.name
            );

            if (normalizedProductName.includes(normalizedKeyword)) {
              tmpList.push(product);
            }
          });

          if (tmpList.length > 0) {
            document.querySelector(
              ".modal-delete-product .result-search"
            ).innerHTML = `<table
            class="table table-striped table-valign-middle foreign-list"
          >
          <thead>
            <tr>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
          ${(() => {
            let htmls = tmpList.map((product) => {
              return `
              <tr data-position=${product.id}>
              <td>
                <img src="${product.srcImg}" alt="Thanh long ruột đỏ" class="img-circle img-size-32 mr-2">
                ${product.name}
              </td>
              </tr>`;
            });
            return htmls.join(" ");
          })()}
          </tbody>
          </table>`;
          } else {
            document.querySelector(
              ".modal-delete-product .result-search"
            ).innerHTML = "";
            document.querySelector(
              ".modal-delete-product .result-search"
            ).innerHTML = "Không có sản phẩm với tên này";
          }
          document
            .querySelectorAll(".result-search tbody tr")
            .forEach((item) => {
              item.addEventListener("click", () => {
                let position = parseInt(item.getAttribute("data-position"));
                document.querySelector(".modal-child-delete").style.display =
                  "block";
                document
                  .querySelector(".close")
                  .addEventListener("click", function () {
                    document.querySelector(
                      ".modal-child-delete"
                    ).style.display = "none";
                  });
                // Close
                document
                  .querySelector(".modal-child-delete .btn.btn-secondary")
                  .addEventListener("click", function () {
                    document.querySelector(
                      ".modal-child-delete"
                    ).style.display = "none";
                  });
                // Delete
                document
                  .querySelector(".modal-child-delete .btn.btn-danger")
                  .addEventListener("click", function () {
                    let indexInArray = 1;
                    allList[index].forEach((product, indexFor) => {
                      if (product.id == position) {
                        indexInArray = indexFor;
                      }
                    });
                    allList[index].splice(indexInArray, 1);
                    if (index == 0) {
                      localStorage.setItem(
                        "fruitList",
                        JSON.stringify(allList[index])
                      );
                    } else if (index == 1) {
                      localStorage.setItem(
                        "foreinFruit",
                        JSON.stringify(allList[index])
                      );
                    } else {
                      localStorage.setItem(
                        "hotDealFruits",
                        JSON.stringify(allList[index])
                      );
                    }
                    alert("Xóa sản phẩm thành công");
                    document.querySelector(
                      ".modal-child-delete"
                    ).style.display = "none";
                    modal.style.display = "none";
                  });
              });
            });
        }
      });
    });
  });
}

function addProduct() {
  let btnAddProduct = document.querySelectorAll(".btn.btn-success");
  btnAddProduct.forEach(function (btn, index) {
    btn.addEventListener("click", () => {
      let modal = document.querySelector(".modal-add-product");
      modal.style.display = "block";
      // name
      let inputName = document.querySelector(
        ".modal-add-product #product-name"
      ).value;
      // Quy cach
      let inputQuyCach = document.querySelector(
        ".modal-add-product input[type=radio]"
      ).value;
      // price
      let inputPrice = document.querySelector(
        ".modal-add-product #product-price"
      ).value;
      //quantity
      let inputQuantity = document.querySelector("#product-quantity").value;
      //Description
      let inputDesc = document.querySelector("#product-desc").value;
      let fileUrl = "";
      console.log(1);
      // File img
      let inputFile = document.querySelector("#customFile");
      inputFile.addEventListener("change", (event) => {
        document.querySelector(".custom-file-label").innerHTML =
          event.target.files[0].name;
        fileUrl = window.URL.createObjectURL(event.target.files[0]);
      });

      let btnSubmit = document.querySelector(
        ".modal-add-product button.btn.btn-primary"
      );

      btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        let newProduct = {
          id: 27,
          name: inputName,
          srcImg: fileUrl,
          price: parseInt(inputPrice),
          isSlide: false,
          desc: {
            thuongHieu: "Việt Nam",
            tinhTrang: "Còn hàng",
            quyCach: [`1 ${inputQuyCach}`],
            soluong: [1, 2],
            xuatXu: "Việt Nam",
            dacDiem: [inputDesc],
          },
        };
        console.log(newProduct);
        allList[index].push(newProduct);
        if (index == 0) {
          localStorage.setItem("fruitList", JSON.stringify(allList[index]));
        } else if (index == 1) {
          localStorage.setItem("foreinFruit", JSON.stringify(allList[index]));
        } else {
          localStorage.setItem("hotDealFruits", JSON.stringify(allList[index]));
        }
        alert("Thêm sản phẩm thành công");
      });

      modal.addEventListener("click", (e) => {
        // e.preventDefault();
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFruitList();
  renderForeignlist();
  renderHotDeal();
  addProduct();
  deleteProduct();
  editProduct();
});
