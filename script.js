const phone = "917593925926";

const sheetURL = "https://script.google.com/macros/s/AKfycbyg9RmH2iFblNzWNBBL7J4SR-W003CQnDju8RPoPBINF_cD6Fdidkn7h9QLvMsL8u4z/exec";

let products = [];

fetch(sheetURL)
.then(response => response.json())
.then(data => {

products = data.map(item => ({
name: item["name"] || "",
regular: Number(item["regular price"] || 0),
price: Number(item["offer price"] || 0),
qty: 0
}));

showProducts();

})
.catch(error => {
console.log(error);
alert("Google Sheet Connect Failed");
});

function qtyText(q){

if(q==0) return "0";

if(q<1){
return (q*1000)+"g";
}

return q+"kg";

}

function showProducts(){

let html="";

products.forEach((p,i)=>{

html += `
<div class="card">

<div>

<b>${p.name}</b><br>

<span style="text-decoration:line-through;color:gray">
₹${p.regular}
</span>

<b style="color:green">
₹${p.price}/kg
</b>

</div>

<div>

<button onclick="change(${i},-1)">-</button>

<b style="padding:0 10px">
${qtyText(p.qty)}
</b>

<button onclick="change(${i},1)">+</button>

</div>

</div>
`;

});

document.getElementById("products").innerHTML = html;{}

cart();


    products[i].qty += 0.25 * v;

    if(products[i].qty < 0){
    products[i].qty = 0;
    }

    if(products[i].qty > 10){
    products[i].qty = 10;
    }

    products[i].qty = Number(products[i].qty.toFixed(2));

    showProducts();

    }

    function cart(){

    let html = "";

    let total = 0;

    products.forEach(p=>{

    if(p.qty>0){

    html += `${p.name} - ${qtyText(p.qty)}<br>`;

    total += p.qty * p.price;

    }

    });

    document.getElementById("cartItems").innerHTML = html || "Cart Empty";

    document.getElementById("total").innerHTML = total.toFixed(2);

    }

    function sendOrder(){

    let msg = "*🥬 NSI VEGETABLES ORDER*%0A%0A";

    products.forEach(p=>{

    if(p.qty>0){

    msg += `${p.name} - ${qtyText(p.qty)}%0A`;

    }

    });

    msg += `%0ATotal : ₹${document.getElementById("total").innerHTML}`;

    msg += `%0A%0AName : ${document.getElementById("name").value}`;

    msg += `%0APhone : ${document.getElementById("phone").value}`;

    msg += `%0AAddress : ${document.getElementById("address").value}`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(decodeURIComponent(msg))}`);

    }
}