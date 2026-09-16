# Especificación

## Problema

El prototipo requería una versión compacta pero jugable de un breakout con poder de decisión, tutorial claro y retroalimentación visual. El resultado final debía mantener la sensación arcade, evitar pantallas en blanco y cerrar la partida con una victoria definida y una reinicialización simple.

## Resultado esperado

Un juego jugable en navegador donde el usuario mueve una pala, lanza la bola y destruye bloques. La partida debe mostrar un tutorial inicial, aplicar power-ups, ofrecer bonus visual por velocidad y declarar victoria al limpiar el primer nivel.

## Alcance

- Incluye: tutorial, movimiento de pala, lanzamiento, colisiones, bloques, vidas, score, UI de bonus, power-ups x2/triple/long, escenas de derrota y victoria, y reinicio con ESPACIO.
- No incluye: múltiples niveles, enemigos, tienda, guardado persistente, audio ni sistema de progression profunda.

## Restricciones

- Técnicas: Vite + JavaScript vanilla + Canvas 2D.
- Operativas: el proyecto se valida localmente con compilación y revisión de sintaxis; no se publican cambios remotos.
- De calidad: la compilación debe pasar sin errores y la lógica debe mantenerse estable durante la partida.

## Casos y criterios de aceptación

| Caso | Dado | Cuando | Entonces | Evidencia |
|---|---|---|---|---|
| Inicio | La página se carga | El usuario entra al juego | Ve el tutorial y puede comenzar con ESPACIO | Validación visual y build |
| Reposicionamiento | Hay una bola activa o en espera | El jugador usa A/D | La pala se mueve sin salir del margen de juego | Verificación de código y ejecución |
| Colisión | La bola toca un bloque | Se produce el impacto | El bloque desaparece, cambia el puntaje y puede caer un power-up | Observación del juego |
| Power-up | La pala toca un objeto activo | El objeto se recoge | Se activa x2, triple o long según el tipo | Validación manual |
| Victoria | El jugador elimina todos los bloques del primer nivel | Se cumplen las condiciones de limpieza | Se muestra la escena de victoria y se reinicia con ESPACIO | Comportamiento verificado por lógica |
| Derrota | El jugador pierde todas las vidas | La última bola sale fuera de la pantalla | Se muestra Game Over y se reinicia con ESPACIO | Verificación del flujo de escena |

## Invariantes

- La bola no puede atravesar la pala ni los bloques sin resolver el impacto.
- La victoria ocurre al terminar el primer tablero, no hay transición a un nivel 2.
- El inicio de la partida y el reinicio deben hacerse con ESPACIO para mantener la flow del tutorial.
- La lógica no debe quedar en un estado infinito de bolas sin límite práctico.

## Preguntas abiertas

- Si se desea expandir el proyecto, la siguiente evolución natural sería agregar más tableros o una mayor complejidad visual.
- El alcance actual queda acotado a una versión de prueba jugable y validada en un ambiente local.
