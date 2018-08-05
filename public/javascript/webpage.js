$(document).ready(function() {
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
});