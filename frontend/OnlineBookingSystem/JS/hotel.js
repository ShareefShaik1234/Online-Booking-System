// ==========================================
// LOGIN PROTECTION
// ==========================================

const hotelLoggedIn = localStorage.getItem("isLoggedIn");

if (hotelLoggedIn !== "true") {

    alert("Please login first to access hotel booking.");

    window.location.replace("login.html");

}


// ==========================================
// INITIALIZE HOTEL PAGE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("HOTEL JS LOADED SUCCESSFULLY");

    const cityInput =
        document.getElementById("city");

    const hotelForm =
        document.getElementById("hotelForm");


    // ==========================================
    // SEARCH USING ENTER KEY
    // ==========================================

    if (cityInput) {

        cityInput.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchHotels();

                }

            }
        );

    }


    // ==========================================
    // HOTEL BOOKING FORM
    // ==========================================

    if (hotelForm) {

        hotelForm.addEventListener(
            "submit",
            bookHotel
        );

    }


    // Load bookings after page is ready
    loadHotels();

});


// ==========================================
// SEARCH HOTELS
// ==========================================

async function searchHotels() {

    const cityInput =
        document.getElementById("city");

    const result =
        document.getElementById("hotelSearchResult");


    if (!cityInput || !result) {

        console.error(
            "Hotel search elements not found."
        );

        return;

    }


    const city =
        cityInput.value.trim();


    if (city === "") {

        alert("Please enter a city name.");

        return;

    }


    result.innerHTML = `

        <div class="empty-route">

            <h3>🔄 Searching Hotels...</h3>

            <p>
                Please wait while we find hotels.
            </p>

        </div>

    `;


    try {

        const url =
            "https://reservix-backend.onrender.com/hotel/search?city=" +
            encodeURIComponent(city);


        console.log(
            "Searching hotels:",
            url
        );


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Server returned " +
                response.status
            );

        }


        const hotels =
            await response.json();


        console.log(
            "Hotel response:",
            hotels
        );


        let output = "";


        if (
            !Array.isArray(hotels) ||
            hotels.length === 0
        ) {

            output = `

                <div class="empty-route">

                    <h3>🏨 No Hotels Found</h3>

                    <p>
                        Try searching another city.
                    </p>

                </div>

            `;

        }

        else {

            hotels.forEach(
                function (hotel, index) {

                    const hotelName =
                        hotel.name ||
                        hotel.hotelName ||
                        "Hotel";


                    const address =
                        hotel.address ||
                        hotel.formatted ||
                        "Address not available";


                    output += `

                        <div class="hotel-card">

                            <h2>
                                🏨 ${escapeHtml(hotelName)}
                            </h2>

                            <p>
                                📍 ${escapeHtml(address)}
                            </p>

                            <button
                                type="button"
                                class="hotel-book-btn"
                                data-index="${index}"
                            >

                                Book Now

                            </button>

                        </div>

                    `;

                }
            );

        }


        result.innerHTML =
            output;


        // ==========================================
        // BOOK NOW BUTTONS
        // ==========================================

        if (Array.isArray(hotels)) {

            const buttons =
                result.querySelectorAll(
                    ".hotel-book-btn"
                );


            buttons.forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const index =
                                Number(
                                    this.dataset.index
                                );


                            const hotel =
                                hotels[index];


                            const hotelName =
                                hotel.name ||
                                hotel.hotelName ||
                                "Hotel";


                            selectHotel(
                                hotelName
                            );

                        }
                    );

                }
            );

        }

    }

    catch (error) {

        console.error(
            "HOTEL SEARCH ERROR:",
            error
        );


        result.innerHTML = `

            <div class="empty-route">

                <h3>
                    ❌ Unable to fetch hotels
                </h3>

                <p>
                    Please check the Spring Boot server and try again.
                </p>

            </div>

        `;

    }

}


// ==========================================
// SELECT HOTEL
// ==========================================

