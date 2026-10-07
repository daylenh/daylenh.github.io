// button to show the memory message
document.getElementById("familyButton").onclick = function() {
    document.getElementById("memoryMessage").style.display = "block";
    document.getElementById("familyButton").style.display = "none";
};

// button to hide the memory message
const paragraphs = document.querySelectorAll(".intro-text");
const familyButton = document.getElementById("familyButton");

// Show each paragraph one by one with a delay
paragraphs.forEach(function(paragraph, index) {
    setTimeout(function() {
        paragraph.classList.add("show");
        if (index === paragraphs.length - 1) {
            setTimeout(function() {
                familyButton.style.display = "block";
            }, 4500);
        }

    }, index * 4500);
});

// show the memory message when the family button is clicked slowly
function showMemoryMessage() {
    const memoryMessage = document.getElementById("memoryMessage");
    memoryMessage.style.display = "block";
    memoryMessage.classList.add("show");
}

// hide the memory message when the family button is clicked slowly
function hideMemoryMessage() {
    const memoryMessage = document.getElementById("memoryMessage");
    memoryMessage.classList.remove("show");
    setTimeout(function() {
        memoryMessage.style.display = "none";
    }, 1000);
}

// Function to navigate to family.html
function goToFamily() {
    window.location.href = "family.html";
}

// Function to show Minh's description
function showMinh() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("introButton").style.display = "none";
    document.getElementById("familyMember").style.display = "block";
}

// Function to show Mai's description
function showMai() {
    document.getElementById("familyMember").style.display = "none";
    document.getElementById("mai").style.display = "block";
}


//function to show Bao's description
function showBao() {
    document.getElementById("mai").style.display = "none";
    document.getElementById("bao").style.display = "block";
}

// Function to start Bao's memory sequence
function startBaoMemory() {

    const text = document.querySelectorAll("#bao .bao-text");
    const button = document.getElementById("baoButton");
    button.style.display = "none";
    text.forEach(function(item, index) {

        setTimeout(function() {
            item.classList.add("show");
        }, index * 2500);

    });

    setTimeout(function() {
        forgetBao();
    }, text.length * 2500 + 2000);

}

// Function to forget Bao's memory sequence
function forgetBao() {

    const text = document.querySelectorAll("#bao .bao-text");

    text.forEach(function(item, index) {

        setTimeout(function() {
            item.classList.remove("show");
            item.classList.add("fade");
        }, index * 1800);

    });

    // After everything disappears, hide Bao completely
    setTimeout(function() {
        document.getElementById("bao").style.display = "none";
        document.getElementById("afterBao").style.display = "block";
    }, text.length * 1800 + 2500);

}