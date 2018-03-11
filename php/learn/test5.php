<?php
$documentStore = new DocumentStore();

$htmlDoc = new HtmlDocument('https://php.net');
$documentStore->addDocument($htmlDoc);

$streamDocu = new StreamDocument(fopen('stream.txt', 'rb'));
$documentStrore->addDocument($cmdDoc);

prinf_r($documentStrore->getDocuments());

