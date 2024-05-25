<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['totalProductsInCart'])) {
    $_SESSION['totalProductsInCart'] = 0;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Web Shop Navigation</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Poetsen+One&display=swap" rel="stylesheet">
</head>

<body>

    <div class="cart-container">
        <a href="cart.php">
            <button class="cart-button">Cart <img src="images/shopping-bag (2).png" alt="">
                <?php if (isset($_SESSION['totalProductsInCart'])) : ?>
                    <span class="cart-badge"><?php echo $_SESSION['totalProductsInCart']; ?></span>
                <?php endif; ?>
            </button>
        </a>
    </div>

</body>

</html>