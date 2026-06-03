// ========================================
// WISHLIST MODULE - PINKITOS SHOP
// ========================================
window.Wishlist = {
    items: JSON.parse(localStorage.getItem("pk_wishlist")) || [],

    save() {
        localStorage.setItem("pk_wishlist", JSON.stringify(this.items));
    },

    toggle(id, event) {
        if (event) event.stopPropagation();
        
        const idx = this.items.indexOf(id);
        let incVal = 0;

        if (idx > -1) {
            this.items.splice(idx, 1);
            if(typeof Toast !== "undefined") Toast.fire({icon: 'info', title: 'Removido de favoritos'});
            incVal = -1;
        } else {
            this.items.push(id);
            if(typeof Toast !== "undefined") Toast.fire({icon: 'success', title: 'Añadido a favoritos'});
            incVal = 1;
        }

        this.save();
        this.updateUI();
        if (typeof renderGallery === "function") renderGallery();
        
        const modal = document.getElementById('wishlist-modal');
        if (modal && modal.classList.contains('active') && typeof renderWishlist === "function") {
            renderWishlist();
        }

        if (typeof db !== "undefined") {
            const docRef = db.collection("productos").doc(id);
            db.runTransaction((transaction) => {
                return transaction.get(docRef).then((sfDoc) => {
                    if (!sfDoc.exists) return;
                    let currentCount = sfDoc.data().favCount || 0;
                    let newCount = Math.max(0, currentCount + incVal);
                    transaction.update(docRef, { favCount: newCount });
                });
            }).catch((error) => console.log("Error en favoritos: ", error));
        }
    },

    has(id) {
        return this.items.includes(id);
    },

    updateUI() {
        const iconD = document.getElementById('nav-wishlist-icon');
        const iconM = document.getElementById('nav-wishlist-icon-mobile');
        const isActive = this.items.length > 0;

        if (iconD) iconD.className = `far fa-heart text-${isActive ? 'promo' : 'dark'} text-xl transition-all ${isActive ? 'fas' : 'far'}`;
        if (iconM) iconM.className = `far fa-heart text-${isActive ? 'promo' : 'dark'} text-lg mb-1 transition-all ${isActive ? 'fas' : 'far'}`;
    }
};

window.toggleWishlist = function(id, event) { Wishlist.toggle(id, event); };
window.updateWishlistNav = function() { Wishlist.updateUI(); };
