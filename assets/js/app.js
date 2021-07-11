"use strict";

/**
 * Класс для работы с ФМ
 *
 * @author Мамедов Вусал
 * @description Ядро для работы с ФМ
 * @version 0.0.2
 */
class FMApp {
	/**
	 * @constructor
	 * @param {string} elemID - идентификатор элемента, с которым будет работать
	 * @return Ничего не возвращает
	 */
	constructor(elemID) {
		this.elemInit = document.getElementById(elemID);
		this.editRenameId = null;
		this.clickTypeItem = null;
		this.clickContextMenuActive = null;
		this.init();
	};

	/**
	 * Инцилизирует данные для загрузки ФМ
	 *
	 * @description Запускает метод FMOpenFolder
	 * @return Ничего не возвращает
	 */
	init() {
		let iThis = this,
			$_GET = this.fn_GET();

		if (
			$_GET['FMCurrentPath'] == undefined || 
			$_GET['FMCurrentPath'] == null || 
			$_GET['FMCurrentPath'] == ''
		) {
			$_GET['FMCurrentPath'] = '';
		}

		let windowHeight = window.screen.height,
			headHeight = document.getElementById('Header-1').offsetHeight + document.getElementById('Header-2').offsetHeight + document.getElementById('FM-windowUpload').offsetHeight;
		//document.querySelector('.FM-Block-Parent .wrap').style.height = (windowHeight-(headHeight*3)) + 'px';
		//alert(windowHeight-headHeight);

		this.FMOpenFolder($_GET['FMCurrentPath']);
	};

	/**
	 * Создает новый файл
	 *
	 * @description При успешном результате вызывается метод FMOpenFolder
	 * @return Ничего не возвращает
	 */
	FMNewFile() {
		let result = prompt('Введите название файла'),
			iThis = this,
			$_GET = this.fn_GET();

		if (
			$_GET['FMCurrentPath'] == undefined || 
			$_GET['FMCurrentPath'] == null || 
			$_GET['FMCurrentPath'] == ''
		) {
			$_GET['FMCurrentPath'] = '';
		}

		if (result != null) {
			this.sendAjax({
	            type: 'POST',
	            url: document.querySelector('input[name=FM-URL-REQUEST]').value,
	            data: {
	            	'FMPath': $_GET['FMCurrentPath'],
	            	'NewFileName': result,
	            	'FMRequest': 1
	            },
	            dataType: 'json',
	            success: function(data) {
	            	iThis.clickContextMenuActive = null;
	            	
	            	if (data !== '' && data !== null && data !== undefined) {
	            		if (data.message == 'success') {
	            			iThis.FMOpenFolder($_GET['FMCurrentPath']);
	            		} else if (data.message == 'error') {
	            			console.log(data);
	            			alert(data.description);
	            		}
	                }
	            }
	        });
		}
	};

	/**
	 * Создает новую папку
	 *
	 * @description При успешном результате вызывается метод FMOpenFolder
	 * @return Ничего не возвращает
	 */
	FMNewFolder() {
		let result = prompt('Введите название папки'),
			iThis = this,
			$_GET = this.fn_GET();

		if (
			$_GET['FMCurrentPath'] == undefined || 
			$_GET['FMCurrentPath'] == null || 
			$_GET['FMCurrentPath'] == ''
		) {
			$_GET['FMCurrentPath'] = '';
		}

		if (result != null) {
			this.sendAjax({
	            type: 'POST',
	            url: document.querySelector('input[name=FM-URL-REQUEST]').value,
	            data: {
	            	'FMPath': $_GET['FMCurrentPath'],
	            	'NewFolderName': result,
	            	'FMRequest': 1
	            },
	            dataType: 'json',
	            success: function(data) {
	            	iThis.clickContextMenuActive = null;
	            	
	            	if (data !== '' && data !== null && data !== undefined) {
	            		if (data.message == 'success') {
	            			iThis.FMOpenFolder($_GET['FMCurrentPath']);
	            		} else if (data.message == 'error') {
	            			console.log(data);
	            			alert(data.description);
	            		}
	                }
	            }
	        });
		}
	};

