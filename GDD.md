# GDD - Block Popper

## 1. Juego y experiencia

- Género: arcade / breakout / arkanoid.
- Propuesta de juego: un tablero de bloques con una pala controlada por teclado y una bola que debe destruir la formación completa antes de perder todas las vidas.
- Experiencia buscada: claridad visual, rapidez de reacción, sensación arcade y una secuencia de tutorial + acción directa.

## 2. Objetivo del jugador

- Mover la pala con A/D.
- Lanzar la bola con ESPACIO.
- Destruir todos los bloques del primer nivel.
- Recolectar power-ups para ampliar opciones de juego y puntaje.
- Evitar perder todas las vidas antes de completar el objetivo.

## 3. Mecánicas core

- La bola rebota en paredes, bloques y pala.
- La pala se mueve horizontalmente dentro del margen inferior de la pantalla.
- La bola original se representa en rojo; las bolas secundarias aparecen en blanco.
- El juego cuenta con tres power-ups:
  - x2: duplica la cantidad de bolas activas.
  - triple: suma tres bolas nuevas en espera.
  - long: aumenta la pala durante 10 segundos.
- El puntaje se incrementa por cada bloque derribado y por un bonus adicional basado en eventos de destrucción rápida.
- El tutorial aparece antes del inicio de la partida y explica los controles.

## 4. Condiciones de victoria y derrota

- Victoria: cuando todos los bloques del primer nivel quedan destruidos, se activa la escena de victoria y el juego queda listo para reiniciarse con ESPACIO.
- Derrota: cuando el jugador pierde todas las vidas, se activa la escena de Game Over y la partida puede reiniciarse con ESPACIO.
- No hay nivel 2 ni progresión continua: la victoria termina la partida en la primera pantalla de bloques.

## 5. Reglas de diseño

- La partida empieza en estado LISTO y solo se activa al pulsar ESPACIO.
- Los bloques se generan en una grilla grande para maximizar la densidad visual del tablero sin tapar la zona superior del UI.
- La velocidad de la bola se normaliza para mantener una sensación constante.
- Los power-ups caen desde bloques destruidos con una frecuencia menor y aleatoria para no saturar continuamente el tablero.

## 6. Restricciones técnicas

- Arquitectura actual: JavaScript vanilla con HTML5 Canvas y Vite.
- No se usan assets externos ni sprites complejos.
- La lógica se concentra en src/main.js con un bucle propio y control manual del estado del juego.
- El proyecto debe compilar sin errores con Vite y mantener la lógica de juego estable en navegador.

## 7. Criterios de aceptación

- El juego puede iniciarse y mostrar la escena principal.
- El paddle se mueve con A y D.
- La bola puede lanzarse con ESPACIO.
- Se destruyen bloques y se actualiza el puntaje.
- Los power-ups interactúan con el paddle y activan sus efectos.
- El juego muestra victoria o derrota según la condición correcta.
- La partida puede reiniciarse con ESPACIO desde la pantalla final.

## 8. Alcance actual

- Incluye: tutorial, movimiento, colisiones, bonus, power-ups y transiciones de escena.
- No incluye: niveles múltiples, enemigos, audio profesional, tienda, save system, IA o persistencia.

La intención de diseño queda acotada por esta versión jugable y validada por compilación en el repositorio actual.
