<?php
// Корень сайта
define('FM_WEB_PATH', $_SERVER['DOCUMENT_ROOT']);

// Путь до папки загрузок из корня
define('FM_UPLOAD_DIR', '/uploads/');

// Навание папки, где находится файловый менеджер
define('FM_URL', '/FM');

require_once('src/mvc/model.php');
require_once('src/mvc/view.php');
require_once('src/mvc/controller.php');