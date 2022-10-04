// tags to add around each line of text
start = "<span class='copy-on-click' title='click to copy'>"
end = "</span>"

// add tags around text in <p>s based on <br>s
elements = document.querySelectorAll('.templates p')
for (let i = 0; i < elements.length; i++) {
    html = elements[i].innerHTML
    html = html.replace(/<br>/g, end + "<br>" + start)
    html = start + html + end
    elements[i].innerHTML = html
    elements[i].addEventListener("click", highlight.bind(null, elements[i]))
}

// add event listener to newly added <span>s
elements = document.getElementsByClassName("copy-on-click")
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", copy)
}

// copy text to clipboard and create particles
function copy(e) {
    navigator.clipboard.writeText(e.target.innerText)

    flashColor(e.target)

    createParticle(e.clientX, e.clientY)
}

// flash the text color of the clicked element
function flashColor(element) {
    origColor = element.style.textShadow
    element.style.textShadow = "0 0 10px #fff"
    setTimeout(function () {
        element.style.textShadow = origColor
    }, 100)
}

// create each individual particle
function createParticle(x, y) {
    const particle = document.createElement('particle')
    document.body.appendChild(particle)

    const size = 50
    const animation = particle.animate([
        {
            transform: `translate(${x}px, ${y}px)`,
            opacity: 1,
            height: `0px`,
            width: `0px`
        },
        {
            transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
            opacity: 0,
            height: `${size}px`,
            width: `${size}px`
        }
    ],
        {
            duration: 300
        })

    animation.onfinish = () => {
        particle.remove()
    }
}

// highlight paragraph on click
function highlight(element) {
    elements = document.querySelectorAll('.templates p')
    for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('style')
    }

    console.log(element)
    element.style.backgroundColor = 'rgba(255, 255, 255, .1)'
    element.style.boxShadow = '0 2px 3px black'
    element.style.color = 'white'

}
