<div class="FM-Block-Parent">
	<div class="TopBar line" id="Header-1">
		<ul>
			<li style="margin-right: 15px; display: none;" class="hint hint-bottom" onclick="app.FMButtonBack();" id="FMButtonBack" data-hint="Назад">
				<div class="Button-Back"></div>
			</li>
			<li class="hint hint-bottom" data-hint="Загрузить файл" onclick="app.FMUploadFile();">
				<div class="Button-Upload"></div>
			</li>
			<li style="margin-left: 15px;" class="hint hint-bottom" onclick="app.FMNewFile();" data-hint="Новый файл">
				<div class="Button-FileNew"></div>
			</li>
			<li style="margin-left: 15px;" class="hint hint-bottom" onclick="app.FMNewFolder();" data-hint="Новая папка">
				<div class="Button-FolderNew"></div>
			</li>
			<li style="float: right" class="hint hint-left" onclick="app.authorInfo();" data-hint="Дополнительная информация">
				<div class="Button-Question"></div>
			</li>
			<li style="float: right; margin-right: 15px;" class="hint hint-left" onclick="let __GET = app.fn_GET(); app.FMOpenFolder(__GET['FMCurrentPath']);" data-hint="Обновить содержимое">
				<div class="Button-Refresh"></div>
			</li>
		</ul>
	</div>
	<div class="fullPath line" id="Header-2">
		<?=FM_UPLOAD_DIR;?><span id="currentPathChange"><?=urldecode($_GET['FMCurrentPath']);?></span>
	</div>
	<div class="wrap">