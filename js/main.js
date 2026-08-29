/* KAIZEN — lightweight dependency-free interactions */
document.addEventListener("DOMContentLoaded",()=>{
  theme(); nav(); sticky(); filters(); projectModal(); testimonials(); contact();
});

/* Shared focus trap for modal-style overlays. */
function trapFocus(container){
 const selector='a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
 const get=()=>[...container.querySelectorAll(selector)].filter(el=>el.offsetParent!==null);
 return e=>{
   if(e.key!=="Tab") return;
   const items=get(); if(!items.length) return;
   const first=items[0],last=items[items.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 };
}

/* Dark/light mode with persistent preference. */
function theme(){
 const root=document.documentElement, btn=document.querySelector("#themeToggle");
 if(!btn) return;
 const saved=localStorage.getItem("kaizen-theme");
 if(saved) root.dataset.theme=saved;
 const sync=()=>{
   const light=root.dataset.theme==="light";
   btn.textContent=light?"☾":"☼";
   btn.setAttribute("aria-label",light?"Switch to dark mode":"Switch to light mode");
   btn.setAttribute("aria-pressed",String(light));
 };
 sync();
 btn.onclick=()=>{root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";localStorage.setItem("kaizen-theme",root.dataset.theme);sync()};
}

/* Mobile navigation with keyboard focus management. */
function nav(){
 const btn=document.querySelector("#menuToggle"), nav=document.querySelector("#mainNav");
 if(!btn||!nav) return;
 let lastFocused=null;
 const onTab=trapFocus(nav);
 const close=()=>{
   nav.classList.remove("open");btn.classList.remove("open");btn.setAttribute("aria-expanded","false");
   document.removeEventListener("keydown",onTab);
   if(lastFocused) lastFocused.focus();
 };
 btn.onclick=()=>{
   const open=nav.classList.toggle("open");btn.classList.toggle("open",open);btn.setAttribute("aria-expanded",String(open));
   if(open){
     lastFocused=btn;
     const first=nav.querySelector("a");
     if(first){first.focus();document.addEventListener("keydown",onTab)}
   } else {
     document.removeEventListener("keydown",onTab);
   }
 };
 nav.querySelectorAll("a").forEach(a=>a.onclick=()=>close());
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")) close()});
}

/* Sticky header state. */
function sticky(){const h=document.querySelector("#siteHeader");if(h)addEventListener("scroll",()=>h.classList.toggle("scrolled",scrollY>30),{passive:true})}

/* Filter projects without a page reload. */
function filters(){
 const buttons=[...document.querySelectorAll("#filters button")], cards=[...document.querySelectorAll(".project")];
 if(!buttons.length) return;
 buttons.forEach(btn=>{
   btn.setAttribute("aria-pressed",String(btn.classList.contains("active")));
   btn.onclick=()=>{
     buttons.forEach(b=>{const active=b===btn;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))});
     const f=btn.dataset.filter;
     cards.forEach(c=>{
       const show=f==="all"||c.dataset.category===f;c.classList.toggle("hidden",!show);
       if(show&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches)c.animate([{opacity:0,transform:"translateY(8px)"},{opacity:1,transform:"none"}],{duration:260,easing:"ease-out"});
     });
   };
 });
}

/* Project detail lightbox populated from data attributes. */
function projectModal(){
 const modal=document.querySelector("#projectModal"), close=document.querySelector("#modalClose"), title=document.querySelector("#modalTitle"),type=document.querySelector("#modalType"),desc=document.querySelector("#modalDescription"),art=document.querySelector("#modalArt");
 if(!modal||!close) return;
 modal.setAttribute("role","dialog");modal.setAttribute("aria-modal","true");modal.setAttribute("aria-labelledby","modalTitle");
 let lastFocused=null;
 const onTab=trapFocus(modal);
 const shut=()=>{modal.setAttribute("aria-hidden","true");document.removeEventListener("keydown",onTab);if(lastFocused) lastFocused.focus()};
 document.querySelectorAll(".project").forEach(card=>{
   card.setAttribute("tabindex","0");card.setAttribute("role","button");card.setAttribute("aria-haspopup","dialog");
   const open=()=>{
     lastFocused=card;title.textContent=card.dataset.title;type.textContent=card.dataset.type;desc.textContent=card.dataset.description;art.className="modal-art image-"+card.dataset.image;modal.setAttribute("aria-hidden","false");close.focus();document.addEventListener("keydown",onTab);
   };
   card.addEventListener("click",open);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}});
 });
 close.onclick=shut;modal.querySelector("[data-close]").onclick=shut;
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.getAttribute("aria-hidden")==="false")shut()});
}

/* Simple testimonial carousel with accessible control names. */
function testimonials(){
 const items=[...document.querySelectorAll(".testimonial")],next=document.querySelector("#next"),prev=document.querySelector("#prev");
 if(!items.length||!next||!prev)return;
 next.setAttribute("aria-label","Next testimonial");prev.setAttribute("aria-label","Previous testimonial");
 let i=0;
 const show=n=>{i=(n+items.length)%items.length;items.forEach((x,j)=>x.classList.toggle("active",j===i))};
 next.onclick=()=>show(i+1);prev.onclick=()=>show(i-1);
}

/* Native form validation followed by a styled confirmation modal. */
function contact(){
 const form=document.querySelector("#contactForm"), modal=document.querySelector("#contactModal");
 if(!form||!modal)return;
 const close=document.querySelector("#contactClose"),done=document.querySelector("#done");
 modal.setAttribute("role","dialog");modal.setAttribute("aria-modal","true");modal.setAttribute("aria-labelledby","contactModalTitle");
 const heading=modal.querySelector("h2");if(heading)heading.id="contactModalTitle";
 const labels=[...form.querySelectorAll("label")],fields=[...form.querySelectorAll("input,textarea")];
 labels.forEach((label,i)=>{if(fields[i]){if(!fields[i].id)fields[i].id=`contact-field-${i+1}`;label.htmlFor=fields[i].id}});
 let lastFocused=null;
 const onTab=trapFocus(modal);
 const shut=()=>{modal.setAttribute("aria-hidden","true");document.removeEventListener("keydown",onTab);if(lastFocused)lastFocused.focus()};
 form.onsubmit=e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return}lastFocused=form.querySelector('button[type="submit"]');modal.setAttribute("aria-hidden","false");form.reset();done.focus();document.addEventListener("keydown",onTab)};
 close.onclick=shut;done.onclick=shut;modal.querySelector("[data-contact-close]").onclick=shut;
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.getAttribute("aria-hidden")==="false")shut()});
}
