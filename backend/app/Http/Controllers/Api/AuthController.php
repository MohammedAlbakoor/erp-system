<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private AuthService $authService,
    ) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $result = $this->authService->register($request->validated());
        return response()->json($result, 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->email, $request->password);

        if (!$result) {
            return response()->json(['message' => 'Invalid credentials or account is inactive'], 401);
        }

        return response()->json($result);
    }

    public function logout(): JsonResponse
    {
        $this->authService->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh(): JsonResponse
    {
        $result = $this->authService->refresh();
        return response()->json($result);
    }

    public function me(): JsonResponse
    {
        return response()->json(auth()->user()->load('role'));
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate(['email' => 'required|email']);
        $this->authService->forgotPassword($request->email);
        return response()->json(['message' => 'If the email exists, a reset link has been sent']);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $result = $this->authService->resetPassword($request->email, $request->token, $request->password);

        if (!$result) {
            return response()->json(['message' => 'Invalid token'], 400);
        }

        return response()->json(['message' => 'Password reset successful']);
    }
}
