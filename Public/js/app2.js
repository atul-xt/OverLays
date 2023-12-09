


// api fetching work 

const register = document.getElementById('register');
const firstNameRegister = document.getElementById('first-name');
const lastNameRegister = document.getElementById("last-name");
const emailRegister = document.getElementById('login-email');
const passwordRegister = document.getElementById('login-pass');



register.addEventListener('click', async () => {
    console.log(firstNameRegister, lastNameRegister, emailRegister, passwordRegister);
    let firstName = firstNameRegister.value;
    let lastName = lastNameRegister.value;
    let email = emailRegister.value;
    let password = passwordRegister.value;


    const userData = {
        firstName,
        lastName,
        email,
        password
    };

    console.log(userData);

    try {
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        };

        const response = await fetch('http://localhost:3000/register', requestOptions);

        if (!response.ok) {
            const responseData = await response.json();

            if (response.status === 400) {
                if (responseData.error === "User with this email already exists") {
                    alert("User with this email already exists");
                    email = userEmail.value = "";
                    userEmail.style.outline = "2px solid rgba(255, 0, 0, 0.8)"
                } else {
                    // Display a more specific error message for other 400 Bad Request scenarios
                    alert(`Bad Request: ${responseData.error || "Invalid request"}`);
                }
            } else {
                // Display a generic error message for other server errors
                alert("Registration failed. Please try again later.");
                console.error(`Server error: ${responseData.error || response.statusText}`);
            }
        } else {
            // Successful registration
            const responseData = await response.json();
            // Handle successful response if needed
            container.classList.remove("right-panel-active");
            console.log("Registration successful:", responseData);
            alert("Registration successful!");
        }
    } catch (error) {
        // Handle other types of errors (e.g., network issues)
        console.error('Fetch error:', error);
        alert("Registration failed. Please check your internet connection and try again.");
    }

});