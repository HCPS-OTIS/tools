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
    
    for (let i = 0; i < 8; i++) {
        createParticle(e.clientX, e.clientY, i / 8 * 2 * Math.PI);
    }
}

// create each individual particle
function createParticle(x, y, direction) {
    const particle = document.createElement('particle');
    particle.style.transform = 'rotate(90deg)';
    document.body.appendChild(particle);

    const startX = x + Math.sin(direction) * 20;
    const startY = y + Math.cos(direction) * 20;

    const endX = x + Math.sin(direction) * 50;
    const endY = y + Math.cos(direction) * 50;

    const size = 10;
    const animation = particle.animate([
        {
            transform: `translate(${startX - size / 2}px, ${startY - size / 2}px) rotate(${-direction}rad)`,
            opacity: 1,
            height: `${size}px`,
        },
        {
            transform: `translate(${startX - size / 2}px, ${startY - size / 2}px) rotate(${-direction}rad)`,
            opacity: 1,
            height: `${size*4}px`,
        },
        {
            transform: `translate(${endX - size / 2}px, ${endY - size / 2}px) rotate(${-direction}rad)`,
            opacity: 1,
            height: `${size}px`,
        }
    ],
    {
        duration: 500
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