<?php
/**
 * API
 *
 * @author Мамедов Вусал
 * @description Связывает работу клиента с View и Controller
 * @version 0.0.2
 */

if (isset($_REQUEST['FMRequest']) && (int)$_REQUEST['FMRequest'] == 1) {
	$_DIR = str_replace("\\", "/", __DIR__);
	$expl = explode('/', $_DIR);
	unset($expl[sizeof($expl)-1]);
	
	require implode('/', $expl).'/config.php';

	$Controller = new FM_Controller();

	if (isset($_REQUEST['FMCurrentPath'])) {
		echo $Controller->getDirForView($_REQUEST['FMCurrentPath']);
		exit;
	} elseif (isset($_REQUEST['FMPath'])) {
		if (isset($_REQUEST['NewFolderName']) && $_REQUEST['NewFolderName'] !== '') {
			$result = $Controller->newFolder($_REQUEST['NewFolderName'], $_REQUEST['FMPath']);
			echo $result;
			exit;
		} elseif (isset($_REQUEST['NewFileName']) && $_REQUEST['NewFileName'] !== '') {
			$result = $Controller->newFile($_REQUEST['NewFileName'], $_REQUEST['FMPath']);
			echo $result;
			exit;
		} elseif (isset($_REQUEST['RemoveFolderPath']) && $_REQUEST['RemoveFolderPath'] !== '') {
			$result = $Controller->removeFolderPath($_REQUEST['RemoveFolderPath']);
			echo $result;
			exit;
		} elseif (isset($_REQUEST['RemoveFilePath']) && $_REQUEST['RemoveFilePath'] !== '') {
			$result = $Controller->removeFilePath($_REQUEST['RemoveFilePath']);
			echo $result;
			exit;
		} elseif (isset($_REQUEST['FMRenamePath']) && $_REQUEST['FMRenamePath'] !== '') {
			$result = $Controller->renameFileFolderPath($_REQUEST['FMRenameNew'], $_REQUEST['FMRenameOld'], $_REQUEST['FMRenamePath']);
			echo $result;
			exit;
		} elseif (isset($_FILES['FMUploads'])) {
			$result = $Controller->uploadFilePath($_FILES['FMUploads'], $_REQUEST['FMPath']);
			echo $result;
			exit;
		}
	}
} else {
	$View = new FM_View();
	$View->load();
}