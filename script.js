let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");
let boxContainer = document.querySelector(".box-container");
let MainCartDiv = document.getElementById("cartDiv");
let buttonsDom = [];
let closeCart = document.querySelector(".close-cart");
let cartBasket = document.getElementById("cart-basket");

let cart = [];
menu.onclick = () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
};

function toggleCartDiv() {
    if (MainCartDiv.classList.contains("cart-div")) {
        MainCartDiv.classList.remove("cart-div");
        MainCartDiv.classList.add("updatedCartDiv");
    } else {
        MainCartDiv.classList.remove("updatedCartDiv");
        MainCartDiv.classList.add("cart-div");
    }
}
cartBasket.addEventListener("click", toggleCartDiv);
closeCart.addEventListener("click", toggleCartDiv);
let section = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header .navbar a");

class FetchProduct {
    async getProducts() {
        try {
            let food = await fetch("products.json");
            let toJson = await food.json();
            let dishes = toJson.dishes;
            return dishes;
        } catch (error) {
            console.log(error);
        }
    }
}

class Cart {
    createDishDiv(dishes) {
        let box = "";
        for (var i = 0; i < dishes.length; i++) {
            let img = dishes[i].img;
            let name = dishes[i].name;
            let price = dishes[i].price;
            let id = dishes[i].id;

            box += `<div class="box">
                <a href="#"><i class="fa fa-heart"></i></a>
                <a href="#"><i class="fa fa-eye"></i></a>
                <img src=${img}alt="product${name}">
                <h3>${name}</h3>
                <div class="stars">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-half-alt"></i>
                </div>
                <span><i class='fa fa-&#8358'>&#8358;</i> ${price}</span>
                <button class="btn orderbtn" data-id=${id}>order here</button>
            </div>`;
        }
        boxContainer.innerHTML = box;
    }
    removeButton() {
        const removeBtn = [...document.querySelectorAll(".remove-btn")];
        removeBtn.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                let id = e.target.dataset.id;
                let fetchedItem = JSON.parse(localStorage.getItem("cartitem"));
                let newitem = fetchedItem.filter((item) => item.id != id);
                console.log(newitem);
                this.setCartToStorage(newitem);
                this.getCartFromLocaStorage();
                let allOrderBtn = document.querySelectorAll(".orderbtn");
                let allOrderBtnID = allOrderBtn.forEach((btn) => {
                    if (btn.dataset.id == id) {
                        btn.disabled = false;
                        btn.innerText = "order here";
                        console.log(newitem);
                    }
                });
            });
        });
    }
    storeDishes(item) {
        localStorage.setItem("item", JSON.stringify(item));
    }
    setCartToStorage(item) {
        localStorage.setItem("cartitem", JSON.stringify(item));
    }
    getCartFromLocaStorage() {
        if (localStorage.key("cartitem") != "") {
            let fetchedItem = JSON.parse(localStorage.getItem("cartitem"));
            this.updateDisplay(fetchedItem);
            const buttons2 = [...document.querySelectorAll(".orderbtn")];
            buttons2.forEach((btn) => {});
        }
        this.removeButton();
    }
    updateDisplay(fetchedItem) {
        let CartDiv = document.getElementById("itemDiv");
        let user = "";
        fetchedItem.forEach((displayCart) => {
            user += `
              <div class="item">
            <div class="img">
                <img src=${displayCart.img} alt="">
            </div>
            <div class="details">
                <p class="name">${displayCart.name}</p>
                <p class="price">&#8358;${displayCart.price}</p>
            </div>
           <button class="btn remove-btn" data-id="${displayCart.id}">remove item</button>
        </div>
       
            `;
        });
        CartDiv.innerHTML = user;
    }
    callDishes(dishes) {
        this.createDishDiv(dishes);
        this.storeDishes(dishes);
    }
    getOrderBtn() {
        const buttons = [...document.querySelectorAll(".orderbtn")];
        buttonsDom = buttons;
        buttons.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                let id = btn.dataset.id;
                event.target.innerText = "In Cart";
                // event.target.disabled = true;
                let fetchProductForCart = new FetchProduct();
                fetchProductForCart
                    .getProducts()
                    .then((dishes) => this.CartCallDishes(id, dishes));
            });
        });
    }
    CartCallDishes(id, dishes) {
        let perCartItem = dishes.find((perCart) => perCart.id == id);
        cart = [...cart, perCartItem];
        this.setCartToStorage(cart);
        this.getCartFromLocaStorage();
    }
}
window.addEventListener("DOMContentLoaded", () => {
    let cart = new Cart();
    let fetchProduct = new FetchProduct();
    fetchProduct
        .getProducts()
        .then((dishes) => cart.callDishes(dishes))
        .then(() => {
            cart.getOrderBtn();
            cart.getCartFromLocaStorage();
        });
});

window.onscroll = () => {
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");

    section.forEach((sec) => {
        let top = window.scrollY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute("id");

        if ((top) => offset && top < offset + height) {
            navLinks.forEach((links) => {
                links.classList.remove("active");
                console.log(
                    document.querySelector("header .navbar a[href*=" + id + "]")
                );
                document
                    .querySelector("header .navbar a[href*=" + id + "]")
                    .classList.add("active");
            });
        }
    });
};
document.querySelector("#search-icon").onclick = () => {
    document.querySelector("#search-form").classList.toggle("active");
};
document.querySelector("#close").onclick = () => {
    document.querySelector("#search-form").classList.remove("active");
};
var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});