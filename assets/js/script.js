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