# Block Popper

Prototipo académico de arcade tipo Arkanoid desarrollado con JavaScript y canvas HTML5, usando Vite como entorno de ejecución y compilación. La versión final no depende de Phaser en la lógica de juego; se implementó un loop propio con colisiones manuales, estado por escena y tutorial de inicio.

## Datos del proyecto

- Estudiante: Eduardo Acosta Crick
- Nombre del proyecto: Block Popper
- Motor principal actual: JavaScript + HTML5 Canvas
- Herramienta de ejecución: Vite 5
- Estado: juego jugable y validado por compilación

## Descripción

Block Popper es un breakout en el que el jugador mueve una pala en la parte inferior, lanza la bola con la barra espaciadora y destruye filas de bloques. El juego incluye un tutorial inicial, puntuación por destrucción, vidas, bonus por velocidad, power-ups de multiplicación y alargamiento de pala, y una pantalla de victoria separada.

## Requisitos y ejecución

- Node.js 18+
- npm

Pasos:

1. Instalar dependencias:
   npm install
2. Ejecutar en modo desarrollo:
   npm run dev
3. Compilar para producción:
   npm run build
4. Previsualizar la build:
   npm run preview

## Controles

- A / D: mover la pala.
- ESPACIO: lanzar la bola o reiniciar desde la pantalla final.
- Objetivo: destruir todos los bloques del primer nivel para ganar. Si se pierde todas las vidas se muestra Game Over.

## Mecánicas principales

- Bloques con color por fila y puntuación basada en destrucción.
- Bola original roja y bolas extra blancas al recoger power-ups.
- Power-ups:
  - x2: duplica bolas activas.
  - triple: añade tres bolas adicionales en espera.
  - long: alarga la pala durante 10 segundos.
- Bonus visual de velocidad: cada bloque roto en ráfaga aporta puntos extra mientras la velocidad de la bola y los eventos de destrucción se mantienen activos.
- Tutorial inicial con instrucciones de controles.
- Victoria inmediata tras limpiar la primera pantalla de bloques.

## Créditos

- Vite: entorno de desarrollo y build.
- Canvas 2D nativo: lógica de render, colisiones y animación.
- Assets: gráficos generados con formas geométricas del navegador; no se usan recursos externos.

## Entrega

Este repositorio queda como versión local de un prototipo académico jugable y validado por compilación. No se publica ni se comparte un servicio remoto en este entorno.
