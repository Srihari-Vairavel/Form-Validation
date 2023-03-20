const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const dob = document.getElementById("dob");
const gender = document.getElementById("gender");
const email = document.getElementById("email");
const mobNumber = document.getElementById("mobNumber");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_Password");
const check = document.getElementById("accept");

const passwordToggle = document.querySelector(".password-toggle");
const confirmPasswordToggle = document.querySelector(".confirm-password-toggle");

passwordToggle.addEventListener("click", togglePassword);
confirmPasswordToggle.addEventListener("click", togglePassword);

// TogglePassword function is to hide and show the password which is done by click event
function togglePassword() {
    const isPassword = this.classList.contains("password-toggle");
    const input = isPassword ? password : confirmPassword;
    const toggle = isPassword ? passwordToggle : confirmPasswordToggle;

    const type = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);

    const icon = type === "password" ? "fa-eye" : "fa-eye-slash";
    toggle.classList.remove(icon === "fa-eye-slash" ? "fa-eye" : "fa-eye-slash");
    toggle.classList.add(icon);
}

mobNumber.addEventListener("input", function (e) {
    const Mnumber = /[^\d]/g; //regex code for allowing only numeric characters
    mobNumber.value = mobNumber.value.replace(Mnumber, "");
});

form.addEventListener('submit', e => {
    e.preventDefault();//prevents the form from submitting
    checkInput(); //calling checkInput() function
    if (Valid()) {
        //By using local storage the values entered in the form is displayed in another html page
        let userData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            genderInputs: document.querySelector('input[name="gender"]:checked').value,
            email: document.getElementById("email").value,
            mobileNumber: document.getElementById("mobNumber").value,
            dob: document.getElementById("dob").value
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        window.location.href = "submit.html";
    }
});

//Valid function validate if all the fields are filled or not
function Valid() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const email = document.getElementById("email").value;
    const mobNumber = document.getElementById("mobNumber").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_Password").value;
    const accept = document.getElementById("accept").checked;

    if (firstName === "" || lastName === "" || !gender || email === "" || mobNumber === "" || password === "" || confirmPassword === "") {
        return false;
    }
    else if (!accept) {
        setError(check, 'Accept to the terms and conditions');
        return false;
    }
    return true;
}

// checkInput function validate the form
function checkInput() {
    const firstnameValue = firstName.value.trim();
    const lastnameValue = lastName.value.trim();
    const genderValue = document.querySelector('input[name="gender"]:checked');
    const emailValue = email.value.trim();
    const mobnumberValue = mobNumber.value.trim();
    const passwordValue = password.value.trim();
    const confirmpasswordValue = confirmPassword.value.trim();
    const checkValue = check.checked;
    if (firstnameValue === '') {
        setError(firstName, 'Firstname cannot be blank');
    }
    else if (firstnameValue.length < 5 || firstnameValue.length > 20) {
        setError(firstName, "Character Should have a minimum of 5 and maximum of 20");
    }
    else {
        setSuccess(firstName);
    }

    if (lastnameValue === '') {
        setError(lastName, 'Lastname cannot be blank');
    }
    else if (lastnameValue.length < 5 || lastnameValue.length > 20) {
        setError(lastName, 'Character Should have a minimum of 5 and maximum of 20');
    }
    else {
        setSuccess(lastName);
    }

    if (!genderValue) {
        setError(gender, 'Select Your Gender');
    }
    else {
        setSuccess(gender);
    }

    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailValue === '') {
        setError(email, 'Email cannot be blank');
    }
    else if (!emailValue.match(validEmail)) {
        setError(email, 'Enter a valid email');
    }
    else {
        setSuccess(email);
    }

    if (mobnumberValue === '') {
        setError(mobNumber, 'Mobile Number Cannot be Blank')
    }
    else if (mobnumberValue.length < 10) {
        setError(mobNumber, 'Mobile number should be 10 digits');
    }
    else if (mobnumberValue.length > 10) {
        setError(mobNumber, 'Mobile number should not be more than 10');
    }
    else {
        setSuccess(mobNumber);
    }
    // if (!checkValue) {
    //     setError(check, 'Accept to the terms and conditions');
    // }
    // else {
    //     setSuccess(check, '');
    // }

    let pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-z0-9])(?!.*\s)/;
    if (passwordValue === '') {
        setError(password, 'Password cannot be blank');
    }
    else if (!passwordValue.match(pass)) {
        setError(password, 'Password must contain 1 Upper,1 lower,1 numeric & 1 special character');
    }
    else if (passwordValue.length < 8 || passwordValue.length > 15) {
        setError(password, 'Password should be min of 8 and max of 14');
    }
    else {
        setSuccess(password);
    }

    if (confirmpasswordValue === '') {
        setError(confirmPassword, 'Confirm Password cannot be blank');
    }
    else if (!confirmpasswordValue.match(pass)) {
        setError(confirmPassword, 'Enter a valid Confirm Password');
    }
    else if (confirmpasswordValue != passwordValue) {
        setError(confirmPassword, 'Passwords are not matched');
    }
    else {
        setSuccess(confirmPassword);
    }
}

/**
 * Error Message will be displayed below textbox
 * @param {*} input element object
 * @param {*} message error message will be string
 */
function setError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error';
}

/**
 * Success Message 
 * @param {*} input element object
 * @param {*} message text box will be green if the values are valid
 */

function setSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
