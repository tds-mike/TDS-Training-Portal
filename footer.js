/**
 * TDS Training Portal Footer Module
 *
 * This script defines a custom HTML element <main-footer> that dynamically
 * generates the site's footer. It also automatically updates the copyright year.
 * This reduces code duplication and simplifies maintenance.
 *
 * Usage:
 * 1. Include this script in your HTML page: <script src="footer.js" defer></script>
 * 2. Place the custom element where you want the footer: <main-footer></main-footer>
 */
class MainFooter extends HTMLElement {
    connectedCallback() {
        const currentYear = new Date().getFullYear();
        this.innerHTML = `
            <footer class="bg-gray-900 text-white text-center p-6 mt-12">
                <p>&copy; ${currentYear} The Detail Shop, LLC. All Rights Reserved.</p>
            </footer>
        `;
    }
}

// Define the new custom element so the browser recognizes <main-footer>
customElements.define('main-footer', MainFooter);
