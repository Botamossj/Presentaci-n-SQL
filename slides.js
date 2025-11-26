// Datos de las consultas SQL con resultados de ejemplo
const queries = [
    {
        pregunta: "¿Cuántos clientes existen en la tabla Customer?",
        codigo: `SELECT COUNT(*) AS TotalClientes
FROM [SalesLT].[Customer];`,
        resultado: {
            columnas: ["TotalClientes"],
            filas: [[847]]
        }
    },
    {
        pregunta: "Lista los 10 primeros productos ordenados por nombre (A–Z).",
        codigo: `SELECT TOP (10) ProductID, Name
FROM [SalesLT].[Product]
ORDER BY Name ASC;`,
        resultado: {
            columnas: ["ProductID", "Name"],
            filas: [
                [680, "HL Road Frame - Black, 58"],
                [706, "HL Road Frame - Red, 58"],
                [707, "Sport-100 Helmet, Red"],
                [708, "Sport-100 Helmet, Black"],
                [709, "Mountain Bike Socks, M"],
                [710, "Mountain Bike Socks, L"],
                [711, "Sport-100 Helmet, Blue"],
                [712, "AWC Logo Cap"],
                [713, "Long-Sleeve Logo Jersey, S"],
                [714, "Long-Sleeve Logo Jersey, M"]
            ]
        }
    },
    {
        pregunta: "Obtén todos los productos cuyo precio sea mayor a 500.",
        codigo: `SELECT ProductID, Name, ListPrice
FROM [SalesLT].[Product]
WHERE ListPrice > 500;`,
        resultado: {
            columnas: ["ProductID", "Name", "ListPrice"],
            filas: [
                [749, "Road-150 Red, 62", 3578.27],
                [750, "Road-150 Red, 44", 3578.27],
                [751, "Road-150 Red, 48", 3578.27],
                [752, "Road-150 Red, 52", 3578.27],
                [753, "Road-150 Red, 56", 3578.27]
            ]
        }
    },
    {
        pregunta: "Muestra los métodos de envío distintos registrados en SalesOrderHeader.",
        codigo: `SELECT DISTINCT ShipMethod AS Métodos_envío
FROM [SalesLT].[SalesOrderHeader];`,
        resultado: {
            columnas: ["Métodos_envío"],
            filas: [
                ["CARGO TRANSPORT 5"],
                ["OVERNIGHT J-FAST"],
                ["XRQ - TRUCK GROUND"]
            ]
        }
    },
    {
        pregunta: "Obtén las órdenes realizadas entre 2008 y 2009.",
        codigo: `SELECT SalesOrderID, RevisionNumber, OrderDate
FROM [SalesLT].[SalesOrderHeader]
WHERE YEAR(OrderDate) BETWEEN 2008 AND 2009;`,
        resultado: {
            columnas: ["SalesOrderID", "RevisionNumber", "OrderDate"],
            filas: [
                [71774, 2, "2008-06-01"],
                [71776, 2, "2008-06-01"],
                [71780, 2, "2008-06-01"],
                [71782, 2, "2008-06-01"],
                [71783, 2, "2008-06-01"]
            ]
        }
    },
    {
        pregunta: "Encuentra los clientes cuyo apellido sea igual a 'Lopez'.",
        codigo: `SELECT FirstName, LastName
FROM [SalesLT].[Customer]
WHERE LastName = 'Lopez';`,
        resultado: {
            columnas: ["FirstName", "LastName"],
            filas: [
                ["Gabriela", "Lopez"],
                ["Isabella", "Lopez"]
            ]
        }
    },
    {
        pregunta: "¿Cuántos productos hay en cada color? (usar GROUP BY).",
        codigo: `SELECT Color, COUNT(*) AS TotalProductos
FROM [SalesLT].[Product]
GROUP BY Color;`,
        resultado: {
            columnas: ["Color", "TotalProductos"],
            filas: [
                ["Black", 93],
                ["Blue", 26],
                ["Grey", 1],
                ["Multi", 8],
                ["Red", 38],
                ["Silver", 43],
                ["White", 4],
                ["Yellow", 36],
                [null, 248]
            ]
        }
    },
    {
        pregunta: "Lista el ID y el nombre de los clientes cuyo CompanyName empieza con A.",
        codigo: `SELECT CustomerID, CompanyName
FROM [SalesLT].[Customer]
WHERE CompanyName LIKE 'A%';`,
        resultado: {
            columnas: ["CustomerID", "CompanyName"],
            filas: [
                [1, "A Bike Store"],
                [2, "Progressive Sports"],
                [6, "Aerobic Exercise Company"],
                [18, "Associated Bikes"],
                [29, "Action Bicycle Specialists"]
            ]
        }
    },
    {
        pregunta: "Muestra los productos cuyo nombre contiene la palabra 'Bike'.",
        codigo: `SELECT ProductID, Name
FROM [SalesLT].[Product]
WHERE Name LIKE '%Bike%';`,
        resultado: {
            columnas: ["ProductID", "Name"],
            filas: [
                [709, "Mountain Bike Socks, M"],
                [710, "Mountain Bike Socks, L"],
                [838, "HL Mountain Frame - Black, 38"],
                [839, "HL Mountain Frame - Black, 42"],
                [840, "HL Mountain Frame - Black, 44"]
            ]
        }
    },
    {
        pregunta: "Muestra las 5 órdenes más recientes usando ORDER BY fecha descendente.",
        codigo: `SELECT TOP (5) *
FROM [SalesLT].[SalesOrderHeader]
ORDER BY OrderDate DESC;`,
        resultado: {
            columnas: ["SalesOrderID", "CustomerID", "OrderDate", "TotalDue"],
            filas: [
                [71946, 29847, "2008-06-01", 43962.79],
                [71938, 29756, "2008-06-01", 3756.99],
                [71936, 29531, "2008-06-01", 98138.21],
                [71935, 29546, "2008-06-01", 7330.89],
                [71923, 29957, "2008-06-01", 85397.91]
            ]
        }
    },
    {
        pregunta: "Muestra el número total de órdenes por cada cliente.",
        codigo: `SELECT c.CustomerID,
       c.FirstName,
       c.LastName,
       COUNT(soh.SalesOrderID) AS TotalOrdenes
FROM [SalesLT].[Customer] AS c
JOIN [SalesLT].[SalesOrderHeader] AS soh
    ON c.CustomerID = soh.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName;`,
        resultado: {
            columnas: ["CustomerID", "FirstName", "LastName", "TotalOrdenes"],
            filas: [
                [29485, "Catherine", "Abel", 2],
                [29486, "Kim", "Abercrombie", 1],
                [29489, "Frances", "Adams", 3],
                [29490, "Margaret", "Smith", 2],
                [29492, "Carla", "Adams", 1]
            ]
        }
    },
    {
        pregunta: "Obtén los productos junto con la cantidad total vendida (SalesOrderDetail).",
        codigo: `SELECT p.ProductID,
       p.Name,
       SUM(d.OrderQty) AS CantidadVendida
FROM [SalesLT].[SalesOrderDetail] AS d
JOIN [SalesLT].[Product] AS p
    ON d.ProductID = p.ProductID
GROUP BY p.ProductID, p.Name;`,
        resultado: {
            columnas: ["ProductID", "Name", "CantidadVendida"],
            filas: [
                [707, "Sport-100 Helmet, Red", 167],
                [708, "Sport-100 Helmet, Black", 152],
                [711, "Sport-100 Helmet, Blue", 143],
                [712, "AWC Logo Cap", 189],
                [714, "Long-Sleeve Logo Jersey, M", 134]
            ]
        }
    },
    {
        pregunta: "Lista los clientes que han realizado más de 5 órdenes (usar HAVING).",
        codigo: `SELECT c.CustomerID,
       c.FirstName,
       c.LastName,
       COUNT(soh.SalesOrderID) AS TotalOrdenes
FROM [SalesLT].[Customer] AS c
JOIN [SalesLT].[SalesOrderHeader] AS soh
    ON c.CustomerID = soh.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName
HAVING COUNT(soh.SalesOrderID) > 5;`,
        resultado: {
            columnas: ["CustomerID", "FirstName", "LastName", "TotalOrdenes"],
            filas: [
                [29825, "Robert", "Johnson", 7],
                [29672, "Maria", "Garcia", 6],
                [29734, "James", "Wilson", 8]
            ]
        }
    },
    {
        pregunta: "Encuentra el precio promedio de los productos por categoría.",
        codigo: `SELECT pc.ProductCategoryID,
       pc.Name AS Categoria,
       AVG(p.ListPrice) AS PrecioPromedio
FROM [SalesLT].[Product] AS p
JOIN [SalesLT].[ProductCategory] AS pc
    ON p.ProductCategoryID = pc.ProductCategoryID
GROUP BY pc.ProductCategoryID, pc.Name;`,
        resultado: {
            columnas: ["ProductCategoryID", "Categoria", "PrecioPromedio"],
            filas: [
                [5, "Mountain Bikes", 1683.37],
                [6, "Road Bikes", 1597.45],
                [7, "Touring Bikes", 1425.25],
                [18, "Jerseys", 53.99],
                [23, "Wheels", 245.01]
            ]
        }
    },
    {
        pregunta: "Obtén los productos cuyo precio sea mayor al precio promedio general (subconsulta).",
        codigo: `SELECT ProductID, Name, ListPrice
FROM [SalesLT].[Product]
WHERE ListPrice > (
    SELECT AVG(ListPrice)
    FROM [SalesLT].[Product]
);`,
        resultado: {
            columnas: ["ProductID", "Name", "ListPrice"],
            filas: [
                [749, "Road-150 Red, 62", 3578.27],
                [750, "Road-150 Red, 44", 3578.27],
                [771, "Mountain-100 Silver, 38", 3399.99],
                [772, "Mountain-100 Silver, 42", 3399.99],
                [773, "Mountain-100 Silver, 44", 3399.99]
            ]
        }
    },
    {
        pregunta: "Muestra las órdenes cuyo total sea mayor al promedio de todos los totales de órdenes.",
        codigo: `SELECT SalesOrderID, CustomerID, TotalDue
FROM [SalesLT].[SalesOrderHeader]
WHERE TotalDue > (
    SELECT AVG(TotalDue)
    FROM [SalesLT].[SalesOrderHeader]
);`,
        resultado: {
            columnas: ["SalesOrderID", "CustomerID", "TotalDue"],
            filas: [
                [71774, 29847, 43962.79],
                [71780, 29568, 98138.21],
                [71782, 29941, 108597.95],
                [71784, 29521, 63686.28],
                [71796, 29796, 87654.32]
            ]
        }
    },
    {
        pregunta: "Lista los productos que no han sido vendidos nunca (subconsulta con NOT IN).",
        codigo: `SELECT p.ProductID, p.Name
FROM [SalesLT].[Product] AS p
WHERE p.ProductID NOT IN (
    SELECT DISTINCT d.ProductID
    FROM [SalesLT].[SalesOrderDetail] AS d
);`,
        resultado: {
            columnas: ["ProductID", "Name"],
            filas: [
                [680, "HL Road Frame - Black, 58"],
                [706, "HL Road Frame - Red, 58"],
                [717, "HL Road Frame - Red, 62"],
                [718, "HL Road Frame - Red, 44"],
                [719, "HL Road Frame - Red, 48"]
            ]
        }
    },
    {
        pregunta: "Obtén los territorios que tengan más de 50 clientes asociados.",
        codigo: `SELECT soh.TerritoryID,
       COUNT(DISTINCT soh.CustomerID) AS TotalClientes
FROM [SalesLT].[SalesOrderHeader] AS soh
GROUP BY soh.TerritoryID
HAVING COUNT(DISTINCT soh.CustomerID) > 50;`,
        resultado: {
            columnas: ["TerritoryID", "TotalClientes"],
            filas: [
                [1, 87],
                [4, 65],
                [6, 52]
            ]
        }
    },
    {
        pregunta: "Calcula el total de ventas por año (usar YEAR en la fecha).",
        codigo: `SELECT YEAR(OrderDate) AS Anio,
       SUM(TotalDue) AS TotalVentas
FROM [SalesLT].[SalesOrderHeader]
GROUP BY YEAR(OrderDate)
ORDER BY Anio;`,
        resultado: {
            columnas: ["Anio", "TotalVentas"],
            filas: [
                [2005, 1245897.32],
                [2006, 2567432.18],
                [2007, 3892156.74],
                [2008, 4521389.45]
            ]
        }
    },
    {
        pregunta: "Obtén los clientes cuyas órdenes tengan un TotalDue mayor al promedio por cliente (subconsulta correlacionada).",
        codigo: `SELECT DISTINCT c.CustomerID,
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
        resultado: {
            columnas: ["CustomerID", "FirstName", "LastName"],
            filas: [
                [29485, "Catherine", "Abel"],
                [29531, "James", "Hamilton"],
                [29546, "Martha", "Miller"],
                [29568, "Gary", "Davis"],
                [29672, "Maria", "Garcia"]
            ]
        }
    },
    {
        pregunta: "Encuentra los productos que tienen un precio mayor al precio promedio de su misma subcategoría.",
        codigo: `SELECT p.ProductID, p.Name, p.ProductCategoryID, p.ListPrice
FROM [SalesLT].[Product] AS p
WHERE p.ListPrice > (
    SELECT AVG(p2.ListPrice)
    FROM [SalesLT].[Product] AS p2
    WHERE p2.ProductCategoryID = p.ProductCategoryID
);`,
        resultado: {
            columnas: ["ProductID", "Name", "ProductCategoryID", "ListPrice"],
            filas: [
                [749, "Road-150 Red, 62", 6, 3578.27],
                [771, "Mountain-100 Silver, 38", 5, 3399.99],
                [779, "Mountain-200 Silver, 38", 5, 2319.99],
                [783, "Mountain-100 Black, 38", 5, 3374.99],
                [793, "Road-250 Red, 48", 6, 2443.35]
            ]
        }
    },
    {
        pregunta: "Muestra los productos cuyo ProductID sea el más vendido dentro de cada orden (subconsulta correlacionada).",
        codigo: `SELECT d.SalesOrderID,
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
        resultado: {
            columnas: ["SalesOrderID", "ProductID", "Name", "OrderQty"],
            filas: [
                [71774, 707, "Sport-100 Helmet, Red", 6],
                [71776, 712, "AWC Logo Cap", 8],
                [71780, 714, "Long-Sleeve Logo Jersey, M", 5],
                [71782, 708, "Sport-100 Helmet, Black", 7],
                [71783, 711, "Sport-100 Helmet, Blue", 4]
            ]
        }
    },
    {
        pregunta: "Encuentra el monto total de órdenes por cliente y muestra solo los que superan el total de órdenes del cliente con ID = 5.",
        codigo: `SELECT soh.CustomerID,
       SUM(soh.TotalDue) AS TotalCliente
FROM [SalesLT].[SalesOrderHeader] AS soh
GROUP BY soh.CustomerID
HAVING SUM(soh.TotalDue) > (
    SELECT SUM(TotalDue)
    FROM [SalesLT].[SalesOrderHeader]
    WHERE CustomerID = 5
);`,
        resultado: {
            columnas: ["CustomerID", "TotalCliente"],
            filas: [
                [29485, 125678.94],
                [29531, 98745.32],
                [29568, 156234.87],
                [29672, 89456.23],
                [29734, 112345.67]
            ]
        }
    },
    {
        pregunta: "Lista los 3 productos más caros usando ROW_NUMBER.",
        codigo: `WITH ProductosOrdenados AS (
    SELECT ProductID,
           Name,
           ListPrice,
           ROW_NUMBER() OVER (ORDER BY ListPrice DESC) AS rn
    FROM [SalesLT].[Product]
)
SELECT ProductID, Name, ListPrice, rn
FROM ProductosOrdenados
WHERE rn <= 3;`,
        resultado: {
            columnas: ["ProductID", "Name", "ListPrice", "rn"],
            filas: [
                [749, "Road-150 Red, 62", 3578.27, 1],
                [750, "Road-150 Red, 44", 3578.27, 2],
                [751, "Road-150 Red, 48", 3578.27, 3]
            ]
        }
    },
    {
        pregunta: "Muestra el ranking de clientes según el monto total comprado (usar RANK).",
        codigo: `WITH Totales AS (
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
        resultado: {
            columnas: ["CustomerID", "FirstName", "LastName", "TotalComprado", "Ranking"],
            filas: [
                [29568, "Gary", "Davis", 156234.87, 1],
                [29485, "Catherine", "Abel", 125678.94, 2],
                [29734, "James", "Wilson", 112345.67, 3],
                [29531, "James", "Hamilton", 98745.32, 4],
                [29672, "Maria", "Garcia", 89456.23, 5]
            ]
        }
    },
    {
        pregunta: "Identifica los productos cuyo precio sea inferior al mínimo precio dentro de su categoría (subconsulta correlacionada).",
        codigo: `SELECT p.ProductID, p.Name, p.ProductCategoryID, p.ListPrice
FROM [SalesLT].[Product] AS p
WHERE p.ListPrice < (
    SELECT MIN(p2.ListPrice)
    FROM [SalesLT].[Product] AS p2
    WHERE p2.ProductCategoryID = p.ProductCategoryID
      AND p2.ProductID <> p.ProductID
);`,
        resultado: {
            columnas: ["ProductID", "Name", "ProductCategoryID", "ListPrice"],
            filas: [
                [712, "AWC Logo Cap", 23, 8.99],
                [873, "Patch Kit/8 Patches", 36, 2.29],
                [878, "Fender Set - Mountain", 40, 21.98]
            ]
        }
    },
    {
        pregunta: "Obtén las órdenes cuyo TotalDue sea mayor al TotalDue máximo de cualquier orden en el año 2011.",
        codigo: `SELECT SalesOrderID, OrderDate, TotalDue
FROM [SalesLT].[SalesOrderHeader]
WHERE TotalDue > (
    SELECT MAX(TotalDue)
    FROM [SalesLT].[SalesOrderHeader]
    WHERE YEAR(OrderDate) = 2011
);`,
        resultado: {
            columnas: ["SalesOrderID", "OrderDate", "TotalDue"],
            filas: [
                [71782, "2008-06-01", 108597.95],
                [71936, "2008-06-01", 98138.21],
                [71923, "2008-06-01", 85397.91]
            ]
        }
    }
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
    // Procesar strings primero (para evitar que keywords dentro de strings se resalten)
    const strings = /'([^']*)'/g;
    const stringPlaceholders = [];
    let stringIndex = 0;
    let highlighted = sql.replace(strings, (match) => {
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

    // Insertar consultas SQL en las diapositivas (pregunta arriba, código abajo)
    for (let i = 0; i < queries.length; i++) {
        const sqlElement = document.getElementById(`sql${i + 1}`);
        if (sqlElement) {
            // Crear estructura: pregunta + código
            const preguntaDiv = document.createElement('div');
            preguntaDiv.className = 'sql-pregunta';
            preguntaDiv.innerHTML = `<strong>Pregunta:</strong> ${queries[i].pregunta}`;
            
            // Insertar pregunta antes del código
            sqlElement.parentNode.insertBefore(preguntaDiv, sqlElement);
            
            // Insertar solo el código SQL (sin el comentario de la pregunta)
            sqlElement.innerHTML = highlightSQL(queries[i].codigo);
        }
    }

    // Crear menú de navegación
    createNavigationMenu();

    // Crear modal para código completo
    createCodeModal();

    // Agregar botones "Ver código completo"
    addViewCodeButtons();

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
        // Reiniciar animaciones de elementos internos
        const elements = slide.querySelectorAll('.query-description, .sql-code, .concept-badge, .sql-pregunta');
        elements.forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth; // Force reflow
        });
    });

    // Agregar clase active a la slide actual
    requestAnimationFrame(() => {
        slides[currentSlide].classList.add('active');
        
        // Reactivar animaciones de elementos internos
        setTimeout(() => {
            const activeSlide = slides[currentSlide];
            const descriptions = activeSlide.querySelectorAll('.query-description');
            const codes = activeSlide.querySelectorAll('.sql-code');
            const badges = activeSlide.querySelectorAll('.concept-badge');
            const preguntas = activeSlide.querySelectorAll('.sql-pregunta');
            
            descriptions.forEach(el => {
                el.style.animation = '';
            });
            codes.forEach(el => {
                el.style.animation = '';
            });
            badges.forEach((el, index) => {
                el.style.animation = '';
            });
            preguntas.forEach(el => {
                el.style.animation = '';
            });
        }, 50);
    });

    // Actualizar barra de progreso
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    document.getElementById('progressBar').style.width = progress + '%';

    // Actualizar contador con animación mejorada
    const counter = document.getElementById('slideCounter');
    counter.style.animation = 'none';
    void counter.offsetWidth; // Force reflow
    setTimeout(() => {
        counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
        counter.style.animation = 'counterEntrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
    }, 100);

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
    // No procesar si el modal está abierto (excepto Escape)
    const modal = document.querySelector('.code-modal');
    if (modal && modal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeCodeModal();
        }
        return;
    }
    
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    } else if (e.key === 'Escape') {
        closeMenu();
    }
}

// Crear menú de navegación
function createNavigationMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '≡';
    menuToggle.onclick = toggleMenu;
    document.body.appendChild(menuToggle);

    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    menuOverlay.onclick = closeMenu;
    document.body.appendChild(menuOverlay);

    const menuPanel = document.createElement('div');
    menuPanel.className = 'menu-panel';

    const menuTitle = document.createElement('h3');
    menuTitle.textContent = 'Consultas SQL';
    menuPanel.appendChild(menuTitle);

    const menuList = document.createElement('ul');
    menuList.className = 'menu-list';

    queryTitles.forEach((title, index) => {
        const menuItem = document.createElement('li');
        menuItem.className = 'menu-item';
        menuItem.textContent = `${index === 0 ? 'Inicio' : index}. ${title}`;
        menuItem.onclick = () => goToSlide(index);
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
    
    if (menuPanel) menuPanel.classList.remove('open');
    if (menuOverlay) menuOverlay.classList.remove('show');
}

// Actualizar highlight del menú
function updateMenuHighlight() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSlide);
    });
}

// Función para generar tabla HTML de resultados
function generateResultTable(resultado) {
    if (!resultado || !resultado.columnas || !resultado.filas) {
        return '<p class="no-result">Sin resultados de ejemplo</p>';
    }

    let html = '<table class="result-table">';
    
    // Header
    html += '<thead><tr>';
    resultado.columnas.forEach(col => {
        html += `<th>${col}</th>`;
    });
    html += '</tr></thead>';
    
    // Body
    html += '<tbody>';
    resultado.filas.forEach(fila => {
        html += '<tr>';
        fila.forEach(valor => {
            // Formatear valores
            let displayValue = valor;
            if (valor === null) {
                displayValue = '<span class="null-value">NULL</span>';
            } else if (typeof valor === 'number') {
                // Formatear números con separadores de miles
                if (Number.isInteger(valor)) {
                    displayValue = valor.toLocaleString('es-ES');
                } else {
                    displayValue = valor.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                }
            }
            html += `<td>${displayValue}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody>';
    
    html += '</table>';
    
    // Agregar nota de filas mostradas
    html += `<p class="result-note">Mostrando ${resultado.filas.length} fila(s) de ejemplo</p>`;
    
    return html;
}

// Crear modal para código completo
function createCodeModal() {
    // Verificar si el modal ya existe
    let modal = document.querySelector('.code-modal');
    if (modal) {
        modal.remove(); // Eliminar y recrear para asegurar que funcione
    }

    modal = document.createElement('div');
    modal.className = 'code-modal';
    modal.id = 'codeModal';

    const modalContent = document.createElement('div');
    modalContent.className = 'code-modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'code-modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.type = 'button';
    closeBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeCodeModal();
    };
    modalContent.appendChild(closeBtn);

    const modalTitle = document.createElement('h3');
    modalTitle.id = 'modal-title';
    modalContent.appendChild(modalTitle);

    const modalPregunta = document.createElement('div');
    modalPregunta.className = 'modal-pregunta';
    modalPregunta.id = 'modal-pregunta';
    modalContent.appendChild(modalPregunta);

    // Contenedor para código
    const codeLabel = document.createElement('div');
    codeLabel.className = 'section-label';
    codeLabel.innerHTML = '<span class="label-icon">📝</span> Consulta SQL';
    modalContent.appendChild(codeLabel);

    const codeContainer = document.createElement('div');
    codeContainer.className = 'sql-code modal-sql-code';
    codeContainer.id = 'modal-code';
    modalContent.appendChild(codeContainer);

    // Contenedor para resultados
    const resultLabel = document.createElement('div');
    resultLabel.className = 'section-label result-label';
    resultLabel.innerHTML = '<span class="label-icon">📊</span> Resultado Esperado';
    modalContent.appendChild(resultLabel);

    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';
    resultContainer.id = 'modal-result';
    modalContent.appendChild(resultContainer);

    modal.appendChild(modalContent);
    
    // Cerrar al hacer click fuera del contenido
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeCodeModal();
        }
    };
    
    document.body.appendChild(modal);
}

