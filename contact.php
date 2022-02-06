<?php
if (isset($_POST['submit'])) { 
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $mail = $_POST['mail'];
    $company = $_POST['company'];
    $topic = $_POST['topic'];
    $message = $_POST['message'];

    $mailTo = "spacjar@gmail.com";
    $headers = "From: " .$email;
    $txt = "You have received an e-mail from: \nFirst name: ".$first_name."\nLast name: ".$last_name."\nCompany (optional): ".$company."\n\nMessage: ".$message;

    mail($mailTo, $topic, $txt, $headers); 
    header("Location: index.php?mailsend");
}
?>