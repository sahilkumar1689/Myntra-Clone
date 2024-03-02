let arr;
let whishlistarr;
onLoad();
function onLoad(){
    arr = JSON.parse(localStorage.getItem("itemIndex")) || new Array();
    whishlistarr = JSON.parse(localStorage.getItem("whishItemIndex")) || new Array();
    setItems();
    showBagCount();
}

function showBagCount(){
    let bagCount = document.querySelector(".bagItemsNumber");
    if(arr.length>0){
        bagCount.style.display = "block";
        bagCount.innerHTML=arr.length;
    }else{
        bagCount.style.display="none";
    }
}

function addItems(index){
    arr.push(index);
    localStorage.setItem("itemIndex",JSON.stringify(arr));
    showBagCount();
}
function addWhishList(index){
    whishlistarr.push(index);
    localStorage.setItem("whishItemIndex",JSON.stringify(whishlistarr));
    alert("Item Add In Yours Favourite...");
}

function setItems(){
    let container = document.querySelector(".container");
    if(!container){
        return;
    }
    let html="";
    items.forEach((element,index)=>{
        html += `
        <div class="item">
        <img src="${element.image}" alt="item1 image">
        <div class="rating">
            ${element.rating.stars} ⭐ | ${element.rating.count}
            <span class="whishImg" onclick="addWhishList(${index})">
            <i class="fa-regular fa-heart "></i>
            </span>

        </div>
        <div class="companyName">${element.company}</div>
        <div class="tittleName">${element.item_name}</div>
        <div class="price">
            <span class="currentPrice">Rs. ${element.current_price}</span>
            <span class="originalPrice">${element.original_price}</span>
            <span class="discount">(${element.discount_percentage}% OFF)</span>
        </div>
        <button id=${index} class="addBtn" onclick="addItems(this.id)">Add To Bag</button>
        </div>`;
    })
    container.innerHTML=html;
}