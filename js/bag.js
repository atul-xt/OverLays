// let bagItemObjects;
onLoad();

function onLoad() {
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary() {
    const bagSummaryElement = document.querySelector(".checkout");
    let totalMRP = 0;

    if(!bagSummaryElement){
        return;
    }

    bagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.price;
    })

    bagSummaryElement.innerHTML = `
        <p>Shipping & taxes calculated at checkout</p>
        <a href="delivery.html"><button>Checkout ∎ ₹ ${totalMRP}</button></a>`
}

function loadBagItemObjects() {
    bagItemObjects = bagItems.map(itemId => {
        for(let i = 0; i < items.length; i++) {
            if (itemId == items[i].id) {
                return items[i];
            }
        }
    });
}

function displayBagItems(){
    const containerElement = document.querySelector(".cart-items");
    let innerHTML = '';
    bagItemObjects.forEach(bagItem => {
        innerHTML += generateItemHTML(bagItem);
    });
    containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId)
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    loadBagItemObjects();
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