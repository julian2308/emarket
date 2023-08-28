let productsOnTheCart = [];
let totalPrice = 0;

const listElements = document.querySelectorAll(".product-click");
const containerBuyCart = document.querySelector(".products-to-buy");
const finalPrice = document.querySelector(".final-price");
const allContainerProducts = document.querySelector(".show");
const allContainerProducts2 = document.querySelector(".show2");
const allContainerProducts3 = document.querySelector(".show3");
const allContainerProducts4 = document.querySelector(".show4");
const allContainerProducts5 = document.querySelector(".show5");
const allContainerProducts6 = document.querySelector(".show6");

listElements.forEach((listElement) => {
  listElement.addEventListener("click", () => {

    let height = 0;
    let menu = listElement.nextElementSibling;
    console.log(menu);
    if (menu.clientHeight == "0") {
      height = menu.scrollHeight;
    }

    menu.style.height = `${height}px`;
  });
});

const deleteProduct = (e) => {
  if (e.target.classList.contains("delete-product")) {
    const deleteId = e.target.getAttribute("data-id");

    productsOnTheCart.forEach((value) => {
      if (value.id == deleteId) {
        let minus = parseFloat(value.price) * parseFloat(value.amount);
        totalPrice = totalPrice - minus;
        totalPrice = totalPrice.toFixed(2);
      }
    });

    finalPrice.innerHTML = totalPrice;
    productsOnTheCart = productsOnTheCart.filter(
      (product) => product.id !== deleteId
    );
  }
  addToSummary();
};

const clearHtml = () => {
  containerBuyCart.innerHTML = "";
};

const addToSummary = () => {
  clearHtml();
  productsOnTheCart.forEach((product) => {
    const { image, title, price, amount, id } = product;
    const productCard = document.createElement("article");
    productCard.innerHTML = `
    <article class="cart-product">
    <div class product-cart-data>
        <img src=${image} class="product-img-car"/>
          <div class="info-container">
            <div class="about">
              <h4 class="title">${title}</h4>
              <p class="price">${price}</p>
              <h5>Amount: ${amount}</h5>
            </div>
          </div>
          </div>
            <span class="delete-product" data-id="${id}">X</span>
        </article>
        `;

    containerBuyCart.appendChild(productCard);

    finalPrice.innerHTML = totalPrice;
  });
};

const readContent = (product) => {
  const infoProduct = {
    image: product.querySelector("article img").src,
    title: product.querySelector(".title").textContent,
    price: product.querySelector(".price").textContent,
    id: product.querySelector(".add-to-cart").getAttribute("data-id"),
    amount: 1,
  };

  totalPrice = parseFloat(totalPrice) + parseFloat(infoProduct.price);
  totalPrice = totalPrice.toFixed(2);

  const exist = productsOnTheCart.some(
    (product) => product.id === infoProduct.id
  );
  if (exist) {
    const pro = productsOnTheCart.map((product) => {
      if (product.id === infoProduct.id) {
        product.amount++;
      }
      return product;
    });
    productsOnTheCart = [...pro];
  } else {
    productsOnTheCart = [...productsOnTheCart, infoProduct];
  }

  addToSummary();
};

const addProduct = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("add-to-cart")) {
    const selectedProduct = e.target.parentElement;
    readContent(selectedProduct);
  }
};

const loadEventListeners = () => {
  allContainerProducts.addEventListener("click", addProduct);
  allContainerProducts2.addEventListener("click", addProduct);
  allContainerProducts3.addEventListener("click", addProduct);
  allContainerProducts4.addEventListener("click", addProduct);
  allContainerProducts5.addEventListener("click", addProduct);
  allContainerProducts6.addEventListener("click", addProduct);
  containerBuyCart.addEventListener("click", deleteProduct);
};
loadEventListeners();