	/**
	 * Удаляет папку
	 *
	 * @description При успешном результате вызывается метод FMOpenFolder
	 * @param {string} path - абсолютный путь из главной директории,
	 *                        который указан в файле config.php
	 * @return Ничего не возвращает
	 */
	FMRemoveFolder(path) {
		this.clickContextMenuActive = 'removeFolder';
		let iThis = this,
			$_GET = this.fn_GET(),
			result = 0;

		if (
			$_GET['FMCurrentPath'] == undefined || 
			$_GET['FMCurrentPath'] == null || 
			$_GET['FMCurrentPath'] == ''
		) {
			$_GET['FMCurrentPath'] = '';
		}

		result = confirm('Вы действително хотите удалить папку?');

		if (result) {
			this.sendAjax({
	            type: 'POST',
	            url: document.querySelector('input[name=FM-URL-REQUEST]').value,
	            data: {
	            	'FMPath': $_GET['FMCurrentPath'],
	            	'RemoveFolderPath': path,
	            	'FMRequest': 1
	            },
	            dataType: 'json',
	            success: function(data) {
	            	iThis.clickContextMenuActive = null;

	            	if (data !== '' && data !== null && data !== undefined) {
	            		if (data.message == 'success') {
	            			iThis.FMOpenFolder($_GET['FMCurrentPath']);
	            		} else if (data.message == 'error') {
	            			console.log(data);
	            			alert(data.description);
	            		}
	                }
	            }
	        });
		}
	};

	/**
	 * Удаляет файл
	 *
	 * @description При успешном результате вызывается метод FMOpenFolder
	 * @param {string} path - абсолютный путь из главной директории,
	 *                        который указан в файле config.php
	 * @return Ничего не возвращает
	 */
	FMRemoveFile(path) {
		this.clickContextMenuActive = 'removeFile';
		let iThis = this,
			$_GET = this.fn_GET(),
			result = 0;

		if (
			$_GET['FMCurrentPath'] == undefined || 
			$_GET['FMCurrentPath'] == null || 
			$_GET['FMCurrentPath'] == ''
		) {
			$_GET['FMCurrentPath'] = '';
		}

		result = confirm('Вы действително хотите удалить файл?');

		if (result) {
			this.sendAjax({
	            type: 'POST',
	            url: document.querySelector('input[name=FM-URL-REQUEST]').value,
	            data: {
	            	'FMPath': $_GET['FMCurrentPath'],
	            	'RemoveFilePath': path,
	            	'FMRequest': 1
	            },
	            dataType: 'json',
	            success: function(data) {
	            	iThis.clickContextMenuActive = null;

	            	if (data !== '' && data !== null && data !== undefined) {
	            		if (data.message == 'success') {
	            			iThis.FMOpenFolder($_GET['FMCurrentPath']);
	            		} else if (data.message == 'error') {
	            			console.log(data);
	            			alert(data.description);
	            		}
	                }
				}
			});
		}
	};

	/**
	 * Открывает нужную директорию
	 *
	 * @description При успешном результате, ответ добавляется в div элемент
	 * @param {string} path - абсолютный путь из главной директории,
	 *                        который указан в файле config.php
	 * @return Ничего не возвращает
	 */
	FMOpenFolder(path) {
		if (this.clickContextMenuActive != null) return;

		let iThis = this;

		this.fadeIn({
			element: document.getElementById('FM-Preloader'),
			duration: 1500,
			success: function(data) {
				let iThis2 = iThis;
				console.log('success fadeIn = OpenFolder');

				iThis.sendAjax({
		            type: 'POST',
		            url: document.querySelector('input[name=FM-URL-REQUEST]').value,
		            data: {
		            	'FMCurrentPath': path,
		            	'FMRequest': 1
		            },
		            success: function(data) {
		            	console.log('success data');

		            	if (data !== '' && data !== null && data !== undefined) {
		            		let btn = document.getElementById('FMButtonBack');

							if (
								path == undefined || 
								path == null || 
								path == ''
							) {
								btn.style.display = 'none';
							} else {
								btn.style.display = 'inline-block';
							}

		            		var i = 0,
		            			strGET = window.location.search.replace('?', '');
						    strGET = strGET.split('&');
						    var RES = {},
						    	search = false;

						    for (i = 0; i < strGET.length; i++) {
						        var ex = strGET[i].split('=');
						        RES[ex[0]] = ex[1];
						    }

						    document.getElementById('currentPathChange').innerHTML = decodeURIComponent(path);
						    RES['FMCurrentPath'] = decodeURIComponent(path);
						    var queryGetStr = [];
						    i = 0;

						    for (let [key, value] of Object.entries(RES)) {
						    	if (key != '' && key != undefined) {
									queryGetStr[i] = key + '=' + value;
									i++;
								}
							}

							queryGetStr = queryGetStr.join('&');
							let href = window.location.href;
							href = href.split('?');
							href = href[0];

		            		history.pushState(null, null,  href + '?' + queryGetStr);
		            		document.getElementById('FM-Content-Loaded').innerHTML = data;

		                    iThis2.fadeOut({
								element: document.getElementById('FM-Preloader'),
								duration: 1500,
								success: function(obj) {
									console.log('success fadeOut');
									obj.element.style.display = 'none';
								}
							});
		                }
		            }
		        });
			}
		});
	};

