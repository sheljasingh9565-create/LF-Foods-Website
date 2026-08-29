/* =========================================================
   OMG LAXMI FOODS — ABOUT PAGE JS
========================================================= */


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

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


revealElements.forEach((element) => {

    revealObserver.observe(element);

});



/* =========================================================
   SERVICE TABS
========================================================= */

const serviceTabs =
    document.querySelectorAll(".service-tab");

const servicePanels =
    document.querySelectorAll(".service-panel");


serviceTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        const target =
            tab.getAttribute("data-service");


        serviceTabs.forEach((item) => {

            item.classList.remove("active");

        });


        servicePanels.forEach((panel) => {

            panel.classList.remove("active");

        });


        tab.classList.add("active");


        const selectedPanel =
            document.querySelector(
                `.service-panel[data-panel="${target}"]`
            );


        if(selectedPanel){

            selectedPanel.classList.add("active");

        }

    });

});



/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.getElementById("sidebar");

const overlay =
    document.getElementById("overlay");


function openMenu(){

    sidebar.classList.add("open");

    overlay.classList.add("show");

}


function closeMenu(){

    sidebar.classList.remove("open");

    overlay.classList.remove("show");

}


if(menuBtn){

    menuBtn.addEventListener(
        "click",
        openMenu
    );

}


if(overlay){

    overlay.addEventListener(
        "click",
        closeMenu
    );

}


document
    .querySelectorAll(".sidebar-nav a")
    .forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });



/* =========================================================
   ACTIVE SIDEBAR LINK
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const sidebarLinks =
    document.querySelectorAll(
        ".sidebar-nav a[href^='#']"
    );


const activeObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if(entry.isIntersecting){

                    sidebarLinks.forEach((link) => {

                        link.classList.remove(
                            "active"
                        );

                    });


                    const current =
                        document.querySelector(
                            `.sidebar-nav a[href="#${entry.target.id}"]`
                        );


                    if(current){

                        current.classList.add(
                            "active"
                        );

                    }

                }

            });

        },

        {
            rootMargin:"-30% 0px -60% 0px"
        }

    );


sections.forEach((section) => {

    activeObserver.observe(section);

});



/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener(
    "scroll",
    () => {

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
   HERO PARALLAX
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


if(heroVisual){

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (window.innerWidth / 2 - event.clientX)
                / 80;

            const y =
                (window.innerHeight / 2 - event.clientY)
                / 80;


            heroVisual.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            heroVisual.style.transform =
                "translate(0,0)";

        }
    );

}



/* =========================================================
   EIYAA IMAGE / VISUAL TILT
========================================================= */

const eiyaaVisual =
    document.querySelector(".eiyaa-image");


if(eiyaaVisual){

    eiyaaVisual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                eiyaaVisual.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const rotateX =
                ((y / rect.height) - .5) * -5;

            const rotateY =
                ((x / rect.width) - .5) * 5;


            eiyaaVisual.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


eiyaaVisual.addEventListener("mouseleave", () => {

    eiyaaVisual.style.transform =
        "perspective(800px) rotateX(0) rotateY(0)";

});
}


/* =========================================================
   CURRENT YEAR
========================================================= */

const year =
    document.getElementById("year");


if(year){

    year.textContent =
        new Date().getFullYear();

}