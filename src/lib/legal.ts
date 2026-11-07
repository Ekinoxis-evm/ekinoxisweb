/**
 * The legal documents: Privacy Policy and Terms of Service, in both languages.
 *
 * Every clause describes what the site actually does — the booking form and
 * `public.leads`, Stripe Checkout for courses, PostHog analytics with masked
 * session replay, the language cookie, Resend email, the Telegram alert — so
 * the text stays true to the code. Change the code, change the clause.
 *
 * Rendered by src/components/LegalDocument.tsx at /privacy, /terms and
 * /data-deletion (the deletion-instructions URL that Google and Meta app
 * reviews ask for).
 */

import type { Language } from './content';

/** A paragraph, a bullet list, or a two-column definition table. */
export type LegalBlock =
  | { p: string }
  | { list: string[] }
  | { table: { head: [string, string]; rows: [string, string][] } };

export interface LegalSection {
  /** Anchor id, shared by both languages so links survive a language switch. */
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  slug: 'privacy' | 'terms' | 'data-deletion';
  label: string;
  title: string;
  /** Plain-language summary under the title. */
  summary: string;
  /** ISO date the text was last changed. Shown as "Last updated". */
  updated: string;
  sections: LegalSection[];
}

/* ── Facts the documents cite ────────────────────────────────────────────── */

export const LEGAL_EMAIL = 'hola@ekinoxis.xyz';
export const PRIVACY_EMAIL = 'privacy@ekinoxis.xyz';
export const LEGAL_UPDATED = '2026-11-03';

const ENTITY_EN =
  'Ekinoxis Labs ("Ekinoxis", "we", "us"), operated by Ekinoxis LLC, 159 N Wolcott St, Suite 133, Casper, Wyoming 82601, United States, with its innovation laboratory at Zonamerica, Calle 36 #128-321, Cali, Valle del Cauca, Colombia';
const ENTITY_ES =
  'Ekinoxis Labs ("Ekinoxis", "nosotros"), operado por Ekinoxis LLC, 159 N Wolcott St, Suite 133, Casper, Wyoming 82601, Estados Unidos, con su laboratorio de innovación en Zonamerica, Calle 36 #128-321, Cali, Valle del Cauca, Colombia';

const p = (text: string): LegalBlock => ({ p: text });
const list = (items: string[]): LegalBlock => ({ list: items });
const table = (head: [string, string], rows: [string, string][]): LegalBlock => ({ table: { head, rows } });

/* ── Privacy Policy ──────────────────────────────────────────────────────── */

