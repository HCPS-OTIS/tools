import encode from './encoder.mjs'

function update(e) {
    console.log(e)
    let num = e.target.id.slice(5)
    let barcode = encode(e.target.value.toUpperCase())
    document.getElementById('barcode' + num).innerHTML = barcode

    // move to next input box if input is 7 characters long
    if (e.target.value.length == 7) {
        let next = document.getElementById('input' + (parseInt(num) + 1))
        if (next) {
            next.focus()
        }
    }
}

window.update = update

// attach update to all input fields in a .label
function attach() {
    document.querySelectorAll('.label>input').forEach(function (input) {
        input.addEventListener('input', update)
    })
}

window.attach = attach

function addPage() {
    var currentPages = document.getElementsByClassName('page')
    var currentPageNum = parseInt(currentPages[currentPages.length - 1].id.slice(4)) + 1

    var blankPage = document.createElement('div')
    blankPage.className = 'page'
    blankPage.id = 'page' + currentPageNum
    blankPage.innerHTML = `<div class="labels">
    </div>`

    var blankLabels = blankPage.getElementsByClassName('labels')[0]

    for (let i = 0; i < 30; i++) {
        var currentLabel = document.createElement('div')
        currentLabel.className = 'label'
        currentLabel.innerHTML = `<input id="input${(currentPageNum - 1) * 30 + i}" type="text" maxlength="7" placeholder=" " oninput="update()">
                <img src="assets/img/HCPS_FullLogo_color.svg" alt="">
                <label for="input${(currentPageNum - 1) * 30 + i}"></label>
                <span id="barcode${(currentPageNum - 1) * 30 + i}"></span>`
        blankLabels.appendChild(currentLabel)
    }

    document.getElementById('pages').appendChild(blankPage)

    attach()
}

window.addPage = addPage

function removePage() {
    var currentPages = document.getElementsByClassName('page')
    if (currentPages.length != 1) {
        currentPages[currentPages.length - 1].remove()
    }
}

window.removePage = removePage