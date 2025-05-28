// Datos de productos (precios en COP - valores aproximados a precios reales en Colombia)
const productos = [
    {
        id: 1,
        nombre: "Leche Descremada",
        precio: 6000,
        imagen: "images/leche.jpg",
        categoria: "Lácteos"
    },
    {
        id: 2,
        nombre: "Pan Integral",
        precio: 2500,
        imagen: "images/pan.jpg",
        categoria: "Alimentos"
    },
    {
        id: 3,
        nombre: "Manzanas",
        precio: 3000,
        imagen: "images/manzanas.jpg",
        categoria: "Frutas"
    },
    {
        id: 4,
        nombre: "Agua Natural",
        precio: 1500,
        imagen: "images/agua.jpg",
        categoria: "Bebidas"
    },
    {
        id: 5,
        nombre: "Queso Cheddar",
        precio: 12000,
        imagen: "images/queso.jpg",
        categoria: "Lácteos"
    },
    {
        id: 6,
        nombre: "Arroz Integral",
        precio: 4000,
        imagen: "images/arroz.jpg",
        categoria: "Alimentos"
    },
    {
        id: 7,
        nombre: "Plátanos",
        precio: 2000,
        imagen: "images/platanos.jpg",
        categoria: "Frutas"
    },
    {
        id: 8,
        nombre: "Juguito de Naranja",
        precio: 3500,
        imagen: "images/juguito.jpg",
        categoria: "Bebidas"
    },
    {
        id: 9,
        nombre: "Yogurt Natural",
        precio: 1600,
        imagen: "images/yogurt.jpg",
        categoria: "Lácteos"
    },
    {
        id: 10,
        nombre: "Harina de Trigo",
        precio: 1300,
        imagen: "images/harina.jpg",
        categoria: "Alimentos"
    },
    {
        id: 11,
        nombre: "Fresas",
        precio: 2800,
        imagen: "images/fresas.jpg",
        categoria: "Frutas"
    },
    {
        id: 12,
        nombre: "Cerveza Nacional",
        precio: 2500,
        imagen: "images/cerveza.jpg",
        categoria: "Bebidas"
    },
    {
        id: 13,
        nombre: "Mantequilla",
        precio: 2200,
        imagen: "images/mantequilla.jpg",
        categoria: "Lácteos"
    },
    {
        id: 14,
        nombre: "Azúcar",
        precio: 1000,
        imagen: "images/azucar.jpg",
        categoria: "Alimentos"
    },
    {
        id: 15,
        nombre: "Naranjas",
        precio: 1700,
        imagen: "images/naranjas.jpg",
        categoria: "Frutas"
    },
    {
        id: 16,
        nombre: "Agua con Gas",
        precio: 900,
        imagen: "images/agua_gas.jpg",
        categoria: "Bebidas"
    }
];

// Carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notification';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    notificacion.style.transform = 'translateX(0)';
    notificacion.style.opacity = '1';

    setTimeout(() => {
        notificacion.style.transform = 'translateX(100%)';
        notificacion.style.opacity = '0';
        
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

// Función para abrir modal
function abrirModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (!modal) return;

    const modalesAbiertos = document.querySelectorAll('.modal.show');
    modalesAbiertos.forEach(m => m.classList.remove('show'));

    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    switch (modalId) {
        case 'carrito':
            actualizarCarrito();
            break;
        case 'productos':
            mostrarProductos();
            break;
        case 'categorias':
            mostrarCategorias();
            break;
    }
}

// Función para cerrar modal
function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Remover la clase show
    modal.classList.remove('show');
    
    // Agregar una clase de animación de salida
    modal.classList.add('modal-closing');
    
    // Restaurar el scroll del body
    document.body.style.overflow = '';

    // Limpiar contenido específico del modal
    if (modalId === 'modal-categorias') {
        const categoriasContainer = modal.querySelector('.categorias-container');
        if (categoriasContainer) {
            categoriasContainer.innerHTML = '';
        }
    }

    // Limpiar el formulario si es el modal de contacto
    if (modalId === 'modal-contacto') {
        const formulario = modal.querySelector('form');
        if (formulario) {
            formulario.reset();
        }
    }

    // Restaurar el estado original después de la animación
    setTimeout(() => {
        modal.classList.remove('modal-closing');
        modal.style.display = 'none';
    }, 300);
}

// Función para mostrar categorías
function mostrarCategorias() {
    const container = document.getElementById('categorias-container');
    if (!container) return;

    const categorias = [...new Set(productos.map(p => p.categoria))];
    container.innerHTML = '';

    categorias.forEach(categoria => {
        const categoriaHTML = `
            <div class="categoria-card" onclick="mostrarProductosCategoria('${categoria}')">
                <img src="images/${categoria.toLowerCase()}.jpg" alt="${categoria}">
                <h3>${categoria}</h3>
            </div>
        `;
        container.innerHTML += categoriaHTML;
    });
}