	/**
	 * Переходит на директорию выше (т.е. назад)
	 *
	 * @description Вызывается метод FMOpenFolder
	 * @return Ничего не возвращает
	 */
	FMButtonBack() {
		let btn = document.getElementById('FMButtonBack'),
			$_GET = this.fn_GET(),
			path = $_GET['FMCurrentPath'].split('/'),
			newArr = [];

		for (var i = path.length - 3; i >= 0; i--) {
			newArr[i] = path[i];
		}

		let newPath = newArr.join('/');

		if (newPath == undefined || newPath == null || newPath == '') {
			//no code
		} else {
			newPath = newPath + '/';
		}

		this.FMOpenFolder(newPath);
	};

	/**
	 * Копирует ссылку
	 *
	 * @description Копирует (сохраняет в буфер обмена) ссылку до файла или папки
	 * @param {string} text - текст или ссылка на файл\папку
	 * @return Ничего не возвращает
	 */
	FMCopyURL(text) {
		this.clickContextMenuActive = 'copyUrl';
		let iThis = this;
		navigator.clipboard.writeText(text).then(function() {
			console.log('success clipboard');
			iThis.clickContextMenuActive = null;
			alert('Ссылка скопирована');
		}, function() {
			console.log('error clipboard');
			iThis.clickContextMenuActive = null;
		});
	};

	/**
	 * Показывает ссылку
	 *
	 * @description Показывает ссылку до файла или папки в alert окне
	 * @param {string} text - текст или ссылка на файл\папку
	 * @return Ничего не возвращает
	 */
	FMShowURL(text) {
		this.clickContextMenuActive = 'showUrl';
		alert(text);
		this.clickContextMenuActive = null;
	};

	/**
	 * Изменяет название
	 *
	 * @description Изменяет название файла или папки
	 * @param {int} id - идентификатор списка элемента (li)
	 * @return Ничего не возвращает
	 */
	FMRename(id) {
		this.clickContextMenuActive = 'rename';
		let item = document.querySelector('li.FMItemId-' + id);

		for (var i = 0; i < item.children.length; i++) {
			if (item.children[i].className == 'name') {
				item.children[i].style.display = 'none';
			}

			if (item.children[i].className == 'rename') {
				item.children[i].style.display = 'block';
				let input = item.children[i].querySelector('input');
				let value = input.value;
				let valarr = value.split('.');

				if (valarr.length > 1) {
					valarr = valarr.splice(0, valarr.length-1);
					value = valarr.join('.');
				} else {
					value = valarr[0];
				}

				input.setSelectionRange(0, value.length);
				input.focus();
			}
		}
	};

	/**
	 * Сохранение изменяений в названии
	 *
	 * @description Сохранение изменяений в названии файла или папки
	 * @return Ничего не возвращает
	 */
	FMRenameSave() {
		let item = document.querySelector('li.FMItemId-' + this.editRenameId),
			iThis = this,
			$_GET = this.fn_GET();

		if (
			$_GET['FMCurrentPath'] == undefined || 
			$_GET['FMCurrentPath'] == null || 
			$_GET['FMCurrentPath'] == ''
		) {
			$_GET['FMCurrentPath'] = '';
		}

		for (var i = 0; i < item.children.length; i++) {
			let itemID = item.getAttribute('id');
			itemID = itemID.split('::');
			let path = itemID[1];

			if (item.children[i].className == 'rename') {
				let inputs = item.children[i].querySelectorAll('input'),
					renameDiv = item.children[i];

				if (inputs[0].value == '') {
					inputs[0].value = inputs[1].value
				}

				this.sendAjax({
		            type: 'POST',
		            url: document.querySelector('input[name=FM-URL-REQUEST]').value,
		            data: {
		            	'FMPath': $_GET['FMCurrentPath'],
		            	'FMRenameNew': inputs[0].value,
		            	'FMRenameOld': inputs[1].value,
		            	'FMRenamePath': path,
		            	'FMRequest': 1
		            },
		            dataType: 'json',
		            success: function(data) {
		            	iThis.clickContextMenuActive = null;
	            	
	            		if (data !== '' && data !== null && data !== undefined) {
		            		if (data.message == 'success') {
		            			renameDiv.style.display = 'none';
								let inputs2 = renameDiv.querySelectorAll('input');
								inputs2[1].value = inputs2[0].value;

								for (var h = 0; h < item.children.length; h++) {
									if (item.children[h].className == 'name') {
										let newName = inputs2[0].value.split('.');

										if (newName.length > 1){
											newName = newName.splice(0, newName.length-1);
											item.children[h].innerHTML = newName.join('.');
										} else {
											item.children[h].innerHTML = newName[0];
										}

										item.children[h].style.display = 'block';
									}
								}

								itemID[1] = data.details.newPath;
								itemID = itemID.join('::');
								item.setAttribute('id', itemID);
		            		} else if (data.message == 'error') {
		            			console.log(data);
		            			alert(data.description);
		            		}
		                }
		            }
		        });
			}
		}
	};

