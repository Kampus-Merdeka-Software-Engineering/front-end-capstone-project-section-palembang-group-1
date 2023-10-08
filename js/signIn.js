// Show Password
function signInPass() {
  var x = document.getElementById("inputPass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

// go to Another Page for Sign Up Button
function goToAnotherPage() {
  window.location.href = "signUp.html";
}

document.getElementById("btnsignUp").onclick = goToAnotherPage;

//  Menghandle submit form login
$('#btnlogin').on('click',function() {
    $.ajax({
        url: 'https://backend-group1-production.up.railway.app/users/login',
        type: 'POST',
        data: JSON.stringify({
            email: $('#email').val(),
            password: $('#inputPass').val()
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            // console.log(response)
            if (response[0]['message'] === 'Login Successful') {
                localStorage.setItem('email', response[0]['payload']['email']);
                localStorage.setItem('id', response[0]['payload']['id']);
                window.location.href = '/homepage.html'
            }
        }
    })
})
