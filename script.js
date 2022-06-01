let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");
let boxContainer = document.querySelector(".box-container");
let buttonsDom = [];
let cart = [];
menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};
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

  storeDishes(item) {
    localStorage.setItem("item", JSON.stringify(item));
  }
  setCartToStorage(item) {
    if (localStorage.key("cartitem") == "") {
      return;
    } else {
      localStorage.setItem("cartitem");
    }
  }
  getCartFromLocaStorage() {
    if (localStorage.key("cartitem") != "") {
      let fetchedItem = JSON.parse(localStorage.getItem("cartitem"));
      this.updateDisplay(fetchedItem);
      const buttons2 = [...document.querySelectorAll(".orderbtn")];
      buttons2.forEach((btn) => {});
    }
  }
  updateDisplay(fetchedItem) {
    let CartDiv = document.getElementById("cartDiv");
    let user = "";
    fetchedItem.forEach((displayCart) => {
      user += `
              <div class="item">
            <div class="img">
                <img src=${displayCart.img} alt="">
            </div>
            <div class="details">
                <p class="name">${displayCart.names}</p>
                <p class="price">${displayCart.price}</p>
            </div>
            <div class="remove-btn btn">remove</div>
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
        event.target.disabled = true;
        let fetchProductForCart = new FetchProduct();
        let cartProducts = fetchProductForCart
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
