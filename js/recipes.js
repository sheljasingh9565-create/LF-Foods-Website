// ==========================================
// NAVBAR SHADOW ON SCROLL
// ==========================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";
        header.style.background = "rgba(255,248,239,0.98)";

    }

    else {

        header.style.boxShadow = "0 3px 20px rgba(0,0,0,0.05)";
        header.style.background = "rgba(255,248,239,0.95)";

    }

});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const reveals = document.querySelectorAll(

    ".section-title, .featured-card, .recipe-card, .tip-box, .recipe-book"

);

const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("reveal");
            entry.target.classList.add("active");

        }

    });

},

{

    threshold:0.15

}

);

reveals.forEach(item=>{

    item.classList.add("reveal");

    observer.observe(item);

});

// ==========================================
// PARALLAX FLOATING VEGETABLES
// ==========================================

const floating = document.querySelectorAll(".floating");

document.addEventListener("mousemove",(e)=>{

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    floating.forEach((item,index)=>{

        const speed = (index + 1) * 12;

        item.style.transform =
        `translate(${x*speed}px, ${y*speed}px)`;

    });

});

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================

const buttons = document.querySelectorAll("button");

buttons.forEach(button=>{

button.addEventListener("click",function(e){

const circle = document.createElement("span");

const diameter = Math.max(this.clientWidth,this.clientHeight);

circle.style.width = diameter + "px";
circle.style.height = diameter + "px";

circle.style.left =
e.clientX - this.getBoundingClientRect().left - diameter/2 + "px";

circle.style.top =
e.clientY - this.getBoundingClientRect().top - diameter/2 + "px";

circle.classList.add("ripple");

const ripple = this.querySelector(".ripple");

if(ripple){

    ripple.remove();

}

this.appendChild(circle);

});

});

// ==========================================
// RECIPE CARD TILT EFFECT
// ==========================================

const cards = document.querySelectorAll(".recipe-card");

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const rotateY = (x - rect.width/2)/20;

const rotateX = -(y - rect.height/2)/20;

card.style.transform =
`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform =
"perspective(1000px) rotateX(0) rotateY(0)";

});

});

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// ==========================================
// HERO IMAGE SLIGHT ROTATION
// ==========================================

const bowl = document.querySelector(".hero-right img:first-of-type");

window.addEventListener("scroll",()=>{

const rotate = window.scrollY * 0.02;

bowl.style.transform = `rotate(${rotate}deg)`;

});

// ==========================================
// ACTIVE NAV LINK
// ==========================================

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link=>{

link.addEventListener("click",()=>{

navLinks.forEach(item=>{

item.classList.remove("active");

});

link.classList.add("active");

});

});