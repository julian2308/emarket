const main = document.querySelector(".orders");
const miBoton = document.querySelector("#logout")


function logOut (event){
    event.preventDefault()
    //window.location.href = "https://julian2308.github.io/emarket/"
    sessionStorage.removeItem("token");
    alert("Cerró sesión")
    window.location.href = "https://julian2308.github.io/emarket/"
}

async function login(e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${email}:${password}`),
    },
  };
  let xd = await fetch(
    `https://ruta66-jdag-pnt20232-unisabana.onrender.com/api/login`,
    requestOptions
  ).catch((e) => {
    console.log(e);
  });
  xd.json()
    .then((response) => {
      sessionStorage.setItem("token", response.token);
      if (response.message != "Usuario autenticado") {
        alert("Error en las credenciales");
      } else {
        getProduts("pending");
        alert(response.message);
      }
    })
    .catch((e) => {
      alert(e);
    });
}

const searchByName = (event) => {
  event.preventDefault();
  main.innerHTML = "";
  let name = document.getElementById("name").value;
  getByName(name);
};

const changeSelect = () => {
  let value = document.getElementById("state").value;
  main.innerHTML = "";
  console.log(value);
  getProduts(value);
};

const changeState = (id) => {
  const token = sessionStorage.getItem("token");
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  fetch(
    `https://ruta66-jdag-pnt20232-unisabana.onrender.com/api/pending?id=${id}`,
    requestOptions
  );
  setTimeout(() => {
    main.innerHTML = "";
  }, "300");
  setTimeout(() => {
    getProduts();
  }, "500");
};

const getProduts = async (state) => {
  const token = sessionStorage.getItem("token");
  console.log(token, "token");
  let response;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  response = await fetch(
    `https://ruta66-jdag-pnt20232-unisabana.onrender.com/api/list?current-state=${state}`,
    requestOptions
  );
  finalRespone = await response.json();
  console.log(finalRespone);

  finalRespone.forEach((order) => {
    let orders = "";
    order.products.forEach((product) => {
      const orderIndiviual = `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.pivot.quantity}</td>
        </tr>
    `;
      orders += orderIndiviual;
    });

    const html = `
    <section class="order">
    <div class="userInformation">
        <p>${order.customer_name}</p>
        <p>${order.customer_email}</p>
        <p>${order.customer_phone}</p>
        <p>${order.customer_address}</p>

    </div>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            ${orders}
        </tbody>
    </table>
    <div class="orderInformation">
        <button onclick="changeState(${order.id})">${order.state}</button>
        <p>${order.total}</p>
    </div> 
</section>
    `;
    main.innerHTML += html;
  });
};

const getByName = async (name) => {
  const token = sessionStorage.getItem("token");
  let response;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  response = await fetch(
    `https://ruta66-jdag-pnt20232-unisabana.onrender.com/api/list-name?name=${name}`,
    requestOptions
  );
  finalRespone = await response.json();
  console.log(finalRespone);

  finalRespone.forEach((order) => {
    let orders = "";
    order.products.forEach((product) => {
      const orderIndiviual = `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.pivot.quantity}</td>
        </tr>
    `;
      orders += orderIndiviual;
    });

    const html = `
    <section class="order">
    <div class="userInformation">
        <p>${order.customer_name}</p>
        <p>${order.customer_email}</p>
        <p>${order.customer_phone}</p>
        <p>${order.customer_address}</p>

    </div>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            ${orders}
        </tbody>
    </table>
    <div class="orderInformation">
        <button onclick="changeState(${order.id})">${order.state}</button>
        <p>${order.total}</p>
    </div> 
</section>
    `;
    main.innerHTML += html;
  });
};

getProduts("pending");
