<?php 
	header('Content-Type: application/json; charset=utf-8');
  	echo file_get_contents('https://receitaws.com.br/v1/cnpj/'.$_GET['cnpj']);
 ?>