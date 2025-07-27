var activeBtns = document.querySelectorAll('.products-categories-btn button');

for (var i = 0; i < activeBtns.length; i++) {
    activeBtns[i].addEventListener('click', (e) => {
        for (var j = 0; j < activeBtns.length; j++) {
            activeBtns[j].classList.remove('products-active');
        }
        e.target.classList.add('products-active');
    });
}

var slides = [
    {
        img: "./assets/imgs/slide-01.jpg",
        h3: "Women Collection 2018",
        h2: "NEW SEASON",
        link: "SHOP NOW"
    },
    {
        img: "./assets/imgs/slide-02.jpg",
        h3: "MEN NEW-SEASON",
        h2: "JACKETS & COATS",
        link: "SHOP NOW"
    },
    {
        img: "./assets/imgs/slide-03.jpg",
        h3: "Men Collection 2018",
        h2: "NEW ARRIVALS",
        link: "SHOW NOW"
    }
];

var i = 0;
var firstInteraction = true;

var sliderRight = document.getElementById("slider-right-btn");
var sliderLeft = document.getElementById("slider-left-btn");

sliderRight.addEventListener('click', () => {
    if (firstInteraction) {
        firstInteraction = false;
        i = 1;
        updateSlide();
    } else {
        next();
    }
});

sliderLeft.addEventListener('click', () => {
    if (firstInteraction) {
        firstInteraction = false;
        i = slides.length - 1;
        updateSlide();
    } else {
        prev();
    }
});

function updateSlide() {
    var hero = document.querySelector('.hero-section');
    var h3 = document.querySelector('.hero-section-content h3');
    var h2 = document.querySelector('.hero-section-content h2');
    var btn = document.querySelector('.hero-section-content a');

    hero.style.backgroundImage = 'url("' + slides[i].img + '")';
    h3.textContent = slides[i].h3;
    h2.textContent = slides[i].h2;
    btn.textContent = slides[i].link;

    var elements = [h3, h2, btn];
    for (var j = 0; j < elements.length; j++) {
        elements[j].className = '';
        elements[j].offsetHeight;
    }

    if (i === 0) {
        h3.classList.add('animated', 'fade-in-up', 'delay-1');
        h2.classList.add('animated', 'fade-in-up', 'delay-2');
        btn.classList.add('animated', 'fade-in-up', 'delay-3');
    } else if (i === 1) {
        h3.classList.add('animated', 'rotate-in-left', 'delay-1');
        h2.classList.add('animated', 'slide-in-right', 'delay-2');
        btn.classList.add('animated', 'fade-in-up', 'delay-3');
    } else if (i === 2) {
        h3.classList.add('animated', 'rotate-top-left', 'delay-1');
        h2.classList.add('animated', 'rotate-bottom-right', 'delay-2');
        btn.classList.add('animated', 'rotate-in-place', 'delay-3');
    }
}
function next() {
    i++;
    if (i >= slides.length) {
        i = 0;
    }
    updateSlide();
}

function prev() {
    i--;
    if (i < 0) {
        i = slides.length - 1;
    }
    updateSlide();
}

function autoShow() {
    setInterval(() => {
        next();
    }, 3000);
}

updateSlide();
autoShow();

var backToTopBtn = document.querySelector('.back-to-top');
backToTopBtn.classList.add('hidden');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    if (window.scrollY >= 40) {
        navbar.classList.add('scrolled');
        body.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        body.classList.remove('scrolled');
    }
});

var allProducts = [];

var productReq = new XMLHttpRequest();
productReq.open("GET", "products.JSON");
productReq.send();

productReq.onreadystatechange = () => {
    if (productReq.readyState === 4 && productReq.status === 200) {
        var finalProducts = JSON.parse(productReq.responseText);
        allProducts = finalProducts.products;

        showProducts("all-products");
    }
};

var buttons = document.querySelectorAll('.products-categories-btn button');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (e) => {
        var category = e.target.id.toLowerCase();
        showProducts(category);
    });
}

