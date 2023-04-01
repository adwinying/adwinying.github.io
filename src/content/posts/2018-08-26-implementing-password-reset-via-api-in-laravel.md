---
draft: false
date: 2018-08-26T22:55:38.000+09:00
tags:
- laravel
- php
- vuejs
- laravel-passport
- api
thumbnail: ''
title: Implementing Password Reset via API in Laravel
excerpt: How to implement password reset via API in Laravel.
slug: implementing-password-reset-via-api-in-laravel

---
I recently implemented [Laravel Passport](https://laravel.com/docs/5.6/passport) in a Laravel project that utilizes [Vue.js](https://vuejs.org/). This project also requires a password reset feature. The bad news is, Laravel's built in password reset feature was only meant for conventional blade templates. However, the good news is most of the password reset features could still be used with a few modifications.

## Step 0: Prerequisites

You need to have the following stuff implemented/installed:

* `User` model class
* `user` and `password_resets` table in your database

If you run `php artisan migrate` on a fresh install of Laravel then you would be able to fulfill the above requirements.

## Step 1: Define Routes

We will be using the `ForgotPasswordController` and `ResetPasswordController` in the `App\Http\Controllers\Auth`directory. If you had followed the instructions in the [official docs](https://laravel.com/docs/5.6/passwords) and ran the `php artisan` command then everything would automatically be done for you, however by doing so other unnecessary routes and views would be created as well so we would just manually define two routes, one to **generate a reset token and send a reset link to the user via email**; and another to **reset the password with the generated token** like so:

```php
// \routes\api.php

// Add the following to your existing routes
Routes::prefix('password')->group(function() {
    Routes::post('email', 'Auth\ForgotPasswordContoller@sendResetLinkEmail');
    Routes::post('reset', 'Auth\ResetPasswordController@reset');
});
```

## Step 2: Override Controller Methods

Just by referring to the routes that we define earlier, it is understood that we need to define a `sendResetLinkEmail()` method in `ForgotPasswordController::class` and a `reset()` method in `ResetPasswordController::class`. Upon first look these do not seem to be implemented in their respective classes, but they are actually defined in the traits that are declared:

```php
class ForgotPasswordController extends Controller
{

    use SendsPasswordResetEmails; # <- this right here!

    ...

}
```

Let's take a closer look at the original methods:

```php
// Illuminate\Foundation\Auth\SendsPasswordResetEmails
public function sendResetLinkEmail(Request $request)
{
    $this->validateEmail($request);
    // We will send the password reset link to this user. Once we have attempted
    // to send the link, we will examine the response then see the message we
    // need to show to the user. Finally, we'll send out a proper response.
    $response = $this->broker()->sendResetLink(
        $request->only('email')
    );
    return $response == Password::RESET_LINK_SENT
            ? $this->sendResetLinkResponse($response)
            : $this->sendResetLinkFailedResponse($request, $response);
}





// Illuminate\Foundation\Auth\ResetsPasswords
public function reset(Request $request)
{
    $this->validate($request, $this->rules(), $this->validationErrorMessages());
    // Here we will attempt to reset the user's password. If it is successful we
    // will update the password on an actual user model and persist it to the
    // database. Otherwise we will parse the error and return the response.
    $response = $this->broker()->reset(
        $this->credentials($request), function ($user, $password) {
            $this->resetPassword($user, $password);
        }
    );
    // If the password was successfully reset, we will redirect the user back to
    // the application's home authenticated view. If there is an error we can
    // redirect them back to where they came from with their error message.
    return $response == Password::PASSWORD_RESET
            ? $this->sendResetResponse($response)
            : $this->sendResetFailedResponse($request, $response);
}
```

As you can see, both methods return a response depending on whether the operation was a success. However the response is not a JSON response, but a view response. As an API wouldn't work if the response is a redirected page, we would override the method and change the return values:

```php
// App\Http\Controllers\Auth\ForgotPasswordController
class ForgotPasswordController extends Controller
{
    ...

    public function sendResetLinkEmail(Request $request)
    {
        $this->validateEmail($request);
        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $response = $this->broker()->sendResetLink(
            $request->only('email')
        );
        return $response == Password::RESET_LINK_SENT
            ? response->json(['message' => 'Reset Link has been sent to your email.'], 200)
            : response->json(['message' => 'Fail to send password reset email'], 500);
    }
}





// App\Http\Controllers\Auth\ResetPasswordController
class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        $this->validate($request, $this->rules(), $this->validationErrorMessages());
        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $response = $this->broker()->reset(
            $this->credentials($request), function ($user, $password) {
                $this->resetPassword($user, $password);
            }
        );
        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        return $response == Password::PASSWORD_RESET
            ? response->json(['message' => 'Password successfully reset.'], 200)
            : response->json(['message' => 'Fail to reset password'], 500);
    }
}
```
    

## Step 3: Customize the password reset email

To successfully send out the email, you would need to define a named route called `password.reset`. If you would like Vue.js to handle that for you, just point it to the blade template file that Vue.js is initialized:

```php
// route/web.php

Route::get('password/reset', function() {
    return view('index'); // Replace index with the name of the view where Vue.js is initialized
})->name('password.reset');
```

The URL of the reset link would be [http://example.com/password/reset?](http://example.com/password/reset? "http://example.com/password/reset?")[\[reset_token](http://example.com/password/reset?%5Breset_token)\], and of course you can change the URL to whatever you want.

If you're planning to customize the passsword reset email, you can do so by creating a new notification class and override the `sendPasswordResetNotification()` method in your User model class, as shown in the [official docs](https://laravel.com/docs/5.6/passwords#password-customization). You would still need to define a password reset route, but you can omit the route name method if you're hardcoding the reset URL in the email template.

## Step 4: Test your shiny new API

So now the hardest part is over, its time to test and see if everything's working! Try out your new APIs with your favorite API testing tool ([Postman](https://www.getpostman.com/) etc.) and you should similar results below:

### Send password reset request

```json
// POST /api/password/forgot
{
    "email": "user@example.com" // Make sure this email exists in your Users table!
}

// Response 200 OK
{
    "message": "Reset Link has been sent to your email."
}
```

You should receive an email containing a password reset link. If you're using Laravel Homestead in your local environment, you can [configure mailhog](https://laravel.com/docs/5.6/homestead#configuring-mailhog) and view the emails sent from Laravel at [http://localhost:8025](http://localhost:8025/).

### Reset Password

```json
// POST /api/password/reset
{
    "password": "foobar", // 6 characters minimum by default
    "password_confirmation": "foobar",
    "token": [reset_token goes here]
}

// Response 200 OK
{
    "message": "Password successfully reset."
}
```

## References

* [Laravel's Official Documentation](https://laravel.com/docs/5.6/passwords) on resetting passwords
* [Nasrul's blog](https://blog.nasrulhazim.com/2017/01/reset-your-password-from-api/)
