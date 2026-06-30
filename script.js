/* =======================================================
   EQUIVOICE GLOBAL v3.0
   SCRIPT.JS - PART 1
   Navigation • Scroll • Theme Foundation
======================================================= */

document.addEventListener("DOMContentLoaded", () => {

const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const scrollTopButton = document.getElementById("scrollTop");

/* =======================
   MOBILE MENU
======================= */

if(menuButton && navigation){

menuButton.addEventListener("click",()=>{

navigation.classList.toggle("show");

menuButton.textContent =
navigation.classList.contains("show")
? "✕"
: "☰";

});

}

/* =======================
   CLOSE MENU AFTER CLICK
======================= */

navLinks.forEach(link=>{

link.addEventListener("click",()=>{

if(window.innerWidth<=992){

navigation.classList.remove("show");

menuButton.textContent="☰";

}

});

});

/* =======================
   STICKY HEADER
======================= */

window.addEventListener("scroll",()=>{

if(window.scrollY>40){

header.classList.add("scrolled");

}else{

header.classList.remove("scrolled");

}

});

/* =======================
   SCROLL TO TOP BUTTON
======================= */

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

scrollTopButton.style.display="flex";

}else{

scrollTopButton.style.display="none";

}

});

scrollTopButton.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/* =======================
   SMOOTH SCROLL
======================= */

navLinks.forEach(link=>{

link.addEventListener("click",function(e){

const target=this.getAttribute("href");

if(target.startsWith("#")){

e.preventDefault();

const section=document.querySelector(target);

if(section){

section.scrollIntoView({

behavior:"smooth"

});

}

}

});

});

/* =======================
   ACTIVE NAVIGATION
======================= */

const sections=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

const height=section.offsetHeight;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/* =======================
   BUTTON RIPPLE EFFECT
======================= */

const buttons=document.querySelectorAll(".primary-button,.secondary-button");

buttons.forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const diameter=Math.max(this.clientWidth,this.clientHeight);

const radius=diameter/2;

circle.style.width=circle.style.height=diameter+"px";

circle.style.left=e.clientX-this.getBoundingClientRect().left-radius+"px";

circle.style.top=e.clientY-this.getBoundingClientRect().top-radius+"px";

circle.classList.add("ripple");

const existing=this.querySelector(".ripple");

if(existing){

existing.remove();

}

this.appendChild(circle);

});

});

});

/* =======================================================
   EQUIVOICE GLOBAL v3.0
   SCRIPT.JS - PART 2
   Scroll Animations • Counters • Floating Effects
======================================================= */

/* =======================
   SCROLL REVEAL
======================= */

const revealElements = document.querySelectorAll(
".card, .solution-card, .story-card, .resource-card, .impact-item, .feature, .contact-grid div"
);

const revealObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-up","show");

}

});

},{
threshold:0.15
});

revealElements.forEach(element=>{

revealObserver.observe(element);

});

/* =======================
   ANIMATED COUNTERS
======================= */

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter = entry.target;

const target = Number(counter.dataset.count);

let current = 0;

const increment = Math.max(1, Math.ceil(target/120));

const update = ()=>{

current += increment;

if(current >= target){

counter.textContent = target.toLocaleString()+"+";

}else{

counter.textContent = current.toLocaleString()+"+";

requestAnimationFrame(update);

}

};

update();

counterObserver.unobserve(counter);

});

},{
threshold:0.5
});

counters.forEach(counter=>{

counterObserver.observe(counter);

});

/* =======================
   PARALLAX HERO
======================= */

const hero = document.querySelector(".hero");

window.addEventListener("scroll",()=>{

if(hero){

hero.style.backgroundPositionY =
window.scrollY * 0.2 + "px";

}

});

/* =======================
   FLOATING GLOBE
======================= */

const globe = document.querySelector(".globe");

if(globe){

let angle = 0;

setInterval(()=>{

angle += 0.2;

globe.style.transform =
`rotate(${angle}deg) translateY(${Math.sin(angle/12)*6}px)`;

},30);

}

/* =======================
   BUTTON HOVER GLOW
======================= */

const actionButtons = document.querySelectorAll(
".primary-button,.secondary-button"
);

actionButtons.forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.boxShadow =
"0 15px 35px rgba(108,43,217,.35)";

});

button.addEventListener("mouseleave",()=>{

button.style.boxShadow = "";

});

});

/* =======================
   SECTION HIGHLIGHT
======================= */

const headings = document.querySelectorAll(".section-heading");

const headingObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate([

{
opacity:0,
transform:"translateY(40px)"
},

{
opacity:1,
transform:"translateY(0)"
}

],{

duration:800,
fill:"forwards"

});

}

});

},{
threshold:0.3
});

headings.forEach(heading=>{

headingObserver.observe(heading);

});

/* =======================
   IMAGE CARD EFFECT
======================= */

const imageCard = document.querySelector(".image-card");

if(imageCard){

imageCard.addEventListener("mousemove",(e)=>{

const rect = imageCard.getBoundingClientRect();

const x = e.clientX - rect.left;

const y = e.clientY - rect.top;

imageCard.style.transform =
`rotateY(${(x-rect.width/2)/30}deg)
 rotateX(${-(y-rect.height/2)/30}deg)`;

});

imageCard.addEventListener("mouseleave",()=>{

imageCard.style.transform = "rotateX(0) rotateY(0)";

});

}

