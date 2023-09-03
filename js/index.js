
const randomMeals = document.querySelector(".randomMeals")
var displaySpicific = document.querySelector(".displaySpecific")
var displaydeep = document.querySelector(".foodCategorydeep")
var foodAreadeep = document.querySelector(".foodAreadeep")
var foodIngredientsdeep = document.querySelector(".foodIngredientsdeep")
var meals = ""
var mealCategory = ""
var mealsC = ""
var mealArea = ""
var mealA = ""
var mealIngredients = ""
var mealI = ""
const foodCategory = document.querySelector(".foodCategory")
const foodArea = document.querySelector(".foodArea")
const foodIngredients = document.querySelector(".foodIngredients")

const targetDiv = $('.navbar-side');
targetDiv.css('left', '-330px');


function showError(err) {
    const errorP = document.createElement("p")
    errorP.innerText = err
    searchbarletter.append(errorP)
}
// ================= side navbar ========================
var clicked = true;  // click the span ?

$(".open").click(function () {


    if (clicked) {
        $(".uls ul li ").removeClass("animate__animated animate__fadeOutDown")
        targetDiv.css('left', '0px');
        setTimeout(() => {
            $(".uls ul li:nth(0) ").addClass("animate__animated animate__fadeInUp")
        }, 5)
        setTimeout(() => {
            $(".uls ul li:nth(1) ").addClass("animate__animated animate__fadeInUp")
        }, 60)
        setTimeout(() => {
            $(".uls ul li:nth(2) ").addClass("animate__animated animate__fadeInUp")
        }, 120)
        setTimeout(() => {
            $(".uls ul li:nth(3) ").addClass("animate__animated animate__fadeInUp")
        }, 180)
        setTimeout(() => {
            $(".uls ul li:nth(4) ").addClass("animate__animated animate__fadeInUp")
        }, 180)

    }
    else {
        targetDiv.css('left', '-330px');
        $(".uls ul li ").removeClass("animate__animated animate__fadeInUp")
        $(".uls ul li ").addClass("animate__animated animate__fadeOutDown")
    }
    clicked = !clicked;
})
$(document).ready(function () {
    var navbar = $(".navbar-side");
    var offset = navbar.offset().top;

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > offset) {
            navbar.addClass("fixed");
        } else {
            navbar.removeClass("fixed");
        }
    });
});


// ==================loading screen ====================
function loadingScreen() {
    $(window).on("load", () => {
        $(".loading-screen").fadeOut(500)
    })
}
loadingScreen()
// =================  get random meal from  API ====================

async function GetRandomMeal() {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        // console.log(res)
        if (!res.ok) throw new Error("fetch error")
        const data = await res.json();
        console.log(data.meals)
        DisplayMeals(data.meals)
        meals = data.meals;
    }
    catch (err) {
        // showError(err)
    }
}
GetRandomMeal()
loadingScreen()


// =================display meal====================
function DisplayMeals(att) {
    loadingScreen()
    $(randomMeals).removeClass("d-none")
    var cartoona = "";
    for (let i = 0; i < 25; i++) {
        if (att[i] != undefined) {
            cartoona += `
                        <div class="col-md-3 overflow-hidden position-relative">
                            <img src="${att[i].strMealThumb}" alt="" class="w-100 rounded rounded-3 m-0 m-auto p-0">
                            <div class="layer bg-white d-flex align-items-center rounded rounded-3 overflow-hidden">
                                <h1 class="ps-2">${att[i].strMeal}</h1>
                            </div>
                        </div>`
        }
    }
    randomMeals.innerHTML = cartoona
}


