<!DOCTYPE html>
<html>
<head>
<style>
table, th {
    
    border-collapse: collapse;
    
}

table, th {
    border: 1px solid black;
    border-collapse: collapse;
}
th, td {
    padding: 2px;
    text-align: left;
}

td {
    border-left: 1px solid #000;
    border-right: 1px solid #000;
}

.button {
    background-color: #FFFFFF; /* Gray */
    border: 1px solid gray;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
    width: 80%;
}

.button:hover {
    background-color: #A9A9A9;
}

.menuInicial {
width:80%;
text-align: center;
}

</style>
</head>
<body>

<div class="menuInicial">
<!--Lobby Headers -->
  <div>
    Menu
</div>
  <div>
    <button class="button">New Game</button>
</div>
  <div>
    <button class="button">Cenas</button>
</div>
  <div>
       <button class="button">Salas</button>
</div>
  <div>
       <button class="button">Highscore</button>
</div>
</div>

<hr>

<table style="width:100%">

  <tr>
<!--Lobby Headers -->
    <th>Game</th>
    <th>Owner</th>
<th>Tabuleiro</th>
    <th>Nº Jogadores</th> 
<th> Status </th>
    <th>Actions</th>
  </tr>
 <!-- Lobby Games -->
 <tr id="for_each_game">
     <td>best game1</td>
     <td>FF</td>
<td>4x4</td>
     <td>12</td>
<td>Ongoing</td>
     <td><button> Join</button>
<button>Spectate</button>
</td>
  </tr>
</table>

</body>
</html>