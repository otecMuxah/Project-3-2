export let goods;

async function getData() {
  const response = await fetch("./bd.json");
  const data = await response.json();
  return data;
}

export async function initGoodsStore() {
  goods = await getData();
}
