$(document).ready(function () {
    $('form').on('submit', function (event) {
        event.preventDefault();
    });

    // Remove isEmailValid variable

    $("#setpassword, #confirmpassword").on('input', function () {
        validatePasswords();
    });

    $("#mail").on('input', function () {
        validateEmail();
    });

    $("#sbt-btn").click(function () {
        $("#mail-status").html("");
        $("#password-status").html("");

        const fname = $("#fname").val();
        const lname = $("#lname").val();
        const id = $("#mail").val();
        const setpass = $("#setpassword").val();
        const confirmpass = $("#confirmpassword").val();

        if (!fname || !lname || !id || !setpass || !confirmpass) {
            $("#password-status").html("All fields must be filled.");
            return;
        }

        if (setpass !== confirmpass) {
            $("#password-status").html("Passwords do not match.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(setpass)) {
            $("#password-status").html("Password must contain at least:<br> one special character<br>one uppercase letter<br>one lowercase letter<br>one digit<br>and be at least 8 characters long.");
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (id === "") {
            $("#mail-status").html("Email is required.");
            return;
        } else if (!emailRegex.test(id)) {
            $("#mail-status").html("Invalid email format.");
            return;
        }

        // AJAX email existence check
        $.ajax({
            type: 'POST',
            url: '../php/idvalidate.php',
            data: { mail: id },
            success: function (data) {
                if (data == "true") {
                    $("#mail-status").html("User with this mailId already exists");
                } else {
                    // Proceed with registration
                    $.ajax({
                        type: 'POST',
                        url: '../php/register.php',
                        data: {
                            mail: id,
                            password: confirmpass,
                            fname: fname,
                            lname: lname
                        },
                        success: function (data) {
                            localStorage.setItem('userEmail', data);
                            window.location.href = '../login.html'; // Change to your login page path
                        }
                    });
                }
            }
        });
    });

    function validatePasswords() {
        const setPassword = $("#setpassword").val();
        const confirmPassword = $("#confirmpassword").val();

        $("#password-status").html("");

        if (setPassword !== confirmPassword) {
            $("#password-status").html("Passwords do not match.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(setPassword)) {
            $("#password-status").html("Password must contain at least:<br> one special character<br>one uppercase letter<br>one lowercase letter<br>one digit<br>and be at least 8 characters long.");
        }
    }

    function validateEmail() {
        const email = $("#mail").val();
        $("#mail-status").html("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            $("#mail-status").html("Email is required.");
            return;
        } else if (!emailRegex.test(email)) {
            $("#mail-status").html("Invalid email format.");
            return;
        }
        // Optionally, you can keep the AJAX check here for live feedback, but it's not required for submit
    }
});
