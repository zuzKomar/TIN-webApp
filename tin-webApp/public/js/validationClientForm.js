function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const phoneInput = document.getElementById('phone');
    const peselInput = document.getElementById('pesel');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorPhoneNumber = document.getElementById('errorPhoneNumber');
    const errorPeselNumber = document.getElementById('errorPeselNumber');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const reqMessage2 = document.getElementById('errorMessage-validateError').innerText;
    const req260 = document.getElementById('errorMessage-260length').innerText;
    const req914 = document.getElementById('errorMessage-914length').innerText;
    const telErr = document.getElementById('errorMessage-telError').innerText;
    const req11 = document.getElementById('errorMessage-pesLenError').innerText;
    const pesErr = document.getElementById('errorMessage-pesellError').innerText;
    const req560 = document.getElementById('errorMessage-560length').innerText;
    const emailErr = document.getElementById('errorMessage-emaillError').innerText;
    const req530 = document.getElementById('errorMessage-530length').innerText;



    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([firstNameInput, lastNameInput, phoneInput,peselInput, emailInput, passwordInput], [errorFirstName, errorLastName, errorPhoneNumber,errorPeselNumber,errorEmail,errorPassword], errorsSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessage;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = req260;
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqMessage;
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = req260;
    }

    if (!checkRequired(phoneInput.value)) {
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhoneNumber.innerText = reqMessage;
    } else if (!checkTextLengthRange(phoneInput.value, 9, 14)) {
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhoneNumber.innerText = req914;
    } else if(!checkPhone(phoneInput.value)){
        valid=false;
        phoneInput.classList.add("error-input");
        errorPhoneNumber.innerText = telErr;
    }

    if (!checkRequired(peselInput.value)) {
        valid = false;
        peselInput.classList.add("error-input");
        errorPeselNumber.innerText = reqMessage;
    } else if (!checkTextLengthRange(peselInput.value, 11, 11)) {
        valid = false;
        peselInput.classList.add("error-input");
        errorPeselNumber.innerText = req11;
    } else if(!checkPesel(peselInput.value)){
        valid=false;
        peselInput.classList.add("error-input");
        errorPeselNumber.innerText = pesErr;
    }


    if(!checkRequired(emailInput.value)){
        valid=false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    }else if(!checkTextLengthRange(emailInput.value,5,60)){
        valid=false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = req560;
    }else if(!checkEmail(emailInput.value)){
        valid=false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = emailErr;
    }


    if(!checkRequired(passwordInput.value)){
        valid=false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    }else if(!checkTextLengthRange(passwordInput.value,5,30)){
        valid=false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = req530;
    }

    if (!valid) {
        errorsSummary.innerText = reqMessage2;
    }

    return valid;

}

