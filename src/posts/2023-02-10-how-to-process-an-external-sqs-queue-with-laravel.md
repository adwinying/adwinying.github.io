---
draft: false
date: 2023-02-10T17:51:36.000+09:00
tags:
- aws
- sqs
- laravel
- php
- queue
- tutorial
title: How to Process an External SQS Queue with Laravel
slug: how-to-process-an-external-sqs-queue-with-laravel
excerpt: Although Laravel's queues are designed for internal use, how do you process a queue that is shared with an external system?

---

Laravel has an excellent built-in [queue](https://laravel.com/docs/9.x/queues) feature, which let you dispatch long-running processes that need to be run asynchronously in the background. However, Laravel's queue feature is only meant to be used internally, where jobs are dispatched and processed within the application itself. What if you want to process jobs that have been dispatched by an external application?

## Using a Library

You could try to use one of the many libraries that allows you to process external queues, like these:

- https://github.com/pawprintdigital/laravel-queue-raw-sqs
- https://github.com/primitivesense/laravel-raw-sqs-connector

However, most of these libraries are outdated and do not support the latest version of Laravel, nor recent versions of PHP.

## Reinventing the Wheel

Not satisfied with the solutions out there, I decided to try to hack a workaround to process an external queue.

### Reverse Engineering a Job Dispatched from Laravel

So this is what Laravel sends to a job when it is dispatched:

```json
{
  "uuid": "09f4bed5-e23d-4800-a99b-0cd7c0afe6f5",
  "displayName": "App\\Jobs\\MyJob",
  "job": "Illuminate\\Queue\\CallQueuedHandler@call",
  "maxTries": null,
  "maxExceptions": null,
  "failOnTimeout": false,
  "backoff": null,
  "timeout": null,
  "retryUntil": null,
  "data": {
    "commandName": "App\\Jobs\\MyJob",
    "command": "O:50:\"App\\Jobs\\MyJob\":11:{s:56:\"\u0000App\\Jobs\\MyJob\u0000data\";a:2:{i:0;s:5:\"hello\";i:1;s:6:\"world\";}s:3:\"job\";N;s:5:\"queue\";N;s:15:\"chainConnection\";N;s:10:\"chainQueue\";N;s:19:\"chainCatchCallbacks\";N;s:5:\"delay\";N;s:11:\"afterCommit\";N;s:10:\"middleware\";a:0:{}s:7:\"chained\";a:0:{}}"
  }
}
```

As you can see, the content is somewhat complex, and `data.command` is a PHP `serialize()`-ed string, which is hard to reproduce if you're not enqueueing from a PHP system. With a lot of trial and error, I managed to simplify it down to something like this:

```json
{
  "uuid": "09f4bed5-e23d-4800-a99b-0cd7c0afe6f5",
  "job": "App\\Jobs\\MyJob@rawDispatch",
  "data": {"hello":"world"}
}
```

This is much more easier to reproduce with an external dispatcher. 

### Creating the Custom Method

Based on the simplified job content, you will notice that `job` is now your job class with a method name `rawDispatch`. Laravel's queue worker will now call your job class directly. You'll need to create a method within your job class like so:

```php
use Illuminate\Queue\Jobs\Job;

class MyJob implements ShouldQueue
{
    private $data;

    // arguments in the construct function must be instantiable by Laravel
    // ie. No required arguments can be used
    public function __construct(array $data = [])
    {
        $this->data = $data;
    }

    public function rawDispatch(Job $job, array $data)
    {
        // we'll need to set the job instance manually:
        $this->job = $job;

        // run the job synchronously within the same process
        $this->dispatchAsync($data)

        // when job is completed, it will not be deleted automatically so
        // you'll need to manually do so, or else the job will reappear in the
        // queue and cause duplicate processing
        $this->delete();
    }

    public function handle()
    {
        // your job processing logic here as usual
        dump('Received data:', $this->data);
    }
}
```

If you need to reuse `rawDispatch`, just use a trait.

### Testing it out

Once you configure the SQS queue driver, you should be able to receive jobs from an external queue. Start a queue worker using the following command:

```bash
$ php artisan queue:listen [your-queue-driver-name]
```

If everything went according to plan, you should see the following output when you dispatch a job to SQS:

```
INFO  Processing jobs from the [your-queue-name] queue.

"Received data:" // app/Jobs/MyJob.php:70
array:1 [ // app/Jobs/MyJob.php:70
  "hello" => "world"
]
```
