document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const button = form.querySelector(".send-btn");

        const originalHTML = button.innerHTML;

        button.innerHTML = `
            <i class="fa-solid fa-circle-notch fa-spin"></i>
            Sending...
        `;

        button.disabled = true;

        setTimeout(() => {

            button.innerHTML = `
                <i class="fa-solid fa-check"></i>
                Message Ready!
            `;

            button.style.background = "#15904a";

            setTimeout(() => {

                form.reset();

                button.innerHTML = originalHTML;

                button.style.background = "";

                button.disabled = false;

            }, 1800);

        }, 1000);

    });


    /* Reveal animation */

    const animatedElements = document.querySelectorAll(
        ".info-card, .business-card, .form-wrapper, .contact-image"
    );


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    animatedElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

});