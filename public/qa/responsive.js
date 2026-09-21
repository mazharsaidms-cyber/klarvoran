const routes = ["/", "/avgs", "/leistungen", "/leistungen/einzelcoaching", "/leistungen/workshops", "/fachkraefte-kooperationspartner", "/fuer-jobcenter", "/fuer-bildungstraeger", "/fuer-soziale-einrichtungen", "/fuer-kommunen", "/ueber-uns", "/faq", "/kontakt", "/termin", "/impressum", "/datenschutz"];
const widths = [1440,1280,1024,768,430,390,360];
const select = document.querySelector("#route");
for (const route of routes) { const option=document.createElement("option"); option.value=route; option.textContent=route; select.append(option); }
for (const width of widths) { const section=document.createElement("section"); const heading=document.createElement("h2"); heading.textContent=width+" px"; const frame=document.createElement("iframe"); frame.id="qa-"+width; frame.title="KlarVoran "+width+" Pixel"; frame.style.width=width+"px"; frame.width=width; frame.src="/"; section.append(heading,frame); document.querySelector("#frames").append(section); }
const frames=Array.from(document.querySelectorAll("iframe"));
select.addEventListener("change",()=>{document.querySelector("#result").textContent="Seiten laden …";for(const frame of frames)frame.src=select.value;});
document.querySelector("#top").addEventListener("click",()=>frames.forEach(f=>f.contentWindow.scrollTo({top:0,behavior:"instant"})));
document.querySelector("#next").addEventListener("click",()=>frames.forEach(f=>f.contentWindow.scrollBy({top:700,behavior:"instant"})));
document.querySelector("#end").addEventListener("click",()=>frames.forEach(f=>f.contentWindow.scrollTo({top:f.contentDocument.documentElement.scrollHeight,behavior:"instant"})));
document.querySelector("#report").addEventListener("click",()=>{
 const results=frames.map(frame=>{const doc=frame.contentDocument;const win=frame.contentWindow;const width=doc.documentElement.clientWidth;
 const visible=el=>{const s=win.getComputedStyle(el);return !!el.getClientRects().length&&s.display!=="none"&&s.visibility!=="hidden";};
 const overflow=Array.from(doc.querySelectorAll("main *,header *,footer *")).filter(visible).map(el=>({el,r:el.getBoundingClientRect()})).filter(({el,r})=>(r.right>width+1||r.left< -1)&&!el.closest("[data-qa-ignore]")).slice(0,12).map(({el,r})=>({tag:el.tagName,text:el.textContent.trim().slice(0,80),left:r.left,right:r.right}));
 const nav=Array.from(doc.querySelectorAll("header a,header button")).filter(visible).map(el=>({text:el.textContent.trim()||el.getAttribute("aria-label"),href:el.getAttribute("href"),height:el.getBoundingClientRect().height,current:el.getAttribute("aria-current")}));
 const headings=Array.from(doc.querySelectorAll("h1,h2,h3")).filter(el=>visible(el)&&!el.classList.contains("sr-only")).map(el=>({text:el.textContent.trim(),width:el.clientWidth,scroll:el.scrollWidth})).filter(el=>el.scroll>el.width+1);
 const images=Array.from(doc.querySelectorAll("img")).filter(el=>{const r=el.getBoundingClientRect();return r.bottom>0&&r.top<win.innerHeight}).map(el=>({alt:el.alt,loaded:el.complete&&el.naturalWidth>0}));
 return {width:win.innerWidth,expected:Number(frame.width),path:win.location.pathname,title:doc.title,scrollWidth:doc.documentElement.scrollWidth,overflow,nav,headings,images,hiddenInView:Array.from(doc.querySelectorAll('[data-reveal-state="pending"]')).filter(el=>{const r=el.getBoundingClientRect();return r.top<win.innerHeight-24&&r.bottom>0}).length};});
 document.querySelector("#result").textContent=JSON.stringify(results,null,2);
});

document.querySelector("#width").addEventListener("change",event=>{for(const frame of frames)frame.parentElement.style.order=frame.width===event.target.value?"-1":"0";window.scrollTo({top:0,behavior:"instant"});});
