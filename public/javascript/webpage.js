$(document).ready(function() {
	//Random Graph Dialog
	$( "#rand-dialog" ).dialog({
		autoOpen: false,
		width: 400,
		buttons: [
			{
				text: "Initialize",
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
	$( "#initRand-btn" ).click(function( event ) {
		$("#rand-dialog").dialog("open");
		event.preventDefault();
	});
	//Node slider
	$( "#node-slider" ).slider({
		min: 1,
		max: 500,
		value: 10,
		slide: function( event, ui ) {
			$( "input" ).val( ui.value );
		}
	});
	$("input").change(function () {
	    var nodeVal = this.value;
	    console.log(nodeVal);
	    $("#node-slider").slider("value", nodeVal);
	});
	//Adjacency matrix dialog
	$( "#adj-dialog" ).dialog({
		autoOpen: false,
		width: 400,
		buttons: [
			{
				text: "Initialize",
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