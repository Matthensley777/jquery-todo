$(document).ready(function() {

    $('#new-item').click(() => {
        $('.list-container').addClass('hide');
        $('.new-container').removeClass('hide');
    });

    $('#list-items').click(() => {
        $('.new-container').addClass('hide');
        $('.list-container').removeClass('hide');

    });

    FbApi.getTodos().then(() => {
        	FbApi.writeDom();
        })
        .catch((error) => {
            console.log("getTodos error", error);

        });

  $('#add-todo-button').click(() => {
  	let newTodo = {
  		isCompleted: false,
  		task: $('#add-todo-text').val()
  	};
  	console.log("newTodo", newTodo);
  	FbApi.addTodo(newTodo).then(() => {
  		$('#add-todo-text').val("");
  		$('.new-container').addClass('hide');
        $('.list-container').removeClass('hide');
  		FbApi.writeDom();
  	}).catch((error) => {
  		console.log(error);

  	});


  	});

  $('.main-container').on('click', '.delete', (event) => {
    FbApi.deleteTodo(event.target.id).then(() => {
      FbApi.writeDom();
      contTask();
    }).catch((error) => {
      console.log("error in delete", error);

    });
  });

  $('.main-container').on("click", 'input[type="checkbox"]', (event) => {
  	console.log("id", event.target.id);
  	FbApi.checker(event.target.id).then(() => {
  		FbApi.writeDom();
  		countTask();
  	}).catch((error) => {
  		console.log(error);

  	});
  });



  	let contTask = () => {
  		let remainingTasks = $('#incomplete-tasks li').length;
  		$('#counter').hide().fadein(3000).html(remainingTasks);

  };


});

