// Abrir modal con código
function openCodeModal(slideIndex) {
    const modal = document.getElementById('codeModal');
    const modalTitle = document.getElementById('modal-title');
    const modalPregunta = document.getElementById('modal-pregunta');
    const modalCode = document.getElementById('modal-code');
    const modalResult = document.getElementById('modal-result');

    if (!modal || !modalTitle || !modalCode || !modalPregunta || !modalResult) {
        console.error('Elementos del modal no encontrados');
        return;
    }

    if (slideIndex > 0 && slideIndex <= queries.length) {
        const query = queries[slideIndex - 1];
        modalTitle.textContent = `Consulta ${slideIndex}: ${queryTitles[slideIndex]}`;
        modalPregunta.innerHTML = `<strong>Pregunta:</strong> ${query.pregunta}`;
        modalCode.innerHTML = highlightSQL(query.codigo);
        
        // Mostrar tabla de resultados
        modalResult.innerHTML = generateResultTable(query.resultado);
        
        // Mostrar modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Cerrar modal
function closeCodeModal() {
    const modal = document.getElementById('codeModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Agregar botones "Ver código completo" a cada slide
function addViewCodeButtons() {
    for (let i = 1; i <= queries.length; i++) {
        const sqlElement = document.getElementById(`sql${i}`);
        if (sqlElement) {
            // Verificar si el botón ya existe
            const existingBtn = sqlElement.parentNode.querySelector('.view-code-btn');
            if (!existingBtn) {
                const viewCodeBtn = document.createElement('button');
                viewCodeBtn.className = 'view-code-btn';
                viewCodeBtn.textContent = 'Ver código completo';
                viewCodeBtn.type = 'button';
                const index = i;
                viewCodeBtn.onclick = function(e) {
                    e.preventDefault();
                    openCodeModal(index);
                };
                sqlElement.parentNode.insertBefore(viewCodeBtn, sqlElement.nextSibling);
            }
        }
    }
}
