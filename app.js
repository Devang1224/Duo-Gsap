function init(){
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
init();


const cursor = document.querySelector(".cursor");
const main = document.querySelector(".main");
const navItems = document.querySelectorAll("#nav h4");
const navHoverH1 = document.querySelectorAll('#purple div h1');
const overlay = document.querySelector("#purple")
const boxes = document.querySelectorAll(".box");


document.addEventListener("mousemove",function(e){
    cursor.style.left = e.x + 'px';
    cursor.style.top = e.y + 'px';


    cursor.animate({
        left: `${e.x}px`,
        top: `${e.y}px`
    },{duration: 1500, fill: "forwards"})
})


const tl = gsap.timeline({
    scrollTrigger:{
        trigger:".page1 h1",
        scroller:".main",
        start:"top 27%",
        end:"top 0",
        scrub:3,
    }
})

tl.to(".page1 h1",{
    x:-100,
},"anim")   // using a common variable so that all the tl's that contain this variable run simuntaneously.

tl.to(".page1 h2",{
    x:100,
},"anim")

tl.to(".page1 video",{
    width:"90%",
},"anim")

const tl2 = gsap.timeline({
    scrollTrigger:{
        trigger:".page1 h1",
        scroller:".main",
        start:"top -80%",
        end:"top -130%",
        scrub:3,
    }
})
tl2.to(".main",{
    backgroundColor:"#FFF"
})


const tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page3 h1",
        scroller: ".main",
        start: "top 10%",
        end: "top -10%",
        scrub: 2,
    }
})

tl3.to(".page3-part1 img",{
    y:-100,
    opacity:1
},"anim2")

tl3.to(".page3-part1 video",{
    y:-100,
    opacity:1
},"anim2")




const tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page4",
        scroller: ".main",
        start: "top 20%",
        end: "top 45%",
        scrub: 3,
    }
})

tl4.to(".main", {
    backgroundColor: "#111",
})


boxes.forEach((e)=>{
   e.addEventListener("mouseenter",()=>{
   
    const cursorImage = e.getAttribute("data-image");
    cursor.style.transform = "translate(-50%, -50%) scale(15)";
     cursor.style.borderRadius = "10%"
     cursor.style.mixBlendMode = "normal"

     cursor.style.backgroundImage = `url(${cursorImage})`

   })

   e.addEventListener("mouseleave",(e)=>{
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.borderRadius = "50%"
    cursor.style.backgroundImage = "none"
    cursor.style.mixBlendMode = "difference"

 })
})




navItems.forEach((e,idx)=>{
    if(idx == 0)return;

    e.addEventListener("mouseenter",()=>{
        navHoverH1.forEach((h1) => {
            h1.innerHTML = "&nbsp;"+e.innerHTML+"  "+e.innerHTML+"  "+e.innerHTML+"  "+e.innerHTML+"  "+e.innerHTML;
        })
        purple.style.display = "block";
        cursor.style.transform = "translate(-50%, -50%) scale(2)";

    })

    document.querySelector('#nav').addEventListener('mouseleave', function(){
        purple.style.display = "none";
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
    })
})