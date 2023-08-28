const listElements = document.querySelectorAll(".product-click")

listElements.forEach((listElement) => {
    listElement.addEventListener("click", () => {

        listElement.classList.toggle("hello")

        let height = 0
        let menu = listElement.nextElementSibling;
        console.log(menu);
        if(menu.clientHeight == "0"){

            height = menu.scrollHeight;
        }

        menu.style.height = `${height}px`
    })

})