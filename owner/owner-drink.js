// Ambil data orders dari localStorage
const orders = JSON.parse(localStorage.getItem("orders")) || [];

// Target tbody untuk menampilkan data
const orderList = document.getElementById("orderList");

// Render data order ke tabel
orders.forEach((order, index) => {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${order.name}</td>
    <td>${order.phone}</td>
    <td>${order.address}</td>
    <td>${order.items
      .map((item) => `${item.drink} (${item.qty}x)`)
      .join(", ")}</td>
    <td>Rp ${order.total}</td>
    <td> <p><strong>Status:</strong> <span id="status-${index}">${
    order.status
  }</span></p>
  `;

  orderList.appendChild(row);
});

const ordersContainer = document.getElementById("orders-container");

function renderOrders() {
  ordersContainer.innerHTML = "";
  ordersContainer.innerHTML = "<h4>Order change section</h4>";
  orders.forEach((order, index) => {
    ordersContainer.innerHTML += `
      <div class="order">
        <p>${index + 1}.<strong>Nama:</strong> ${order.name}</p>
        <button onclick="updateStatus(${index})">Ubah Status</button>
      </div>
    `;
  });
}

function updateStatus(index) {
  const flow = ["Pending", "Proses", "Selesai"];
  let now = orders[index].status;
  let next = (flow.indexOf(now) + 1) % flow.length;
  orders[index].status = flow[next];
  localStorage.setItem("orders", JSON.stringify(orders));

  document.getElementById(`status-${index}`).innerText = orders[index].status;
  renderOrders();
}
/*====  ANIMATION ===*/
const hamburgerText = document.getElementById("hamburger-text");
const hamburger = document.getElementById("hamburger");
const table = document.querySelector(".scroll");

hamburger.addEventListener("click", () => {
  hamburgerText.classList.toggle("moveUp");
  ordersContainer.classList.toggle("slideRight");
  table.classList.toggle("move");
});
/*=====================
===== ADD/REMOVE MENU==
=====================*/

renderOrders();
