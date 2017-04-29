$(document).ready(function() {

    $('#new-item').click(() => {
        $('.list-container').addClass('hide');
        $('.new-container').removeClass('hide');
    });

    $('#new-item').click(() => {
        $('.new-container').addClass('hide');
        $('.list-container').removeClass('hide');

    });

    FbApi.getTodos().then(() => {
        	FbApi.writeDom();
        })
        .catch((error) => {
            console.log("getTodos error", error);

        });


});

























