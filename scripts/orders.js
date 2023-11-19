const main = document.querySelector(".orders");
const changeState = (id) => {
    console.log(id);
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:8080/api/pending?id=${id}`,requestOptions);
    main.innerHTML = ""
    getProduts();
}

const getProduts = async () => {
    let response;
    response = await fetch(`http://localhost:8080/api/list?current-state=resolved`);
    finalRespone = await response.json()
    console.log(finalRespone)

    finalRespone.forEach(order =>{

        let orders ="";
        order.products.forEach(product => {

        const orderIndiviual = `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.pivot.quantity}</td>
        </tr>
    `
            orders += orderIndiviual
            
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

    
    })
    

}

getProduts();

