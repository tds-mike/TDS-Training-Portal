/**
 * TDS Training Portal Footer Module
 *
 * This script defines a custom HTML element <main-footer> that dynamically
 * generates the site's footer content and a "Scroll to Top" button.
 * It reduces code duplication and simplifies maintenance.
 *
 * Usage:
 * 1. Include this script in your HTML page: <script src="footer.js" defer></script>
 * 2. Place the custom element where you want the footer: <main-footer></main-footer>
 */
class MainFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                #scrollTopBtn {
                    position: fixed;
                    /* TWEAK: Increased bottom value to sit above the module progress bar */
                    bottom: 85px;
                    right: 20px;
                    display: none;
                    transition: opacity 0.3s, transform 0.3s;
                    opacity: 0;
                    transform: translateY(10px);
                    z-index: 40; /* Ensure it's below the menu but above content */
                }
                #scrollTopBtn.show {
                    display: block;
                    opacity: 1;
                    transform: translateY(0);
                }
            </style>
            <footer class="bg-gray-900 text-white text-center p-6 mt-12">
                <p>&copy; 2024 The Detail Shop, LLC. All Rights Reserved.</p>
            </footer>
            <button id="scrollTopBtn" class="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold p-3 rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
            </button>
        `;

        this.addEventListeners();
    }

    addEventListeners() {
        const scrollTopBtn = this.querySelector('#scrollTopBtn');

        if (scrollTopBtn) {
            // Show or hide the button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 200) { // Show button after scrolling 200px
                    scrollTopBtn.classList.add('show');
                } else {
                    scrollTopBtn.classList.remove('show');
                }
            });

            // Scroll to top when the button is clicked
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

customElements.define('main-footer', MainFooter);