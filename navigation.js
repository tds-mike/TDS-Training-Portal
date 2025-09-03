/**
 * TDS Training Portal Navigation Module
 *
 * This script defines a custom HTML element <main-header> that dynamically
 * generates the site's header, a desktop navigation with dropdowns, and
 * a unified slide-out navigation menu for mobile.
 * It reduces code duplication and simplifies maintenance.
 *
 * Usage:
 * 1. Include this script in your HTML page: <script src="navigation.js" defer></script>
 * 2. Place the custom element where you want the header: <main-header></main-header>
 *
 * The script automatically highlights the active page link.
 */
class MainHeader extends HTMLElement {
    connectedCallback() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        const allLinks = {
            "Technician Portal": {
                "Getting Started": [
                    { href: 'shop_index.html', text: 'Technician Home' },
                    { href: 'training-pathway.html', text: 'New Technician Pathway' }
                ],
                "Core Principles": [
                    { href: 'safety.html', text: 'Safety Guide' },
                    { href: 'chemicals.html', text: 'Chemicals Guide' },
                ],
                "Practical Guides": [
                    { href: 'exterior.html', text: 'Exterior Mastery' },
                    { href: 'interior.html', text: 'Interior Restoration' },
                    { href: 'tint.html', text: 'Window Tinting Guide' },
                    { href: 'ppf.html', text: 'PPF Installation Guide' }
                ],
                "Resources": [
                    { href: 'checklists.html', text: 'Printable Checklists' }
                ]
            },
            "Sales Portal": {
                "Getting Started": [
                    { href: 'sales_index.html', text: 'Sales Home' },
                ],
                "Sales Methodology": [
                    { href: 'sales_techniques.html', text: 'The TDS Sales Process' },
                    { href: 'sales_nepq_framework.html', text: 'The NEPQ Framework' },
                    { href: 'sales_scripts.html', text: 'Sales Scripts' },
                    { href: 'sales_sop.html', text: 'SOPs & Checklists' },
                    { href: 'sales_objection_handling.html', text: 'Diffusing Objections' },
                ],
                "Product Knowledge": [
                    { href: 'sales_tint.html', text: 'Selling Window Tint' },
                    { href: 'sales_ppf.html', text: 'Selling PPF' },
                    { href: 'sales_coatings.html', text: 'Selling Ceramic Coatings' },
                    { href: 'sales_paint_correction.html', text: 'Selling Paint Correction' },
                    { href: 'sales_detailing.html', text: 'Selling Detailing' },        
                ]
            }
        };

        const createSlideOutNav = () => {
            let html = `<div class="mb-6">
                <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">Main Portal</h3>
                <div class="mt-2 space-y-1">
                    <a href="index.html" class="block p-2 rounded-md text-base font-medium ${currentPage === 'index.html' ? 'bg-amber-500 text-gray-900' : 'text-white hover:bg-gray-700'}">Portal Home</a>
                </div>
            </div>`;

            for (const portal in allLinks) {
                html += `<div class="mb-6">`;
                const portalData = allLinks[portal];
                for (const category in portalData) {
                    html += `<h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mt-4">${category}</h3>`;
                    html += '<div class="mt-2 space-y-1">';
                    portalData[category].forEach(link => {
                        const isActive = currentPage === link.href;
                        html += `<a href="${link.href}" class="block p-2 rounded-md text-base font-medium ${isActive ? 'bg-amber-500 text-gray-900' : 'text-white hover:bg-gray-700'}">${link.text}</a>`;
                    });
                    html += `</div>`;
                }
                html += `</div>`;
            }
            return html;
        };
        
        const createDesktopDropdown = (portalName) => {
            const portalData = allLinks[portalName];
            let html = `<div class="dropdown-menu absolute hidden bg-gray-800 text-white rounded-md shadow-lg py-2 w-64 z-20">`;
            for (const category in portalData) {
                html += `<h3 class="px-4 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">${category}</h3>`;
                portalData[category].forEach(link => {
                    const isActive = currentPage === link.href;
                    html += `<a href="${link.href}" class="block px-4 py-2 text-sm ${isActive ? 'bg-amber-500 text-gray-900' : 'hover:bg-gray-700'}">${link.text}</a>`;
                });
            }
            html += `</div>`;
            return html;
        };

        const isShopPage = Object.values(allLinks["Technician Portal"]).flat().some(link => link.href === currentPage);
        const isSalesPage = Object.values(allLinks["Sales Portal"]).flat().some(link => link.href === currentPage);

        this.innerHTML = `
            <style>
                .slide-out-menu { transition: transform 0.3s ease-in-out; }
                .menu-overlay { transition: opacity 0.3s ease-in-out; }
                .has-dropdown:hover .dropdown-menu { display: block; }
                .nav-link { transition: all 0.2s ease; padding-bottom: 4px; border-bottom: 2px solid transparent; }
                .nav-link:hover { color: #FBBF24; border-bottom-color: #FBBF24; }
                .nav-link.active { color: #F59E0B; font-weight: 600; border-bottom-color: #F59E0B; }
            </style>
            <header class="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
                <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="index.html" class="text-3xl font-bold"><span class="text-amber-400">TDS</span> Training Portal</a>
                    <button id="mobile-menu-button" class="md:hidden focus:outline-none z-50">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                     <nav class="hidden md:flex items-center space-x-6">
                        <a href="index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Portal Home</a>
                        <div class="relative has-dropdown">
                            <a href="shop_index.html" class="nav-link ${isShopPage ? 'active' : ''}">Technician Portal</a>
                            ${createDesktopDropdown("Technician Portal")}
                        </div>
                        <div class="relative has-dropdown">
                             <a href="sales_index.html" class="nav-link ${isSalesPage ? 'active' : ''}">Sales Portal</a>
                            ${createDesktopDropdown("Sales Portal")}
                        </div>
                    </nav>
                </div>
            </header>
            
            <div id="menu-overlay" class="menu-overlay fixed inset-0 bg-black bg-opacity-50 z-40 hidden opacity-0"></div>
            <div id="slide-out-menu" class="slide-out-menu fixed top-0 left-0 h-full w-80 bg-gray-800 shadow-xl z-50 transform -translate-x-full p-6 overflow-y-auto">
                <div class="flex justify-between items-center mb-8">
                    <h2 class="text-2xl font-bold text-white">Training Menu</h2>
                    <button id="close-menu-button" class="text-gray-400 hover:text-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                ${createSlideOutNav()}
            </div>
        `;

        this.addEventListeners();
    }

    addEventListeners() {
        const menuButton = this.querySelector('#mobile-menu-button');
        const closeMenuButton = this.querySelector('#close-menu-button');
        const slideOutMenu = this.querySelector('#slide-out-menu');
        const menuOverlay = this.querySelector('#menu-overlay');

        const toggleMenu = () => {
            const isHidden = slideOutMenu.classList.contains('-translate-x-full');
            if (isHidden) {
                slideOutMenu.classList.remove('-translate-x-full');
                menuOverlay.classList.remove('hidden');
                setTimeout(() => menuOverlay.classList.remove('opacity-0'), 10);
            } else {
                slideOutMenu.classList.add('-translate-x-full');
                menuOverlay.classList.add('opacity-0');
                setTimeout(() => menuOverlay.classList.add('hidden'), 300);
            }
        };

        if (menuButton && slideOutMenu && menuOverlay && closeMenuButton) {
            menuButton.addEventListener('click', toggleMenu);
            closeMenuButton.addEventListener('click', toggleMenu);
            menuOverlay.addEventListener('click', toggleMenu);
        }
    }
}

customElements.define('main-header', MainHeader);


