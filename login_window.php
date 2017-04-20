<div class="login_window_container">
  <section class="well">
  <img class="animated wobble logo" src="images/logo_text_transparent.png">
  <form name="login_form" method="post" enctype="multipart/form-data" action="index.php">
    <p>Username</p>
    <p><input type="text" name="user_name" required="true"></p>
    <p>Password</p>
    <p><input type="password" name="user_password" required="true"></p>
    <p><input class="btn btn-primary" name="login_submit" type="submit" value="login"></p>
  </form>
  <?php
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
                      // sesson erstellen mit nutzernamen; chat_window aufrufen;
                    }
                }
              }
              if ($drop_error) echo "<p style=\"color:red;\"><b> ACCESS DENIED! </b></p>";

            mysql_close($dz); //Verbindung zum Server beenden
    }
  ?>
  </section>
</div>
