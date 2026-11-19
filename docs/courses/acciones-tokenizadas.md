# Curso · Acciones de EE. UU. tokenizadas (borrador de estructura)

> Estado: **borrador, 19 nov 2026**. Nada de esto está publicado: no está en `src/lib/courses.ts` ni tiene página.
> Fuente única de los hechos: `ekinoxis/products/digital products/BRIEF-acciones-tokenizadas.md` y
> `ekinoxis/marketing/referencias/acciones-okx/datos-fuentes.md`. Una cifra que no esté allí no entra al curso.
> Roles: estructura y página → `ekinoxisweb` · diseño → `digital-products` · reel → `marketing`.

## Reglas de contenido (todas las lecciones)

- Español de Colombia. Cada cifra lleva fuente y fecha en pantalla o en la nota de la lección.
- Toda lección con dinero real cierra con: **«Esto no es asesoría de inversión.»**
- El estatus legal para residentes en Colombia **no está verificado**: nunca decir que es legal, ni que no lo es.
  Decir «no lo hemos verificado; consulta a un profesional».
- Tarifas: solo las observadas en el historial de órdenes de William, dichas como observadas, no como oficiales
  (OKX no publica tarifas para acciones tokenizadas).
- Nada de rendimientos, predicciones de precio ni «la acción va a subir».

## Para quién

Personas en Colombia (y LATAM) que vieron el reel, ya usan o han oído de un exchange como OKX, y quieren
exposición al precio de empresas de EE. UU. sin cuenta en un bróker de EE. UU. Nivel: principiante.

## Qué se lleva al terminar

1. Saber qué compra y qué no compra (token ≠ acción).
2. Haber hecho una compra pequeña en un exchange entendiendo el costo real de cada ruta.
3. Una wallet propia con su frase de recuperación guardada bien.
4. Una compra en Uniswap desde esa wallet.
5. Un checklist de riesgos para evaluar cualquier emisor antes de comprar.

## Módulos

### 1 · Qué es una acción tokenizada (y qué no)
- Un token que **sigue el precio** de la acción. No es la acción: **sin voto**, dividendos **reinvertidos**, no en efectivo.
  — [OKX help](https://www.okx.com/help/unified-tokenized-stocks), sep 2026.
- Quién la emite: en OKX el emisor es **xStocks** (Backed Assets / Kraken); OKX solo distribuye. — misma fuente.
- Quién no puede: xStocks no es para residentes de **EE. UU., Canadá, Reino Unido, Australia**.
  — [Kraken](https://support.kraken.com/articles/getting-started-with-xstocks), ene 2026.
- Ejercicio: leer la ficha de un token y encontrar emisor, red y restricciones.

### 2 · Comprar en un exchange: Convert vs Spot (OKX)
- Ruta **Convert** (fácil): Quick → Stock → empresa → monto → comprar. Ejemplo real: SpaceX, 1 USDT.
- Ruta **Spot** (mejor precio): TradFi → empresa → orden a mercado. Ejemplo real: Anthropic, 2,35 USDT, al abrir
  (debut en Nasdaq el 19 nov 2026).
- Costo observado en las órdenes de William: Convert ≈ **+2,1 %** sobre el precio de la ficha aunque diga «No fee»;
  Spot = precio de mercado + **0,1 %** de comisión. Enseñar a calcularlo en el propio historial, no a creerle a la etiqueta.
- Ejercicio: hacer la misma compra mínima por ambas rutas y comparar el precio efectivo.

### 3 · Tu propia wallet
- Wallet de autocustodia (Rabby), 12 palabras: qué son, dónde se guardan, por qué nadie debe pedirlas.
- Redes: el mismo token puede existir en varias redes; la red debe coincidir al enviar.
- Ejercicio: crear la wallet, guardar la frase fuera de línea, recibir un monto mínimo de prueba.

### 4 · Comprar en Uniswap
- Uniswap ofrece acciones tokenizadas en Web App, Wallet y API, sujetas a elegibilidad, KYC y país según el emisor;
  el protocolo ha procesado **más de US$4,4 billones** (trillion).
  — [blog Uniswap](https://blog.uniswap.org/tokenized-securities-are-live), 12 jun 2026.
- Catálogo: https://app.uniswap.org/explore/tokens?category=stocks (se lee en navegador; capturar empresa, ticker,
  emisor, red y liquidez con fecha).
- Liquidez y slippage: por qué un token con poca liquidez cuesta más de lo que muestra.
- Ejercicio: conectar la wallet del módulo 3 y hacer un swap mínimo.

### 5 · Emisores y riesgos
- Emisores en Uniswap, según Uniswap: **Robinhood Stock Tokens, xStocks, Ondo, Dinari**
  ([Uniswap en X](https://x.com/Uniswap/status/2120239716679430387) — afirmación propia, se presenta como tal).
- Redes por emisor: la prensa es inconsistente → **verificar en la doc de cada emisor antes de grabar**.
- Riesgos a explicar: custodia (quién tiene la acción real), país/elegibilidad, liquidez, riesgo del emisor,
  riesgo de la wallet (frase perdida = fondos perdidos).
- Entregable: checklist de 1 página para evaluar un emisor.

### 6 · Impuestos y legal en Colombia — **bloqueado**
- No se graba ni se publica hasta tener revisión de un profesional (contador/abogado) con nombre y fecha.
- Mientras tanto el curso dice: «No lo hemos verificado. Consulta a un profesional antes de invertir.»

## Decisiones

Tomadas por William (19 nov 2026, vía la sesión `digital-products`):
- **Modelo:** introducción gratis (módulos 1–2 a cambio del correo) + curso completo pago (módulos 3–5, Stripe).
  El módulo 6 no se promete en la página.
- **Captura:** palabra clave en comentarios de Instagram → DM con el link. Misma URL; nada cambia en este repo.
- **Formulario:** nombre + correo + WhatsApp (opcional); `message` fijo.

Abiertas:

| Decisión | Opciones | Qué cambia en este repo |
|---|---|---|
| Precio del curso completo | — | Producto y precio en Stripe; entrada en `courses.ts` |
| Entrega de módulos 1–2 | Correo con link (Resend) · se abren en la misma página tras el formulario | Plantilla de correo o estado de la página |
| Acceso a módulos 3–5 | **Decidido (William):** login con Privy + tabla de clientes en Supabase + flujo de compra → acceso. Fase 2, después de la página | Diseño propio: auth Privy verificada en servidor, tabla `customers`/accesos con RLS, webhook de Stripe que otorga acceso |
| Formato | Video grabado · cohorte en vivo · guía escrita | Página de entrega y cómo se envía el acceso |
| Correo de entrega | Resend · solo registro en Supabase y seguimiento manual | Resend → plantilla + dominio verificado |
| Revisión legal | Quién y cuándo | Desbloquea el módulo 6 |

## Página de captura (cuando llegue el diseño)

- Ruta propuesta: `/es/recursos/acciones-tokenizadas`, solo español, igual que `skills-diseno`
  (la dirección en inglés redirige). Textos en `src/lib/recursos.ts`; agregar a `sitemap.ts`.
- Leads: tabla `leads` existente vía `/api/contact` con `topic = 'course'` y `source_path` para atribución.
  `name` y `message` son obligatorios en la tabla: o el formulario los pide, o se decide un mensaje fijo
  («Quiero el curso de acciones tokenizadas») — si se necesita un campo nuevo, va por `/db-migrate`.
- Eventos PostHog del embudo del reel: vista de página → envío del formulario.
- Descargo «Esto no es asesoría de inversión» visible en la página, no solo en el pie.
