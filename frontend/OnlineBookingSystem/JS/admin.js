// Load Users

async function loadUsers(){

    document.getElementById("tableTitle").innerHTML="Registered Users";

    let response=await fetch("https://reservix-backend.onrender.com/users");

    let users=await response.json();

    let head=`
    <tr>
        <th>ID</th>
        <th>Username</th>
    </tr>
    `;

    let body="";

    users.forEach(user=>{

        body+=`
        <tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
        </tr>
        `;

    });

    document.getElementById("tableHead").innerHTML=head;
    document.getElementById("tableBody").innerHTML=body;

}


// Movie

async function loadMovies(){

    document.getElementById("tableTitle").innerHTML="Movie Bookings";

    let response=await fetch("https://reservix-backend.onrender.com/movie/view");

    let movies=await response.json();

    let head=`
    <tr>
        <th>ID</th>
        <th>Customer</th>
        <th>Movie</th>
        <th>Theatre</th>
        <th>Show Time</th>
        <th>Seats</th>
    </tr>
    `;

    let body="";

    movies.forEach(movie=>{

        body+=`
        <tr>
            <td>${movie.id}</td>
            <td>${movie.customerName}</td>
            <td>${movie.movieName}</td>
            <td>${movie.theatreName}</td>
            <td>${movie.showTime}</td>
            <td>${movie.seats}</td>
        </tr>
        `;

    });

    document.getElementById("tableHead").innerHTML=head;
    document.getElementById("tableBody").innerHTML=body;

}


// Bus

async function loadBus(){

    document.getElementById("tableTitle").innerHTML="Bus Bookings";

    let response=await fetch("https://reservix-backend.onrender.com/bus/view");

    let buses=await response.json();

    let head=`
    <tr>
        <th>ID</th>
        <th>Passenger</th>
        <th>Bus</th>
        <th>Source</th>
        <th>Destination</th>
        <th>Date</th>
        <th>Seats</th>
    </tr>
    `;

    let body="";

    buses.forEach(bus=>{

        body+=`
        <tr>
            <td>${bus.id}</td>
            <td>${bus.passengerName}</td>
            <td>${bus.busName}</td>
            <td>${bus.source}</td>
            <td>${bus.destination}</td>
            <td>${bus.journeyDate}</td>
            <td>${bus.seats}</td>
        </tr>
        `;

    });

    document.getElementById("tableHead").innerHTML=head;
    document.getElementById("tableBody").innerHTML=body;

}


// Train

async function loadTrain(){

    document.getElementById("tableTitle").innerHTML="Train Bookings";

    let response=await fetch("https://reservix-backend.onrender.com/train/view");

    let trains=await response.json();

    let head=`
    <tr>
        <th>ID</th>
        <th>Passenger</th>
        <th>Train</th>
        <th>Source</th>
        <th>Destination</th>
        <th>Date</th>
        <th>Coach</th>
        <th>Seats</th>
    </tr>
    `;

    let body="";

    trains.forEach(train=>{

        body+=`
        <tr>
            <td>${train.id}</td>
            <td>${train.passengerName}</td>
            <td>${train.trainName}</td>
            <td>${train.source}</td>
            <td>${train.destination}</td>
            <td>${train.journeyDate}</td>
            <td>${train.coach}</td>
            <td>${train.seats}</td>
        </tr>
        `;

    });

    document.getElementById("tableHead").innerHTML=head;
    document.getElementById("tableBody").innerHTML=body;

}


// Hotel

async function loadHotels(){

    document.getElementById("tableTitle").innerHTML="Hotel Bookings";

    let response=await fetch("https://reservix-backend.onrender.com/hotel/view");

    let hotels=await response.json();

    let head=`
    <tr>
        <th>ID</th>
        <th>Customer</th>
        <th>Hotel</th>
        <th>Room</th>
        <th>Check In</th>
        <th>Check Out</th>
        <th>Rooms</th>
    </tr>
    `;

    let body="";

    hotels.forEach(hotel=>{

        body+=`
        <tr>
            <td>${hotel.id}</td>
            <td>${hotel.customerName}</td>
            <td>${hotel.hotelName}</td>
            <td>${hotel.roomType}</td>
            <td>${hotel.checkIn}</td>
            <td>${hotel.checkOut}</td>
            <td>${hotel.rooms}</td>
        </tr>
        `;

    });

    document.getElementById("tableHead").innerHTML=head;
    document.getElementById("tableBody").innerHTML=body;

}


// Default

loadUsers();