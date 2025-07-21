$(document).ready(function () {
    $('#send-btn').click(function () {
        const userInput = $('#chat-input').val().trim();
        if (!userInput) return;

        $('#chat-area').append(`<div class="message user">${userInput}</div>`);
        $('#chat-input').val('');

        $.post("http://localhost:5000/chatbot", { prompt: userInput }, function (response) {
            $('#chat-area').append(`<div class="message bot">${response.reply}</div>`);
            $('#chat-area').scrollTop($('#chat-area')[0].scrollHeight);
        }).fail(function () {
            $('#chat-area').append(`<div class="message bot">Error: Unable to get response.</div>`);
        });
    });
});
