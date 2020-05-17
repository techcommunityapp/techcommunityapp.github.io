var config = {
    apiKey: "AIzaSyBix42DA1Gv7zMMHjRA0qPSk5EC40tSwF0",
    authDomain: "techcommunity-70277.firebaseapp.com",
    databaseURL: "https://techcommunity-70277.firebaseio.com",
    projectId: "techcommunity-70277",
    storageBucket: "techcommunity-70277.appspot.com",
    messagingSenderId: "314949847374",
    appId: "1:314949847374:web:98f63a5e701ee31f47f61f"
};

firebase.initializeApp(config);

function exito()
{
    location.assign('index.html');
}

$(function()
{
    $("#botonLogin").click(function()
    {
        var email=$("#email").val();
        var password=$("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password).then(exito).catch(function(error)
        {
            $("#spinner").html("");
            //console.log(error);
            alert ("Error detectado:\n\n"+error.message);
        });
    });

    $("#botonRegistro").click(function()
    {
        location.assign('registro.html');
    });


    $("#botonCancelar").click(function()
    {
        location.assign('index.html');
    });

});
function sesion(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log("Existe usuario activo");
            aparece(user);
            var displayName = user.displayName;
            var email = user.email;
            console.log(email);
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            // ...
            console.log("No existe usuario activo");
            contenido.innerHTML = `
            <div class="container mt-5">
            <div class="alert alert-warning" role="alert">
            <p class="alert-heading">Se ha cerrado sesión</p> 
            `;
        }
    });
}

sesion();

function aparece(user){
    var user = user;
    var contenido = document.getElementById('contenido');
    //if(user.emailVerified){
    contenido.innerHTML = `
        <div class="container mt-5">
        <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Bienvenido ${user.email}</h4>
        <hr>
        <p>Gracias por ser parte de Tech Community</p>
        </div>
        <button onclick="cerrar()" class="btn btn-danger">Cerrar sesión</button>
        </div>
        `;
    //}

}

function cerrar(){
    firebase.auth().signOut()
        .then(function(){
            console.log('Saliendo..')
        })
        .catch(function(error){
            console.log(error)
        })
}
function recoverPass(){
    var auth = firebase.auth();
    var emailAddress = $("#email").val();
    firebase.auth().languageCode = 'es';

    if(emailAddress == ""){
        alert('Escribe por favor sólo el correo');
    }else {

        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
            contenido.innerHTML = `
            <div class="container mt-5">
            <div class="alert alert-warning" role="alert">
            <p class="alert-heading">Se ha enviado un correo, por favor siga los pasos indicados.</p> 
            `;

        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }

}