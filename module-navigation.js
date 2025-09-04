/**
 * TDS Training Portal Module Navigation
 */
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isRoot = !path.includes('/shop/') && !path.includes('/sales/') && !path.includes('/checklists/');
    const getRelativePath = (target) => isRoot ? target : `../${target}`;

    const portals = {
        technician: [
            { url: 'shop/shop_index.html', title: 'Technician Home' },
            { url: 'shop/shop_training-pathway.html', title: 'New Tech Pathway' },
            { url: 'shop/shop_tech_workflow.html', title: 'Technician SOP' },
            { url: 'shop/shop_safety.html', title: 'Safety Guide' },
            { url: 'shop/shop_chemicals.html', title: 'Chemicals Guide' },
            { url: 'shop/shop_exterior.html', title: 'Exterior: Wash & Decon' },
            { url: 'shop/shop_paint_correction.html', title: 'Paint Correction' },
            { url: 'shop/shop_ceramic_coating.html', title: 'Ceramic Coating' },
            { url: 'shop/shop_interior.html', title: 'Interior Restoration' },
            { url: 'shop/shop_tint.html', title: 'Window Tinting Guide' },
            { url: 'shop/shop_ppf.html', title: 'PPF Installation Guide' },
            { url: 'shop/shop_quiz.html', title: 'Technician Quiz' }
        ],
        sales: [
            { url: 'sales/sales_index.html', title: 'Sales Home' },
            { url: 'sales/sales_techniques.html', title: 'The TDS Sales Process' },
            { url: 'sales/sales_nepq_framework.html', title: 'The NEPQ Framework' },
            { url: 'sales/sales_scripts.html', title: 'Sales Scripts' },
            { url: 'sales/sales_sop.html', title: 'SOPs & Checklists' },
            { url: 'sales/sales_objection_handling.html', title: 'Diffusing Objections' },
            { url: 'sales/sales_tint.html', title: 'Selling Window Tint' },
            { url: 'sales/sales_ppf.html', title: 'Selling PPF' },
            { url: 'sales/sales_coatings.html', title: 'Selling Ceramic Coatings' },
            { url: 'sales/sales_paint_correction.html', title: 'Selling Paint Correction' },
            { url: 'sales/sales_detailing.html', title: 'Selling Detailing' },
            { url: 'sales/sales_quiz.html', title: 'Sales Quiz' }
        ]
    };

    const currentPage = path.substring(path.lastIndexOf('tds-training-portal/') + 'tds-training-portal/'.length);

    let currentPortalModules = [];
    if (path.includes('/shop/')) {
        currentPortalModules = portals.technician;
    } else if (path.includes('/sales/')) {
        currentPortalModules = portals.sales;
    }

    if (currentPortalModules.length === 0) return;

    const currentIndex = currentPortalModules.findIndex(module => module.url.endsWith(currentPage.split('/').pop()));
    if (currentIndex === -1) return;

    const prevModule = currentIndex > 0 ? currentPortalModules[currentIndex - 1] : null;
    const nextModule = currentIndex < currentPortalModules.length - 1 ? currentPortalModules[currentIndex + 1] : null;
    const progressPercentage = ((currentIndex + 1) / currentPortalModules.length) * 100;

    const navBar = document.createElement('div');
    navBar.className = 'fixed bottom-0 left-0 w-full bg-gray-900 text-white p-3 shadow-lg z-50';
    navBar.innerHTML = `
        <div class="container mx-auto">
            <div class="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                <div class="bg-amber-400 h-1.5 rounded-full" style="width: ${progressPercentage}%"></div>
            </div>
            <div class="flex justify-between items-center text-sm">
                <div class="w-1/3 text-left">
                    ${prevModule ? `<a href="${getRelativePath(prevModule.url)}" class="hover:text-amber-400 transition-colors">&larr; Previous: ${prevModule.title}</a>` : ''}
                </div>
                <div class="w-1/3 text-center text-gray-400">
                    Module ${currentIndex + 1} of ${currentPortalModules.length}
                </div>
                <div class="w-1/3 text-right">
                    ${nextModule ? `<a href="${getRelativePath(nextModule.url)}" class="hover:text-amber-400 transition-colors">Next: ${nextModule.title} &rarr;</a>` : ''}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(navBar);
    document.body.style.paddingBottom = `${navBar.offsetHeight}px`;
});
