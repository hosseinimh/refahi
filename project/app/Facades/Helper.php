<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \App\Packages\Helper deleteAll(string $dir)
 * @method static \App\Packages\Helper localeNumbers(int|float $number)
 */
class Helper extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'helper';
    }
}
