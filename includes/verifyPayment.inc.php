<?php

// Install with: composer require flutterwavedev/flutterwave-v3
$transactionId = $_POST['tid'];
$expectedAmount = $_POST['amount'];
$expectedCurrency = $_POST['currency'];

$flw = new \Flutterwave\Rave(getenv('FLWSECK_TEST-ef7da8f15c6185ca459c42fefb4ea413-X'));
$transactions = new \Flutterwave\Transactions();
$response = $transactions->verifyTransaction(['id' => $transactionId]);
if (
    $response['data']['status'] === "successful"
    && $response['data']['amount'] === $expectedAmount
    && $response['data']['currency'] === $expectedCurrency) {
    // Success! Confirm the customer's payment
} else {
    // Inform the customer their payment was unsuccessful
}