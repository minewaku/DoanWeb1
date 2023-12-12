let fruitList = JSON.parse(localStorage.getItem("fruitList"));

$(function () {
  "use strict";

  var ticksStyle = {
    fontColor: "#495057",
    fontStyle: "bold",
  };

  var mode = "index";
  var intersect = true;

  var $salesChart = $("#sales-chart");
  // eslint-disable-next-line no-unused-vars
  var salesChart = new Chart($salesChart, {
    type: "bar",
    data: {
      labels: ["JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
      datasets: [
        {
          backgroundColor: "#007bff",
          borderColor: "#007bff",
          data: [1000, 2000, 3000, 2500, 2700, 2500, 3000],
        },
        {
          backgroundColor: "#ced4da",
          borderColor: "#ced4da",
          data: [700, 1700, 2700, 2000, 1800, 1500, 2000],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        mode: mode,
        intersect: intersect,
      },
      hover: {
        mode: mode,
        intersect: intersect,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            // display: false,
            gridLines: {
              display: true,
              lineWidth: "4px",
              color: "rgba(0, 0, 0, .2)",
              zeroLineColor: "transparent",
            },
            ticks: $.extend(
              {
                beginAtZero: true,

                // Include a dollar sign in the ticks
                callback: function (value) {
                  if (value >= 1000) {
                    value /= 1000;
                    value += "k";
                  }

                  return "$" + value;
                },
              },
              ticksStyle
            ),
          },
        ],
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false,
            },
            ticks: ticksStyle,
          },
        ],
      },
    },
  });

  var $visitorsChart = $("#visitors-chart");
  // eslint-disable-next-line no-unused-vars
  var visitorsChart = new Chart($visitorsChart, {
    data: {
      labels: ["18th", "20th", "22nd", "24th", "26th", "28th", "30th"],
      datasets: [
        {
          type: "line",
          data: [100, 120, 170, 167, 180, 177, 160],
          backgroundColor: "transparent",
          borderColor: "#007bff",
          pointBorderColor: "#007bff",
          pointBackgroundColor: "#007bff",
          fill: false,
          // pointHoverBackgroundColor: '#007bff',
          // pointHoverBorderColor    : '#007bff'
        },
        {
          type: "line",
          data: [60, 80, 70, 67, 80, 77, 100],
          backgroundColor: "tansparent",
          borderColor: "#ced4da",
          pointBorderColor: "#ced4da",
          pointBackgroundColor: "#ced4da",
          fill: false,
          // pointHoverBackgroundColor: '#ced4da',
          // pointHoverBorderColor    : '#ced4da'
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        mode: mode,
        intersect: intersect,
      },
      hover: {
        mode: mode,
        intersect: intersect,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            // display: false,
            gridLines: {
              display: true,
              lineWidth: "4px",
              color: "rgba(0, 0, 0, .2)",
              zeroLineColor: "transparent",
            },
            ticks: $.extend(
              {
                beginAtZero: true,
                suggestedMax: 200,
              },
              ticksStyle
            ),
          },
        ],
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false,
            },
            ticks: ticksStyle,
          },
        ],
      },
    },
  });
});

function renderProductTable() {
  let tableValue = document.querySelector(
    ".table.table-striped.table-valign-middle.dashboard tbody"
  );

  let rowVisibility = 4;
  tableValue.innerHTML = fruitList
    .map((product, index) => {
      return `
    <tr>
    <td>
      <img
        src="${product.srcImg}"
        alt="Product 1"
        class="img-circle img-size-32 mr-2"
      />
      ${product.name}
    </td>
    <td>${(() => {
      let formattedNumber = new Intl.NumberFormat().format(product.price);
      return formattedNumber;
    })()} VND</td>
    <td>
      <small class="text-${(() => {
        return index % 2 == 0 ? "success" : "danger";
      })()} mr-1">
        <i class="fas fa-arrow-${(() => {
          return index % 2 == 0 ? "up" : "down";
        })()}"></i>
        12%
      </small>
      ${(() => {
        let randomNumber =
          Math.floor(Math.random() * (12000 - 4000 + 1)) + 4000;
        return randomNumber;
      })()}
       Sold
    </td>
    <td>
      <a href="http://127.0.0.1:5500/views/web/productDetailHotDeal.html?id=${parseInt(
        index + 1
      )}" class="text-muted">
        <i class="fas fa-search"></i>
      </a>
    </td>
  </tr>
    `;
    })
    .join("");
  let tableRows = document.querySelectorAll(
    ".table.table-striped.table-valign-middle tbody tr"
  );
  console.log(tableRows);

  for (var i = rowVisibility; i < fruitList.length; i++) {
    tableRows[i].style.display = "none";
  }
}
renderProductTable();
