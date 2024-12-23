
export const form = `
   <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intégration CinetPay avec Bootstrap</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.cinetpay.com/seamless/main.js"></script>
   
    <script>
        function checkout() {
            var transactionId = Math.floor(Math.random() * 100000000).toString();
            var amount = document.getElementById('amount').value;
            var currency = document.getElementById('currency').value;
            var customerName = document.getElementById('customer_name').value;
            var customerSurname = document.getElementById('customer_surname').value;
            var customerEmail = document.getElementById('customer_email').value;
            var customerPhoneNumber = document.getElementById('customer_phone_number').value;
            var customerAddress = document.getElementById('customer_address').value;
            var customerCity = document.getElementById('customer_city').value;
            var customerCountry = document.getElementById('customer_country').value;
            var customerState = document.getElementById('customer_state').value;
            var customerZipCode = document.getElementById('customer_zip_code').value;

            CinetPay.setConfig({
                apikey: '128888641466687788593a18.15969379', // Remplacez par votre clé API
                site_id: '5873694', // Remplacez par votre ID de site
                notify_url: 'http://mondomaine.com/notify/',
                mode: 'PRODUCTION'
            });

            CinetPay.getCheckout({
                transaction_id: transactionId,
                amount: amount,
                currency: 'XAF',
                channels: 'ALL',
                description: 'Test de paiement',
                customer_name: customerName,
                customer_surname: customerSurname,
                customer_email: customerEmail,
                customer_phone_number: customerPhoneNumber,
                customer_address: customerAddress,
                customer_city: customerCity,
                customer_country: customerCountry,
                customer_state: customerState,
                customer_zip_code: customerZipCode,
            });

            CinetPay.waitResponse(function(data) {
                if (data.status === "REFUSED") {
                    alert("Votre paiement a échoué");
                    window.location.reload();
                } else if (data.status === "ACCEPTED") {
                    alert("Votre paiement a été effectué avec succès");
                    window.location.reload();
                }
            });

            CinetPay.onError(function(data) {
                console.log(data);
            });
        }
    </script>
</head>
<body>
    <div class="sdk">
        <h1>SDK SEAMLESS</h1>
        <form class="container">
            <div class="form-group">
                <label for="amount">Montant</label>
                <input type="number" class="form-control" id="amount" placeholder="Entrez le montant" required>
            </div>
            <div class="form-group">
                <label for="currency">Devise</label>
                <select class="form-control" id="currency" required>
                    <option value="XOF">XOF</option>
                    <!-- Ajoutez d'autres devises si nécessaire -->
                </select>
            </div>
            <div class="form-group">
                <label for="customer_name">Nom</label>
                <input type="text" class="form-control" id="customer_name" placeholder="Entrez le nom" required>
            </div>
            <div class="form-group">
                <label for="customer_surname">Prénom</label>
                <input type="text" class="form-control" id="customer_surname" placeholder="Entrez le prénom" required>
            </div>
            <div class="form-group">
                <label for="customer_email">Email</label>
                <input type="email" class="form-control" id="customer_email" placeholder="Entrez l'email" required>
            </div>
            <div class="form-group">
                <label for="customer_phone_number">Numéro de téléphone</label>
                <input type="tel" class="form-control" id="customer_phone_number" placeholder="Entrez le numéro de téléphone" required>
            </div>
            <div class="form-group">
                <label for="customer_address">Adresse</label>
                <input type="text" class="form-control" id="customer_address" placeholder="Entrez l'adresse" required>
            </div>
            <div class="form-group">
                <label for="customer_city">Ville</label>
                <input type="text" class="form-control" id="customer_city" placeholder="Entrez la ville" required>
            </div>
            <div class="form-group">
                <label for="customer_country">Pays</label>
                <input type="text" class="form-control" id="customer_country" placeholder="Entrez le pays" required>
            </div>
            <div class="form-group">
                <label for="customer_state">État</label>
                <input type="text" class="form-control" id="customer_state" placeholder="Entrez l'état" required>
            </div>
            <div class="form-group">
                <label for="customer_zip_code">Code postal</label>
                <input type="text" class="form-control" id="customer_zip_code" placeholder="Entrez le code postal" required>
            </div>
            <button type="button" class="btn btn-primary" onclick="checkout()">Checkout</button>
        </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>

`