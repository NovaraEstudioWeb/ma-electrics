/* =====================================================
   PRECIOS Y AMPERAJES — editá SOLO este archivo
   para actualizar los precios en todo el sitio.
   Precio null = se muestra "Consultar".
   Amperaje null = no se muestra la línea de amperaje.
   ===================================================== */
window.MA_DATA = {
  whatsapp: "5491161573361",
  equipos: {
    "160": {
      "12": { precio: 550000, amp: null },
      "14": { precio: 550000, amp: null },
      "16": { precio: 550000, amp: "63 A carga constante · picos de 70 A" },
      "20": { precio: 590000, amp: "70 A carga constante · picos de 80 A" },
      "25": { precio: 670000, amp: "80 A carga constante" }
    },
    "110": {
      "12": { precio: 580000, amp: null },
      "14": { precio: 580000, amp: "60 A carga constante · picos de 65 A" },
      "16": { precio: 600000, amp: null },
      "20": { precio: null, amp: null },
      "25": { precio: null, amp: null }
    }
  }
};
window.MA_formatPrecio = function (n) {
  return n == null ? "Consultar" : "$" + n.toLocaleString("es-AR");
};

/* =====================================================
   RESEÑAS DE GOOGLE — completá nombre, texto y estrellas
   de cada una. Si "texto" está vacío, la tarjeta muestra
   solo el link para leerla en Google.
   ===================================================== */
window.MA_RESENAS = [
  { nombre: "Rodrigo Gomez", estrellas: 5, texto: "Excelente equipo y buena respuesta en la garantía!!!", url: "https://maps.app.goo.gl/WdGTRNUzSnEioxeb7" },
  { nombre: "Yolanda Bordon", estrellas: 5, texto: "Muy buenos productos, recomendable!", url: "https://maps.app.goo.gl/WdGTRNUzSnEioxeb7" },
  { nombre: "Turcox Ramone", estrellas: 5, texto: "Buena atención! Productos 💯% recomendables!", url: "https://maps.app.goo.gl/WdGTRNUzSnEioxeb7" }
];
