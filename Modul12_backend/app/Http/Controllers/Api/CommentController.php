<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function getComments($contentId)
    {
        $comments = Comment::where('id_content', $contentId)
            ->with('user') 
            ->get()
            ->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'user' => $comment->user->name, 
                    'text' => $comment->comment,
                    'date_added' => $comment->created_at->toDateTimeString(),
                ];
            });

        return response()->json($comments, 200);
    }

    public function addComment(Request $request, $contentId)
    {
        $validated = $request->validate([
            'text' => 'required|string|max:255',
        ]);

        $comment = Comment::create([
            'id_user' => Auth::id(),
            'id_content' => $contentId,
            'comment' => $validated['text'],
            'date_added' => now(),
        ]);

        return response()->json([
            'message' => 'Komentar berhasil ditambahkan',
            'comment' => $comment,
        ], 201);
    }

    public function editComment(Request $request, $commentId)
    {
        $comment = Comment::findOrFail($commentId);

        if ($comment->id_user !== Auth::id()) {
            return response()->json(['message' => 'Tidak diizinkan'], 403);
        }

        $validated = $request->validate([
            'text' => 'required|string|max:255',
        ]);

        $comment->update([
            'comment' => $validated['text'],
        ]);

        return response()->json([
            'message' => 'Komentar berhasil diperbarui',
            'comment' => $comment,
        ], 200);
    }

    public function deleteComment($commentId)
    {
        $comment = Comment::findOrFail($commentId);

        if ($comment->id_user !== Auth::id()) {
            return response()->json(['message' => 'Tidak diizinkan'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Komentar berhasil dihapus'], 200);
    }
}
