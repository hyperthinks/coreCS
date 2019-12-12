$("#the-button").click(function() {
    $.ajax({
        type: 'GET',
        url: 'http://api.icndb.com/jokes/random?limitTo=[nerdy]',
        success: function(data, status, xhr) {
            $("#quote").text(data.value.joke);
        }
    })
});