// ===========   open specific meal  ==========
$(".randomMeals").click((e) => {
    let value = e.target.innerText
    console.log(value)
    displaySpecific(value, meals)
})
// ===========   display specific meal  ==========
function displaySpecific(value, meals) {
    loadingScreen()
    $(".displaySpecific").removeClass("d-none");
    $(".randomMeals").addClass("d-none");
    $(".foodCategory").addClass("d-none");
    $(foodCategory).addClass("d-none");
    $(foodAreadeep).addClass("d-none")
    var cartoona = "";
    for (var i = 0; i < meals.length; i++) {
        console.log(meals)
        if (meals[i].strMeal == value) {
            console.log(meals[i].strMeal);
            cartoona = `
          <div class="targetto col-md-4 text-white mt-5">
            <img src="${meals[i].strMealThumb}" alt="" class="w-100">
            <h1>${meals[i].strMeal}</h1>
          </div>
          <div class="col-md-8 text-white fw-bolder" style="font-size: 18px;">
            <h1 class="fw-bold mt-5">Instruction</h1>
            <p class="fw-lighter">${meals[i].strInstructions}</p>
            <h3 class="fw-bold">Area: <span class="fw-medium">${meals[i].strArea}</span></h3>
            <h3 class="fw-bold">Category: <span class="fw-medium">${meals[i].strCategory}</span></h3>
            <h3 class="fw-bold">Recipes:</h3>
            <div class="recipes d-flex justify-content-center row g-3 m-3">`;

            for (var j = 1; j <= 20; j++) {
                var ingredientNumber = `strIngredient${j}`;
                var measureNumber = `strMeasure${j}`;
                if (meals[i][ingredientNumber] !== "" && meals[i][ingredientNumber] !== null) {
                    cartoona += `<span class="py-2 bg-body-secondary rounded rounded-2 text-black text-center col-md-3 mx-3">${meals[i][measureNumber]} ${meals[i][ingredientNumber]}</span>`;
                }
            }

            cartoona += `
            </div>
            <h3>Tags:</h3>
            <div>
            <a target="_blank" href="${meals[i].strSource}" class="btn btn-outline-success mb-5 me-2">SOURCE</a>
            <a target="_blank" href="${meals[i].strYoutube}" class="btn btn-outline-danger mb-5">YOUTUBE</a>        
            </div>
          </div>`;

            $(".displaySpecific").html(cartoona);
        }
    }
}


