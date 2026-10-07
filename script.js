const familyButton = document.getElementById("familyButton");
if (familyButton) {
    familyButton.onclick = function() {
        document.getElementById("memoryMessage").style.display = "block";
        familyButton.style.display = "none";
    };

    const paragraphs = document.querySelectorAll(".intro-text");

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
}

const recipePage = document.querySelector("body.recipe-page");
if (recipePage) {
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            recipePage.classList.add("is-visible");
        });
    });
}

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

const openedKitchenMemories = new Set();

function showMemory(id, hotspot) {
    const memory = document.getElementById(id);
    if (!memory || !hotspot || openedKitchenMemories.has(id)) {
        return;
    }

    memory.classList.add("is-visible");
    openedKitchenMemories.add(id);
    hotspot.remove();

    if (openedKitchenMemories.size === 3) {
        const recipeHotspot = document.querySelector(".hotspot.recipe");
        const recipePrompt = document.getElementById("recipePrompt");
        if (recipeHotspot) {
            recipeHotspot.disabled = false;
            recipeHotspot.setAttribute("aria-label", "Open the family recipe");
        }
        if (recipePrompt) {
            recipePrompt.textContent = "You found the memories. Click the recipe on the wall to read it.";
        }
    }
}

function openRecipe() {
    const recipeHotspot = document.querySelector(".hotspot.recipe");
    if (!recipeHotspot || recipeHotspot.disabled || document.body.classList.contains("is-leaving")) {
        return;
    }

    document.body.classList.add("is-leaving");
    window.setTimeout(function() {
        window.location.href = "recipes.html";
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1800);
}

function startRecipeMemory() {

    // Hide the recipe
    document.getElementById("recipe").style.display = "none";

    // Show the memory
    document.getElementById("memory").style.display = "block";

    // Get all memory paragraphs
    const memories = document.querySelectorAll(".recipe-memory-text");

    // Slowly show each memory
    memories.forEach(function(memory, index) {

        setTimeout(function() {
            memory.classList.add("show");
        }, index * 4000);

    });
}

function startRecipeMemory() {
    document.getElementById("recipe").style.display = "none";
    document.getElementById("memory").style.display = "block";

    const memories = document.querySelectorAll(".recipe-memory-text");

    memories.forEach(function(memory, index) {
        setTimeout(function() {
            memory.classList.add("show");
        }, index * 4000);
    });

    // Show Next button after all memories have appeared
    setTimeout(function() {
        document.getElementById("nextMemory").style.display = "block";
    }, memories.length * 4000 + 2000);
}


function goToTetPreparation() {

    // Clear all memory text
    const memories = document.querySelectorAll(".recipe-memory-text");

    memories.forEach(function(memory) {
        memory.classList.remove("show");
        memory.style.display = "none";
    });

    // Hide the memory section
    document.getElementById("memory").style.display = "none";

    // Show the Tết preparation message
    document.getElementById("tetPreparation").style.display = "block";
}


function goToDining() {
    window.location.href = "dining.html";
}