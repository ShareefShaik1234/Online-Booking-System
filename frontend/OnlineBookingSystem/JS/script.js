console.log("Reservix Loaded Successfully");


// ==========================================
// THEME TOGGLE
// ==========================================

const toggle = document.getElementById("theme-toggle");

if (toggle) {

    toggle.addEventListener("change", function () {

        document.body.classList.toggle("dark");

    });

}


// ==========================================
// LOGIN CHECK FOR BOOKING
// ==========================================

function checkLogin(bookingPage) {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {

        // User is logged in
        window.location.href = bookingPage;

    } else {

        // User is NOT logged in
        alert("Please login first to make a booking.");

        window.location.href = "login.html";

    }

}