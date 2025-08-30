const form = document.querySelector('.form')

form.addEventListener('submit', (event) => {
    if (!form.checkVisibility()){
        event.preventDefault();
    }

    
})