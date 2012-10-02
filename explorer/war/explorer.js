window.requestFileSystem = window.requestFileSystem
		|| window.webkitRequestFileSystem;
window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL
		|| window.webkitResolveLocalFileSystemURL;

var fs = null;
window.path = "/";
window.actualDirectory = null;

// var fileSystemPath = "filesystem:file:///persistent";
var fileSystemPath = "filesystem:http://samples-of-html5.appspot.com/persistent";

var analyser = null;
var source;
var audioContext;
var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 300;
var canvas = null;
var ctx = null;
// We'll need the offset later
OFFSET = 100;
// Spacing between the individual bars
SPACING = 10;

/**
 * Maneja los error en las operaciones de FileSystem
 */
function errorHandler(e) {
	console.log(e);
	var msg = '';
	switch (e.code) {
	case FileError.QUOTA_EXCEEDED_ERR:
		msg = 'QUOTA_EXCEEDED_ERR';
		break;
	case FileError.NOT_FOUND_ERR:
		msg = 'NOT_FOUND_ERR';
		break;
	case FileError.SECURITY_ERR:
		msg = 'SECURITY_ERR';
		break;
	case FileError.INVALID_MODIFICATION_ERR:
		msg = 'INVALID_MODIFICATION_ERR';
		break;
	case FileError.INVALID_STATE_ERR:
		msg = 'INVALID_STATE_ERR';
		break;
	default:
		msg = 'Unknown Error';
		break;
	}
	
	alert(msg + " "+e.code);
	
}

/**
 * Inicializa el FileSystem
 */
function initFS() {
	window.webkitStorageInfo.requestQuota(PERSISTENT, 15 * 1024 * 1024,
			function(grantedBytes) {
				window.requestFileSystem(PERSISTENT, grantedBytes, function(
						filesystem) {
					fs = filesystem;
					actualDirectory = fs.root;
					loadFs();
				}, errorHandler);
			}, errorHandler);
	/*
	 * window.requestFileSystem(window.TEMPORARY, 5*1024*1024,
	 * function(filesystem) { fs = filesystem; loadFs(); }, errorHandler);
	 */
}

/**
 * Carga el Fs en el caso de existir. Genera el arbol de directorios y la vista
 * en el explorador
 */
function loadFs() {
	var dirReader = fs.root.createReader();
	var dirs = [];
	dirReader.readEntries(function(dirs) {
		addNode(dirs, $("#root_fs"));
		addNodeExplorer(dirs);
		updateBarLocation(fs.root.fullPath); // fs.root.fullPath == /
	});
}

function draw() {
	// See http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	window.requestAnimFrame(draw, canvas);
	// New typed array for the raw frequency data

	var freqData = new Uint8Array(analyser.frequencyBinCount);
	// Put the raw frequency into the newly created array
	analyser.getByteFrequencyData(freqData);

	// console.log(freqData);

	// Clear the canvas
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	// This loop draws all the bars
	for ( var i = 0; i < freqData.length - OFFSET; i++) {
		// Work out the hight of the current bar
		// by getting the current frequency
		var magnitude = freqData[i + OFFSET];
		console.log(magnitude);
		r = 200 + i;
		g = 100 + i;
		b = 50 + i;
		ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", 0.5)";
		// Draw a bar from the bottom up (cause for the "-magnitude")
		ctx.fillRect(i * SPACING, CANVAS_HEIGHT, SPACING / 2, -magnitude);
	}
	;
}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame || window.oRequestAnimationFrame
			|| window.msRequestAnimationFrame || function(callback, element) {
				window.setTimeout(callback, 1000 / 60);
			};
})();