// Función para mostrar productos
function mostrarProductos() {
    const container = document.getElementById('productos-container');
    if (!container) return;

    container.innerHTML = '';
    productos.forEach(producto => {
        const productoHTML = `
            <div class="product-card" data-id="${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="precio">₡${producto.precio.toLocaleString()}</p>
                <button class="add-to-cart" data-id="${producto.id}">
                    <i class="fas fa-cart-plus"></i> Agregar al carrito
                </button>
            </div>
        `;
        container.innerHTML += productoHTML;
    });

    const botones = container.querySelectorAll('.add-to-cart');
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.dataset.id);
            if (isNaN(id)) {
                console.error('ID inválido:', this.dataset.id);
                mostrarNotificacion('Error: ID de producto inválido');
                return;
            }
            agregarAlCarrito(id);
        });
    });
}

// Función para mostrar productos filtrados por categoría
function mostrarProductosCategoria(categoria) {
    const container = document.getElementById('productos-categoria-container');
    const titulo = document.getElementById('categoria-titulo');
    if (!container || !titulo) return;

    titulo.textContent = `Productos de ${categoria}`;
    container.innerHTML = '';
    const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
    
    if (productosFiltrados.length === 0) {
        container.innerHTML = '<p class="no-productos">No hay productos disponibles en esta categoría</p>';
        return;
    }

    productosFiltrados.forEach(producto => {
        const productoHTML = `
            <div class="product-card" data-id="${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="precio">₡${producto.precio.toLocaleString()}</p>
                <button class="add-to-cart" data-id="${producto.id}">
                    <i class="fas fa-cart-plus"></i> Agregar al carrito
                </button>
            </div>
        `;
        container.innerHTML += productoHTML;
    });

    // Agregar eventos a los botones después de generar el HTML
    const botones = container.querySelectorAll('.add-to-cart');
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            const id = parseInt(this.dataset.id);
            if (isNaN(id)) {
                console.error('ID inválido:', this.dataset.id);
                mostrarNotificacion('Error: ID de producto inválido');
                return;
            }
            agregarAlCarrito(id);
        });
    });
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar productos
    mostrarProductos();

    // Event listener para el ícono del carrito
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModal('carrito');
        });
    }

    // Event listeners para cerrar modales
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que el clic se propague al modal
            const modal = this.closest('.modal');
            if (modal) {
                cerrarModal(modal.id);
            }
        });
    });

    // Event listener para cerrar modal al hacer clic fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(event) {
            // Solo cerrar si se hace clic fuera del contenido
            if (event.target === this) {
                cerrarModal(this.id);
            }
        });
    });

    // Event listener para los botones de categorías
    document.querySelectorAll('.categoria-card').forEach(card => {
        card.addEventListener('click', function() {
            const categoria = this.querySelector('h3').textContent;
            abrirModal('productos-categoria');
            mostrarProductosCategoria(categoria);
        });
    });

    // Actualizar carrito al cargar la página
    actualizarCarrito();
});

