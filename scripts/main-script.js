var slide, slideAux,pageName, timeLine, timeLineAux, dWidth, dHeight;
var img_array = [1, 2];//this array is used on slideshow of the index page
var indexI = 1;
var currentCircle=2;
var prevCircle=0;
var windHeight=$(window).scrollTop();
var currentDialog;
var windResized=false;
$(document).ready(function () {
	$("#menu").hide();
	$("#divGoToTop").hide();	
	var fileName = location.href.split("/"); 
	pageName=fileName[fileName.length-1].split(".")[0];	
	if(pageName=="index"){
		slideAux=setTimeout(slideshow ,5000);
		$(window).resize(function() {
			$(".container").css("width","initial");
		});
	}
	else if(pageName=="about"){		
		if($("#divNav").css("display")=="block"){
			timeLine=setTimeout(selectCircle ,7000);
			for(var i=2; i<8; i++)
				$("#descr-"+i).hide();
		}
		else
			stopTimeLine();		
		
		$(window).resize(function() {			
			if($("#divNav").css("display")=="block"){
				if((windResized==true) || ((($("#descr-1").is(":visible")==true) && ($("#descr-2").is(":visible")==true))==true)){
					for(var i=2; i<8; i++)
						$("#descr-"+i).hide();
					$("#descr-1").show();
					windResized=false;
					setTimeout(selectCircle ,7000);
				}				
			}
			else{	
			
				stopTimeLine();
				currentCircle=2;
				windResized=true;				
			}
		});
	}
	else if(pageName=="contact")
		document.getElementById("txtMessage").innerHTML="";
	
	else if(pageName=="news"){
		$(window).resize(function() {
			setDialogSize();
			$("#"+currentDialog).dialog("option", "width", dWidth);
			$("#"+currentDialog).dialog("option", "height", dHeight);
		});
	}
	else if(pageName=="services"){
		$(window).resize(function() {
			$(".container").css("width","initial");
		});		
	}
	
	
	
	$(window).scroll(function(){
		windHeight=$(window).scrollTop();		
		if(windHeight>($("#divMenu")[0].scrollHeight)){
			if($("#menu").is(":visible"))
				$("#divMenu").removeClass("menuFixed").removeClass("menuAbsolute");
			else 
				$("#divMenu").removeClass("menuAbsolute").addClass("menuFixed");
		}
		else{
			if(!$("#menu").is(":visible"))
				$("#divMenu").removeClass("menuFixed").addClass("menuAbsolute");
		}
		if(!$("#menu").is(":visible"))
			(windHeight>($("#divSlideShow")[0].scrollHeight-$("#divMenu")[0].scrollHeight))?$("#divGoToTop").show("slow"):$("#divGoToTop").hide("slow");
		else
			$("#divGoToTop").hide();
	});
	
	$("#divGoToTop").click(function () {
		$("html, body").animate({ scrollTop: 0 }, "slow"); 
	});
	
	for(var i=0; i<$( ".divNews").length; i++)
		$("#news-"+(i+1)).hide();
	
	for(var i=1; i<17; i++)
		$("#div-"+i).hide();
	
	
	$(".circles").click(function () {
		var getID=$(this).attr("id");
		getID=getID.split("c-");
		currentCircle=getID[getID.length-1];
		showDescr(currentCircle)
		$(".selectedCircle").removeClass("selectedCircle").addClass("unselectedCircle");
		$(this).removeClass("unselectedCircle").addClass("selectedCircle"); 
		
		if(currentCircle==7){
			currentCircle=1;
			return;
		}
		currentCircle++;
	});
	
	
	
	
	
	$( "form" ).submit(function( event ) {
		var valid=true;		
		if ($("#txtFirstName").val().length == 0){
			$("#txtFirstName").addClass("invalid");
			valid=false;
		}
		else
			$("#txtFirstName").removeClass("invalid");
			
		if ($("#txtLastName").val().length == 0){
			$("#txtLastName").addClass("invalid");
			valid=false;
		} 
		else
			$("#txtLastName").removeClass("invalid");
		
		if ($("#txtEmail").val().length == 0){
			$("#txtEmail").addClass("invalid");
			valid=false;
		} 
		else
			$("#txtEmail").removeClass("invalid");
		
		if ($("#txtSubject").val().length == 0){
			$("#txtSubject").addClass("invalid");
			valid=false;
		} 
		else
			$("#txtSubject").removeClass("invalid");
		
		if ($('#txtMessage').val().length == 0){
			$("#txtMessage").addClass("invalid");
			valid=false;
		} 
		else
			$("#txtMessage").removeClass("invalid");
						
		if (valid == true) 
			alert("Thank you very much for your message!");	
		else
			event.preventDefault();	  
	});	
	
	$("input, textarea").on({		
		keydown: function(e) {
		if (($(this).val().length==0) && (e.which === 32))    
			return false;
		}  
	});
});

