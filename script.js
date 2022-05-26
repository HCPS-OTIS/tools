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
    elements[i].addEventListener("click", function () {
        let text = elements[i].innerText;
        navigator.clipboard.writeText(text);
    });
}

if (document.body.animate) {
    document.querySelector('.copy-on-click').addEventListener('click', pop);
}

function pop(e) {
    e.target.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(1.1)', opacity: 1 },
        { transform: 'scale(1)', opacity: 1 }
    ], {
        duration: 1000,
        iterations: 1
    });
}