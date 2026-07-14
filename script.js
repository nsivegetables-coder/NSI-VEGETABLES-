let products = [];

fetch("https://script.google.com/macros/s/AKfycbyg9RmH2iFblNzWNBBL7J4SR-W003CQnDju8RPoPBINF_cD6Fdidkn7h9QLvMsL8u4z/exec")
  .then(response => response.json())
    .then(data => {
        products = data.map(item => ({
              name: item.name,
                    price: Number(item["offer price"]),
                          regular: Number(item["regular price"]),
                                qty: 0
                                    }));

                                        showProducts();
                                          })
                                            .catch(err => {
                                                console.log(err);
                                                    alert("Google Sheet-ൽ നിന്ന് ഡാറ്റ ലഭിച്ചില്ല");
                                                      });