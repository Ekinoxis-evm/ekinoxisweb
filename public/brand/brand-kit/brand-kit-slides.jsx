/* global React, ReactDOM */
const { EKX, ekxHead, ekxMono, EkxMark, EkxWordmark, EkxLockup, EkxStacked } = window.EkxBrand;

// ──────────────────────────────────────────────────────────
// 01 COVER
// ──────────────────────────────────────────────────────────
function Cover(){
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:60}}>
      <EkxStacked scale={2.2}/>
      <div style={{...ekxHead(28,EKX.ink,300),letterSpacing:'.4em',color:EKX.mute}}>BRAND  SYSTEM</div>
      <div style={{display:'flex',gap:14,marginTop:12}}>
        <span className="mono-tag">SYS_ACTIVE: 2024</span>
        <span className="mono-tag gray">SPEC_REV_01</span>
        <span className="mono-tag lime">STATUS · APPROVED</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// 02 THE MARK — construction breakdown
// ──────────────────────────────────────────────────────────
function MarkSlide(){
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:1,background:'rgba(143,245,255,.10)',border:'1px solid rgba(143,245,255,.10)'}}>
      {/* Anatomy */}
      <div style={{background:'#000',padding:48,minHeight:580,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>01 / ANATOMY</div>
        <div style={{display:'flex',justifyContent:'center',position:'relative'}}>
          <svg width="320" height="320" viewBox="0 0 320 320" style={{overflow:'visible'}}>
            <circle cx="160" cy="160" r="150" fill="none" stroke="#3f4951" strokeWidth="1"/>
            <path d="M 160 10 A 150 150 0 0 1 160 310 Z" fill="#8ff5ff"/>
            <line x1="160" y1="0" x2="160" y2="320" stroke="#000" strokeWidth="3"/>
            <line x1="0" y1="160" x2="320" y2="160" stroke="rgba(143,245,255,.3)" strokeWidth="1" strokeDasharray="4 4"/>
            <text x="170" y="174" fill="rgba(143,245,255,.7)" fontFamily="Space Mono" fontSize="12" letterSpacing="2">EQUATOR</text>
            <text x="180" y="60" fill="rgba(143,245,255,.7)" fontFamily="Space Mono" fontSize="11" letterSpacing="2">AXIS · 0°</text>
            <text x="-12" y="-12" fill="rgba(108,119,127,.7)" fontFamily="Space Mono" fontSize="11" letterSpacing="2">⌐ 1X</text>
          </svg>
        </div>
        <div className="k">CONSTRUCTED FROM A <b>1×1</b> SQUARE.<br/>HALF-DISC FILLS THE EAST HEMISPHERE.<br/>AXIS LINE = <b>2PX MIN</b> KNOCKOUT.</div>
      </div>
      {/* Scale stress */}
      <div style={{background:'#000',padding:48,minHeight:580,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>02 / SCALE</div>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'center',gap:24}}>
          {[64,96,140,200,260].map(s=>(
            <div key={s} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
              <EkxMark size={s} glow={false}/>
              <div className="k">{s}PX</div>
            </div>
          ))}
        </div>
        <div className="k">RESOLVES CLEANLY DOWN TO <b>16PX</b>.<br/>BELOW 16PX, USE THE MARK ALONE — NO AXIS LINE.</div>
      </div>
      {/* Why */}
      <div style={{background:'#000',padding:48,minHeight:580,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>03 / RATIONALE</div>
        <div>
          <div style={{...ekxHead(34,EKX.ink),lineHeight:.95}}>EQUAL<br/><span style={{color:EKX.cyan,fontStyle:'italic',textShadow:'0 0 14px rgba(143,245,255,.5)'}}>DAY</span><br/>EQUAL<br/>NIGHT.</div>
          <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:14,color:EKX.mute,lineHeight:1.6,marginTop:22,maxWidth:340}}>
            The equinox marks the moment of perfect balance between two opposing forces. For Ekinoxis, that's open systems and cryptographic privacy. Public ledger and private key. Frontier and discipline.
          </p>
        </div>
        <div className="k"><b>EKINOXIS</b> · ÉKĒNOX-ĒS · <b>EQUINOX</b> ROOT</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// 03 MASTER LOCKUP
// ──────────────────────────────────────────────────────────
function MasterLockupSlide(){
  return (
    <div style={{display:'grid',gridTemplateRows:'1fr auto',gap:1,background:'rgba(143,245,255,.10)',border:'1px solid rgba(143,245,255,.10)'}}>
      <div style={{background:'#000',padding:'80px 48px',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <EkxLockup scale={2.4}/>
      </div>
      <div style={{background:'#060f16',padding:32,display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:32}}>
        <div><div className="k" style={{color:EKX.cyan,marginBottom:8}}>01 / SYMBOL</div><div className="k"><b>Equinox half-disc.</b> Cyan east, black west. Knockout axis.</div></div>
        <div><div className="k" style={{color:EKX.cyan,marginBottom:8}}>02 / BRACKETS</div><div className="k"><b>Light-weight (300)</b> brackets at 1.25× cap-height. Cyan only.</div></div>
        <div><div className="k" style={{color:EKX.cyan,marginBottom:8}}>03 / WORDMARK</div><div className="k"><b>Space Grotesk 700.</b> Tracking −0.04em. Always uppercase.</div></div>
        <div><div className="k" style={{color:EKX.cyan,marginBottom:8}}>04 / SLUG</div><div className="k"><b>// _LAB</b> in Space Mono. Optional. Used inside the bracket.</div></div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// 04 LOCKUP VARIATIONS
// ──────────────────────────────────────────────────────────
function Variations(){
  const cell = {background:'#000',padding:36,display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:330};
  return (
    <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gridTemplateRows:'1fr 1fr',gap:1,background:'rgba(143,245,255,.10)',border:'1px solid rgba(143,245,255,.10)'}}>
      <div style={cell}>
        <div className="k" style={{color:EKX.cyan}}>A · HORIZONTAL · PRIMARY</div>
        <div style={{display:'flex',justifyContent:'center'}}><EkxLockup scale={1.5}/></div>
        <div className="k">Default lockup. Use everywhere you have horizontal room — navs, signatures, signage.</div>
      </div>
      <div style={cell}>
        <div className="k" style={{color:EKX.cyan}}>B · STACKED</div>
        <div style={{display:'flex',justifyContent:'center'}}><EkxStacked scale={.9}/></div>
        <div className="k">Square slots — profiles, posters, business cards.</div>
      </div>
      <div style={cell}>
        <div className="k" style={{color:EKX.cyan}}>C · WORDMARK-ONLY</div>
        <div style={{display:'flex',justifyContent:'center'}}><EkxWordmark size={70}/></div>
        <div className="k">Tight column inline contexts — newsletter signatures, headers, inline mentions in body copy.</div>
      </div>
      <div style={cell}>
        <div className="k" style={{color:EKX.cyan}}>D · MARK-ONLY</div>
        <div style={{display:'flex',justifyContent:'center'}}><EkxMark size={160}/></div>
        <div className="k">Favicons, app icons, watermarks. Used when brand recognition is already established.</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// 05 CLEAR SPACE + SCALE
// ──────────────────────────────────────────────────────────
function ClearSpace(){
  return (
    <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:1,background:'rgba(143,245,255,.10)',border:'1px solid rgba(143,245,255,.10)'}}>
      <div style={{background:'#000',padding:48,display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:580}}>
        <div className="k" style={{color:EKX.cyan}}>01 / CLEAR SPACE = 1X</div>
        <div style={{display:'flex',justifyContent:'center',padding:'40px 0'}}>
          <div style={{position:'relative',padding:140,outline:'1px dashed rgba(143,245,255,.3)'}}>
            <EkxLockup scale={1.4}/>
            <span style={{position:'absolute',top:60,left:'50%',transform:'translateX(-50%)',...ekxMono(11,EKX.cyan)}}>1X</span>
            <span style={{position:'absolute',bottom:60,left:'50%',transform:'translateX(-50%)',...ekxMono(11,EKX.cyan)}}>1X</span>
            <span style={{position:'absolute',left:60,top:'50%',transform:'translateY(-50%)',...ekxMono(11,EKX.cyan)}}>1X</span>
            <span style={{position:'absolute',right:60,top:'50%',transform:'translateY(-50%)',...ekxMono(11,EKX.cyan)}}>1X</span>
          </div>
        </div>
        <div className="k">X = DIAMETER OF THE DISC. NEVER PLACE TYPE OR ELEMENTS INSIDE THIS ZONE.</div>
      </div>
      <div style={{background:'#000',padding:48,display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:580}}>
        <div className="k" style={{color:EKX.cyan}}>02 / MINIMUM SIZE</div>
        <div style={{display:'flex',flexDirection:'column',gap:36,alignItems:'flex-start'}}>
          <div style={{display:'flex',alignItems:'center',gap:18}}>
            <div style={{transform:'scale(.25)',transformOrigin:'left center'}}><EkxLockup scale={1}/></div>
            <div className="k"><b style={{color:EKX.ink}}>24PX TALL</b> · DIGITAL MIN</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:18}}>
            <div style={{transform:'scale(.5)',transformOrigin:'left center'}}><EkxLockup scale={1}/></div>
            <div className="k"><b style={{color:EKX.ink}}>48PX TALL</b> · NAV / SIGNATURE</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:18}}>
            <div style={{transform:'scale(1)',transformOrigin:'left center'}}><EkxLockup scale={1}/></div>
            <div className="k"><b style={{color:EKX.ink}}>96PX TALL</b> · DEFAULT</div>
          </div>
        </div>
        <div className="k">PRINT MIN = <b style={{color:EKX.ink}}>10 MM</b> MARK HEIGHT.</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// 06 COLOR VERSIONS
// ──────────────────────────────────────────────────────────
function ColorVersions(){
  const cells = [
    {bg:'#000',tone:'cyan-on-dark',label:'PRIMARY · CYAN ON BLACK',sub:'Default — every digital surface',rec:'USE FIRST'},
    {bg:EKX.ink,tone:'mono-black',label:'INVERSE · BLACK ON WHITE',sub:'Print on photography, paper, product',rec:'PRINT'},
    {bg:'#8ff5ff',tone:'mono-black',label:'KNOCKOUT · BLACK ON CYAN',sub:'Cyan-dominant compositions, stickers',rec:'ACCENT'},
    {bg:EKX.ink,tone:'cyan-on-light',label:'LIGHT · CYAN + BLACK TYPE',sub:'Clear / light backgrounds, docs, web',rec:'LIGHT'},
    {bg:'#000',tone:'mono-white',label:'WHITE-ONLY · MONOCHROME',sub:'Black-and-white print only',rec:'FALLBACK'},
  ];
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr',gap:1,background:'rgba(143,245,255,.10)',border:'1px solid rgba(143,245,255,.10)'}}>
      {cells.map((c,i)=>(
        <div key={i} style={{background:c.bg,padding:32,display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:580}}>
          <div className="k" style={{color:c.bg==='#000'?EKX.cyan:'rgba(0,0,0,.6)'}}>{`0${i+1} / ${c.rec}`}</div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:18}}><EkxStacked scale={.68} tone={c.tone}/></div>
          <div>
            <div className="k" style={{color:c.bg==='#000'?EKX.ink:'#000',marginBottom:6}}>{c.label}</div>
            <div className="k" style={{color:c.bg==='#000'?EKX.mute:'rgba(0,0,0,.55)'}}>{c.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// 07 DON'TS
// ──────────────────────────────────────────────────────────
function Donts(){
  const X = ()=>(<svg width="28" height="28" viewBox="0 0 28 28" style={{position:'absolute',top:12,right:12}}><line x1="6" y1="6" x2="22" y2="22" stroke="#ff716c" strokeWidth="2.5"/><line x1="22" y1="6" x2="6" y2="22" stroke="#ff716c" strokeWidth="2.5"/></svg>);
  const cell = (label, sub, child) => (
    <div style={{background:'#000',padding:28,display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:300,position:'relative'}}>
      <X/>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',flex:1}}>{child}</div>
      <div>
        <div className="k" style={{color:'#ff716c',marginBottom:4}}>{label}</div>
        <div className="k">{sub}</div>
      </div>
    </div>
  );
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gridTemplateRows:'1fr 1fr',gap:1,background:'rgba(143,245,255,.10)',border:'1px solid rgba(143,245,255,.10)'}}>
      {cell("DON'T STRETCH","Maintain proportion 1:1.",<div style={{transform:'scaleX(1.6)'}}><EkxLockup scale={.9}/></div>)}
      {cell("DON'T ROTATE","The axis is vertical. Always.",<div style={{transform:'rotate(-12deg)'}}><EkxLockup scale={.9}/></div>)}
      {cell("DON'T RECOLOR","Cyan is the only fill.",<EkxLockup scale={.9} tone={undefined}/>)}
      {cell("DON'T DROP BRACKETS","Brackets are not optional.",<div style={{display:'inline-flex',alignItems:'center',gap:20}}><EkxMark size={80}/><span style={{...ekxHead(40)}}>EKINOXIS</span></div>)}
      {cell("DON'T REORDER","Mark is always left of type.",<div style={{display:'inline-flex',alignItems:'center',gap:20}}><EkxWordmark size={36}/><EkxMark size={80}/></div>)}
      {cell("DON'T ADD EFFECTS","No drop shadows, no bevel, no glow stacking.",<div style={{filter:'blur(2px) drop-shadow(4px 6px 0 #9492ff)'}}><EkxLockup scale={.9}/></div>)}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// 08 COLOR SYSTEM
// ──────────────────────────────────────────────────────────
function ColorSystem(){
  const sw = (bg, name, hex, role, fg='#000') => (
    <div style={{background:bg,padding:20,minHeight:220,display:'flex',flexDirection:'column',justifyContent:'space-between',color:fg}}>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:'.22em',textTransform:'uppercase',opacity:.7}}>{role}</div>
      <div>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:22,letterSpacing:'-.02em'}}>{name}</div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,letterSpacing:'.15em',marginTop:6,opacity:.8}}>{hex}</div>
      </div>
    </div>
  );
  return (
    <div style={{display:'flex',flexDirection:'column',gap:36}}>
      <div>
        <div className="k" style={{color:EKX.cyan,marginBottom:10}}>PRIMARY · ACCENT</div>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:1,background:'rgba(143,245,255,.10)',border:'1px solid rgba(143,245,255,.10)'}}>
          {sw('#8ff5ff','Electric Cyan','#8FF5FF','PRIMARY · ACTION')}
          {sw('#9492ff','Cosmic Blue','#9492FF','SECONDARY')}
          {sw('#beee00','Neon Lime','#BEEE00','TERTIARY · STATUS')}
          {sw('#ff716c','Signal Coral','#FF716C','ERROR · CAUTION')}
        </div>
      </div>
      <div>
        <div className="k" style={{color:EKX.cyan,marginBottom:10}}>SURFACE STACK · 6-STOP DARK SCALE</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr 1fr',gap:1,background:'rgba(143,245,255,.10)',border:'1px solid rgba(143,245,255,.10)'}}>
          {sw('#000','Void','#000000','LOWEST',EKX.ink)}
          {sw('#060f16','Surface','#060F16','SURFACE',EKX.ink)}
          {sw('#09151c','Card','#09151C','CONTAINER-LOW',EKX.ink)}
          {sw('#0f1b23','Hover','#0F1B23','CONTAINER',EKX.ink)}
          {sw('#14212a','Raised','#14212A','CONTAINER-HIGH',EKX.ink)}
          {sw('#192731','Apex','#192731','HIGHEST',EKX.ink)}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// 09 TYPOGRAPHY
