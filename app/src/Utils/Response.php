<?php

namespace App\Utils;

use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class Response extends HttpFoundationResponse {
  
  public function __construct($content = '', $status = 200, array $headers = array()) {
    parent::__construct($content, $status, $headers);
  }

  public static function json(mixed $data, HttpStatus $status = HttpStatus::OK, array $headers = array()): Response {
    $headers['Content-Type'] = 'application/json';
    return new self(json_encode($data), $status->value, $headers);
  }

  public static function error(String $message, HttpStatus $status = HttpStatus::BAD_REQUEST, array $headers = array()): Response {
    $headers['Content-Type'] = 'application/json';
    return new self(json_encode(['error' => $message]), $status->value, $headers);
  }

  public static function success(String $message, HttpStatus $status = HttpStatus::OK, array $headers = array()): Response {
    $headers['Content-Type'] = 'application/json';
    return new self(json_encode(['success' => $message]), $status->value, $headers);
  }
  
}