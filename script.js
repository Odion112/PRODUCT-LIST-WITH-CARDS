/*    ELEMENT SELECTION */

const addButtons =
document.querySelectorAll(".add-btn");

const increaseButtons =
document.querySelectorAll(".increase");

const decreaseButtons =
document.querySelectorAll(".decrease");

const emptyCart =
document.querySelector(".empty-cart");

const cartItems =
document.querySelector(".cart-items");

const cartTotal =
document.querySelector(".cart-total");

const cartCount =
document.querySelector("#cart-count");

const orderTotal =
document.querySelector("#order-total");

const cartIconBtn =
document.querySelector(".cart-icon-btn");

const mobileCartCount =
document.querySelector("#mobile-cart-count");

const mobileCartScreenCount =
document.querySelector("#mobile-cart-screen-count");

const cart =
document.querySelector(".cart");

const closeCart =
document.querySelector(".close-cart");

const mobileHeader =
document.querySelector(".mobile-header");


/*   CART DATA */

let totalItems = 0;

let totalPrice = 0;


/*   UPDATE CART DISPLAY */

function updateCartDisplay() {

  cartCount.textContent = totalItems;

  mobileCartCount.textContent = totalItems;

  if (mobileCartScreenCount) {
    mobileCartScreenCount.textContent = totalItems;
  }

  orderTotal.textContent =
  `$${totalPrice.toFixed(2)}`;

  if(totalItems === 0){

    emptyCart.classList.remove("hidden");

    cartItems.classList.add("hidden");

    cartTotal.classList.add("hidden");

  } else {

    emptyCart.classList.add("hidden");

    cartItems.classList.remove("hidden");

    cartTotal.classList.remove("hidden");

  }

}


/*  ADD TO CART */

addButtons.forEach(button => {

  button.addEventListener("click", () => {

    const card =
    button.closest(".card");

    const productName =
    card.dataset.name;

    const productPrice =
    Number(
      card
      .querySelector(".price")
      .textContent
      .replace("$","")
    );

    const controls =
    card.querySelector(".quantity-controls");

    const quantityDisplay =
    card.querySelector(".quantity");

    /*
      Prevent duplicate items.
    */

    const existingItem =
    document.querySelector(
      `[data-cart-name="${productName}"]`
    );

    if(existingItem){
      return;
    }

    /*
      Create cart item.
    */

    const cartItem =
    document.createElement("div");

    cartItem.classList.add("cart-item");

    cartItem.dataset.cartName =
    productName;

    cartItem.dataset.price =
    productPrice;

    cartItem.innerHTML = `
      <div class="cart-item-info">

        <h4>${productName}</h4>

        <div class="cart-details">

          <span class="qty">1x</span>

          <span class="unit-price">
            @ $${productPrice.toFixed(2)}
          </span>

          <span class="total-price">
            $${productPrice.toFixed(2)}
          </span>

        </div>

      </div>

      <button class="remove-item">

        <img
          src="images/icon-remove-item.svg"
          alt=""
        >

      </button>
    `;

    cartItems.appendChild(cartItem);

    totalItems++;

    totalPrice += productPrice;

    updateCartDisplay();

    card.classList.add("selected");

    button.classList.add("hidden");

    controls.classList.remove("hidden");

    quantityDisplay.textContent = 1;

    attachRemoveEvent(cartItem);

  });

});


/*  INCREASE QUANTITY */

increaseButtons.forEach(button => {

  button.addEventListener("click", () => {

    const card =
    button.closest(".card");

    const productName =
    card.dataset.name;

    const quantityDisplay =
    card.querySelector(".quantity");

    let quantity =
    Number(quantityDisplay.textContent);

    quantity++;

    quantityDisplay.textContent =
    quantity;

    const cartItem =
    document.querySelector(
      `[data-cart-name="${productName}"]`
    );

    const price =
    Number(cartItem.dataset.price);

    cartItem.querySelector(".qty")
    .textContent =
    `${quantity}x`;

    cartItem.querySelector(".total-price")
    .textContent =
    `$${(price * quantity).toFixed(2)}`;

    totalItems++;

    totalPrice += price;

    updateCartDisplay();

  });

});


/* DECREASE QUANTITY */

decreaseButtons.forEach(button => {

  button.addEventListener("click", () => {

    const card =
    button.closest(".card");

    const productName =
    card.dataset.name;

    const quantityDisplay =
    card.querySelector(".quantity");

    let quantity =
    Number(quantityDisplay.textContent);

    if(quantity <= 1){
      return;
    }

    quantity--;

    quantityDisplay.textContent =
    quantity;

    const cartItem =
    document.querySelector(
      `[data-cart-name="${productName}"]`
    );

    const price =
    Number(cartItem.dataset.price);

    cartItem.querySelector(".qty")
    .textContent =
    `${quantity}x`;

    cartItem.querySelector(".total-price")
    .textContent =
    `$${(price * quantity).toFixed(2)}`;

    totalItems--;

    totalPrice -= price;

    updateCartDisplay();

  });

});


/*  REMOVE ITEM*/

function attachRemoveEvent(cartItem){

  const removeButton =
  cartItem.querySelector(".remove-item");

  removeButton.addEventListener("click", () => {

    const productName =
    cartItem.dataset.cartName;

    const card =
    document.querySelector(
      `[data-name="${productName}"]`
    );

    const quantity =
    Number(
      card
      .querySelector(".quantity")
      .textContent
    );

    const price =
    Number(cartItem.dataset.price);

    totalItems -= quantity;

    totalPrice -=
    quantity * price;

    card.classList.remove("selected");

    card
    .querySelector(".add-btn")
    .classList.remove("hidden");

    card
    .querySelector(".quantity-controls")
    .classList.add("hidden");

    card
    .querySelector(".quantity")
    .textContent = 1;

    cartItem.remove();

    updateCartDisplay();

    

  });

} 


cartIconBtn.addEventListener("click", () => {

  cart.classList.add("active");

  mobileHeader.style.display = "none";

});


closeCart.addEventListener("click", () => {

  cart.classList.remove("active");

  mobileHeader.style.display = "flex";

});

 window.addEventListener("resize", () => {

  if(window.innerWidth > 768){

    cart.classList.remove("active");

  }

});