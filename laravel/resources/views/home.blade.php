
<body>
    <div class="container">
        <div class="content">
            <div class="title">Laravel 5</div>
            You are logged in with facebook!          
            <div>
                <h4>Your name is {{ Auth::user()->name }}</h4>
                <h4>Your email is {{ Auth::user()->email }}</h4>
                <h4>Your name is {{ Auth::user()->name }}</h4>
                <img src="{{ Auth::user()->avatar}}" width="200px" height="200px"/>
            </div>            
        </div>
    </div>
</body>

