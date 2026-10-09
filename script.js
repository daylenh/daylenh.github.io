const familyButton = document.getElementById("familyButton");
const paragraphs = document.querySelectorAll("#introStory .intro-text");

if (familyButton && paragraphs.length > 0) {
    paragraphs.forEach(function(paragraph) {
        paragraph.classList.remove("show");
    });

    familyButton.style.display = "none";
    paragraphs.forEach(function(paragraph, index) {
        setTimeout(function() {
            paragraph.classList.add("show");
            if (index === paragraphs.length - 1) {
                setTimeout(function() {
                    familyButton.style.display = "block";
                }, 2000);
            }
        }, index * 4500);
    });

    familyButton.onclick = function() {
        const heading = document.querySelector("#introStory h1");
        const memoryMessage = document.getElementById("memoryMessage");
        if (heading) {
            heading.classList.add("blur-background");
        }

        paragraphs.forEach(function(paragraph) {
            paragraph.classList.add("hide");
        });

        familyButton.style.display = "none";
        if (memoryMessage) {
            memoryMessage.style.display = "block";
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    memoryMessage.classList.add("show");
                });
            });
        }
    };
}

function goToFamily() {
    window.location.href = "family.html";
}

function goToFamily() {
    window.location.href = "family.html";
}

function goToFamily() {
    window.location.href = "family.html";
}

const recipePage = document.querySelector("body.recipe-page");
if (recipePage) {
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            recipePage.classList.add("is-visible");
        });
    });
}

function showMemoryMessage() {
    const memoryMessage = document.getElementById("memoryMessage");
    memoryMessage.style.display = "block";
    memoryMessage.classList.add("show");
}

function hideMemoryMessage() {
    const memoryMessage = document.getElementById("memoryMessage");
    memoryMessage.classList.remove("show");
    setTimeout(function() {
        memoryMessage.style.display = "none";
    }, 1000);
}

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
        return;
    }
    window.location.href = "index.html";
}

const openedFamilyCards = new Set();

function toggleFamilyCard(name) {
    const card = document.getElementById(name + "Card");
    const details = document.getElementById(name + "Details");
    if (!card || !details || card.disabled) {
        return;
    }

    details.hidden = !details.hidden;
    card.setAttribute("aria-expanded", String(!details.hidden));
    if (name === "minh" || name === "mai") {
        openedFamilyCards.add(name);
        if (openedFamilyCards.size === 2) {
            const baoCard = document.getElementById("baoCard");
            const prompt = document.getElementById("familyPrompt");
            if (baoCard) {
                baoCard.disabled = false;
                baoCard.querySelector(".card-hint").textContent = "Click to turn over";
            }
            if (prompt) {
                prompt.textContent = "You remembered Minh and Mai. You can open the last card now.";
            }
        }
    }
}

