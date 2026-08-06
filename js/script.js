// Smooth fade-in animation

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

},{
    threshold:0.15
});

sections.forEach(section=>{

    section.style.opacity="0";
    section.style.transform="translateY(60px)";
    section.style.transition="all .8s ease";

    observer.observe(section);

});

const slider = document.getElementById("productSlider");


function slideRight(){

    slider.scrollLeft += 300;

}


function slideLeft(){

    slider.scrollLeft -= 300;

}
const cards = document.querySelector(".cards");

document.querySelector(".next").addEventListener("click", () => {

    cards.scrollBy({
        left:310,
        behavior:"smooth"
    });

});

document.querySelector(".prev").addEventListener("click", () => {

    cards.scrollBy({
        left:-310,
        behavior:"smooth"
    });

});