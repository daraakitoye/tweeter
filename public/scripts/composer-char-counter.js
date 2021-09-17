$(document).ready(function () {


  $('textarea').keyup((event) => {
    const charLength = event.target.value.length;

    $('.counter').text(140 - charLength)

    if (charLength > 140) {
      $('.new-tweet output').css('color', 'crimson')
    } else {
      $('.new-tweet output').css('color', 'black')
    }

  })

});
