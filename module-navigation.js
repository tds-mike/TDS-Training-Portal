/**
 * TDS Training Portal Module Navigation
 *
 * This script adds a sticky bottom navigation bar with a progress bar, 
 * next/previous module buttons, and estimated completion time.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Define the module structure for both portals
    const portals = {
        technician: [
            { url: 'shop_index.html', title: 'Technician Home', time: 5 },
            { url: 'safety.html', title: 'Safety Guide', time: 15 },
            { url: 'chemicals.html', title: 'Chemicals Guide', time: 20 },
            { url: 'exterior.html', title: 'Exterior Mastery', time: 30 },
            { url: 'interior.html', title: 'Interior Restoration', time: 25 },
            { url: 'tint.html', title: 'Window Tinting Guide', time: 20 },
            { url: 'ppf.html', title: 'PPF Installation Guide', time: 25 },
            { url: 'checklists.html', title: 'Printable Checklists', time: 10 },
            { url: 'shop_quiz.html', title: 'Technician Knowledge Quiz', time: 15 }
        ],
        sales: [
            { url: 'sales_index.html', title: 'Sales Home', time: 5 },
            { url: 'sales_techniques.html', title: 'The TDS Sales Process', time: 20 },
            { url: 'sales_nepq_framework.html', title: 'The NEPQ Framework', time: 25 },
            { url: 'sales_scripts.html', title: 'Sales Scripts', time: 15 },
            { url: 'sales_sop.html', title: 'SOPs & Checklists', time: 15 },
            { url: 'sales_objection_handling.html', title: 'Diffusing Objections', time: 20 },
            { url: 'sales_tint.html', title: 'Selling Window Tint', time: 15 },
            { url: 'sales_ppf.html', title: 'Selling PPF', time: 15 },
            { url: 'sales_coatings.html', title: 'Selling Ceramic Coatings', time: 15 },
            { url: 'sales_paint_correction.html', title: 'Selling Paint Correction', time: 10 },
            { url: 'sales_detailing.html', title: 'Selling Detailing', time: 10 },
            { url: 'sales_quiz.html', title: 'Sales Quiz', time: 15 }
        ]
    };

    const currentPage = window.location.pathname.split('/').pop();
    let currentPortalModules = [];

    // Determine which portal's module list to use
    if (portals.technician.some(module => module.url === currentPage)) {
        currentPortalModules = portals.technician;
    } else if (portals.sales.some(module => module.url === currentPage)) {
        currentPortalModules = portals.sales;
    }

    if (currentPortalModules.length === 0) return; // Don't run on non-module pages

    const currentIndex = currentPortalModules.findIndex(module => module.url === currentPage);
    if (currentIndex === -1) return;

    const prevModule = currentIndex > 0 ? currentPortalModules[currentIndex - 1] : null;
    const nextModule = currentIndex < currentPortalModules.length - 1 ? currentPortalModules[currentIndex + 1] : null;
    const progressPercentage = ((currentIndex + 1) / currentPortalModules.length) * 100;

    // Create the navigation bar element
    const navBar = document.createElement('div');
    navBar.className = 'fixed bottom-0 left-0 w-full bg-gray-900 text-white p-3 shadow-lg z-50';
    navBar.innerHTML = `
        <div class="container mx-auto">
            <div class="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                <div class="bg-amber-400 h-1.5 rounded-full" style="width: ${progressPercentage}%"></div>
            </div>
            <div class="flex justify-between items-center text-sm">
                <div class="w-1/3 text-left">
                    ${prevModule ? `<a href="${prevModule.url}" class="hover:text-amber-400 transition-colors">&larr; Previous: ${prevModule.title}</a>` : ''}
                </div>
                <div class="w-1/3 text-center text-gray-400">
                    Module ${currentIndex + 1} of ${currentPortalModules.length}
                </div>
                <div class="w-1/3 text-right">
                    ${nextModule ? `<a href="${nextModule.url}" class="hover:text-amber-400 transition-colors">Next: ${nextModule.title} &rarr;</a>` : ''}
                </div>
            </div>
        </div>
    `;
    
    // Add the navigation bar to the body
    document.body.appendChild(navBar);

    // Add padding to the bottom of the body to prevent content from being hidden
    const setBodyPadding = () => {
        const navBarHeight = navBar.offsetHeight;
        document.body.style.paddingBottom = `${navBarHeight}px`;
    };

    setBodyPadding();
    window.addEventListener('resize', setBodyPadding);
});