const productFruit = document.querySelector(".product-container");
const checkboxes = document.querySelectorAll(".checkbox");
const seclectedFillter = document.querySelectorAll(".selected-fillter-item");
const closeFillters = document.querySelectorAll(".selected-fillter-item__icon");
const pagination = document.querySelector(".page-list");
let currentPage = 1;

const fruitList = [
  {
    name: "Thanh long ruột đỏ",
    srcImg: "../../assets/img/product/thanhLongRuotDo.webp",
    price: 57000,
    isSlide: false,
    desc: [],
  },
  {
    name: "Táo Ambrosia New Zealand size 100 - 120",
    srcImg: "../../assets/img/product/tao_ambrosia_new_zealand.jpg",
    price: 119000,
    isSlide: false,
    desc: [],
  },
  {
    name: "Sầu riêng cơm Ri6",
    srcImg: "../../assets/img/product/sau-rieng-com-ri6.jpg",
    price: 119000,
    isSlide: false,
    desc: [],
  },
  {
    name: "Táo Rockit New Zealand (Ống 4 trái)",
    srcImg: "../../assets/img/product/tao_rockit_new_zealand.webp",
    price: 119000,
    isSlide: true,
    desc: [],
  },
  {
    name: "Dưa hấu đỏ không hạt",
    srcImg: "../../assets/img/product/dua_hau_khong_hat.png",
    price: 156000,
    isSlide: false,
    desc: [],
  },
  {
    name: "Cam sành",
    srcImg: "../../assets/img/product/cam_sanh.jpg",
    price: 25000,
    isSlide: true,
    desc: [],
  },
  {
    name: "Nho mẫu đơn Premium Hàn Quốc (600 - 700G/Hộp)",
    srcImg: "../../assets/img/product/nho_mau_don_premium_han_quoc.webp",
    price: 349000,
    isSlide: true,
    desc: [],
  },
  {
    name: "Dưa lưới giống Nhật Ichiba Nông Phát farm",
    srcImg: "../../assets/img/product/dua_luoi_nhat.jpg",
    price: 280000,
    isSlide: false,
    desc: [],
  },
  {
    name: "Chuối Laba King (0,9 - 1,1Kg/Nhánh)",
    srcImg: "../../assets/img/product/chuoi_laba_king.jpg",
    price: 75900,
    isSlide: false,
    desc: [],
  },
  {
    name: "Dứa MD2 Gia Lai (1.2Kg - 1.4Kg/Trái)m",
    srcImg: "../../assets/img/product/trai_khom.jpg",
    price: 79000,
    isSlide: false,
    desc: [],
  },
  {
    name: "Chôm Chôm giống Thái Lan",
    srcImg: "../../assets/img/product/chom_chom.jpg",
    price: 119000,
    isSlide: false,
    desc: [],
  },
  {
    name: "Việt Quất Peru",
    srcImg: "../../assets/img/product/viet_quat_peru.webp",
    price: 89000,
    isSlide: true,
    desc: [],
  },
];

render(fruitList, productFruit);

// Selected Fillter
checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener("click", () => {
    let isChecked = checkbox.checked;
    if (isChecked) {
      seclectedFillter[index].classList.remove("hidden");
    } else {
      seclectedFillter[index].classList.add("hidden");
    }
  });
});

// Fillter Product
checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener("click", () => {
    let isChecked = checkbox.checked;
    switch (index) {
      case 0: {
        if (isChecked) {
          renderFill(fruitList, 0, 99000, productFruit);
        } else {
          render(fruitList, productFruit);
        }
        break;
      }
      case 1: {
        if (isChecked) {
          renderFill(fruitList, 99000, 201000, productFruit);
        } else {
          render(fruitList, productFruit);
        }
        break;
      }
      case 2: {
        if (isChecked) {
          renderFill(fruitList, 201000, 301000, productFruit);
        } else {
          render(fruitList, productFruit);
        }
        break;
      }

      case 3: {
        if (isChecked) {
          renderFill(fruitList, 301000, 501000, productFruit);
        } else {
          render(fruitList, productFruit);
        }
        break;
      }

      case 4: {
        if (isChecked) {
          renderFill(fruitList, 501000, 1000000, productFruit);
        } else {
          render(fruitList, productFruit);
        }
        break;
      }
      case 5: {
        if (isChecked) {
          renderFill(fruitList, 1000000, Infinity, productFruit);
        } else {
          render(fruitList, productFruit);
        }
        break;
      }
    }
  });
});

//  Close Fillter
closeFillters.forEach((closeFillter, index) => {
  closeFillter.addEventListener("click", () => {
    seclectedFillter[index].classList.add("hidden");
    checkboxes[index].checked = false;
  });
});

// Render
function render(list, elementContainer) {
  elementContainer.innerHTML = "";
  list.forEach((item) => {
    let elementLink = document.createElement("a");
    elementLink.setAttribute("href", "#!");
    let fruitElement = document.createElement("div");
    fruitElement.classList.add("product-item");
    let boxImg = document.createElement("div");
    boxImg.classList.add("box-image");
    // img
    let imgElement = document.createElement("img");
    imgElement.src = item.srcImg;
    imgElement.setAttribute("alt", item.name);
    imgElement.classList.add("product-img");

    boxImg.appendChild(imgElement);
    // product name
    let productName = document.createElement("p");
    productName.classList.add("product-name");
    productName.classList.add("line-clamp");
    productName.innerText = item.name;
    // product Price
    let productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    // Format number
    const formattedNumber = new Intl.NumberFormat().format(item.price);
    productPrice.innerText = formattedNumber + "₫";

    fruitElement.append(boxImg, productName, productPrice);

    elementLink.append(fruitElement);
    elementContainer.append(elementLink);
  });
}

// Render Fill
function renderFill(list, min, max, containerElement) {
  const filteredList = list.filter((item) => {
    return item.price > min && item.price < max;
  });
  render(filteredList, containerElement);
}

// Pagination
function pagiNation(list) {
  let currentPage = 1;
  let limit = 9;
  let perPage = [];
  perPage = list.slice(
    (currentPage - 1) * limit,
    (currentPage - 1) * limit + limit
  );
  render(perPage, productFruit);
}

pagiNation(fruitList);

// xy ly khi chuyen trang

function handlePagenumber(number) {
  let products = fruitList;
  let limit = 9;
  currentPage = number;
  perPage = products.slice(
    (currentPage - 1) * limit,
    (currentPage - 1) * limit + limit
  );
  render(perPage, productFruit);

  // Xóa lớp "active" từ tất cả các li
  const pageNumberItems = document.querySelectorAll(
    ".pagination-row .page-list .page-item"
  );
  pageNumberItems.forEach((item) => item.classList.remove("active"));

  // Đặt lớp "active" cho li của trang hiện tại
  const currentPageItem = document.querySelector(
    `.pagination-row .page-list .page-item:nth-child(${number})`
  );
  currentPageItem.classList.add("active");
}

// render so luong trang
function renderPageNumber(list) {
  let limit = 9;
  let totalPages = Math.ceil(list.length / limit);
  let pageNumber = document.querySelector(".pagination-row .page-list");

  for (let i = 1; i <= totalPages; i++) {
    let newPage = document.createElement("li");
    newPage.innerText = i;
    newPage.classList.add("page-item");
    if (i == currentPage) {
      newPage.classList.add("active");
    }
    newPage.setAttribute("onclick", "handlePagenumber(" + i + ")");
    pageNumber.appendChild(newPage);
  }
}

renderPageNumber(fruitList);
