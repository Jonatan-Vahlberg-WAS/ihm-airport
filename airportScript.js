const BASE_DELAY = 100;

const diagnosticScreen = document.querySelector("#airport-diagnostics");

// from products.json
let products = [];
let luggage = []
let pets = {
    DOG: [],
    CAT: [],
    FISH: [],
}
let shipping = [];
let dangerousGoods = [];

const anserKey = {
    LUGGAGE: 4,
    HEAVY_LUGGAGE: 2,
    DOGS: 3,
    CATS: 1,
    SHIPPING: 4,
    DANGEROUS_GOODS: 3,
    UNALLOWED_DANGEROUS_GOODS: 2,
    totalAllowedProducts: 15,
}


function getProducts() {
    fetch("./products.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            products = json;
            console.log("products", products);
            sortAirportGoods();

            runDiagnostics();
        })
        .catch(function (error) {
            console.log("ERROR",error);
        });
}

function printToDiagnosticScreen(message = "", delay = 0) {
    const p = document.createElement("p");
    p.innerText = "Checking..."
    setTimeout(() => {
        diagnosticScreen.appendChild(p);
    }, delay)
    setTimeout(() => {
        p.innerText = message;
    }, 1000+ delay/5)
    
}

function sortAirportGoods() {
   // Sort luggage based on category, and individual product properties
   //TODO: Sort luggage
}

function runLuggageDiagnostic() {
    if (luggage.length === anserKey.LUGGAGE) {
        printToDiagnosticScreen("✅ LUGGAGE: All luggage is accounted for", BASE_DELAY);
    } else {
        printToDiagnosticScreen(`❌ LUGGAGE: Not all luggage is accounted for (${luggage.length} of ${anserKey.LUGGAGE})`, BASE_DELAY);
    }
    const heavyLuggage = luggage.filter((l) => l.weight > 23)
    if (heavyLuggage.length === anserKey.HEAVY_LUGGAGE) {
        printToDiagnosticScreen("\t✅ HEAVY LUGGAGE: All heavy luggage is accounted for", BASE_DELAY * 3);
    } else {
        printToDiagnosticScreen(`\t❌ HEAVY LUGGAGE: Not all heavy luggage is accounted for (${heavyLuggage.length} of ${anserKey.HEAVY_LUGGAGE})`, BASE_DELAY * 3);
    }
}

function runPetsDiagnostic() {
    // Check pets
    if (pets.DOG.length === anserKey.DOGS) {
        printToDiagnosticScreen("✅ DOGS: All dogs are accounted for", BASE_DELAY * 5);
    } else {
        printToDiagnosticScreen(`❌ DOGS: Not all dogs are accounted for (${pets.DOG.length} of ${anserKey.DOGS})`, BASE_DELAY * 5);
    }

    // Check cats
    if (pets.CAT.length === anserKey.CATS) {
        printToDiagnosticScreen("✅ CATS: All cats are accounted for", BASE_DELAY * 7);
    } else {
        printToDiagnosticScreen(`❌ CATS: Not all cats are accounted for (${pets.CAT.length} of ${anserKey.CATS})`, BASE_DELAY * 7);
    }
}

function runShippingDiagnostic() {
    // Check shipping
    if (shipping.length === anserKey.SHIPPING) {
        printToDiagnosticScreen("✅ SHIPPING: All shipping is accounted for", BASE_DELAY * 9);
    } else {
        printToDiagnosticScreen(`❌ SHIPPING: Not all shipping is accounted for (${shipping.length} of ${anserKey.SHIPPING})`, BASE_DELAY * 9);
    }
}

function runDangerousGoodsDiagnostic() {
    // Check dangerous goods
    if (dangerousGoods.length === anserKey.DANGEROUS_GOODS) {
        printToDiagnosticScreen("✅ DANGEROUS GOODS: All dangerous goods are accounted for", BASE_DELAY * 12);
    } else {
        printToDiagnosticScreen(`❌ DANGEROUS GOODS: Not all dangerous goods are accounted for (${dangerousGoods.length} of ${anserKey.DANGEROUS_GOODS})`,BASE_DELAY * 12);
    }
}


function allAllowedProductsAccountedFor() {
    const totalSortedProducts = luggage.length + pets.DOG.length + pets.CAT.length + shipping.length + dangerousGoods.length;
    if(anserKey.totalAllowedProducts === totalSortedProducts){
        printToDiagnosticScreen("✅ All allowed products are accounted for", BASE_DELAY * 15);
    }
    else {
        printToDiagnosticScreen(`❌ All allowed products are not accounted for (${totalSortedProducts} of ${anserKey.totalAllowedProducts})`, BASE_DELAY * 15);
    }
}

function runDiagnostics() {
    // Check luggage
    runLuggageDiagnostic();
    runPetsDiagnostic();
    runShippingDiagnostic();
    runDangerousGoodsDiagnostic();
    allAllowedProductsAccountedFor();
}

window.addEventListener("load", getProducts);