const privacyEn: LegalDocument = {
  slug: 'privacy',
  label: 'Privacy Policy',
  title: 'Privacy Policy',
  summary:
    'What we collect when you use ekinoxis.xyz, why, who else sees it, how long we keep it, and the rights you have over it. Written in plain language, true to how the site works.',
  updated: LEGAL_UPDATED,
  sections: [
    {
      id: 'who',
      heading: '1. Who is responsible for your data',
      blocks: [
        p(`${ENTITY_EN}, is the data controller for the personal data described in this policy.`),
        p(`Questions, requests and complaints about your data go to ${PRIVACY_EMAIL}. We answer within 15 business days, and sooner when we can.`),
        p('This policy covers the website at ekinoxis.xyz and its Spanish edition at ekinoxis.xyz/es, the booking form, course enrollment, and the emails we send as a result. It does not cover the products we build for clients or our own apps, each of which has its own policy.'),
      ],
    },
    {
      id: 'what',
      heading: '2. What we collect, and why',
      blocks: [
        p('We collect only what a given action needs. Nothing on this site asks for data "just in case".'),
        table(
          ['When you…', 'We collect'],
          [
            ['Browse the site', 'Pages viewed, clicks, the device and browser type, approximate location derived from your IP address, and a session recording in which every form field is masked. See section 4.'],
            ['Pick a language', 'One cookie, ekx-lang, holding "en" or "es" so you land on the right edition next time. It expires after one year.'],
            ['Book a free call', 'Your name, email address, WhatsApp number, company (optional), the service you are interested in, the answers you give to the qualifying questions (plan, stage, budget band, hours), anything you type or dictate about your project, the chosen time slot, your language, the page you came from, and the link to your masked session recording.'],
            ['Enroll in a course', 'Your name, email address and billing address, collected by Stripe on its hosted checkout page. We never see or store your card number. We store the Stripe session id, customer id, payment id, course, amount, currency and payment status.'],
            ['Email us', 'Whatever you choose to include in the message, plus your email address.'],
          ],
        ),
        p('We do not collect sensitive data (health, biometrics, political or religious views, sexual orientation) and we ask you not to send it. We do not knowingly collect data from anyone under 18; the site and its services are for businesses and adults.'),
      ],
    },
    {
      id: 'purposes',
      heading: '3. What we use it for, and on what basis',
      blocks: [
        list([
          'To call you back and run the free call, consultation or project you asked for. Basis: the steps needed before entering a contract with you, and the contract itself.',
          'To send you one confirmation email with the booked time and a calendar invite, and a reply if you wrote to us. Basis: the same.',
          'To alert our team on Telegram that a lead came in, so a person answers the same working day. Basis: our legitimate interest in answering you quickly.',
          'To deliver a paid course and keep the record of the payment. Basis: the contract, and our tax and accounting obligations.',
          'To understand how the site is used and fix what is confusing, through analytics. Basis: our legitimate interest in a site that works; see section 4 for how to opt out.',
          'To prevent abuse of the booking form (rate limits, a hidden honeypot field). Basis: our legitimate interest in keeping the site working.',
        ]),
        p('We do not sell your data. We do not use it for advertising profiles, and we do not send newsletters or marketing emails unless you asked for them in writing. If that changes, every message will carry a one-click way to stop.'),
      ],
    },
    {
      id: 'analytics',
      heading: '4. Analytics, session replay and cookies',
      blocks: [
        p('We use PostHog, a product-analytics service, to count visits, see which pages and buttons are used, and replay sessions so we can see where the site gets confusing. Analytics is loaded on every public page. It is never loaded in the admin area.'),
        p('Session replay records how the page looks and where you click. Every input field is masked before the recording leaves your browser, so a name, email, phone number or message you type never appears in a replay. When you book a call, the link to your masked replay is saved with your request so that the person who calls you understands what you were looking at.'),
        p('Until you book a call, PostHog knows you only by a random identifier stored in your browser. When you book, that identifier is linked to the internal id of your request, never to your email or phone.'),
        p('Analytics data travels through a path on our own domain before reaching PostHog, so that it is not silently dropped by content blockers. The data is processed by PostHog Inc. in the United States.'),
        p('Cookies and local storage used by this site:'),
        table(
          ['Name', 'Purpose and lifetime'],
          [
            ['ekx-lang', 'Remembers English or Spanish. Set by us. One year. Strictly necessary for the language choice to stick.'],
            ['ph_* (PostHog)', 'A random visitor id, the current session and whether replay is on. Set by PostHog. Up to one year. Analytics.'],
            ['sb-* (Supabase)', 'Admin session only. Set only when a member of our team signs in to the admin area. Not set for visitors.'],
            ['Stripe', 'Stripe sets its own cookies on its checkout page, under its own policy, for fraud prevention and to run the payment.'],
          ],
        ),
        p('To opt out of analytics, enable "Do Not Track" or "Global Privacy Control" in your browser, use a content blocker, or write to us and we will exclude you. Blocking analytics does not affect any feature of the site.'),
      ],
    },
    {
      id: 'sharing',
      heading: '5. Who else sees your data',
      blocks: [
        p('Only the services we need to run the site, each bound by its own data-processing terms, and each receiving only the fields its job requires:'),
        table(
          ['Provider', 'What they do with your data'],
          [
            ['Supabase (USA)', 'Hosts our database. Your booking request and course enrollment are stored here, with row-level security so nothing is readable from the public site.'],
            ['Vercel (USA)', 'Hosts and serves the website. Sees the technical data of every request (IP address, user agent) in its logs for a limited time.'],
            ['Resend (USA)', 'Sends the confirmation email to you and the booking copy to us. Sees your name, email and the booking details.'],
            ['Stripe (USA)', 'Processes course payments. Sees your name, email, billing address and card details under its own privacy policy.'],
            ['PostHog (USA)', 'Analytics and masked session replay, as described in section 4.'],
            ['Telegram (UAE / EU)', 'Delivers the new-lead alert to our team chat. The alert contains your name, email, WhatsApp number, answers and message.'],
            ['Google (USA)', 'Sign-in for our admin area only. If you add the booked call to Google Calendar, you do so from your own account.'],
          ],
        ),
        p('We also share data when the law requires it, to defend our rights, or, with notice to you, if Ekinoxis is sold or merged. We never share your data with advertisers or data brokers.'),
      ],
    },
    {
      id: 'transfers',
      heading: '6. International transfers',
      blocks: [
        p('We operate from Colombia and the United States, and the providers above store data mainly in the United States. By sending us your data you understand it will be processed in both countries. Where the law of your country requires a specific safeguard for a transfer, we rely on our providers\' standard contractual clauses and on the consent you give when you submit a form.'),
        p('For data subjects in Colombia: Ekinoxis complies with Law 1581 of 2012 and Decree 1377 of 2013. Your authorization for the treatment of your data is given when you submit the booking form or enroll in a course, after reading this policy. The international transfer of your data to the providers listed in section 5 is authorized by that same act.'),
      ],
    },
    {
      id: 'retention',
      heading: '7. How long we keep it',
      blocks: [
        table(
          ['Data', 'Kept for'],
          [
            ['Booking requests (leads)', 'Up to 3 years from the last contact, so we can follow up on a project that starts later. Deleted earlier on request.'],
            ['Course enrollments and payments', '10 years, as required by tax and accounting rules in Colombia and the United States.'],
            ['Emails between us', 'As long as the relationship lasts and 3 years after, unless you ask for deletion.'],
            ['Analytics and session replays', 'Replays: 30 days. Aggregate analytics: up to 12 months, then only totals with no personal data.'],
            ['Server logs', 'Up to 30 days.'],
            ['Admin sign-in records', 'As long as the team member has access.'],
          ],
        ),
        p('When a period ends, the data is deleted or anonymized so that it can no longer identify you.'),
      ],
    },
    {
      id: 'security',
      heading: '8. How we protect it',
      blocks: [
        list([
          'Encryption in transit (HTTPS everywhere) and at rest at every provider listed above.',
          'The database has row-level security enabled on every table with a deny-by-default rule. The public site can read only published content; your booking request is written and read only by server code with a private key that never reaches the browser.',
          'The admin area requires Google sign-in and is limited to a named allowlist of team members. It is never indexed and never tracked.',
          'Secrets live only in the hosting provider\'s encrypted configuration; they are rotated if ever exposed.',
          'Form fields are masked in session recordings before leaving your browser.',
          'Submissions are validated, length-limited and rate-limited on the server. The server, not the browser, records where a request came from.',
        ]),
        p('No system is perfectly secure. If we learn of a breach that affects your data, we will tell you by email without undue delay, and the authorities where the law requires it.'),
      ],
    },
    {
      id: 'rights',
      heading: '9. Your rights',
      blocks: [
        p('Wherever you are, you can ask us to:'),
        list([
          'Tell you what data we hold about you and send you a copy (access and portability).',
          'Correct anything that is wrong or incomplete (rectification).',
          'Delete your data (erasure), unless we must keep part of it for a legal reason such as a tax record, in which case we tell you which part and why.',
          'Stop or limit a use of your data (objection and restriction), including analytics and any message you no longer want.',
          'Withdraw an authorization you gave us. This does not undo processing that already happened.',
          'Know who we shared it with.',
        ]),
        p(`To exercise any of these, write to ${PRIVACY_EMAIL} from the email address you used with us, or tell us which one it was. We may ask for one piece of information to confirm it is you. There is no charge. We answer within 15 business days; Colombian residents who make a query (consulta) receive an answer within 10 business days and a claim (reclamo) within 15, as Law 1581 provides.`),
        p('Step-by-step instructions for deleting your data are on the Data deletion page, linked at the bottom of every page.'),
        p('If you are not satisfied with our answer, you can complain to your data-protection authority. In Colombia that is the Superintendencia de Industria y Comercio (SIC), sic.gov.co. In the United States, the Federal Trade Commission or your state attorney general. Residents of the European Economic Area or the United Kingdom can contact their national authority.'),
        p('Residents of California and other US states with privacy laws: we do not sell or share personal data for cross-context advertising, and we treat Global Privacy Control signals as an opt-out of analytics. You will not be treated differently for exercising any right.'),
      ],
    },
    {
      id: 'links',
      heading: '10. Links to other sites',
      blocks: [
        p('The site links to our social profiles, to our partners\' and clients\' sites, and to the live products in our portfolio. Each of those has its own privacy policy, and this one stops at the link.'),
      ],
    },
    {
      id: 'changes',
      heading: '11. Changes to this policy',
      blocks: [
        p('When we change how the site handles data, we update this page and the date at the top. If a change reduces your rights or uses your data for a new purpose, we will email the people it affects before it takes effect. Earlier versions are available on request.'),
      ],
    },
    {
      id: 'contact',
      heading: '12. Contact',
      blocks: [
        p(`Privacy requests: ${PRIVACY_EMAIL}. Everything else: ${LEGAL_EMAIL}.`),
        p('Postal address: Ekinoxis LLC, 159 N Wolcott St, Suite 133, Casper, WY 82601, United States. In Colombia: Zonamerica, Calle 36 #128-321, Cali, Valle del Cauca.'),
      ],
    },
  ],
};

