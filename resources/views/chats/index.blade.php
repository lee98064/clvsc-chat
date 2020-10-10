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
                    <div class="message me">
                        <div class="message-group">
                            <div class="author text-muted">{{ $message->user->name }}</div>
                            <div class="message-text">
                                {!! $message->content !!}
                            </div>
                        </div>
                    </div>  
                @else
                    <div class="message">
                        <img class="author-img" src="{{ $message->user->profile_photo_url }}" alt="{{ $message->user->name }}">
                        <div class="message-group">
                            <div class="author text-muted">{{ $message->user->name }}</div>
                            <div class="message-text">
                                {!! $message->content !!}
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
                        <button class="btn btn-outline-secondary" type="button"><i class="far fa-image fa-fw"></i></button>
                        <button class="btn btn-outline-secondary" type="submit"><i class="fas fa-paper-plane fa-fw"></i></button>
                    </div>
                </div>
            </form>
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