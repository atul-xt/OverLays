const login = document.getElementById('login');
const loginpass = document.getElementById('login-pass');
const loginemail = document.getElementById('login-email');

login.addEventListener('click', async () => {
    let email = loginemail.value;
    let password = loginpass.value;
    loginemail.style.outline = "none";
    loginpass.style.outline = "none";
    console.log(email, password);
    if (!email || !password) {
        alert("Fill All Information");
    } else {
        const userData = {
            email,
            password
        };

        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            };

            const response = await fetch('http://localhost:3000/login', requestOptions);

            if (!response.ok) {
                const responseData = await response.json();
                console.log(response);
                if (response.status === 401 && responseData.error === "User Not Found") {
                    alert("Invalid email");
                    // You might want to clear the password field here
                    loginemail.style.outline = "2px solid rgba(255, 0, 0, 0.8)";
                    loginemail.value = "";
                } else if (response.status === 401 && responseData.error === "Password mismatch") {
                    alert("Invalid password");
                    loginpass.style.outline = "2px solid rgba(255, 0, 0, 0.8)";
                    loginpass.value = "";
                } else {
                    // Display a generic error message for other server errors
                    alert("Login failed. Please try again later.");
                }
            } else {
                // Successful login
                const responseData = await response.json();
                loginemail.value = "";
                loginpass.value = "";
                alert(`Login Successfully`)
                // Handle successful response if needed
                // To store the token
                localStorage.setItem('jwtToken', responseData);
                // // To retrieve the token
                const token = localStorage.getItem('jwtToken');
                console.log("Login successful: ", responseData);
                if (token) {
                    window.location.href = 'index.html';
                } else {
                    alert('You are not an Authenticated User');
                }
            }
        } catch (error) {
            // Handle other types of errors (e.g., network issues)
            console.error('Fetch error:', error);
            alert("Login failed. Please check your internet connection and try again.");
        }
    }
});