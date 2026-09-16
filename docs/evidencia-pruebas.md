# Evidencia de pruebas

## Validaciones ejecutadas

| Criterio | Método | Resultado |
|---|---|---|
| Sintaxis del script principal | `node --check src/main.js` | Correcta, sin errores de análisis |
| Compilación del proyecto | `npm run build` | Exitosa, genera el bundle de producción |
| Estado del juego | revisión de las escenas y lógica de src/main.js | Se verifican tutorial, victoria, derrota, power-ups y reinicio |

## Comandos y salida relevante

- `cd "f:\JSEjercicios\Space Invaders\Parcial-1---Block-Popper" ; node --check src/main.js ; npm run build`
- Resultado observado: Vite finaliza con `✓ built in 133ms` (última verificación ejecutada en el entorno actual).

## Observaciones

- La validación confirmada en este entorno es de compilación y sintaxis, no de captura visual de navegador.
- La lógica del juego está documentada según lo que realmente existe en el código y no según una versión anterior de Phaser.
- El repositorio no incluye secretos ni credenciales por diseño del proyecto.
