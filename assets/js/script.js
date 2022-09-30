// navigation tooltips
function showTooltip(e) {
    let tooltipText = e.target.getAttribute('data-tooltip')
    if (tooltipText) {
        let tooltip = document.createElement('div')
        tooltip.innerHTML = tooltipText
        tooltip.setAttribute('data-tooltip', tooltipText)

        tooltip.classList = 'fading tooltip'
        // line up tooltip with calling element
        tooltip.style.top = e.srcElement.getBoundingClientRect().top + 26 + 'px'
        // check if tooltip is on righthand side and flip if so
        if (e.srcElement.getBoundingClientRect().left > 200) {
            tooltip.classList.add('toolbar-tooltip')
        } else {
            tooltip.style.left = e.srcElement.getBoundingClientRect().right + 'px'
        }

        document.body.appendChild(tooltip)
        setTimeout(function () {
            tooltip.classList.remove('fading')
        }, 10)
    }
}

function hideTooltip(e) {
    let tooltips = document.querySelectorAll('.tooltip[data-tooltip="' + e.target.getAttribute('data-tooltip') + '"]')
    tooltips.forEach(tooltip => {
        tooltip.classList.add('fading')
        setTimeout(function () {
            tooltip.remove()
        }, 300)
    });
}

// show help if this help hasn't been seen before
if (document.getElementById('help')) {
    // get data-help attribute from the .help
    var help = document.getElementById('help').getAttribute("data-help")
    // check for matching cookie
    if (document.cookie.indexOf(`help.${help}=true`) === -1) {
        document.getElementById("help-wrapper").classList = "help-wrapper visible"
        document.cookie = `help.${help}=true; expires=Fri, 31 Dec 9999 23:59:59 GMT`
    }
}

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