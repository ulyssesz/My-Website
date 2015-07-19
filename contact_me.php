<?php

require_once 'google/appengine/api/mail/Message.php';

use google\appengine\api\mail\Message;

// check if fields passed are empty
if(empty($_POST['name'])                  ||
   empty($_POST['email'])                 ||
   empty($_POST['message'])        ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
        echo "No arguments Provided!";
        return false;
   }
        
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
        
// create email body and send it        
$to = 'me@ulysseszheng0.appspotmail.com'; // put your email
$email_subject = "Contact form submitted by:  $name";
$email_body = "You have received a new message. \n\n".
                                  " Here are the details:\n \nName: $name \n ".
                                  "Email: $email_address\n Message \n $message";    

$mail_options = [
	"sender" => $email_address,
	"to" => $to,
	"subject" => $email_subject,
	"textBody" => $email_body
	
$mail_options = [
    "sender" => "admin@example.com",
    "to" => "me@ulysseszheng0.appspotmail.com",
    "subject" => "Your example.com account has been activated.",
    "textBody" => "test 1 2 3"
];

try {
	$message = new Message($mail_options);
	$message->send();
	return true;                        
} catch (InvalidArgumentException $e) {
	return false;
}


?>