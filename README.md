# SEMÁFORO DE CAMBIOS

¿Qué sucede con la solución óptima? Microjuego de Optimización I: centro de control con seis retos independientes por partida y 24 escenarios. HTML, CSS, JavaScript vanilla; sin backend. Abrir `index.html` o servir con `python3 -m http.server 8080`.

## Fuente académica revisada

`GYM 4_251208_083217 (1).pdf`, copia local del material solicitado. Se revisaron páginas PDF 25–43 (numeración impresa 24–42): dual simplex, sensibilidad, cambios en b, c, A, nuevas variables y restricciones. Cada escenario incluye página PDF, modelo, base original, cambio, datos, respuesta, justificación y dificultad. No se redistribuye el PDF.

Convención de la profesora: `r_j = z_j − c_j = c_B B⁻¹ a_j − c_j`. Para maximización, condición de optimalidad `r ≥ 0`; factibilidad `B⁻¹b ≥ 0`. Un medidor de optimalidad conservada no implica solución óptima si falta factibilidad. Los casos de identificación no concluyen pérdidas sin calcularlas. El ejemplo de minimización del PDF usa el signo opuesto para la condición de optimalidad; el juego usa maximización explícita para evitar mezclar convenciones.

## Cálculos reproducibles

Modelo P (PDF 30): base ordenada `(x₂,x₁)`; `B=[[5,3],[2,5]]`, `B⁻¹=[[5,-3],[-2,5]]/19`, `c_B=(3,5)`. Original: `x_B=(45,20)/19`, `r_h=(5,16)/19`. Con b=(3,10): `(-15,44)/19`. Con b=(16,10): `(50,18)/19`. Con x₂≤1: holgura `1−45/19=−26/19`, coeficiente canónico de x₃ `−5/19`.

Modelo Q (PDF 31): base `(x₃,x₂)` con `B=diag(1,2)`, `c_B=(0,5)`, `x_B=(4,9)`. `r₁=7.5−c₁`: c₁=10 da −2.5; c₁=7 da 0.5. Nueva variable a₅=(1,2), c₅=7 da r₅=5−7=−2 (PDF 39–40). Nueva columna a₁=(10,1) da r₁=2.5−3=−0.5 (PDF 34).

Caso D05, adaptación numérica de cambio básico (PDF 35): original B=I, base `(x₁,s₂)`, x_B=(2,1), r(x₂,s₁)=(0,1), óptima. Nueva B=diag(−1,1), inversa igual; c_B=(1,0), x_B=(−2,1), r(x₂,s₁)=(−2,−1): ambas pérdidas. I02: columnas (0,1) repetidas, determinante 0; no prueba infactibilidad del modelo.

Dual simplex: r≥0, algún x_B<0; revisar candidatos negativos en la fila de salida. Si no existen, esa fila certifica infactibilidad. El juego no exige iteraciones. Para ambas pérdidas o base singular, se recoge el enfoque con artificiales/M grande del resumen de la profesora (PDF 43).

## Juego y accesibilidad

Progresión fija de seis etapas, escenario y orden de opciones aleatorios por Fisher–Yates. Una respuesta por reto, feedback y avance manual. Objetivo de lectura: 60–120 s, sin límite forzado; reloj muestra tiempo real. Replay reinicia estado y banco seleccionado. Botones semánticos, foco visible, teclado, etiquetas de estado, live region y movimiento reducido. Audio Web Audio opcional apagado inicialmente. Diseño móvil, iPad retrato y dos columnas desde 901 px. Fuentes remotas opcionales con fallback local.

## Publicación

Repositorio independiente `semaforo-sensibilidad`. GitHub Pages mediante Actions desde `main`. Producción: https://israeltiburcio-ai.github.io/semaforo-sensibilidad/

## QA

Ejecutar `node qa.cjs` para validar banco, progresión y cálculos. El QA de navegador se documenta en `QA.md`.
