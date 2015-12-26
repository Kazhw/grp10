<!DOCTYPE html>
<html >
	<head>
		<meta charset="UTF-8">
		<title>Log-in</title>
		
		
		
		<link rel='stylesheet prefetch' href='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css'>
		
		<link rel="stylesheet" href="css/style.css">
		
		
		
		
	</head>
	
	<body>
		
		<div class="login-card">
			<h1>Log-in</h1><br>
			<form>
				<input type="text" name="user" placeholder="Username">
				<input type="password" name="pass" placeholder="Password">
				<input type="checkbox" name="remember-login" class="login" value="Remember">
				<label class="label-card">Remember me</label>
				<input type="submit" name="login" class="login login-submit" value="Login">
                <input type="submit" name="login-facebook" class="login login-facebook-submit" value="Login with Facebook">
                <input type="submit" name="login-googleplus" class="login login-googleplus-submit" value="Login with Google+">
                
			</form>
			     
			<div class="login-help">
				<a href="#">Register</a> • <a href="#">Forgot Password</a>
			</div>
		</div>
		
		<!-- <div id="error"><img src="https://dl.dropboxusercontent.com/u/23299152/Delete-icon.png" /> Your caps-lock is on.</div> -->
		<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
		<script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>
		
		
		
		
		
	</body>
</html>