	/**
	 * Загрузка файлов
	 *
	 * @description Сохранение изменяений в названии файла или папки
	 * @return Ничего не возвращает
	 */
	FMUploadFile() {
		let input = document.createElement('input');
		input.type = 'file';
		input.setAttribute('multiple', '');
		input.click();

		let iThis = this,
			$_GET = this.fn_GET();

		if (
			$_GET['FMCurrentPath'] == undefined || 
			$_GET['FMCurrentPath'] == null || 
			$_GET['FMCurrentPath'] == ''
		) {
			$_GET['FMCurrentPath'] = '';
		}

		input.onchange = function(event) {
			let files = event.target.files,
				iThis2 = iThis;
			console.log(files);
			iThis.forAjaxUpload($_GET['FMCurrentPath'], files, 0);
		};
	}

	/**
	 * Рекурсивная загрузка файлов
	 *
	 * @param {array} files - массив с файлами
	 * @param {int} i - индекс (номер) массива, для рекурсии
	 * @return Возвращает false в случае заверешения или ошибки
	 */
	forAjaxUpload(path, files, i) {
		if (files.hasOwnProperty(i)) {
			let file = files[i],	
				formData = new FormData(),
				elem = document.querySelector('#FM-windowUpload');
			formData.append('FMPath', path);
			formData.append('FMRequest', 1);
			formData.append('FMUploads[]', file, file.name);
			let iThis = this;

			this.sendAjax({
	            type: 'POST',
	            url: document.querySelector('input[name=FM-URL-REQUEST]').value,
	            data: formData,
	            beforeSend: function() {
	            	elem.style.display = 'block';
					elem.style.opacity = 1;
					elem.querySelector('.uploadLine').style.width = '0%';
					console.dir(elem);
					elem.querySelector('.uploadTitle #innerText').innerHTML = file.name;
	            },
	            processData: false,
	            contentType: false,
	            progress: function(evt) {
					// если известно количество байт
					if(evt.lengthComputable) { 
						// высчитываем процент загруженного
						var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
						elem.querySelector('.uploadLine').style.width = percentComplete + '%';
					}
	            },
	            dataType: 'json',
	            success: function(data) {
	            	iThis.clickContextMenuActive = null;
	            	if (data !== '' && data !== null && data !== undefined) {
	            		if (data.message == 'success') {
	            			console.log('success uploadFile');
	            			iThis.FMOpenFolder(path);
	            			iThis.forAjaxUpload(path, files, i+1);
	            		} else if (data.message == 'error') {
	            			console.log(data);
	            			alert(data.description);
	            		}
	                }
	            }
	        });
		} else {
			return false;
		}
	}

	/**
	 * Закрыть прогресс бар
	 *
	 * @description Закрыть прогресс баг загрузки файлов
	 * @return Ничего не возвращает
	 */
	FMCloseProgressBar() {
		let elem = document.querySelector('#FM-windowUpload');
		elem.style.display = 'none';
		elem.style.opacity = 0;
		elem.querySelector('.uploadTitle #innerText').innerHTML = '';
		elem.querySelector('.uploadLine').style.width = '0%';
	};

	/**
	 * Скачивание файла
	 *
	 * @description Перенапрявляяет на специальную страницу скачивания
	 * @param {string} path - абсолютный путь из главной директории,
	 *                        который указан в файле config.php
	 * @return Ничего не возвращает
	 */
	FMDownloadFile(path, sign) {
		let queryGetStr = 'FMDownloadFILE=' + path + '&FMDownloadSIGN=' + sign;
		window.location.href =  document.querySelector('input[name=FM-URL-HOME]').value + '/download.php?' + queryGetStr;
	};

