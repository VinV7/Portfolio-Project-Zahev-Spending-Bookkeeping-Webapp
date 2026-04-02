const createAccountForm = document.getElementById("loginForm");

createAccountForm.onsubmit = async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch('http://localhost:7000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.success) {
        window.location.href = data.redirect;
        };
    } catch (error) {
        console.error('Error creating account:', error);
    }
};
