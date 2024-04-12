function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.onload = function (e) {
            const newImgSrc = e.target.result;
            images.push(newImgSrc); // Adicione a nova fonte de imagem ao array de imagens
            const newImg = document.createElement("img"); // cria um novo elemento, "img"
            newImg.src = newImgSrc; // Defina o atributo src do novo elemento img
            gallery.appendChild(newImg); // Anexa novo elemento img à galeria
        };
        file.readAsDataURL(this.files[0]);
    }
}

document.getElementById("img-input").addEventListener("change", readImage, false);

const images = [
    "imgs/_ee2bafdb-0ebc-4bed-87f5-f2fc75496100.jpeg",
];

document.getElementById("img-input").addEventListener("change", function (event) {
    const files = event.target.files;
    const images = [];

    for (const file of files) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const dataUrl = e.target.result;
            images.push(dataUrl);

            // Depois que todas as imagens forem processadas, salva o array em localStorage
            if (images.length === files.length) {
                localStorage.setItem('images', JSON.stringify(images));
            }
        };
        reader.readAsDataURL(file);
    }
}, false);

const gallery = document.querySelector(".gallery");
for (let i = 0; i < images.length; i++) {
    const img = document.createElement("img");
    img.src = images[i];
    gallery.appendChild(img);
}

const modal = document.createElement("div");
modal.classList.add("modal");
gallery.appendChild(modal);

const modalImg = document.createElement("img");
modal.appendChild(modalImg);

const image = document.querySelectorAll(".gallery img");
image.forEach(img => {
    img.addEventListener("click", e => {
        modalImg.src = e.target.src;
        modal.classList.add("open");
    });
});

modal.addEventListener("click", () => {
    modal.classList.remove("open");
});

function removeImage(event) { // remover uma imagem e atualizar localStorage
    const imgSrc = event.target.src; // Obter o src da imagem clicada
    const gallery = document.querySelector(".gallery");
    const imgRemover = JSON.parse(localStorage.getItem('imgRemover')) || []; // Recuperar o array de imagens atual do localStorage

    const index = images.indexOf(imgSrc); // Encontre o índice da imagem clicada na matriz de imagens
    if (index > -1) {
        gallery.removeChild(event.target); // remove a imagem do DOM
        imgRemover.splice(index, 1); // remove a imagem da matriz de imagens
        localStorage.setItem('imgRemover', JSON.stringify(imgRemover)); // Atualiza localStorage com o novo array de imagens
    }
}

const imgRemover = JSON.parse(localStorage.getItem('images')) || []; // addEventListener para cada imagem da galeria
imgRemover.forEach(imgSrc => {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.addEventListener("click", removeImage);
    document.querySelector(".gallery").appendChild(img);
});
