<?php

if (!file_exists('exports')) {
    mkdir('exports', 0777, true);
}

$file_prefix = uniqid();

$data = $_REQUEST['base64Data'];

$image = explode('base64,', $data);

$file_name = "$file_prefix.jpg";

file_put_contents("exports/$file_name", base64_decode($image[1]));

echo $file_name;