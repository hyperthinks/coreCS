$("#signup-button").click(function() {
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/account/create",
        data: {
            name: $("#username").val(),
            pass: $("#password").val()
        },
        success: function(data) {
            inject_signup_message();
        },
        error: function(xhr, status, error) {
            inject_error_message(true);
        },
        async: false
    });
    return false;
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
            localStorage.setItem('jwt', data.jwt);
            window.location.href = "index.html";
        },
        error: function(xhr, status, error) {
            inject_error_message(false);
        },
        async: false
    });
    return false;
});

$('#guest-button').click(function() {
    console.log('hi');
    window.location.href = "index.html";
    return false;
});

function inject_error_message(new_user) {
    $("#account-error").remove();
    $("#account-signup").remove();
    $("#login-box").prepend(`
            <article id="account-error" class="message is-danger is-small">
                <div class="message-header">
                    <p>Account error</p>
                </div>
                <div class="message-body">
                    ${($("#username").val() === '' || $("#password").val() === '') ?
                        "Missing username or password." :
                        new_user ? 
                            "Username already in use." : 
                            "Incorrect username or password."
                    }
                </div>
            </article>
    `);
}

function inject_signup_message() {
    $("#account-error").remove();
    $("#account-signup").remove();
    let html = `
        <article id="account-signup" class="message is-success is-small">
            <div class="message-header">
                <p>Success!</p>
            </div>
            <div class="message-body">
                Account created. Try logging in.
            </div>
        </article>
    `;

    $("#login-box").prepend(html);
}