function setDialogSize(){
	var wWidth = $(window).width();
	dWidth = wWidth * 0.9;
	var wHeight = $(window).height();
	dHeight = wHeight * 0.9;
	if(dWidth>600)dWidth=600;
	if(dHeight>400)dHeight=400;
}

function stopTimeLine(){
	for(var i=1; i<8; i++)
		$("#descr-"+i).show();
	clearTimeout(timeLine);
	clearTimeout(timeLineAux);
	$(".selectedCircle").removeClass("selectedCircle").addClass("unselectedCircle");	
	$("#c-1").removeClass("unselectedCircle").addClass("selectedCircle");
}

function showDescr(idElement){
	prevCircle=$(".selectedCircle").attr("id");
	prevCircle=prevCircle.split("c-");
	prevCircle=prevCircle[prevCircle.length-1];
	$("#descr-"+prevCircle).hide();
	$("#descr-"+idElement).fadeIn("slow");
	if(idElement==3|| idElement==6)
		$("footer").removeClass("clearLeft").addClass("clearRight");
	else
		$("footer").removeClass("clearRight").addClass("clearLeft");
}

function selectCircle(){	
	showDescr(currentCircle);
	$(".selectedCircle").removeClass("selectedCircle").addClass("unselectedCircle");	
	$("#c-"+currentCircle).removeClass("unselectedCircle").addClass("selectedCircle");	
	timeLineAux=setTimeout(arguments.callee, 6000);//The 'arguments.callee' property contains the currently executing function [ since this function is called by a timer, it has to be stopped twice with different variables ]	
	if(currentCircle==7)currentCircle=1;
	else currentCircle++;	
}


function slideshow(){
	var image = $('#divSlideShow');
	image.css("background-image", 'url("./images/' + img_array[indexI++] + '.jpg")');
	slide=setTimeout(arguments.callee, 5000);//The 'arguments.callee' property contains the currently executing function [ since this function is called by a timer, it has to be stopped twice with different variables ]
	if(indexI==img_array.length)indexI=0;
}

function changeMenuIcon(id){
	$("#bar1").toggleClass("changeTop");
	$("#bar2").toggleClass("changeMiddle");
	$("#bar3").toggleClass("changeBottom");
	$("#bar4").toggleClass("changeTop");
	$("#bar5").toggleClass("changeMiddle");
	$("#bar6").toggleClass("changeBottom");
	if(id=="mainMenu"){
		$("#menu").show("slow");
		$("#menu").css("position","fixed");
		$("#divTopLeft").css("position","inherit");
		$("#mainMenu").hide();
		clearTimeout(slide);
		clearTimeout(slideAux);
		$("#divMenu").removeClass("menuFixed").removeClass("menuAbsolute");
		$("#divGoToTop").hide();
	}
	else{
		$("#mainMenu").show();
		$("#menu").hide();
		$("#menu").css("position","inherit");
		$("#divTopLeft").css("position","absolute");		
		if(pageName=="index")setTimeout(slideshow ,5000);
		if(windHeight>($("#divMenu")[0].scrollHeight))			
			$("#divMenu").removeClass("menuAbsolute").addClass("menuFixed");
		
		else 
			$("#divMenu").removeClass("menuFixed").addClass("menuAbsolute");
		(windHeight>($("#divSlideShow")[0].scrollHeight-$("#divMenu")[0].scrollHeight))?$("#divGoToTop").show("slow"):$("#divGoToTop").hide("slow");		
	}	
}



function popNews(idElement){
	currentDialog=idElement;
	$( function() {
		setDialogSize();		
		$('body').css('position','absolute');
		$('body').css('overflow','hidden');		
		$( "#"+idElement)
		.dialog({
			modal: true,
			height: dHeight, 
			width: dWidth,		
			open: function() {
				$(this).closest(".ui-dialog")
				.find(".ui-dialog-titlebar-close")
				.removeClass("ui-dialog-titlebar-close")
				.html("<span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span>");
			}		
		})
		.show()
		.on('dialogclose', function(event) {
			$('body').css('position','inherit');
			$('body').css('overflow','inherit');
		});		
	});
}

function showDiv(elementID){
	$(document).ready(function () {
		$("#div-"+elementID).show();
		$("#title-"+elementID).hide();
	});
}

function hideDiv(elementID){
	$(document).ready(function () {
		$("#div-"+elementID).hide();
		$("#title-"+elementID).show();
	});
}



