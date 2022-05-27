scrollTo(0, 0);

start = "<span class='copy-on-click' title='click to copy'>";
end = "</span>";

elements = document.getElementsByTagName('p');
for (let i = 0; i < elements.length; i++) {
    html = elements[i].innerHTML;
    html = html.replace(/<br>/g, end + "<br>" + start);
    html = start + html + end;
    elements[i].innerHTML = html;
}

elements = document.getElementsByClassName("copy-on-click");
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", copy);
}

try {
    document.getElementById(location.hash.substring(1)).click();
} catch (error) {
    document.getElementById("cbs").click();
}

// if (document.body.animate) {
//     document.querySelector('.copy-on-click').addEventListener('click', pop);
// }

function copy(e) {
    navigator.clipboard.writeText(e.target.innerText);

    alert("Copied to clipboard!");
    // e.target.animate([
    //     { transform: 'scale(1)', opacity: 1 },
    //     { transform: 'scale(1.1)', opacity: 1 },
    //     { transform: 'scale(1)', opacity: 1 }
    // ], {
    //     duration: 1000,
    //     iterations: 1
    // });
}

function openTab(evt, cityName) {
    location.hash = evt.target.id;

    scrollTo(0, 0);

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}