<?php



?>

<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="css/chat_window.min.css">
  <!-- Dependencies -->
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
</head>
<body>
  <div class="container-fluid">
<div class="row">
<div class="col-md-12">
  <div class="page-header">
    <img class="logo" src="images/logo_text_transparent.png">
    <p class="pull-right">
      Have you already Howdy'd today?
    </p>
  </div>
  <nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#"></a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#"></a></li>

        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">Logged in as ... Logout?</a></li>
          <li><a href="#"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span></a></li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</div>
</div>
<div class="row">
<div class="col-md-4">

  <frameset rows="65%,35%" framespacing="1" frameborder="yes" border="1" bordercolor="#FF0000">
    <frame src="messages.php" name="main_frame">
    <frame src="main.php" name="login_frame" scrolling="no" noresize target="middle">
</frameset>

</div>
<div class="row footer">
<div class="col-md-12">
  <div class="navbar-fixed-bottom">
    <div class="container-fluid">
      <p class="text-center text-muted">
        &copy; 2017 - 2017 Pascal Peinecke &amp; Darius Musiolik.
      </p>
    </div>
  </div>
</div>
</div>
</div>

</body>
</html>