const privacyEs: LegalDocument = {
  slug: 'privacy',
  label: 'Política de privacidad',
  title: 'Política de privacidad',
  summary:
    'Qué recogemos cuando usas ekinoxis.xyz, para qué, quién más lo ve, cuánto tiempo lo guardamos y los derechos que tienes sobre tus datos. En lenguaje claro y fiel a cómo funciona el sitio.',
  updated: LEGAL_UPDATED,
  sections: [
    {
      id: 'who',
      heading: '1. Quién es responsable de tus datos',
      blocks: [
        p(`${ENTITY_ES}, es el responsable del tratamiento de los datos personales descritos en esta política.`),
        p(`Las preguntas, solicitudes y reclamos sobre tus datos van a ${PRIVACY_EMAIL}. Respondemos en máximo 15 días hábiles, y antes cuando podemos.`),
        p('Esta política cubre el sitio ekinoxis.xyz y su edición en español en ekinoxis.xyz/es, el formulario de agendamiento, la inscripción a cursos y los correos que enviamos como resultado. No cubre los productos que construimos para clientes ni nuestras propias apps, cada una con su propia política.'),
      ],
    },
    {
      id: 'what',
      heading: '2. Qué recogemos y por qué',
      blocks: [
        p('Recogemos solo lo que cada acción necesita. Nada en este sitio pide datos "por si acaso".'),
        table(
          ['Cuando tú…', 'Recogemos'],
          [
            ['Navegas el sitio', 'Páginas vistas, clics, tipo de dispositivo y navegador, ubicación aproximada derivada de tu dirección IP y una grabación de sesión en la que todos los campos de formulario van enmascarados. Ver sección 4.'],
            ['Eliges un idioma', 'Una cookie, ekx-lang, con "en" o "es" para que la próxima vez llegues a la edición correcta. Vence al año.'],
            ['Agendas una llamada gratis', 'Tu nombre, correo, número de WhatsApp, empresa (opcional), el servicio que te interesa, las respuestas a las preguntas de calificación (plan, etapa, rango de presupuesto, horas), lo que escribas o dictes sobre tu proyecto, el horario elegido, tu idioma, la página desde la que llegaste y el enlace a tu grabación de sesión enmascarada.'],
            ['Te inscribes en un curso', 'Tu nombre, correo y dirección de facturación, recogidos por Stripe en su página de pago. Nunca vemos ni guardamos el número de tu tarjeta. Guardamos el id de sesión de Stripe, el id de cliente, el id del pago, el curso, el monto, la moneda y el estado del pago.'],
            ['Nos escribes', 'Lo que decidas incluir en el mensaje, más tu dirección de correo.'],
          ],
        ),
        p('No recogemos datos sensibles (salud, biometría, opiniones políticas o religiosas, orientación sexual) y te pedimos no enviarlos. No recogemos a sabiendas datos de menores de 18 años; el sitio y sus servicios son para empresas y adultos.'),
      ],
    },
    {
      id: 'purposes',
      heading: '3. Para qué los usamos y con qué base',
      blocks: [
        list([
          'Para devolverte la llamada y realizar la llamada gratis, la consultoría o el proyecto que pediste. Base: las gestiones previas a un contrato contigo y el contrato mismo.',
          'Para enviarte un correo de confirmación con la hora agendada y una invitación de calendario, y una respuesta si nos escribiste. Base: la misma.',
          'Para avisar a nuestro equipo por Telegram de que llegó una solicitud, de modo que una persona responda el mismo día hábil. Base: nuestro interés legítimo en responderte rápido.',
          'Para entregar un curso pagado y conservar el registro del pago. Base: el contrato y nuestras obligaciones tributarias y contables.',
          'Para entender cómo se usa el sitio y corregir lo que confunde, mediante analítica. Base: nuestro interés legítimo en un sitio que funcione; en la sección 4 explicamos cómo desactivarla.',
          'Para prevenir abusos del formulario (límites de frecuencia, un campo trampa oculto). Base: nuestro interés legítimo en mantener el sitio funcionando.',
        ]),
        p('No vendemos tus datos. No los usamos para perfiles publicitarios y no enviamos boletines ni correos de marketing salvo que los hayas pedido por escrito. Si eso cambia, cada mensaje traerá una forma de cancelar con un clic.'),
      ],
    },
    {
      id: 'analytics',
      heading: '4. Analítica, grabación de sesión y cookies',
      blocks: [
        p('Usamos PostHog, un servicio de analítica de producto, para contar visitas, ver qué páginas y botones se usan y reproducir sesiones para detectar dónde el sitio confunde. La analítica se carga en todas las páginas públicas. Nunca se carga en el área de administración.'),
        p('La grabación de sesión registra cómo se ve la página y dónde haces clic. Todos los campos de formulario se enmascaran antes de que la grabación salga de tu navegador, así que un nombre, correo, teléfono o mensaje que escribas nunca aparece en una reproducción. Cuando agendas una llamada, el enlace a tu grabación enmascarada se guarda con tu solicitud para que quien te llame entienda qué estabas mirando.'),
        p('Hasta que agendas una llamada, PostHog te conoce solo por un identificador aleatorio guardado en tu navegador. Al agendar, ese identificador se vincula al id interno de tu solicitud, nunca a tu correo ni a tu teléfono.'),
        p('Los datos de analítica pasan por una ruta de nuestro propio dominio antes de llegar a PostHog, para que los bloqueadores de contenido no los descarten en silencio. Los procesa PostHog Inc. en Estados Unidos.'),
        p('Cookies y almacenamiento local que usa este sitio:'),
        table(
          ['Nombre', 'Propósito y duración'],
          [
            ['ekx-lang', 'Recuerda inglés o español. La ponemos nosotros. Un año. Estrictamente necesaria para que la elección de idioma se mantenga.'],
            ['ph_* (PostHog)', 'Un id de visitante aleatorio, la sesión actual y si la grabación está activa. La pone PostHog. Hasta un año. Analítica.'],
            ['sb-* (Supabase)', 'Solo sesión de administración. Se pone únicamente cuando alguien del equipo entra al área de administración. No se pone a visitantes.'],
            ['Stripe', 'Stripe pone sus propias cookies en su página de pago, bajo su propia política, para prevenir fraude y procesar el pago.'],
          ],
        ),
        p('Para desactivar la analítica, activa "No rastrear" (Do Not Track) o "Global Privacy Control" en tu navegador, usa un bloqueador de contenido o escríbenos y te excluimos. Bloquear la analítica no afecta ninguna función del sitio.'),
      ],
    },
    {
      id: 'sharing',
      heading: '5. Quién más ve tus datos',
      blocks: [
        p('Solo los servicios que necesitamos para operar el sitio, cada uno sujeto a sus propios términos de tratamiento de datos y recibiendo únicamente los campos que su función requiere:'),
        table(
          ['Proveedor', 'Qué hace con tus datos'],
          [
            ['Supabase (EE. UU.)', 'Aloja nuestra base de datos. Tu solicitud de llamada y tu inscripción a cursos se guardan aquí, con seguridad a nivel de fila para que nada sea legible desde el sitio público.'],
            ['Vercel (EE. UU.)', 'Aloja y sirve el sitio. Ve los datos técnicos de cada petición (dirección IP, navegador) en sus registros por tiempo limitado.'],
            ['Resend (EE. UU.)', 'Envía el correo de confirmación a ti y la copia de la reserva a nosotros. Ve tu nombre, correo y los detalles de la reserva.'],
            ['Stripe (EE. UU.)', 'Procesa los pagos de cursos. Ve tu nombre, correo, dirección de facturación y datos de tarjeta bajo su propia política de privacidad.'],
            ['PostHog (EE. UU.)', 'Analítica y grabación de sesión enmascarada, como se describe en la sección 4.'],
            ['Telegram (EAU / UE)', 'Entrega la alerta de nueva solicitud al chat de nuestro equipo. La alerta contiene tu nombre, correo, WhatsApp, respuestas y mensaje.'],
            ['Google (EE. UU.)', 'Inicio de sesión solo para nuestra área de administración. Si agregas la llamada a Google Calendar, lo haces desde tu propia cuenta.'],
          ],
        ),
        p('También compartimos datos cuando la ley lo exige, para defender nuestros derechos o, avisándote, si Ekinoxis se vende o se fusiona. Nunca compartimos tus datos con anunciantes ni con corredores de datos.'),
      ],
    },
    {
      id: 'transfers',
      heading: '6. Transferencias internacionales',
      blocks: [
        p('Operamos desde Colombia y Estados Unidos, y los proveedores anteriores guardan los datos principalmente en Estados Unidos. Al enviarnos tus datos entiendes que se procesarán en ambos países. Cuando la ley de tu país exige una salvaguarda específica para la transferencia, nos apoyamos en las cláusulas contractuales estándar de nuestros proveedores y en la autorización que das al enviar un formulario.'),
        p('Para titulares en Colombia: Ekinoxis cumple la Ley 1581 de 2012 y el Decreto 1377 de 2013. Tu autorización para el tratamiento de tus datos se otorga al enviar el formulario de agendamiento o inscribirte en un curso, después de leer esta política. La transferencia internacional de tus datos a los proveedores de la sección 5 queda autorizada con ese mismo acto.'),
      ],
    },
    {
      id: 'retention',
      heading: '7. Cuánto tiempo los guardamos',
      blocks: [
        table(
          ['Datos', 'Se guardan'],
          [
            ['Solicitudes de llamada (leads)', 'Hasta 3 años desde el último contacto, para poder retomar un proyecto que empiece después. Se borran antes si lo pides.'],
            ['Inscripciones a cursos y pagos', '10 años, como exigen las normas tributarias y contables de Colombia y Estados Unidos.'],
            ['Correos entre nosotros', 'Mientras dure la relación y 3 años después, salvo que pidas su borrado.'],
            ['Analítica y grabaciones de sesión', 'Grabaciones: 30 días. Analítica agregada: hasta 12 meses; después solo totales sin datos personales.'],
            ['Registros del servidor', 'Hasta 30 días.'],
            ['Registros de acceso al área de administración', 'Mientras la persona del equipo tenga acceso.'],
          ],
        ),
        p('Cuando un plazo termina, los datos se borran o se anonimizan de modo que ya no puedan identificarte.'),
      ],
    },
    {
      id: 'security',
      heading: '8. Cómo los protegemos',
      blocks: [
        list([
          'Cifrado en tránsito (HTTPS en todo el sitio) y en reposo en todos los proveedores mencionados.',
          'La base de datos tiene seguridad a nivel de fila activada en todas las tablas, con regla de denegar por defecto. El sitio público solo puede leer contenido publicado; tu solicitud se escribe y se lee únicamente desde código del servidor con una llave privada que nunca llega al navegador.',
          'El área de administración exige inicio de sesión con Google y se limita a una lista cerrada de personas del equipo. Nunca se indexa ni se rastrea.',
          'Las llaves secretas viven solo en la configuración cifrada del proveedor de hosting y se rotan si alguna vez se exponen.',
          'Los campos de formulario se enmascaran en las grabaciones de sesión antes de salir de tu navegador.',
          'Los envíos se validan, se limitan en longitud y en frecuencia en el servidor. El servidor, no el navegador, registra desde dónde llegó una solicitud.',
        ]),
        p('Ningún sistema es perfectamente seguro. Si conocemos una brecha que afecte tus datos, te avisaremos por correo sin demora injustificada, y a las autoridades cuando la ley lo exija.'),
      ],
    },
    {
      id: 'rights',
      heading: '9. Tus derechos',
      blocks: [
        p('Estés donde estés, puedes pedirnos:'),
        list([
          'Decirte qué datos tenemos sobre ti y enviarte una copia (acceso y portabilidad).',
          'Corregir lo que esté mal o incompleto (rectificación).',
          'Borrar tus datos (supresión), salvo que debamos conservar una parte por una razón legal como un registro tributario; en ese caso te decimos cuál y por qué.',
          'Detener o limitar un uso de tus datos (oposición y restricción), incluida la analítica y cualquier mensaje que ya no quieras.',
          'Revocar una autorización que nos diste. Esto no deshace el tratamiento ya realizado.',
          'Saber con quién los compartimos.',
        ]),
        p(`Para ejercer cualquiera de ellos, escribe a ${PRIVACY_EMAIL} desde el correo que usaste con nosotros, o dinos cuál fue. Podemos pedirte un dato para confirmar que eres tú. No tiene costo. Respondemos en máximo 15 días hábiles; en Colombia, una consulta se atiende en máximo 10 días hábiles y un reclamo en máximo 15, como establece la Ley 1581.`),
        p('Las instrucciones paso a paso para borrar tus datos están en la página Eliminación de datos, enlazada al pie de todas las páginas.'),
        p('Si no quedas conforme con nuestra respuesta, puedes acudir a tu autoridad de protección de datos. En Colombia es la Superintendencia de Industria y Comercio (SIC), sic.gov.co. En Estados Unidos, la Federal Trade Commission o la fiscalía de tu estado. Residentes del Espacio Económico Europeo o del Reino Unido pueden acudir a su autoridad nacional.'),
        p('Residentes de California y de otros estados de EE. UU. con leyes de privacidad: no vendemos ni compartimos datos personales para publicidad entre contextos, y tratamos la señal Global Privacy Control como exclusión de la analítica. No recibirás un trato distinto por ejercer un derecho.'),
      ],
    },
    {
      id: 'links',
      heading: '10. Enlaces a otros sitios',
      blocks: [
        p('El sitio enlaza a nuestros perfiles sociales, a los sitios de nuestros aliados y clientes y a los productos en vivo de nuestro portafolio. Cada uno tiene su propia política de privacidad, y esta termina en el enlace.'),
      ],
    },
    {
      id: 'changes',
      heading: '11. Cambios en esta política',
      blocks: [
        p('Cuando cambiamos la forma en que el sitio maneja datos, actualizamos esta página y la fecha de arriba. Si un cambio reduce tus derechos o usa tus datos para un fin nuevo, avisaremos por correo a las personas afectadas antes de que entre en vigor. Las versiones anteriores están disponibles a solicitud.'),
      ],
    },
    {
      id: 'contact',
      heading: '12. Contacto',
      blocks: [
        p(`Solicitudes de privacidad: ${PRIVACY_EMAIL}. Todo lo demás: ${LEGAL_EMAIL}.`),
        p('Dirección postal: Ekinoxis LLC, 159 N Wolcott St, Suite 133, Casper, WY 82601, Estados Unidos. En Colombia: Zonamerica, Calle 36 #128-321, Cali, Valle del Cauca.'),
      ],
    },
  ],
};

