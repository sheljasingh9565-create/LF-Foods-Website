/* =========================================================
   OMG LAXMI FOODS
   HOMEPAGE JAVASCRIPT
========================================================= */


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold:0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   PRODUCT SLIDER
========================================================= */

const productTrack = document.getElementById("productTrack");

const productSlides = document.querySelectorAll(".product-slide");

const productNext = document.querySelector(".product-next");

const productPrev = document.querySelector(".product-prev");

const sliderDots = document.getElementById("sliderDots");


let currentProduct = 0;

let autoSlide;



/* CREATE DOTS */

if(sliderDots){

    productSlides.forEach((slide,index) => {

        const dot = document.createElement("button");

        dot.className = "slider-dot";

        dot.setAttribute(
            "aria-label",
            `Show product ${index + 1}`
        );

        dot.addEventListener("click",() => {

            currentProduct = index;

            updateProductSlider();

            restartAutoSlide();

        });

        sliderDots.appendChild(dot);

    });

}



function getVisibleSlides(){

    if(window.innerWidth <= 768){
        return 1;
    }

    if(window.innerWidth <= 1200){
        return 2;
    }

    return 3;
}



function getMaxPosition(){

    return Math.max(
        0,
        productSlides.length - getVisibleSlides()
    );

}



function updateProductSlider(){

    if(!productTrack){
        return;
    }


    const slide = productSlides[0];

    if(!slide){
        return;
    }


    const gap = 24;

    const slideWidth =
        slide.getBoundingClientRect().width + gap;


    const maxPosition = getMaxPosition();


    if(currentProduct > maxPosition){

        currentProduct = 0;

    }


    if(currentProduct < 0){

        currentProduct = maxPosition;

    }


    productTrack.style.transform =
        `translateX(-${currentProduct * slideWidth}px)`;


    const dots =
        document.querySelectorAll(".slider-dot");


    dots.forEach((dot,index) => {

        dot.classList.toggle(
            "active",
            index === currentProduct
        );

    });

}



function nextProduct(){

    const maxPosition = getMaxPosition();

    currentProduct++;

    if(currentProduct > maxPosition){

        currentProduct = 0;

    }

    updateProductSlider();

}



function previousProduct(){

    const maxPosition = getMaxPosition();

    currentProduct--;

    if(currentProduct < 0){

        currentProduct = maxPosition;

    }

    updateProductSlider();

}



if(productNext){

    productNext.addEventListener(
        "click",
        () => {

            nextProduct();

            restartAutoSlide();

        }
    );

}



if(productPrev){

    productPrev.addEventListener(
        "click",
        () => {

            previousProduct();

            restartAutoSlide();

        }
    );

}



/* =========================================================
   AUTO MOVE EVERY 3 SECONDS
========================================================= */

function startAutoSlide(){

    autoSlide = setInterval(
        nextProduct,
        3000
    );

}



function stopAutoSlide(){

    clearInterval(autoSlide);

}



function restartAutoSlide(){

    stopAutoSlide();

    startAutoSlide();

}



if(productTrack){

    startAutoSlide();


    productTrack.addEventListener(
        "mouseenter",
        stopAutoSlide
    );


    productTrack.addEventListener(
        "mouseleave",
        startAutoSlide
    );

}



/* =========================================================
   RESPONSIVE SLIDER RESET
========================================================= */

window.addEventListener(
    "resize",
    () => {

        currentProduct = 0;

        updateProductSlider();

    }
);



/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const sidebar =
    document.getElementById("sidebar");

const mobileOverlay =
    document.getElementById("mobileOverlay");


function openMobileMenu(){

    if(!sidebar){
        return;
    }

    sidebar.style.display = "flex";

    sidebar.style.position = "fixed";

    sidebar.style.left = "0";

    sidebar.style.top = "0";

    sidebar.style.width = "280px";

    sidebar.style.zIndex = "3000";

    sidebar.style.boxShadow =
        "15px 0 50px rgba(0,0,0,.25)";

    document.body.classList.add("menu-open");

    if(mobileOverlay){

        mobileOverlay.style.display = "block";

    }

}



function closeMobileMenu(){

    if(window.innerWidth > 768){

        return;

    }

    if(!sidebar){
        return;
    }

    sidebar.style.display = "none";

    sidebar.style.boxShadow = "none";

    document.body.classList.remove(
        "menu-open"
    );

    if(mobileOverlay){

        mobileOverlay.style.display = "none";

    }

}



if(menuToggle){

    menuToggle.addEventListener(
        "click",
        openMobileMenu
    );

}



if(mobileOverlay){

    mobileOverlay.addEventListener(
        "click",
        closeMobileMenu
    );

}



/* CLOSE MENU AFTER CLICKING A LINK */

if(sidebar){

    sidebar.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

}



/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener(
    "scroll",
    () => {

        if(!backTop){
            return;
        }


        if(window.scrollY > 500){

            backTop.classList.add("show");

        }else{

            backTop.classList.remove("show");

        }

    }
);



if(backTop){

    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }
    );

}



/* =========================================================
   EIYA LOGO HOVER EFFECT
========================================================= */

const eiyaaVisual =
    document.querySelector(".eiyaa-visual");


if(eiyaaVisual){

    eiyaaVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                eiyaaVisual.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const rotateY =
                ((x / rect.width) - .5) * 6;


            const rotateX =
                ((y / rect.height) - .5) * -6;


            const card =
                eiyaaVisual.querySelector(
                    ".eiyaa-logo-card"
                );


            if(card){

                card.style.transform =
                    `rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     rotate(-2deg)`;

            }

        }
    );


    eiyaaVisual.addEventListener(
        "mouseleave",
        () => {

            const card =
                eiyaaVisual.querySelector(
                    ".eiyaa-logo-card"
                );


            if(card){

                card.style.transform =
                    "rotateX(0deg) rotateY(0deg) rotate(-3deg)";

            }

        }
    );

}



/* =========================================================
   PRODUCT IMAGE TILT
========================================================= */

document.querySelectorAll(".product-slide")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if(window.innerWidth < 900){
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const rotateY =
                    ((x / rect.width) - .5) * 3;


                const rotateX =
                    ((y / rect.height) - .5) * -3;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });



/* =========================================================
   YEAR
========================================================= */

const year =
    document.getElementById("year");


if(year){

    year.textContent =
        new Date().getFullYear();

}



/* =========================================================
   INITIAL SLIDER
========================================================= */

window.addEventListener(
    "load",
    () => {

        updateProductSlider();

    }
);