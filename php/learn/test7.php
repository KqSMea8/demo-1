<?php
$geocoderAdapter = new \Geocoder\HttpAdapter\CurlHttpAdapter();
$geocoderProvider = new \Geocoder\Provider\GoogleMapsProvider($geocoderAdapter);
$geocoder = new \Geocoder\Geocoder($geocoderProvider);

$store = new RetailStore();
$store->setAddress('420 9th Avenue, new York, NY 100001 USA');
$store->setGeocoder($geocoder);

$latitude = $store->getLaditude();
$longitude = $store->getLongitude();
echo $latitued, ';', $longitude;