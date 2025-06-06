🚀 Instrucciones de ejecución paso a paso

⚠️ Requisitos:

- Node.js ≥ 18
- npm

> ℹ️ Esta app utiliza SQLite como base de datos por defecto.
> No requiere archivos .env ni configuración externa. Simplemente instalá y ejecutá.

---

1. Instalar dependencias

   npm install

---

2. Ejecutar el servidor

   npm run start:dev

   La API estará disponible en: http://localhost:3000

---

3. Probar la API

   REST Endpoints:

   - POST /api/todolists/:listId/items ← Crear ítem
   - PUT /api/todoitems/:itemId ← Actualizar ítem
   - PATCH /api/todoitems/:itemId/complete ← Completar ítem
   - DELETE /api/todoitems/:itemId ← Eliminar ítem

   MCP Tools:

   - GET /mcp/tools ← Ver tools disponibles
   - POST /mcp/invoke ← Ejecutar tool

---
