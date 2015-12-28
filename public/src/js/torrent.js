$torrentInput = $('.menu input[name="torrent-link"]');
$startTorrentBut = $('.menu input[name="torrent-start"]');

$startTorrentBut.click(function(){
	if($torrentInput.val()){
		socket.emit('download',$torrentInput.val());
		$torrentInput.val("");
	}
})

function appendTorrent(torrent){
	var $torrent = $('<tr>').addClass('torrent');
	if(torrent.alter == 1){
		$torrent.addClass('alter');
	}

	var $name = $('<td>').addClass('name').text(torrent.name.substring(0,30)).appendTo($torrent);
	var $size = $('<td>').addClass('size').text(formatSize(torrent.size)).appendTo($torrent);
	var $progress = $('<td>').addClass('progress').append(
		$('<progress>').attr('max',torrent.size).attr('value',torrent.down)
	).appendTo($torrent);
	var $upspeed = $('<td>').addClass('sup').text(formatSpeed(torrent.sup)).appendTo($torrent);
	var $downspeed = $('<td>').addClass('sdown').text(formatSpeed(torrent.sdown)).appendTo($torrent);


	$torrent.appendTo('.container .list');
}

function formatSize(bytes){
	var sizes = ['b', 'kb', 'mb', 'gb', 'tb'];
   	if (bytes == 0) return '0 b';
   	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function formatSpeed(bytes){
	return formatSize(bytes)+"/s";
}