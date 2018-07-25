const KEY = "cart";

// 获取本地存储中的存放的购物车数据
export const getLocalGoods = () => {
  return JSON.parse(localStorage.getItem(KEY) || "{}");
};

// 通过本地存储，获取到总数量
export const getLocalTotalCount = () => {
  const cart = getLocalGoods();
  let totalCount = 0;
  for (let key in cart) {
    totalCount += cart[key];
  }
  return totalCount;
};

// 向本地存储中添加购物车数据
export const addLocalGoods = goods => {
  const cart = getLocalGoods();
  // 如果存在本地中，累加，否则，追加
  if (cart[goods.goodsId]) {
    cart[goods.goodsId] += goods.count;
  } else {
    cart[goods.goodsId] = goods.count;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  // 将最新的总数量返回   
  return getLocalTotalCount();
};
