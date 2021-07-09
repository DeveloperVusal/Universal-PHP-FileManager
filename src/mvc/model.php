<?php
/**
 * Класс Model MVC структуры
 *
 * @author Мамедов Вусал
 * @description Ядро для работы с ФМ
 * @version 0.0.2
 */
class FM_Model {

	/**
	 * @constructor
	 * @method Вызывает метод {create_htaccess}
	 * @return Ничего не возвращает
	 */
	function __construct() {
		$this->create_htaccess();
	}

	/**
	 * Создает или перезаписывает файл .htaccess
	 *
	 * @access public
	 * @return Ничего не возвращает
	 */
	public function create_htaccess() {
		$data = "RemoveHandler .phtml .php .php2 .php3 .php4 .php5 .php7 .phps .cgi .pl .asp .aspx .shtml .shtm .fcgi .fpl .htm .html\nRemoveType .phtml .php .php2 .php3 .php4 .php5 .php7 .phps .cgi .pl .asp .aspx .shtml .shtm .fcgi .fpl .htm .html\nAddType application/x-httpd-php-source .phtml .php .php2 .php3 .php4 .php5 .php7 .phps .cgi .pl .asp .aspx .shtml .shtm .fcgi .fpl .htm .html\nOptions -ExecCGI -Indexes\nphp_flag engine off";
		file_put_contents(FM_WEB_PATH.FM_UPLOAD_DIR.'.htaccess', $data);
	}

