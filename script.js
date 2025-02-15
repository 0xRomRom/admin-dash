"use strict";

const cloudLogo = document.querySelector(".fa-cloud-bolt");
const home = document.querySelector(".home");
const faHouse = document.querySelector(".fa-house");
const stats = document.querySelector(".stats");
const faChartColumn = document.querySelector(".fa-chart-column");
const message = document.querySelector(".messages");
const faEnvelope = document.querySelector(".fa-envelope");
const earnings = document.querySelector(".earnings");
const faSackDollar = document.querySelector(".fa-sack-dollar");

const newOrderCounter = document.querySelector(".count-inner");
const newMessageCounter = document.querySelector(".count-inner2");
const homePanel = document.querySelector(".home-panel");
const ordersPanel = document.querySelector(".orders-panel");
const messagesPanel = document.querySelector(".messages-panel");
const earningsPanel = document.querySelector(".earnings-panel");
const ordersBox = document.querySelector(".orders-box");
const ordersBoxBg = document.querySelector(".orders-box-bg");
const ordersDiv = document.querySelector(".obx-orders");
const messagesDiv = document.querySelector(".messages-list");
const refreshOrders = document.querySelector(".refresh1");
const refreshMessages = document.querySelector(".refresh2");
const arrowsRefresh = document.querySelector(".fa-arrows-rotate");
const customerBox = document.querySelector(".customer-box");
const newOrdersButton = document.querySelector(".new-orders");
const newMessagesButton = document.querySelector(".new-messages");
const closeMessage = document.querySelector(".close-message");
const selectedMessage = document.querySelector(".selected-message");
const emailSender = document.querySelector(".email-sender");
const senderText = document.querySelector(".sender-text");

const custNaam = document.querySelector(".cust-naam");
const custPlaats = document.querySelector(".cust-plaats");
const custStraat = document.querySelector(".cust-straat");
const custPostcode = document.querySelector(".cust-postcode");
const custMobiel = document.querySelector(".cust-mobiel");
const custHuisnummer = document.querySelector(".cust-huisnummer");
const custEmail = document.querySelector(".cust-email");
const custDiscountTxt = document.querySelector(".cust-discount-txt");
const custTotalTxt = document.querySelector(".cust-total-txt");
const custPriceTxt = document.querySelector(".cust-prijs-txt");
const custFreevape1 = document.querySelector(".cust-freevape1");
const custFreevape2 = document.querySelector(".cust-freevape2");
const ordersBack = document.querySelector(".fa-arrow-right-to-bracket");
const custSelect = document.querySelector(".cust-select");
const custSelection = document.querySelector(".cust-selection");

//Init//
home.style.transition = "all 0.1s ease-in-out";
home.style.marginLeft = "1.2rem";
faHouse.style.fontSize = "3rem";
let initialOrderCount = 0;
let numberClicked = 0;
let clickedIndex = 0;
let clickedIndex2 = 0;
let orderKeys = [];
let messagesKeys = [];
let fetchedData = {};
let fetchedMessages = {};
newOrderCounter.textContent = initialOrderCount;
newMessageCounter.textContent = initialOrderCount;
ordersPanel.classList.add("hidden");
messagesPanel.classList.add("hidden");
earningsPanel.classList.add("hidden");
////////

//Check for incoming new messages
const messageLength1 = localStorage.getItem("newMessage");
const messageLength2 = localStorage.getItem("newMessage2");
if (messageLength2 < messageLength1) {
  newMessageCounter.textContent = +(messageLength1 - messageLength2);
}
localStorage.setItem("newMessage2", messageLength1);

//Check for incoming new orders
const localLength1 = localStorage.getItem("newOrder");
const localLength2 = localStorage.getItem("newOrder2");
if (localLength2 < localLength1) {
  newOrderCounter.textContent = +(localLength1 - localLength2);
}
localStorage.setItem("newOrder2", localLength1);