function selectHotel(hotelName) {

    const hotelNameInput =
        document.getElementById("hotelName");

    const hotelForm =
        document.getElementById("hotelForm");


    if (!hotelNameInput || !hotelForm) {

        console.error(
            "Hotel booking form elements not found."
        );

        return;

    }


    hotelNameInput.value =
        hotelName;


    hotelForm.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


// ==========================================
// BOOK HOTEL
// ==========================================

async function bookHotel(event) {

    event.preventDefault();


    const customerName =
        document.getElementById(
            "customerName"
        ).value.trim();


    const hotelName =
        document.getElementById(
            "hotelName"
        ).value.trim();


    const roomType =
        document.getElementById(
            "roomType"
        ).value.trim();


    const checkIn =
        document.getElementById(
            "checkIn"
        ).value;


    const checkOut =
        document.getElementById(
            "checkOut"
        ).value;


    const rooms =
        document.getElementById(
            "rooms"
        ).value;


    // ==========================================
    // VALIDATION
    // ==========================================

    if (
        customerName === "" ||
        hotelName === "" ||
        roomType === "" ||
        checkIn === "" ||
        checkOut === "" ||
        rooms === ""
    ) {

        alert(
            "Please fill all fields."
        );

        return;

    }


    if (checkOut < checkIn) {

        alert(
            "Check-out date cannot be before check-in date."
        );

        return;

    }


    if (
        Number(rooms) < 1 ||
        Number(rooms) > 10
    ) {

        alert(
            "Number of rooms must be between 1 and 10."
        );

        return;

    }


    const hotel = {

        customerName:
            customerName,

        hotelName:
            hotelName,

        roomType:
            roomType,

        checkIn:
            checkIn,

        checkOut:
            checkOut,

        rooms:
            parseInt(rooms)

    };


    try {

        const response =
            await fetch(
                "https://reservix-backend.onrender.com/hotel/book",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(hotel)

                }
            );


        const result =
            await response.text();


        alert(result);


        if (response.ok) {

            document
                .getElementById(
                    "hotelForm"
                )
                .reset();


            loadHotels();

        }

    }

    catch (error) {

        console.error(
            "HOTEL BOOKING ERROR:",
            error
        );


        alert(
            "Unable to connect to Spring Boot server."
        );

    }

}


// ==========================================
// LOAD HOTEL BOOKINGS
// ==========================================

async function loadHotels() {

    const bookingResult =
        document.getElementById(
            "bookingResult"
        );


    if (!bookingResult) {

        return;

    }


    try {

        const response =
            await fetch(
                "https://reservix-backend.onrender.com/hotel/view"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to fetch hotel bookings."
            );

        }


        const hotels =
            await response.json();


        let output = "";


        if (
            !Array.isArray(hotels) ||
            hotels.length === 0
        ) {

            output = `

                <tr>

                    <td colspan="8">

                        No Hotel Bookings Found

                    </td>

                </tr>

            `;

        }

        else {

            hotels.forEach(
                function (hotel) {

                    output += `

                        <tr>

                            <td>
                                ${hotel.id}
                            </td>

                            <td>
                                ${escapeHtml(
                                    hotel.customerName
                                )}
                            </td>

                            <td>
                                ${escapeHtml(
                                    hotel.hotelName
                                )}
                            </td>

                            <td>
                                ${escapeHtml(
                                    hotel.roomType
                                )}
                            </td>

                            <td>
                                ${escapeHtml(
                                    hotel.checkIn
                                )}
                            </td>

                            <td>
                                ${escapeHtml(
                                    hotel.checkOut
                                )}
                            </td>

                            <td>
                                ${hotel.rooms}
                            </td>

                            <td>

                                <button
                                    class="edit-btn"
                                    type="button"
                                    onclick="editHotel(${hotel.id})"
                                >

                                    Edit

                                </button>


                                <button
                                    class="delete-btn"
                                    type="button"
                                    onclick="deleteHotel(${hotel.id})"
                                >

                                    Delete

                                </button>

                            </td>

                        </tr>

                    `;

                }
            );

        }


        bookingResult.innerHTML =
            output;

    }

    catch (error) {

        console.error(
            "LOAD HOTEL BOOKINGS ERROR:",
            error
        );


        bookingResult.innerHTML = `

            <tr>

                <td colspan="8">

                    Unable to load bookings.

                </td>

            </tr>

        `;

    }

}


// ==========================================
// DELETE HOTEL
// ==========================================

async function deleteHotel(id) {

    if (
        !confirm(
            "Do you want to delete this booking?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(

                "https://reservix-backend.onrender.com/hotel/delete/" +
                id,

                {
                    method: "DELETE"
                }

            );


        const result =
            await response.text();


        alert(result);


        loadHotels();

    }

    catch (error) {

        console.error(
            "DELETE HOTEL ERROR:",
            error
        );


        alert(
            "Delete failed."
        );

    }

}


// ==========================================
// EDIT HOTEL
// ==========================================

function editHotel(id) {

    alert(
        "Edit feature will be added in the next version."
    );

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}