/* ── Terms of Service ────────────────────────────────────────────────────── */

const termsEn: LegalDocument = {
  slug: 'terms',
  label: 'Terms of Service',
  title: 'Terms of Service',
  summary:
    'The rules for using ekinoxis.xyz, booking a call, buying a course and working with us. Project work is governed by a written proposal; these terms are the floor beneath it.',
  updated: LEGAL_UPDATED,
  sections: [
    {
      id: 'agreement',
      heading: '1. Who you are agreeing with',
      blocks: [
        p(`These terms are an agreement between you and ${ENTITY_EN}. They apply to the website at ekinoxis.xyz (including /es), to the free call you can book there, to the courses sold there, and to any proposal we send you that refers to them.`),
        p('By using the site, booking a call or buying a course you accept these terms and the Privacy Policy. If you act for a company, you confirm you may bind it. If you do not agree, do not use the site.'),
      ],
    },
    {
      id: 'site',
      heading: '2. Using the site',
      blocks: [
        p('The site is for people and businesses looking for software, advice, courses or information about Ekinoxis. You agree not to:'),
        list([
          'Submit false information in the booking form, or book on behalf of someone who did not ask you to.',
          'Use bots, scrapers or scripts to book slots, hit the forms or copy the site at scale.',
          'Probe, overload or attempt to break the site, its forms or the admin area.',
          'Upload or send anything illegal, defamatory, or that infringes someone else\'s rights.',
        ]),
        p('We may refuse, cancel or block any use that breaks these rules, and we may change or take down any part of the site at any time.'),
      ],
    },
    {
      id: 'call',
      heading: '3. The free call',
      blocks: [
        p('Booking a free 30-minute call creates no obligation on either side. We call you on WhatsApp at the booked time, in Colombia time, to understand your situation and suggest the right next step, which may be that you do not need us.'),
        p('A slot can be moved by replying to the confirmation email. If we cannot reach you within 10 minutes of the booked time, the slot is released. Repeated no-shows may lead us to decline further bookings.'),
        p('What we say on the call is general orientation, not legal, tax or financial advice. Nothing on the call constitutes an offer until it is written in a proposal.'),
      ],
    },
    {
      id: 'services',
      heading: '4. Consulting, websites and software',
      blocks: [
        p('Every paid engagement starts with a written proposal that states the scope, price, timeline, deliverables and payment schedule. The proposal, once accepted in writing (including by email), is the contract. If a proposal and these terms conflict, the proposal wins.'),
        p('Unless a proposal says otherwise:'),
        list([
          'Prices on the site are in US dollars, exclude taxes, and are starting points. The proposal fixes the price.',
          'Fixed-price work is invoiced half to start and half on delivery. Monthly engagements are invoiced in advance.',
          'Our delivery dates count from the day we receive both the deposit and the material we asked for (content, access, decisions). Delays on your side move the date by the same amount.',
          'Rounds of changes are the ones the proposal names; work outside the scope is quoted separately before it is done.',
          'You own the deliverables once they are paid in full. We keep the right to reuse general know-how, open-source components and our own tools, and to show the work in our portfolio unless you ask us in writing not to.',
          'Third-party services your project depends on (hosting, domains, APIs, model providers, blockchains) are contracted by you or on your behalf, and their fees and terms are yours.',
        ]),
        p('Either side may end an engagement with written notice. You pay for the work done up to that date; we hand over what has been paid for.'),
      ],
    },
    {
      id: 'courses',
      heading: '5. Courses',
      blocks: [
        p('A course purchase is made through Stripe Checkout. Your seat is confirmed when the payment succeeds; you receive an email with the next steps. Course prices are shown before payment in the currency of the checkout page.'),
        p('Refunds: a full refund if you ask before the first session; 50% if you ask before the second session; none after that. If we cancel or move a cohort and the new dates do not work for you, you get a full refund. Refunds go back to the original payment method within 10 business days.'),
        p('Course material is for your personal use. You may not resell, share or publish it. Certificates are issued on completion as defined for each course.'),
      ],
    },
    {
      id: 'ip',
      heading: '6. Content and intellectual property',
      blocks: [
        p('The site, its text, design, code, brand and images belong to Ekinoxis or its licensors. You may quote short extracts with attribution and a link. The brand kit on /brand may be used only to refer to Ekinoxis, under the rules on that page.'),
        p('Client and partner logos appear with their permission and belong to their owners. Our open-source projects are governed by the license in each repository.'),
      ],
    },
    {
      id: 'disclaimer',
      heading: '7. No warranties',
      blocks: [
        p('The site is provided "as is". We work to keep it accurate and online but do not promise it will be error-free or always available. Information about technologies, prices and timelines on the site is general and may change; the proposal is what binds us.'),
        p('Some of what we build involves blockchains, digital assets and AI models. Those carry their own risks (volatility, irreversibility of transactions, model errors, changing regulation). We explain them in each project, but the decision to use them, and its consequences, are yours.'),
      ],
    },
    {
      id: 'liability',
      heading: '8. Limitation of liability',
      blocks: [
        p('To the extent the law allows, Ekinoxis is not liable for indirect or consequential losses (lost profit, lost data, business interruption) arising from the site, a call, a course or an engagement. Our total liability for any engagement is limited to the amount you paid us for it in the 12 months before the claim.'),
        p('Nothing in these terms limits liability for fraud, gross negligence, death or personal injury, or anything that cannot be limited under the law that applies to you. Consumers in Colombia keep every right granted by Law 1480 of 2011 (Estatuto del Consumidor).'),
      ],
    },
    {
      id: 'privacy',
      heading: '9. Privacy',
      blocks: [
        p('How we handle your data is described in the Privacy Policy, which is part of these terms. In short: we collect only what the action needs, we do not sell it, and you can ask for a copy or deletion at any time.'),
      ],
    },
    {
      id: 'law',
      heading: '10. Governing law and disputes',
      blocks: [
        p('If you contract with Ekinoxis LLC, these terms are governed by the laws of the State of Wyoming, United States, and disputes go to the state or federal courts in Natrona County, Wyoming. If you contract with our Colombian operation, Colombian law applies and disputes go to the courts of Cali, Colombia. The proposal says which one applies to your project.'),
        p('Before any court, we both agree to try to resolve the matter by direct talks for 30 days, and then by mediation if either side asks for it.'),
      ],
    },
    {
      id: 'changes',
      heading: '11. Changes to these terms',
      blocks: [
        p('We may update these terms. The date at the top shows the current version. Changes apply to new bookings, purchases and proposals from that date; a signed proposal keeps the terms in force when it was signed.'),
      ],
    },
    {
      id: 'contact',
      heading: '12. Contact',
      blocks: [
        p(`Questions about these terms: ${LEGAL_EMAIL}. Ekinoxis LLC, 159 N Wolcott St, Suite 133, Casper, WY 82601, United States. Zonamerica, Calle 36 #128-321, Cali, Valle del Cauca, Colombia.`),
      ],
    },
  ],
};

