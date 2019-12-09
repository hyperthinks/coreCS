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