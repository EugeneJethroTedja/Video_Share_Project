<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|---------------------------------------------------------------------------
| API Routes
|---------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [App\Http\Controllers\Api\AuthController::class, 'register']);
Route::post('/login', [App\Http\Controllers\Api\AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {

    Route::get('/contents', [App\Http\Controllers\Api\ContentController::class, 'index']);
    Route::post('/contents', [App\Http\Controllers\Api\ContentController::class, 'store']);
    Route::get('/contents/{id}', [App\Http\Controllers\Api\ContentController::class, 'show']);
    Route::put('/contents/{id}', [App\Http\Controllers\Api\ContentController::class, 'update']);
    Route::delete('/contents/{id}', [App\Http\Controllers\Api\ContentController::class, 'destroy']);
    Route::get('/contents/user/{id}', [App\Http\Controllers\Api\ContentController::class, 'showContentbyUser']);
    
    Route::get('/contents/{id}/comments', [App\Http\Controllers\Api\CommentController::class, 'getComments']); 
    Route::post('/contents/{id}/comments', [App\Http\Controllers\Api\CommentController::class, 'addComment']);
    Route::put('/comments/{id}', [App\Http\Controllers\Api\CommentController::class, 'editComment']); 
    Route::delete('/comments/{id}', [App\Http\Controllers\Api\CommentController::class, 'deleteComment']); 
});
