const signupHandler = async () => {

    const name = document.querySelector('#first-name').value.trim();
    const last_name = document.querySelector('#last-name').value.trim();
    const gender = document.querySelector('#gender').value.trim();
    const age = document.querySelector('#age').value.trim();
    const height = document.querySelector('#height').value.trim();
    const weight = document.querySelector('#weight').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (name && last_name && gender && age && height && weight && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({name, last_name, gender, age, height, weight, email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#signupbtn').addEventListener('submit', signupHandler);