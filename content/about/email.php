<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<title>Kontaktformular</title>

<meta name="title" content="Kontaktformular">
<meta name="description" content="Kontaktformular von www.gaijin.at">
<meta name="keywords" content="Kontakt, Kontaktformular">
<meta name="author" content="Gaijin.at">
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">

<link rel="stylesheet" type="text/css" href="../def.css">
<style type="text/css">
#msg
{
    display:none;
    position:absolute;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
}

body
{
    overflow:hidden;
}

table
{
    width:100%;
    height:100%;
    border:0;
}

p
{
    margin:4px 0px;
}
</style>
<script src="../js/all.js" type="text/javascript"></script>
<script language="JavaScript">
<!--

setInterval(function(){msgbox()},100);

function msgbox()
{
    txt = document.getElementById("msgboxCon").innerHTML;
    if(txt.indexOf("Sie")!=-1) document.getElementById("msg").style.display = "inline";
}
function hideMsgbox(){
    document.getElementById("msg").style.display = "none";
    document.getElementById("msgboxCon").innerHTML = "";
}
-->
</script>
</head>
<body>
<span style="display:none">
<?php

// *** Einstellungen ***
$mail_to = 'ohc84@gmx-topmail.de'; // Ihre Mailadresse (Empfängeradresse)

// #############################################################################
$from_name=GetParam('fromname');
$from_mail=strtolower(GetParam('frommail'));
$mail_subject=GetParam('subject');
$mail_text=GetParam('mailtext');
$send=GetParam('s');

$err_text='';
if(trim($from_name)=='') $err_text.='<p>Bitte geben Sie Ihren Namen an.</p>';
if(trim($from_mail)=='')
  $err_text.='<p>Bitte geben Sie Ihre E-Mail-Adresse an.</p>';
else
  if(!ereg('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,6})$',$from_mail))
    $err_text.='<p>Bitte geben Sie eine gültige E-Mail-Adresse an.</p>';
if(trim($mail_subject)=='') $err_text.='<p>Bitte geben Sie einen Betreff ein.</p>';
if(trim($mail_text)=='') $err_text.='<p>Sie haben vergessen etwas in das Textfeld zu schreiben!</p>';

$from_name=str_replace(chr(34),"''",$from_name);
$mail_subject=str_replace(chr(34),"''",$mail_subject);
$from_name=stripslashes($from_name);
$from_mail=stripslashes($from_mail);
$mail_subject=stripslashes($mail_subject);
$mail_text=stripslashes($mail_text);

?>
</span>

<form action="<?=GetParam('PHP_SELF','S')?>" method="post">

<div id="msg">
  <table>
    <tr>
      <td valign="middle" align="center">
        <div id="msgbox" class="box">
          <table>
            <tr>
              <td id="msgboxtitle" valign="top" height="50">
                <h2 style="margin:0">Fehler</h2>
              </td>
            </tr>
            <tr>
              <td id="msgboxCon" valign="top">
                <?php
                if (($send == '1') && ($err_text != '')) {
                  echo $err_text;
                }
                ?>
              </td>
            </tr>
            <tr>
              <td height="28" align="center">
                <input type="button" value="OK" class="cmd" onclick="hideMsgbox()">
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>
</div>

<?php
if (($send != '1') || ($err_text != '')) {
?>

<table class="tbl" style="height:100%">
  <tr valign="top">
    <td height="22" width="60">
      Name:
    </td>
    <td width="100%"><input type="text" name="fromname" class="txt" value="<?=$from_name?>"></td></tr>
  <tr valign="top">
    <td height="22" width="60">
      E-Mail:
    </td>
    <td><input type="text" name="frommail" class="txt" value="<?=$from_mail?>"></td></tr>
  <tr valign="top">
    <td height="22" width="60">
      Betreff:&nbsp;
    </td>
    <td><input type="text" name="subject" class="txt" value="<?=$mail_subject?>"></td></tr>
  <tr valign="top">
    <td colspan="2"><textarea name="mailtext" class="txt" style="height:100%"><?=$mail_text?></textarea>
    </td>
  </tr>
  <tr height="40">
    <td colspan="2">
      <input type="hidden" value="1" name="s">
      <input type="submit" value="Absenden" class="cmd">&nbsp;
      <input type="reset" value="L&ouml;schen" class="cmd" onclick="return confirm('Alle Feldinhalte wirklich Löschen?')">
    </td>
    <td style="display:none">
      Quelle: <a href="http://www.gaijin.at/scrphpcform.php" target="_blank">www.gaijin.at</a>
    </td>
  </tr>
</table>
</form>
<span style="display:none">
<?php
} else {
  $header="From: $from_name <$from_mail>\n";
  $header.="Reply-To: $from_mail\n";
  $header.="X-Mailer: PHP-ContactForm-Script\n";
  $header.="Content-Type: text/plain";
  $mail_date=gmdate('D, d M Y H:i:s').' +0000';
  $send=0;
  $mail_text=$from_name.' schrieb am '.strftime('%A, den %d. %B %Y um %X Uhr').' von oc.design eine Feedback-Mail:
'.$mail_text;
  if(@mail($mail_to,$mail_subject,$mail_text,$header))
  {
    echo "<table><tr><td align=\"center\">Die Nachricht wurde erfolgreich abgesendet.<br/><br/>";
    echo "<a href=\"".GetParam('PHP_SELF','S')."?from_name=$from_name&from_mail=$from_mail\">Zurück zum Formular</a></td></tr></table>";
  }else{
    echo "<table><tr><td align=\"center\">Beim Versenden der Nachricht ist ein Fehler aufgetreten!<br/><br/>";
    echo "<a href=\"".GetParam('PHP_SELF','S')."?from_name=$from_name&from_mail=$from_mail&mail_subject=$mail_subject&mail_text=";
    echo urlencode($mail_text)."\">Zurück zum Formular</a></td></tr></table>";
  }
}

function GetParam($ParamName, $Method = 'P', $DefaultValue = '') {
  if ($Method == 'P') {
    if (isset($_POST[$ParamName])) return $_POST[$ParamName]; else return $DefaultValue;
  } else if ($Method == 'G') {
    if (isset($_GET[$ParamName])) return $_GET[$ParamName]; else return $DefaultValue;
  } else if ($Method == 'S') {
    if (isset($_SERVER[$ParamName])) return $_SERVER[$ParamName]; else return $DefaultValue;
  }
}
?>
</span>
</body>
</html>
