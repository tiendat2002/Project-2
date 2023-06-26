<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    return [
      'id' => $this->id,
      'title' => $this->title,
      'slug' => $this->slug,
      'user' => $this->user->name,
      'body' => $this->body,
      'level' => $this->level,
      'imagePath' => $this->imagePath,
      'category_id' => $this->category_id,
      'createdAt' => $this->created_at->diffForHumans(),
    ];
  }
}
