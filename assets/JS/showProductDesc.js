import start from "./productDetail.js";

function showProductDetail() {
  document.querySelectorAll(".product-container a").forEach((item, index) => {
    item.addEventListener("click", () => {
      var productId = item.getAttribute("data-value");
      start(productId);

      window.location.href = "./productDetail?id=" + productId;
    });
  });
}

showProductDetail();
