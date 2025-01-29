<?php

namespace Laravel\Spark;

use Illuminate\Support\Str;
use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;

class JWT
{
    private const string ALG = 'HS256';

    /**
     * Encode the given array as a JWT token.
     *
     * @param  array  $token
     * @return string
     */
    public static function encode($token)
    {
        return FirebaseJWT::encode($token, static::getKey(), self::ALG);
    }

    /**
     * Decode the given token to an array.
     *
     * @param  string  $token
     * @return array
     */
    public static function decode($token)
    {
        return (array) FirebaseJWT::decode($token, new Key(static::getKey(), self::ALG));
    }

    /**
     * Get the encryption key for the application.
     *
     * @return string
     */
    protected static function getKey()
    {
        $key = config('app.key');

        if (Str::startsWith($key, 'base64:')) {
            $key = base64_decode(substr($key, 7));
        }

        return $key;
    }
}
