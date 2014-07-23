<?php

$input = file_get_contents("php://input");

$curl  = curl_init();

$sendHeaders = array(
    'Content-Type: application/json',
    'Content-Length: '.strlen($input)
);

curl_setopt($curl, CURLOPT_URL,            $_GET["url"]);
curl_setopt($curl, CURLOPT_HTTPHEADER,     $sendHeaders);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HEADER,         true);

//do post headers
if(strlen($input) > 0){
    curl_setopt($curl, CURLOPT_POST,       true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $input);
}

//get result
$result = curl_exec($curl);

//finish curl
curl_close($curl);

//get every line
$lines = explode("\n", $result);

$onHeader = true;

foreach($lines as $line){
    if(trim($line) === ''){
        $onHeader = false;
    }

    if($onHeader){
        header($line);
    }
    else {
        echo $line;
    }
}