<?php

namespace TPam\Disable;

use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;


class SaveIsswjtuerToDatabase {
    public function handle(Saving $event)
    {
        $attributes = Arr::get($event->data, 'attributes', []);

        $user = $event->user;
        $actor = $event->actor;

        $isSelf = $actor->id === $user->id;

        if (isset($attributes['is_swjtuer']) && $isSelf) {
            $event->user->is_swjtuer = $attributes['is_swjtuer'];
        }
    }
}
