<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('auth/facebook', 'Auth\AuthController@redirectToProvider');
Route::get('auth/facebook/callback', 'Auth\AuthController@handleProviderCallback');

Route::get('login', function () {
	return view('login');
});

Route::get('menuLobby', function () {
	return view('menuLobby');
});

Route::get('create_match', function () {
	return view('create_match');
});


Route::get('home', array('as' => 'home', 'uses' => function(){
  return view('home');
}));