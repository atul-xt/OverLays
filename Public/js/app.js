let bagItems;
onLoad();
console.log("hi I am yatish");
function onLoad() {
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayBagIcon();
    msgPopup();
    cartPopup();
    searchPopup();
    swiperJS();
    popUpNavBar();
    displayProducts();
}

function addToBag(itemId) {
    bagItems.push(itemId);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon() {
    const bagItemCountElement = document.querySelector('.bag-item-count');
    const cartDetails = document.querySelector('.cart-details');
    const checkout = document.querySelector('.checkout');
    if (!cartDetails) {
        return;
    }
    if (!bagItemCountElement) {
        return;
    }

    if (bagItems.length > 0) {
        bagItemCountElement.style.visibility = "visible";
        bagItemCountElement.innerText = bagItems.length;
    } else {
        checkout.style.visibility = "hidden";
        bagItemCountElement.style.visibility = "hidden";
        cartDetails.style.display = "block";
    }
}

function msgPopup() {
    const msg = document.querySelector("#msg");
    const close = document.querySelector("#message-popup-close");
    const bg = document.querySelector(".gray-bg");
    const msgPopup = document.querySelector(".message-popup");

    msg.addEventListener("click", function () {
        bg.style.display = "block";
        msgPopup.style.display = "block";
    })

    close.addEventListener("click", function () {
        bg.style.display = "none";
        msgPopup.style.display = "none";
    })
}

function cartPopup() {
    const cart = document.getElementById("cart");
    const close = document.getElementById("cart-popup-close");
    const bg = document.querySelector(".light-bg");

    cart.addEventListener("click", function () {
        bg.style.display = "block";
        document.querySelector("body").style.overflow = "hidden";
    })

    close.addEventListener("click", function () {
        bg.style.display = "none";
        document.querySelector("body").style.overflow = "auto";
    })
}

function searchPopup() {
    const search = document.getElementById("input");
    const close = document.getElementById("search-popup-close");

    search.addEventListener("click", function () {
        document.querySelector(".dark-bg").style.display = "block";
        document.querySelector("body").style.overflow = "hidden";
    })

    close.addEventListener("click", function () {
        document.querySelector(".dark-bg").style.display = "none";
        document.querySelector("body").style.overflow = "auto";
    })
}

function swiperJS() {
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        grabCursor: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

function popUpNavBar() {
    let lastScroll = 0;
    const navBar = document.querySelector(".background");
    window.addEventListener("scroll", function () {
        let scrollTop = this.window.pageYOffset || this.document.documentElement.scrollTop;
        if (scrollTop > lastScroll) {
            navBar.style.top = "-150px";
        } else {
            navBar.style.top = "0";
        }
        lastScroll = scrollTop;
    })

}

function displayProducts() {
    const itemsContainerElement = document.querySelector("#hero-imgs");
    let innerHTML = '';
    heroImgs.forEach(item => {
        innerHTML += `<div class="product">
        <img src="${item.item_img}" alt="">
        <div class="content">
            <h5>${item.item_name}</h5>
            <h5>₹${item.price}</h5>
            <button class="btn-add-cart" onclick="addToBag(${item.id})">Add to cart</button>
        </div>
    </div>`;
    });

    itemsContainerElement.innerHTML = innerHTML;
}

