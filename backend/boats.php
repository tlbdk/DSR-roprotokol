<?php
require("inc/common.php");
header('Content-type: application/json');

require("inc/jwt.php");

// Validate JWT token
$token = jwt_decode_header($_SERVER["HTTP_AUTHORIZATION"]);
if(isset($token["error"])) {
    echo json_encode($token["error"]);
}

if ($rodb->connect_errno) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
 
if (!$rodb->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $rodb->error);
}

$s="SELECT Boat.id,
           Boat.Name as name,
           BoatType.Seatcount as spaces,
           Boat.Description as description,
           BoatType.Name as category,
           BoatCategory.Name as boattype,
           Boat.Placement as placement,
           Boat.Location as location
    FROM Boat
         INNER JOIN BoatType ON (BoatType.id=BoatType)
         INNER JOIN BoatCategory ON (BoatCategory.id = BoatType.Category)
    WHERE 
         Boat.Decommissioned IS NULL
    ";



//echo $s;
$result=$rodb->query($s) or die("Error in stat query: " . mysqli_error($rodb));;
echo '[';
 $first=1;
 while ($row = $result->fetch_assoc()) {
	  if ($first) $first=0; else echo ',';	  
	  echo json_encode($row);
}
echo ']';
$rodb->close();
?> 
