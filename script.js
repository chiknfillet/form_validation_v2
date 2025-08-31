const form = document.querySelector('#form')

form.addEventListener('submit', (event) => {
    if (!form.checkVisibility()){
        event.preventDefault();
    }
})

const inputs = document.querySelectorAll('input')
inputs.forEach(input => {
    const errorSpan = input.nextElementSibling;
    input.addEventListener('input', () => {
        if (input.validity.valid) {
            errorSpan.textContent = ''
            errorSpan.className = 'error'
        } else {
            showError(input, errorSpan);
        }

        if (input.id === 'password-confirmation') {
            const password = document.querySelector('#password')
            if (input.value != password.value) {
                input.setCustomValidity("1")
                errorSpan.textContent = 'Password does not match';
            } else {
                input.setCustomValidity("")
                errorSpan.textContent = ''
            }
        }
    })
})


function showError(input, error) {
    if (input.validity.valueMissing) {
        error.textContent = `You need to enter your ${input.id}`
    } else if (input.validity.typeMismatch) {
        error.textContent = input.validationMessage;
    } else if (input.validity.tooShort) {
        error.textContent = `${input.id} should be at least ${input.minLength} characters; you entered ${input.value.length}.`
    } else if (input.validity.tooLong) {
        error.textContent = `${input.id} should have a maximum of ${input.maxLength} characters; you entered ${input.value.length}.`
    }
}