	/**
	 * Свойтсва файла или папки
	 *
	 * @description Показывает свойства файла или папки
	 * @param {object} details - объект со свойствами файла или папки
	 * @param {string} type - тип свойства file или folder
	 * @return Ничего не возвращает
	 */
	FMProperties(details, type) {
		let temp;
		if (type == 'folder') {
			temp =  "Название: " + details.fullname + "\n" +
					"Тип: папка с файлами\n" + 
					"Создан: неивестно\n" +
					"Дата изменения: " + details.edate;
		} else if (type == 'file') {
			temp =  "Название: " + details.fullname + "\n" +
					"Тип файла: " + details.format + "\n" +
					"Размер: " + details.size + "\n" +
					"Создан: " + details.cdate + "\n" +
					"Дата изменения: " + details.edate;
		}

		alert(temp);
	};

	// Other functions

	/**
	 * Открывает дополнительную информацию о ФМ
	 *
	 * @return Ничего не возвращает
	 */
	authorInfo() {
		alert("Название: FileManager 2020\nВерсия: 0.0.3\nАвтор: Мамедов Вусал\nСтраница ВК: vk.com/dev.vusal");
	};

	/**
	 * Создание своего контекстного меню
	 *
	 * @description Специальной контекстное меню для списка элемента (файла или папки)
	 * @param {object} options - объект с нужными свойствами
	 * @properties {string} toCreate - где создавать div контекстное меню, рекомендуется "document.body"
	 * @properties {string} width - ширина контекстного меню
	 * @properties {object} items - какие элменты будут меню key (Название), value (атрибуты элемента)
	 * @properties {string} elemClickClassName - по клику ПКМ на како элмент заменять контекстное меню
	 * @return Ничего не возвращает
	 */
	createContextMenu(options) {
        options.toCreate.style.position = 'relative';

        if (
        	options.width == null || 
        	options.width == '' || 
        	options.width == undefined
        ) {
        	options.width = 'auto';
        }

        options.toCreate.innerHTML += '<style>' +
                                        '#contextMenu {' +
                                            'position: absolute;' +
                                            'display: none;' +
                                            'z-index: 500;' +
                                        '}' +
                                        '#contextMenu ul {' +
                                            'list-style: none;' +
                                            'margin: 0px;' +
                                            'padding: 5px 0px;' +
                                            'display: block;' +
                                            'width: ' + options.width + ';' +
                                            'background: #fff;' +
                                            'border: 1px solid #acacac;' +
                                        '}' +
                                        '#contextMenu ul li{' +
                                            'display: block;' +
                                            'font-size: 10pt;' +
                                            'padding: 5px 20px;' +
                                        '}' +
                                        '#contextMenu ul li:hover{' +
                                            'cursor: pointer;' +
                                            'background: #ddd;' +
                                        '}' +
                                    '</style>';
        let newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'contextMenu');
        let html = '<ul>';

        for (let [key, value] of Object.entries(options.items)) {
        	html += '<li ' + value + '>' + key + '</li>';
        }

        html += '</ul>';
        newDiv.innerHTML += html;
        options.toCreate.append(newDiv);

        document.addEventListener('contextmenu', function(event) {
        	let clickStatus = clickInsideElement(event, options.elemClickClassName);

        	if (clickStatus) {
        		event.preventDefault();
        		let elementId = clickStatus.getAttribute('id'),
        			menuPos = getPosition(event);
        		toggleContextMenu({
	                status: true,
	                fullStatus: 1,
	                pos: menuPos,
	                elementId: elementId
	            });
        	} else {
	            toggleContextMenu({
	                status: false,
	                fullStatus: 0,
	            });
	        }
	    });

        document.addEventListener('click', function(event) {
        	event.preventDefault();
     		let contextMenu = document.getElementById('contextMenu');

	        if (contextMenu.style.display == 'none' && event.target.tagName !== 'INPUT') {
		        toggleContextMenu({
		            status: false,
		            fullStatus: 0,
		        });
		    } else {
		    	toggleContextMenu({
		            status: false,
		            fullStatus: 2,
		        });
		    }
	    });

	    document.addEventListener('keyup', function(event) {
	    	if (event.keyCode == 13) {
	    		console.log(document.activeElement.tagName);
	    		if (document.activeElement.tagName == 'INPUT') {
	    			toggleContextMenu({
			            status: false,
			            fullStatus: 0,
			        });
	    		}
	    	}
	    });

