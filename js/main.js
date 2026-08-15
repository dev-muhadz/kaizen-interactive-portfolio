/* KAIZEN — lightweight dependency-free interactions */
document.addEventListener("DOMContentLoaded",()=>{
  theme(); nav(); sticky(); filters(); projectModal(); testimonials(); contact();
});

/* Dark/light mode with persistent preference. */
function theme(){
 const root=document.documentElement, btn=document.querySelector("#themeToggle");
 const saved=localStorage.getItem("kaizen-theme");
 if(saved) root.dataset.theme=saved;
 const icon=()=>btn.textContent=root.dataset.theme==="light"?"☾":"☼";
 icon();
 btn.onclick=()=>{root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";localStorage.setItem("kaizen-theme",root.dataset.theme);icon()};
}
/* Mobile navigation. */
function nav(){
 const btn=document.querySelector("#menuToggle"), nav=document.querySelector("#mainNav");
 btn.onclick=()=>{const open=nav.classList.toggle("open");btn.classList.toggle("open",open);btn.setAttribute("aria-expanded",open)};
 nav.querySelectorAll("a").forEach(a=>a.onclick=()=>{nav.classList.remove("open");btn.classList.remove("open");btn.setAttribute("aria-expanded","false")});
}
/* Sticky header state. */
function sticky(){const h=document.querySelector("#siteHeader");addEventListener("scroll",()=>h.classList.toggle("scrolled",scrollY>30),{passive:true})}
/* Filter projects without a page reload. */
function filters(){
 const buttons=[...document.querySelectorAll("#filters button")], cards=[...document.querySelectorAll(".project")];
 buttons.forEach(btn=>btn.onclick=()=>{
   buttons.forEach(b=>b.classList.toggle("active",b===btn));
   const f=btn.dataset.filter;
   cards.forEach(c=>{const show=f==="all"||c.dataset.category===f;c.classList.toggle("hidden",!show);if(show)c.animate([{opacity:0,transform:"translateY(8px)"},{opacity:1,transform:"none"}],{duration:260,easing:"ease-out"})});
 });
}
/* Project detail lightbox populated from data attributes. */
function projectModal(){
 const modal=document.querySelector("#projectModal"), close=document.querySelector("#modalClose"), title=document.querySelector("#modalTitle"),type=document.querySelector("#modalType"),desc=document.querySelector("#modalDescription"),art=document.querySelector("#modalArt");
 document.querySelectorAll(".project").forEach(card=>card.onclick=()=>{
   title.textContent=card.dataset.title;type.textContent=card.dataset.type;desc.textContent=card.dataset.description;art.className="modal-art image-"+card.dataset.image;modal.setAttribute("aria-hidden","false");close.focus();
 });
 const shut=()=>modal.setAttribute("aria-hidden","true");
 close.onclick=shut;modal.querySelector("[data-close]").onclick=shut;document.addEventListener("keydown",e=>{if(e.key==="Escape")shut()});
}
/* Simple testimonial carousel. */
function testimonials(){
 const items=[...document.querySelectorAll(".testimonial")];let i=0;
 const show=n=>{i=(n+items.length)%items.length;items.forEach((x,j)=>x.classList.toggle("active",j===i))};
 document.querySelector("#next").onclick=()=>show(i+1);document.querySelector("#prev").onclick=()=>show(i-1);
}
/* Native form validation followed by a styled confirmation modal. */
function contact(){
 const form=document.querySelector("#contactForm"), modal=document.querySelector("#contactModal");
 const shut=()=>modal.setAttribute("aria-hidden","true");
 form.onsubmit=e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return}modal.setAttribute("aria-hidden","false");form.reset()};
 document.querySelector("#contactClose").onclick=shut;document.querySelector("#done").onclick=shut;modal.querySelector("[data-contact-close]").onclick=shut;
}
