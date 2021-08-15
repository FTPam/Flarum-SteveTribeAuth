<?php

namespace TPam\Disable;

use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;


class SaveIsswjtuerToDatabase {
    public function handle(Saving $event)
    {
        $attributes = Arr::get($event->data, 'attributes', []);

        $event->user->is_swjtuer = $attributes['is_swjtuer'];
    }
}
