document.getElementById('signupform').addEventListener('submit',function(event){
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const confirmPassword=document.getElementById('confirmPassword').value;

    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        document.getElementById('emailError').innerText="Please enter a valid email address.";
    }
    else{
        document.getElementById('emailError').innerText="";
    }

    if(password!==confirmPassword){
        document.getElementById('confirmError').innerText="Passwords do not match";
    }
    else{
        document.getElementById('confirmError').innerText="";
    }

    if(password.length<8){
        document.getElementById('passError').innerText="Password must be atleast 8 characters long.";
    }
})