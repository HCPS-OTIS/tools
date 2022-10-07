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
    let num = e.target.id.slice(10)
    let barcode = encode(e.target.value.toUpperCase())
    document.getElementById('barcode' + num).innerHTML = barcode

    // move to next input box if input is `limit` characters long
    if (e.target.value.length == limit) {
        let next = document.getElementById('servicetag' + (parseInt(num) + 1))
        if (next) {
            next.focus()
        } else {
            addPage()
            let next = document.getElementById('servicetag' + (parseInt(num) + 1))
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

function loadCSV() {
    document.getElementById('csvupload').click()
}

window.loadCSV = loadCSV

function readCSV() {
    // get file contents
    var file = document.getElementById('csvupload').files[0]
    var reader = new FileReader()
    reader.addEventListener('load', (event) => {
        updateLabels(reader.result)
    })
    reader.readAsText(file)
}

window.readCSV = readCSV

function updateLabels(result) {
    // delete all-1 pages
    while (document.getElementsByClassName('page').length > 1) {
        removePage()
    }

    // clear all inputs
    let inputs = document.getElementsByTagName('input')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ''
    }

    // split up data
    let rows = result.split(/\r?\n|\r|\n/g)
    let headers = rows.shift().split(',')

    // iterate through rows
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i].split(',')
        if (headers.at(-1) === '')
            row.pop()

        // iterate through fields
        for (let j = 0; j < row.length; j++) {
            // add a page if necessary
            if (row[j] != '') {
                if (document.getElementById(headers[j] + i) === null)
                    addPage()
                document.getElementById(headers[j] + i).value = row[j]
            }
        }

        // update barcode if relevant
        if (document.getElementById('barcode' + i) !== null)
            forceUpdate(i)
    }
}

function saveCSV() {
    let csvdata = []

    // iterate through labels
    let labels = document.querySelectorAll('.pages .label')
    for (let i = 0; i < labels.length; i++) {
        let labeldata = {}

        // iterate through inputs on each label
        let inputs = labels[i].getElementsByTagName('input')
        for (let j = 0; j < inputs.length; j++) {
            const input = inputs[j];

            let id = input.id.slice(0, -i.toString().length)
            let value = input.value
            labeldata[id] = value
        }

        csvdata.push(labeldata)
    }

    let csvcontent = ''

    // encode data to csv
    let firstlabel = Object.entries(csvdata[0])

    for (let i = 0; i < firstlabel.length; i++) {
        csvcontent += firstlabel[i][0] + ','
    }
    csvcontent += '\n'

    for (let i = 0; i < csvdata.length; i++) {
        const label = Object.entries(csvdata[i]);
        for (let i = 0; i < label.length; i++) {
            csvcontent += label[i][1] + ','
        }
        csvcontent += '\n'
    }

    // save csv
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvcontent));
    element.setAttribute('download', 'labels.csv');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

window.saveCSV = saveCSV

function forceUpdate(num) {
    let barcode = encode(document.getElementById('servicetag' + num).value.toUpperCase())
    document.getElementById('barcode' + num).innerHTML = barcode
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