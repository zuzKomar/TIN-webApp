function validateForm() {
    const brandInput = document.getElementById('brand');
    const modelInput = document.getElementById('model');
    const yearInput = document.getElementById('year');
    const powerInput = document.getElementById('power');
    const capacityInput = document.getElementById('capacity');
    const costInput = document.getElementById('cost');

    const errorBrand = document.getElementById('errorBrand');
    const errorModel = document.getElementById('errorModel');
    const errorProdYear = document.getElementById('errorProdYear');
    const errorPower = document.getElementById('errorPower');
    const errorCapacity = document.getElementById('errorCapacity');
    const errorCost = document.getElementById('errorCost');
    const errorsSummary = document.getElementById('errorsSummary');
    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const reqMessage2 = document.getElementById('errorMessage-validateError').innerText;
    const req260 = document.getElementById('errorMessage-260length').innerText;
    const costErr = document.getElementById('errorMessage-costErr').innerText;
    const capacErr = document.getElementById('errorMessage-capacityErr').innerText;
    const powerErr = document.getElementById('errorMessage-powerErr').innerText;
    const yearErr = document.getElementById('errorMessage-yearErr').innerText;

    resetErrors([brandInput,modelInput,yearInput,powerInput,capacityInput,costInput], [errorBrand,errorModel,errorProdYear,errorPower,errorCapacity,errorCost], errorsSummary);

    let valid = true;

    if (!checkRequired(brandInput.value)) {
        valid = false;
        brandInput.classList.add("error-input");
        errorBrand.innerText = reqMessage;
    } else if (!checkTextLengthRange(brandInput.value, 2, 60)) {
        valid = false;
        brandInput.classList.add("error-input");
        errorBrand.innerText = req260;
    }

    if (!checkRequired(modelInput.value)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = reqMessage;
    } else if (!checkTextLengthRange(modelInput.value, 2, 60)) {
        valid = false;
        modelInput.classList.add("error-input");
        errorModel.innerText = req260;
    }

    if (!checkRequired(yearInput.value)) {
        valid = false;
        yearInput.classList.add("error-input");
        errorProdYear.innerText = reqMessage;
    } else if (!checkNumber(yearInput.value)) {
        valid = false;
        yearInput.classList.add("error-input");
        errorProdYear.innerText = yearErr;
    } else if(!checkNumberRange(yearInput.value, 1900,2000)){
        valid=false;
        yearInput.classList.add("error-input");

        if(yearInput.value<1900){
            errorProdYear.innerText=yearErr;
        }else{
            errorProdYear.innerText=yearErr;
        }

    }

    if (!checkRequired(powerInput.value)) {
        valid = false;
        powerInput.classList.add("error-input");
        errorPower.innerText = reqMessage;
    } else if (!checkNumber(powerInput.value)) {
        valid = false;
        powerInput.classList.add("error-input");
        errorPower.innerText = powerErr;
    } else if(!checkNumberRange(powerInput.value, 50,600)){
        valid=false;
        powerInput.classList.add("error-input");

        if(powerInput.value<50){
            errorPower.innerText=powerErr;
        }else{
            errorPower.innerText=powerErr;
        }
    }

    if (!checkRequired(capacityInput.value)) {
        valid = false;
        capacityInput.classList.add("error-input");
        errorCapacity.innerText =reqMessage;
    } else if (!checkNumber(capacityInput.value)) {
        valid = false;
        capacityInput.classList.add("error-input");
        errorCapacity.innerText = capacErr;
    } else if(!checkNumberRange(capacityInput.value, 1,10)){
        valid=false;
        capacityInput.classList.add("error-input");

        if(capacityInput.value<1.0){
            errorCapacity.innerText=capacErr;
        }else{
            errorCapacity.innerText=capacErr;
        }
    }

    if (!checkRequired(costInput.value)) {
        valid = false;
        costInput.classList.add("error-input");
        errorCost.innerText = reqMessage;
    } else if (!checkTextLengthRange(costInput.value, 2, 3)) {
        valid = false;
        costInput.classList.add("error-input");
        errorCost.innerText = costErr;
    } else if(!checkNumberRange(costInput.value, 50,400)){
        valid=false;
        costInput.classList.add("error-input");

        if(costInput.value< 50){
            errorCost.innerText=costErr;
        }else{
            errorCost.innerText=costErr;
        }

    }

    if (!valid) {
        errorsSummary.innerText = reqMessage2;
    }

    return valid;
}