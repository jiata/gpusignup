$(document).ready(function() {
  
  /* Track clicks */
	$( "[data-track='true']").each( function() {
		var name = $(this).attr('id');
		$(this).click( function() {
			appInsights.trackEvent(name);
		});
	});
  
  /* Submit information */
  var firstname = $("#firstname"), 
      lastname = $("#lastname"), 
      email = $("#email"), 
      organization = $("#organization"),
      vminstance = $("#vminstance");
      
  console.log(vminstance.val());
  
  firstname.on('input', function(){
    $(this).removeClass("warning");
  });
  lastname.on('input', function(){
    $(this).removeClass("warning");
  });
  email.on('input', function(){
    $(this).removeClass("warning");
  });
  organization.on('input', function(){
    $(this).removeClass("warning");
  });
  vminstance.on('input', function(){
    $(this).removeClass("warning");
  });
      
      
  function validateFields() {
    var isValid = true;
    if (firstname.val().length === 0) {
      firstname.addClass("warning");  
      isValid = false;
    }
    if (lastname.val().length === 0) {
      lastname.addClass("warning");
      isValid = false;
    }
    if (!isValidEmailAddress(email.val())) {
      email.addClass("warning");
      isValid = false;
    }
    if (organization.val().length === 0) {
      organization.addClass("warning");
      isValid = false;
    }
    if (!vminstance.val()) {
      vminstance.addClass("warning");
      isValid = false;
    }
    return isValid;
  }
  
  $("#submit").click(function(){ 
    if (validateFields()) {    
      var data = {
        firstname: firstname.val(),
        lastname: lastname.val(),
        email: email.val(),
        organization: organization.val(),
        vminstance: vminstance.val()
      };
      
      $.get('/submit', data)
      .done(function() {
        $("#successLabel").css("opacity","1");
      })
      .fail(function() {
        alert("Sorry, your information could not be sent. Please try again later.");
      })
      .always(function() {
        $("#submit").prop("disabled", true);  
      });
      
    } else {
      console.log("invalid fields");
    }
      
  });
 
});

function isValidEmailAddress(emailAddress) {
  var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return pattern.test(emailAddress);
};