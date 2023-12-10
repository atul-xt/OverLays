let bagItems;
let bagItemObjects;
onLoad();

function onLoad() {
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    loadBagItemsObjects()
    displayBagItems();
    displayBagSummary();
    displayBagIcon();
    displayDeliveryItems();
    displayDeliveryDetails();
    msgPopup();
    cartPopup();
    searchPopup();
    popUpNavBar();
    displayShopAll();
    displayBottoms();
    displayCropTop();
    displayEssential();
    displayMen();
    displayPoloShirt();
    displayRichCotton();
    displayShirt();
    displaySweatshirt();
    displayTshirt();
    displayWomen();
}

function displayBagSummary() {
    const bagSummaryElement = document.querySelector(".checkout");
    let totalMRP = 0;

    if (!bagSummaryElement) {
        return;
    }

    bagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.price;
    })

    bagSummaryElement.innerHTML = `
        <p>Shipping & taxes calculated at checkout</p>
        <a href="delivery.html"><button>Checkout ∎ ₹ ${totalMRP}</button></a>`
}

function displayDeliveryDetails() {
    const total = document.querySelector('.total');
    let totalMRP = 0;

    if (!total) {
        return;
    }

    bagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.price;
    })

    total.innerHTML = `
    <div>
        <span>Subtotal</span>
        <span>₹${totalMRP}.00</span>
        </div>
    <div>
        <span>Shipping</span>
        <span>To be calculated</span>
    </div>
    <div class="final-amount">
        <span>Total</span>
        <span>₹${totalMRP}.00</span>
    </div>`
}

function loadBagItemsObjects() {
    bagItemObjects = bagItems.map(itemId => {
        for (let i = 0; i < items.length; i++) {
            if (itemId == items[i].id) {
                return items[i];
            }
        }
    });
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

function displayBagItems() {
    const containerElement = document.querySelector(".cart-items");

    if (!containerElement) {
        return;
    }

    let innerHTML = '';
    bagItemObjects.forEach(bagItem => {
        innerHTML += generateItemHTML(bagItem);
    })
    containerElement.innerHTML = innerHTML;
}

function displayDeliveryItems() {
    const Container = document.querySelector('.items');
    if (!Container) {
        return;
    }
    let innerHTML = '';
    bagItemObjects.forEach(item => {
        innerHTML += `
        <div class="item">
            <img src="${item.item_img}" alt="">
            <div>
                <h4>${item.item_name}</h4>
                <p>Price: ₹${item.price}.00</p>
            </div>
        </div>`
    });
    Container.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId)
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    loadBagItemsObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}

function generateItemHTML(item) {
    return `
    <div class="cart-item">
        <img src="${item.item_img}" alt="">
        <div class="cart-heading">
            <h4>${item.item_name}</h4>
            <h4>₹ ${item.price}</h4>
        </div>
        <img onclick="removeFromBag(${item.id})" id="close" src="./media/close.png" alt="">
    </div>`
}

function msgPopup() {
    const msg = document.querySelector("#msg");
    const close = document.querySelector("#message-popup-close");

    if (!msg) {
        return;
    }

    msg.addEventListener("click", function () {
        document.querySelector(".gray-bg").style.display = "block";
        document.querySelector(".message-popup").style.display = "block";
    })

    close.addEventListener("click", function () {
        document.querySelector(".gray-bg").style.display = "none";
        document.querySelector(".message-popup").style.display = "none";
    })
}

