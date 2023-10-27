$(document).ready(function () {
  $(".typebtn").on("click", function () {
    let valtype = $(this).data("type");
    $("#enquirePrice").data("type", valtype);
  });
  $("#enquirePrice").on("click", function () {
    let valtype = $(this).data("type");
    $(".type").val(valtype);
    $(".source").val("Price");
  });
  $(".footerEnq").on("click", function () {
    let frmname = $(this).data("name");
    $(".source2").val(frmname);
  });

  $("#enquireModalForm").validate();
  $("#enquireNowForm").validate();

  $("#btn-emSubmit").on("click", function () {
    var data = $("#enquireModalForm").serialize();
    $.ajax({
      type: "POST",
      url: "process/submit-form.php",
      data: data,
      beforeSend: function () {
        $("#btn-emSubmit").css("cursor", "progress");
        $("#btn-emSubmit").attr("disabled", "true");
        $("#btn-emSubmit").html(
          ' <span class="spinner-grow spinner-grow-sm"></span> Loading..'
        );
      },
      success: function (data) {
        if (data.status === "error") {
          $("#btn-emSubmit").html("Submit");
          $("#btn-emSubmit").css("cursor", "pointer");
          $("#btn-emSubmit").removeAttr("disabled");
          Swal.fire({
            icon: "error",
            title: "Error",
            html: data.message,
            // timer: 2000
          }).then((okay) => {
            if (okay) {
              // window.location.href="rtgs.html";
            }
          });
        } else if (data.status === "success") {
          $("#btn-emSubmit").html("Send Message");
          $("#btn-emSubmit").css("cursor", "pointer");
          $("#btn-emSubmit").removeAttr("disabled");
          document.getElementById("enquireModalForm").reset();
          $("#enquireModal").modal("hide");
          localStorage.setItem("currentURL", data.redirecturl);
          Swal.fire({
            icon: "success",
            title: "Success",
            // html: ""+data.message+"",
            showConfirmButton: false,
            timer: 2500,
          });
          setTimeout(thankYou, 2500);
        } else {
          $("#btn-emSubmit").html("Send Message");
          $("#btn-emSubmit").css("cursor", "pointer");
          $("#btn-emSubmit").removeAttr("disabled");
          Swal.fire({
            icon: "error",
            title: "Error",
            html: data.message,
            timer: 2000,
          }).then((okay) => {
            if (okay) {
              // window.location.href="rtgs.html";
            }
          });
        }
        function thankYou() {
          window.location.replace("thank-you.html"); // Removing it as with next form submit you will be adding the div again in your code.
        }
      },
    });
  });

  $("#efSubmit").on("click", function () {
    var data = $("#enquireNowForm").serialize();
    $.ajax({
      type: "POST",
      url: "process/submit-form.php",
      data: data,
      beforeSend: function () {
        $("#efSubmit").css("cursor", "progress");
        $("#efSubmit").attr("disabled", "true");
        $("#efSubmit").html(
          ' <span class="spinner-grow spinner-grow-sm"></span> Loading..'
        );
      },
      success: function (data) {
        if (data.status === "error") {
          $("#efSubmit").html("Submit");
          $("#efSubmit").css("cursor", "pointer");
          $("#efSubmit").removeAttr("disabled");
          Swal.fire({
            icon: "error",
            title: "Error",
            html: data.message,
            // timer: 2000
          }).then((okay) => {
            if (okay) {
              // window.location.href="rtgs.html";
            }
          });
        } else if (data.status === "success") {
          $("#efSubmit").html("Send Message");
          $("#efSubmit").css("cursor", "pointer");
          $("#efSubmit").removeAttr("disabled");
          document.getElementById("enquireNowForm").reset();
          localStorage.setItem("currentURL", data.redirecturl);
          Swal.fire({
            icon: "success",
            title: "Success",
            // html: ""+data.message+"",
            showConfirmButton: false,
            timer: 2500,
          });
          setTimeout(thankYou, 2500);
        } else {
          $("#efSubmit").html("Send Message");
          $("#efSubmit").css("cursor", "pointer");
          $("#efSubmit").removeAttr("disabled");
          Swal.fire({
            icon: "error",
            title: "Error",
            html: data.message,
            timer: 2000,
          }).then((okay) => {
            if (okay) {
              // window.location.href="rtgs.html";
            }
          });
        }
        function thankYou() {
          window.location.replace("thank-you.html"); // Removing it as with next form submit you will be adding the div again in your code.
        }
      },
    });
  });
});