//Refresh messages
refreshMessages.addEventListener("click", () => {
  refreshMessages.classList.add("turn");
  messagesDiv.innerHTML = "";
  messagesKeys = [];
  messageFetcher();
  setTimeout(() => {
    refreshMessages.classList.remove("turn");
  }, 1500);
});

//Close message
closeMessage.addEventListener("click", () => {
  selectedMessage.classList.add("hidden");
  messagesDiv.classList.remove("hidden");
  refreshMessages.classList.remove("hidden");
  emailSender.textContent = "";
  senderText.textContent = "";
});

//Display sender and message
const messagesRenderLoop = () => {
  const clickedBox = Object.values(fetchedMessages)[clickedIndex2 - 1];
  emailSender.textContent = clickedBox.email;
  senderText.textContent = clickedBox.bericht;
};

//Render the selected order
messagesDiv.addEventListener("click", (e) => {
  messagesKeys.map((item, i) => {
    if (e.target.classList.contains(item)) {
      clickedIndex2 = i + 1;
    }
  });
  if (clickedIndex2 === 0) return;
  if (clickedIndex2 > 0) {
    messagesDiv.classList.add("hidden");
    selectedMessage.classList.remove("hidden");
  }
  messagesRenderLoop();
  refreshMessages.classList.add("hidden");
});

//Message fetcher
const messageLoop = (data) => {
  const orderLength = Object.values(data).length;
  console.log(orderLength);
  localStorage.setItem("newMessage", orderLength);

  let counter = 1;
  for (let i = 0; i < orderLength; i++) {
    messagesDiv.innerHTML += `<div class="message ${
      "message" + "-" + (i + 1)
    }"><p class="mail-counter ${
      Object.keys(data)[i]
    }">${counter}</p> <p class="email-name ${Object.keys(data)[i]}">By: ${
      Object.values(data)[i].email
    }</p></div>`;
    counter++;
    messagesKeys.push(Object.keys(data)[i]);
  }
};

const messageFetcher = async () => {
  const response = await fetch(
    "https://snelle-vape-default-rtdb.europe-west1.firebasedatabase.app/ContactFormulier.json"
  );
  if (!response.ok) {
    throw new Error("Could not fetch orders from server");
  }
  const data = await response.json();
  messageLoop(data);
  fetchedMessages = data;
};
messageFetcher();

//Go from order back to orderlist
ordersBack.addEventListener("click", () => {
  customerBox.classList.add("hidden");
  ordersDiv.classList.remove("hidden");
  ordersBox.classList.remove("hidden");
  custDiscountTxt.textContent = "";
  custFreevape1.textContent = "";
  custFreevape1.textContent = "";
  custSelection.innerHTML = "";
  custTotalTxt.textContent = "";
  custPriceTxt.textContent = "";
  custDiscountTxt.textContent = "";
  custSelection.innerHTML = "";
  ordersDiv.classList.add("fadeDivIn2");
  customerBox.classList.add("fadeDivIn");
  refreshOrders.classList.remove("hidden");
  ordersBoxBg.classList.remove("hidden");
});

//Render the selected order
ordersDiv.addEventListener("click", (e) => {
  orderKeys.map((item, i) => {
    if (e.target.classList.contains(item)) {
      clickedIndex = i + 1;
    }
  });
  if (clickedIndex === 0) return;
  if (clickedIndex > 0) {
    customerBox.classList.remove("hidden");
    ordersDiv.classList.add("hidden");
    ordersBoxBg.classList.add("hidden");
    ordersBox.classList.add("hidden");
  }
  customerRenderLoop();

  refreshOrders.classList.add("hidden");
});

