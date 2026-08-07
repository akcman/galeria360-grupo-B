# Recorrido Virtual 360° — Grupo B

Proyecto listo para GitHub Pages y Meta Quest 2.

## Repositorio sugerido
`galeria360-grupo-b`

## Archivos
```text
galeria360-grupo-b/
├── index.html
├── styles.css
├── app.js
├── README.md
└── imagenes/
    ├── foto01.jpg
    ├── ...
    └── foto15.jpg
```

## Sustituir fotografías
Reemplaza los 15 archivos de la carpeta `imagenes` por tus panoramas reales manteniendo exactamente:
`foto01.jpg` a `foto15.jpg`.

Recomendación: imágenes equirectangulares 2:1, por ejemplo 4096 × 2048 px.

## Cambiar nombres y descripciones
Abre `app.js` y edita el arreglo `scenes`:

```javascript
{
  title: "Entrada principal",
  description: "Acceso principal al campus",
  image: "imagenes/foto01.jpg"
}
```

## Publicar con GitHub Pages
1. Crea un repositorio público llamado `galeria360-grupo-b`.
2. Sube `index.html`, `styles.css`, `app.js`, `README.md` y la carpeta `imagenes`.
3. Ve a `Settings > Pages`.
4. En `Build and deployment`, elige `Deploy from a branch`.
5. Branch: `main`.
6. Folder: `/ (root)`.
7. Guarda.
8. La URL será similar a:
   `https://TU-USUARIO.github.io/galeria360-grupo-b/`

## Meta Quest 2
Abre la URL HTTPS en Meta Quest Browser, entra a una escena y usa el botón de A-Frame para entrar en VR.

## Funciones versión 2.0
- Pantalla de bienvenida institucional.
- Menú visual con 15 tarjetas.
- Diseño diferenciado por grupo.
- Anterior / Siguiente / Menú.
- Pantalla completa.
- Tarjeta de información activable.
- Soporte WebXR para Meta Quest 2.
- Fácil cambio de títulos, descripciones e imágenes.