	/**
	 * Получает указанную директорию
	 *
	 * @param string $path - Абсолютный путь из главной директории, который указан в файле config.php
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function getDir($path = null) {
		$dirs = scandir(FM_WEB_PATH.FM_UPLOAD_DIR.urldecode($path));
		$newArray = array();

		foreach ($dirs as $key => $val) {
			if ($val !== '.' && $val !== '..' && $val !== '.htaccess') $newArray[] = $val;
		}

		return $newArray;
	}
	
	/**
	 * Создает папку
	 *
	 * @param string $name - Название папки 
	 * @param string $path - Абсолютный путь из главной директории, который указан в файле config.php
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function createFolder($name, $path = null) {
		$dirs = scandir(FM_WEB_PATH.FM_UPLOAD_DIR.urldecode($path));

		foreach ($dirs as $key => $val) {
			if ($val !== '.' && $val !== '..') {
				$expl = explode('.', $val);
				if (!isset($expl[1])) {
					if ($name == $expl[0]) {
						return json_encode(array(
							'message' => 'error',
							'code' => 1,
							'description' => 'This folder already exists'
						));
					}
				}
			}
		}

		$create = mkdir(FM_WEB_PATH.FM_UPLOAD_DIR.urldecode($path.$name), 0755);

		if ($create) {
			return json_encode(array(
				'message' => 'success',
				'code' => 0,
				'description' => 'Folder created successfully'
			));
		} else {
			return json_encode(array(
				'message' => 'error',
				'code' => 3,
				'description' => 'An error occurred while creating the folder'
			));
		}
	}

	/**
	 * Создает файл
	 *
	 * @param string $name - Название файла 
	 * @param string $path - Абсолютный путь из главной директории, который указан в файле config.php
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function createFile($name, $path = null) {
		$pthName = urldecode($path.$name);

		if (file_exists(FM_WEB_PATH.FM_UPLOAD_DIR.$pthName)) {
			return json_encode(array(
				'message' => 'error',
				'code' => 2,
				'description' => 'This file already exists'
			));
		}

		$create = fopen(FM_WEB_PATH.FM_UPLOAD_DIR.$pthName, 'w');
		chmod(FM_WEB_PATH.FM_UPLOAD_DIR.$pthName, 0755);

		if ($create == false) {
			return json_encode(array(
				'message' => 'error',
				'code' => 4,
				'description' => 'An error occurred while creating the file'
			));
		} else {
			$jsonfile = json_decode(file_get_contents(FM_WEB_PATH.FM_URL.'/files-data.json'), true);

			if (!array_key_exists(FM_UPLOAD_DIR.$pthName, $jsonfile)) {
				$jsonfile[FM_UPLOAD_DIR.$pthName] = date('d.m.Y H:i:s');
				file_put_contents(FM_WEB_PATH.FM_URL.'/files-data.json', json_encode($jsonfile));
			}

			return json_encode(array(
				'message' => 'success',
				'code' => 1,
				'description' => 'File created successfully'
			));
		}
	}

	/**
	 * Удаляет папку
	 *
	 * @param string $path - Полный путь до папки из главной директории, который указан в файле config.php
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function removeFolder($path) {
		$full_path = FM_WEB_PATH.FM_UPLOAD_DIR.urldecode($path);

		if (file_exists($full_path)) {
			$remove = $this->removeDirectory($full_path);

			if ($remove == false) {
				return json_encode(array(
					'message' => 'error',
					'code' => 6,
					'description' => 'Error deleting folder'
				));
			} else {
				return json_encode(array(
					'message' => 'success',
					'code' => 2,
					'description' => 'Folder deleted successfully'
				));
			}
		} else {
			return json_encode(array(
				'message' => 'error',
				'code' => 5,
				'description' => 'This folder does not exist'
			));
		}
	}

	/**
	 * Удаляет файл
	 *
	 * @param string $path - Полный путь до файла из главной директории, который указан в файле config.php
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function removeFile($path) {
		$full_path = FM_WEB_PATH.FM_UPLOAD_DIR.urldecode($path);

		if (file_exists($full_path)) {
			$remove = unlink($full_path);

			if ($remove) {
				return json_encode(array(
					'message' => 'success',
					'code' => 3,
					'description' => 'File deleted successfully'
				));
			} else {
				return json_encode(array(
					'message' => 'error',
					'code' => 8,
					'description' => 'Error deleting file'
				));
			}
		} else {
			return json_encode(array(
				'message' => 'error',
				'code' => 7,
				'description' => 'This file does not exist'
			));
		}
	}

	/**
	 * Переименовыает файл или папку
	 *
	 * @param string $newName - Новое название
	 * @param string $oldName - Старое название
	 * @param string $path - Абсолютный путь из главной директории, который указан в файле config.php
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function renameFileFolder($newName, $oldName, $path) {
		$full_path = FM_WEB_PATH.FM_UPLOAD_DIR.urldecode($path);

		if (file_exists($full_path)) {
			$pth = explode(urldecode($oldName), urldecode($path));
			$r = rename($full_path, FM_WEB_PATH.FM_UPLOAD_DIR.$pth[0].urldecode($newName));

			if ($r) {
				return json_encode(array(
					'message' => 'success',
					'code' => 4,
					'description' => 'File or folder renamed successfully',
					'details' => array(
						'newPath' => $pth[0].urldecode($newName)
					)
				));
			} else {
				return json_encode(array(
					'message' => 'error',
					'code' => 9,
					'description' => 'Error renaming file or folder'
				));
			}
		} else {
			return json_encode(array(
				'message' => 'error',
				'code' => 7,
				'description' => 'This file or folder does not exist'
			));
		}
	}

	/**
	 * Загрузка файлов на сервер
	 *
	 * @param array $file - Массив с данными файла
	 * @param string $path - Абсолютный путь из главной директории, который указан в файле config.php
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function uploadFile($file, $path = null) {
		$filename = basename($file['name'][0]);
		$newPath = FM_WEB_PATH.FM_UPLOAD_DIR.urldecode($path).$filename;
		$move = move_uploaded_file($file['tmp_name'][0], $newPath);

		if ($move) {
			if (file_exists(FM_WEB_PATH.FM_URL.'/files-data.json')) {
				$jsonfile = json_decode(file_get_contents(FM_WEB_PATH.FM_URL.'/files-data.json'), true);
			} else {
				$jsonfile = array();
			}
			
			if (!array_key_exists(FM_UPLOAD_DIR.urldecode($path).$filename, $jsonfile)) {
				$jsonfile[FM_UPLOAD_DIR.urldecode($path).$filename] = date('d.m.Y H:i:s');
				file_put_contents(FM_WEB_PATH.FM_URL.'/files-data.json', json_encode($jsonfile));
			}

			return json_encode(array(
				'message' => 'success',
				'code' => 5,
				'description' => 'File uploaded successfully'
			));
		} else {
			return json_encode(array(
				'message' => 'error',
				'code' => 10,
				'description' => 'Error loading file'
			));
		}
	}

	/**
	 * Проверка подписи файла
	 *
	 * @param array $file - Полный путь к файлу
	 * @param string $sign - Подпись/ключ
	 * @access public
	 * @return Возвращает путь к файлу в случае успеха, иначе false
	 */
	public function checkSignedFile($file, $sign) {
		$expl = explode('/', $file);
		$sign2 = md5(':'.end($expl).':'.FM_WEB_PATH.':');
		$file = FM_WEB_PATH.FM_UPLOAD_DIR.urldecode($file);

		return ($sign == $sign2)?$file:false;
	}

