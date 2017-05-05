$(document).ready(function(){
  let apiKeys;
  let editId = "";

  $('#new-item').click(() => {
    $('.list-container').addClass('hide');
    $('.new-container').removeClass('hide');
  });

  $('#list-items').click(() => {
    $('.new-container').addClass('hide');
    $('.list-container').removeClass('hide');
  });

  FbApi.firebaseCredentials().then((keys) => {
    apiKeys = keys;
    firebase.initializeApp(apiKeys);
    FbApi.writeDom(apiKeys);
  }).catch((error) => {
    console.log("key errors", error);
  });

  //add todo
  $('#add-todo-button').click(() => {
    let newTodo = {
      isCompleted: false,
      task: $('#add-todo-text').val()
    };
    if(editId.length > 0){
      //edit
      FbApi.editTodo(apiKeys, newTodo, editId).then(() => {
        $('#add-todo-text').val("");
        editId = "";
        $('.new-container').addClass('hide');
        $('.list-container').removeClass('hide');
        FbApi.writeDom(apiKeys);
      }).catch((error) => {
        console.log("addTodo error", error);
      });
    } else {
      FbApi.addTodo(apiKeys, newTodo).then(() => {
        $('#add-todo-text').val("");
        $('.new-container').addClass('hide');
        $('.list-container').removeClass('hide');
        FbApi.writeDom(apiKeys);
      }).catch((error) => {
        console.log("addTodo error", error);
      });      
    }
  });


  //delete todo
  $('.main-container').on('click', '.delete', (event) => {
    FbApi.deleteTodo(apiKeys, event.target.id).then(() => {
      FbApi.writeDom(apiKeys);
    }).catch((error) => {
      console.log("error in deleteTodo", error);
    });
  });


  //edit todo
  $('.main-container').on('click', '.edit', (event) => {
    let editText = $(event.target).closest('.col-xs-4').siblings('.col-xs-8').find('.task').html();
    editId = event.target.id;
    $('.list-container').addClass('hide');
    $('.new-container').removeClass('hide');
    $('#add-todo-text').val(editText);
  });


  //complete todos
  $('.main-container').on('click', 'input[type="checkbox"]', (event)=>{
    let myTodo = {
      isCompleted: event.target.checked,
      task: $(event.target).siblings('.task').html()
    };
    FbApi.editTodo(apiKeys, myTodo,event.target.id).then(() =>{
      FbApi.writeDom(apiKeys);
    }).catch((error) => {
      console.log("checker error", error);
    });
  });

$('#registerButton').click(() =>{
  let email = $("#inputEmail").val();
  let password = $("#inputPassword").val();
  let username = $("#inputUsername").val();

  let user = {email, password};
  FbApi.registerUser(user).then((response) => {
    let newUser = {
      uid: response.uid,
      username: username
    }
    FbApi.loginUser(user).then((response) => {
    clearLogin();
    $('#login-container').addClass('hide');
    $('main-container').removeClass('hide');
    FbApi.createLogoutButton(apiKeys);
    FbApi.writeDom(apiKeys);
  }).catch((error) => {
    console.log(error);

  });
    FbApi.addUser(apiKeys, newUser).then((response) => {
      console.log("response", response);

    }).catch((error) => {
      console.log("response error", error);
    })

  }).catch((error) => {
    console.log("error in registerUser", error);
  })
    
  
});

let clearLogin = () => {
  let email = $("#inputEmail").val("");
  let password = $("#inputPassword").val("");
  let username = $("#inputUsername").val("");
}

$('#loginButton').click(() => {
  let email = $('#inputEmail').val();
  let password = $('#inputPassword').val();

  let user = {email, password};

  FbApi.loginUser(user).then((response) => {
    clearLogin();
    $('#login-container').addClass('hide');
    $('main-container').removeClass('hide');
    FbApi.creatLogoutButton(apiKeys);
    FbApi.writeDom(apiKeys);
  }).catch((error) => {
    console.log(error);

  });
});

$('#logout-container').on('click', '#logoutButton', () => {
  clearLogin();
  FbApi.logoutUser();
  $('#login-container').removeClass('hide');
  $('main-container').addClass('hide');
})



});






