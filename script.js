const navList = document.querySelector(".nav__list");
const hamburger = document.querySelector(".header__hamburger");
const incBtn = document.querySelector(".product__price-inc");
const decBtn = document.querySelector(".product__price-dec");
const totalPrice = document.querySelector(".product__price-total");
const cart = document.querySelector(".nav__img-cart-icon");
const addtocartBtn = document.querySelector(".product__btn-txt");
const productPrice = document.querySelector(".product__price");
const hero = document.querySelector(".hero");
const heroImg = document.querySelector(".hero__image");
const nextBtn = document.querySelector(".hero__next-btn");
const previousBtn = document.querySelector(".hero__previous-btn");
const thumbnail = document.querySelectorAll(".hero__thumbnail");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const windowPrevBtn = document.querySelector(".hero__previous-btn-window");
const windowNextBtn = document.querySelector(".hero__next-btn-window");
const windowHeroImg = document.querySelector(".hero__image-window");
const thumbnailWindow = document.querySelectorAll(".hero__thumbnail-window");
const cartChip = document.querySelector(".cart-chip")
const cartChipTxt = document.querySelector(".cart-chip__txt")

const emptyCartHTML = `<div class="card-cart">
                          <h2 class="card__cart-heading">Cart</h2>
                          <hr>
                          <p class="cart__card-txt card-text--empty">Your cart is empty</p>
                        </div>`;

const cartWithItemsHTML = `<div class="card-cart">
                              <h2 class="card__cart-heading">Cart</h2>
                              <hr>
                              <div class="card__cart-info">
                                <img class="card__cart-product" src="images/image-product-1.jpg" alt="">
                                <p class="cart__card-txt">Fall Limited Edition Sneakers <br>
                                  <span class="cart__card-price">$125.00</span> x <span class="cart__card-qty">3</span> <strong class="cart__card-total-price">$375.00</strong></p>
                                  <div>
                                    <img class="cart__card-delete" src="images/icon-delete.svg" alt="">
                                  </div>
                                  </div>
                              <button class="btn btn-txt btn--cart">Checkout</button>
                            </div>`;

let count = 0;
let currentImgIndex = 1;

const updateCart = function (isEmpty) {
  const existingCart = document.querySelector(".card-cart");
  if (existingCart) {
    existingCart.remove();
  }

  if (isEmpty) {
    hero.insertAdjacentHTML("beforebegin", emptyCartHTML);
  } else {
    hero.insertAdjacentHTML("beforebegin", cartWithItemsHTML);
  }
};

const updateImg = function () {
  
  heroImg.setAttribute("src", `images/image-product-${currentImgIndex}.jpg`);
};


const updateImgWindow = function () {
  
  windowHeroImg.setAttribute("src", `images/image-product-${currentImgIndex}.jpg`);
};

const updateImgPrev = function() {
  if (currentImgIndex > 1) {
    currentImgIndex--;
  };
}

const updateImgNext = function() {
  if (currentImgIndex < 4) {
    currentImgIndex++;
  }
}

const updateDisplay = function () {
  totalPrice.textContent = count;
};

const increaseCounter = function () {
  count += 1;
  updateDisplay();
};

const decreaseCounter = function () {
  if (count <= 0) {
    updateDisplay();
  } else {
    count -= 1;
    updateDisplay();
  }
};

const openModal = function(){
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

const closeModal = function(){
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

hamburger.addEventListener("click", () => {
  const isVisible = navList.getAttribute("data-visibility");

  if (isVisible === "false") {
    navList.setAttribute("data-visibility", "true");
    hamburger.setAttribute("aria-expanded", "true");
  } else if (isVisible === "true") {
    navList.setAttribute("data-visibility", "false");
    hamburger.setAttribute("aria-expanded", "false");
  }
});

addtocartBtn.addEventListener("click", () => {
  updateCart(false);
  const cartPrice = document.querySelector(".cart__card-price");
  const cartqty = document.querySelector(".cart__card-qty");
  const cartTotalPrice = document.querySelector(".cart__card-total-price");
  const deleteCard = document.querySelector(".cart__card-delete");

  const quantity = +totalPrice.textContent;
  const price = +productPrice.textContent.split("$")[1];

  const total = price * quantity;
  cartPrice.textContent = "$" + price;
  cartqty.textContent = quantity;
  cartTotalPrice.textContent = "$" + total + ".00";
  totalPrice.textContent = 0;
  cartChip.classList.remove("hidden");
  cartChipTxt.textContent = quantity

  deleteCard.addEventListener("click", () => {
    updateCart(true);
    count = 0;
    cartChip.classList.add("hidden");
  });
});

cart.addEventListener("mouseover", () => {
  const cartCard = document.querySelector(".card-cart");

  if (!cartCard) {
    if (count > 0) {
      updateCart(false);
    } else {
      updateCart(true);
    }
    const newCartCard = document.querySelector(".card-cart");
    newCartCard.classList.remove("hidden");
  } else {
    cartCard.classList.remove("hidden");
  }
});

cart.addEventListener("mouseout", () => {
  const cartCard = document.querySelector(".card-cart");

  if (cartCard) {
    cartCard.classList.add("hidden");
  }
});

heroImg.addEventListener("click", () => {
  openModal();
});

closeBtn.addEventListener("click", () => {
  closeModal();
})

 previousBtn.addEventListener("click", () => {
  updateImgPrev();
  updateImg();
});

windowPrevBtn.addEventListener("click", () => {
  updateImgPrev();
  updateImgWindow();
})

nextBtn.addEventListener("click", () => {
  updateImgNext();
  updateImg();
});

windowNextBtn.addEventListener("click", () => {
  updateImgNext();
  updateImgWindow();
})

thumbnail.forEach((ele, idx) => {
  ele.addEventListener("click", () => {

    thumbnail.forEach(thumb => {
      thumb.classList.remove("hero__thumbnail-active");
    });
    heroImg.setAttribute("src", `images/image-product-${idx+1}.jpg`);
    ele.classList.add("hero__thumbnail-active");
  });
});

thumbnailWindow.forEach((ele, idx) => {
  ele.addEventListener("click", () => {

    thumbnailWindow.forEach(thumb => {
      thumb.classList.remove("hero__thumbnail-active");
    });
    windowHeroImg.setAttribute("src", `images/image-product-${idx+1}.jpg`);
    ele.classList.add("hero__thumbnail-active");
  });
});

incBtn.addEventListener("click", increaseCounter);
decBtn.addEventListener("click", decreaseCounter);
