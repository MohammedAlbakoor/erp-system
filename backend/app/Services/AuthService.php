<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function __construct(
        private UserRepository $userRepository,
    ) {}

    public function register(array $data): array
    {
        $data['password'] = $data['password'];
        $user = $this->userRepository->create($data);
        $user->sendEmailVerificationNotification();
        $token = JWTAuth::fromUser($user);

        return [
            'user' => $user->load('role'),
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60,
        ];
    }

    public function login(string $email, string $password): ?array
    {
        $credentials = ['email' => $email, 'password' => $password];
        $token = JWTAuth::attempt($credentials);

        if (!$token) {
            return null;
        }

        $user = auth()->user();

        if (!$user->is_active) {
            JWTAuth::invalidate($token);
            return null;
        }

        return [
            'user' => $user->load('role'),
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60,
        ];
    }

    public function logout(): void
    {
        JWTAuth::invalidate(JWTAuth::getToken());
    }

    public function refresh(): array
    {
        $token = JWTAuth::refresh(JWTAuth::getToken());
        return [
            'user' => auth()->user()->load('role'),
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60,
        ];
    }

    public function forgotPassword(string $email): bool
    {
        $user = $this->userRepository->findByEmail($email);
        if (!$user) {
            return false;
        }

        $token = Str::random(64);
        \DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            ['token' => Hash::make($token), 'created_at' => now()]
        );

        // In production, send reset email
        return true;
    }

    public function resetPassword(string $email, string $token, string $password): bool
    {
        $record = \DB::table('password_reset_tokens')->where('email', $email)->first();

        if (!$record || !Hash::check($token, $record->token)) {
            return false;
        }

        $user = $this->userRepository->findByEmail($email);
        $user->update(['password' => $password]);

        \DB::table('password_reset_tokens')->where('email', $email)->delete();

        return true;
    }
}
