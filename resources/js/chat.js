Echo.channel('onlinechat')
    .listen('OnlinechatEvent', (e) => {
        if(e.message.deleted_at != null){
            $('div[data-msid=' + e.message.id + ']').children('.message-group').children('.message-text').html("對方已收回訊息");
        }else if(e.message.content != null){
            var html = '<div class="message" data-msid="' + e.message.id + '"><img class="author-img" src="' + e.message.user.profile_photo_url + '" alt="' + e.message.user.name + '">';
            html += '<div class="message-group"><div class="author text-muted">' + e.message.user.name
            html += '</div><div class="message-text">' + e.message.content + '</div></div></div>';
        }else{
            var html = '<div class="message" data-msid="' + e.message.id + '"><img class="author-img" src="' + e.message.user.profile_photo_url + '" alt="' + e.message.user.name + '">';
            html += '<div class="message-group"><div class="author text-muted">' + e.message.user.name
            html += '</div><div class="message-text"><img src="' + e.message.attachment + '" href="' + e.message.attachment + '"></div></div></div>';
            img_gallery();
        }
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
                    var html = '<div class="message me" data-msid="' + response.id + '"><div class="message-group"><div class="author text-muted">' + response.user.name;
                    html += '</div><div class="message-text">' + response.content + '</div></div><button class="btn btn-light btn-sm remove-message" data-msid="' + response.id + '"><i class="fas fa-trash fa-fw"></i></button></div>';
                    $('.chatbox>.card-body').append(html);
                    $("input[name='content']").val("");
                    $("input[name='content']").focus();
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

    $('#send-image-file').change(function (e) { 
        if(this.files && this.files[0]){
            var reader = new FileReader();
            reader.onload = function (e) {
               $("#send-image-preview").attr('src', e.target.result);
               $("#send-image-preview").css('opacity','1');
            }
            $("#send-image-label").html(this.files[0].name);
            reader.readAsDataURL(this.files[0]);
          }
        e.preventDefault();
    });

    $('#send-image').submit(function (e) { 
        e.preventDefault();
        if($('#send-image-file').prop('files') && $('#send-image-file').prop('files')[0]){
            var form = new FormData();
            form.append('_token', $("input[name='_token']").prop('value'));
            form.append('attachment', $('#send-image-file').prop('files')[0]);
            $.ajax({
                type: "post",
                url: "/chats",
                data: form,
                processData : false, 
                contentType : false,
                dataType: "JSON",
                success: function (response) {
                    var html = '<div class="message me" data-msid="' + response.id + '"><div class="message-group"><div class="author text-muted">' + response.user.name;
                    html += '</div><div class="message-text"><img src="' + response.attachment + '" href="' + response.attachment + '"></div></div><button class="btn btn-light btn-sm remove-message" data-msid="' + response.id +'"><i class="fas fa-trash fa-fw"></i></button></div>';
                    $('.chatbox>.card-body').append(html);
                    $("input[name='content']").val("");
                    $("input[name='content']").focus();
                    $('#send-image-modal').modal('hide');
                    $('#send-image-file').val('');
                    $('#send-image-label').html("選擇檔案");
                    $("#send-image-preview").attr('src', '#');
                    $("#send-image-preview").css('opacity','0');
                    img_gallery();
                    scrolldown();
                },error: function (response) {
                    alert("發生錯誤!，請稍後再試!")
                }
            });
        }else{
            alert("請選擇圖片!")
        }
    });

    $(document).on('click', '.remove-message', function () {
        e = $(this)
        if(confirm("確定收回這則訊息?")){
            $.ajax({
                type: "POST",
                url: "/chats/" + $(this).data('msid'),
                data: {
                    _token: $("input[name='_token']").prop('value'),
                    _method: 'delete'
                },
                dataType: "JSON",
                success: function (response) {
                    $('div[data-msid="' + response.id + '"]').children('.message-group').children('.message-text').html("您已收回訊息");
                    $('div[data-msid="' + response.id + '"]').data('msid','N');
                    e.remove();
                },error: function (response) {
                    alert('收回失敗');
                }
            });
        }
    });

    img_gallery();
    scrolldown();
});

function scrolldown() {
    $('.card-body').animate({
        scrollTop: $('.card-body').prop("scrollHeight")
    })
}


function img_gallery() {
    $(".message-text").magnificPopup({
        delegate: 'img',
        type: 'image',
        gallery: {
            enabled: false
        }
    });
}
