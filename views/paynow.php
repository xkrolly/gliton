<?php
$amount = $_GET['amount'];
$pid = $_GET['pid'];

require_once 'vendor/autoload.php';
use Flutterwave\Flutterwave;

$flutterwave = new Flutterwave(
    getenv(pubK),
    getenv(secK),
    getenv(encK)
);

$payload = [
    'tx_ref' => uniqid(),
    'amount' => 100,
    'currency' => 'NGN',
    'payment_options' => 'card, banktransfer',
    'redirect_url' => '',
    'customer' => [
        'name' => '',
        'email' => '',
        'phone' => '',
    ],
];

$payment = $flutterwave->initializePayment($payload);
if($payment['status'] == 'success'){
    //update DB and do sth
} else {
    //payment failed, notify user
}

$verification = $flutterwave->verifyPayment($payload['tx_ref']);

if($verification['status'] == 'success'){
    //payment verified, update db
} else {
    //payment failed, notify user
}
return"
    <div>
    <p>You want to pay $amount for $pid.</p>
    <button onclick='pay_now();'>Proceed to pay</button>
    </div>
";