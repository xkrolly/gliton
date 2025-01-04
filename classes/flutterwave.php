<?php

class Flutterwave{
    private $publicKey;
    private $secretKey;
    private $encryptionKey;
    private $baseURl;
    
    public function _construct($publicKey, $secretKey, $encryptionKey){
        $this->publicKey = $publicKey;
        $this->secretKey = $secretKey;
        $this->encryptionKey = $encryptionKey;
        $this->baseURl = '';
        
    }
    public function verifyPayment($tx_ref){
        $url = $this->baseURL.'/payments/verify/'.$tx_ref;
        $headers = [
            'Authorization: Bearer'.$this->secretKey,
            'Content-Type: application/json',
        ];
        $client = new Client();
        $response = $client->get($url, [
            'headers'=> $headers,
        ]);
        return json_decode($response->getBody()->getContents(), true);
    }
}