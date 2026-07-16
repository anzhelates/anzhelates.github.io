const btnRate = document.getElementById("btnRate");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const currency = document.getElementById("currency");
const sectionData = document.getElementById("data");

const BASE_URL = "https://bank.gov.ua/NBU_Exchange/exchange_site?start=";
const CURRENCY_LIST_URL = "https://bank.gov.ua/NBU_Exchange/exchange_site?sort=exchangedate&order=desc&json";

const chart = new Chart(document.getElementById("rateChart"), {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "",
            data: [],
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1
        }]
    },
    options: {
        maintainAspectRatio: false
    }
});

function loadCurrencies() {
    const XHR = new XMLHttpRequest();
    XHR.open("GET", CURRENCY_LIST_URL);
    XHR.send();

    XHR.addEventListener("readystatechange", () => {
        if (XHR.readyState === 4) {
            const data = JSON.parse(XHR.responseText);
            data.forEach(record => {
                const option = document.createElement("option");
                option.value = record.cc;
                option.textContent = `${record.txt} (${record.cc})`;
                currency.appendChild(option);
            });
        }
    });
}

loadCurrencies();

btnRate.addEventListener("click", () => {
    const URI = `${BASE_URL}${startDate.value.split("-").join("")}&end=${endDate.value.split("-").join("")}&valcode=${currency.value}&sort=exchangedate&order=desc&json`;
    const XHR = new XMLHttpRequest();
    XHR.open("GET", URI);
    XHR.send();

    XHR.addEventListener("readystatechange", () => {
        if (XHR.readyState === 4) {
            const data = JSON.parse(XHR.responseText);
            const chronological = [...data].reverse();
            const labels = chronological.map(record => record.exchangedate);
            const rates = chronological.map(record => Number(record.rate_per_unit));

            chart.data.labels = labels;
            chart.data.datasets[0].data = rates;
            chart.data.datasets[0].label = `${currency.value} rate`;
            chart.update();
        }
    });
});
