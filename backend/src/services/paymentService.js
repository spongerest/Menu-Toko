const midtransClient = require('midtrans-client');
require('dotenv').config();

let snap = new midtransClient.Snap({
    isProduction : false,
    serverKey : process.env.MIDTRANS_SERVER_KEY,
    clientKey : process.env.MIDTRANS_CLIENT_KEY
});

const initiatePayment = async (orderDetails, paymentType) => {
    let parameter = {
        "transaction_details": {
            "order_id": orderDetails.id,
            "gross_amount": orderDetails.totalPrice
        },
        "payment_type": paymentType, // Tipe pembayaran dinamis
    };
    
    if (paymentType === 'bank_transfer') {
        parameter.bank_transfer = {
            "bank": "bca", // Misalnya, untuk BCA. Ganti sesuai dengan bank yang diinginkan
            // Anda dapat menambahkan opsi lebih lanjut seperti "va_number" jika diperlukan
        };
    }

    // Menambahkan spesifikasi untuk pembayaran e-money
    switch (paymentType) {
        case 'gopay':
            parameter.gopay = {
                // Spesifikasi GoPay jika ada
            };
            break;
        case 'shopeepay':
            parameter.shopeepay = {
                // Spesifikasi ShopeePay jika ada
            };
            break;
        case 'dana':
            parameter.dana = {
                // Spesifikasi DANA jika ada
            };
            break;
        case 'ovo':
            parameter.ovo = {
                // Spesifikasi OVO jika ada
            };
            break;
        // Tambahkan kasus lain untuk e-money atau metode pembayaran lainnya
    }

    try {
        const payment = await snap.createTransaction(parameter);
        return payment;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    initiatePayment,
    // Fungsi lain sesuai kebutuhan
};