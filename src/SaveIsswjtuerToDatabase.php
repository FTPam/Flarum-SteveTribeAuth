<?php

namespace Flarum\Disable;

use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;


class SaveIsswjtuerToDatabase {
    public function handle(Saving $event)
    {
        $attributes = Arr::get($event->data, 'attributes', []);

        if (isset($attributes['nickname'])) {
            // Update Eloquent model. Do not save here, Flarum will do it automatically after all extensions update their values
            $event->user->is_swjtuer = $attributes['is_swjtuer'];
        }
    }
}
