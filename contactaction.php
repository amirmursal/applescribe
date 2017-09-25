<?php  ?><?php
require_once ("Email_class.php");
$firstname=$_POST['your-name'];
$email=$_POST['your-email'];
$msg = $_POST['your-message'];
{
	$Sender="donotreply@medicorpnet.com";
	$Recipiant="medinetcorpllc@gmail.com";
	$Bcc = "";
	$Subject="www.medinetcorpusa.com - contact us details";
	$message.=" \n";
	$message.="Below are the details: \n";
	$message.=" \n";
	$message.="First Name: $firstname\n";
	$message.="Email: $email\n";	
	$message.="Message: $$msg\n";
	$msg = new Email($Recipiant, $Sender, $Subject);
	$msg->Bcc = $Bcc;
	$msg->TextOnly = true;
	$msg->Content = $message;
	$SendSuccess = $msg->Send();
	header("Location: Thanks.html");
}
?>
<? ob_flush(); ?>