"use strict";
import { updateCartTotal, addToCart } from "./cart.js";
import { handleCliks } from "./modal.js";

async function getData() {
  const response = await fetch("./bd.json");
  const data = await response.json();
  return data;
}

async function main() {
  const postsData = await getData();
  const postsMap = postsData.reduce((acc, next) => {
    acc[next.id] = next;
    return acc;
  }, {});
  let currentPage = 1;
  let rows = 4;

  function displayList() {
    let postsDataCopy = [...postsData];
    const postsEl = document.querySelector(".new-collection__list");
    postsEl.innerHTML = "";

    const start = rows * (currentPage - 1);
    const end = start + rows;
    const paginatedData = postsDataCopy.slice(start, end);

    // render items
    paginatedData.forEach((el) => {
      const postEl = document.createElement("li");
      postEl.setAttribute("productid", el.id);
      postEl.classList.add("new-collection__list__item");
      // #TODO: fix image links
      postEl.innerHTML = `
    <img src="/img/base/${el.id}.jpeg">
    <p>${el.title}</p>
    <img class="new-collection__list__item__rating filter__rating__items" src="./img/rating.png">
    <p class="filter__goods__item__price"><span>As low as</span> $${el.price}</p>
    <button productid=${el.id} type='button' class='new-collection__btn uppercase addtocart'>Add to cart</button>
    `;
      postsEl.appendChild(postEl);
    });

    var btns = document.getElementsByClassName("addtocart");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        addToCart(this.getAttribute("productid"), postsMap);
      });
    }
  }

  displayList();
  handleCliks();
  updateCartTotal(postsMap);
}

main();
