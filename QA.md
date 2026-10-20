# QA · 20 de octubre de 2026

## Académico — PASS

Revisión directa del PDF, páginas de archivo 25–43, incluyendo anotaciones y ejemplos. Los casos originales y adaptados están diferenciados en README. `node qa.cjs`: 24 identificadores únicos, campos obligatorios, respuesta incluida, distractores únicos, 100 partidas con progresión 1–6, verificación independiente de productos matriciales y costos reducidos de los seis diagnósticos. Los casos conceptuales usan las fórmulas y el razonamiento reproducible documentados en README. Durante QA se corrigió r(x₂) del caso D05 a −2.

## Funcional — PASS

Chromium/Playwright: cinco partidas completas, una en cada viewport: 375×812, 390×844, 820×1180, 1180×820 y 1440×1000. Cinco respuestas correctas y una incorrecta por partida: resultado 5/6. Feedback presente, avance manual, reinicio al reto 1, activación del control de audio, teclado Enter, modo de movimiento reducido, cero errores JavaScript. Controles visibles de al menos 44 px de alto; sin overflow horizontal en las seis rondas de cada partida. La síntesis de audio se ejecutó sin errores; no se hizo evaluación auditiva humana.

La duración automatizada no representa lectura humana. Objetivo de diseño 60–120 s; reloj libre y textos breves. Pendiente validar ese tiempo con alumnado real y verificar dispositivos físicos iPad/iPhone (QA actual por emulación de viewport en Chromium).
