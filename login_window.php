<div class="login_window_container">
  <section class="well">
  <img class="animated wobble logo" src="images/logo_text_transparent.png">
  <form name="login_form" method="post" enctype="multipart/form-data" action="index.php">
    <p>Username</p>
    <p><input type="text" name="user_name" required="true"></p>
    <p>Password</p>
    <p><input type="password" name="user_password" required="true"></p>
    <p><input class="btn btn-primary" name="login_submit" type="submit" value="Login">
    <a class="btn btn-default" name="register_submit" value="register" style="color:#337ab7" href="register_window.php">Register</a></p>
  </form>
  <?php
    //Aber zuerst: Prüfe ob User bereits eingelogt bzw Session existent
    if (isset($_SESSION["howdy"])) {
        header('Location: chat_window.php');
    }

    if (isset($_POST["user_name"])) {

      //SQL Lesen vorbereiten
      $userwho = $_POST["user_name"];
      $userpasswordwho = $_POST["user_password"];
      $drop_error = true;

      //SQL Lesen
            include "inc_mysql.php"; //Verbindung zum Server aufbauen

            $query = "SElECT * FROM tbl_Benutzer"; //SQL Anfrage
            $sql = mysql_query($query); //Daten Anfordern
            while($ds = mysql_fetch_array($sql)) {

                //Prüfe ob Benutzername aus der textbox gefunden worden ist.
                if ($ds["Username"] == $userwho) {
                    if ($userpasswordwho  == $ds["Passwort"]) {
                      //Login Erfolgreich!
                      $drop_error = false;
                      // session erstellen mit nutzernamen; chat_window aufrufen;
                      session_start();

                      if (!isset($_SESSION["howdy"])) {
                          $howdy = $userwho;
                          $_SESSION["howdy"] = $howdy;
                      }

                      //Ruft chatfenster auf
                      header('Location: chat_window.php');

                    }
                }
              }
              if ($drop_error) echo "<p style=\"color:red;\"><b> ACCESS DENIED! </b></p>";

            mysql_close($dz); //Verbindung zum Server beenden
    }
  ?>
  </section>
</div>