	/**
	 * Удалении директории
	 *
	 * @param string $dir - Полный путь к директории
	 * @access private
	 * @return Возвращает false в случае ошибки
	 */
	private function removeDirectory($dir) {
		if ($objs = glob($dir."/*")) {
			foreach ($objs as $obj) {
				if (is_dir($obj)) {
					$this->removeDirectory($obj);
				} else {
					if (!unlink($obj)) {
						return false;
					}
				}
			}
		}
		if (!rmdir($dir)) {
			return false;
		}
	}

	/**
	 * Получает валидный размер файла
	 *
	 * @param int $bytes - Байтов
	 * @param int $precision - Сколько цифр после запятой
	 * @access public
	 * @return Возвращает валидный размер
	 */
	public function fileSizeBytes($bytes, $precision = 2) {
	    $units = array('B', 'KB', 'MB', 'GB', 'TB');
	    $bytes = max($bytes, 0);
	    $pow = floor(($bytes?log($bytes):0) / log(1024));
	    $pow = min($pow, count($units) - 1);
	    $bytes /= pow(1024, $pow);
	    return round($bytes, $precision).' '.$units[$pow];
	}

	/**
	 * Получает домен веб-сайта
	 *
	 * @access public
	 * @return Возвращает результат (строку)
	 */
	public static function FMGetDomianUrl() {
		if (isset($_SERVER['HTTPS'])) {
			$scheme = $_SERVER['HTTPS'];
		} else {
			$scheme = '';
		}
		if (($scheme) && ($scheme != 'off')) $scheme = 'https';
		else $scheme = 'http';
		return $scheme.'://'.$_SERVER['SERVER_NAME'];
	}
}

/**
 * ~ Errors info ~
 *
 * * Error code:
 * * 1 - Такая папка уже существует
 * * 2 - Такой файл уже существует
 * * 3 - Ошибка при создании папки
 * * 4 - Ошибка при создании файла
 * * 5 - Такой папки не существует
 * * 6 - Ошибка при удалении папки
 * * 7 - Такого файла не существует
 * * 8 - Ошибка при удалении файла
 * * 9 - Ошибка при переименовании файла или папки
 * * 10 - Ошибка при загрузки файла
 *
 * ~ Success info ~
 *
 * * Success code:
 * * 0 - Папка успешно создана
 * * 1 - Файл успешно создана
 * * 2 - Папка успешно удалена
 * * 3 - Файл успешно удален
 * * 4 - Файл или папка успешно переименованы
 * * 5 - Файл успешно загружен
 *
 */