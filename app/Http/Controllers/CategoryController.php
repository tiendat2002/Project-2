<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{
  //
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required | unique:categories',
      'file' => 'required | image'
    ]);
    $name = $request->input('name');
    $imagePath = 'storage/' . $request->file('file')->store('postsImage', 'public');
    $category = new Category();
    $category->name = $name;
    $category->imagePath = $imagePath;
    return $category->save();
  }
  public function index()
  {
    return Category::latest()->get();
  }
  public function show(Category $category)
  {
    return $category;
  }
  public function update(Category $category, Request $request)
  {
    $request->validate([
      'name' => 'required | unique:categories',
      'file' => 'nullable',
    ]);
    if ($request->file('file')) {
      File::delete($category->imagePath);
      $imagePath = 'storage/' . $request->file('file')->store('postsImage', 'public');
      $category->imagePath = $imagePath;
    }
    $name = $request->input('name');
    $category->name = $name;
    return $category->save();
  }
  public function destroy(Category $category)
  {
    return $category->delete();
  }
}
