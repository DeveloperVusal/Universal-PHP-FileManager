<?php
if (isset($_GET['FMDownloadFILE']) && isset($_GET['FMDownloadSIGN'])) {
	if (empty($_GET['FMDownloadFILE'])) exit('Error: Empty file.');
	if (empty($_GET['FMDownloadSIGN'])) exit('Error: Empty sign.');

	require 'config.php';

	$Model = new FM_Model();
	$file = $Model->checkSignedFile($_GET['FMDownloadFILE'], $_GET['FMDownloadSIGN']);

	if ($file == false) exit('Error Signed');
	if (file_exists($file)) {
		// сбрасываем буфер вывода PHP, чтобы избежать переполнения памяти выделенной под скрипт
		// если этого не сделать файл будет читаться в память полностью!
		if (ob_get_level()) {
			ob_end_clean();
		}
		// Заставляем браузер показать окно сохранения файла
		header('Content-Description: File Transfer');
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename=' . basename($file));
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($file));
		// читаем файл и отправляем его пользователю
		if ($fd = fopen($file, 'rb')) {
			while (!feof($fd)) {
				print fread($fd, 1024);
			}
			fclose($fd);
		}
		exit;
	}
}
?>