const createAccountForm = document.getElementById("createAccountForm");

createAccountForm.onsubmit = async (e) => {
    e.preventDefault();

    if (!createAccountForm.reportValidity()) return

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch('http://localhost:7000/api/auth/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        });

        const data = await res.json();
        console.log(data);

        if (data.success) {
            window.location.href = data.redirect;
        }; 
        if (!data.success) {
            document.getElementById("signUpError").textContent = data.message || "An error occurred. Please try again.";
        }
    } catch (err) {
        console.error('Error creating account:', err);
    }
};
