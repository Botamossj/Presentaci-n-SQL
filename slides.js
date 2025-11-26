// Datos de las consultas SQL
const queries = [
    `-- 1. ¿Cuántos clientes existen en la tabla Customer?
SELECT COUNT(*) AS TotalClientes
FROM [SalesLT].[Customer];`,

    `-- 2. Lista los 10 primeros productos ordenados por nombre (A–Z).
SELECT TOP (10) ProductID, Name
FROM [SalesLT].[Product]
ORDER BY Name ASC;`,

    `-- 3. Obtén todos los productos cuyo precio sea mayor a 500.
SELECT ProductID, Name, ListPrice
FROM [SalesLT].[Product]
WHERE ListPrice > 500;`,

    `-- 4. Muestra los métodos de envío distintos registrados en SalesOrderHeader.
SELECT DISTINCT ShipMethod AS Métodos_envío
FROM [SalesLT].[SalesOrderHeader];`,

    `-- 5. Obtén las órdenes realizadas entre 2008 y 2009.
SELECT SalesOrderID, RevisionNumber, OrderDate
FROM [SalesLT].[SalesOrderHeader]
WHERE YEAR(OrderDate) BETWEEN 2008 AND 2009;`,

    `-- 6. Encuentra los clientes cuyo apellido sea igual a 'Lopez'.
SELECT FirstName, LastName
FROM [SalesLT].[Customer]
WHERE LastName = 'Lopez';`,

    `-- 7. ¿Cuántos productos hay en cada color? (usar GROUP BY).
SELECT Color, COUNT(*) AS TotalProductos
FROM [SalesLT].[Product]
GROUP BY Color;`,

    `-- 8. Lista el ID y el nombre de los clientes cuyo CompanyName empieza con A.
SELECT CustomerID, CompanyName
FROM [SalesLT].[Customer]
WHERE CompanyName LIKE 'A%';`,

    `-- 9. Muestra los productos cuyo nombre contiene la palabra 'Bike'.
SELECT ProductID, Name
FROM [SalesLT].[Product]
WHERE Name LIKE '%Bike%';`,

    `-- 10. Muestra las 5 órdenes más recientes usando ORDER BY fecha descendente.
SELECT TOP (5) *
FROM [SalesLT].[SalesOrderHeader]
ORDER BY OrderDate DESC;`,

    `-- 11. Muestra el número total de órdenes por cada cliente.
SELECT c.CustomerID,
       c.FirstName,
       c.LastName,
       COUNT(soh.SalesOrderID) AS TotalOrdenes
FROM [SalesLT].[Customer] AS c
JOIN [SalesLT].[SalesOrderHeader] AS soh
    ON c.CustomerID = soh.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName;`,

    `-- 12. Obtén los productos junto con la cantidad total vendida (SalesOrderDetail).
SELECT p.ProductID,
       p.Name,
       SUM(d.OrderQty) AS CantidadVendida
FROM [SalesLT].[SalesOrderDetail] AS d
JOIN [SalesLT].[Product] AS p
    ON d.ProductID = p.ProductID
GROUP BY p.ProductID, p.Name;`,

    `-- 13. Lista los clientes que han realizado más de 5 órdenes (usar HAVING).
SELECT c.CustomerID,
       c.FirstName,
       c.LastName,
       COUNT(soh.SalesOrderID) AS TotalOrdenes
FROM [SalesLT].[Customer] AS c
JOIN [SalesLT].[SalesOrderHeader] AS soh
    ON c.CustomerID = soh.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName
HAVING COUNT(soh.SalesOrderID) > 5;`,

    `-- 14. Encuentra el precio promedio de los productos por categoría.
SELECT pc.ProductCategoryID,
       pc.Name AS Categoria,
       AVG(p.ListPrice) AS PrecioPromedio
FROM [SalesLT].[Product] AS p
JOIN [SalesLT].[ProductCategory] AS pc
    ON p.ProductCategoryID = pc.ProductCategoryID
GROUP BY pc.ProductCategoryID, pc.Name;`,

    `-- 15. Obtén los productos cuyo precio sea mayor al precio promedio general (subconsulta).
SELECT ProductID, Name, ListPrice
FROM [SalesLT].[Product]
WHERE ListPrice > (
    SELECT AVG(ListPrice)
    FROM [SalesLT].[Product]
);`,

    `-- 16. Muestra las órdenes cuyo total sea mayor al promedio de todos los totales de órdenes.
SELECT SalesOrderID, CustomerID, TotalDue
FROM [SalesLT].[SalesOrderHeader]
WHERE TotalDue > (
    SELECT AVG(TotalDue)
    FROM [SalesLT].[SalesOrderHeader]
);`,

    `-- 17. Lista los productos que no han sido vendidos nunca (subconsulta con NOT IN).
SELECT p.ProductID, p.Name
FROM [SalesLT].[Product] AS p
WHERE p.ProductID NOT IN (
    SELECT DISTINCT d.ProductID
    FROM [SalesLT].[SalesOrderDetail] AS d
);`,

    `-- 18. Obtén los territorios que tengan más de 50 clientes asociados.
SELECT soh.TerritoryID,
       COUNT(DISTINCT soh.CustomerID) AS TotalClientes
FROM [SalesLT].[SalesOrderHeader] AS soh
GROUP BY soh.TerritoryID
HAVING COUNT(DISTINCT soh.CustomerID) > 50;`,

    `-- 19. Calcula el total de ventas por año (usar YEAR en la fecha).
SELECT YEAR(OrderDate) AS Anio,
       SUM(TotalDue) AS TotalVentas
FROM [SalesLT].[SalesOrderHeader]
GROUP BY YEAR(OrderDate)
ORDER BY Anio;`,

    `-- 20. Obtén los clientes cuyas órdenes tengan un TotalDue mayor al promedio por cliente (subconsulta correlacionada).
SELECT DISTINCT c.CustomerID,
       c.FirstName,
       c.LastName
FROM [SalesLT].[Customer] AS c
JOIN [SalesLT].[SalesOrderHeader] AS soh
    ON c.CustomerID = soh.CustomerID
WHERE soh.TotalDue > (
    SELECT AVG(soh2.TotalDue)
    FROM [SalesLT].[SalesOrderHeader] AS soh2
    WHERE soh2.CustomerID = soh.CustomerID
);`,

    `-- 21. Encuentra los productos que tienen un precio mayor al precio promedio de su misma subcategoría.
SELECT p.ProductID, p.Name, p.ProductCategoryID, p.ListPrice
FROM [SalesLT].[Product] AS p
WHERE p.ListPrice > (
    SELECT AVG(p2.ListPrice)
    FROM [SalesLT].[Product] AS p2
    WHERE p2.ProductCategoryID = p.ProductCategoryID
);`,

    `-- 22. Muestra los productos cuyo ProductID sea el más vendido dentro de cada orden (subconsulta correlacionada).
SELECT d.SalesOrderID,
       d.ProductID,
       p.Name,
       d.OrderQty
FROM [SalesLT].[SalesOrderDetail] AS d
JOIN [SalesLT].[Product] AS p
    ON d.ProductID = p.ProductID
WHERE d.OrderQty = (
    SELECT MAX(d2.OrderQty)
    FROM [SalesLT].[SalesOrderDetail] AS d2
    WHERE d2.SalesOrderID = d.SalesOrderID
);`,

    `-- 23. Encuentra el monto total de órdenes por cliente y muestra solo los que superan el total de órdenes del cliente con ID = 5.
SELECT soh.CustomerID,
       SUM(soh.TotalDue) AS TotalCliente
FROM [SalesLT].[SalesOrderHeader] AS soh
GROUP BY soh.CustomerID
HAVING SUM(soh.TotalDue) > (
    SELECT SUM(TotalDue)
    FROM [SalesLT].[SalesOrderHeader]
    WHERE CustomerID = 5
);`,

    `-- 24. Lista los 3 productos más caros usando ROW_NUMBER.
WITH ProductosOrdenados AS (
    SELECT ProductID,
           Name,
           ListPrice,
           ROW_NUMBER() OVER (ORDER BY ListPrice DESC) AS rn
    FROM [SalesLT].[Product]
)
SELECT ProductID, Name, ListPrice, rn
FROM ProductosOrdenados
WHERE rn <= 3;`,

    `-- 25. Muestra el ranking de clientes según el monto total comprado (usar RANK).
WITH Totales AS (
    SELECT c.CustomerID,
           c.FirstName,
           c.LastName,
           SUM(soh.TotalDue) AS TotalComprado
    FROM [SalesLT].[Customer] AS c
    JOIN [SalesLT].[SalesOrderHeader] AS soh
        ON c.CustomerID = soh.CustomerID
    GROUP BY c.CustomerID, c.FirstName, c.LastName
)
SELECT CustomerID,
       FirstName,
       LastName,
       TotalComprado,
       RANK() OVER (ORDER BY TotalComprado DESC) AS Ranking
FROM Totales;`,

    `-- 26. Identifica los productos cuyo precio sea inferior al mínimo precio dentro de su categoría (subconsulta correlacionada).
SELECT p.ProductID, p.Name, p.ProductCategoryID, p.ListPrice
FROM [SalesLT].[Product] AS p
WHERE p.ListPrice < (
    SELECT MIN(p2.ListPrice)
    FROM [SalesLT].[Product] AS p2
    WHERE p2.ProductCategoryID = p.ProductCategoryID
      AND p2.ProductID <> p.ProductID
);`,

    `-- 27. Obtén las órdenes cuyo TotalDue sea mayor al TotalDue máximo de cualquier orden en el año 2011.
SELECT SalesOrderID, OrderDate, TotalDue
FROM [SalesLT].[SalesOrderHeader]
WHERE TotalDue > (
    SELECT MAX(TotalDue)
    FROM [SalesLT].[SalesOrderHeader]
    WHERE YEAR(OrderDate) = 2011
);`
];