function viewer(fileEntry) {
	var fileInfo = document.querySelector('[id="file-info"]');

	var childs = document.querySelector('[id="file-info"]').childNodes;
	if (childs.length > 0) {
		document.querySelector('[id="file-info"]').removeChild(childs[0]);
	}

	var fragment = document.createDocumentFragment();

	var container = document.createElement('div');
	container.className = "viewer-container";

	var meta = document.createElement('div');
	meta.className = "metadata-container";
	var metadata = fileEntry.getMetadata(function(e) {
		p1 = document.createElement('p');
		p1.innerHTML = "<h1>" + fileEntry.name + "</h1><span>(<i>"
				+ ((e.size / 1024) / 1024) + " MB</i>)</span>";
		p2 = document.createElement('p');
		p2.innerHTML = "Fecha de Modificación " + e.modificationTime;
		meta.appendChild(p1);
		meta.appendChild(p2);
	}, errorHandler);
	container.appendChild(meta)

	fileEntry.file(function(file) {
		switch (file.type) {
		case 'text/html':
		case 'application/x-javascript':
		case 'text/plain':
			var reader = new FileReader();
			reader.onloadend = function(e) {
				var txtArea = document.createElement('textarea');
				txtArea.value = this.result;
				meta.appendChild(txtArea);
			}
			reader.readAsText(file);
			break;
		case 'image/x-icon':
		case 'image/svg+xml':
		case 'image/png':
		case 'image/jpeg':
			var img = document.createElement('img');
			img.src = fileEntry.toURL();
			meta.appendChild(img);
			break;
		case 'audio/mp3':
			try {
				var audio = new Audio();
				audio.src = fileEntry.toURL();
				audio.controls = true;
				audio.autoplay = true;
				audio.addEventListener("canplaythrough", function(e) {
					audioContext = new webkitAudioContext();
					analyser = audioContext.createAnalyser();
					source = audioContext.createMediaElementSource(audio);
					source.connect(analyser);
					analyser.connect(audioContext.destination);

					canvas = document.createElement('canvas');
					canvas.width = CANVAS_WIDTH;
					canvas.height = CANVAS_HEIGHT;
					ctx = canvas.getContext('2d');

					meta.appendChild(canvas);
					draw();
				}, false);

				meta.appendChild(audio);

				// TODO si queremos leer el archivo directamente como
				// ArrayBuffer WebAudio API
				// var reader = new FileReader();
				// reader.onloadend = function(e){
				/*
				 * var arrayBuffer = e.target.result;
				 * context.decodeAudioData(arrayBuffer, function(buffer){ var
				 * source = context.createBufferSource(); source.buffer =
				 * buffer; source.connect(context.destination);
				 * source.noteOn(0); });
				 */
				// }
				// reader.readAsArrayBuffer(file);
			} catch (e) {
				console.log(e);
				alert('Web Audio API is not supported in this browser');
			}
			break;
		default:
			var iframe = document.createElement('iframe');
			iframe.src = fileEntry.toURL();
			meta.appendChild(iframe);
		}

		fragment.appendChild(container);
		fileInfo.appendChild(fragment);
		fileInfo.className = 'show';
	});

}

function view(path) {
	fs.root.getFile(path, {}, function(fileEntry) {
		viewer(fileEntry);
	}, errorHandler);
}

/**
 * Realiza un CD (comando) al directorio indicado
 * 
 * @path ruta del directorio a realizar el cd
 * @op operacion si es -1 al path enviado se le deve restar el ultimo directorio
 */

function cd(path, op) {
	if (op == -1) {
		console.log(path);
		// path = "/1/2/4";
		var paths = path.split("/");
		console.log(paths.length);
		var auxPath = "";
		for ( var i = 1; i < (paths.length - 1); i++) {
			auxPath += "/" + paths[i];
		}
		path = auxPath;
	}
	window.path = path;

	window.resolveLocalFileSystemURL(fileSystemPath + path,
			function(fileEntry) {
				actualDirectory = fileEntry;
				updateBarLocation(fileEntry.fullPath);
				var dirReader = fileEntry.createReader();
				var dirs = [];
				dirReader.readEntries(function(dirs) {
					addNodeExplorer(dirs);
				}, errorHandler);
			}, errorHandler);
}

function cp(origin, dest) {

}

function mv(path) {

}

function update(entry) {
	window.resolveLocalFileSystemURL(fileSystemPath + window.path, function(
			entry) {
		var dirReader = entry.createReader();
		var dirs = [];
		dirReader.readEntries(function(dirs) {
			addNodeExplorer(dirs);
		}, errorHandler);
	});
}

/**
 * Remueve directorios y archivos por el path pasado como paramtro.
 */
function rm(path) {
	window.resolveLocalFileSystemURL(fileSystemPath + path, function(entry) {
		if (entry.isDirectory)
			entry.removeRecursively(function() {
				update();
			});
		else
			entry.remove(function() {
				update();
			}, errorHandler);
	}, errorHandler);
}

function refresh(path) {

}

/**
 * Crea un nuevo directotio con el nombre name, en la ruta actual de navegacion
 * que se obtiene de window.path
 * 
 * @param name
 *            nombre del directorio
 */