// Function to start Bao's memory sequence
function startBaoMemory() {
    const details = document.getElementById("baoDetails");
    const memory = document.getElementById("baoMemory");
    const baoCard = document.getElementById("baoCard");
    const prompt = document.getElementById("familyPrompt");
    if (!details || !memory || !baoCard) {
        return;
    }

    ["minh", "mai"].forEach(function(name) {
        const familyDetails = document.getElementById(name + "Details");
        const familyCard = document.getElementById(name + "Card");
        if (familyDetails) {
            familyDetails.hidden = true;
        }
        if (familyCard) {
            familyCard.setAttribute("aria-expanded", "false");
        }
    });

    details.hidden = true;
    memory.hidden = false;
    baoCard.setAttribute("aria-expanded", "false");
    document.querySelectorAll(".family-card").forEach(function(card) {
        card.disabled = true;
    });
    const cardsContainer = document.getElementById("familyCards");
    if (cardsContainer) {
        cardsContainer.classList.add("memory-started");
    }

    if (prompt) {
        prompt.textContent = "I remember my grandchild...I think";
    }

    const text = memory.querySelectorAll(".bao-text");
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
    const cardsContainer = document.getElementById("familyCards");
    const prompt = document.getElementById("familyPrompt");
    const afterBao = document.getElementById("afterBao");
    const memoryText = document.querySelectorAll(".bao-text");
    memoryText.forEach(function(item) {
        item.classList.remove("show");
        item.classList.add("fade");
    });

    setTimeout(function() {
        if (cardsContainer) {
            cardsContainer.style.display = "none";
        }
        if (prompt) {
            prompt.style.display = "none";
        }
        if (afterBao) {
            afterBao.hidden = false;
            afterBao.classList.add("is-visible");
        }
    }, 2000);
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

const diningMemoryIds = ["bookMemory", "toysMemory", "rainbowStickMemory"];
const diningMemoriesStorageKey = "lanStoryOpenedDiningMemories";
const diningPoemStorageKey = "lanStoryReadDiningPoem";
const savedDiningMemories = JSON.parse(sessionStorage.getItem(diningMemoriesStorageKey) || "[]");
const openedDiningMemories = new Set(
    Array.isArray(savedDiningMemories)
        ? savedDiningMemories.filter(function(id) {
            return diningMemoryIds.includes(id);
        })
        : []
);

function updateDiningProgress() {
    const medicineHotspot = document.querySelector(".hotspot.medicine");
    const diningPrompt = document.getElementById("diningPrompt");
    const poemOpened = sessionStorage.getItem(diningPoemStorageKey) === "true";
    const canOpenMedicine = poemOpened;
    if (medicineHotspot) {
        medicineHotspot.disabled = !canOpenMedicine;
        medicineHotspot.setAttribute(
            "aria-label",
            canOpenMedicine
                ? "Open the medicine bottle"
                : "The medicine bottle is locked until you click Read the poem"
        );
    }
    if (diningPrompt) {
        if (canOpenMedicine) {
            diningPrompt.textContent = "You read the poem. Click the medicine bottle to continue.";
        } else {
            diningPrompt.textContent = "Click Read the poem in the book memory to unlock the medicine bottle.";
        }
    }
}

const diningPage = document.querySelector("body.dining-page");
if (diningPage) {
    diningMemoryIds.forEach(function(id) {
        if (openedDiningMemories.has(id)) {
            const memory = document.getElementById(id);
            const hotspot = document.querySelector('[aria-controls="' + id + '"]');
            if (memory) {
                memory.classList.add("is-visible");
            }
            if (hotspot) {
                hotspot.remove();
            }
        }
    });
    updateDiningProgress();
}

function showDiningMemory(id, hotspot) {
    const memory = document.getElementById(id);
    if (!memory || !hotspot || !diningMemoryIds.includes(id) || openedDiningMemories.has(id)) {
        return;
    }

    memory.classList.add("is-visible");
    openedDiningMemories.add(id);
    sessionStorage.setItem(diningMemoriesStorageKey, JSON.stringify(Array.from(openedDiningMemories)));
    hotspot.remove();
    updateDiningProgress();
}

function openMeds() {
    const medicineHotspot = document.querySelector(".hotspot.medicine");
    const poemOpened = sessionStorage.getItem(diningPoemStorageKey) === "true";
    if (!medicineHotspot || medicineHotspot.disabled || !poemOpened) {
        return;
    }

    window.location.href = "meds.html";
}

function openPoem() {
    sessionStorage.setItem(diningPoemStorageKey, "true");
    window.location.href = "poem.html";
}

const poemPage = document.querySelector("body.poem-page");
if (poemPage) {
    const poemLines = document.querySelectorAll("#poem .poem-line");
    const nextPoem = document.getElementById("nextPoem");
    const revealInterval = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 2200;
    poemLines.forEach(function(line, index) {
        window.setTimeout(function() {
            line.classList.add("show");
            if (index === poemLines.length - 1 && nextPoem) {
                nextPoem.hidden = false;
            }
        }, index * revealInterval);
    });
}

function startPoemMemory() {
    const poem = document.getElementById("poem");
    const memory = document.getElementById("poemMemory");
    if (!poem || !memory) {
        return;
    }

    poem.hidden = true;
    memory.hidden = false;
    const memories = memory.querySelectorAll(".poem-memory-text");
    const revealInterval = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 2200;
    const backButton = document.getElementById("backToDining");
    memories.forEach(function(line, index) {
        window.setTimeout(function() {
            line.classList.add("show");
        }, index * revealInterval);
    });

    window.setTimeout(function() {
        if (backButton) {
            backButton.hidden = false;
        }
    }, memories.length ? (memories.length - 1) * revealInterval + (revealInterval ? 1200 : 0) : 0);
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
    document.getElementById("recipe").style.display = "none";
    document.getElementById("memory").style.display = "block";
    const memories = document.querySelectorAll(".recipe-memory-text");
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

    setTimeout(function() {
        document.getElementById("nextMemory").style.display = "block";
    }, memories.length * 4000 + 2000);
}


function goToTetPreparation() {
    const memories = document.querySelectorAll(".recipe-memory-text");
    memories.forEach(function(memory) {
        memory.classList.remove("show");
        memory.style.display = "none";
    });

    document.getElementById("memory").style.display = "none";
    document.getElementById("tetPreparation").style.display = "block";
}


function goToDining() {
    window.location.href = "dining.html";
}

// Move from the medicine description to Grandma's monologue
function startMedicineStory() {
    document.getElementById("medicineDescription").style.display = "none";
    document.getElementById("medicineIntro").style.display = "block";
}

// Show the handwritten note
function showNote() {
    document.getElementById("medicineIntro").style.display = "none";
    document.getElementById("medicineNote").style.display = "block";
}

// Show Grandma's confusion
function showConfusion() {
    document.getElementById("medicineNote").style.display = "none";
    const confusion = document.getElementById("medicineConfusion");
    confusion.style.display = "block";
    const lines = confusion.querySelectorAll(".medicine-memory-text");
    lines.forEach(function(line, index) {
        setTimeout(function() {
            line.classList.add("show");
        }, index * 3000);
    });
    const phoneDelay = lines.length * 3000;
    setTimeout(function() {
        lines.forEach(function(line) {
            line.classList.remove("show");
            line.classList.add("hide");
        });

        setTimeout(function() {
            lines.forEach(function(line) {
                line.hidden = true;
            });
            document.getElementById("medicineStory").classList.add("phone-ringing");
            const phone = document.getElementById("phoneRinging");
            phone.style.display = "block";
            const phoneLines = phone.querySelectorAll(".phone-memory-text");
            phoneLines.forEach(function(line, index) {
                setTimeout(function() {
                    line.classList.add("show");
                }, index * 3000);
            });

            setTimeout(function() {
                document.getElementById("medicineNextButton").style.display = "block";
            }, (phoneLines.length - 1) * 3000 + 2000);
        }, 2000);
    }, phoneDelay);
}


function goToPhone() {
    window.location.href = "phone.html";
}

function startPhoneCall() {
    document.getElementById("phoneIntro").style.display = "none";
    const conversation = document.getElementById("phoneConversation");
    conversation.style.display = "block";
    const lines = conversation.querySelectorAll(".phone-dialogue");
    lines.forEach(function(line, index) {
        setTimeout(function() {
            line.classList.add("show");
            line.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                block: "nearest"
            });
        }, index * 3000);
    });
    setTimeout(function() {
        conversation.querySelector("button").style.display = "block";
    }, (lines.length - 1) * 3000 + 2000);
}

