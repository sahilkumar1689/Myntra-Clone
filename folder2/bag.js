// let arrBag;
onLoad();
function onLoad() {
    setBagItems();
    showBagSummary();
}

function showBagCount(){
    let bagCount = document.querySelector(".bagItemsNumber");
    let arrBag = JSON.parse(localStorage.getItem("itemIndex"));
    if(arrBag.length>0){
        bagCount.style.display = "block";
        bagCount.innerHTML=arrBag.length;
    }else{
        bagCount.style.display="none";
    }
}

function deleteItem(deleteIndex){
    let arrBag = JSON.parse(localStorage.getItem("itemIndex"));
    console.log(deleteIndex);
    arrBag.splice(deleteIndex,1);
    localStorage.setItem("itemIndex",JSON.stringify(arrBag));
    showBagCount();
    setBagItems();
    showBagSummary();
}

function setBagItems() {
    
    let bagItemsContainer = document.querySelector(".bagItemsContainer");
    let html="";
    let arr = JSON.parse(localStorage.getItem("itemIndex")) || new Array();
    
    for(let i=0;i<arr.length;i++){
        let obj = items[arr[i]];
        
        html += `
        <div class="bag-item-container">
        <div class="item-left-part">
        <img class="bag-item-img" src="${obj.image}">
        </div>
        <div class="item-right-part">
        <div class="company">${obj.company}</div>
        <div class="item-name">${obj.item_name}</div>
        <div class="price-container">
        <span class="current-price">Rs ${obj.current_price}</span>
        <span class="original-price">Rs ${obj.original_price}</span>
        <span class="discount-percentage">(${obj.discount_percentage}% OFF)</span>
        </div>
        <div class="return-period">
        <span class="return-period-days">${obj.return_period} days</span> return available
        </div>
        <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${obj.delivery_date}</span>
        </div>
        </div>
        
        <div id ="${i} "class="remove-from-cart" onclick="deleteItem(this.id)">X</div>
        </div>`;
    }
    if(html==""){
        bagItemsContainer.innerHTML="<h2>YOUR CART IS EMPTY...</h2>";
    }
    else bagItemsContainer.innerHTML=html;
}

function showBagSummary(){
    let bagSummaryContainer = document.querySelector(".bag-summary");
    let arrBag = JSON.parse(localStorage.getItem("itemIndex")) || new Array();
    let Mrp = 0;
    let discountMrp = 0;
    let totalMrp=0;
    let totalAmount= 0;

    for(let i=0;i<arrBag.length;i++){
        let obj = items[arrBag[i]];
        Mrp += obj.original_price;
        discountMrp += (obj.original_price - obj.current_price);
        totalMrp += (Mrp - discountMrp);
    }
    totalAmount = (totalMrp + 99);

    bagSummaryContainer.innerHTML = `
    <div class="bag-details-container">
        <div class="price-header">PRICE DETAILS (${arrBag.length} Items) </div>
        <div class="price-item">
            <span class="price-item-tag">MRP</span>
            <span class="price-item-value">Rs. ${Mrp}</span>
        </div>
        <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-Rs. ${discountMrp}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">Rs. ${totalMrp}</span>
        </div>
        <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">Rs 99</span>
        </div>
        <hr>
        <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">Rs. ${totalAmount}</span>
        </div>
        </div>
        <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
        </button>`
}