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
                            <li>!!請勿刷屏!!</li>
                            <li>本版本提供收回訊息與傳送圖片~</li>
                            <li>右上角選單可以修改自己的暱稱~</li>
                            <li>右上角選單可以修改自己的大頭貼~</li>
                            <li>聊天室如果人數太多極有可能無法進入，請見諒!</li>
                            <li>如有違規管理員有權直接封鎖帳號!</li>
                            <li>按下方同意後進入</li>
                        </ol>
                    </div>
                    <a href="/chats" class="btn btn-outline-danger mt-2">同意</a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
