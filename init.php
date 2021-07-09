<?php
ini_set('error_reporting', E_ALL & ~E_NOTICE & ~E_WARNING);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

require('config.php');
$model = new FM_Model();
require('router/api.php');
?>