function cartPopup() {
    const cart = document.getElementById("cart");
    const close = document.getElementById("cart-popup-close");
    const bg = document.querySelector(".light-bg");

    if (!cart) {
        return;
    }

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

    if (!search) {
        return;
    }
    search.addEventListener("click", function () {
        document.querySelector(".dark-bg").style.display = "block";
        document.querySelector("body").style.overflow = "hidden";
    })

    close.addEventListener("click", function () {
        document.querySelector(".dark-bg").style.display = "none";
        document.querySelector("body").style.overflow = "auto";
    })
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

function displayShopAll() {
    const itemsContainerElement = document.getElementById("shop-all");
    if (!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    shopAll.forEach(item => {
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

function displayBottoms() {
    const itemsContainerElement = document.querySelector("#bottom-imgs");
    if (!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    maleBottoms.forEach(item => {
        innerHTML += `<div class="product">
        <img src="${item.item_img}" alt="">
        <div class="content">
            <h5>${item.item_name}</h5>
            <h5>₹${item.price}</h5>
            <button class="btn-add-cart" onclick="addToBag(${item.id})">Add to cart</button>
        </div>
    </div>`;
    });
    femaleBottoms.forEach(item => {
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

function displayCropTop() {
    const itemsContainerElement = document.querySelector("#crop-top");
    if (!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    cropTops.forEach(item => {
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

function displayEssential() {
    const itemsContainerElement = document.querySelector("#essential");
    if (!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    hoodies.forEach(item => {
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

function displayMen() {
    const itemsContainerElement = document.querySelector("#men");
    if (!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    tShirts.forEach(item => {
        innerHTML += `<div class="product">
        <img src="${item.item_img}" alt="">
        <div class="content">
            <h5>${item.item_name}</h5>
            <h5>₹${item.price}</h5>
            <button class="btn-add-cart" onclick="addToBag(${item.id})">Add to cart</button>
        </div>
    </div>`;
    });
    hoodies.forEach(item => {
        innerHTML += `<div class="product">
        <img src="${item.item_img}" alt="">
        <div class="content">
            <h5>${item.item_name}</h5>
            <h5>₹${item.price}</h5>
            <button class="btn-add-cart" onclick="addToBag(${item.id})">Add to cart</button>
        </div>
    </div>`;
    });
    maleBottoms.forEach(item => {
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

function displayPoloShirt() {
    const itemsContainerElement = document.querySelector("#polo-shirts");
    if (!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    poloTshirts.forEach(item => {
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

function displayRichCotton() {
    const itemsContainerElement = document.querySelector("#rich");
    if (!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    hoodies.forEach(item => {
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

function displayShirt() {
    const itemsContainerElement = document.querySelector("#shirt");
    if (!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    osTshirts.forEach(item => {
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

function displaySweatshirt() {
    const itemsContainerElement = document.querySelector("#sweatshirt");
    if (!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    maleSweatshirts.forEach(item => {
        innerHTML += `<div class="product">
        <img src="${item.item_img}" alt="">
        <div class="content">
            <h5>${item.item_name}</h5>
            <h5>₹${item.price}</h5>
            <button class="btn-add-cart" onclick="addToBag(${item.id})">Add to cart</button>
        </div>
    </div>`;
    });
    femaleSweatshirts.forEach(item => {
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

function displayTshirt() {
    const itemsContainerElement = document.querySelector("#tshirt");
    if (!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    tShirts.forEach(item => {
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

function displayWomen() {
    const itemsContainerElement = document.querySelector("#women");
    if (!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    cropTops.forEach(item => {
        innerHTML += `<div class="product">
        <img src="${item.item_img}" alt="">
        <div class="content">
            <h5>${item.item_name}</h5>
            <h5>₹${item.price}</h5>
            <button class="btn-add-cart" onclick="addToBag(${item.id})">Add to cart</button>
        </div>
    </div>`;
    });
    femaleBottoms.forEach(item => {
        innerHTML += `<div class="product">
        <img src="${item.item_img}" alt="">
        <div class="content">
            <h5>${item.item_name}</h5>
            <h5>₹${item.price}</h5>
            <button class="btn-add-cart" onclick="addToBag(${item.id})">Add to cart</button>
        </div>
    </div>`;
    });
    femaleSweatshirts.forEach(item => {
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


// purchase Api Calling
const purchasebutton = document.querySelector('#purchase-button');
const FullName = document.querySelector('#FullName');
const FullAddress = document.querySelector('#FullAddress');
const Address2 = document.querySelector('#Address2');
const MobileNumber = document.querySelector('#MobileNumber');
const Pincode = document.querySelector('#Pincode');
const City = document.querySelector('#City');
const State = document.querySelector('#State');
const semail = document.querySelector('#s-email');
const cashOnDelevery = document.querySelector('#cod');
const online = document.querySelector('#online');
purchasebutton.addEventListener('click', async () => {
    let fullName = FullName.value;
    let address1 = FullAddress.value;
    let address2 = Address2.value;
    let mobileNumber = MobileNumber.value;
    let pincode = Pincode.value;
    let city = City.value;
    let state = State.value;
    let email = semail.value;
    let paymentType;
    let cash = cashOnDelevery.value;
    let paymentOnline = online.value;

    FullName.style.outline = "none";
    FullAddress.style.outline = "none";
    Address2.style.outline = "none";
    MobileNumber.style.outline = "none";
    Pincode.style.outline = "none";
    City.style.outline = "none";
    State.style.outline = "none";
    semail.style.outline = "none";

    if (!fullName) {
        FullName.value = ""
        FullName.style.outline = "2px solid red";
        return alert('Missing FullName');
    }
    if (!address1) {
        FullAddress.value = ""
        FullAddress.style.outline = "2px solid red";
        return alert('Missing Full-Address');
    }
    if (!address2) {
        Address2.value = ""
        Address2.style.outline = "2px solid red";
        return alert('Missing Address-2');
    }
    if (!mobileNumber) {
        MobileNumber.value = ""
        MobileNumber.style.outline = "2px solid red";
        return alert('Missing MobileNumber');
    }
    if (!pincode) {
        Pincode.value = ""
        Pincode.style.outline = "2px solid red";
        return alert('Missing Pincode');
    }
    if (!city) {
        City.value = ""
        City.style.outline = "2px solid red";
        return alert('Missing City');
    }
    if (!state) {
        State.value = ""
        State.style.outline = "2px solid red";
        return alert('Missing State');
    }
    if (!email) {
        semail.value = ""
        semail.style.outline = "2px solid red";
        return alert('Missing Email');
    }
    if (!paymentOnline && cashOnDelevery) {
        return paymentType = cashOnDelevery
    }
    if (!cashOnDelevery && paymentOnline) {
        return paymentType = paymentOnline;

    }
    // if (cashOnDelevery && paymentOnline) {
    //     return alert('Can not select Both Options');

    // }
    // if (!cashOnDelevery && !paymentOnline) {
    //     return alert('Please select Payement option');
    // }

    const Data = {
        productDetails: bagItemObjects,
        shippingDetails: {
            fullName,
            address1,
            address2,
            mobileNumber,
            pincode,
            city,
            state,
            email,
            paymentType
        }
    };
    // console.log(Data);
    const jwttoken = localStorage.getItem('jwtToken');
    try {
        console.log(bagItemObjects);
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${jwttoken}`
            },
            body: JSON.stringify({
                productDetails: bagItemObjects,
                shippingDetails: {
                    fullName,
                    address1,
                    address2,
                    mobileNumber,
                    pincode,
                    city,
                    state,
                    email,
                    paymentType
                }
            }),
        };
        
        const response = await fetch('http://localhost:3000/shipping/makeOrder', requestOptions);

        if (!response.ok) {
            
            const responseData = await response.json();
            if (response.status === 422 && responseData.error === "Missing Field") {
                alert("Backend Not get data")
            } else if (response.status === 400 && responseData.error === "Error creating user") {
                alert('Purchase Failed : data not saving in backend');
            } else {
                // Display a generic error message for other server errors
                alert("Purchase failed. Please try again later.");
            }
        } else {
            const responseData = await response.json();
            alert('Product Puchased Successfully');
            console.log(responseData);
        }
    } catch (error) {
        // Handle other types of errors (e.g., network issues)
        console.error('Fetch error:', error);
        alert("Login failed. Please check your internet connection and try again.");
    }
})