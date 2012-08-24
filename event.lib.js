/*	
	This is a Javascript Class
	(Yes, I know, javascript doesn't really have clases... I don't care, this is one.)
	
	It is intended to simplify events and event handling. See the readme for use guidelines.
	
	There are many ways of writing the object, this one is used because it made sense at the time.
	
*/
function EventsObject() {
	this.e = arguments[0];			//	Just in case the event is passed to the object on creation, we might as well save it.
	this.eventArray = [];			//	As events are captured, we might as well save them, right?
	this.initialize = function() {
		//	Anything you would like to add to the object upon creation?
		
	};
	this.initialize();				//	Do the above!
}

//	This method finds the target of an event
//	It is intended to be used externally to the object (internally as well)
EventsObject.prototype.getTarget = function(e /*, findAttached=false */) {
	
	if(!e) { e = this.e; }			//	Hopefully e will be passed...
		
	if(!e) e = window.event;		//	If no events have been passed, try to get it from the window.
	if(!e) return false;			//	If no event can be found, we can hardly find the attached target!
	
	var targetElement;				//	This will be our return value
	//	Non IE browsers will use these propertes of the event object
	if(e.target) targetElement = (!arguments[1])?e.target:e.currentTarget;
	//	IE uses srcElement, but doesn't have an easy method for finding the element upon which the event was attached, if required change false here to that method
	else if(e.srcElement) targetElement = (!arguments[1])?e.srcElement:false;
	//	Safari will often attach the event to the text node instead of the node containing it (the HTML element)
	if(targetElement.nodeType == 3) targetElement = targetElement.parentNode;	
	return targetElement;
};

//	This is the major reason for the class in the first place - event registration
EventsObject.prototype.register = function(eventType, element, handlerFunction/*, bubble=false OR deregister!!! */) {
	if(arguments[3]==="dereg"){
		var deregister = true;
		arguments[3] = arguments[4];
	}else var deregister = false;
	var bubble = (arguments[3])?true:false;
	if(typeof element == 'string') element = document.getElementById(element);
	if(!element) { return false; }	//	If there is no element to attach, return false
	//	In the case of the body element it would be better in almost all cases to attach instead to the window (specifically needed for the onload event)
	else if(element.tagName.toLowerCase() == "body") {
		if(window.addEventListener){
			if(!deregister)
				window.addEventListener(eventType,handlerFunction,bubble);
			else
				window.removeEventListener(eventType,handlerFunction,bubble);
		}
		else if(window.attachEvent){
			if(!deregister)
				window.attachEvent('on'+eventType,handlerFunction);
			else
				window.detachEvent('on'+eventType,handlerFunction);
		} else {
			if(!deregister)
				eval('window.on'+eventType+' = '+handlerFunction);	//	I'm not 100% sure this is right... testing required.
			else
				eval('window.on'+eventType+' = null');	//	I'm not 100% sure this is right... testing required.
		}
	}else if(element.addEventListener) {	//	Standard registraton method
		if(!deregister)
			element.addEventListener(eventType, handlerFunction, bubble);
		else
			element.removeEventListener(eventType, handlerFunction);
	}else if(element.attachEvent) {	//	IE antiquated registration method
		if(!deregister)
			element.attachEvent("on"+eventType,handlerFunction);
		else
			element.detachEvent("on"+eventType,handlerFunction);
	}else {
		if(!deregister)
			eval("element.on"+eventType+" = "+handlerFunction);	//	I'm not 100% sure this is right... testing required.
		else
			eval("element.on"+eventType+" = null");	//	I'm not 100% sure this is right... testing required.
	}
};
EventsObject.prototype.deregister = function(eventType, element, handlerFunction){
	return this.register(eventType,element,handlerFunction,'dereg');
};

//	Ever wanted to stop an event from continuing? Here's how:
EventsObject.prototype.stop = function(e){
	if (e.stopPropagation) e.stopPropagation();
	else e.cancelBubble = true;

	if (e.preventDefault) e.preventDefault();
	else e.returnValue = false;
	
	if (e.cancelBubble != null)
		e.cancelBubble = true;
	
	if (window.event)
		e.returnValue = false;
	
	if (e.cancel != null)
		e.cancel = true;
	return e;
};