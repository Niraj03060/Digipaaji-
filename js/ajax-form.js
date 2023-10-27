const popupForm = "#popupEnq";
const form = "#popupEnqTwo";
const url = "https://hooks.zapier.com/hooks/catch/14298827/35nte0v/";

$("document").ready(function () {
  $(popupForm).validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      mobile: {
        required: true,
        minlength: 10,
        maxlength: 10,
      },
      email: {
        required: true,
        email: true,
      },
    },
    errorElement: "span",
    errorClass: "text-danger",
    messages: {
      name: { minlength: "Name at least have 4 characters" },
      mobile: {
        minlength: "mobile number at least have 10 Digits",
      },
      email: { email: "please enter a valid email address" },
    },
    submitHandler: function () {
      submitForm(popupForm);
    },
  });

  $(form).validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      mobile: {
        required: true,
        minlength: 10,
        maxlength: 10,
      },
      email: {
        required: true,
        email: true,
      },
    },
    errorElement: "span",
    errorClass: "text-danger",
    messages: {
      name: { minlength: "Name at least have 4 characters" },
      mobile: {
        minlength: "mobile number at least have 10 Digits",
      },
      email: { email: "please enter a valid email address" },
    },
    submitHandler: function () {
      submitForm(form);
    },
  });

  function submitForm(formName) {
    var data = $(formName).serialize();
    $.ajax({
      type: "POST",
      url,
      data: data,
      beforeSend: function () {
        $("#errmsgthree").html("");
        $("#btn-poptwo").html(
          '<i class="fa fa-spinner fa-spin"></i> Sending...'
        );
        $("#btn-poptwo").attr("disabled", true);
      },

      success: function (data) {
        if (data.status === "error") {
          $("#errmsgthree").fadeIn(1000, function () {
            $("#errmsgthree").fadeOut(5000).hide();
            $("#btn-poptwo").html("Submit");
            $("#btn-poptwo").removeAttr("disabled");
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
          $("#btn-poptwo").html("Submit");
          $("#btn-poptwo").removeAttr("disabled");

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
            $("#btn-poptwo").html("Submit");
            $("#btn-poptwo").removeAttr("disabled");
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

        function thankYou() {
          window.location.replace("thank-you.html");
        }
      },
    });
    return false;
  }
});
