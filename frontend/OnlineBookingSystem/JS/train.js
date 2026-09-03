// ==========================================
// LOGIN PROTECTION
// ==========================================

const trainLoggedIn = localStorage.getItem("isLoggedIn");

if (trainLoggedIn !== "true") {

    alert("Please login first to access train booking.");

    window.location.replace("login.html");

}


// ==========================================
// STATION CODE MAPPING
// ==========================================

const stationCodes = {

    "hyderabad": "HYB",
    "secunderabad": "SC",
    "bangalore": "SBC",
    "bengaluru": "SBC",
    "chennai": "MAS",
    "tirupati": "TPTY",
    "vijayawada": "BZA",
    "visakhapatnam": "VSKP",
    "vizag": "VSKP",
    "delhi": "NDLS",
    "new delhi": "NDLS",
    "mumbai": "CSMT",
    "kolkata": "HWH",
    "pune": "PUNE",
    "warangal": "WL",
    "guntur": "GNT",
    "nellore": "NLR",
    "kadapa": "HX",
    "anantapur": "ATP",
    "madanapalle": "MPL",
    "madanapalli": "MPL"

};


// ==========================================
// SEARCH TRAIN
// ==========================================

async function searchTrain() {

    const searchSource = document.getElementById("searchSource");
    const searchDestination = document.getElementById("searchDestination");
    const trainResult = document.getElementById("trainResult");

    if (!searchSource || !searchDestination || !trainResult) {
        console.error("Train search elements not found.");
        return;
    }

    const sourceCity = searchSource.value.trim().toLowerCase();
    const destinationCity = searchDestination.value.trim().toLowerCase();

    if (sourceCity === "" || destinationCity === "") {

        alert("Please enter both Source and Destination.");
        return;

    }

    const source = stationCodes[sourceCity];
    const destination = stationCodes[destinationCity];

    if (!source || !destination) {

        alert(
            "Station not supported.\n\nSupported examples:\nHyderabad, Secunderabad, Bangalore, Chennai, Tirupati, Vijayawada, Visakhapatnam, Delhi, Mumbai, Kolkata, Pune"
        );

        return;

    }

    trainResult.innerHTML = `
        <div class="empty-route">
            <h3>🔄 Searching Trains...</h3>
            <p>Please wait.</p>
        </div>
    `;

    try {

        const today = new Date();

        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();

        const date = dd + "-" + mm + "-" + yyyy;

        const url =
            "https://reservix-backend.onrender.com/train/search" +
            "?source=" + encodeURIComponent(source) +
            "&destination=" + encodeURIComponent(destination) +
            "&date=" + encodeURIComponent(date);

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error(
                "Train API returned HTTP " + response.status
            );

        }

        const result = await response.json();

        console.log("Train API Response:", result);

        displayTrains(result);

    }

    catch (error) {

        console.error("Train Search Error:", error);

        trainResult.innerHTML = `
            <div class="empty-route">
                <h3>❌ Unable to fetch trains</h3>
                <p>
                    Please check whether the Spring Boot server and Train API are running.
                </p>
            </div>
        `;

    }

}


// ==========================================
// DISPLAY TRAINS
// ==========================================

