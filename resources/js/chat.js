Echo.channel('onlinechat')
    .listen('OnlinechatEvent', (e) => {
        // console.log(e);
        var html = '<div class="message"><img class="author-img" src="' + e.message.user.profile_photo_url + '" alt="' + e.message.user.name + '">';
        html += '<div class="message-group"><div class="author text-muted">' + e.message.user.name
        html += '</div><div class="message-text">' + e.message.content + '</div></div></div>';
        $('.chatbox>.card-body').append(html);
        scrolldown();
    });

$(document).ready(function () {
    
    $('#send-message').submit(function (e) {
        e.preventDefault();
        if ($("input[name='content']").val() != ""){
            var form = $(this).serialize();
            $.ajax({
                type: "post",
                url: "/chats",
                data: form,
                dataType: "JSON",
                success: function (response) {
                    // console.log(response);
                    var html = '<div class="message me"><div class="message-group"><div class="author text-muted">' + response.user.name;
                    html += '</div><div class="message-text">' + response.content + '</div></div></div>';
                    $('.chatbox>.card-body').append(html);
                    $("input[name='content']").val("");
                    scrolldown();
                }
            });
        }else{
            alert("請輸入訊息!");
        }
    });

    $('#go-back').click(function (e) { 
        location.href = '/'
    });
    
    scrolldown();
});

function scrolldown() {
    $('.card-body').animate({
        scrollTop: $('.card-body').prop("scrollHeight")
    })
}
