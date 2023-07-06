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
    LUGGAGE: 5,
    HEAVY_LUGGAGE: 3,
    DOGS: 5,
    CATS: 2,
    SHIPPING: 5,
    DANGEROUS_GOODS: 2,
    UNALLOWED_DANGEROUS_GOODS: 2,
    totalAllowedProducts: 19,
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

function printToDiagnosticScreen(message = "") {
    const p = document.createElement("p");
    p.innerText = "Checking..."
    diagnosticScreen.appendChild(p);
    setTimeout(() => {
        p.innerText = message;
    }, 300)
    
}

function sortAirportGoods() {
    products.forEach(function (product) {
        // Check prouct category
    });
}

function runLuggageDiagnostic() {
    if (luggage.length === anserKey.LUGGAGE) {
        printToDiagnosticScreen("✅ LUGGAGE: All luggage is accounted for");
    } else {
        printToDiagnosticScreen("❌ LUGGAGE: Not all luggage is accounted for");
    }
    const heavyLuggage = luggage.filter((l) => l.weight > 23)
    if (heavyLuggage.length === anserKey.HEAVY_LUGGAGE) {
        printToDiagnosticScreen("\t✅ HEAVY LUGGAGE: All heavy luggage is accounted for");
    } else {
        printToDiagnosticScreen("\t❌ HEAVY LUGGAGE: Not all heavy luggage is accounted for");
    }
}

function runPetsDiagnostic() {
    // Check pets
    if (pets.DOG.length === anserKey.DOGS) {
        printToDiagnosticScreen("✅ DOGS: All dogs are accounted for");
    } else {
        printToDiagnosticScreen("❌ DOGS: Not all dogs are accounted for");
    }

    // Check cats
    if (pets.CAT.length === anserKey.CATS) {
        printToDiagnosticScreen("✅ CATS: All cats are accounted for");
    } else {
        printToDiagnosticScreen("❌ CATS: Not all cats are accounted for");
    }
}

function runShippingDiagnostic() {
    // Check shipping
    if (shipping.length === anserKey.SHIPPING) {
        printToDiagnosticScreen("✅ SHIPPING: All shipping is accounted for");
    } else {
        printToDiagnosticScreen("❌ SHIPPING: Not all shipping is accounted for");
    }
}

function runDangerousGoodsDiagnostic() {
    // Check dangerous goods
    if (dangerousGoods.length === anserKey.DANGEROUS_GOODS) {
        printToDiagnosticScreen("✅ DANGEROUS GOODS: All dangerous goods are accounted for");
    } else {
        printToDiagnosticScreen("❌ DANGEROUS GOODS: Not all dangerous goods are accounted for");
    }
}

function allAllowedProductsAccountedFor() {
    const totalSortedProducts = luggage.length + pets.DOG.length + pets.CAT.length + shipping.length + dangerousGoods.length;
    if(anserKey.totalAllowedProducts === totalSortedProducts){
        printToDiagnosticScreen("✅ All allowed products are accounted for");
    }
    else {
        printToDiagnosticScreen("❌ All allowed products are not accounted for");
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