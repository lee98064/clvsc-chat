<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('聊天須知') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                {{-- <x-jet-welcome /> --}}
                <div class="p-7 sm:px-20 bg-white border-b border-gray-200">
                    
                    <div class="text-2xl">
                        <h3>歡迎使用線上聊天!</h3>
                    </div>
                
                    <div class="mt-6 text-gray-500">
                        <ol>
                            <li>請勿刷屏</li>
                            <li>進入聊天禁止謾罵</li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ol>
                    </div>
                    <a href="/chats" class="btn btn-outline-danger mt-2">同意</a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