// Función para agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) {
        mostrarNotificacion('Error: Producto no encontrado');
        return;
    }

    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    try {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    } catch (e) {
        console.error('Error al guardar el carrito:', e);
    }

    actualizarCarrito();
    mostrarNotificacion(`¡${producto.nombre} agregado al carrito!`);
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        cartCount.textContent = totalItems;
    }

    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');
    
    if (!carritoItems || !carritoTotal) return;

    carritoItems.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
    }

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const itemHTML = `
            <div class="carrito-item" data-id="${item.id}">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="carrito-item-info">
                    <h3>${item.nombre}</h3>
                    <p>Precio: $${item.precio.toLocaleString()}</p>
                    <div class="cantidad-controls">
                        <button class="btn-cantidad" data-id="${item.id}" data-accion="menos">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.cantidad}</span>
                        <button class="btn-cantidad" data-id="${item.id}" data-accion="mas">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <p>Subtotal: $${subtotal.toLocaleString()}</p>
                </div>
                <button class="eliminar-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        carritoItems.innerHTML += itemHTML;
    });

    carritoTotal.textContent = `$${total.toLocaleString()}`;

    const botonesCantidad = document.querySelectorAll('.btn-cantidad');
    botonesCantidad.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const accion = this.dataset.accion;
            if (accion === 'mas') {
                cambiarCantidad(id, 1);
            } else {
                cambiarCantidad(id, -1);
            }
        });
    });

    const botonesEliminar = document.querySelectorAll('.eliminar-item');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            eliminarDelCarrito(id);
        });
    });
}

// Función para cambiar cantidad
function cambiarCantidad(id, cantidad) {
    const item = carrito.find(item => item.id === id);
    if (!item) return;

    item.cantidad += cantidad;
    if (item.cantidad <= 0) {
        eliminarDelCarrito(id);
    } else {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    }
}

// Función para eliminar del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para procesar compra
function procesarCompra() {
    if (carrito.length === 0) {
        mostrarNotificacion('El carrito está vacío');
        return;
    }

    const modalCompra = document.getElementById('modal-compra');
    if (!modalCompra) return;

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const totalElement = document.getElementById('total-pago');
    if (totalElement) {
        totalElement.textContent = total.toLocaleString();
    }

    modalCompra.classList.add('show');

    const entregaInputs = document.querySelectorAll('input[name="entrega"]');
    entregaInputs.forEach(input => {
        input.addEventListener('change', function() {
            const direccionGroup = document.getElementById('direccion-group');
            if (direccionGroup) {
                if (this.value === 'domicilio') {
                    direccionGroup.style.display = 'block';
                } else {
                    direccionGroup.style.display = 'none';
                }
            }
        });
    });

    const formulario = document.getElementById('formulario-compra');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const datos = {
                nombre: document.getElementById('nombre').value,
                telefono: document.getElementById('telefono').value,
                pago: document.querySelector('input[name="pago"]:checked').value,
                entrega: document.querySelector('input[name="entrega"]:checked').value,
                direccion: document.getElementById('direccion').value,
                total: total,
                productos: carrito.map(item => ({
                    id: item.id,
                    nombre: item.nombre,
                    cantidad: item.cantidad,
                    precio: item.precio
                }))
            };

            mostrarNotificacion('¡Compra realizada con éxito!');
            carrito = [];
            localStorage.removeItem('carrito');
            actualizarCarrito();
            cerrarModal(modalCompra);
        });
    }
    const notificacion = document.createElement('div');
    notificacion.className = 'notification';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    // Animación de entrada
    notificacion.style.transform = 'translateX(0)';
    notificacion.style.opacity = '1';

    // Eliminar después de 3 segundos
    setTimeout(() => {
        // Animación de salida
        notificacion.style.transform = 'translateX(100%)';
        notificacion.style.opacity = '0';
        
        // Eliminar después de la animación
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

// Función para enviar el formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const formularioContacto = document.getElementById('formulario-contacto');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const datos = {
                nombre: document.getElementById('nombre-contacto').value,
                email: document.getElementById('email-contacto').value,
                mensaje: document.getElementById('mensaje-contacto').value
            };

            // Validar datos
            if (!datos.nombre || !datos.email || !datos.mensaje) {
                mostrarNotificacion('Por favor complete todos los campos');
                return;
            }

            // Aquí iría la lógica para enviar el mensaje al servidor
            // Por ahora solo mostramos una notificación de éxito
            mostrarNotificacion('Mensaje enviado con éxito');
            
            // Limpiar el formulario
            formularioContacto.reset();
            
            // Cerrar el modal
            const modalContacto = document.getElementById('modal-contacto');
            if (modalContacto) {
                cerrarModal(modalContacto);
            }
        });
    }
});

// Función para mostrar categorías
function mostrarCategorias() {
    const container = document.getElementById('categorias-container');
    if (container) {
        container.innerHTML = '';
        const categorias = ['Lácteos', 'Alimentos', 'Frutas', 'Bebidas'];
        categorias.forEach(categoria => {
            const categoriaHTML = `
                <div class="categoria-card" onclick="mostrarProductosCategoria('${categoria}')">
                    <img src="images/${categoria.toLowerCase()}.jpg" alt="${categoria}">
                    <h3>${categoria}</h3>
                </div>
            `;
            container.innerHTML += categoriaHTML;
        });
    }
}

// Event listener para las categorías
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el carrito
    inicializarCarrito();
    
    // Mostrar productos en la modal de productos
    mostrarProductos();
    
    // Event listener para las categorías
    document.querySelectorAll('.categoria-card').forEach(categoria => {
        categoria.addEventListener('click', function() {
            const categoriaNombre = this.querySelector('h3').textContent;
            mostrarProductosCategoria(categoriaNombre);
            abrirModal('productos-categoria');
        });
    });

    // Event listener para el ícono del carrito
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModal('carrito');
        });
    }

    // Event listener para cerrar modales
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                cerrarModal(modal);
            }
        });
    });

    // Event listener para cerrar modal al hacer clic fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                cerrarModal(this);
            }
        });
    });
});

// Event listener para el formulario de contacto
const contactoForm = document.getElementById('contact-form');
if (contactoForm) {
    contactoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        enviarMensaje(e.target);
    });
}

// Función para enviar mensaje de contacto
function enviarMensaje(form) {
    const nombre = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const mensaje = form.querySelector('textarea').value;

    // Aquí iría la lógica para enviar el mensaje al servidor
    mostrarNotificacion('¡Gracias por tu mensaje! Nos contactaremos contigo pronto.');
    form.reset();
    cerrarModal();
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar productos en la modal de productos
    mostrarProductos();
});
