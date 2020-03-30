$(document).ready(function() {

	var minVal = 1;
	var maxVal = 100;
	// Get Started Dialog 
	$( "#gs-dialog" ).dialog({
		autoOpen: false,
		width: 400,
		buttons: [
			{
				text: "Okay",
				click: function() {
					$( this ).dialog( "close" );
				}
			},
			{
				text: "Cancel",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		]
	});
	$( "#home" ).click(function( event ) {
		$("#gs-dialog").dialog("open");
		event.preventDefault();
	});
	//Random Graph Dialog
	$( "#rand-dialog" ).dialog({
		autoOpen: false,
		width: 400,
		buttons: [
			{
				text: "Initialize",
				click: function() {
					var currVal = $("#node-input").val()
					if (!(Math.floor(currVal) == currVal && $.isNumeric(currVal) ) || (currVal > maxVal || currVal < minVal) ) {
						alert("Please input an integer between 1 and 100.");
					} 
					else {
						console.log(currVal);
						$( this ).dialog( "close" );
						initNewRandGraph(currVal);
					}
				}
			},
			{
				text: "Cancel",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		]
	});
	$( "#initRand-btn" ).click(function( event ) {
		$("#rand-dialog").dialog("open");
		event.preventDefault();
	});
	//Node slider
	$( "#node-slider" ).slider({
		min: minVal,
		max: maxVal,
		value: $("#node-input").val(),
		slide: function( event, ui ) {
			$( "#node-input" ).val( ui.value );
		}
	});
	$("#node-input").change(function () {
	    var nodeVal = this.value;
	    console.log(nodeVal);
	    $("#node-slider").slider("value", nodeVal);
	});
	//Adjacency Matrix File Upload
	let dropArea = document.getElementById('drop-area');
	// Add Event listeners for drag actions
	;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  		dropArea.addEventListener(eventName, preventDefaults, false)
	})
	// Prevent opening of files when dropped
	function preventDefaults (e) {
  		e.preventDefault()
  		e.stopPropagation()
	}
	//Highlight file upload area when in drag-area
	;['dragenter', 'dragover'].forEach(eventName => {
  		dropArea.addEventListener(eventName, highlight, false)
	})
	//Remove highlight file upload area when in drag-area
	;['dragleave', 'drop'].forEach(eventName => {
  		dropArea.addEventListener(eventName, unhighlight, false)
	})
	function highlight(e) {
	  dropArea.classList.add('highlight')
	}
	function unhighlight(e) {
	  dropArea.classList.remove('highlight')
	}
	$('#file-upload').change(function() {
	  var i = $(this).prev('label').clone();
	  var file = $('#file-upload')[0].files[0].name;
	  $(this).prev('label').text(file);
	});
	//Adjacency matrix dialog
	$( "#adj-dialog" ).dialog({
		autoOpen: false,
		width: 400,
		buttons: [
			{
				text: "Upload",
				click: function() {
					$( this ).dialog( "close" );
				}
			},
			{
				text: "Cancel",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		]
	});
	$( "#upload-btn" ).click(function( event ) {
		$("#adj-dialog").dialog("open");
		event.preventDefault();
	});
	//Draw Graph dialog
	$( "#draw-dialog" ).dialog({
		autoOpen: false,
		width: 400,
		buttons: [
			{
				text: "Begin",
				click: function() {
					$( this ).dialog( "close" );
				}
			},
			{
				text: "Cancel",
				click: function() {
					$( this ).dialog( "close" );
				}
			}
		]
	});
	$( "#draw-btn" ).click(function( event ) {
		$("#draw-dialog").dialog("open");
		event.preventDefault();
	});
});