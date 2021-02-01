function validateForm() {
    const carInput = document.getElementById('car_id');
    const clientInput = document.getElementById('client_id');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');
    const punishInput = document.getElementById('punishment');

    const errorCar = document.getElementById('errorCar');
    const errorClient = document.getElementById('errorClient');
    const errorDateFrom = document.getElementById('errorDateFrom');
    const errorDateTo = document.getElementById('errorDateTo');
    const errorPunish = document.getElementById('errorPunish');
    const errorsSummary = document.getElementById('errorsSummary');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const reqMessage2 = document.getElementById('errorMessage-validateError').innerText;
    const dateErr = document.getElementById('errorMessage-dateErr').innerText;
    const minRentErr = document.getElementById('errorMessage-minRentErr').innerText;
    const beforeErr = document.getElementById('errorMessage-beforeErr').innerText;
    const numErr = document.getElementById('errorMessage-numErr').innerText;
    const punishErr = document.getElementById('errorMessage-punishErr').innerText;

    resetErrors([carInput, clientInput, dateFromInput, dateToInput, punishInput], [errorCar, errorClient, errorDateFrom, errorDateTo, errorPunish], errorsSummary);

    let valid = true;

    if (!checkRequired(carInput.value)) {
        valid = false;
        carInput.classList.add("error-input");
        errorCar.innerText = reqMessage;
    }

    if (!checkRequired(clientInput.value)) {
        valid = false;
        clientInput.classList.add("error-input");
        errorClient.innerText = reqMessage;
    }


    if (!checkRequired(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = reqMessage;
    } else if (!checkDate(dateToInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = dateErr;
    } else if(dateToInput.value == dateFromInput.value){
        valid=false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = minRentErr;
    }

    if (!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = reqMessage;
    } else if (!checkDate(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = dateErr;
    }  else if (checkRequired(dateToInput.value) && checkDate(dateToInput.value)
        && !checkDateIfAfter(dateToInput.value, dateFromInput.value)) {
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = beforeErr;
    }

    if(punishInput.value !=null && punishInput.value.toString()!=='') {
        if (!checkNumber(punishInput.value)) {
            valid = false;
            punishInput.classList.add("error-input");
            errorPunish.innerText = numErr;
        } else if (!checkNumberRange(punishInput.value, 50, 200)) {
            valid = false;
            punishInput.classList.add("error-input");
            errorPunish.innerText =punishErr;
        }
    }


    if (!valid) {
        errorsSummary.innerText = reqMessage2;
    }

    return valid;

}