import encode from './encoder.mjs'

function update(e) {
    let num = e.target.id.slice(5)
    let barcode = encode(e.target.value.toUpperCase())
    document.getElementById('barcode' + num).innerHTML = barcode

    // move to next input box if input is 7 characters long
    if (e.target.value.length == 7) {
        let next = document.getElementById('input' + (parseInt(num) + 1))
        if (next) {
            next.focus()
        } else {
            addPage()
            let next = document.getElementById('input' + (parseInt(num) + 1))
            next.focus()
        }
    }
}

window.update = update

function addPage() {
    var currentPages = document.getElementsByClassName('page')
    var currentPageNum = parseInt(currentPages[currentPages.length - 1].id.slice(4)) + 1

    // create blank page
    var blankPage = document.createElement('div')
    blankPage.className = 'page'
    blankPage.id = 'page' + currentPageNum
    blankPage.innerHTML = `<div class="labels">
    </div>`

    // get blank list of labels
    var blankLabels = blankPage.getElementsByClassName('labels')[0]

    // get innerHTML from #blank_label for blanks
    var blank_label = document.getElementById('blank_label').innerHTML

    // add labels to blank list
    for (let i = 0; i < 30; i++) {
        blankLabels.appendChild(document.createElement('div'))
        var currentText = blank_label.replaceAll('%i%', (currentPageNum - 1) * 30 + i)
        blankLabels.getElementsByTagName('div')[i].outerHTML = currentText
    }

    // add new page to webpage
    document.getElementById('pages').appendChild(blankPage)
}

window.addPage = addPage

function removePage() {
    var currentPages = document.getElementsByClassName('page')
    if (currentPages.length != 1) {
        currentPages[currentPages.length - 1].remove()
    }
}

window.removePage = removePage

function forceUpdate(num) {
    let barcode = encode(document.getElementById('input' + num).value.toUpperCase())
    document.getElementById('barcode' + num).innerHTML = barcode
}

function updateAll(e) {
    // get contents of textarea
    var tags = document.getElementById('labeltexts').value

    // delete all-1 pages
    while (document.getElementsByClassName('page').length > 1) {
        removePage()
    }

    // clear inputs 0-29
    for (let i = 0; i < 30; i++) {
        document.getElementById('input' + i).value = ''
        forceUpdate(i)
    }

    // populate inputs and add label text, populating barcodes somehow
    var labelTexts = document.getElementById('labeltexts').value.split('\n')
    for (let i = 0; i < labelTexts.length; i++) {
        const labelText = labelTexts[i];

        // check for label and add a page if needed
        var label = document.getElementById('input' + i)
        if (label === null) {
            addPage()
            var label = document.getElementById('input' + i)
        }

        // set label and barcode
        label.value = labelText.slice(0, 7)
        forceUpdate(i)
    }
}

window.updateAll = updateAll