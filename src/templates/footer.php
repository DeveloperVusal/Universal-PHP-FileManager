	</div>
	<div id="FM-windowUpload" class="FM-windowUpload" style="display: none; opacity: 0;">
		<div class="uploadBlock">
			<div class="uploadTitle">
				<span id="innerText">Example.txt</span>
				<div class="close" onclick="app.FMCloseProgressBar();"></div>
			</div>
			<div class="uploadBgLine">
				<div class="uploadLine"></div>
			</div>
		</div>
	</div>
</div>
<input type="hidden" value="<?=FM_URL;?>" name="FM-URL-HOME">
<input type="hidden" value="<?=FM_URL;?>/router/api.php" name="FM-URL-REQUEST">
<input type="hidden" value="<?=FM_Model::FMGetDomianUrl().FM_UPLOAD_DIR;?>" name="FM-URL-WEB">