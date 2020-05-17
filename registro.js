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

var email,password,passwordConfirm;

function exito()
{
    alert('Se ha creado la cuenta de usuario correctamente. ');
    location.assign('index.html');
}

function alFinalizar(error)
{
    // console.log(error);

    if (error!=='undefined')
    {
        // Códigos de error:
        // auth/invalid-email
        // auth/weak-password
        // auth/email-already-in-use
        switch(error.code)
        {
            case 'auth/email-already-in-use':
                alert('ERROR: No se puede crear la nueva cuenta de usuario, por que el e-mail ya está en uso !');
                break;
            case 'auth/invalid-email':
                alert('ERROR: El e-mail facilitado no es un e-mail correcto.');
                break;
            default:
                alert('Se ha producido un error al crear el usuario.\n\n'+error+'\n');
                break;
        }
    }
}


$(function()
{
    // Programamos el click de los botones del formulario:
    $("#botonRegistro").click(function()
    {
        email=$("#email").val();
        password=$("#password").val();
        passwordConfirm=$("#password2").val();

        if (password != passwordConfirm)
        {
            alert("Error: Las contraseñas son distintas!");
        }
        else
            firebase.auth().createUserWithEmailAndPassword(email,password).then(exito).catch(alFinalizar);
    });


    $("#botonCancelar").click(function()
    {
        location.assign('index.html');
    });

});