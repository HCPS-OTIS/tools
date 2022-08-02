import encode from './encoder.mjs'

// label length limit
var limit = 7

// update the limit on textboxes and bulk textarea
function updateLimit() {
    for (const textbox of document.getElementsByClassName('required')) {
        textbox.maxLength = limit
    }
    document.getElementById('labeltexts').cols = limit
}

// limit toggling between 7 and 20
function toggleLimit() {
    let checkbox = document.getElementById('limit-checkbox')

    if (checkbox.checked) {
        limit = 7
    } else {
        limit = 20
    }

    updateLimit()
}

window.toggleLimit = toggleLimit

function updateBarcode(e) {
    let num = e.target.id.slice(5)
    let barcode = encode(e.target.value.toUpperCase())
    document.getElementById('barcode' + num).innerHTML = barcode

    // move to next input box if input is `limit` characters long
    if (e.target.value.length == limit) {
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

window.updateBarcode = updateBarcode

function updateSubtitle() {
    var subtitle = document.getElementById('subtitle-input').value
    var subtitles = document.getElementsByClassName('subtitle')
    for (let i = 0; i < subtitles.length; i++) {
        subtitles[i].innerHTML = subtitle
    }
}

window.updateSubtitle = updateSubtitle

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
        blankLabels.querySelectorAll('.labels>div')[i].outerHTML = currentText
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

function updateStudents(e) {
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
        const labelText = labelTexts[i]

        // check for label and add a page if needed
        var label = document.getElementById('input' + i)
        if (label === null) {
            addPage()
            var label = document.getElementById('input' + i)
        }

        // set label and barcode
        label.value = labelText.slice(0, limit)
        forceUpdate(i)
    }
}

window.updateStudents = updateStudents

function uploadTeachers() {
    // get file reader
    var file = document.getElementById('teacher-upload').files[0]
    var reader = new FileReader()
    reader.addEventListener('load', (event) => {
        updateTeachers(reader.result)
    })
    reader.readAsText(file)
}

window.uploadTeachers = uploadTeachers

function updateTeachers(result) {
    // delete all-1 pages
    while (document.getElementsByClassName('page').length > 1) {
        removePage()
    }

    // clear inputs 0-29
    for (let i = 0; i < 30; i++) {
        document.getElementById('hostname' + i).value = ''
        document.getElementById('st' + i).value = ''
        document.getElementById('model' + i).value = ''
    }

    // split result into columns
    var lines = result.split('\n').slice(1)
    var data = []
    for (let i = 0; i < lines.length; i++) {
        data.push(lines[i].split(','))
    }

    // add data to teacher labels
    for (let i = 0; i < data.length; i++) {
        var hostnameInput = document.getElementById('hostname' + i)

        if (hostnameInput === null) {
            addPage()
            hostnameInput = document.getElementById('hostname' + i)
        }
        var stInput = document.getElementById('st' + i)
        var modelInput = document.getElementById('model' + i)

        hostnameInput.value = data[i][0]
        stInput.value = data[i][1].slice(0, 7)
        modelInput.value = data[i][2]
    }
}

function printLabels() {
    document.getElementById('margin-warning').classList.add('visible')
    // 500ms delay to allow user to see warning
    setTimeout(function () {
        window.print()
        document.getElementById('margin-warning').classList.remove('visible')
    }, 250)
}

window.printLabels = printLabels