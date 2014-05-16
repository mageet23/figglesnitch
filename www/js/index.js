// This is the main js source for figglesnitch

var photos = [];

loadAllPhotos();
hideAllViews();

displayAllPhotos();
$('#showall').show();

funciton displayAllPhotos () {
	//Start here on Tuesday

}

function loadAllPhotos () {
	if (localStorage["photos"] != null) {
		photos = JSON.parse(localStorage["photos"]);
	
	};

}

function makePhotoEntry () {
	var imageData = $('camera-photo').attr('src').replace("data:image/jpeg;base64,", "");
	var longitude = $('#longitude').html();
	var latitude = $('#latitude').html();
	var description = $('#description').val();
	
	var photoEntry = {
		"image" : imageData,
		"longitude" : longitude,
		"latitude" : latitude,
		"description" : description	
	};
	photos.push(photoEntry);
}

function saveAllPhotos () {
	localStorage.clear();
	localStorage["photos"] = JSON.stringify(photos);
	if(navigator.notification) {
		navigator.notification.alert("Photo has been saved", null, "Success!", "OK");
	}
}

$('button.save').click(function () {
	makePhotoEntry();
	saveAllPhotos();
});

function hideAllViews () {
	$('#showall').hide();
	$('#camera').hide();
	$('#editor').hide();
}

$('li.viewlink').click(function () {
	hideAllViews();
	if ($(this).html() == "Home") {
		$('#showall').show();
	} else if ($(this).html() == "Capture") {
		$('#camera').show();
	} else {
		$('#editor').show();
	}

});




$('button.camera-control').click(function () {
	if (navigator.camera) {
		var options = {
			quality: 60,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: 1,
			encodingType: 0
		};
	
		navigator.camera.getPicture(getPhoto, null, options);
		navigator.geolocation.getCurrentPosition(getPosition, null, {enableHighAccuracy: true});
	
	}

});

function getPhoto (data) {
	$('#camera-photo').attr('src', "data:image/jpeg;base64," + data);

}

function getPosition (position) {
	var longitude = position.coords.longitude;
	var latitude = position.coords.latitude;
	
	$('#longitude').html('Long: ' + longitude);
	$('#latitude').html('Lat: ' + latitude);
}