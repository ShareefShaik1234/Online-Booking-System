document.getElementById("loginForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    let user = {
        username: username,
        password: password
    };

    try {

        let response = await fetch("https://reservix-backend.onrender.com/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)

        });

        let result = await response.text();

        console.log("Login response:", result);

        if (result.trim() === "Login Successful") {

            // SAVE LOGIN STATUS
            localStorage.setItem("isLoggedIn", "true");

            // SAVE USERNAME
            localStorage.setItem("username", username);

            console.log(
                "Login status:",
                localStorage.getItem("isLoggedIn")
            );

            alert("Login Successful");

            window.location.href = "dashboard.html";

        } else {

            alert(result);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

});