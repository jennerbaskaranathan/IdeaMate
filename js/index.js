$(document).ready(function () {
    $('form').on('submit', function (event) {
        event.preventDefault();

        const email = $('#mail').val();
        const password = $('#password').val();
        const data = `mail=${email}&password=${password}`;
        $.ajax({
            type: 'POST',
            url: '../php/index.php',
            data: data,
            success: function (response) {
                const data = JSON.parse(response);
                if (data.status === 'success') {
                    const urlparam = {
                        mail : email,
                        userId : data.userId
                    }
                    const params = new URLSearchParams(urlparam);
                    window.location.href = `../home.html?${params.toString()}`;
                } else {
                    $('#result').html("invalid UserId or Password");
                }
            }
        });
    });
});
