<?php

$ch = curl_init();

$params = array(
    'client_id' => 123,
    'title' => 'O pedido saiu para entrega',
    'message' => 'mensagem do php',
    'type' => 'success', // success | info | danger | warning

);
curl_setopt($ch, CURLOPT_URL, 'http://localhost:3000/send');

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
// Receive server response ...
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


$server_output = curl_exec($ch);

curl_close($ch);

var_dump(json_decode($server_output));
