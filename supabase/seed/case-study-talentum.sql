-- First case study: Talentum / Isla Cangrejo.
-- Run AFTER migrations/20261101120000_products_case_study.sql.
-- Source: _brain/projects/clients/talentum.md + the Talentum Drive folder.
-- No personal or tax identifiers, budgets or contract terms on purpose.
--
-- Proof is limited to what is public and verified. The NFT contract addresses
-- are still missing (not in any Drive document); add them in /admin/products
-- once recovered from the NiftyKit / Unlock dashboards or the deployer wallet.

update public.products
set
  slug = 'isla-cangrejo',
  case_study_en = $en$
## The challenge

Isla Cangrejo is a 214-hectare island in the Buenaventura district, on Colombia's Pacific coast. More than 80% of it is rated as high biotic sensitivity: mangroves, the blue land crab, the three-toed sloth. Corporación Talentum, an education and social-impact organisation from Cali, wanted a way to fund its protection and the community programmes around it, with every peso traceable.

## What we built

From December 2023 to August 2024 we designed and prototyped the tokenization of the island as a real-world asset (RWA):

- **Tokenomics and onchain architecture**: how money flows from supporters to conservation and community programmes, and who signs for it.
- **Collectible NFTs, one per protected species**: three-toed sloth, blue land crab and two mangroves (mangle nato and mangle piñuelo), each with its conservation status. Holding one funds that species' protection.
- **CRAB-COIN**: the project token, with a feasibility study for issuing tokenized environmental bonds.
- **Wallet onboarding** for people who had never used crypto: self-custody wallets, step-by-step video tutorials and a gasless mint flow.
- **Shared treasuries**: multisig wallets with at least four signers, so no one person controls the funds.
- **Digital identity**: an ENS domain linked to the project website.

## How we worked

We delivered in stages: a prototype, a documentation deck written for a non-technical team, then a full proposal for an MVP timed for COP16, the UN biodiversity summit held in Cali in October 2024. The ETH Cali Foundation builder team advised.

## Outcome

Talentum got a working prototype and a plan it could take to funders. For us, the idea outgrew one island: at Superhack 2024 we turned it into [Conservationix](/portfolio/experiments), a platform for any conservation campaign.
$en$,
  case_study_es = $es$
## El reto

Isla Cangrejo es una isla de 214 hectáreas en el distrito de Buenaventura, en el Pacífico colombiano. Más del 80% de su área tiene sensibilidad biótica alta: manglares, el cangrejo azul, el perezoso de tres dedos. La Corporación Talentum, una organización caleña de educación e impacto social, buscaba una forma de financiar su protección y los programas comunitarios a su alrededor, con cada peso trazable.

## Qué construimos

Entre diciembre de 2023 y agosto de 2024 diseñamos y prototipamos la tokenización de la isla como activo del mundo real (RWA):

- **Tokenómica y arquitectura onchain**: cómo fluye el dinero desde quienes apoyan hasta los programas de conservación y comunidad, y quién firma.
- **NFTs coleccionables, uno por especie protegida**: perezoso de tres dedos, cangrejo azul y dos manglares (mangle nato y mangle piñuelo), cada uno con su estado de conservación. Tener uno financia la protección de esa especie.
- **CRAB-COIN**: el token del proyecto, con un estudio de factibilidad para emitir bonos ambientales tokenizados.
- **Onboarding de billeteras** para personas que nunca habían usado cripto: billeteras de autocustodia, video tutoriales paso a paso y un minteo sin gas.
- **Tesorerías compartidas**: billeteras multifirma con al menos cuatro firmantes, para que nadie controle los fondos solo.
- **Identidad digital**: un dominio ENS conectado al sitio del proyecto.

## Cómo trabajamos

Entregamos por etapas: un prototipo, un documento de presentación escrito para un equipo no técnico y luego una propuesta completa de MVP para la COP16, la cumbre de biodiversidad de la ONU realizada en Cali en octubre de 2024. El equipo builder de la Fundación ETH Cali nos asesoró.

## Resultado

Talentum recibió un prototipo funcionando y un plan para presentar a financiadores. Para nosotros, la idea creció más allá de una isla: en Superhack 2024 la convertimos en [Conservationix](/portfolio/experiments), una plataforma para cualquier campaña de conservación.
$es$,
  proof = '[
    {"label": "Tokenomics + onchain architecture board", "url": "https://www.tldraw.com/s/v2_c_FeHlBAPBnY6EAQZeEXOpm"},
    {"label": "Corporación Talentum", "url": "https://talentum.edu.co"}
  ]'::jsonb,
  -- Keep whatever tags the row already has; only fill them if empty.
  technologies = case when coalesce(array_length(technologies, 1), 0) = 0
    then array['Optimism', 'NiftyKit', 'Unlock Protocol', 'Coinbase Wallet', 'Safe', 'ENS', 'IPFS']
    else technologies end
-- Resolved by name + type so the file carries no ids. Must match exactly one row:
-- check with  select id, name from products where project_type = 'client' and name ilike '%talentum%';
where project_type = 'client'
  and name ilike '%talentum%';
