<!DOCTYPE html>
<html >
	<head>
		<title>Create Match</title>
		<meta charset="UTF-8">
		
		<!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/css/foundation.css">-->
		<link rel='stylesheet prefetch' href='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css'>
		<link rel="stylesheet" href="css/sliders.css">
		<link rel="stylesheet" href="css/forms.css">
        <link rel="stylesheet" href="css/style.css">
		
	</head>
	
	<body>
		<div class="form-card">
			<h1>Create Match</h1><br>
			<form>
				<input type="text" name="name" placeholder="Match Name">
                
				<input type="text" name="maxplayers" placeholder="Max Players">
                <input type="checkbox" name="bots" class="login" value="Bots">
				<label class="label-card">Bots: </label>
                <br></br>
            
				<label class="label-card">Lines: </label>
                <input type="text" id="idLines" name="Lines" value="4" >
				<input class="slider" type="range" id="idLines" name="Lines" value="4" min="2" max="10">
				
				<br></br>
				<label class="label-card">Rows: </label><input type="text" id="idCols" name="cols" value="4">
				<input class="slider" type="range" id="idCols" name="cols" value="4"  min="2" max="10">
				
				<br></br>
                <input type="checkbox" name="private" class="form" value="Private">
				<label class="label-card">Private: </label>
                <input type="password" name="pass" placeholder="Password">
				<input type="password" name="confirm_pass" placeholder="Confirm Password">
				<input type="submit" name="create" class="form form-submit" value="Create Match">
                <input type="button" name="cancel" class="form form-button" value="Cancel">
				
			</form>
		</div>
		
		<!-- <div id="error"><img src="https://dl.dropboxusercontent.com/u/23299152/Delete-icon.png" /> Your caps-lock is on.</div> -->
		<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
		<script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>
		
		<!-- Initialize Foundation JS -->
		
		
		
		
	</body>
</html>
