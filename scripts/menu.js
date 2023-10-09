let productsOnTheCart = [];
let totalPrice = 0;


const listElements = document.querySelectorAll(".product-click");
const containerBuyCart = document.querySelector(".products-to-buy");
const finalPrice = document.querySelector(".final-price");
const allContainerProducts = document.querySelector(".show");
const allContainerProducts1 = document.querySelector(".show1");
const allContainerProducts2 = document.querySelector(".show2");
const allContainerProducts3 = document.querySelector(".show3");
const allContainerProducts4 = document.querySelector(".show4");
const allContainerProducts5 = document.querySelector(".show5");
const allContainerProducts6 = document.querySelector(".show6");
const payButton = document.querySelector("#pay");

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

payButton.addEventListener("click", () => {
  console.log(productsOnTheCart);

  let url = "http://127.0.0.1:5500/";
  productsOnTheCart.forEach((product) => {
    let keys = `?name=${product.title.split(" ")[0]}?price=${
      product.price
    }?amount=${product.amount}`;
    url += keys;
  });

  window.location.href = url;
});

const xd = async (id = "no-id") => {
  let response;
  response = await fetch(`http://localhost:8080/api/hello`);
  const {entry, desert} = await response.json();

  entry.forEach(entryO => {
    const html = `
    <article class="product-inside">
      <img src="${entryO.image}" class="product-img" />
      <div class="info-container">
        <div class="about">
          <h4 class="title">${entryO.name}</h4>
          <p class="price">${entryO.price}</p>
        </div>
        <p class="product-description">
          ${entryO.description}
        </p>
      </div>
      <div class="add-to-cart" data-id="${entryO.id}">Añadir al carrito</div>
    </article>
  `;
    
    allContainerProducts1.innerHTML += html 
  });
  console.log(entry);
}

const public = async () => {

  const data = {
    quantity: [5,1,2],
    ids: [1,2,3]
  }
  let response;
  response = await fetch(`http://localhost:8080/api/product`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json"}
  });
  const json = await response.json();
  console.log(json);
}

xd();
//public();
