"use strict"
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

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const el = postsData.find((el) => el.id === +params.id);
    const productView = document.getElementById("product");
  productView.setAttribute("productid", el.id);


        productView.innerHTML = `
<div class="container__info__img">
<img src="/img/base/${el.id}.jpeg"> 
</div>
    <div class="container__info__options" >
    <p class="container__info__options__name">${el.title}</p>
    <div class="container__info__options__rating">
<img class="container__info__options__rating" src="./img/rating.png">
<p class="container__info__options__rating__par">93 reviews</p>
</div>

    <p class="container__info__price"><span>As low as </span>$${el.price}</p>
<div class="container__info__options__color">
<p>Colors:</p>
    <form action="" class="container__info__options__colors">
        <input type="radio" name="color" id="goodscolor1${el.id}" value="black" class="goods_color__1">
        <label for="goodscolor1${el.id}"></label>
        <input type="radio" name="color" id="goodscolor2${el.id}" value="brown" class="goods_color__2">
        <label for="goodscolor2${el.id}"></label>
        <input type="radio" name="color" id="goodscolor3${el.id}" value="blue" class="goods_color__3">
        <label for="goodscolor3${el.id}"></label>
        <input type="radio" name="color" id="goodscolor4${el.id}" value="green" class="goods_color__4">
        <label for="goodscolor4${el.id}"></label>
        <input type="radio" name="color" id="goodscolor5${el.id}" value="gray" class="goods_color__5">
        <label for="goodscolor5${el.id}"></label>
        <input type="radio" name="color" id="goodscolor6${el.id}" value="orange" class="goods_color__6">
        <label for="goodscolor6${el.id}"></label>
        <input type="radio" name="color" id="goodscolor7${el.id}" value="white" class="goods_color__7">
        <label for="goodscolor7${el.id}"></label>
    </form>
                        </div>
                        <div class="container__info__options__size">
                            <p>Sizes:</p>
                        <form action="" class="container__info__options__size__form ">
                            <input class="filter__checkbox" type="checkbox" value="30" id="30">
                            <label for="30">30</label>
                            <input class="filter__checkbox" type="checkbox" value="32" id="32">
                            <label for="32">32</label>
                            <input class="filter__checkbox" type="checkbox" value="34" id="34">
                            <label for="34">34</label>
                            <input class="filter__checkbox" type="checkbox" value="36" id="36">
                            <label for="36">36</label>
                            <input class="filter__checkbox" type="checkbox" value="38" id="38">
                            <label for="38">38</label>
                            <input class="filter__checkbox" type="checkbox" value="40" id="40">
                            <label for="40">40</label>
                            <input class="filter__checkbox" type="checkbox" value="42" id="42">
                            <label for="42">42</label>
                            <input class="filter__checkbox" type="checkbox" value="44" id="44">
                            <label for="44">44</label>
                            <input class="filter__checkbox" type="checkbox" value="46" id="46">
                            <label for="46">46</label>
                        </form>
                        </div>
<div class="container__info__option__btn">
<button productid=${el.id} type="button" class="container__info__option__button uppercase addtocart">add to cart</button>
<button class="container__info__option__button__wishlist uppercase">add to wishlist</button>
</div>
</div>
<div class="container__info__details">
<p>Details</p>
<div class="container__info__details__field">
<p>Lorem ipsum dolor sit amet consectetur, 
adipisicing elit. Explicabo autem non quaerat, 
odio necessitatibus consectetur velit, nesciunt commodi totam praesentium fugit, 
repellat deserunt quas veritatis odit voluptas enim officiis quam.</p>
</div>
</div>
  `;



function mainHead() {
  const productName = document.getElementById("container_top");
  productName.innerHTML = `
                  <img src="./img/homeicon.png" alt="home">
                <a class="uppercase" href="./index.html">home</a>
                <img src="./img/arrowright.png" alt="arrow">
                <a class="uppercase" href="shorts.html">shorts</a>
                <img src="./img/arrowright.png" alt="arrow">
  <p class="container__top__product uppercase" href="#">${el.title}</p>
  `;

        var btns = document.getElementsByClassName("addtocart");
        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function () {
            addToCart(this.getAttribute("productid"), postsMap);
          });
        }

}
  

  mainHead();
  handleCliks();
      updateCartTotal(postsMap);

  }


main();



