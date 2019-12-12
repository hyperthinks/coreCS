$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/account/status',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
        },
        success: function(data, status, xhr) {
            $("#user-display").text(data.user.name);
        },
        error: function(xhr, status, error) {
            showLoggedOut();
        },
        async: false
    });
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/private/clicks/${$("#user-display").text().trim()}/count`,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
        },
        success: function(data, status, xhr) {
            console.log(data.result);
            $("#dunk-count").text(data.result);
        },
        async: false
    });
});

function showLoggedOut() {
    $("#user-display-box").replaceWith(`
        <div class="navbar-item is-hoverable " id="user-display-box">
            <a class="navbar-link top-left-item is-arrowless" href="login.html">
                Login or Signup!
            </a>
        </div>
    `);
}
async function updateCount(c) {
    return await axios.post(`http://localhost:3000/private/clicks/${$("#user-display").text()}/`, {
        data: { count: c }
    }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } });
}

async function resetClicks() {
    return await axios.delete(`http://localhost:3000/private/clicks/${$("#user-display").text()}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` }
    });
}

$("#reset-clicks").click(function() {
    (async() => { await resetClicks(); })();
    $("#dunk-count").text('0');
    return false;
});

$('#logout').click(function() {
    localStorage.clear();
    showLoggedOut();
    $("#dunk-count").text('0');
});

$("#leaderboard-button").click(function() {
    $("#stats-button").removeClass('is-active');
    $(this).addClass('is-active');
    $("#stats").css("display", "none");
    $("#leaderboard").css("display", "block");
    $('html,body').animate({
        scrollTop: $("#leaderboard").offset().top
    }, 1200);
});

$("#stats-button").click(function() {
    $("#leaderboard-button").removeClass('is-active');
    $(this).addClass('is-active');
    $("#leaderboard").css("display", "none");
    $("#stats").css("display", "block");
    $('html,body').animate({
        scrollTop: $("#stats").offset().top
    }, 1200);
});

$("#the-button").click(function() {
    let curr_clicks = parseInt($("#dunk-count").text());
    $("#dunk-count").text(++curr_clicks);
    (async() => { await updateCount(curr_clicks); })();
    return false;
});