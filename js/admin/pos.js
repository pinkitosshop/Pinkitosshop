// ========================================
// POS SYSTEM (PUNTO DE VENTA)
// ========================================
window.POS = {
    add(product, talla = "Única") {
        const idx = AdminState.posCart.findIndex(i => i.id === product.id && i.talla === talla);
        
        if (idx !== -1) {
            AdminState.posCart[idx].cantidad++;
        } else {
            AdminState.posCart.push({
                id: product.id,
                titulo: product.titulo,
                sku: product.sku || '',
                precio: product.precio,
                precioOriginal: product.precioOriginal,
                talla: talla,
                cantidad: 1,
                taxable: product.taxable !== undefined ? product.taxable : !!(typeof config !== 'undefined' && config.taxEnabled),
                img: product.imagenes && product.imagenes.length > 0 ? product.imagenes[0] : (product.imagen || '[https://via.placeholder.com/100/FFFFFF/2C2421?text=Sin+Imagen](https://via.placeholder.com/100/FFFFFF/2C2421?text=Sin+Imagen)')
            });
        }
        this.render();
    },

    updateQty(idx, delta) {
        AdminState.posCart[idx].cantidad += delta;
        if (AdminState.posCart[idx].cantidad <= 0) {
            AdminState.posCart.splice(idx, 1);
        }
        this.render();
    },

    clear() {
        if(typeof DarkAlert !== "undefined") {
            DarkAlert.fire({ 
                title: '¿Limpiar ticket?', 
                text: "Se borrarán los artículos", 
                icon: 'warning', 
                showCancelButton: true, 
                confirmButtonText: 'Sí, limpiar' 
            }).then((r) => {
                if (r.isConfirmed) {
                    AdminState.posCart = [];
                    AdminState.posEditingOrderId = null;
                    document.getElementById('pos-client-name').value = '';
                    document.getElementById('pos-ticket-title').innerText = 'Venta Nueva';
                    this.render();
                }
            });
        }
    },

    render() {
        if(typeof renderPosCart === "function") renderPosCart();
    }
};

window.addToPosCart = function(p, talla) { POS.add(p, talla); };
window.updatePosQty = function(idx, delta) { POS.updateQty(idx, delta); };
window.clearPosCart = function() { POS.clear(); };
