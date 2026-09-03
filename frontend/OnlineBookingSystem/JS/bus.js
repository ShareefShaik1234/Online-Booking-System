// ==========================================
// LOGIN PROTECTION
// ==========================================

const busLoggedIn = localStorage.getItem("isLoggedIn");

if (busLoggedIn !== "true") {

    alert("Please login first to access bus booking.");

    window.location.replace("login.html");

}


// ==========================================
// INITIALIZE BUS PAGE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("BUS JS LOADED SUCCESSFULLY");

    loadBuses();

    const searchDestination =
        document.getElementById("searchDestination");

    const busForm =
        document.getElementById("busForm");


    // ==========================================
    // SEARCH USING ENTER KEY
    // ==========================================

    if (searchDestination) {

        searchDestination.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchRoute();

                }

            }
        );

    }


    // ==========================================
    // BUS BOOKING FORM
    // ==========================================

    if (busForm) {

        busForm.addEventListener(
            "submit",
            bookBus
        );

    }

});


// ==========================================
// SEARCH BUS ROUTE
// ==========================================

async function searchRoute() {

    const sourceElement =
        document.getElementById("searchSource");

    const destinationElement =
        document.getElementById("searchDestination");

    const resultElement =
        document.getElementById("routeResult");


    if (!sourceElement ||
        !destinationElement ||
        !resultElement) {

        console.error("Bus search elements not found.");

        return;

    }


    const source =
        sourceElement.value.trim();

    const destination =
        destinationElement.value.trim();


    if (source === "" ||
        destination === "") {

        alert(
            "Please enter both Source and Destination."
        );

        return;

    }


    resultElement.innerHTML = `

        <div class="empty-route">

            <h3>🔄 Searching Buses...</h3>

            <p>
                Finding buses from
                ${source}
                to
                ${destination}
            </p>

        </div>

    `;


    try {

        const url =
            "https://reservix-backend.onrender.com/bus/route?source=" +
            encodeURIComponent(source) +
            "&destination=" +
            encodeURIComponent(destination);


        console.log(
            "Searching bus route:",
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


        const route =
            await response.json();


        console.log(
            "Route response:",
            route
        );


        // ==========================================
        // ROUTE DISTANCE
        // ==========================================

        const distance =
            Number(route.distance) || 0;


        // ==========================================
        // ROUTE DURATION
        // ==========================================

        const totalMinutes =
            Number(route.duration) || 0;


        if (distance <= 0 ||
            totalMinutes <= 0) {

            throw new Error(
                "Invalid route information received."
            );

        }


        // ==========================================
        // BUS OPERATORS
        // ==========================================

        const busNames = [

            "APSRTC Super Luxury",

            "APSRTC Express",

            "Orange Travels",

            "VRL Travels",

            "KSRTC Airavat",

            "SRS Travels",

            "Kaveri Travels",

            "IntrCity SmartBus"

        ];


        // ==========================================
        // BUS TYPES
        // ==========================================

        const busTypes = [

            "AC Sleeper",

            "Volvo Multi Axle",

            "AC Seater",

            "Non AC Sleeper",

            "Luxury Coach",

            "AC Semi Sleeper",

            "Volvo AC Sleeper",

            "Premium Seater"

        ];


        // ==========================================
        // DIFFERENT DEPARTURE TIMES
        // ==========================================

        const departureTimes = [

            "06:30 AM",

            "08:00 AM",

            "10:15 AM",

            "01:30 PM",

            "04:00 PM",

            "06:45 PM",

            "09:30 PM",

            "11:15 PM"

        ];


        // ==========================================
        // CREATE MULTIPLE BUSES
        // ==========================================

        let output = "";


        for (let i = 0; i < busNames.length; i++) {


            // ======================================
            // DIFFERENT BUS TYPE
            // ======================================

            const busType =
                busTypes[i];


            // ======================================
            // DIFFERENT DEPARTURE
            // ======================================

            const departure =
                departureTimes[i];


            // ======================================
            // CALCULATE ARRIVAL TIME
            // ======================================

            const arrival =
                calculateArrivalTime(
                    departure,
                    totalMinutes
                );


            // ======================================
            // DIFFERENT FARE
            // ======================================

            const baseFare =
                Math.round(
                    distance * 1.5
                );


            const fare =
                baseFare +
                (i * 80);


            // ======================================
            // DIFFERENT SEATS
            // ======================================

            const seats =
                10 +
                Math.floor(
                    Math.random() * 31
                );


            // ======================================
            // DIFFERENT RATING
            // ======================================

            const rating =
                (
                    4.0 +
                    (Math.random() * 1.0)
                ).toFixed(1);


            // ======================================
            // CREATE BUS CARD
            // ======================================

            output += `

                <div class="bus-card">

                    <img
                        src="images/bus.png"
                        class="bus-image"
                        alt="Bus"
                    >


                    <h2>
                        🚌 ${busNames[i]}
                    </h2>


                    <h3>

                        ${route.source}

                        ➜

                        ${route.destination}

                    </h3>


                    <p>

                        ⭐ Rating

                        <strong>
                            ${rating}
                        </strong>

                    </p>


                    <p>

                        📏 Distance

                        <strong>

                            ${distance.toFixed(2)} KM

                        </strong>

                    </p>


                    <p>

                        ⏱ Duration

                        <strong>

                            ${formatDuration(totalMinutes)}

                        </strong>

                    </p>


                    <p>

                        💰 Fare

                        <strong>

                            ₹${fare}

                        </strong>

                    </p>


                    <p>

                        💺 Seats Available

                        <strong>

                            ${seats}

                        </strong>

                    </p>


                    <p>

                        🟢

                        <strong>

                            ${busType}

                        </strong>

                    </p>


                    <p>

                        🕘 Departure:

                        <strong>

                            ${departure}

                        </strong>

                    </p>


                    <p>

                        🕔 Arrival:

                        <strong>

                            ${arrival}

                        </strong>

                    </p>


                    <button
                        type="button"
                        onclick="selectRoute(
                            '${escapeQuotes(route.source)}',
                            '${escapeQuotes(route.destination)}'
                        )"
                    >

                        Book Now

                    </button>

                </div>

            `;

        }


        // ==========================================
        // DISPLAY ALL BUSES
        // ==========================================

        resultElement.innerHTML = `

            <div class="bus-results">

                <h2>

                    🚌 ${busNames.length}
                    Buses Available

                </h2>

                <p>

                    ${route.source}
                    ➜
                    ${route.destination}

                </p>


                <div class="bus-grid">

                    ${output}

                </div>

            </div>

        `;

    }


    catch (error) {

        console.error(
            "BUS ROUTE ERROR:",
            error
        );


        resultElement.innerHTML = `

            <div class="empty-route">

                <h3>
                    ❌ Unable to fetch buses
                </h3>

                <p>

                    Please check your
                    Spring Boot server
                    and try again.

                </p>

            </div>

        `;

    }

}


// ==========================================
// CALCULATE ARRIVAL TIME
// ==========================================

function calculateArrivalTime(
    departure,
    durationMinutes
) {

    const parts =
        departure.split(":");


    let hour =
        parseInt(parts[0]);

    const minutePart =
        parseInt(parts[1].substring(0, 2));


    const ampm =
        parts[1].substring(3);


    if (ampm === "PM" &&
        hour !== 12) {

        hour += 12;

    }


    if (ampm === "AM" &&
        hour === 12) {

        hour = 0;

    }


    const departureDate =
        new Date();

    departureDate.setHours(
        hour,
        minutePart,
        0,
        0
    );


    const arrivalDate =
        new Date(
            departureDate.getTime() +
            durationMinutes * 60000
        );


    let arrivalHour =
        arrivalDate.getHours();

    const arrivalMinutes =
        String(
            arrivalDate.getMinutes()
        ).padStart(2, "0");


    const arrivalAMPM =
        arrivalHour >= 12
            ? "PM"
            : "AM";


    if (arrivalHour === 0) {

        arrivalHour = 12;

    }

    else if (arrivalHour > 12) {

        arrivalHour -= 12;

    }


    return (
        String(arrivalHour).padStart(2, "0")
        + ":" +
        arrivalMinutes
        + " " +
        arrivalAMPM
    );

}


// ==========================================
// FORMAT DURATION
// ==========================================

function formatDuration(totalMinutes) {

    const hours =
        Math.floor(totalMinutes / 60);


    const minutes =
        Math.round(totalMinutes % 60);


    if (hours === 0) {

        return minutes +
            " Minutes";

    }


    if (minutes === 0) {

        return hours +
            " Hours";

    }


    return (
        hours +
        " Hours " +
        minutes +
        " Minutes"
    );

}


// ==========================================
// ESCAPE QUOTES
// ==========================================

function escapeQuotes(value) {

    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");

}


// ==========================================
// SELECT ROUTE
// ==========================================

function selectRoute(
    source,
    destination
) {

    const sourceInput =
        document.getElementById("source");

    const destinationInput =
        document.getElementById("destination");

    const busForm =
        document.getElementById("busForm");


    if (!sourceInput ||
        !destinationInput ||
        !busForm) {

        console.error(
            "Bus booking form elements not found."
        );

        return;

    }


    sourceInput.value =
        source;


    destinationInput.value =
        destination;


    busForm.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


// ==========================================
// BOOK BUS
// ==========================================

async function bookBus(event) {

    event.preventDefault();


    const customerName =
        document.getElementById(
            "customerName"
        ).value.trim();


    const source =
        document.getElementById(
            "source"
        ).value.trim();


    const destination =
        document.getElementById(
            "destination"
        ).value.trim();


    const journeyDate =
        document.getElementById(
            "journeyDate"
        ).value;


    const seats =
        document.getElementById(
            "seats"
        ).value;


    // ==========================================
    // VALIDATION
    // ==========================================

    if (
        customerName === "" ||
        source === "" ||
        destination === "" ||
        journeyDate === "" ||
        seats === ""
    ) {

        alert(
            "Please fill all fields."
        );

        return;

    }


    // ==========================================
    // DATE VALIDATION
    // ==========================================

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    if (journeyDate < today) {

        alert(
            "Journey Date cannot be in the past."
        );

        return;

    }


    // ==========================================
    // SEAT VALIDATION
    // ==========================================

    if (
        Number(seats) < 1 ||
        Number(seats) > 10
    ) {

        alert(
            "Seats must be between 1 and 10."
        );

        return;

    }


    // ==========================================
    // BUS OBJECT
    // ==========================================

    const bus = {

        customerName:
            customerName,

        source:
            source,

        destination:
            destination,

        journeyDate:
            journeyDate,

        seats:
            parseInt(seats)

    };


    try {

        const response =
            await fetch(
                "https://reservix-backend.onrender.com/bus/book",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(bus)

                }
            );


        const result =
            await response.text();


        alert(result);


        if (response.ok) {

            document
                .getElementById("busForm")
                .reset();


            loadBuses();

        }

    }


    catch (error) {

        console.error(
            "BUS BOOKING ERROR:",
            error
        );


        alert(
            "Unable to connect to Spring Boot Server."
        );

    }

}


// ==========================================
// LOAD BUS BOOKINGS
// ==========================================

async function loadBuses() {

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
                "https://reservix-backend.onrender.com/bus/view"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to fetch bookings."
            );

        }


        const buses =
            await response.json();


        let output = "";


        if (
            !buses ||
            buses.length === 0
        ) {

            output = `

                <tr>

                    <td colspan="7">

                        No Bus Bookings Found

                    </td>

                </tr>

            `;

        }

        else {

            // Latest booking first

            const latestBuses =
                [...buses].reverse();


            latestBuses.forEach(
                function(bus) {

                    output += `

                        <tr>

                            <td>
                                ${bus.id}
                            </td>

                            <td>
                                ${bus.customerName}
                            </td>

                            <td>
                                ${bus.source}
                            </td>

                            <td>
                                ${bus.destination}
                            </td>

                            <td>
                                ${bus.journeyDate}
                            </td>

                            <td>
                                ${bus.seats}
                            </td>

                            <td>

                                <button
                                    class="edit-btn"
                                    type="button"
                                    onclick="editBus(${bus.id})"
                                >

                                    Edit

                                </button>


                                <button
                                    class="delete-btn"
                                    type="button"
                                    onclick="deleteBus(${bus.id})"
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
            "LOAD BUS BOOKINGS ERROR:",
            error
        );


        bookingResult.innerHTML = `

            <tr>

                <td colspan="7">

                    Unable to load bookings.

                </td>

            </tr>

        `;

    }

}


// ==========================================
// DELETE BUS
// ==========================================

async function deleteBus(id) {

    if (
        !confirm(
            "Are you sure you want to delete this booking?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(

                "https://reservix-backend.onrender.com/bus/delete/" +
                id,

                {

                    method: "DELETE"

                }

            );


        const result =
            await response.text();


        alert(result);


        loadBuses();

    }


    catch (error) {

        console.error(
            "DELETE BUS ERROR:",
            error
        );


        alert(
            "Unable to delete booking."
        );

    }

}


// ==========================================
// EDIT BUS
// ==========================================

function editBus(id) {

    alert(
        "Edit feature will be added in the next version."
    );

}