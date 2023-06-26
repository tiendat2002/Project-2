<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Http\Resources\PostResource;
use Illuminate\Http\Request;


class DashboardPostsController extends Controller
{
    //
    public function index()
    {
        return PostResource::collection(
            Post::where('user_id', auth()->user()->id)->latest()->get()
        );
    }
}
