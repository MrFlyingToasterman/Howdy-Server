  var index = 0;
  var text = '$> ' + 'Welcome to Howdy! A free and secure messenger.';
// Here you can put in the text you want to make it type.
  function type() {
    document.getElementById('typewriter').innerHTML += text.charAt(index);
    index += 1;
    var t = setTimeout('type()',100);
  };
