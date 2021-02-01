function validateLogin(){
    const loginInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const reqMessage2 = document.getElementById('errorMessage-loginError').innerText;

    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorsSummary = document.getElementById('loginErrors');

    resetErrors([loginInput,passwordInput], [errorEmail,errorPassword], errorsSummary);

    let valid = true;

    if(!checkRequired(loginInput.value)){
        valid=false;
        loginInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    }else if(!checkEmail(loginInput.value)){
        valid=false;
        loginInput.classList.add("error-input");
    }

    if(!checkRequired(passwordInput.value)){
        valid=false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    }

    if(!valid){
       errorsSummary.innerText = reqMessage2;
    }

    return valid;
}