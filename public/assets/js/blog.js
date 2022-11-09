const blogHandler = async () => {

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const date = document.querySelector('#date').value.trim();

    if (title && content && date) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({title,content,date}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/posts');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.blog-form').addEventListener('submit', blogHandler);