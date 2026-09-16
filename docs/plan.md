# Plan de intervención

## Objetivo del plan

Completar la versión final jugable del proyecto Block Popper, mantener la estabilidad de la lógica, ajustar la secuencia de juego y documentar el resultado con evidencia real del repositorio actual.

## Cambios propuestos

| Paso | Cambio mínimo | Archivos previstos | Verificación | Riesgo | Condición de detención |
|---:|---|---|---|---|---|
| 1 | Revisar la base real del proyecto y validar la arquitectura actual | package.json, index.html, src/main.js, src/style.css | `node --check` y `npm run build` | detectar desalineación con la versión final | si la lógica no coincide con la documentación, actualizar ambos |
| 2 | Ajustar mecánicas y estado del juego | src/main.js | revisión de flujo de juego y compilación | errores en la escena o victoria | si la partida queda bloqueada o no reinicia, corregir |
| 3 | Completar la UX de tutorial, power-ups y escenas finales | src/main.js, src/style.css | ejecución local y validación visual | funcionalidad incompleta | si falta un estado crítico, se corrige antes de cerrar |
| 4 | Actualizar documentación del repositorio | README.md, GDD.md, docs/*.md | revisión de contenido y build final | documentación no verificada | si no coincide con el código, debe ajustarse |

## Orden de implementación

Se mantiene la lógica de juego como objetivo principal, porque todas las decisiones de diseño dependen de que el canvas funcione correctamente y de que el estado del juego se comporte de manera estable. Luego se revisa la experiencia de usuario con tutorial y pantallas finales. Finalmente, la documentación se alinea con lo realmente implementado y validado.

## Fuera de alcance

- No se agregan niveles múltiples ni progresión por etapas.
- No se introducen enemigos, audio profesional ni persistencia.
- No se publican cambios fuera del repositorio ni se usan secretos o credenciales.
