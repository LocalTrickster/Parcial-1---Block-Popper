# Matriz de permisos

| Acción | Estado | Alcance o justificación |
|---|---|---|
| Leer archivos del proyecto | Permitida | Requerido para auditar la estructura real del juego y completar la documentación. |
| Buscar rutas y símbolos | Permitida | Necesario para localizar la lógica y validar la implementación actual. |
| Editar archivos previstos | Permitida | El alcance del proyecto quedó definido por la versión jugable final. |
| Ejecutar scripts del repositorio | Permitida | Requiere validación local del juego y la compilación. |
| Instalar dependencias | Permitida | Necesario para Vite y la compilación del proyecto. |
| Usar red | Permitida | Solo para instalar dependencias del proyecto y no para publicar ni acceder a servicios externos. |
| Publicar o subir cambios | Prohibida | El repositorio se trabaja localmente y no se publica fuera del entorno. |
| Acceder a secretos o credenciales | Prohibida | No corresponde al alcance del proyecto. |

## Condiciones de detención

- Si el proyecto cambia de arquitectura sin documentarla, debe revisarse antes de seguir.
- Si la validación falla sin causa clara, se debe revisar la lógica y la configuración antes de continuar.
- Si el alcance final del juego cambió, debe reflejarse en los documentos antes de cerrar la entrega.
