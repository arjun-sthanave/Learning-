gsap.to(".box", {
    x: 200,
});


tl.from(".content h", {
    x: 150,
    stagger: 0.2
})
tl.from("#cross", {
    opacity: 0
})
tl.pause()

menu.addEventListener("click", () => {
    tl.play()
})

menucross.addEventListener("click", () => {
    tl.reverse()
})
