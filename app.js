//
let formWrapper = document.querySelector(".form-wrapper");
let form = document.querySelector("#form")
let searchInput = document.querySelector("#searchInput");
let buttonwrapper = document.querySelector(".button-wrapper");
let searchButton = document.querySelector("#searchButton");
let clearButton = document.querySelector("#clearButton");
let imageListWrapper = document.querySelector(".imagelist-wrapper");

runEventListeners()

function runEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);

}

function clear() {
    searchInput.value = "";
    // Array.from(imageListWrapper.children).forEach((child)=> child.remove())
    imageListWrapper.textContent = "";
}

function search(e) {

    let value = searchInput.value.trim();
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {

            method: "GET",
            headers: { //*http'ye istek atarken yetkilendirme tokeni istiyor, kim attı kim aldı 
                Authorization: "Client-ID bzYo-_2wKjBptr6Bpl570E0VpzlXAwJhEWM5FrJXSr0"
            }
        })

        .then((res) => res.json())
        .then((data) => {

            //*result objsini kendi icerisinde urls icersindeki small alıcaz 
            Array.from(data.results).forEach((image) => {
                // console.log(image.url.small);

                addImageToUI(image.urls.small) //url'leri func. icerisinde at

                // addImageToUI(image.alt_description)

            })

        })
        .catch((err) => console.log(err))

    e.preventDefault();
}

function addImageToUI(url, titleUrl) { // ToUI  = arayuzde goster

    let div = document.createElement("div");
    div.className = "card";

    let img = document.createElement("img");
    img.setAttribute("src", url);
    img.height = "400";
    img.width = "400";

    // let p = document.createElement("p")
    // p.className = "img-title"
    // p.textContent = "titleUrl";

    imageListWrapper.append(div);
    div.append(img);
    // div.append(p);
}