<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Web Shop</title>
    <link rel="stylesheet" type="text/css" href="style2.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Poetsen+One&display=swap" rel="stylesheet">
</head>

</html>

<?php

$conn = connect_db();

$query = "SELECT * FROM products ORDER BY id DESC LIMIT 4";
$result = $conn->query($query);

if ($result === false) {
    echo "Error executing query: " . $conn->error;
} else {
    echo "<h2 class='recent'>Recent Products</h2>";

    echo "<div class='products'>";
    echo "<div class='product-list'>";
    while ($row = $result->fetch_assoc()) {
        echo "<div class='product'>";
        echo "<img src='" . $row['image'] . "' alt='" . $row['name'] . "'>";
        echo "<h3>" . $row['name'] . "</h3>";
        echo "<p>" . $row['price'] . "$</p>";
        echo "<p>Amount: " . $row['amount'] . "</p>";

        echo "<a href='product.php?id=" . $row['id'] . "'>View Product</a>";
        echo "</div>";
    }
    echo "</div>";
    echo "</div>";
}

$conn->close();