// ==========  search   section    ============
$("#search").click(() => {

    targetDiv.css('left', '-330px');
    $(".searchpage").removeClass("d-none");
    $(".foodCategory").addClass("d-none");
    $(".displaySpecific").addClass("d-none");
    $(displaydeep).addClass("d-none");
    $(foodCategory).addClass("d-none");
    $(randomMeals).addClass("d-none");
    $("#rowData").addClass("d-none");

    // ===========   search by letter  ==========

    $("#searchByLetter").keyup(() => {
        var x = ""
        if ($("#searchByLetter").val() == "") {

            GetRandomMeal()
            loadingScreen()
        }
        clearTimeout(x)

        x = setTimeout(() => {
            loadingScreen()
            searchByLatter($("input").val());
        }, 1000)
        loadingScreen()

    })
    // ===========   search by name  ==========

    $("#searchByName").keyup(() => {
        var x = ""
        if ($("#searchByName").val() == "") {
            GetRandomMeal()
            loadingScreen()
        }
        clearTimeout(x)

        x = setTimeout(() => {
            console.log($("#searchByName").val())
            searchByName($("#searchByName").val());
        }, 1000)
        loadingScreen()

    })

    // ===========   get form api by first letter   ==========
    async function searchByLatter(val) {
        try {
            loadingScreen()
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`)
            // console.log(res)
            loadingScreen()
            if (!res.ok) throw new Error("fetch error")
            const data = await res.json();

            DisplaySearch(data.meals)
            meals = data.meals;
        }
        catch (err) {
            // showError(err)
        }
    }
    // ===========   get form api by name   ==========
    async function searchByName(valname) {
        try {
            loadingScreen()
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valname}`)
            // console.log(res)
            loadingScreen()
            if (!res.ok) throw new Error("fetch error")
            const data = await res.json();

            DisplaySearch(data.meals)
            meals = data.meals;
        }
        catch (err) {
            // showError(err)
        }
    }
    // ===========   display search result   ==========
    function DisplaySearch(val) {

        loadingScreen()
        $(".randomMeals").removeClass("d-none");
        var cartoona = "";
        for (let i = 0; i < val.length; i++) {
            cartoona += `
                        <div class="col-md-3 overflow-hidden position-relative">
                            <img src="${val[i].strMealThumb}" alt="" class="w-100 rounded rounded-3 m-0 m-auto p-0">
                            <div class="layer bg-white d-flex align-items-center rounded rounded-3 overflow-hidden">
                                <h1 class="ps-2">${val[i].strMeal}</h1>
                            </div>
                        </div>`

        }
        randomMeals.innerHTML = cartoona
    }
})
$("#Categories").click(() => {
    targetDiv.css('left', '-330px');
    $(".searchpage").addClass("d-none");
    $(foodCategory).removeClass("d-none");
    $(randomMeals).addClass("d-none");
    $(".displaySpecific").addClass("d-none");
    $(".foodCategorydeep").addClass("d-none");
    $(".foodCategory").addClass("d-none");
    $(".foodArea").addClass("d-none");
    $(".foodAreadeep").addClass("d-none");
    $(".foodIngredientsdeep").addClass("d-none");
    $("#rowData").addClass("d-none");

    // =================== category   ===========================
    // =================== category   ===========================
    // =================== category   ===========================
    // =================== category   ===========================
    // =================== category   ===========================
    // =================== category   ===========================
    // =================== category   ===========================
    // =================== category   ===========================
    // =================== category   ===========================

    // first get all category from all meals categores api
    getCategorie()
    async function getCategorie() {

        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
            if (!res.ok) throw new Error("fetch error")
            const data = await res.json();
            // console.log(...data.categories)
            DisplayCategory(data.categories)
            mealCategory = data.categories;
        }
        catch (err) {
            // showError(err)
        }

    }
    //display all category from all meals categores api
    function DisplayCategory(att) {
        $(".foodCategory").removeClass("d-none");

        var cartoona = "";
        for (let i = 0; i < 14; i++) {
            if (att[i] != undefined) {
                console.log(att[i])
                cartoona += `
                <div class="col-md-3 overflow-hidden position-relative">
                <img src="${att[i].strCategoryThumb}" alt="" class="w-100 rounded rounded-3 m-0 m-auto p-0">
                <div class="layer bg-white m-auto  rounded rounded-3 overflow-hidden">
                    <h1 class="text-center">${att[i].strCategory}</h1>
                    <p class="fs-6"> ${att[i].strCategoryDescription} </p>
                </div>
            </div>
            
            `
            }
        }
        foodCategory.innerHTML = cartoona
    }
})
/////////////////////////////////////////////////////////////////
// when click on category go for all meals from that category
$(foodCategory).click((e) => {
    loadingScreen()
    let value = e.target.innerText
    console.log(value)
    getCategorymeal(value)
})
// =================display category meal====================
async function getCategorymeal(value) {

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`) //value= category like seafood
        if (!res.ok) throw new Error("fetch error")
        const data = await res.json();
        DisplayCategorymeal(data.meals)
        mealsC = data.meals;
        console.log(mealsC)
    }
    catch (err) {
        // showError(err)
    }

}
function DisplayCategorymeal(value) {
    console.log("0")
    $(displaydeep).removeClass("d-none");
    $(foodCategory).addClass("d-none");
    console.log("1")
    var cartoona = "";

    for (let i = 0; i < value.length; i++) {
        cartoona += `
                        <div class="col-md-3 overflow-hidden position-relative">
                            <img src="${value[i].strMealThumb}" alt="" class="w-100 rounded rounded-3 m-0 m-auto p-0">
                            <div class="layer bg-white d-flex align-items-center rounded rounded-3 overflow-hidden">
                                <h1 class="ps-2">${value[i].strMeal}</h1>
                            </div>
                        </div>`

    }
    displaydeep.innerHTML = cartoona
    console.log("3")


}
$(displaydeep).click((e) => {
    let value = e.target.innerText
    console.log(value)
    $(displaydeep).addClass("d-none")
    // displaySpecific(value, mealsC)
    searchByName(value)
})

// ===========   search by name for display spicific to another page   ==========
async function searchByName(valname) {

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valname}`)
        // console.log(res)
        if (!res.ok) throw new Error("fetch error")
        const data = await res.json();
        displaySpecific(valname, data.meals)
        meals = data.meals;
    }
    catch (err) {
        // showError(err)
    }
}
// ===================   AREA     =======================
// +++++++++++++++++++   AREA     +++++++++++++++++++++++
$("#Area").click(() => {
    targetDiv.css('left', '-330px');
    $(".searchpage").addClass("d-none");
    $(foodArea).removeClass("d-none");
    $(randomMeals).addClass("d-none");
    $(".displaySpecific").addClass("d-none");
    $(".foodCategorydeep").addClass("d-none");
    $(".foodCategory").addClass("d-none");
    $(".foodArea").addClass("d-none");
    $(".foodAreadeep").addClass("d-none");
    $(".foodIngredientsdeep").addClass("d-none");
    $("#rowData").addClass("d-none");

    // +++++++++++++++++++   AREA     +++++++++++++++++++++++
    // +++++++++++++++++++  AREA     +++++++++++++++++++++++
    // +++++++++++++++++++   AREA     +++++++++++++++++++++++

    // first get all area from all meals categores api
    getArea()
    async function getArea() {

        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
            if (!res.ok) throw new Error("fetch error")
            const data = await res.json();

            DisplayArea(data.meals)
            mealArea = data.meals;
        }
        catch (err) {
            // showError(err)
        }

    }

    //display all category from all meals categores api
    function DisplayArea(att) {
        $(foodArea).removeClass("d-none");

        var cartoona = "";
        for (let i = 0; i < 14; i++) {
            if (att[i] != undefined) {
                console.log(att[i])
                cartoona += `
                <div value="${att[i].strArea}" class="col-md-3 overflow-hidden rounded rounded-2  ">
                <i class="fa-solid fa-house-laptop fa-4x w-100 text-white rounded rounded-3 m-0 m-auto p-0"></i>
                <h1 class=" text-white fs-4">${att[i].strArea}</h1>
            </div>
            
            `
            }
        }
        foodArea.innerHTML = cartoona
    }
})
$(foodArea).click((e) => {
    let value = e.target.innerText
    console.log(value)
    getAreameal(value)
})
// =================display Area meals====================
async function getAreameal(value) {

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`) //value= Area like america
        if (!res.ok) throw new Error("fetch error")
        const data = await res.json();
        DisplayAreameal(data.meals)
        mealA = data.meals;
        console.log(mealA)
    }
    catch (err) {
        // showError(err)
    }

}
function DisplayAreameal(value) {
    $(foodAreadeep).removeClass("d-none")
    console.log("0")
    $(displaydeep).removeClass("d-none");
    $(foodArea).addClass("d-none");
    console.log("1")
    var cartoona = "";

    for (let i = 0; i < value.length; i++) {
        cartoona += `
                        <div class=" col-md-3 overflow-hidden position-relative">
                            <img src="${value[i].strMealThumb}" alt="" class="w-100 rounded rounded-3 m-0 m-auto p-0">
                            <div class="layer bg-white d-flex align-items-center rounded rounded-3 overflow-hidden">
                                <h1 class="ps-2">${value[i].strMeal}</h1>
                            </div>
                        </div>`

    }
    foodAreadeep.innerHTML = cartoona
    console.log("3")


}
// =================  display Area meals specific  ====================
$(foodAreadeep).click((e) => {
    const text = e.target.textContent;
    console.log(text)
    $(foodAreadeep).addClass("d-none")
    searchByName(text)

})
//!^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// ===================   Ingredients     =======================
// +++++++++++++++++++   Ingredients     +++++++++++++++++++++++
$("#Ingredients").click(() => {
    targetDiv.css('left', '-330px');
    $(".searchpage").addClass("d-none");
    $(foodArea).addClass("d-none");
    $(foodIngredients).removeClass("d-none");
    $(randomMeals).addClass("d-none");
    $(".displaySpecific").addClass("d-none");
    $(".foodCategorydeep").addClass("d-none");
    $(".foodCategory").addClass("d-none");
    $(".foodArea").addClass("d-none");
    $(".foodAreadeep").addClass("d-none");
    $(".foodIngredientsdeep").addClass("d-none");
    $("#rowData").addClass("d-none");

    // +++++++++++++++++++   Ingredients     +++++++++++++++++++++++
    // +++++++++++++++++++   Ingredients     +++++++++++++++++++++++
    // +++++++++++++++++++   Ingredients     +++++++++++++++++++++++

    // first get all Ingredients from all meals categores api
    getIngredients()
    async function getIngredients() {

        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
            if (!res.ok) throw new Error("fetch error")
            const data = await res.json();

            DisplayIngredients(data.meals)
            mealIngredients = data.meals;
        }
        catch (err) {
            // showError(err)
        }

    }

    //display all Ingredients from all meals Ingredients api
    function DisplayIngredients(att) {
        $(foodIngredients).removeClass("d-none");
        var cartoona = "";
        for (let i = 0; i < 14; i++) {
            if (att[i] != undefined) {
                const words = att[i].strDescription.split(" ");
                const limitedWords = words.slice(0, 10);
                const limitedText = limitedWords.join(" ");

                cartoona += `
                <div class="col-md-3  overflow-hidden rounded rounded-2  ">
                <i class="fa-solid fa-drumstick-bite  text-white rounded rounded-3 m-0 ps-5 ms-3 p-0" style="font-size: 100px ;"></i>
                <h1 class=" text-white text-center fs-4">${att[i].strIngredient}</h1>
                <p class="text-white text-center"> ${limitedText}</p>
            </div>
            
            `
            }
        }
        foodIngredients.innerHTML = cartoona
    }
})
$(foodIngredients).click((e) => {
    let value = e.target.innerText
    console.log(value)
    getIngredientsmeal(value)
})
// =================display Ingredients meals====================
async function getIngredientsmeal(value) {

    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`) //value= Area like america
        if (!res.ok) throw new Error("fetch error")
        const data = await res.json();
        DisplayIngredientsmeal(data.meals)
        mealI = data.meals;
        console.log(mealI)
    }
    catch (err) {
        // showError(err)
    }

}
function DisplayIngredientsmeal(value) {
    $(foodIngredientsdeep).removeClass("d-none")
    console.log("0")
    // $(displaydeep).removeClass("d-none");
    $(foodIngredients).addClass("d-none");
    console.log("1")
    var cartoona = "";

    for (let i = 0; i < value.length; i++) {
        cartoona += `
                        <div class="col-md-3 overflow-hidden position-relative">
                            <img src="${value[i].strMealThumb}" alt="" class="w-100 rounded rounded-3 m-0 m-auto p-0">
                            <div class="layer bg-white d-flex align-items-center rounded rounded-3 overflow-hidden">
                                <h1 class="ps-2">${value[i].strMeal}</h1>
                            </div>
                        </div>`

    }
    foodIngredientsdeep.innerHTML = cartoona
    console.log("3")


}
// =================  display Ingredients meals specific  ====================
$(foodIngredientsdeep).click((e) => {
    const text = e.target.textContent;
    console.log(text)
    $(foodIngredientsdeep).addClass("d-none")
    searchByName(text)

})


