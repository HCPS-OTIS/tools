if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }    
}    

// default to the Chromebook tab
try {
    document.getElementById(location.hash.substring(1)).click();
} catch (error) {
    document.getElementById("cbs").click();
}

// tags to add around each line of text
start = "<span class='copy-on-click' title='click to copy'>";
end = "</span>";

// add tags around text in <p>s based on <br>s
elements = document.getElementsByTagName('p');
for (let i = 0; i < elements.length; i++) {
    html = elements[i].innerHTML;
    html = html.replace(/<br>/g, end + "<br>" + start);
    html = start + html + end;
    elements[i].innerHTML = html;
}    

// add event listener to newly added <span>s
elements = document.getElementsByClassName("copy-on-click");
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", copy);
}    

// copy text to clipboard and create particles
function copy(e) {
    navigator.clipboard.writeText(e.target.innerText);

    flashColor(e.target);

    createParticle(e.clientX, e.clientY);
}

// flash the text color of the clicked element
function flashColor(element) {
    origColor = element.style.textShadow;
    element.style.textShadow = "0 0 10px #fff";
    setTimeout(function() {
        element.style.textShadow = origColor;
    }, 100);
}

// create each individual particle
function createParticle(x, y) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);

    const size = 50;
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
    });

    animation.onfinish = () => {
        particle.remove();
    };
}

// switch between tabs
function openTab(evt, cityName) {
    location.hash = evt.target.id;

    var tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}