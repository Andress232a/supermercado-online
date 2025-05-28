console.log('Iniciando prueba del carrito de compras');

// Verificar si los productos se cargan correctamente
console.log('Verificando productos...');
console.log(productos.length + ' productos cargados');

// Verificar si el carrito está vacío al inicio
console.log('Verificando carrito inicial...');
console.log('El carrito tiene ' + carrito.length + ' productos');

// Intentar agregar un producto al carrito
console.log('Agregando producto al carrito...');
agregarAlCarrito(1); // Agregar el primer producto (Leche Descremada)
console.log('El carrito ahora tiene ' + carrito.length + ' productos');

// Verificar si el contador del carrito se actualiza
const cartCount = document.getElementById('cart-count');
console.log('Contador del carrito muestra: ' + cartCount.textContent);
