/**
 * TDS Training Portal Navigation Module
 *
 * This script defines a custom HTML element <main-header> that dynamically
 * generates the site's navigation bar. It reduces code duplication and
 * simplifies maintenance.
 *
 * Usage:
 * 1. Include this script in your HTML page: <script src="navigation.js" defer></script>
 * 2. Place the custom element where you want the header: <main-header data-type="shop"></main-header>
 *
 * The `data-type` attribute can be "shop" or "sales" to load the correct set of links.
 * The script automatically highlights the active page link.
 */
class MainHeader extends HTMLElement {
    connectedCallback() {
        const navType = this.getAttribute('data-type');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        const shopLinks = [
            { href: 'safety.html', text: 'Safety' },
            { href: 'chemicals.html', text: 'Chemicals' },
            { href: 'exterior.html', text: 'Exterior' },
            { href: 'interior.html', text: 'Interior' },
            { href: 'tint.html', text: 'Tint' },
            { href: 'ppf.html', text: 'PPF' }
        ];

        const salesLinks = [
            { href: 'sales_tint.html', text: 'Window Tint' },
            { href: 'sales_ppf.html', text: 'PPF' },
            { href: 'sales_coatings.html', text: 'Coatings' },
            { href: 'sales_techniques.html', text: 'Sales Techniques' }
        ];

        let linksToUse = [];
        if (navType === 'shop') {
            linksToUse = shopLinks;
        } else if (navType === 'sales') {
            linksToUse = salesLinks;
        }

        const createNavLinks = (isMobile) => {
            return linksToUse.map(link =>
                `<a href="${link.href}" class="${isMobile ? 'block py-2' : ''} nav-link ${currentPage === link.href ? 'active' : ''}">${link.text}</a>`
            ).join('');
        };

        this.innerHTML = `
            <header class="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
                <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="index.html" class="text-3xl font-bold"><span class="text-amber-400">TDS</span> Training Portal</a>
                    <nav class="hidden md:flex space-x-6" id="desktop-nav">
                        ${createNavLinks(false)}
                    </nav>
                    <button id="mobile-menu-button" class="md:hidden focus:outline-none">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
                <div id="mobile-menu" class="hidden md:hidden px-6 pb-4 text-center">
                    ${createNavLinks(true)}
                </div>
            </header>
        `;

        this.addEventListeners();
    }

    addEventListeners() {
        // Use `this.querySelector` to scope the search within the custom element
        const mobileMenuButton = this.querySelector('#mobile-menu-button');
        const mobileMenu = this.querySelector('#mobile-menu');
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }
}

// Define the new custom element so the browser recognizes <main-header>
customElements.define('main-header', MainHeader);
