const contactForm = "#contact-form-ctc";
const modalForm = "#modal-form-ctc"
const url = "https://hooks.zapier.com/hooks/catch/14298827/38wq103/";

$("document").ready(function () {
  //! Contact From Validation and Submission 
  $(contactForm).validate({
    // Rules for Form
    rules: {
      form_name: {
        required: true,
        minlength: 3,
      },
      form_number: {
        required: true,
        minlength: 8,
        maxlength: 14,
      },
      form_email: {
        required: true,
        email: true,
      },
    },

    errorElement: "span",
    errorClass: "text-danger",
    messages: {
      form_name: { minlength: "Name at least have 4 characters" },
      form_number: {
        minlength: "mobile number at least have 8 Digits",
      },
      form_number: {
        maxlength: "mobile number at least have 14 Digits",
      },
      form_email: { email: "please enter a valid email address" },
    },
    // Submit Handler which forward the Submission
    submitHandler: function () {
      submitForm(contactForm);
    },
  });

  //! Modal form Validation and Submission 
  $(modalForm).validate({
    rules: {
      form_name: {
        required: true,
        minlength: 3,
      },
      form_number: {
        required: true,
        minlength: 8,
        maxlength: 14,
      },
      form_email: {
        required: true,
        email: true,
      },
    },
    errorElement: "span",
    errorClass: "text-danger",
    messages: {
      form_name: { minlength: "Name at least have 4 characters" },
      form_number: {
        minlength: "mobile number at least have 8 Digits",
      },
      form_number: {
        maxlength: "mobile number at least have 14 Digits",
      },
      form_email: { email: "please enter a valid email address" },
    },
    submitHandler: function () {
      submitForm(modalForm);
    },
  });
  
});




function submitForm(formName) {
  const data = $(formName).serialize();
 
  $.ajax({
    type: "POST",
    url,
    data,
    beforeSend: function () {
      $("#errmsgthree").html("");
      $("#submit-btn").html(
        '<i class="fa fa-spinner fa-spin"></i> Sending...'
      );
      $("#submit-btn").attr("disabled", true);
    },

    success: function (data) {
      if (data.status === "error") {
        $("#errmsgthree").fadeIn(1000, function () {
          $("#errmsgthree").fadeOut(5000).hide();
          $("#submit-btn").html("Submit");
          $("#submit-btn").removeAttr("disabled");
          Swal.fire({
            icon: "error",
            title: "Error",
            html: data.message,
          }).then((okay) => {
            if (okay) {
            }
          });
        });
      } else if (data.status === "success") {
        $("#submit-btn").html("Submit");
        $("#submit-btn").removeAttr("disabled");

        Swal.fire({
          icon: "success",
          title: "Success",
          showConfirmButton: false,
          timer: 2500,
        });
        setTimeout(thankYou, 2500);
      } else {
        $("#errmsgthree").fadeIn(100, function () {
          $("#errmsgthree")
            .html("" + data.message + "")
            .fadeIn(100)
            .show();
          $("#submit-btn").html("Submit");
          $("#submit-btn").removeAttr("disabled");
          $("#errmsgthree").html(
            '<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; ' +
              data +
              " !</div>"
          );
          Swal.fire({
            icon: "error",
            title: "Error",
            html: +data.message,
            timer: 2000,
          }).then((okay) => {
            if (okay) {
            }
          });
        });
      }

     
    },
  });
  return false;
} function thankYou() {
  window.location.replace("thankyou.html");
}