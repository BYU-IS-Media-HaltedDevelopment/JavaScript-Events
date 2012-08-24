JavaScript-Events
=================

universal event registering

Dependent on:

Expected use example:
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
