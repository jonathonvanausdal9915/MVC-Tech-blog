const workoutHandler = async () => {

    const name = document.querySelector('#name').value.trim();
    const activity = document.querySelector('#activity').value.trim();
    const date = document.querySelector('#date').value.trim();

    if (name && activity && date) {
        const response = await fetch('/api/workout', {
            method: 'POST',
            body: JSON.stringify({name, activity, date}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.workout-form').addEventListener('submit', workoutHandler);