function mkdir(name) {
	console.log(name);
	window.resolveLocalFileSystemURL(fileSystemPath + window.path, function(
			entry) {
		console.log(entry);
		entry.getDirectory(name, {
			create : true
		}, function(e) {
			update(entry);
		}, errorHandler);
	}, errorHandler);
}

function newFile(name) {
	window
			.resolveLocalFileSystemURL(
					fileSystemPath + window.path,
					function(entry) {
						entry
								.getFile(
										name,
										{
											create : true
										},
										function(fileEntry) {
											fileEntry
													.createWriter(
															function(fileWriter) {

																fileWriter.onwriteend = function(
																		e) {
																	console
																			.log('El archivo fue escrito correctamente.');
																};

																fileWriter.onerror = function(
																		e) {
																	errorHandler(e);
																};

																// Create a new
																// Blob and
																// write it to
																// log.txt.
																var blob = new Blob(
																		[ 'Este contenido fue escrito por el Explorar del FileSystem HTML5!!!' ],
																		{
																			type : 'text/plain'
																		});

																fileWriter
																		.write(blob);

																update(entry);
															}, errorHandler);
										}, errorHandler);
					});
}

function append(path) {
	window.resolveLocalFileSystemURL(fileSystemPath + window.path, function(
			fileEntry) {
		console.log(fileEntry);
		fileEntry.createWriter(function(fileWriter) {

			fileWriter.seek(fileWriter.length); // Start write position at EOF.

			// Create a new Blob and write it to log.txt.
			var blob = new Blob([ 'Esta info fue agregada!!!!' ], {
				type : 'text/plain'
			});

			fileWriter.write(blob);

		}, errorHandler);
	}, errorHandler);
}

function create(type, name) {
	switch (type) {
	case 'dir':
		mkdir(name);
		break;
	case 'file':
		newFile(name);
		break;
	default:
		console.log(type);
	}
}

/**
 * Actualiza la barra de navegacion con el path del directorio
 * 
 * @param path
 *            Path del directorio
 */
function updateBarLocation(path) {
	document.querySelector('[id="location"]').setAttribute("placeholder",
			fileSystemPath + path);
}

/**
 * Gestiona la acción de drop (soltado del archivo o directorio)
 */
function drop(e) {
	if (e.stopPropagation) {
		e.stopPropagation(); // stops the browser from redirecting.
	}
	e.preventDefault();

	document.querySelector("[id='explorer']").className = "";
	document.querySelector("[id='explorer-container']").className = "";

	var length = e.dataTransfer.items.length;
	var entries = new Array();
	var files = new Array();

	for ( var i = 0; i < length; i++) {
		entry = e.dataTransfer.items[i].webkitGetAsEntry();
		entries[i] = entry;
		if (entry.isDirectory) {
			entry.copyTo(actualDirectory, null, function(copiedEntry) {
				update()
			}, errorHandler);
		} else {
			entry.copyTo(actualDirectory, null, function(copiedEntry) {
				update()
			}, errorHandler);
		}
	}

	addNode(entries, $("#root_fs"));

	// Deprecated
	// createStructureFs(entries, path);

	return false;
}

/**
 * Borra el contenido del explorer
 */
function deleteContentExplorer() {
	var childs = document.querySelector('[id="explorer-nav"]').childNodes;
	if (childs.length > 0) {
		document.querySelector('[id="explorer-nav"]').removeChild(childs[0]);
	}
}

/**
 * Crea un documentFragment y lo agrega al explorer con la representacion
 * grafica de las entradas
 * 
 * @entries
 */
