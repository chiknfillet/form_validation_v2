const form = document.querySelector('#form');
const inputs = document.querySelectorAll('input');

form.addEventListener('submit', (event) => {
    if (!validateFields()) {
        event.preventDefault();
    } else {
        form.reset();
    }
});

inputs.forEach(input => {
    const errorSpan = input.nextElementSibling;
    input.addEventListener('input', () => {
        validateField(input, errorSpan);
        input.classList.add("touched");
    });
});

function validateFields() {
    let allFieldsValid = true;
    inputs.forEach(input => {
        const errorSpan = input.nextElementSibling;
        const isValid = validateField(input, errorSpan)
        if (!isValid) {
            allFieldsValid = false;
            errorSpan.classList.remove('active')
        } else {
            errorSpan.classList.add('active')
        }
    });
    return allFieldsValid;
}

function validateField(input, errorSpan) {
    if (input.id === 'password-confirmation') {
        const password = document.querySelector('#password');
        if (input.value !== password.value) {
            errorSpan.textContent = 'Password does not match';
            return false;
        } else {
            errorSpan.textContent = '';
            return true;
        }
    } else if (!input.validity.valid) {
        showError(input, errorSpan);
        return false;
    } else {
        errorSpan.textContent = '';
        return true;
    }
}

function showError(input, error) {
    if (input.validity.valueMissing) {
        error.textContent = `You need to enter your ${input.id}`;
    } else if (input.validity.typeMismatch) {
        error.textContent = input.validationMessage;
    } else if (input.validity.tooShort) {
        error.textContent = `${input.id} should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
    } else if (input.validity.tooLong) {
        error.textContent = `${input.id} should have a maximum of ${input.maxLength} characters; you entered ${input.value.length}.`;
    }
}

