<?php

namespace App\Service;

class Mailer {
  
  private $mailer;
  
  public function __construct(String $mailer_dsn) {
    
    
  }
  
  function sendEmail($email, $subject, $body): bool {
    $this->mailer->isSMTP();
    $this->mailer->setFrom('projetepitechmsc@gmail.com', 'Projet Epitech');
    $this->mailer->addAddress($email);
    $this->mailer->Subject = $subject;
    $this->mailer->Body = $body;
    
    if ($this->mailer->send()) {
      return true;
    } else {
      return false;
    }
  }
}