// Títulos de las consultas para el menú
const queryTitles = [
    'Título',
    'Conteo de Clientes',
    'Top 10 Productos',
    'Productos Premium',
    'Métodos de Envío',
    'Órdenes por Período',
    'Búsqueda por Apellido',
    'Productos por Color',
    'Clientes con "A"',
    'Búsqueda de Bicicletas',
    'Órdenes Recientes',
    'Órdenes por Cliente',
    'Cantidad Vendida',
    'Clientes Frecuentes',
    'Precio Promedio por Categoría',
    'Productos Sobre el Promedio',
    'Órdenes Sobre el Promedio',
    'Productos No Vendidos',
    'Territorios Populares',
    'Ventas por Año',
    'Clientes con Órdenes Premium',
    'Productos Premium por Categoría',
    'Producto Más Vendido por Orden',
    'Clientes Superiores',
    'Top 3 Productos Más Caros',
    'Ranking de Clientes',
    'Productos Económicos por Categoría',
    'Órdenes Excepcionales',
    'Gracias'
];

// Función mejorada para resaltar sintaxis SQL
function highlightSQL(sql) {
    // Primero procesar comentarios
    const comments = /(--.*$)/gm;
    let highlighted = sql.replace(comments, '<span class="sql-comment">$1</span>');
    
    // Luego procesar strings (para evitar que keywords dentro de strings se resalten)
    const strings = /'([^']*)'/g;
    const stringPlaceholders = [];
    let stringIndex = 0;
    highlighted = highlighted.replace(strings, (match) => {
        const placeholder = `__STRING_${stringIndex}__`;
        stringPlaceholders[stringIndex] = match;
        stringIndex++;
        return placeholder;
    });
    
    // Procesar keywords (usando word boundaries)
    const keywords = /\b(SELECT|FROM|WHERE|JOIN|ON|GROUP\s+BY|ORDER\s+BY|HAVING|COUNT|SUM|AVG|MAX|MIN|DISTINCT|TOP|WITH|AS|AND|OR|NOT|IN|BETWEEN|LIKE|YEAR|ROW_NUMBER|OVER|RANK|DESC|ASC)\b/gi;
    highlighted = highlighted.replace(keywords, '<span class="sql-keyword">$1</span>');
    
    // Procesar números
    const numbers = /\b\d+\b/g;
    highlighted = highlighted.replace(numbers, '<span class="sql-function">$&</span>');
    
    // Restaurar strings
    stringPlaceholders.forEach((str, index) => {
        highlighted = highlighted.replace(`__STRING_${index}__`, `<span class="sql-string">${str}</span>`);
    });
    
    return highlighted;
}

