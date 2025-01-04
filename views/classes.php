<?php

$usersContr = new usersContr();
$usersView = new usersView();

$allClasses = '';
$allClasses .= $usersView->getClasses();
return $allClasses;