const termsEs: LegalDocument = {
  slug: 'terms',
  label: 'Términos del servicio',
  title: 'Términos del servicio',
  summary:
    'Las reglas para usar ekinoxis.xyz, agendar una llamada, comprar un curso y trabajar con nosotros. Los proyectos se rigen por una propuesta escrita; estos términos son la base sobre la que se apoya.',
  updated: LEGAL_UPDATED,
  sections: [
    {
      id: 'agreement',
      heading: '1. Con quién estás acordando',
      blocks: [
        p(`Estos términos son un acuerdo entre tú y ${ENTITY_ES}. Aplican al sitio ekinoxis.xyz (incluido /es), a la llamada gratis que puedes agendar allí, a los cursos que se venden allí y a cualquier propuesta que te enviemos y que los mencione.`),
        p('Al usar el sitio, agendar una llamada o comprar un curso aceptas estos términos y la Política de privacidad. Si actúas en nombre de una empresa, confirmas que puedes obligarla. Si no estás de acuerdo, no uses el sitio.'),
      ],
    },
    {
      id: 'site',
      heading: '2. Uso del sitio',
      blocks: [
        p('El sitio es para personas y empresas que buscan software, asesoría, cursos o información sobre Ekinoxis. Te comprometes a no:'),
        list([
          'Enviar información falsa en el formulario de agendamiento, ni agendar en nombre de alguien que no te lo pidió.',
          'Usar bots, scrapers o scripts para reservar horarios, golpear los formularios o copiar el sitio a gran escala.',
          'Sondear, sobrecargar o intentar romper el sitio, sus formularios o el área de administración.',
          'Subir o enviar contenido ilegal, difamatorio o que infrinja derechos de terceros.',
        ]),
        p('Podemos rechazar, cancelar o bloquear cualquier uso que rompa estas reglas, y podemos cambiar o retirar cualquier parte del sitio en cualquier momento.'),
      ],
    },
    {
      id: 'call',
      heading: '3. La llamada gratis',
      blocks: [
        p('Agendar una llamada gratis de 30 minutos no crea obligación para ninguna de las partes. Te llamamos por WhatsApp a la hora agendada, en hora de Colombia, para entender tu situación y sugerir el siguiente paso, que puede ser que no nos necesitas.'),
        p('Un horario se puede mover respondiendo el correo de confirmación. Si no logramos contactarte en los 10 minutos siguientes a la hora agendada, el horario se libera. Las inasistencias repetidas pueden llevarnos a rechazar nuevas reservas.'),
        p('Lo que decimos en la llamada es orientación general, no asesoría legal, tributaria ni financiera. Nada de lo dicho en la llamada constituye una oferta hasta que queda escrito en una propuesta.'),
      ],
    },
    {
      id: 'services',
      heading: '4. Consultoría, sitios web y software',
      blocks: [
        p('Todo trabajo pagado empieza con una propuesta escrita que fija alcance, precio, plazos, entregables y calendario de pagos. La propuesta, una vez aceptada por escrito (incluido por correo), es el contrato. Si una propuesta y estos términos se contradicen, prevalece la propuesta.'),
        p('Salvo que la propuesta diga otra cosa:'),
        list([
          'Los precios del sitio están en dólares estadounidenses, no incluyen impuestos y son puntos de partida. La propuesta fija el precio.',
          'El trabajo a precio fijo se factura la mitad al iniciar y la mitad al entregar. Los servicios mensuales se facturan por adelantado.',
          'Nuestras fechas de entrega cuentan desde el día en que recibimos el anticipo y el material que pedimos (contenido, accesos, decisiones). Los retrasos de tu lado mueven la fecha en la misma medida.',
          'Las rondas de cambios son las que nombra la propuesta; el trabajo fuera del alcance se cotiza por separado antes de hacerse.',
          'Eres dueño de los entregables una vez pagados en su totalidad. Conservamos el derecho a reutilizar conocimiento general, componentes de código abierto y nuestras propias herramientas, y a mostrar el trabajo en nuestro portafolio salvo que nos pidas por escrito lo contrario.',
          'Los servicios de terceros de los que depende tu proyecto (hosting, dominios, APIs, proveedores de modelos, blockchains) se contratan por ti o en tu nombre, y sus tarifas y términos son tuyos.',
        ]),
        p('Cualquiera de las partes puede terminar un trabajo con aviso escrito. Pagas el trabajo hecho hasta esa fecha; entregamos lo que ya está pagado.'),
      ],
    },
    {
      id: 'courses',
      heading: '5. Cursos',
      blocks: [
        p('La compra de un curso se hace a través de Stripe Checkout. Tu cupo queda confirmado cuando el pago es exitoso; recibes un correo con los siguientes pasos. Los precios se muestran antes del pago en la moneda de la página de pago.'),
        p('Reembolsos: reembolso completo si lo pides antes de la primera sesión; 50 % si lo pides antes de la segunda; ninguno después. Si cancelamos o movemos una cohorte y las nuevas fechas no te sirven, recibes reembolso completo. Los reembolsos vuelven al medio de pago original en máximo 10 días hábiles.'),
        p('El material del curso es para tu uso personal. No puedes revenderlo, compartirlo ni publicarlo. Los certificados se emiten al completar el curso según lo definido para cada uno.'),
      ],
    },
    {
      id: 'ip',
      heading: '6. Contenido y propiedad intelectual',
      blocks: [
        p('El sitio, sus textos, diseño, código, marca e imágenes pertenecen a Ekinoxis o a sus licenciantes. Puedes citar extractos cortos con atribución y enlace. El kit de marca en /brand solo puede usarse para referirse a Ekinoxis, bajo las reglas de esa página.'),
        p('Los logos de clientes y aliados aparecen con su permiso y pertenecen a sus dueños. Nuestros proyectos de código abierto se rigen por la licencia de cada repositorio.'),
      ],
    },
    {
      id: 'disclaimer',
      heading: '7. Sin garantías',
      blocks: [
        p('El sitio se ofrece "tal cual". Trabajamos para mantenerlo exacto y en línea, pero no prometemos que esté libre de errores ni siempre disponible. La información sobre tecnologías, precios y plazos del sitio es general y puede cambiar; lo que nos obliga es la propuesta.'),
        p('Parte de lo que construimos involucra blockchains, activos digitales y modelos de IA. Tienen sus propios riesgos (volatilidad, irreversibilidad de transacciones, errores de los modelos, regulación cambiante). Los explicamos en cada proyecto, pero la decisión de usarlos, y sus consecuencias, son tuyas.'),
      ],
    },
    {
      id: 'liability',
      heading: '8. Limitación de responsabilidad',
      blocks: [
        p('En la medida en que la ley lo permite, Ekinoxis no responde por pérdidas indirectas o consecuenciales (lucro cesante, pérdida de datos, interrupción del negocio) derivadas del sitio, una llamada, un curso o un trabajo. Nuestra responsabilidad total por cualquier trabajo se limita al monto que nos pagaste por él en los 12 meses anteriores al reclamo.'),
        p('Nada en estos términos limita la responsabilidad por fraude, culpa grave, muerte o lesiones personales, ni nada que no pueda limitarse bajo la ley que te aplica. Los consumidores en Colombia conservan todos los derechos que otorga la Ley 1480 de 2011 (Estatuto del Consumidor).'),
      ],
    },
    {
      id: 'privacy',
      heading: '9. Privacidad',
      blocks: [
        p('Cómo manejamos tus datos está descrito en la Política de privacidad, que forma parte de estos términos. En resumen: recogemos solo lo que la acción necesita, no los vendemos y puedes pedir una copia o su borrado en cualquier momento.'),
      ],
    },
    {
      id: 'law',
      heading: '10. Ley aplicable y disputas',
      blocks: [
        p('Si contratas con Ekinoxis LLC, estos términos se rigen por las leyes del Estado de Wyoming, Estados Unidos, y las disputas van a los tribunales estatales o federales del condado de Natrona, Wyoming. Si contratas con nuestra operación colombiana, aplica la ley colombiana y las disputas van a los jueces de Cali, Colombia. La propuesta indica cuál aplica a tu proyecto.'),
        p('Antes de cualquier tribunal, ambos acordamos intentar resolver el asunto por conversación directa durante 30 días, y luego por mediación si cualquiera de las partes lo pide.'),
      ],
    },
    {
      id: 'changes',
      heading: '11. Cambios en estos términos',
      blocks: [
        p('Podemos actualizar estos términos. La fecha de arriba muestra la versión vigente. Los cambios aplican a reservas, compras y propuestas nuevas desde esa fecha; una propuesta firmada conserva los términos vigentes al firmarla.'),
      ],
    },
    {
      id: 'contact',
      heading: '12. Contacto',
      blocks: [
        p(`Preguntas sobre estos términos: ${LEGAL_EMAIL}. Ekinoxis LLC, 159 N Wolcott St, Suite 133, Casper, WY 82601, Estados Unidos. Zonamerica, Calle 36 #128-321, Cali, Valle del Cauca, Colombia.`),
      ],
    },
  ],
};

