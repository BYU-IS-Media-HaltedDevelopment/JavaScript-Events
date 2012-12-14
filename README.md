JavaScript-Events
=================

**This repo is outdated. We're using jQuery now for all of our event registrations!**

universal event registering

Dependent on:

Basic Usage
===========
	<script language="javascript" type="text/javascript" src="js/event.lib.js"></script>
	
	<script language="javascript" type="text/javascript">
	// <!--
	var myEvents = new EventsObject();
	myEvents.register("click", document.getElementById('myElementId'), sampleHandlerFunction);
	function sampleHandlerFunction(e) {
		var targetElement;
		targetElement = myEvents.getTarget(e);
		targetElement.appendChild(document.createTextNode("An event fired here!\n"));
	}
	// -->
	</script>

	
Methods
=======
	myEvents.register(EVENTTYPE, DOM_NODE, HANDLER_FUNCTION);
	myEvents.deregister(EVENTTYPE, DOM_NODE, HANDLER_FUNCTION);
	myEvents.getTarget(EVENT_OBJECT);
	