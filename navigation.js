/**
 * TDS Training Portal Navigation Module
 * Version 2.2 - With Simplified Active State Correction
 * This script generates the main header and navigation menus.
 * It now uses a more reliable method to determine the active page,
 * ensuring correct menu expansion and link highlighting from any subdirectory.
 */
class MainHeader extends HTMLElement {
    connectedCallback() {
        // --- DYNAMIC PATH CORRECTION ---
        const pathArray = window.location.pathname.split('/').filter(Boolean);
        if (pathArray.length > 0 && pathArray[pathArray.length - 1].includes('.')) {
            pathArray.pop();
        }
        const depth = pathArray.length;
        const pathPrefix = '../'.repeat(depth) || './';
        // --- END DYNAMIC PATH CORRECTION ---

        const currentPath = window.location.pathname;

        const allLinks = {
            "Technician Portal": {
                "Start Here": [
                    { href: 'shop/shop_index.html', text: 'Technician Home' },
                    { href: 'shop/shop_training-pathway.html', text: 'New Technician Pathway' }
                ],
                "Foundational Knowledge": [
                    { href: 'shop/shop_tech_workflow.html', text: 'Technician SOP' },
                    { href: 'shop/shop_safety.html', text: 'Safety Guide' },
                    { href: 'shop/shop_chemicals.html', text: 'Chemicals Guide' }
                ],
                "Core Detailing Skills": [
                    { href: 'shop/shop_exterior.html', text: 'Exterior Mastery' },
                    { href: 'shop/shop_interior.html', text: 'Interior Restoration' },
                    { href: 'shop/shop_paint_correction.html', text: 'Paint Correction Guide' },
                    { href: 'shop/shop_ceramic_coating.html', text: 'Ceramic Coating Guide' }
                ],
                "Window Tinting": [
                    { href: 'shop/shop_tint.html', text: 'Installation Guide' },
                    { href: 'shop/shop_tint_pathway.html', text: 'Training Pathway' }
                ],
                "Paint Protection Film": [
                    { href: 'shop/shop_ppf.html', text: 'Installation Guide' },
                    { href: 'shop/shop_ppf_pathway.html', text: 'Training Pathway' }
                ],
                "Vinyl Wrapping": [
                    { href: 'shop/shop_vinyl_wrapping.html', text: 'Installation Guide' },
                    { href: 'shop/shop_vinyl_pathway.html', text: 'Training Pathway' }
                ],
                "Certification": [
                    { href: 'shop/shop_quiz.html', text: 'Technician Quiz' }
                ]
            },
            "Sales Portal": {
                "Getting Started": [
                    { href: 'sales/sales_index.html', text: 'Sales Home' },
                ],
                "Sales Methodology": [
                    { href: 'sales/sales_techniques.html', text: 'The TDS Sales Process' },
                    { href: 'sales/sales_nepq_framework.html', text: 'The NEPQ Framework' },
                    { href: 'sales/sales_objection_handling.html', text: 'Diffusing Objections' },
                ],
                "Execution Playbooks": [
                    { href: 'sales/scripts/scripts_tint.html', text: 'Tint Sales Playbook' },
                    { href: 'sales/scripts/scripts_ppf.html', text: 'PPF Sales Playbook' },
                    { href: 'sales/scripts/scripts_coatings.html', text: 'Coating Sales Playbook' },
                ],
                "Product Knowledge": [
                    { href: 'sales/sales_tint.html', text: 'Selling Window Tint' },
                    { href: 'sales/sales_ppf.html', text: 'Selling PPF' },
                    { href: 'sales/sales_coatings.html', text: 'Selling Ceramic Coatings' },
                    { href: 'sales/sales_paint_correction.html', text: 'Selling Paint Correction' },
                    { href: 'sales/sales_detailing.html', text: 'Selling Detailing' },
                ],
                "Testing": [
                    { href: 'sales/sales_quiz.html', text: 'Sales Quiz' },
                ]
            }
        };

        // --- NEW SIMPLIFIED isActive FUNCTION ---
        // Checks if the browser's current path ends with the given root-relative href.
        // This is more reliable than the URL constructor in some environments.
        const isActive = (rootRelativeHref) => {
            return currentPath.endsWith(rootRelativeHref);
        };
        const isRootActive = currentPath.endsWith('/') || currentPath.endsWith('/index.html');
        // --- END NEW FUNCTION ---

        const createSlideOutNav = () => {
            let html = `<div class="mb-4">
                <a href="${pathPrefix}index.html" class="block p-3 rounded-md text-lg font-semibold ${isRootActive ? 'bg-amber-500 text-gray-900' : 'text-white hover:bg-gray-700'}">Portal Home</a>
            </div>`;

            for (const portal in allLinks) {
                const portalData = allLinks[portal];
                // *** FIX: Pass the simple href to isActive ***
                const isCurrentPortal = Object.values(portalData).flat().some(link => isActive(link.href));

                html += `<div class="mb-2">`;
                html += `<button class="accordion-toggle w-full text-left p-3 rounded-md text-lg font-semibold flex justify-between items-center ${isCurrentPortal ? 'bg-gray-700' : ''} text-white hover:bg-gray-600">
                            <span>${portal}</span>
                            <svg class="w-6 h-6 transform transition-transform ${isCurrentPortal ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                         </button>`;
                html += `<div class="accordion-content overflow-hidden transition-all duration-300 ease-in-out ${isCurrentPortal ? 'max-h-screen' : 'max-h-0'}" style="padding-left: 1rem;">`;

                for (const category in portalData) {
                    html += `<h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mt-4">${category}</h3>`;
                    html += '<div class="mt-2 space-y-1">';
                    portalData[category].forEach(link => {
                        // *** FIX: Pass the simple href to isActive ***
                        const activeClass = isActive(link.href) ? 'bg-amber-500 text-gray-900' : 'text-white hover:bg-gray-700';
                        html += `<a href="${pathPrefix}${link.href}" class="block p-2 rounded-md text-base font-medium ${activeClass}">${link.text}</a>`;
                    });
                    html += `</div>`;
                }
                html += `</div></div>`;
            }
            return html;
        };

        const createDesktopDropdown = (portalName) => {
            const portalData = allLinks[portalName];
            let html = `<div class="dropdown-menu absolute hidden bg-gray-800 text-white rounded-md shadow-lg py-2 w-64 z-20">`;
            for (const category in portalData) {
                html += `<h3 class="px-4 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">${category}</h3>`;
                portalData[category].forEach(link => {
                    // *** FIX: Pass the simple href to isActive ***
                    const activeClass = isActive(link.href) ? 'bg-amber-500 text-gray-900' : 'hover:bg-gray-700';
                    html += `<a href="${pathPrefix}${link.href}" class="block px-4 py-2 text-sm ${activeClass}">${link.text}</a>`;
                });
            }
            html += `</div>`;
            return html;
        };
        
        // *** FIX: Pass the simple href to isActive ***
        const isShopPage = Object.values(allLinks["Technician Portal"]).flat().some(link => isActive(link.href));
        const isSalesPage = Object.values(allLinks["Sales Portal"]).flat().some(link => isActive(link.href));

        this.innerHTML = `
            <style>
                .slide-out-menu { transition: transform 0.3s ease-in-out; }
                .menu-overlay { transition: opacity 0.3s ease-in-out; }
                .has-dropdown:hover .dropdown-menu { display: block; }
                .nav-link { transition: all 0.2s ease; padding-bottom: 4px; border-bottom: 2px solid transparent; }
                .nav-link:hover { color: #FBBF24; border-bottom-color: #FBBF24; }
                .nav-link.active { color: #F59E0B; font-weight: 600; border-bottom-color: #F59E0B; }
                .accordion-content { transition: max-height 0.3s ease-in-out; }
            </style>
            <header class="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
                <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="${pathPrefix}index.html" class="text-3xl font-bold"><span class="text-amber-400">TDS</span> Training Portal</a>
                    <button id="mobile-menu-button" class="md:hidden focus:outline-none z-50">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                     <nav class="hidden md:flex items-center space-x-6">
                        <a href="${pathPrefix}index.html" class="nav-link ${isRootActive ? 'active' : ''}">Portal Home</a>
                        <div class="relative has-dropdown">
                            <a href="${pathPrefix}shop/shop_index.html" class="nav-link ${isShopPage ? 'active' : ''}">Technician Portal</a>
                            ${createDesktopDropdown("Technician Portal")}
                        </div>
                        <div class="relative has-dropdown">
                             <a href="${pathPrefix}sales/sales_index.html" class="nav-link ${isSalesPage ? 'active' : ''}">Sales Portal</a>
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
        
        // Accordion functionality
        this.querySelectorAll('.accordion-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('svg');

                if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                    content.style.maxHeight = '0px';
                    icon.classList.remove('rotate-180');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.classList.add('rotate-180');
                }
            });
        });
    }
}

customElements.define('main-header', MainHeader);

