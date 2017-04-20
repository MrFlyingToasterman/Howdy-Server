<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="css/login_window.min.css">
  <link rel="stylesheet" type="text/css" href="css/animate.css">
</head>
<body>
  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript" src="js/jquery.particleground.min.js"></script>
  <script type="text/javascript">
  var audio = new Audio('sounds/intro-sound.mp3');
  audio.play();
  $('body').particleground();
  </script>
    <?php include ("login_window.php"); ?>
    <?php include ("footer.php"); ?>
</body>
</html>
