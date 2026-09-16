# Informe final

## Resultado

Se entregó una versión jugable de Block Popper con una estructura de canvas 2D y Vite, validada por compilación y revisada contra la lógica real del archivo principal. El juego incluye pala, bolas, bloques, tutorial, power-ups, vidas, puntuación y escenas de victoria/derrota.

## Cambios y decisiones

- Cambio principal: reemplazar la idea inicial de un prototipo Phaser 3 por una implementación basada en JavaScript nativo y canvas, más estable para la ejecución real.
- Mecánicas actualizadas: tutorial al inicio, power-ups x2/triple/long, bonus por rapidez y victoria inmediata al limpiar el primer tablero.
- Estado final: la partida reinicia con ESPACIO desde el fin del juego y la pantalla de victoria se usa como estado separado.

## Validación

- Sintaxis: `node --check src/main.js` -> sin errores.
- Build: `npm run build` -> exitosa, con salida final `✓ built in 133ms` en la última ejecución verificada.

## Límites y riesgos

- La validación visual manual del gameplay requiere abrirse en navegador y observar el comportamiento real del juego en tiempo de ejecución.
- El alcance del proyecto se mantiene académico y sin ampliar la progresión a niveles, audio profesional o persistencia.
- El repositorio no contiene secretos ni credenciales y no se publican datos privados fuera del entorno local.
