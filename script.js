
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
        img: "./assets/slide-01.jpg",
        h3: "Women Collection 2018",
        h2: "NEW SEASON",
        link: "SHOP NOW"
    },
    {
        img: "./assets/slide-02.jpg",
        h3: "MEN NEW-SEASON",
        h2: "JACKETS & COATS",
        link: "SHOP NOW"
    },
    {
        img: "./assets/slide-03.jpg",
        h3: "Men Collection 2018",
        h2: "NEW ARRIVALS",
        link: "SHOW NOW"
    }
];

var i = 0;
var sliderRight = document.getElementById("slider-right-btn");
var sliderLeft = document.getElementById("slider-left-btn");

sliderRight.addEventListener('click', function () {
    next();
});
sliderLeft.addEventListener('click', function () {
    prev();
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


updateSlide();


var backToTopBtn = document.querySelector('.back-to-top');


backToTopBtn.classList.add('hidden');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
});


backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

var productReq = new XMLHttpRequest()
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar')
    const body = document.body

    if (window.scrollY >= 40) {
        navbar.classList.add('scrolled');
        body.classList.add('scrolled');
    }
    else {
        navbar.classList.remove('scrolled');
        body.classList.remove('scrolled');
    }
})


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
                        <img src="./assets/${allProducts[i].image}" alt="">
                        <a href="#" id="${allProducts[i].id}">Quick View</a>
                    </div>
                    <div class="product-details">
                        <div class="product-name">
                            <span>${allProducts[i].title}</span>
                        </div>
                        <div class="product-price">$${allProducts[i].price}</div>
                    </div>
                </div>
            `;
        }
    }
};
