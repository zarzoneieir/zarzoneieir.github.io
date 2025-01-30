async function getCryptoPrice() {
    let symbol = document.getElementById("cryptoInput").value.toUpperCase();
    if (!symbol) {
        alert("Введите тикер криптовалюты!");
        return;
    }

    let url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        
        if (data[symbol.toLowerCase()]) {
            document.getElementById("cryptoPrice").innerText = 
                `Цена ${symbol}: $${data[symbol.toLowerCase()].usd}`;
        } else {
            document.getElementById("cryptoPrice").innerText = "Криптовалюта не найдена!";
        }
    } catch (error) {
        console.error("Ошибка запроса:", error);
        document.getElementById("cryptoPrice").innerText = "Ошибка загрузки данных!";
    }
}