function addNodeExplorer(entries) {

	deleteContentExplorer();

	var ul, li, fragment = document.createDocumentFragment();
	ul = document.createElement('ul');
	fragment.appendChild(ul);

	var length = entries.length;
	for ( var i = 0; i < length; i++) {
		var entry = entries[i];
		var dataPath = entry.fullPath;
		dataPath = dataPath.replace("//", "///");
		li = document.createElement('li');
		li.setAttribute("id", dataPath);
		li.setAttribute("data-path", dataPath);
		img = document.createElement('img');
		img.className = "folder";
		div = document.createElement('div');
		div.setAttribute("data-filename", "");
		div.innerHTML = entry.name;
		li.appendChild(img);
		li.appendChild(div);
		a = document.createElement('a');
		a.className = "folfer";

		// Acciones sobre los archivos y directorios
		delAction = document.createElement('a');
		delAction.addEventListener("click", function(e) {
			rm(this.getAttribute('data-remove-link'));
			e.stopPropagation();
		});
		delAction.setAttribute('data-remove-link', dataPath);
		delImg = document.createElement("img");
		delImg.src = "img/trash.png";
		delImg.className = "icon";
		delAction.appendChild(delImg);

		saveAction = document.createElement('a');
		saveAction.href = fileSystemPath + entry.fullPath;
		saveAction.setAttribute('download', entry.name);
		saveImg = document.createElement("img");
		saveImg.src = "img/download.png";
		saveImg.className = "icon";
		saveAction.appendChild(saveImg);

		appendAction = document.createElement('a');
		appendAction.setAttribute('data-append-link', dataPath);
		appendImg = document.createElement("img");
		appendImg.src = "img/append.png";
		appendImg.className = "icon";
		appendAction.appendChild(appendImg);
		appendAction.addEventListener("click", function(e) {
			append(this.getAttribute('data-append-link'));
			e.stopPropagation();
		}, false);

		if (entry.isFile) {
			img.src = "img/mimetypes/text-plain.png";
			img.width = 32;
			li.addEventListener("click", function(e) {
				view(this.getAttribute('data-path'), 0);
			}, false);
			li.appendChild(saveAction);
			li.appendChild(delAction);
			entry.file(function(file) {
				console.log(file.type);
				/*
				 * (function (root, element, file){ switch(file.type){ case
				 * 'text/html': case 'application/x-javascript': case
				 * 'text/plain': root.appendChild(element); break; default:
				 * break; } })(li, appendAction, file)
				 */
			});

		} else {
			li.addEventListener("click", function(e) {
				cd(this.getAttribute('data-path'), 0);
			}, false);
			img.src = "img/folder.png";
			img.width = 32;
			li.appendChild(delAction);
		}

		ul.appendChild(li);
	}

	document.querySelector('[id="explorer-nav"]').appendChild(fragment);
}

/**
 * TODO: Ver el tema de los iconos en el jsTree
 */
function addNode(entries, element) {
	var length = entries.length;
	for ( var i = 0; i < length; i++) {
		var entry = entries[i];

		var dataPath = entry.fullPath;
		dataPath = dataPath.replace("//", "///");
		if (entry.isFile) {
			$.jstree._reference('#nav-browser').create_node(element, {
				"type" : "file",
				"icon" : "/src/pepe.png",
				"title" : entry.name,
				"li_attr" : {
					"data-type" : "file",
					"data-path" : entry.fullPath
				}
			}, "inside", function(e) {
				// TODO agregado del nodo al arbol
			});
		} else {
			$.jstree._reference('#nav-browser').create_node(element, {
				"type" : "folder",
				"title" : entry.name,
				"li_attr" : {
					"data-type" : "file",
					"data-path" : entry.fullpath
				}
			}, "inside", function(e) {
				var dirReader = entry.createReader();
				var dirs = [];
				dirReader.readEntries(function(dirs) {
					addNode(dirs, $(e));
				});
			});
		}
	}
}

function dragOver(e) {
	if (e.preventDefault) {
		e.preventDefault(); // Necessary. Allows us to drop.
	}
	return false;
}

function dragLeave(e) {
	document.querySelector("[id='explorer']").className = "";
	document.querySelector("[id='explorer-container']").className = "";
}

function dragEnter(e) {
	document.querySelector("[id='explorer']").className = "dropping";
	document.querySelector("[id='explorer-container']").className = "dropping_background";
}

function dragEnd(e) {
	console.log("DRAG END");

}

/**
 * Elimina el FileSystem y su representación gráfica.
 */
function clearFileSystem() {
	if (clearLogicalFileSystem())
		clearTree();
}

/**
 * Clear Tree representation of FileSystem
 */
function clearTree() {
	var childrens = $.jstree._reference('#nav-browser').get_children(
			$("#root_fs"));
	for ( var i = 0; i < childrens.length; i++) {
		$.jstree._reference('#nav-browser').delete_node(childrens[i]);
	}
}

/**
 * Clear logical File System.
 */
function clearLogicalFileSystem() {
	if (window.requestFileSystem) {
		var dirReader = fs.root.createReader();
		dirReader.readEntries(function(entries) {
			for ( var i = 0, entry; entry = entries[i]; ++i) {
				if (entry.isDirectory) {
					entry.removeRecursively(function() {
					}, errorHandler);
				} else {
					entry.remove(function() {
					}, errorHandler);
				}
			}

			return true;
		}, errorHandler);
	}
	return false;
}

