const phone = "917593925926";

const sheetURL = "https://script.google.com/macros/s/AKfycbyg9RmH2iFblNzWNBBL7J4SR-W003CQnDju8RPoPBINF_cD6Fdidkn7h9QLvMsL8u4z/exec";

let products = [];

fetch(sheetURL)
.then(res => res.json())
.then(data => {

  products = data.map(item => ({
      name: item["name"],
          regular: Number(item["regular price"]),
              price: Number(item["offer price"]),
                  qty: 0
                    }));

                      showProducts();

                      })
                      .catch(err=>{
                        console.log(err);
                          alert("Google Sheet Connect Failed");
                          });

                          function showProducts(){

                            let html="";

                              products.forEach((p,i)=>{

                                  let qtyText="0";

                                      if(p.qty>0){
                                            qtyText = p.qty<1 ? (p.qty*1000)+"g" : p.qty+"kg";
                                                }

                                                    html+=`
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

                                                                                                                                                  <b style="padding:0 10px">${qtyText}</b>

                                                                                                                                                          <button onclick="change(${i},1)">+</button>

                                                                                                                                                                </div>

                                                                                                                                                                    </div>
                                                                                                                                                                        `;
                                                                                                                                                                          });

                                                                                                                                                                            document.getElementById("products").innerHTML=html;

                                                                                                                                                                              cart();

                                                                                                                                                                              }

                                                                                                                                                                              function change(i,v){

                                                                                                                                                                                products[i].qty += 0.25*v;

                                                                                                                                                                                  if(products[i].qty<0) products[i].qty=0;

                                                                                                                                                                                    if(products[i].qty>10) products[i].qty=10;

                                                                                                                                                                                      products[i].qty=Number(products[i].qty.toFixed(2));

                                                                                                                                                                                        showProducts();

                                                                                                                                                                                        }

                                                                                                                                                                                        function cart(){

                                                                                                                                                                                          let html="";
                                                                                                                                                                                            let total=0;

                                                                                                                                                                                              products.forEach(p=>{

                                                                                                                                                                                                  if(p.qty>0){

                                                                                                                                                                                                        let qtyText=p.qty<1 ? (p.qty*1000)+"g" : p.qty+"kg";

                                                                                                                                                                                                              html+=`${p.name} - ${qtyText}<br>`;

                                                                                                                                                                                                                    total+=p.qty*p.price;

                                                                                                                                                                                                                        }

                                                                                                                                                                                                                          });

                                                                                                                                                                                                                            document.getElementById("cartItems").innerHTML=html || "Cart Empty";

                                                                                                                                                                                                                              document.getElementById("total").innerHTML=total.toFixed(2);

                                                                                                                                                                                                                              }

                                                                                                                                                                                                                              function sendOrder(){

                                                                                                                                                                                                                                let msg="*NSI VEGETABLES ORDER*%0A%0A";

                                                                                                                                                                                                                                  products.forEach(p=>{

                                                                                                                                                                                                                                      if(p.qty>0){

                                                                                                                                                                                                                                            let qtyText=p.qty<1 ? (p.qty*1000)+"g" : p.qty+"kg";

                                                                                                                                                                                                                                                  msg+=`${p.name} - ${qtyText}%0A`;

                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                          msg+=`%0ATotal : ₹${document.getElementById("total").innerHTML}`;

                                                                                                                                                                                                                                                            msg+=`%0A%0AName : ${document.getElementById("name").value}`;

                                                                                                                                                                                                                                                              msg+=`%0APhone : ${document.getElementById("phone").value}`;

                                                                                                                                                                                                                                                                msg+=`%0AAddress : ${document.getElementById("address").value}`;

                                                                                                                                                                                                                                                                  window.open(`https://wa.me/${phone}?text=${msg}`);

                                                                                                                                                                                                                                                                  }