const signupForm = document.getElementById('signupform');

if (signupForm) {
    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        let isValid = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            document.getElementById('emailError').innerText = "Please enter a valid email address.";
            isValid = false;
        } else {
            document.getElementById('emailError').innerText = "";
        }

        if (password !== confirmPassword) {
            document.getElementById('confirmError').innerText = "Passwords do not match";
            isValid = false;
        } else {
            document.getElementById('confirmError').innerText = "";
        }

        if (password.length < 8) {
            document.getElementById('passError').innerText = "Password must be at least 8 characters long.";
            isValid = false;
        } else {
            document.getElementById('passError').innerText = "";
        }

        if (isValid) {
            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, confirmPassword })
                });

                const data = await response.json();

                if (data.success) {
                    alert("Registration Successful! Please login.");
                    window.location.href = 'login.html';
                } else {
                    alert(data.message || "Signup failed");
                }
            } catch (error) {
                console.error("Error during signup:", error);
                alert("Something went wrong with the server.");
            }
        }
    });
}

async function handleLogin(e) {
    e.preventDefault();
    console.log("Frontend: Login button clicked!");
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
}