/**
 * Lista por consola el File Systema
 */
function listFileSystem(dir) {
	if (window.requestFileSystem) {
		var dirReader = dir.createReader();
		dirReader.readEntries(function(entries) {
			for ( var i = 0, entry; entry = entries[i]; ++i) {
				if (entry.isDirectory) {
					console.log("Dir: " + entry.fullPath);
					listFileSystem(entry);
				} else {
					console.log("File: " + entry.fullPath);
				}
			}

		}, errorHandler);
	}
}

function loadDirectory(e) {

	// TODO

}

/**
 * Habilita la consola para el filesystem
 */
function consoleFs(event) {
	if (this.checked) {
		this.className = "show";
	} else {
		this.className = "";
	}
}

function loadFromServer(event) {
	console.log("XMLHttpRequest");
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'resource', true);
	xhr.responseType = 'blob';
	xhr.onload = function(e) {
		console.log("w");
		console.log(e);
		if (this.status == 200) {
			var uInt8Array = new Uint8Array(this.response)
			var blob = new Blob([ uInt8Array ], {
				type : 'audio/mp3'
			});
			actualDirectory.getFile("song.mp3", {
				create : true,
				exclusive : true
			}, function(fileEntry) {
				
				fileEntry.createWriter(function(fileWriter) {
					fileWriter.onwriteend = function(e) {
						console.log('El archivo fue escrito correctamente.');
					};

					fileWriter.onerror = function(e) {
						errorHandler(e);
					};
					fileWriter.write(blob);
					update();
				}, errorHandler(e));
			}, errorHandler(e));
		}
	}
	xhr.onerror = function(e){
		console.log(e);
	}
	xhr.send();
}

function initApp() {
	document.querySelector("#file_input").addEventListener('change',
			loadDirectory, false);

	$("#nav-browser")
			.jstree(
					{

						'ui' : {
							'select_limit' : 1
						},

						"types" : {
							/* "valid_children" : [ "folder_fs" ], */
							"types" : {
								"folder_fs" : {
									"icon" : {
										"image" : "http://static.jstree.com/v.1.0rc/_docs/_drive.png"
									},
									"valid_children" : [ "folder", "file" ],
									"max_depth" : 2,
									"hover_node" : false,
									"select_node" : function() {
										return false;
									}
								},
								"default" : {
									"valid_children" : [ "default" ]
								}
							}
						},

						"dnd" : {
							"drop_finish" : function() {
								alert("DROP");
							},
							"drag_check" : function(data) {
								if (data.r.attr("id") == "root_fs") {
									return false;
								}
								return {
									after : false,
									before : false,
									inside : true
								};
							},
							"drag_finish" : function(data) {
								alert("DRAG OK");
								console.log(data);
							}
						},

						"core" : {
							"initially_open" : [ "root_fs" ]
						},
						"plugins" : [ "themes", "html_data", "dnd", "ui",
								"types", "dnd" ]

					}).bind("__ready.jstree.jstree", function(e, data) {
				console.log("Loaded ...");
			}).bind("move_node.jstree", function(e, data) {
				// TODO MOVE File and Directories
			});

	var dropbox = document.querySelector("[id='explorer']");
	// init event handlers
	dropbox.addEventListener("dragenter", dragEnter, false);
	dropbox.addEventListener("dragleave", dragLeave, false);
	dropbox.addEventListener("dragover", dragOver, false);
	dropbox.addEventListener("dragover", dragOver, false);
	dropbox.addEventListener("drop", drop, false);
	dropbox.addEventListener('dragend', dragEnd, false);

	document.querySelector("[id='upFsButton']").addEventListener("click",
			function(e) {
				cd(window.path, -1)
			}, false);
	document.querySelector("[id='console']").addEventListener("click",
			consoleFs, false);

	document.addEventListener("keyup", function(e) {
		document.querySelector('[id="file-info"]').className = "";
	}, false);

	document.querySelector('[id="createButton"]').addEventListener(
			"click",
			function(e) {
				create(document.querySelector('[id="entry-type"]').value,
						document.querySelector('[id="entry-name"]').value);
			});

	document.querySelector('[id="loadServer"]').addEventListener("click",loadFromServer, false);

	// TODO revisar
	// gapi.plusone.render({"size":"medium", "annotation":"inline",
	// "align":"left", "expandTo":"right"}, "plusone-div");

	initFS();

}

window.addEventListener('load', initApp, false);