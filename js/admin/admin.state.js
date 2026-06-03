// ========================================
// ADMIN STATE GLOBAL
// ========================================
window.AdminState = {
    inventario: [],
    pedidos: [],
    posCart: [],
    posEditingOrderId: null,
    
    setInventario(data) {
        this.inventario = data;
        if(typeof renderAdminList === "function") renderAdminList();
        if(typeof renderPosInventory === "function") renderPosInventory();
    },

    setPedidos(data) {
        this.pedidos = data;
        if(typeof renderPedidosList === "function") renderPedidosList();
        if(typeof renderFacturasList === "function") renderFacturasList();
    }
};