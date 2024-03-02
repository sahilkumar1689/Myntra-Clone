onLoad();

function onLoad(){
    setWhishItems();
}

function deleteItem(deleteIndex){
    let arrBag = JSON.parse(localStorage.getItem("whishItemIndex"));
    console.log(deleteIndex);
    arrBag.splice(deleteIndex,1);
    localStorage.setItem("whishItemIndex",JSON.stringify(arrBag));
    setWhishItems();
}

function setWhishItems() {
    
    let bagItemsContainer = document.querySelector(".bagItemsContainer");
    let html="";
    let arr = JSON.parse(localStorage.getItem("whishItemIndex")) || new Array();
    
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
        bagItemsContainer.innerHTML="<h2>YOUR FAVOURITE ITEMS CART IS EMPTY...</h2>";
    }
    else bagItemsContainer.innerHTML=html;
}