        let iThis = this;

	    function toggleContextMenu(opt) {
	        if (opt.status == true) {
	            let contextMenu = document.getElementById('contextMenu');
	            contextMenu.style.display = 'inline-block';
	            contextMenu.style.left = opt.pos.x + 'px';
	            contextMenu.style.top = (opt.pos.y) + 'px';
	            //console.log(options.elementId);
	            let typeItem = opt.elementId,
	            	itemElem = document.getElementById(opt.elementId);
	            typeItem = typeItem.split('::');
	            iThis.editRenameId = typeItem[2];

	            if (typeItem[0] == 'Folder') {
	            	let propEdDate = itemElem.querySelector('input[name=prop-edate]').value,
	            		propFullname = itemElem.querySelector('input[name=prop-fullname]').value;
	            	//propFormat = itemElem.querySelector('input[name=prop-format]').value;
	            	//propCrDate = itemElem.querySelector('input[name=prop-cdate]').value

	            	iThis.clickTypeItem = 'folder';
	            	contextMenu.querySelector('li#itemOpen').style.display = 'block';
	            	contextMenu.querySelector('li#itemOpen').setAttribute('onclick', 'app.FMOpenFolder("' + typeItem[1] + '");');

	            	contextMenu.querySelector('li#itemRemove').setAttribute('onclick', 'app.FMRemoveFolder("' + typeItem[1] + '");');

	            	contextMenu.querySelector('li#itemShowUrl').style.display = 'none';

	            	contextMenu.querySelector('li#itemCopyUrl').style.display = 'none';

	            	contextMenu.querySelector('li#itemRename').setAttribute('onclick', 'app.FMRename("' + typeItem[2] + '");');

	            	contextMenu.querySelector('li#itemDownload').style.display = 'none';

	            	contextMenu.querySelector('li#itemProperties').setAttribute('onclick', 'app.FMProperties({edate: "' + propEdDate + '", fullname: "' + propFullname + '"}, "folder");');
	            } else if (typeItem[0] == 'File') {
	            	let propEdDate = itemElem.querySelector('input[name=prop-edate]').value,
	            		propFormat = itemElem.querySelector('input[name=prop-format]').value,
	            		propSize = itemElem.querySelector('input[name=prop-size]').value,
	            		propFullname = itemElem.querySelector('input[name=prop-fullname]').value,
						propCrDate = itemElem.querySelector('input[name=prop-cdate]').value;
	            	//console.log(itemElem.children['prop-format'].value);

	            	iThis.clickTypeItem = 'file';
	            	contextMenu.querySelector('li#itemOpen').style.display = 'none';
	            	contextMenu.querySelector('li#itemRemove').setAttribute('onclick', 'app.FMRemoveFile("' + typeItem[1] + '");');

	            	contextMenu.querySelector('li#itemShowUrl').style.display = 'block';
	            	contextMenu.querySelector('li#itemShowUrl').setAttribute('onclick', 'app.FMShowURL("' + document.querySelector('input[name=FM-URL-WEB]').value + typeItem[1] + '");');

	            	contextMenu.querySelector('li#itemCopyUrl').style.display = 'block';
	            	contextMenu.querySelector('li#itemCopyUrl').setAttribute('onclick', 'app.FMCopyURL("' + document.querySelector('input[name=FM-URL-WEB]').value + typeItem[1] + '");');

	            	contextMenu.querySelector('li#itemRename').setAttribute('onclick', 'app.FMRename("' + typeItem[2] + '");');

	            	contextMenu.querySelector('li#itemDownload').style.display = 'block';
	            	contextMenu.querySelector('li#itemDownload').setAttribute('onclick', 'app.FMDownloadFile("' + typeItem[1] + '", "' + typeItem[3] + '");');

	            	contextMenu.querySelector('li#itemProperties').setAttribute('onclick', 'app.FMProperties({edate: "' + propEdDate + '", cdate: "' + propCrDate + '", format: "' + propFormat + '", size: "' + propSize + '", fullname: "' + propFullname + '"}, "file");');
	            }
	            //contextMenu.querySelector('li#Remove').setAttribute('onclick', 'deleteMessage(' + options.idMsg + ', false)');
	        } else if (status == false) {
	            let contextMenu = document.getElementById('contextMenu');
	            contextMenu.style.display = 'none';

	            if (opt.fullStatus == 0 && iThis.clickContextMenuActive == 'rename') iThis.FMRenameSave();
	        }
	    }

