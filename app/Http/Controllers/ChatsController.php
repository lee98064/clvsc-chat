<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class ChatsController extends Controller
{

    public function __construct(Type $var = null)
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $messages = Message::with('user')->orderBy('created_at', 'ASC')->take(50)->get();

        return view('chats.index',['messages' => $messages]);
    }

    public function store(Request $request)
    {
        $content = $request->validate([
            'content' => 'required'
        ]);
        $message = auth()->user()->messages()->create($content);
        $message = Message::with('user')->find($message->id);
        broadcast(new \App\Events\OnlinechatEvent($message))->toOthers();
        return response()->json($message);
    }
}
