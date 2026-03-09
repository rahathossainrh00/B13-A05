// Login Function
const signInButton = document.getElementById('signInButton');
if (signInButton) {
    signInButton.addEventListener('click', function () {
        const enteredUsername = document.getElementById('usernameField').value;
        const enteredPassword = document.getElementById('passwordField').value;

        if (enteredUsername !== 'admin') {
            alert("Invalid Username ");
        } else if (enteredPassword !== 'admin123') {
            alert("Invalid Password");
        } else {
            window.location.href = "dashboard.html";
        }


    });
}


// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}