function endPhoneCall() {
    document.querySelector(".phone-frame").style.display = "none";
    document.getElementById("phoneConversation").style.display = "none";
    const question = document.getElementById("grandsonQuestion");
    question.style.display = "block";
    const lines = question.querySelectorAll(".phone-memory-text");
    lines.forEach(function(line, index) {
        setTimeout(function() {
            line.classList.add("show");
        }, index * 3000);
    });
    setTimeout(function() {
        document.getElementById("yesButton").style.display = "inline-block";
        document.getElementById("noButton").style.display = "inline-block";
    }, (lines.length - 1) * 3000 + 2000);
}

function startYesMemory() {
    document.getElementById("yesIntro").style.display = "none";
    const memory = document.getElementById("yesMemory");
    memory.style.display = "block";
    const lines = memory.querySelectorAll(".ending-memory-text");
    lines.forEach(function(line, index) {
        setTimeout(function() {
            line.classList.add("show");
        }, index * 3000);
    });

    setTimeout(function() {
        document.getElementById("yesNextButton").style.display = "block";
    }, (lines.length - 1) * 3000 + 2000);
}

function startNoMemory() {
    document.getElementById("noIntro").style.display = "none";
    const memory = document.getElementById("noMemory");
    memory.style.display = "block";
    const lines = memory.querySelectorAll(".ending-memory-text");
    lines.forEach(function(line, index) {
        setTimeout(function() {
            line.classList.add("show");
        }, index * 3000);
    });
    setTimeout(function() {
        document.getElementById("noNextButton").style.display = "block";
    }, (lines.length - 1) * 3000 + 2000);
}


function showYesIntro() {
    const paragraphs = document.querySelectorAll(".yes-intro-text");

    paragraphs.forEach(function(paragraph, index) {
        setTimeout(function() {
            paragraph.classList.add("show");
        }, index * 3000);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    showYesIntro();
});

function showNoIntro() {
    const paragraphs = document.querySelectorAll(".no-intro-text");

    paragraphs.forEach(function(paragraph, index) {
        setTimeout(function() {
            paragraph.classList.add("show");
        }, index * 3000);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    if (document.querySelector(".no-intro-text")) {
        showNoIntro();
    }
});