/* =======================================================
   EQUIVOICE GLOBAL v3.0
   SCRIPT.JS - PART 3
   Dark Mode • Forms • Notifications • Accessibility
======================================================= */

/* =======================
   DARK MODE
======================= */

const themeButton = document.getElementById("themeToggle");

if(themeButton){

const savedTheme = localStorage.getItem("equivoice-theme");

if(savedTheme === "dark"){

document.body.classList.add("dark");

themeButton.textContent = "☀️";

}

themeButton.addEventListener("click",()=>{

document.body.classList.toggle("dark");

const darkEnabled = document.body.classList.contains("dark");

themeButton.textContent = darkEnabled ? "☀️" : "🌙";

localStorage.setItem(
"equivoice-theme",
darkEnabled ? "dark" : "light"
);

});

}

/* =======================
   JOIN FORM VALIDATION
======================= */

const joinForm = document.querySelector(".join-form");

if(joinForm){

joinForm.addEventListener("submit",(e)=>{

e.preventDefault();

const requiredFields =
joinForm.querySelectorAll(
"input[required], textarea[required], select[required]"
);

let valid = true;

requiredFields.forEach(field=>{

if(field.value.trim()===""){

field.style.borderColor="red";

valid=false;

}else{

field.style.borderColor="#14B8A6";

}

});

if(valid){

showNotification(

"🎉 Thank you for joining EquiVoice Global!",

"success"

);

joinForm.reset();

}else{

showNotification(

"⚠️ Please complete all required fields.",

"error"

);

}

});

}

/* =======================
   NEWSLETTER
======================= */

const newsletter =
document.querySelector(".newsletter");

if(newsletter){

newsletter.addEventListener("submit",(e)=>{

e.preventDefault();

const email =
newsletter.querySelector("input");

const pattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(pattern.test(email.value)){

showNotification(

"📧 Subscription successful!",

"success"

);

email.value="";

}else{

showNotification(

"❌ Please enter a valid email.",

"error"

);

}

});

}

/* =======================
   NOTIFICATION SYSTEM
======================= */

function showNotification(message,type){

const notification =
document.createElement("div");

notification.className =
"notification "+type;

notification.textContent =
message;

notification.style.position="fixed";

notification.style.top="25px";

notification.style.right="25px";

notification.style.padding="18px 25px";

notification.style.borderRadius="14px";

notification.style.color="#fff";

notification.style.fontWeight="600";

notification.style.zIndex="99999";

notification.style.background=

type==="success"

? "#16A34A"

: "#DC2626";

notification.style.boxShadow=
"0 15px 30px rgba(0,0,0,.2)";

document.body.appendChild(
notification
);

setTimeout(()=>{

notification.style.opacity="0";

notification.style.transition=".5s";

},2500);

setTimeout(()=>{

notification.remove();

},3000);

}

/* =======================
   KEYBOARD ACCESSIBILITY
======================= */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

if(navigation){

navigation.classList.remove("show");

}

}

});

/* =======================
   BUTTON FOCUS
======================= */

const allButtons =
document.querySelectorAll("button,a");

allButtons.forEach(button=>{

button.addEventListener("focus",()=>{

button.style.outline=
"3px solid #2563EB";

});

button.addEventListener("blur",()=>{

button.style.outline="none";

});

});

/* =======================
   PAGE LOADED
======================= */

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

console.log(
"✅ EquiVoice Global v3.0 Loaded Successfully"
);

});

/* =======================================================
   EQUIVOICE GLOBAL v3.0
   SCRIPT.JS - PART 4
   Final Enhancements • Performance • Accessibility
======================================================= */

/* =======================
   LAZY LOAD IMAGES
======================= */

const lazyImages = document.querySelectorAll("img[data-src]");

if ("IntersectionObserver" in window) {

    const imageObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const img = entry.target;

                img.src = img.dataset.src;

                img.removeAttribute("data-src");

                observer.unobserve(img);

            }

        });

    });

    lazyImages.forEach(img => imageObserver.observe(img));

}

/* =======================
   GOOGLE TRANSLATE CHECK
======================= */

window.addEventListener("load", () => {

    const translateWidget =
        document.getElementById("google_translate_element");

    if (translateWidget) {

        console.log("🌍 Translation widget ready.");

    }

});

/* =======================
   SIMPLE AI CHAT DEMO
======================= */

const aiInput = document.querySelector(".chat-demo input");

if (aiInput) {

    aiInput.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            const message = aiInput.value.trim();

            if (message !== "") {

                showNotification(
                    "🤖 AI Assistant: This feature will be connected in a future version.",
                    "success"
                );

                aiInput.value = "";

            }

        }

    });

}

/* =======================
   PERFORMANCE
======================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-ready");

});

/* =======================
   ACCESSIBILITY
======================= */

document.querySelectorAll("a").forEach(link => {

    if (!link.getAttribute("aria-label")) {

        link.setAttribute(
            "aria-label",
            link.textContent.trim()
        );

    }

});

/* =======================
   COPYRIGHT YEAR
======================= */

const yearElement = document.getElementById("currentYear");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}

/* =======================
   CONSOLE MESSAGE
======================= */

console.log(
"%cEquiVoice Global v3.0",
"color:#6C2BD9;font-size:18px;font-weight:bold;"
);

console.log(
"%cBuilt with accessibility, inclusion and innovation.",
"color:#2563EB;font-size:14px;"
);

/* =======================
   FINISHED
======================= */

console.log("🚀 Website fully initialized.");
