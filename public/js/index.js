const loginBtn = document.getElementById('loginBtn');
const getStartedBtn = document.getElementById('getStartedBtn');
const tryNowBtn = document.getElementById('tryNowBtn');

loginBtn.onclick = async (e) => {
    e.preventDefault();

    try {
        window.location.href = '/login';
    } catch (error) {
        console.error("Fetch Failed : ", error);
    }
}

const redirectToCreateAccount = (e) => {
    e.preventDefault();

    try {
        window.location.href = '/create';
    } catch (error) {
        console.error("Fetch Failed : ", error);
    }
}

getStartedBtn.onclick = redirectToCreateAccount;
tryNowBtn.onclick = redirectToCreateAccount;