const loginHandler = async () => {

    const user_name= document.querySelector('#user_name').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (user_name && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({user_name, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginHandler);