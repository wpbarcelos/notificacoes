<?php

$ch = curl_init();

$params = array(
    // 'client_id' => 123,
    'dashboard_id' => 123,
    'title' => 'O pedido saiu para entrega',
    'message' => 'Novo pedido cadastrado',
    'type' => 'info', // success | info | warning
);

$token = 'minhasenha';
$credentials = array(
    "authorization: $token"
);
curl_setopt($ch, CURLOPT_URL, 'http://localhost:3000/send');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, $credentials);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec($ch);

curl_close($ch);

var_dump(json_decode($server_output));