function displayTrains(result) {

    const trainResult = document.getElementById("trainResult");

    if (!trainResult) {
        return;
    }

    let trains = [];

    /*
     * Handle different possible backend response structures.
     */

    if (Array.isArray(result)) {

        trains = result;

    }
    else if (
        result &&
        result.data &&
        Array.isArray(result.data.trains)
    ) {

        trains = result.data.trains;

    }
    else if (
        result &&
        Array.isArray(result.trains)
    ) {

        trains = result.trains;

    }

    if (trains.length === 0) {

        trainResult.innerHTML = `
            <div class="empty-route">
                <h3>🚆 No Trains Found</h3>
                <p>
                    No trains are available for this route.
                </p>
            </div>
        `;

        return;

    }

    let output = "";

    trains.forEach(function(train) {

        const trainName =
            train.train_name ||
            train.trainName ||
            "Unknown Train";

        const trainNo =
            train.train_no ||
            train.trainNo ||
            "N/A";

        const fromStation =
            train.from_stn_name ||
            train.fromStation ||
            "Source";

        const toStation =
            train.to_stn_name ||
            train.toStation ||
            "Destination";

        const fromTime =
            train.from_time ||
            train.fromTime ||
            "N/A";

        const toTime =
            train.to_time ||
            train.toTime ||
            "N/A";

        const travelTime =
            train.travel_time ||
            train.travelTime ||
            "N/A";

        const fare =
            Math.floor(Math.random() * 1200) + 400;

        const seats =
            Math.floor(Math.random() * 150) + 40;

        const rating =
            (4 + Math.random()).toFixed(1);

        const coaches = [
            "SL",
            "3A",
            "2A",
            "CC",
            "EC"
        ];

        const coach =
            coaches[Math.floor(Math.random() * coaches.length)];

        /*
         * Store values safely in data attributes instead of
         * putting movie/train names directly inside onclick.
         */

        output += `

        <div class="train-card">

            <h2>
                🚆 ${escapeHtml(trainName)}
            </h2>

            <h3>
                Train No : ${escapeHtml(trainNo)}
            </h3>

            <p class="rating">
                ⭐⭐⭐⭐⭐ ${rating}
            </p>

            <p>
                🚉
                <strong>
                    ${escapeHtml(fromStation)}
                    ➜
                    ${escapeHtml(toStation)}
                </strong>
            </p>

            <hr>

            <p>
                🕒 Departure
                <strong>
                    ${escapeHtml(fromTime)}
                </strong>
            </p>

            <p>
                🕔 Arrival
                <strong>
                    ${escapeHtml(toTime)}
                </strong>
            </p>

            <p>
                ⏳ Duration
                <strong>
                    ${escapeHtml(travelTime)}
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
                🚪 Coach
                <strong>
                    ${coach}
                </strong>
            </p>

            <p class="available">
                🟢 Available
            </p>

            <button
                type="button"
                class="train-book-btn"
                data-train="${escapeAttribute(trainName)}"
                data-source="${escapeAttribute(fromStation)}"
                data-destination="${escapeAttribute(toStation)}">

                Book Now

            </button>

        </div>

        `;

    });

    trainResult.innerHTML = output;


    // Attach Book Now events

    const buttons =
        trainResult.querySelectorAll(".train-book-btn");

    buttons.forEach(function(button) {

        button.addEventListener("click", function() {

            selectTrain(
                this.dataset.train,
                this.dataset.source,
                this.dataset.destination
            );

        });

    });

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHtml(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================================
// ESCAPE ATTRIBUTE
// ==========================================

function escapeAttribute(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}


// ==========================================
// AUTO FILL TRAIN BOOKING FORM
// ==========================================

function selectTrain(trainName, source, destination) {

    const trainNameInput =
        document.getElementById("trainName");

    const sourceInput =
        document.getElementById("source");

    const destinationInput =
        document.getElementById("destination");

    const trainForm =
        document.getElementById("trainForm");

    if (!trainNameInput ||
        !sourceInput ||
        !destinationInput ||
        !trainForm) {

        console.error("Train booking form elements not found.");

        return;

    }

    trainNameInput.value = trainName;
    sourceInput.value = source;
    destinationInput.value = destination;

    trainForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// ==========================================
// TRAIN BOOKING
// ==========================================

const trainForm = document.getElementById("trainForm");

if (trainForm) {

    trainForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const passengerName =
                document.getElementById("passengerName").value.trim();

            const trainName =
                document.getElementById("trainName").value.trim();

            const source =
                document.getElementById("source").value.trim();

            const destination =
                document.getElementById("destination").value.trim();

            const journeyDate =
                document.getElementById("journeyDate").value;

            const coach =
                document.getElementById("coach").value;

            const seats =
                document.getElementById("seats").value;


            if (
                passengerName === "" ||
                trainName === "" ||
                source === "" ||
                destination === "" ||
                journeyDate === "" ||
                coach === "" ||
                seats === ""
            ) {

                alert("Please fill all fields.");
                return;

            }


            if (parseInt(seats) < 1) {

                alert("Seats must be at least 1.");
                return;

            }


            const today =
                new Date().toISOString().split("T")[0];

            if (journeyDate < today) {

                alert("Journey Date cannot be in the past.");
                return;

            }


            const train = {

                passengerName: passengerName,

                trainName: trainName,

                source: source,

                destination: destination,

                journeyDate: journeyDate,

                coach: coach,

                seats: parseInt(seats)

            };


            try {

                const response = await fetch(
                    "https://reservix-backend.onrender.com/train/book",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(train)

                    }
                );


                const result =
                    await response.text();

                alert(result);


                if (response.ok) {

                    trainForm.reset();

                    loadTrain();

                }

            }

            catch (error) {

                console.error(
                    "Train Booking Error:",
                    error
                );

                alert(
                    "Unable to connect to Spring Boot server."
                );

            }

        }
    );

}


