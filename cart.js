"use strict";

export function emptyCart() {
  if (sessionStorage.getItem("cart")) {
    sessionStorage.removeItem("cart");
    updateCartTotal({});
    var alerts = document.getElementById("alerts");
    alerts.innerHTML = "";
    if (alerts.classList.contains("message")) {
      alerts.classList.remove("message");
    }
  }
}

export function updateCartTotal(postsMap) {
  var total = 0;
  var numberOfItems = 0;
  var cartTable = "";
  if (
    sessionStorage.getItem("cart") &&
    postsMap &&
    Object.keys(postsMap).length
  ) {
    var cart = JSON.parse(sessionStorage.getItem("cart"));
    numberOfItems = cart.length;
    for (var i = 0; i < numberOfItems; i++) {
      var x = postsMap[cart[i]];
      cartTable +=
        "<tr><td>" +
        x.title +
        "</td><td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp$" +
        x.price +
        "</td><td>" +
        "<img class='cart__image' src=./img/base/" +
        x.img +
        ">" +
        "</td><td>" + 
        x.colors;
        "</td></tr>";
      total += +x.price;
    }
  }

  document.getElementById("total").innerHTML = total;
  document.getElementById("carttable").innerHTML = cartTable;
  document.getElementById("itemsquantity").innerHTML = numberOfItems;
  document.getElementById("itemsquantitytopnav").innerHTML = numberOfItems;
}

export function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  if (!alerts) return;
  alerts.innerHTML = message;
  if (!alerts?.classList.contains("message")) {
    alerts?.classList.add("message");
  }
  alert(message);
}

export function addToCart(id, postsMap) {
    debugger
    var product = postsMap[id];
  
    if (!sessionStorage.getItem("cart")) {
      const cart = [];
      cart.push(id);
      const stringCart = JSON.stringify(cart);
      sessionStorage.setItem("cart", stringCart);
      addedToCart(product.title);
      updateCartTotal(postsMap);
    } else {
      const cart = JSON.parse(sessionStorage.getItem("cart"));
      cart.push(id);
      const stringCart = JSON.stringify(cart);
      sessionStorage.setItem("cart", stringCart);
      addedToCart(product.title);
      updateCartTotal(postsMap);
    }
  }
  