// Variables globales
let currentSlide = 0;
let slides = [];
let totalSlides = 0;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;

    // Insertar consultas SQL en las diapositivas
    for (let i = 0; i < queries.length; i++) {
        const sqlElement = document.getElementById(`sql${i + 1}`);
        if (sqlElement) {
            sqlElement.innerHTML = highlightSQL(queries[i]);
        }
    }

    // Crear menú de navegación
    createNavigationMenu();

    // Crear modal para código completo
    createCodeModal();

    // Agregar event listeners a botones de navegación
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changeSlide(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changeSlide(1));
    }

    // Inicializar presentación
    showSlide(0);

    // Navegación con teclado
    document.addEventListener('keydown', handleKeyboard);
});

// Función para mostrar slide
function showSlide(n) {
    // Limitar el rango de slides
    if (n >= totalSlides) {
        currentSlide = totalSlides - 1;
    } else if (n < 0) {
        currentSlide = 0;
    } else {
        currentSlide = n;
    }

    // Remover todas las clases de transición
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
    });

    // Agregar clase active a la slide actual
    requestAnimationFrame(() => {
        slides[currentSlide].classList.add('active');
    });

    // Actualizar barra de progreso
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    document.getElementById('progressBar').style.width = progress + '%';

    // Actualizar contador
    const counter = document.getElementById('slideCounter');
    counter.style.opacity = '0';
    setTimeout(() => {
        counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
        counter.style.opacity = '1';
    }, 150);

    // Actualizar botones
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;

    // Actualizar menú
    updateMenuHighlight();
}