// ==========================================
// LOAD TRAIN BOOKINGS
// ==========================================

async function loadTrain() {

    const bookingResult =
        document.getElementById("bookingResult");

    if (!bookingResult) {
        return;
    }

    try {

        const response =
            await fetch(
                "https://reservix-backend.onrender.com/train/view"
            );

        if (!response.ok) {

            throw new Error(
                "Unable to fetch train bookings."
            );

        }

        const trains =
            await response.json();

        let output = "";


        if (!Array.isArray(trains) ||
            trains.length === 0) {

            output = `
                <tr>
                    <td colspan="9">
                        No Train Bookings Found
                    </td>
                </tr>
            `;

        }
        else {

            trains.forEach(function(train) {

                output += `

                <tr>

                    <td>${train.id}</td>

                    <td>${escapeHtml(train.passengerName)}</td>

                    <td>${escapeHtml(train.trainName)}</td>

                    <td>${escapeHtml(train.source)}</td>

                    <td>${escapeHtml(train.destination)}</td>

                    <td>${escapeHtml(train.journeyDate)}</td>

                    <td>${escapeHtml(train.coach)}</td>

                    <td>${train.seats}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editTrain(${train.id})">

                            Edit

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteTrain(${train.id})">

                            Delete

                        </button>

                    </td>

                </tr>

                `;

            });

        }

        bookingResult.innerHTML = output;

    }

    catch (error) {

        console.error(
            "Load Train Bookings Error:",
            error
        );

        bookingResult.innerHTML = `
            <tr>
                <td colspan="9">
                    Unable to load train bookings.
                </td>
            </tr>
        `;

    }

}


// ==========================================
// DELETE TRAIN BOOKING
// ==========================================

async function deleteTrain(id) {

    if (!confirm("Delete this booking?")) {
        return;
    }

    try {

        const response = await fetch(
            "https://reservix-backend.onrender.com/train/delete/" + id,
            {
                method: "DELETE"
            }
        );


        const result =
            await response.text();

        alert(result);

        loadTrain();

    }

    catch (error) {

        console.error(
            "Delete Train Error:",
            error
        );

        alert("Unable to delete booking.");

    }

}


// ==========================================
// EDIT TRAIN BOOKING
// ==========================================

function editTrain(id) {

    alert(
        "Edit feature will be added in the next version."
    );

}


// ==========================================
// ENTER KEY SEARCH
// ==========================================

const searchDestination =
    document.getElementById("searchDestination");

if (searchDestination) {

    searchDestination.addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchTrain();

            }

        }
    );

}


// ==========================================
// PAGE LOAD
// ==========================================

window.addEventListener("load", function() {

    loadTrain();

});