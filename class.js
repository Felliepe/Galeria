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

document.getElementById("img-input").addEventListener("change", readImage, false); // addEventListener para o input de imagem

const images = [ // Array de imagens para inicializar
    // "imgs/_ee2bafdb-0ebc-4bed-87f5-f2fc75496100.jpeg",
];

document.getElementById("img-input").addEventListener("change", function (event) { // addEventListener para o input de imagem para processar múltiplas imagens
    const files = event.target.files;
    const images = [];

    for (const file of files) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const dataUrl = e.target.result;
            images.push(dataUrl);

            if (images.length === files.length) { // Depois que todas as imagens forem processadas, salva o array em localStorage
                localStorage.setItem('images', JSON.stringify(images));
            }
        };
        reader.readAsDataURL(file);
    }
}, false);

const gallery = document.querySelector(".gallery"); // Cria elementos de imagem para cada imagem no array 
for (let i = 0; i < images.length; i++) {
    const img = document.createElement("img");
    img.src = images[i];
    gallery.appendChild(img); // adiciona à galeria
}

const modal = document.createElement("div"); // modal para visualização de imagem
modal.classList.add("modal");
gallery.appendChild(modal);

const modalImg = document.createElement("img");
modal.appendChild(modalImg);

const image = document.querySelectorAll(".gallery img"); // addEventListener para cada imagem na galeria para abrir o modal
image.forEach(img => {
    img.addEventListener("click", e => {
        modalImg.src = e.target.src;
        modal.classList.add("open");
    });
});

modal.addEventListener("click", () => { // addEventListener para fechar o modal
    modal.classList.remove("open");
});

function generateUniqueId() {
    return new Date().getTime().toString();
}

function readImage() {
    if (this.files && this.files[0]) {
        const file = new FileReader();
        file.onload = function (e) {
            const newImgSrc = e.target.result;
            const uniqueId = generateUniqueId(); // Gerar ID exclusivo para a imagem
            images.push({ id: uniqueId, src: newImgSrc }); // Armazenar a imagem com ID exclusivo
            localStorage.setItem('images', JSON.stringify(images)); // atualiza localStorage

            const newImg = document.createElement("img");
            newImg.src = newImgSrc;
            newImg.dataset.id = uniqueId; // Armazenar ID exclusivo como um atributo de dados
            newImg.addEventListener("click", () => removeFromStorage(uniqueId)); // addEventListener para a nova imagem
            gallery.appendChild(newImg);
        };
        file.readAsDataURL(this.files[0]);
    }
}

function removeFromStorage(uniqueId) {
    const images = JSON.parse(localStorage.getItem('images')) || [];
    const updatedImages = images.filter(img => img.id !== uniqueId);
    localStorage.setItem('images', JSON.stringify(updatedImages));
    const imgToRemove = document.querySelector(`.gallery img[data-id="${uniqueId}"]`);     // remover a imagem da galeria 
    if (imgToRemove) {
        imgToRemove.remove();
    }
}

const img = JSON.parse(localStorage.getItem('images')) || []; // Inicializa a galeria com imagens do localStorage
const galeria = document.querySelector(".gallery");
images.forEach(img => {
    const imgElement = document.createElement("img");
    imgElement.src = img.src;
    imgElement.dataset.id = img.id; // Armazenar ID exclusivo como um atributo de dados
    imgElement.addEventListener("click", () => removeFromStorage(img.id));
    gallery.appendChild(imgElement);
});

document.getElementById("img-input").addEventListener("change", readImage, false);
