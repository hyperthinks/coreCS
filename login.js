$("#signup-button").click(function() {
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/account/create",
        data: {
            name: $("#username").val(),
            pass: $("#password").val()
        },
        success: function(data) {
            console.log(data.status);
        },
        error: function(xhr, status, error) {
            //TODO let user know that username is taken
            console.log(`Username : [${$("#username").val()}] already exists`)
        },
        async: false
    });
});

$("#login-button").click(function() {
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/account/login",
        data: {
            name: $("#username").val(),
            pass: $("#password").val()
        },
        success: function(data) {
            console.log(data.jwt);
        },
        error: function(xhr, status, error) {
            //TODO let user know that username is taken
            console.log(`Incorrect info. username: [${$("#username").val()}] password: [${$("#password").val()}]`)
        },
        async: false
    });
});