//Render order to screen
const customerRenderLoop = () => {
  const clickedBox = Object.values(fetchedData)[clickedIndex - 1];
  custNaam.textContent = `Naam: 
    ${clickedBox.customerDetails.naam}`;
  custPlaats.textContent = `Plaats: ${clickedBox.customerDetails.plaats}`;
  custPostcode.textContent = `Postcode: ${clickedBox.customerDetails.postcode}`;
  custStraat.textContent = `Straat: ${clickedBox.customerDetails.straat}`;
  custEmail.textContent = `Email: ${clickedBox.customerDetails.email}`;
  custHuisnummer.textContent = `Huisnummer: ${clickedBox.customerDetails.huisnummer}`;
  custMobiel.textContent = `Mobiel: ${clickedBox.customerDetails.mobiel}`;
  if (clickedBox.discount) {
    custDiscountTxt.textContent = `Korting: Ja`;
  } else {
    custDiscountTxt.textContent = `Korting: Nee`;
  }
  custTotalTxt.textContent = `Aantal: ${clickedBox.totalCount}`;
  custPriceTxt.textContent = `Totaal: €${Object.values(fetchedData)[
    clickedIndex - 1
  ].totalPrice.toFixed(2)} `;
  if (clickedBox.totalCount > 4) {
    custFreevape1.textContent = "";
    custFreevape2.textContent = "";
    custFreevape1.textContent = `Gratis Vape 1: ${clickedBox.freeVape1}`;
    custFreevape2.textContent = `Gratis Vape 2: Geen`;
  }
  if (clickedBox.totalCount > 9) {
    custFreevape1.textContent = "";
    custFreevape2.textContent = "";
    custFreevape1.textContent = `Gratis Vape 1: ${
      clickedBox.freeVape1.charAt(0).toUpperCase() +
      clickedBox.freeVape1.slice(1)
    }`;
    custFreevape2.textContent = `Gratis Vape 2: ${
      clickedBox.freeVape2.charAt(0).toUpperCase() +
      clickedBox.freeVape2.slice(1)
    }`;
  }
  if (clickedBox.totalCount < 5) {
    custFreevape1.textContent = `Gratis Vape 1: Geen`;
    custFreevape2.textContent = `Gratis Vape 2: Geen`;
  }

  let customerPicks =
    Object.values(fetchedData)[clickedIndex - 1].flavorAmounts;
  console.log(customerPicks);
  for (const data of Object.entries(customerPicks)) {
    const str = data.toString().replace(",", ": ");
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    custSelection.innerHTML += `<p class='cust-selected'>${str2}</p>`;
  }
};

//Refresh orders
refreshOrders.addEventListener("click", () => {
  arrowsRefresh.classList.add("turn");
  ordersDiv.innerHTML = "";
  orderKeys = [];
  orderFetcher();
  setTimeout(() => {
    arrowsRefresh.classList.remove("turn");
  }, 1500);
});

//Fetch and render orders
const orderLoop = (data) => {
  const orderLength = Object.values(data).length;
  localStorage.setItem("newOrder", orderLength);

  let counter = 1;
  for (let i = 0; i < orderLength; i++) {
    ordersDiv.innerHTML += `<div class="box ${
      "box" + "-" + (i + 1)
    }"><p class="box-counter ${
      Object.keys(data)[i]
    }">${counter}</p> <p class="box-name ${Object.keys(data)[i]}">${
      Object.values(data)[i].customerDetails.naam
    }</p> <p class="box-qty ${Object.keys(data)[i]}">${
      "Qty: " + Object.values(data)[i].totalCount
    }</p></div>`;
    counter++;
    orderKeys.push(Object.keys(data)[i]);
  }
};

const orderFetcher = async () => {
  const response = await fetch(
    "https://snelle-vape-default-rtdb.europe-west1.firebasedatabase.app/Bestellingen.json"
  );
  if (!response.ok) {
    throw new Error("Could not fetch orders from server");
  }
  const data = await response.json();
  orderLoop(data);
  fetchedData = data;
};
orderFetcher();

//Handle Animation Side Bar