// ──────────────────────────────────────────────────────────
function TypeSlide(){
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:1,background:'rgba(143,245,255,.10)',border:'1px solid rgba(143,245,255,.10)'}}>
      <div style={{background:'#000',padding:36,minHeight:560,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>HEADLINE · SPACE GROTESK</div>
        <div>
          <div style={{...ekxHead(96,EKX.ink),lineHeight:.9}}>Aa</div>
          <div style={{...ekxHead(36,EKX.ink),lineHeight:.95,marginTop:18}}>INNOVATION<br/><span style={{color:EKX.cyan,fontStyle:'italic'}}>WITHOUT</span><br/>FRONTIERS</div>
        </div>
        <div className="k">WEIGHTS 300 / 500 / <b>700</b> · TRACKING <b>−0.04EM</b> · LEADING <b>0.9</b></div>
      </div>
      <div style={{background:'#000',padding:36,minHeight:560,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>BODY · INTER</div>
        <div>
          <div style={{fontFamily:"'Inter'",fontWeight:300,fontSize:88,color:EKX.ink,lineHeight:.9}}>Aa</div>
          <p style={{fontFamily:"'Inter'",fontWeight:300,fontSize:16,color:EKX.mute,lineHeight:1.6,marginTop:18}}>We build at the frontier. Open by default. Sovereign by design. Cypherpunk by inheritance.</p>
        </div>
        <div className="k">WEIGHTS <b>300</b> / 400 · LEADING <b>1.55</b> · LIGHT IS THE DEFAULT</div>
      </div>
      <div style={{background:'#000',padding:36,minHeight:560,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>METADATA · SPACE MONO</div>
        <div>
          <div style={{fontFamily:"'Space Mono'",fontWeight:700,fontSize:88,color:EKX.ink,lineHeight:.9}}>Aa</div>
          <div style={{marginTop:18,display:'flex',flexDirection:'column',gap:8}}>
            <div style={{...ekxMono(10,EKX.cyan)}}>SYS_ACTIVE: 2024</div>
            <div style={{...ekxMono(10,EKX.cyan)}}>LAT 3.45°N // LON −76.53°W</div>
            <div style={{...ekxMono(10,EKX.mute)}}>EKX_ROOT / PRODUCT_REGISTRY</div>
          </div>
        </div>
        <div className="k">10PX · <b>TRACKING-WIDEST 0.22EM</b> · UPPERCASE · THE SIGNATURE</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// 10 VOICE
// ──────────────────────────────────────────────────────────
function Voice(){
  return (
    <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:1,background:'rgba(143,245,255,.10)',border:'1px solid rgba(143,245,255,.10)'}}>
      <div style={{background:'#000',padding:48,minHeight:580,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>SAMPLE COPY · LIVE SITE</div>
        <div>
          <div style={{...ekxHead(52,EKX.ink),lineHeight:.95}}>Build in public.<br/>Open by default.<br/><span style={{color:EKX.cyan,fontStyle:'italic',textShadow:'0 0 14px rgba(143,245,255,.5)'}}>Innovation by default.</span></div>
          <p style={{fontFamily:"'Inter'",fontWeight:300,fontSize:18,color:EKX.mute,lineHeight:1.6,marginTop:28,maxWidth:680}}>
            We are the first Innovation Laboratory from the Colombian Pacific specialized in Blockchain, Cryptography and Artificial Intelligence. We design, develop and ship prototypes, MVPs and proofs of concept.
          </p>
          <div style={{...ekxMono(12,EKX.cyan),marginTop:24}}>OPERATOR_COUNT: 11 · STATUS: ACTIVE_RECRUITING</div>
        </div>
        <div className="k">SHORT · DECLARATIVE · EDGE-LOADED. WE, NOT YOU.</div>
      </div>
      <div style={{background:'#000',padding:36,minHeight:580,display:'flex',flexDirection:'column',gap:28}}>
        <div className="k" style={{color:EKX.cyan}}>TONAL DIRECTIVES</div>
        <div>
          <div className="k" style={{color:'#beee00',marginBottom:8}}>USE</div>
          <div style={{fontFamily:"'Inter'",fontWeight:300,fontSize:14,color:EKX.ink,lineHeight:1.7}}>frontier · sovereign · operator · node · primitive · hacker · ZK · MVP · open · cypher · LATAM · pacific</div>
        </div>
        <div>
          <div className="k" style={{color:'#ff716c',marginBottom:8}}>AVOID</div>
          <div style={{fontFamily:"'Inter'",fontWeight:300,fontSize:14,color:EKX.mute,lineHeight:1.7,textDecoration:'line-through',textDecorationColor:'rgba(255,113,108,.5)'}}>empower · seamless · solutions · journey · synergy · revolutionary · disrupt · ecosystem · leverage</div>
        </div>
        <div>
          <div className="k" style={{color:EKX.cyan,marginBottom:8}}>FORBIDDEN</div>
          <div className="k">EMOJI · EXCLAMATION POINTS · ALL-CAPS SHOUTING IN BODY · "AS A SERVICE"</div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// 11 APPLICATIONS
// ──────────────────────────────────────────────────────────
function Apps(){
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1.4fr',gridTemplateRows:'1fr 1fr',gap:1,background:'rgba(143,245,255,.10)',border:'1px solid rgba(143,245,255,.10)'}}>
      {/* Favicon */}
      <div style={{background:'#000',padding:32,minHeight:280,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>FAVICON · 32→160</div>
        <div style={{display:'flex',alignItems:'flex-end',gap:16,justifyContent:'center'}}>
          {[32,48,96,128].map(s=>(<div key={s} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}><div style={{width:s,height:s,background:'#000',display:'grid',placeItems:'center',outline:'1px solid rgba(143,245,255,.15)'}}><EkxMark size={s-6} glow={false}/></div><div className="k">{s}</div></div>))}
        </div>
        <div className="k">MARK-ONLY. AXIS HOLDS DOWN TO 16PX.</div>
      </div>
      {/* App icon */}
      <div style={{background:'#000',padding:32,minHeight:280,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>APP ICON · 1024</div>
        <div style={{display:'flex',justifyContent:'center'}}>
          <div style={{width:170,height:170,background:'#000',display:'grid',placeItems:'center',outline:'1px solid rgba(143,245,255,.2)',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 30% 30%, rgba(143,245,255,.2), transparent 60%)'}}/>
            <EkxMark size={130}/>
            <div style={{position:'absolute',bottom:6,left:8,...ekxMono(7,EKX.label)}}>EKINOXIS</div>
            <div style={{position:'absolute',top:6,right:8,...ekxMono(7,EKX.cyan)}}>01</div>
          </div>
        </div>
        <div className="k">RADIAL GLOW · UID CORNERS.</div>
      </div>
      {/* OG / Social */}
      <div style={{background:'#000',padding:32,minHeight:280,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>OG / SOCIAL · 1200×630</div>
        <div style={{display:'flex',justifyContent:'center'}}>
          <div style={{width:'90%',aspectRatio:'1200 / 630',background:'#000',position:'relative',outline:'1px solid rgba(143,245,255,.18)',display:'flex',alignItems:'center',padding:18,overflow:'hidden'}}>
            <div style={{position:'absolute',top:-40,right:-40,width:180,height:180,background:'rgba(143,245,255,.25)',filter:'blur(60px)',borderRadius:'50%'}}/>
            <div style={{flex:1,position:'relative'}}>
              <div style={{...ekxMono(7,EKX.cyan),marginBottom:6}}>EKX_ROOT</div>
              <div style={{...ekxHead(22,EKX.ink),lineHeight:.95}}>INNOVATION<br/><span style={{color:EKX.cyan,fontStyle:'italic'}}>WITHOUT</span><br/>FRONTIERS</div>
            </div>
            <div style={{position:'relative'}}><EkxMark size={80}/></div>
          </div>
        </div>
        <div className="k">EQUINOX MARK RIGHT, HEADLINE LEFT.</div>
      </div>
      {/* Business card */}
      <div style={{background:'#000',padding:32,minHeight:280,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>BUSINESS CARD · 3.5×2"</div>
        <div style={{display:'flex',justifyContent:'center'}}>
          <div style={{width:300,height:170,background:'#000',outline:'1px solid rgba(143,245,255,.18)',padding:16,display:'flex',flexDirection:'column',justifyContent:'space-between',position:'relative'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}><EkxMark size={32} glow={false}/><span style={{...ekxHead(16,EKX.ink)}}>EKINOXIS</span></div>
            <div>
              <div style={{...ekxHead(13,EKX.ink),letterSpacing:'-.02em',textTransform:'none'}}>Camila Restrepo</div>
              <div style={{...ekxMono(8,EKX.cyan),marginTop:4}}>HEAD OF RESEARCH</div>
              <div style={{...ekxMono(8,EKX.mute),marginTop:8}}>camila@ekinoxis.lab</div>
            </div>
          </div>
        </div>
        <div className="k">SOLID BLACK · UID TICKS · MONO META.</div>
      </div>
      {/* Sticker / merch */}
      <div style={{background:'#000',padding:32,minHeight:280,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>STICKER · 3" CIRCLE</div>
        <div style={{display:'flex',justifyContent:'center',gap:18}}>
          <div style={{width:130,height:130,borderRadius:'50%',background:'#000',display:'grid',placeItems:'center',outline:'1px solid rgba(143,245,255,.3)',position:'relative'}}>
            <EkxStacked scale={.45}/>
          </div>
          <div style={{width:130,height:130,borderRadius:'50%',background:EKX.cyan,display:'grid',placeItems:'center',position:'relative',boxShadow:'0 0 30px rgba(143,245,255,.35)'}}>
            <EkxStacked scale={.45} tone="mono-black"/>
          </div>
        </div>
        <div className="k">CIRCULAR DIE-CUT · TWO COLORWAYS.</div>
      </div>
      {/* Hero nav */}
      <div style={{background:'#000',padding:32,minHeight:280,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div className="k" style={{color:EKX.cyan}}>WEB NAV · GLASS</div>
        <div style={{background:'rgba(0,0,0,.8)',padding:'14px 18px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'relative',outline:'1px solid rgba(143,245,255,.08)'}}>
          <EkxLockup scale={.45}/>
          <div style={{display:'flex',gap:10}}>{['ABOUT','SERVICES','PRODUCTS'].map(l=><span key={l} style={{...ekxHead(8,EKX.mute,500)}}>{l}</span>)}</div>
          <span style={{...ekxMono(7,EKX.cyan),padding:'3px 6px',border:'1px solid rgba(143,245,255,.3)'}}>EN/ES</span>
          <div style={{position:'absolute',bottom:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(143,245,255,.4),transparent)'}}/>
        </div>
        <div className="k">FIXED · BLACK 80% · BACKDROP-BLUR-XL.</div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// MOUNT
// ──────────────────────────────────────────────────────────
const mounts = {
  'cover-host':<Cover/>, 'mark-host':<MarkSlide/>, 'lockup-host':<MasterLockupSlide/>,
  'variations-host':<Variations/>, 'clearspace-host':<ClearSpace/>, 'color-host':<ColorVersions/>,
  'donts-host':<Donts/>, 'colorsystem-host':<ColorSystem/>, 'type-host':<TypeSlide/>,
  'voice-host':<Voice/>, 'apps-host':<Apps/>,
};
Object.entries(mounts).forEach(([id,el])=>{
  const node = document.getElementById(id);
  if(node) ReactDOM.createRoot(node).render(el);
});
