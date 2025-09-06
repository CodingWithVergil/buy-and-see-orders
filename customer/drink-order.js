//  take all card and element total price
const cards = document.querySelectorAll(".drink");
const totalDisplay = document.querySelector(".total");
const confirmBuy = document.getElementById("confirmation-card");
const orderList = document.querySelector(".orders");
const finalBill = document.querySelector(".final-bill");
const overlay = document.getElementById("overlay-dark");

const username = document.getElementById("name");
const address = document.getElementById("location");
const phoneNumber = document.getElementById("phone-number");
const orders = [];

//  function to update total price from all choose product
function updateTotal() {
  let total = 0;
  orderList.innerHTML = "";

  cards.forEach((card) => {
    const itemCount = parseInt(card.querySelector(".item").textContent);
    const price = parseInt(card.getAttribute("data-price"));
    const name = card.getAttribute("data-name"); //take data-name of drink

    if (itemCount > 0) {
      const li = document.createElement("li");
      li.textContent = `${name} (${itemCount}x)`;
      orderList.appendChild(li);
    }
    total += itemCount * price;
  });

  totalDisplay.textContent = "Total: Rp" + total.toLocaleString("id-ID");
  finalBill.textContent = "The Total is: Rp" + total.toLocaleString("id-ID");
}

//  add event listener to all plus minus button
cards.forEach((card) => {
  const plusBtn = card.querySelector(".plus");
  const minusBtn = card.querySelector(".minus");
  const itemCount = card.querySelector(".item");

  plusBtn.addEventListener("click", () => {
    let count = parseInt(itemCount.textContent);
    count++;
    itemCount.textContent = count;
    updateTotal();
  });

  minusBtn.addEventListener("click", () => {
    let count = parseInt(itemCount.textContent);
    if (count > 0) {
      count--;
      itemCount.textContent = count;
      updateTotal();
    }
  });
});

function bill() {
  confirmBuy.style.display = "flex";
  overlay.classList.add("active");
}

function cancel() {
  confirmBuy.style.display = "none";
  overlay.classList.remove("active");
}

function buy() {
  // ambil data customer
  const customer = {
    name: username.value,
    address: address.value,
    phone: phoneNumber.value,
    items: [],
    total: 0,
    status: "pending",
  };

  let total = 0;

  // ambil semua pesanan minuman
  cards.forEach((card) => {
    const itemCount = parseInt(card.querySelector(".item").textContent);
    const price = parseInt(card.getAttribute("data-price"));
    const name = card.getAttribute("data-name");

    if (itemCount > 0) {
      customer.items.push({
        drink: name,
        qty: itemCount,
        price: price,
        subtotal: itemCount * price,
      });
      total += itemCount * price;
    }
  });

  customer.total = total;

  // simpan ke array orders
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(customer);
  localStorage.setItem("orders", JSON.stringify(orders));

  console.log("All orders:", orders); // cek semua pesanan
  console.log("New order added:", customer); // cek order terbaru

  console.log("Order tersimpan:", customer);

  // reset form & counter
  username.value = "";
  address.value = "";
  phoneNumber.value = "";
  cards.forEach((card) => (card.querySelector(".item").textContent = 0));
  updateTotal();

  // tutup popup
  cancel();
}
