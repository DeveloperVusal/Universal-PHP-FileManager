<?php
/**
 * Класс Controller MVC структуры
 *
 * @author Мамедов Вусал
 * @description Ядро для работы с ФМ
 * @version 0.0.2
 */
class FM_Controller {
	/**
	 * Получает указанную директорию
	 *
	 * @param string $path - Абсолютный путь из главной директории, который указан в файле config.php
	 * @method Обращается к методу {genContent} в классе <FM_View>
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function getDirForView($path = null) {
		$View = new FM_View();
		$temp = $View->genContent(urldecode($path));
		return $temp;
	}
	
	/**
	 * Создает новую папу
	 *
	 * @param string $name - Название папки
	 * @param string $path - Абсолютный путь из главной директории, который указан в файле config.php
	 * @method Обращается к методу {createFolder} в классе <FM_Model>
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function newFolder($name, $path = null) {
		$Model = new FM_Model();
		$result = $Model->createFolder($name, $path);
		return $result;
	}

	/**
	 * Создает новый файл
	 *
	 * @param string $name - Название файла
	 * @param string $path - Абсолютный путь из главной директории, который указан в файле config.php
	 * @method Обращается к методу {createFile} в классе <FM_Model>
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function newFile($name, $path = null) {
		$Model = new FM_Model();
		$result = $Model->createFile($name, $path);
		return $result;
	}

	/**
	 * Удаляет папку
	 *
	 * @param string $path - Полный путь до папки из главной директории, который указан в файле config.php
	 * @method Обращается к методу {removeFolder} в классе <FM_Model>
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function removeFolderPath($path) {
		$Model = new FM_Model();
		$result = $Model->removeFolder($path);
		return $result;
	}

	/**
	 * Удаляет файл
	 *
	 * @param string $path - Полный путь до файла из главной директории, который указан в файле config.php
	 * @method Обращается к методу {removeFile} в классе <FM_Model>
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function removeFilePath($path) {
		$Model = new FM_Model();
		$result = $Model->removeFile($path);
		return $result;
	}

	/**
	 * Загрузка файлов на сервер
	 *
	 * @param array $file - Массив с данными файла
	 * @param string $path - Абсолютный путь из главной директории, который указан в файле config.php
	 * @method Обращается к методу {uploadFile} в классе <FM_Model>
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function uploadFilePath($file, $path = null) {
		$Model = new FM_Model();
		$result = $Model->uploadFile($file, $path);
		return $result;
	}

	/**
	 * Переименовыает файл или папку
	 *
	 * @param array $newName - Новое название
	 * @param array $oldName - Старое название
	 * @param string $path - Абсолютный путь из главной директории, который указан в файле config.php
	 * @method Обращается к методу {renameFileFolder} в классе <FM_Model>
	 * @access public
	 * @return Возвращает массив данных
	 */
	public function renameFileFolderPath($newName, $oldName, $path) {
		$Model = new FM_Model();
		$result = $Model->renameFileFolder($newName, $oldName, $path);
		return $result;
	}
}