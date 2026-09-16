# Auditoría del repositorio

## Objetivo

Registrar hechos comprobados sobre la estructura, la lógica real del juego y la validación ejcutada del prototipo Block Popper.

## Rutas y símbolos relevantes

| Ruta o símbolo | Rol observado | Evidencia |
|---|---|---|
| package.json | Define scripts del proyecto y dependencias Vite | Archivo real del proyecto |
| vite.config.js | Configura Vite y ejecución local | Archivo real del proyecto |
| index.html | Entrada HTML y carga del juego | Archivo real del proyecto |
| src/main.js | Lógica del juego, render, colisiones, power-ups y estados de escena | Archivo real del proyecto |
| src/style.css | Estilos globales del canvas y la interfaz | Archivo real del proyecto |
| .gitignore | Ignora artefactos generados por Node/Vite | Archivo real del proyecto |

## Flujo observado

La partida se ejecuta en un canvas 2D con un bucle propio. El jugador mueve una pala en la parte inferior, lanza la bola con ESPACIO y destruye bloques con colisiones. Al romper bloques, pueden aparecer power-ups que caen y activan efectos en la pala o multiplican la cantidad de bolas. La partida tiene tres estados principales: juego activo, Game Over y Victoria; el reinicio se hace con ESPACIO.

## Pruebas y comandos disponibles

| Comando o prueba | Verifica | Resultado observado |
|---|---|---|
| `npm run build` | Compilación de producción | Exitoso, genera el bundle final sin errores |
| `node --check src/main.js` | Sintaxis del script principal | Exitoso |
| `npm run dev` | Arranque local del juego | Requiere abrir el navegador para validar la experiencia visual |

## Hechos, supuestos y preguntas abiertas

- Hechos comprobados: el proyecto es una implementación con canvas nativo y Vite; hay tutorial, power-ups, puntuación, vidas, bonus por velocidad y win/lose states.
- Supuestos verificados: la lógica principal se mantiene dentro de src/main.js y el juego compila sin recurrir a un motor de escena externo.
- Preguntas abiertas: si se quería ampliar el proyecto con más niveles o audio, eso debería definirse en una segunda iteración del diseño.

