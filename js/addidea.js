$(document).ready(function () {
    const API_BASE = "http://localhost:5000";
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    $('#sbt-btn').click(function () {
        const idea = $('#inputs').val().trim();
        if (!idea) return alert("Please enter your idea.");
         const title = $("#project-title").val();
    console.log(title)
        $.post(API_BASE + '/classify', { idea: idea }, function (response) {
            $('#domain').html(response.domain);
            $('#type').html(response.idea_type);
    
            // Prepare data to store in MongoDB
            const dataToSave = {
                userid: userId, // If available from session or input, you can fill
                ideaid: "", // You can generate this server-side if needed
                idea: idea,
                summary: "", // Add logic if you generate summary elsewhere
                domain: response.domain,
                type: response.idea_type,
                likes: [],
                upvotes: [],
                downvotes: [],
                replies: [],
                title: title // You can extract a title if needed
            };
    
            // Send data to PHP to store in MongoDB
            $.ajax({
                url: 'php/saveidea.php',
                method: 'POST',
                data: {
                    userid: "", // optional
                    ideaid: "", // optional
                    idea: idea,
                    summary: "", // optional
                    domain: response.domain,
                    type: response.idea_type,
                    title: title // optional
                },
                success: function (res) {
                    console.log("Saved to MongoDB:", res);
                },
                error: function (xhr) {
                    console.error("Failed to save to MongoDB:", xhr.responseText);
                }
            });
            
        }).fail(function (xhr) {
            alert("Error classifying idea: " + xhr.responseText);
        });
    });
    

    $('#grammar').click(function () {
        const idea = $('#inputs').val().trim();
        if (!idea) return alert("Please enter your idea.");

        $.post(API_BASE + '/grammar', { idea: idea }, function (response) {
            //alert("Corrected: " + response.corrected);
            $('#inputs').val(response.corrected);
        }).fail(function (xhr) {
            alert("Error correcting grammar: " + xhr.responseText);
        });
    });
});
