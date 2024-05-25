<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: admin.php');
    exit();
}
include 'functions.php';

if (isset($_POST['add_product'])) {
    $conn = connect_db();
    $name = $conn->real_escape_string($_POST['name']);
    $price = $conn->real_escape_string($_POST['price']);
    $amount = $conn->real_escape_string($_POST['amount']);
    $description = $conn->real_escape_string($_POST['description']);
    $image = $conn->real_escape_string($_POST['image']);

    $query = "INSERT INTO products (name, price, amount, description, image) VALUES ('$name', '$price', '$amount', '$description', '$image')";
    if ($conn->query($query) === TRUE) {
        $conn->close();
        header('Location: products2.php');
        exit();
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Add New Product</title>
    <link rel="stylesheet" type="text/css" href="style2.css">
</head>

<body>
    <h2>Add New Product</h2>
    <nav>
        <ul>
            <li><a href="dashboard.php">Home</a></li>
            <li><a href="products.php">Products</a></li>
            <li><a href="orders.php">Orders</a></li>
            <li><a href="logout.php">Logout</a></li>
        </ul>
    </nav>

    <form method="post" action="add_product2.php">
        <label for="name">Name:</label>
        <input type="text" name="name" required>
        <label for="price">Price:</label>
        <input type="text" name="price" required>
        <label for="amount">Amount:</label>
        <input type="text" name="amount" required>
        <label for="description">Description:</label>
        <textarea name="description" required></textarea>
        <label for="image">Image URL:</label>
        <input type="text" name="image" required>
        <button type="submit" name="add_product">Add Product</button>
    </form>
</body>

</html>