/* ── Data deletion instructions ──────────────────────────────────────────── */

const deletionEn: LegalDocument = {
  slug: 'data-deletion',
  label: 'Data deletion',
  title: 'Delete your data',
  summary:
    'How to ask us to delete everything we hold about you, what happens next, and what we must keep. One email is enough. No account, no form, no charge.',
  updated: LEGAL_UPDATED,
  sections: [
    {
      id: 'how',
      heading: '1. How to request deletion',
      blocks: [
        p(`Send an email to ${PRIVACY_EMAIL} with the subject "Delete my data". Write it from the email address you used with us (the one in your booking or course purchase). If you no longer have access to it, tell us which address it was and we will ask you one question to confirm it is you.`),
        p('You do not need to give a reason. If you prefer, you can also write to the postal address in section 5, or reply to any email we have sent you.'),
        p('If you reached us through a social sign-in or a third-party app (for example a Google or Facebook login on one of our products), the same email works: tell us which product and which account.'),
      ],
    },
    {
      id: 'what',
      heading: '2. What gets deleted',
      blocks: [
        list([
          'Your booking requests: name, email, WhatsApp number, company, answers to the qualifying questions, message, booked time, and the link to your masked session replay.',
          'Our notes about you in the admin area.',
          'Your emails to us and our replies.',
          'Your analytics identity in PostHog, including session replays, so that past events can no longer be tied to you.',
          'Your contact details in any third-party service we used to reach you (email provider, Telegram alert history where it can be edited).',
        ]),
        p('Our providers (Supabase, Resend, PostHog, Stripe, Vercel) delete or anonymize their copies on their own schedules, normally within 30 days of our request, and backups roll off within 90 days.'),
      ],
    },
    {
      id: 'kept',
      heading: '3. What we must keep',
      blocks: [
        p('The law requires us to keep a few records even after a deletion request. We keep only the minimum, and we tell you exactly what it is:'),
        list([
          'Course payment records (name, email, billing address, amount, date) for 10 years, under tax and accounting law in Colombia and the United States. They are locked away and used for nothing else.',
          'A short log of your deletion request itself (date, email, what was deleted), so we can prove we did it.',
          'Anything we need to defend a legal claim that is already open.',
        ]),
      ],
    },
    {
      id: 'timeline',
      heading: '4. What happens next',
      blocks: [
        list([
          'Within 2 business days: we confirm by email that we received your request.',
          'Within 15 business days: the data is deleted and we send you a confirmation listing what was removed and what, if anything, had to be kept and why. In Colombia this follows the terms of Law 1581 of 2012; in the United States, the state law that applies to you.',
          'If something cannot be deleted immediately (a payment record, a backup), the confirmation says when it will be.',
        ]),
        p('Deleting your data ends any pending booking and removes you from any follow-up. It does not affect a course you have already paid for; tell us if you also want to cancel it, and the refund rules in the Terms of Service apply.'),
      ],
    },
    {
      id: 'contact',
      heading: '5. Contact',
      blocks: [
        p(`Deletion requests: ${PRIVACY_EMAIL}. Other questions: ${LEGAL_EMAIL}.`),
        p('Ekinoxis LLC, 159 N Wolcott St, Suite 133, Casper, WY 82601, United States. Zonamerica, Calle 36 #128-321, Cali, Valle del Cauca, Colombia.'),
      ],
    },
  ],
};