        function getPosition(e) {
			var mouse_x = 0,
				mouse_y = 0;

    		if (document.attachEvent != null) {
				mouse_x = window.event.clientX;
	        	mouse_y = window.event.clientY;
		    } else if (!document.attachEvent && document.addEventListener) {
		        mouse_x = event.clientX;
		        mouse_y = event.clientY;
		    }

	        return {
	            x: mouse_x,
	            y: mouse_y
	        }
	    }

	    function clickInsideElement(e, className) {
	        var el = e.srcElement || e.target;

	        if (el.classList.contains(className)) {
	            return el;
	        } else {
	            while (el = el.parentNode) {
	                if (el.classList && el.classList.contains(className)) {
	                    return el;
	                }
	            }
	        }

	        return false;
	    }
    };

	/**
	 * Получаем GET данные
	 *
	 * @description Из URL получаем GET данные - аналог php
	 * @return Возвращает массив данных
	 */
	fn_GET() {
	    var strGET = window.location.search.replace('?', '');
	    strGET = strGET.split('&');
	    var RES = {};

	    for (var i = 0; i < strGET.length; i++) {
	        var ex = strGET[i].split('=');
	        RES[ex[0]] = ex[1];
	    }

	    return RES;
	};

	/**
	 * Метод отправки AJAX запросов - почти аналог jQuery функции
	 *
	 * @param {object} options - объект с нужными свойствами
	 * @properties {string} type - Тип отправки данных GET/POST
	 * @properties {string} url - URL отправки запроса
	 * @properties {object} data - объкт с данными
	 * @properties {method} beforeSend - метод вызывается перед отправкой запроса
	 * @properties {bool} async - синхронные запросы, по умолчанию true
	 * @properties {method} progress - возвращает событие процесса загрузки файла
	 * @properties {string} dataType - если нужно получить данные в json, то пишем 'json',
	 								 иначе пропускаем это свойство
	 * @properties {method} success - метод успешного обратного вызова (callback), который возврщает результат
	 * @properties {method} error - метод неуспешного обратного вызова (callback), который
	 						        возврщает результат ошибки
	 * @properties {bool} processData - параметр со значением false предотвратит автоматическое преобразование
	 									данных FormData в строку запроса
	 * @properties {bool} contentType - параметр со значением со значением false запретит устанавливать 
	 									заголовок Content-Type и оставит это действие объекту XMLHttpRequest
	 * @return Возвращает callback's (коллбэки) success, error
	 */
	sendAjax(array) {
		if (array.hasOwnProperty('beforeSend')) array.beforeSend();

		let bodySend = null;

		if (array.processData == false) {
		  	bodySend = array.data;
		} else {
	        let dataOld = array.data,
	            i = 0,
	            data = [];
	        //console.log(dataOld);
	        for (let [key, value] of Object.entries(dataOld)) {
				data[i] = key + "=" + encodeURIComponent(value);
	            i++;
			}

			bodySend = data.join("&");
			console.log(bodySend);
	    }

        let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
        	xhr = new XHR();

        if (array.hasOwnProperty('progress')) {
	        xhr.upload.onprogress = function(event) {
	       		array.progress(event);
	       	};
	    }

       	if (
       		array.async == null || 
       		array.async == undefined || 
       		array.async == ''
       	) {
       		array.async = true;
       	}

        xhr.open(array.type, array.url, array.async);

        if (array.charset == undefined || array.charset == "") {
            array.charset = "utf-8";
        }

        if (array.contentType == false) {
			//no code
		} else {
        	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    	}

        xhr.onload = function() {
            if (array.dataType == 'json') {
                array.success(JSON.parse(this.responseText));
            } else {
                array.success(this.responseText);
            }
        };

        xhr.onerror = function() {
            array.error(this.responseText);
        };

        xhr.send(bodySend);
    };

    /**
	 * Плавное исчезновение элемента
	 *
	 * @param {object} options - объект с нужными свойствами
	 * @properties {DOM} element - DOM элемент
	 * @properties {int} duration - Длительность анимации. По умолчанию 500
	 * @return Возвращает callback (коллбэк) success
	 */
	fadeOut(options) {
		let duration = 500;

		if (
			options.duration !== '' && 
			options.duration !== undefined && 
			options.duration !== null
		) {
			duration = options.duration;
		}

		let startAnim = 10,
			endAnim = 0,
			time = new Date(),
			timeStart = time.getTime();

		function setTimeoutHide() {
			let tm = new Date(),
				now = tm.getTime() - timeStart,
				progress = now / duration;
			let opacity = (endAnim - startAnim) * delta(progress) + startAnim;
			opacity = opacity/10;

			if (opacity < 0) opacity = 0;

			options.element.style.opacity = opacity;
			//console.log(options.element.getAttribute('id'));
			//console.log(options.element.style.opacity);

			if (progress < 1) {
				setTimeout(setTimeoutHide, 20);
			} else {
				options.element.style.display = 'none';
				if (options.hasOwnProperty('success')) {
					options.success({
						opacity: 0,
						element: options.element
					});
				}
			}
		}

		setTimeout(setTimeoutHide, 20);

		function delta(progress) {
		    return Math.pow(progress, 2);
		}
	};

	/**
	 * Плавное появление элемента
	 *
	 * @param {object} options - объект с нужными свойствами
	 * @properties {DOM} element - DOM элемент
	 * @properties {int} duration - Длительность анимации. По умолчанию 500
	 * @return Возвращает callback (коллбэк) success
	 */
	fadeIn(options) {
		options.element.style.display = 'block';
		let duration = 500;

		if (
			options.duration !== '' && 
			options.duration !== undefined && 
			options.duration !== null
		) {
			duration = options.duration;
		}

		let startAnim = 0,
			endAnim = 10,
			time = new Date(),
			timeStart = time.getTime();

		function setTimeoutShow() {
			let tm = new Date(),
				now = tm.getTime() - timeStart,
				progress = now / duration;
			let opacity = (endAnim - startAnim) * delta(progress) + startAnim;
			opacity = opacity/10;

			if (opacity > 1) opacity = 1;

			options.element.style.opacity = opacity;
			//console.log(options.element.getAttribute('id'));
			//console.log(options.element.style.opacity);

			if (progress < 1) {
				setTimeout(setTimeoutShow, 20);
			} else {
				if (options.hasOwnProperty('success')) {
                    options.success({
                        opacity: 1,
                        element: options.element
                    });
                }
			}
		}

		setTimeout(setTimeoutShow, 20);

		function delta(progress) {
			return Math.pow(progress, 2);
		}
	};
}

