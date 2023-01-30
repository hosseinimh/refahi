<?php

namespace App\Packages;

use App\Models\Error;
use DateTime;

class Helper
{
    public function handleError(\Exception $e)
    {
        try {
            Error::create(['message' => $e->__toString()]);
        } catch (\Exception) {
        }
    }

    public function logError($e)
    {
        try {
            if (is_string($e)) {
                Error::create(['message' => $e]);
            } else {
                Error::create(['message' => $e->__toString()]);
            }
        } catch (\Exception) {
        }
    }

    public function randomNumbersString($length = 4)
    {
        try {
            $characters = '123456789';
            $randstring = '';

            for ($i = 0; $i < $length; $i++) {
                $randstring[$i] = $characters[rand(0, strlen($characters) - 1)];
            }

            return $randstring;
        } catch (\Exception) {
        }

        return '1234';
    }

    public function persianNumbers($englishNumber)
    {
        try {
            $persianNumber = str_replace(array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9'), array('۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'), $englishNumber);

            return $persianNumber;
        } catch (\Exception) {
        }

        return $englishNumber;
    }

    public function localeNumbers($number)
    {
        try {
            if (app()->getLocale() === 'fa') {
                return Helper::persianNumbers($number);
            }
        } catch (\Exception) {
        }

        return $number;
    }

    public function resizeImage($file, $width)
    {
        try {
            $src = imagecreatefromjpeg($file);
            list($imgWidth) = getimagesize($file);
            $dst = $imgWidth > $width ? imagescale($src, $width) : $src;

            imagejpeg($dst, $file);
        } catch (\Exception) {
        }
    }

    public function deleteAll(string $dir): void
    {
        foreach (glob($dir . '/*') as $file) {
            if (is_dir($file)) {
                $this->deleteAll($file);
            } else {
                @unlink($file);
            }
        }

        @rmdir($dir);
    }

    public function gregorianToJalali($gy, $gm, $gd, $mod = '')
    {
        try {
            $g_d_m = array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334);
            $gy2 = ($gm > 2) ? ($gy + 1) : $gy;
            $days = 355666 + (365 * $gy) + ((int) (($gy2 + 3) / 4)) - ((int) (($gy2 + 99) / 100)) + ((int) (($gy2 + 399) / 400)) + $gd + $g_d_m[$gm - 1];
            $jy = -1595 + (33 * ((int) ($days / 12053)));
            $days %= 12053;
            $jy += 4 * ((int) ($days / 1461));
            $days %= 1461;

            if ($days > 365) {
                $jy += (int) (($days - 1) / 365);
                $days = ($days - 1) % 365;
            }

            if ($days < 186) {
                $jm = 1 + (int) ($days / 31);
                $jd = 1 + ($days % 31);
            } else {
                $jm = 7 + (int) (($days - 186) / 30);
                $jd = 1 + (($days - 186) % 30);
            }

            return ($mod === '') ? array($jy, $jm, $jd) : $jy . $mod . $jm . $mod . $jd;
        } catch (\Exception) {
            return null;
        }
    }

    private function getFaDate($date)
    {
        $date = new DateTime($date);
        $h = $date->format('H');
        $i = $date->format('i');
        $s = $date->format('s');
        $date = Helper::gregorianToJalali($date->format('Y'), $date->format('m'), $date->format('d'));

        if (intval($date[1]) < 10) $date[1] = '0' . $date[1];
        if (intval($date[2]) < 10) $date[2] = '0' . $date[2];

        $date[3] = $h;
        $date[4] = $i;
        $date[5] = $s;

        return $date;
    }

    public function faDate($date)
    {
        $date = Helper::getFaDate($date);

        return $date[3] . ':' . $date[4] . ':' . $date[5] . ' ' . $date[0] . '-' . $date[1] . '-' . $date[2];
    }

    public function faDate2($date)
    {
        $date = Helper::getFaDate($date);

        return $date[3] . ':' . $date[4] . ':' . $date[5] . ' ' . $date[2] . '-' . $date[1] . '-' . $date[0];
    }
}
