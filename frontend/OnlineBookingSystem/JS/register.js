document.getElementById("registerForm").addEventListener("submit", async function(event){

    event.preventDefault();

    let username = document.getElementById("name").value;
    let password = document.getElementById("pass").value;
    let confirm = document.getElementById("confirm").value;

    if(username=="" || password==""){
        alert("Fill all fields");
        return;
    }

    if(password!=confirm){
        alert("Passwords do not match");
        return;
    }

    let user={
        username:username,
        password:password
    };

    let response=await fetch("https://reservix-backend.onrender.com/register",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(user)

    });

    let result=await response.text();

    alert(result);

    if(result=="Registration Successful"){
        window.location.href="login.html";
    }

});