let app = new FMApp('FM-Content-Loaded');

document.addEventListener('DOMContentLoaded', function(event) {
	let $_GET = app.fn_GET();

	if (
		$_GET['FMCurrentPath'] == undefined || 
		$_GET['FMCurrentPath'] == null || 
		$_GET['FMCurrentPath'] == ''
	) {
		$_GET['FMCurrentPath'] = '';
	} else {
		let btn = document.getElementById('FMButtonBack');
		btn.style.display = 'inline-block';
	}

	app.createContextMenu({
		toCreate: document.body,
		elemClickClassName: 'FMItemContextMenu',
		width: '200px',
    	items: {
    		'Открыть': 'id="itemOpen"',
    		'Переименовать': 'id="itemRename"',
    		//'! Копировать': 'id="" onclick="alert(\'Скоро!\');"',
    		'Показать URL': 'id="itemShowUrl"',
    		'Удалить': 'id="itemRemove"',
    		'Копировать URL': 'id="itemCopyUrl"',
    		'Скачать': 'id="itemDownload"',
    		'Свойства': 'id="itemProperties"'
    	}
    });

    let dropZone = document.getElementById('FM-Content-Loaded'),
    	dropZone2 = document.getElementById('FM-DragAndDrop');

    dropZone.addEventListener('dragover' , function(event) {
    	event.preventDefault();
    	document.getElementById('FM-DragAndDrop').style.display = 'block';
    	document.getElementById('FM-DragAndDrop').style.zIndex = 10;
    	return false;
    });

    dropZone2.addEventListener('dragover' , function(event) {
    	event.preventDefault();
    	return false;
    });

     dropZone.addEventListener('dragleave' , function(event) {
    	event.preventDefault();
    	return false;
    });

    dropZone2.addEventListener('dragleave' , function(event) {
    	event.preventDefault();
    	this.style.display = 'none';
    	this.style.zIndex = 0;
    	return false;
    });

    dropZone.addEventListener('drop', function(event) {
    	event.preventDefault();
    });

    dropZone2.addEventListener('drop', function(event) {
		$_GET = app.fn_GET();

    	event.preventDefault();
    	event.stopPropagation();
    	document.getElementById('FM-DragAndDrop').style.display = 'none';
    	let files = event.dataTransfer.files;

    	app.forAjaxUpload($_GET['FMCurrentPath'], files, 0);
    });
});