var showProducts = (category) => {
    var container = document.querySelector(".products-list");
    container.innerHTML = "";

    for (var i = 0; i < allProducts.length; i++) {
        var productCat = allProducts[i].category.toLowerCase();

        if (category === "all-products" || productCat === category) {
            container.innerHTML += `
                <div class="product-card">
                    <div class="product-img">
                        <img src="./assets/imgs/${allProducts[i].image}" alt="">
                        <button data-product-id="${allProducts[i].id}" class="quick-view">Quick View</button>
                    </div>
                    <div class="product-details">
                        <div class="product-name">
                            <span>${allProducts[i].title}</span>
                            <div class="icon-heart-container">
                                <a>
                                    <img class="icon-heart-1" src="../imgs/icon-heart-01.png.webp" alt="">
                                    <img class="icon-heart-2" src="../imgs/icon-heart-02.png.webp" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="product-price">$${allProducts[i].price}</div>
                    </div>
                </div>
            `;
        }
    }
};

document.querySelector('.products-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-view')) {
        var productId = e.target.getAttribute('data-product-id');
        var product = allProducts.find(p => p.id == productId);
        if (product) {

            var sizes = ['XS', 'S', 'M', 'L', 'XL'];
            var colors = ['Red', 'Blue', 'Black', 'White', 'Green'];

            var thumbnailImages = [
                        './assets/imgs/' + product.image,
        './assets/imgs/product-detail-01.jpg.webp',
        './assets/imgs/product-detail-02.jpg.webp'
            ];

            var popup = document.createElement('div');
            popup.className = 'popup';
            popup.innerHTML = `
                <button class="close-btn">×</button>
                <div class="popup-content">
                    <div class="image-container">
                        <div class="thumbnail-column">
                            ${thumbnailImages.map((img, index) => `
                                <img src="${img}" 
                                     alt="Thumbnail ${index + 1}" 
                                     class="thumbnail-img ${index === 0 ? 'active' : ''}"
                                     data-main-img="${img}">
                            `).join('')}
                        </div>
                        <div class="main-image-container">
                            <img src="${thumbnailImages[0]}" alt="${product.title}" class="popup-main-image">
                        </div>
                    </div>
                    <div class="popup-details">
                        <h2>${product.title}</h2>
                        <p class="price">$${product.price}</p>
                        <p class="description">${product.description || 'No description available.'}</p>
                        
                        <div class="options-container">
                            <div class="option-group">
                                <label>Size</label>
                                <select id="size-select" class="option-select">
                                    <option value="">Select Size</option>
                                    ${sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                                </select>
                            </div>
                            
                            <div class="option-group">
                                <label>Color</label>
                                <select id="color-select" class="option-select">
                                    <option value="">Select Color</option>
                                    ${colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        
                        <div class="add-to-cart-container">
                            <div class="quantity-selector">
                                <button class="quantity-btn minus">-</button>
                                <span class="quantity-display">1</span>
                                <button class="quantity-btn plus">+</button>
                            </div>
                            <button class="add-to-cart-btn">ADD TO CART</button>
                        </div>
                    </div>
                </div>
            `;

            var overlay = document.createElement('div');
            overlay.className = 'overlay';

            document.body.appendChild(overlay);
            document.body.appendChild(popup);


            var thumbnailElements = popup.querySelectorAll('.thumbnail-img');
            var mainImage = popup.querySelector('.popup-main-image');

            thumbnailElements.forEach(thumb => {
                thumb.addEventListener('click', () => {

                    mainImage.src = thumb.dataset.mainImg;


                    thumbnailElements.forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
            });


            popup.querySelector('.close-btn').addEventListener('click', () => {
                popup.remove();
                overlay.remove();
            });

            overlay.addEventListener('click', () => {
                popup.remove();
                overlay.remove();
            });


            var minusBtn = popup.querySelector('.quantity-btn.minus');
            var plusBtn = popup.querySelector('.quantity-btn.plus');
            var quantityDisplay = popup.querySelector('.quantity-display');

            var quantity = 1;

            minusBtn.addEventListener('click', () => {
                if (quantity > 1) { // Minimum 1 item
                    quantity--;
                    quantityDisplay.textContent = quantity;
                }
            });

            plusBtn.addEventListener('click', () => {
                quantity++;
                quantityDisplay.textContent = quantity;
            });


            popup.querySelector('.add-to-cart-btn').addEventListener('click', () => {
                var selectedSize = popup.querySelector('#size-select').value;
                var selectedColor = popup.querySelector('#color-select').value;

                if (!selectedSize) {
                    alert('Please select a size');
                    return;
                }

                if (!selectedColor) {
                    alert('Please select a color');
                    return;
                }

                // Cart functionality - save to localStorage
                var cartItem = {
                    id: product.id,
                    product: product.title,
                    size: selectedSize,
                    color: selectedColor,
                    quantity: quantity,
                    price: product.price,
                    image: mainImage.src,
                    description: product.description || 'Premium quality product'
                };

                var existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
                var existingItemIndex = existingCart.findIndex(item => 
                    item.id === cartItem.id && 
                    item.size === cartItem.size && 
                    item.color === cartItem.color
                );

                if (existingItemIndex > -1) {
                    existingCart[existingItemIndex].quantity += cartItem.quantity;
                } else {
                    existingCart.push(cartItem);
                }

                localStorage.setItem('cartItems', JSON.stringify(existingCart));

                console.log('Added to cart:', cartItem);

                popup.remove();
                overlay.remove();
            });

            popup.style.display = 'block';
            overlay.style.display = 'block';
        }
    }
});


