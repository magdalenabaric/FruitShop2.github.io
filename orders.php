<?php
include 'functions.php';

if (!isset($_SESSION['admin'])) {
    header('Location: admin.php');
    exit;
}

$conn = connect_db();
$query = "SELECT * FROM orders";
$result = $conn->query($query);
?>

<div class="orders">
    <h2>Orders</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Products</th>
                <th>Total Price</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($row = $result->fetch_assoc()) : ?>
                <tr>
                    <td><?php echo $row['name']; ?></td>
                    <td><?php echo $row['phone']; ?></td>
                    <td><?php echo $row['address']; ?></td>
                    <td><?php echo $row['products']; ?></td>
                    <td><?php echo $row['total_price']; ?>$</td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
</div>