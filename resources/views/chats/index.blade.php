@extends('layouts.chat')

@section('main')
    <div class="card chatbox">
        <div class="card-header">
            <button class="btn btn-outline-dark btn-sm mr-2" id="go-back"><i class="fas fa-chevron-left fa-fw"></i></button>
            線上聊天室
        </div>
        <div class="card-body">
            @foreach ($messages as $message)
                @if (Auth::id() == $message->user->id)
                    <div class="message me" data-msid="{{ $message->id }}">
                        <div class="message-group">
                            <div class="author text-muted">{{ $message->user->name }}</div>
                            <div class="message-text">
                                @if ($message->content)
                                    {{ $message->content }}
                                @else
                                    <img src="{{ $message->attachment }}" href="{{ $message->attachment }}">
                                @endif
                            </div>
                        </div>
                    </div>  
                @else
                    <div class="message" data-msid="{{ $message->id }}">
                        <img class="author-img" src="{{ $message->user->profile_photo_url }}" alt="{{ $message->user->name }}">
                        <div class="message-group">
                            <div class="author text-muted">{{ $message->user->name }}</div>
                            <div class="message-text">
                                @if ($message->content)
                                    {{ $message->content }}
                                @else
                                    <img src="{{ $message->attachment }}" href="{{ $message->attachment }}">
                                @endif
                            </div>
                        </div>
                </div>  
                @endif
            @endforeach
        </div>
        <div class="card-footer">
            <form method="post" id="send-message">
                @csrf
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="輸入訊息" name="content" autocomplete="off">
                    <div class="input-group-append" id="button-addon4">
                        <button class="btn btn-outline-secondary" type="button" data-toggle="modal" data-target="#send-image-modal"><i class="far fa-image fa-fw"></i></button>
                        <button class="btn btn-outline-secondary" type="submit"><i class="fas fa-paper-plane fa-fw"></i></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="modal fade" id="send-image-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form method="post" id="send-image">
                    @csrf
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">發送圖片</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="send-image-file" name="attachment" accept="image/gif, image/jpeg, image/png">
                                <label class="custom-file-label" id="send-image-label" for="send-image-file">選擇檔案</label>
                            </div>
                        </div>
                        <img src="#" id="send-image-preview" class="w-100" style="object-fit: cover;opacity: 0">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                        <button type="submit" class="btn btn-primary">送出</button>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
    {{-- <div class="chatbox">
        <div class="header">

        </div>
        <div class="box">

        </div>
        <div class="input">
            
        </div>

    </div> --}}
@endsection