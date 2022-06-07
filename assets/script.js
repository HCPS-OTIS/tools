// tags to add around each line of text
start = "<span class='copy-on-click' title='click to copy'>"
end = "</span>"

// add tags around text in <p>s based on <br>s
elements = document.getElementsByTagName('p')
for (let i = 0; i < elements.length; i++) {
    html = elements[i].innerHTML
    html = html.replace(/<br>/g, end + "<br>" + start)
    html = start + html + end
    elements[i].innerHTML = html
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

// toggle background
function togglechill() {
    if (document.body.className == "chill") {
        document.body.className = ""
        // set chill cookie to false
        document.cookie = "chill=false"
    } else {
        document.body.className = "chill"
        // set chill cookie to true
        document.cookie = "chill=true"
    }
}

// check for chill cookie and toggle background
if (document.cookie.includes("chill=true")) {
    document.body.style.setProperty("--transition", "none")
    document.body.className = "chill"
    // pause for 1s
    setTimeout(function () {
        document.body.style.setProperty("--transition", "all 1s")
    }, 100)
}