// Función para cambiar slide
function changeSlide(n) {
    if ((n > 0 && currentSlide >= totalSlides - 1) || (n < 0 && currentSlide <= 0)) {
        return;
    }
    
    const previousSlide = currentSlide;
    currentSlide += n;
    
    // Aplicar clases de transición
    if (previousSlide >= 0 && previousSlide < slides.length) {
        if (n > 0) {
            slides[previousSlide].classList.add('next');
        } else {
            slides[previousSlide].classList.add('prev');
        }
    }
    
    showSlide(currentSlide);
}

// Función para ir a una slide específica
function goToSlide(n) {
    if (n >= 0 && n < totalSlides) {
        const previousSlide = currentSlide;
        currentSlide = n;
        
        if (previousSlide >= 0 && previousSlide < slides.length) {
            if (n > previousSlide) {
                slides[previousSlide].classList.add('next');
            } else {
                slides[previousSlide].classList.add('prev');
            }
        }
        
        showSlide(currentSlide);
        closeMenu();
    }
}

// Manejo de teclado
function handleKeyboard(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    } else if (e.key === 'Escape') {
        closeMenu();
        closeCodeModal();
    }
}

// Crear menú de navegación
function createNavigationMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '≡';
    menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    menuToggle.setAttribute('tabindex', '0');
    menuToggle.onclick = toggleMenu;
    document.body.appendChild(menuToggle);

    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    menuOverlay.onclick = closeMenu;
    document.body.appendChild(menuOverlay);

    const menuPanel = document.createElement('div');
    menuPanel.className = 'menu-panel';
    menuPanel.setAttribute('role', 'navigation');
    menuPanel.setAttribute('aria-label', 'Menú de navegación de consultas');

    const menuTitle = document.createElement('h3');
    menuTitle.textContent = 'Consultas SQL';
    menuPanel.appendChild(menuTitle);

    const menuList = document.createElement('ul');
    menuList.className = 'menu-list';

    queryTitles.forEach((title, index) => {
        const menuItem = document.createElement('li');
        menuItem.className = 'menu-item';
        menuItem.textContent = `${index === 0 ? 'Inicio' : index}. ${title}`;
        menuItem.setAttribute('tabindex', '0');
        menuItem.setAttribute('role', 'button');
        menuItem.setAttribute('aria-label', `Ir a ${title}`);
        menuItem.onclick = () => goToSlide(index);
        menuItem.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
            }
        };
        menuList.appendChild(menuItem);
    });

    menuPanel.appendChild(menuList);
    document.body.appendChild(menuPanel);
}

