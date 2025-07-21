$(document).ready(function () {
    // Fetch feeds (existing code)
    function loadFeeds() {
        $.ajax({
            url: 'php/getFeeds.php',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const container = $('#contents');
                container.empty();
                data.forEach(feed => {
                    const likeCount = feed.likes ? feed.likes.length : 0;
                    const upvoteCount = feed.upvotes ? feed.upvotes.length : 0;
                    const downvoteCount = feed.downvotes ? feed.downvotes.length : 0;
                    const replyCount = feed.replies ? feed.replies.length : 0;

                    const contentDiv = `
                        <div class="content">
                            <div class="row">
                                <div class="col-3">
                                    <p class="heading id">${feed.name}</p>
                                </div>
                                <div class="col"></div>
                            </div>
                            <p class="query">${feed.query}</p>
                            <div class="row content-options">
                                <div class="col-1 content-option">
                                    <i class="bi bi-heart fs-5"></i>
                                    <p class="count">${likeCount}</p>
                                </div>
                                <div class="col-1 content-option">
                                    <i class="bi bi-sort-up fs-5"></i>
                                    <p class="count">${upvoteCount}</p>
                                </div>
                                <div class="col-1 content-option">
                                    <i class="bi bi-sort-down fs-5"></i>
                                    <p class="count">${downvoteCount}</p>
                                </div>
                                <div class="col-1 content-option">
                                    <i class="bi bi-chat-left-text fs-5"></i>
                                    <p class="count">${replyCount}</p>
                                </div>
                                <div class="col-1 content-option">
                                    <i class="bi bi-bookmark fs-5"></i>
                                </div>
                            </div>
                        </div>
                    `;
                    container.append(contentDiv);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error loading feeds:", error);
            }
        });
    }
const urlParams = new URLSearchParams(window.location.search);
const userId = parseInt(urlParams.get('userId'));
const mailid = urlParams.get('mail');
    loadFeeds();

    // Show popup form on plus click
    $('#add-feed').on('click', function () {
        $('#popup-form').fadeIn();
    });

    $('#add-idea').on('click', function () {
        window.location.href = "../addidea.html?userId="+userId;
    });
    $('#feed').click(function(){
        loadFeeds();
        $('#content-title').html('Feed')
    });
    // Handle post feed
    $('#post-feed').on('click', function () {
        const query = $('#feed-textarea').val().trim();
        if (!query) {
            alert('Please enter a query.');
            return;
        }
        $.ajax({
            url: 'php/addFeed.php',
            method: 'POST',
            data: { userId: userId, query: query },
            success: function (response) {
                $('#feed-textarea').val('');
                $('#popup-form').fadeOut();
                loadFeeds(); // Refresh the feed
            },
            error: function (xhr, status, error) {
                alert("Error posting feed.");
                console.error(error);
            }
        });
    });
});
