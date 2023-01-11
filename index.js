"use strict";
import { updateCartTotal, addToCart } from "./cart.js";
import { handleCliks } from "./modal.js";
import { initGoodsStore } from "./state.js";

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
  let rows = 10;
  let filterObj = {
    colorList: [],
    sizeList: [],
  };

  const colorsForm = document.querySelector(".colors");

  colorsForm.addEventListener("click", (e) => {
    if (!e.target.value) {
      return;
    }

    let index = filterObj.colorList.indexOf(e.target.value);
    if (index > -1) {
      filterObj.colorList.splice(index, 1);
    } else {
      filterObj.colorList.push(e.target.value);
    }

    displayList();
  });

  function applyFilterForGoods(goods) {
    return goods.filter((el) => {
      if (!filterObj.colorList.length && !filterObj.sizeList.length) {
        return true;
      }

      const itemColorList = el.colors;
      const filterColors = filterObj.colorList;
      const itemSizeList = el.sizes;
      const filterSizes = filterObj.sizeList;

      let result = false;

      if (filterSizes.length && itemSizeList) {
        result = filterSizes?.every((color) => {
          return itemSizeList.includes(color);
        });
      }

      if (filterColors.length && itemColorList) {
        result = filterColors?.every((color) => {
          return itemColorList.includes(color);
        });
      }

      return result;
    });
  }

  const sizesForm = document.querySelector(".sizes");

  sizesForm.addEventListener("click", (e) => {
    if (!e.target.value) {
      return;
    }

    let index = filterObj.sizeList.indexOf(+e.target.value);
    if (index > -1) {
      filterObj.sizeList.splice(index, 1);
    } else {
      filterObj.sizeList.push(+e.target.value);
    }

    displayList();
  });

  function displayList() {
    let postsDataCopy = [...postsData];
    const postsEl = document.querySelector(".filter__goods__list");
    postsEl.innerHTML = "";

    postsDataCopy = applyFilterForGoods(postsDataCopy);

    const start = rows * (currentPage - 1);
    const end = start + rows;
    const paginatedData = postsDataCopy.slice(start, end);

    // render items
    paginatedData.forEach((el) => {
      const postEl = document.createElement("li");
      postEl.setAttribute("productid", el.id);
      postEl.classList.add("filter__goods__items");
      // #TODO: fix image links
      console.log(el.colors);
      postEl.innerHTML = `
        <a href="./product.html?id=${el.id}">
          <img src="/img/base/${el.id}.jpeg">
          <p>${el.title}</p>
          <img class="filter__rating filter__rating__items" src="./img/rating.png">
          <p class="filter__goods__item__price"><span>As low as</span> $${el.price}</p>
          <div>
              <form action="" class="filter__goods__colors">
                ${renderColorElement(el.colors)}
              </form>
          </div>
        </a>
        <button productid=${el.id} type='button' class='filter__list__btn uppercase addtocart'>Add to cart</button>
        
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

  function renderColorElement(colors) {
    return colors.map((color, idx) => {
      return ` 
        <input type="radio" name="color" id="goodscolor1${idx}" value="${color}">
        <label for="goodscolor1${idx}" class="goods_color ${color}"></label>
      `
    }).join('');
  }

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector(".pagination");
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add("pagination__list");

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
  }

  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add("pagination__item");
    liEl.innerText = page;

    if (currentPage === page) liEl.classList.add("pagination__item--active");

    liEl.addEventListener("click", () => {
      currentPage = page;
      displayList();

      let currentItemLi = document.querySelector("li.pagination__item--active");
      currentItemLi.classList.remove("pagination__item--active");

      liEl.classList.add("pagination__item--active");
    });

    return liEl;
  }

  displayList();
  displayPagination(postsData, rows);
  handleCliks();
  updateCartTotal(postsMap);
}

main();