// Toggle menú
function toggleMenu() {
    const menuPanel = document.querySelector('.menu-panel');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuPanel.classList.contains('open')) {
        closeMenu();
    } else {
        menuPanel.classList.add('open');
        menuOverlay.classList.add('show');
    }
}

// Cerrar menú
function closeMenu() {
    const menuPanel = document.querySelector('.menu-panel');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    menuPanel.classList.remove('open');
    menuOverlay.classList.remove('show');
}

// Actualizar highlight del menú
function updateMenuHighlight() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSlide);
    });
}

// Crear modal para código completo
function createCodeModal() {
    const modal = document.createElement('div');
    modal.className = 'code-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Código SQL completo');
    modal.setAttribute('aria-modal', 'true');

    const modalContent = document.createElement('div');
    modalContent.className = 'code-modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'code-modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Cerrar modal');
    closeBtn.setAttribute('tabindex', '0');
    closeBtn.onclick = closeCodeModal;
    modalContent.appendChild(closeBtn);

    const modalTitle = document.createElement('h3');
    modalTitle.id = 'modal-title';
    modalContent.appendChild(modalTitle);

    const codeContainer = document.createElement('div');
    codeContainer.className = 'sql-code';
    codeContainer.id = 'modal-code';
    modalContent.appendChild(codeContainer);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeCodeModal();
        }
    });

    // Cerrar al hacer click fuera
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeCodeModal();
        }
    };
}

// Abrir modal con código
function openCodeModal(slideIndex) {
    const modal = document.querySelector('.code-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCode = document.getElementById('modal-code');

    if (slideIndex > 0 && slideIndex <= queries.length) {
        modalTitle.textContent = queryTitles[slideIndex];
        modalCode.innerHTML = highlightSQL(queries[slideIndex - 1]);
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Cerrar modal
function closeCodeModal() {
    const modal = document.querySelector('.code-modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Agregar botones "Ver código completo" a cada slide
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco para que las slides estén renderizadas
    setTimeout(() => {
        for (let i = 1; i <= queries.length; i++) {
            const sqlElement = document.getElementById(`sql${i}`);
            if (sqlElement) {
                const viewCodeBtn = document.createElement('button');
                viewCodeBtn.className = 'view-code-btn';
                viewCodeBtn.textContent = 'Ver código completo';
                viewCodeBtn.setAttribute('aria-label', 'Ver código SQL completo en pantalla completa');
                viewCodeBtn.setAttribute('tabindex', '0');
                viewCodeBtn.onclick = () => openCodeModal(i);
                sqlElement.parentNode.insertBefore(viewCodeBtn, sqlElement.nextSibling);
            }
        }
    }, 100);
});