// ++++++++++===================++++++++++++)____________________--------------------

$("#Contact").click(() => {
    targetDiv.css('left', '-330px');
    $(".searchpage").addClass("d-none");
    $(foodArea).addClass("d-none");
    $(".foodIngredients").addClass("d-none");
    $(foodIngredientsdeep).addClass("d-none");
    $(randomMeals).addClass("d-none");
    $(".displaySpecific").addClass("d-none");
    $(".foodCategorydeep").addClass("d-none");
    $(".contactinput").removeClass("d-none");
    $("#rowData").removeClass("d-none")
    showContacts()


})

function showContacts() {
    // rowData.innerHTML = `

    // `
    let nameInputTouched = false;
    let emailInputTouched = false;
    let phoneInputTouched = false;
    let ageInputTouched = false;
    let passwordInputTouched = false;
    let repasswordInputTouched = false;

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
        inputsValidation($("#nameInput").val())

    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
        inputsValidation()
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
        inputsValidation()
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
        inputsValidation()
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
        inputsValidation()
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
        inputsValidation()
    })
    submitBtn = document.getElementById("submitBtn")
    inputsValidation()


    console.log("yes")
    function inputsValidation(val) {
        if (nameInputTouched) {
            console.log("yes work 2")
            if (nameValidation()) {
                console.log("yes work 3")
                $("#nameAlert").removeClass("d-block").addClass("d-none");
                $("#nameInput").removeClass("valid").addClass("invalid");
            } else {
                $("#nameAlert").removeClass("d-none").addClass("d-block");
                $("#nameInput").removeClass("invalid").addClass("valid");
            }
        }
        if (emailInputTouched) {

            if (emailValidation()) {
                document.getElementById("emailAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("emailAlert").classList.replace("d-none", "d-block")

            }
        }

        if (phoneInputTouched) {
            if (phoneValidation()) {
                document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

            }
        }

        if (ageInputTouched) {
            if (ageValidation()) {
                document.getElementById("ageAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("ageAlert").classList.replace("d-none", "d-block")

            }
        }

        if (passwordInputTouched) {
            if (passwordValidation()) {
                document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

            }
        }
        if (repasswordInputTouched) {
            if (repasswordValidation()) {
                document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
            } else {
                document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

            }
        }


        if (nameValidation() &&
            emailValidation() &&
            phoneValidation() &&
            ageValidation() &&
            passwordValidation() &&
            repasswordValidation()) {
            submitBtn.removeAttribute("disabled")
        } else {
            submitBtn.setAttribute("disabled", true)
        }
    }
    function nameValidation() {
        const nameValid = $("#nameInput").val()
        var regxName = /^[a-zA-Z ]+$/
        return regxName.test(nameValid)
    }

    function emailValidation() {
        return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
    }

    function phoneValidation() {
        return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
    }

    function ageValidation() {
        return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
    }

    function passwordValidation() {
        return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
    }

    function repasswordValidation() {
        return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
    }

    $(document).ready(function () {
        $(submitBtn).click(function () {
            $("input").val("");
        });
    });
}