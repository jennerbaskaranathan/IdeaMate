$(document).ready(function () {
    // Fetch feeds (existing code)
    const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const mailid = urlParams.get('mail');
    $('#yourIdeas').click(function (){
        console.log('clicked');
        $('#content-title').html('Your Ideas');
        $.ajax({
            url: 'php/getYourIdeas.php',
            method: 'GET',
            dataType: 'json',
            data : {id:userId},
            success: function (data) {
                const container = $('#contents');
                container.empty();
                data.forEach(feed => {
                    const likeCount = feed.likes ? feed.likes.length : 0;
                    const upvoteCount = feed.upvotes ? feed.upvotes.length : 0;
                    const downvoteCount = feed.downvotes ? feed.downvotes.length : 0;
                    const replyCount = feed.replies ? feed.replies.length : 0;
                    const domain = feed.domain ;
                    const type = feed.type ;
                    const contentDiv = `
                        <div class="content">
                            <div class="row">
                                <div class="col-3">
                                    <p class="heading id">${feed.name}</p>
                                </div>
                                <div class="col">${feed.domain}</div>
                                 <div class="col">${feed.type}</div>
                            </div>
                            <p class="query">${feed.idea}</p>
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
    });







$('#search').click(function (){
        console.log('clicked');
        $('#content-title').html('Search');
        $.ajax({
            url: 'php/getAllIdeas.php',
            method: 'GET',
            dataType: 'json',
            success: function (datas) {
                const container = $('#contents');
                container.empty();
                datas.forEach(feed => {
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
                                <div class="col">${feed.domain}</div>
                                 <div class="col">${feed.type}</div>
                            </div>
                            <p class="query">${feed.idea}</p>
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
    });

});
