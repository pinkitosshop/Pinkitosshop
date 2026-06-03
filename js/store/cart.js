// ========================================
// CART MODULE - PINKITOS SHOP
// ========================================
window.Cart = {
    items: JSON.parse(localStorage.getItem("pk_carrito")) || [],

    save() {
        localStorage.setItem("pk_carrito", JSON.stringify(this.items));
    },

    add(product, quantity = 1, talla = "Única") {
        const existing = this.items.find(i => i.id === product.id && i.talla === talla);
        
        if (existing) {
            existing.cantidad += quantity;
        } else {
            this.items.push({
                id: product.id,
                titulo: product.titulo,
                sku: product.sku || '',
                talla: talla,
                cantidad: quantity,
                img: product.imagenes && product.imagenes.length > 0 ? product.imagenes[0] : (product.imagen || '[https://via.placeholder.com/400x400/FFFFFF/2C2421?text=Sin+Imagen](https://via.placeholder.com/400x400/FFFFFF/2C2421?text=Sin+Imagen)')
            });
        }
        
        this.save();
        this.render();
    },

    updateQty(index, delta) {
        if (!this.items[index]) return;
        this.items[index].cantidad += delta;
        
        if (this.items[index].cantidad <= 0) {
            this.items.splice(index, 1);
        }
        
        this.save();
        this.render();
    },

    clear() {
        this.items = [];
        this.save();
        this.render();
    },

    getCount() {
        return this.items.reduce((sum, item) => sum + item.cantidad, 0);
    },

    render() {
        const count = document.getElementById("cart-count");
        const countMobile = document.getElementById("cart-count-mobile");
        
        if (count) count.innerText = this.getCount();
        if (countMobile) countMobile.innerText = this.getCount();

        if (typeof renderCarrito === "function") {
            renderCarrito();
        }
    }
};

window.updateCartQty = function(idx, delta) {
    Cart.updateQty(idx, delta);
};
