// Typing animation
const phrases = ["frontend developer", "web designer", "BCA student", "problem solver"];
const typedEl = document.getElementById('typed');
let pIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = phrases[pIndex];
  if(!deleting){
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if(charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if(charIndex === 0){
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .log-entry');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
},{threshold:0.12});
revealEls.forEach(el=>{
  el.classList.add('reveal');
  io.observe(el);
});

// Log entries stagger
document.querySelectorAll('.log-entry').forEach((el, i)=>{
  el.style.transitionDelay = (i*0.08)+'s';
});

// Tab bar active state + smooth scroll
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('section, header');

tabs.forEach(tab=>{
  tab.addEventListener('click', (e)=>{
    e.preventDefault();
    document.querySelector(tab.dataset.target).scrollIntoView({behavior:'smooth'});
  });
});

const navIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = '#' + entry.target.id;
      tabs.forEach(t=>t.classList.toggle('active', t.dataset.target === id));
    }
  });
},{rootMargin:'-40% 0px -50% 0px'});
sections.forEach(s=>navIO.observe(s));