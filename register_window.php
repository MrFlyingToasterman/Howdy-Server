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
  <div class="register_window_container">
    <section class="well">
    <img class="animated wobble logo" src="images/logo_text_transparent.png">
    <form name="register_form" method="post" enctype="multipart/form-data" action="index.php">
      <p>Username</p>
      <p><input type="text" name="user_name" required="true"></p>
      <p>Password</p>
      <p><input type="password" name="user_password" required="true"></p>
      <p><input class="btn btn-primary" name="login_submit" type="submit" value="Register">
    </form>
    </section>
  </div>
  <?php include ("footer.php"); ?>
</body>
</html>
