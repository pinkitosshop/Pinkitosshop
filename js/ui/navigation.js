// ========================================
// UI NAVIGATION & MODALS MODULE
// ========================================
window.Navigation = {
    showSection(id) {
        document.querySelectorAll('.section-fade').forEach(s => { 
            s.classList.remove('active'); 
            s.style.display = 'none'; 
        });
        const target = document.getElementById(id);
        if (target) {
            target.style.display = 'block';
            setTimeout(() => target.classList.add('active'), 50);
        }
        window.scrollTo({top: 0, behavior: 'smooth'});
    },

    toggleMobileSearch() {
        const c = document.getElementById('mobile-search-container');
        if (c.classList.contains('scale-y-0')) {
            c.classList.remove('hidden');
            setTimeout(() => {
                c.classList.remove('scale-y-0');
                c.classList.add('scale-y-100');
                document.getElementById('mobile-live-search').focus();
            }, 10);
        } else {
            c.classList.remove('scale-y-100');
            c.classList.add('scale-y-0');
            setTimeout(() => c.classList.add('hidden'), 300);
        }
    },

    toggleMobileCategories() {
        document.getElementById('mobile-cat-drawer').classList.toggle('-translate-x-full');
    },

    toggleCartDrawer() {
        const d = document.getElementById('cart-drawer');
        const o = document.getElementById('cart-drawer-overlay');
        
        if (d.classList.contains('translate-x-full')) {
            document.body.classList.add('overflow-hidden');
            o.classList.remove('hidden');
            setTimeout(() => o.classList.remove('opacity-0'), 10);
            d.classList.remove('translate-x-full');
            if(typeof cancelarCheckout === "function") cancelarCheckout();
            if(typeof renderCarrito === "function") renderCarrito();
        } else {
            document.body.classList.remove('overflow-hidden');
            o.classList.add('opacity-0');
            d.classList.add('translate-x-full');
            setTimeout(() => o.classList.add('hidden'), 300);
        }
    }
};

window.showSection = Navigation.showSection;
window.toggleMobileSearch = Navigation.toggleMobileSearch;
window.toggleMobileCategories = Navigation.toggleMobileCategories;
window.toggleCartDrawer = Navigation.toggleCartDrawer;