const deletionEs: LegalDocument = {
  slug: 'data-deletion',
  label: 'Eliminación de datos',
  title: 'Elimina tus datos',
  summary:
    'Cómo pedirnos que borremos todo lo que tenemos sobre ti, qué pasa después y qué debemos conservar. Basta un correo. Sin cuenta, sin formulario, sin costo.',
  updated: LEGAL_UPDATED,
  sections: [
    {
      id: 'how',
      heading: '1. Cómo pedir la eliminación',
      blocks: [
        p(`Envía un correo a ${PRIVACY_EMAIL} con el asunto "Eliminar mis datos". Escríbelo desde el correo que usaste con nosotros (el de tu reserva o tu compra de curso). Si ya no tienes acceso a él, dinos cuál era y te haremos una pregunta para confirmar que eres tú.`),
        p('No necesitas dar un motivo. Si prefieres, también puedes escribir a la dirección postal de la sección 5, o responder cualquier correo que te hayamos enviado.'),
        p('Si llegaste a nosotros por un inicio de sesión social o una app de terceros (por ejemplo, un login con Google o Facebook en uno de nuestros productos), el mismo correo sirve: dinos qué producto y qué cuenta.'),
      ],
    },
    {
      id: 'what',
      heading: '2. Qué se elimina',
      blocks: [
        list([
          'Tus solicitudes de llamada: nombre, correo, WhatsApp, empresa, respuestas a las preguntas de calificación, mensaje, hora agendada y el enlace a tu grabación de sesión enmascarada.',
          'Nuestras notas sobre ti en el área de administración.',
          'Tus correos hacia nosotros y nuestras respuestas.',
          'Tu identidad de analítica en PostHog, incluidas las grabaciones de sesión, para que los eventos pasados ya no puedan vincularse contigo.',
          'Tus datos de contacto en cualquier servicio de terceros que usamos para contactarte (proveedor de correo, historial de alertas de Telegram cuando sea editable).',
        ]),
        p('Nuestros proveedores (Supabase, Resend, PostHog, Stripe, Vercel) borran o anonimizan sus copias según sus propios plazos, normalmente en 30 días desde nuestra solicitud, y las copias de seguridad desaparecen en 90 días.'),
      ],
    },
    {
      id: 'kept',
      heading: '3. Qué debemos conservar',
      blocks: [
        p('La ley nos obliga a conservar algunos registros incluso después de una solicitud de eliminación. Conservamos solo el mínimo y te decimos exactamente cuál es:'),
        list([
          'Registros de pago de cursos (nombre, correo, dirección de facturación, monto, fecha) por 10 años, según la normativa tributaria y contable de Colombia y Estados Unidos. Quedan bajo llave y no se usan para nada más.',
          'Un registro breve de tu propia solicitud de eliminación (fecha, correo, qué se borró), para poder demostrar que lo hicimos.',
          'Lo que necesitemos para defender un reclamo legal ya abierto.',
        ]),
      ],
    },
    {
      id: 'timeline',
      heading: '4. Qué pasa después',
      blocks: [
        list([
          'En máximo 2 días hábiles: confirmamos por correo que recibimos tu solicitud.',
          'En máximo 15 días hábiles: los datos quedan borrados y te enviamos una confirmación con lo que se eliminó y lo que, si acaso, tuvo que conservarse y por qué. En Colombia esto sigue los plazos de la Ley 1581 de 2012; en Estados Unidos, la ley estatal que te aplique.',
          'Si algo no puede borrarse de inmediato (un registro de pago, una copia de seguridad), la confirmación dice cuándo se hará.',
        ]),
        p('Eliminar tus datos cancela cualquier reserva pendiente y te retira de cualquier seguimiento. No afecta un curso que ya pagaste; dinos si también quieres cancelarlo y aplican las reglas de reembolso de los Términos del servicio.'),
      ],
    },
    {
      id: 'contact',
      heading: '5. Contacto',
      blocks: [
        p(`Solicitudes de eliminación: ${PRIVACY_EMAIL}. Otras preguntas: ${LEGAL_EMAIL}.`),
        p('Ekinoxis LLC, 159 N Wolcott St, Suite 133, Casper, WY 82601, Estados Unidos. Zonamerica, Calle 36 #128-321, Cali, Valle del Cauca, Colombia.'),
      ],
    },
  ],
};

export const legal: Record<Language, { privacy: LegalDocument; terms: LegalDocument; 'data-deletion': LegalDocument }> = {
  en: { privacy: privacyEn, terms: termsEn, 'data-deletion': deletionEn },
  es: { privacy: privacyEs, terms: termsEs, 'data-deletion': deletionEs },
};

/** The footer order. */
export const LEGAL_SLUGS = ['privacy', 'terms', 'data-deletion'] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];