cloudLogo.addEventListener("mouseover", () => {
  const int1 = Math.floor(Math.random() * 255 + 1);
  const int2 = Math.floor(Math.random() * 255 + 1);
  const int3 = Math.floor(Math.random() * 255 + 1);
  cloudLogo.style.color = `rgb(${int1}, ${int2}, ${int3})`;
});

cloudLogo.addEventListener("mouseleave", () => {
  cloudLogo.style.color = `white`;
});

const menuBoxHandler = (menu, icon, b1, b2, b3, r1, r2, r3) => {
  //Modify clicked Icon
  menu.style.transition = "all 0.1s ease-in-out";
  menu.style.marginLeft = "1.2rem";
  icon.style.fontSize = "3rem";
  //Reset others
  b1.style.marginLeft = "0rem";
  b2.style.marginLeft = "0rem";
  b3.style.marginLeft = "0rem";
  r1.style.fontSize = "2.5rem";
  r2.style.fontSize = "2.5rem";
  r3.style.fontSize = "2.5rem";
};

home.addEventListener("click", () => {
  menuBoxHandler(
    home,
    faHouse,
    stats,
    message,
    earnings,
    faChartColumn,
    faEnvelope,
    faSackDollar
  );
  earningsPanel.classList.add("hidden");
  messagesPanel.classList.add("hidden");
  ordersPanel.classList.add("hidden");
  homePanel.classList.remove("hidden");
  homePanel.classList.add("fadeDivIn");
});

stats.addEventListener("click", () => {
  menuBoxHandler(
    stats,
    faChartColumn,
    home,
    message,
    earnings,
    faHouse,
    faEnvelope,
    faSackDollar
  );
  earningsPanel.classList.add("hidden");
  messagesPanel.classList.add("hidden");
  homePanel.classList.add("hidden");
  ordersPanel.classList.remove("hidden");
  ordersPanel.classList.add("fadeDivIn");
  newOrderCounter.textContent = 0;
});

newOrdersButton.addEventListener("click", () => {
  menuBoxHandler(
    stats,
    faChartColumn,
    home,
    message,
    earnings,
    faHouse,
    faEnvelope,
    faSackDollar
  );
  earningsPanel.classList.add("hidden");
  messagesPanel.classList.add("hidden");
  homePanel.classList.add("hidden");
  ordersPanel.classList.remove("hidden");
  ordersPanel.classList.add("fadeDivIn");
  newOrderCounter.textContent = 0;
});

newMessagesButton.addEventListener("click", () => {
  menuBoxHandler(
    message,
    faEnvelope,
    home,
    earnings,
    stats,
    faHouse,
    faChartColumn,
    faSackDollar
  );
  ordersPanel.classList.add("hidden");
  earningsPanel.classList.add("hidden");
  homePanel.classList.add("hidden");
  messagesPanel.classList.remove("hidden");
  messagesPanel.classList.add("fadeDivIn");
  newMessageCounter.textContent = 0;
});

message.addEventListener("click", () => {
  menuBoxHandler(
    message,
    faEnvelope,
    home,
    earnings,
    stats,
    faHouse,
    faChartColumn,
    faSackDollar
  );
  ordersPanel.classList.add("hidden");
  earningsPanel.classList.add("hidden");
  homePanel.classList.add("hidden");
  messagesPanel.classList.remove("hidden");
  messagesPanel.classList.add("fadeDivIn");
  newOrderCounter.textContent = 0;
});

earnings.addEventListener("click", () => {
  menuBoxHandler(
    earnings,
    faSackDollar,
    stats,
    message,
    home,
    faChartColumn,
    faEnvelope,
    faHouse
  );
  ordersPanel.classList.add("hidden");
  homePanel.classList.add("hidden");
  messagesPanel.classList.add("hidden");
  earningsPanel.classList.remove("hidden");
  earningsPanel.classList.add("fadeDivIn");
  newOrderCounter.textContent = 0;
});
