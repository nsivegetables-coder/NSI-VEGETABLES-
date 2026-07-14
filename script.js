const products = [
    {
    name:"🥔 Potato",
    price:25,
    image:"https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500"
    },
    {
    name:"🍅 Tomato",
    price:30,
    image:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=500"
    },
    {
    name:"🧅 Onion",
    price:40,
    image:"https://images.unsplash.com/photo-1508747703725-719777637510?w=500"
    }
    ];

    let html = "";

    products.forEach(item => {

    html += `
    <div class="col-md-4 col-6">

    <div class="card">

    <img src="${item.image}" class="card-img-top">

    <div class="card-body">

    <h5>${item.name}</h5>

    <p class="price">₹${item.price}/kg</p>

    <button class="add-btn">
    Add to Cart
    </button>

    </div>

    </div>

    </div>
    `;

    });