var searchBox = document.querySelector('.search-box');
var searchBtn = document.querySelector('#product-search-btn')

searchBtn.addEventListener('click', () => {
    searchBox.classList.toggle('hidden');
    if (searchInput.id == "product-search") {
        console.log('hi')
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === 'Enter') {
                searchProduct();
                searchInput.value = ""
            }
        })
    }
})


searchInput = document.getElementById('product-search');
productsList = document.querySelector('.products-list');

var renderProducts = (products) => {
    productsList.innerHTML = ""
    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        productsList.innerHTML += `
        <div class="product-card">
                    <div class="product-img">
                        <img src="./assets/${allProducts[i].image}" alt="">
                        <button data-product-id="${allProducts[i].id}" class="quick-view">Quick View</button>
                    </div>
                    <div class="product-details">
                        <div class="product-name">
                            <span>${allProducts[i].title}</span>
                            <div class="icon-heart-container">
                                <a>
                                    <img class="icon-heart-1" src="./assets/imgs/icon-heart-01.png.webp" alt="">
                                    <img class="icon-heart-2" src="./assets/imgs/icon-heart-02.png.webp" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="product-price">$${allProducts[i].price}</div>
                    </div>
                </div> `
    }
}


var searchProduct = () => {
    var keyword = searchInput.value.toLowerCase();
    var matched = [];
    console.log(allProducts)

    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].title.toLowerCase().includes(keyword)) {
            matched.push(allProducts[i]);
        }

    }
    renderProducts(matched);

}



// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Check if dark mode preference is saved in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial state based on saved preference or current state
    if (isDarkMode) {
        body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    } else {
        body.classList.remove('dark-mode');
        updateDarkModeIcon(false);
    }
    
    // Add click event listener to the dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle dark mode class on body
            body.classList.toggle('dark-mode');
            
            // Check if dark mode is now active
            const isNowDarkMode = body.classList.contains('dark-mode');
            
            // Update icon
            updateDarkModeIcon(isNowDarkMode);
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', isNowDarkMode);
        });
    }
    
    // Function to update the dark mode icon
    function updateDarkModeIcon(isDark) {
        if (darkModeToggle) {
            if (isDark) {
                // Change to light mode icon for switching to light mode
                darkModeToggle.textContent = 'light_mode';
                darkModeToggle.title = 'Switch to light mode';
            } else {
                // Change to dark mode icon for switching to dark mode
                darkModeToggle.textContent = 'dark_mode';
                darkModeToggle.title = 'Switch to dark mode';
            }
        }
    }
});

