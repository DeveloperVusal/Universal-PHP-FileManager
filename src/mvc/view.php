<?
/**
 * Класс Controller MVC структуры
 *
 * @author Мамедов Вусал
 * @description Ядро для работы с ФМ
 * @version 0.0.2
 * @property-read array $formatsFile - Массив с расшираениями файлов
 */
class FM_View {
	public $formatsFile = array(
		'none' => 'none',
		'txt' => 'txt',
		'png' => 'png',
		'jpg' => 'jpg',
		'jpeg' => 'jpg',
		'gif' => 'gif',
		'pdf' => 'pdf',
		'zip' => 'zip',
		'php' => 'php',
		'htm' => 'html',
		'html' => 'html',
		'js' => 'js',
		'css' => 'css',
		'xml' => 'xml',
		'docx' => 'doc',
		'doc' => 'doc',
		'mp3' => 'mp3',
		'mp4' => 'mp4',
		'eps' => 'eps',
		'avi' => 'avi',
		'xls' => 'xls',
		'xlsx' => 'xls'
	);

	/**
	 * Подгрузка верстки
	 *
	 * @param string $path - Абсолютный путь из главной директории, который указан в файле config.php
	 * @method Подгружает html, css и js скрипты для дальнейшей работы
	 * @access public
	 * @return Возвращает сформированные html данные
	 */
	public function load($path = null) {
		echo '<link rel="stylesheet" type="text/css" href="'.FM_URL.'/assets/css/style.css" />';
		require __DIR__.'/../templates/header.php';
		require __DIR__.'/../templates/content.php';
		require __DIR__.'/../templates/footer.php';
		echo '<script type="text/javascript" src="'.FM_URL.'/assets/js/app.js"></script>';
	}

	/**
	 * Геренация элементов в указанной директории
	 *
	 * @param string $FMCurrentPath - Абсолютный путь из главной директории, который указан в файле config.php
	 * @method Обращается к методу {getArrayDir} и генерирует html код
	 * @access public
	 * @return Возвращает сформированные html данные
	 */
	public function genContent($FMCurrentPath = null) {
		$dirItems = $this->getArrayDir($FMCurrentPath);
		$Model = new FM_Model();

		if (file_exists(FM_WEB_PATH.FM_URL.'/files-data.json')) {
			$jsonfile = json_decode(file_get_contents(FM_WEB_PATH.FM_URL.'/files-data.json'), true);
		} else {
			$jsonfile = array();
		}

		if (sizeof($dirItems)) {
			$i = 0;
			$temp = '<ul>';

			foreach ($dirItems as $key => $val) {
				if (is_dir(FM_WEB_PATH.FM_UPLOAD_DIR.$FMCurrentPath.$val)) {
					$onclick = 'onclick="app.FMOpenFolder(\''.$FMCurrentPath.$val.'/'.'\');"';
					$format = 'folder';
					$name = $val;

					if (strlen($name) > 16) {
						$name = mb_substr($name, 0, 15, 'utf-8').'...';
					}

					$temp .= '<li class="item FMItemContextMenu FMItemId-'.$i.'" id="Folder::'.$FMCurrentPath.$val.'/'.'::'.$i.'" '.$onclick.'> 
								<div class="icon '.$format.'"></div>
								<div class="name">'.$name.'</div>
								<div class="rename">
									<input type="text" name="itemRename" value="'.$val.'">
									<input type="hidden" name="itemOldName" value="'.$val.'">
								</div>
								<input type="hidden" name="prop-fullname" value="'.$val.'">
								<!--<input type="hidden" name="prop-format" value="'.$format.'">-->
								<!--<input type="hidden" name="prop-cdate" value="'.date('d.m.Y H:i:s', filectime($fullPath)).'">-->
								<input type="hidden" name="prop-edate" value="'.date('d.m.Y H:i:s', filemtime($fullPath)).'">
							</li>';
					$i++;
				}
			}

			foreach ($dirItems as $key => $val) {
				if (!is_dir(FM_WEB_PATH.FM_UPLOAD_DIR.$FMCurrentPath.$val)) {
					$fullPath = FM_WEB_PATH.FM_UPLOAD_DIR.$FMCurrentPath.$val;
					$onclick = '';
					$info = pathinfo($fullPath);

					$format =  (isset($info['extension']))?$info['extension']:'';

					$format2 = ($format === '')?'неизвестно':$format;
					$name = $info['filename'];

					if (mb_strlen($name, 'utf-8') > 16) {
						$name = mb_substr($name, 0, 15, 'utf-8').'...';
					}
					
					
					$sign = md5(':'.$val.':'.FM_WEB_PATH.':');
					$classFormat = (array_key_exists($format, $this->formatsFile))?$this->formatsFile[$format]:'none';
					$create_date = (iconv_strlen($jsonfile[FM_UPLOAD_DIR.$FMCurrentPath.$val])) ? $jsonfile[FM_UPLOAD_DIR.$FMCurrentPath.$val] : 'неизвестно';

					$temp .= '<li class="item FMItemContextMenu FMItemId-'.$i.'" id="File::'.$FMCurrentPath.htmlspecialchars($val).'::'.$i.'::'.$sign.'" '.$onclick.'> 
								<div class="icon '.$classFormat.'"></div>
								<div class="name">'.$name.'</div>
								<div class="rename">
									<input type="text" name="itemRename" value="'.$val.'">
									<input type="hidden" name="itemOldName" value="'.$val.'">
								</div>
								<input type="hidden" name="prop-fullname" value="'.$info['basename'].'">
								<input type="hidden" name="prop-format" value="'.$format2.'">
								<input type="hidden" name="prop-size" value="'.$Model->fileSizeBytes(filesize($fullPath)).'">
								<input type="hidden" name="prop-cdate" value="'.$create_date.'">
								<input type="hidden" name="prop-edate" value="'.date('d.m.Y H:i:s', filemtime($fullPath)).'">
							</li>';
					$i++;
				}
			}

			$temp .= '</ul>';
		} else {
			$temp = '<div class="emptyDir">Директория пуста. Чтобы добавить файлы, перетащите их в это окно.</div>';
		}

		return $temp;
	}

	/**
	 * Геренация элементов в указанной директории
	 *
	 * @param string $path - Абсолютный путь из главной директории, который указан в файле config.php
	 * @method Обращается к методу {getDir} в классе <FM_Model>
	 * @access private
	 * @return Возвращает массив данных
	 */
	private function getArrayDir($path = null) {
		$Model = new FM_Model();
		$dirs = $Model->getDir($path);
		return $dirs;
	}
}