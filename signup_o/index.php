<?php
$pathpass = fopen("./users/$username/pass.txt", "w") or die ("An error has occured.");
$txtpass = "pass\n";
fwrite($pathpass, $txtpass);
fclose($pathinfo);
$pathinfo = fopen("./users/$username/info.txt", "w") or die ("An error has occured.");
$txtinfo "bits 0\ntrophies 0\nemail null\nfname null\nlname null\nlogins null\n";
fwrite($pathinfo,$txtinfo);
fclose($pathinfo);
// $ver-msg = "ByteBrawlers Email Verification\nVerify your email by going to the link below.\nhttps://raichaudhry.com/WHATEVER URL HERE\nThanks!";
// mail("raichaudhry@nestmk12.net","ByteBrawlers - Verify Your Email",$msg);
?>