<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Message;

class ChatsController extends Controller
{

    public function __construct(Type $var = null)
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $messages = Message::with('user')->orderBy('created_at', 'ASC')->take(-50)->get();

        return view('chats.index',['messages' => $messages]);
    }

    public function store(Request $request)
    {
        if ($request->hasFile('attachment')){
            $image = $request->file('attachment');
            $file_path = $image->store('public/message-img');
            $message = auth()->user()->messages()->create(['attachment' => Storage::url($file_path)]);
        }else{
            $content = $request->validate([
                'content' => 'required',
            ]);
            $message = auth()->user()->messages()->create($content);
        }

        $message = Message::with('user')->find($message->id);
        broadcast(new \App\Events\OnlinechatEvent($message))->toOthers();
        return response()->json($message);
    }

    public function destroy($id)
    {
        $message = auth()->user()->messages->find($id);
        $message->delete();
        broadcast(new \App\Events\OnlinechatEvent($message))->toOthers();
        return response()->json($message);
    }
}
