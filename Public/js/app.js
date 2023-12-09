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




// api fetching work 

const register = document.getElementById('register');
const firstNameRegister = document.getElementById('first-name');
const lastNameRegister = document.getElementById("last-name");
const emailRegister = document.getElementById('login-email');
const passwordRegister = document.getElementById('login-pass');



register.addEventListener('click', async () => {
    console.log(firstNameRegister, lastNameRegister, emailRegister, passwordRegister);
    let firstName = firstNameRegister.value;
    let lastName = lastNameRegister.value;
    let email = emailRegister.value;
    let password = passwordRegister.value;


    const userData = {
        firstName,
        lastName,
        email,
        password
    };

    console.log(userData);

    try {
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        };

        const response = await fetch('http://localhost:3000/register', requestOptions);

        if (!response.ok) {
            const responseData = await response.json();

            if (response.status === 400) {
                if (responseData.error === "User with this email already exists") {
                    alert("User with this email already exists");
                    email = userEmail.value = "";
                    userEmail.style.outline = "2px solid rgba(255, 0, 0, 0.8)"
                } else {
                    // Display a more specific error message for other 400 Bad Request scenarios
                    alert(`Bad Request: ${responseData.error || "Invalid request"}`);
                }
            } else {
                // Display a generic error message for other server errors
                alert("Registration failed. Please try again later.");
                console.error(`Server error: ${responseData.error || response.statusText}`);
            }
        } else {
            // Successful registration
            const responseData = await response.json();
            // Handle successful response if needed
            container.classList.remove("right-panel-active");
            console.log("Registration successful:", responseData);
            alert("Registration successful!");
        }
    } catch (error) {
        // Handle other types of errors (e.g., network issues)
        console.error('Fetch error:', error);
        alert("Registration failed. Please check your internet connection and try again.");
    }

});