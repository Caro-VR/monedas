async function convertirMoneda() {
    const valNum = document.getElementById("monto").value;
    const valorMoneda = await getMoneda();
    const resultado = parseFloat(valNum) * parseFloat(valorMoneda);
    const inputResultado = document.getElementById("resultado");
    console.log(inputResultado);
    inputResultado.innerHTML = "Resultado: $" + resultado;
    console.log(inputResultado);
  }

const apiURL = "https://api.gael.cloud/general/public/monedas";

async function getMoneda() {
    try {
    const tipoMoneda = document.getElementById("moneda").value;
    const res = await fetch("https://api.gael.cloud/general/public/monedas");
    const moneda = await res.json();
    const monedaSeleccionada = moneda.filter(x => x.Codigo == tipoMoneda.toString());
    return monedaSeleccionada[0].Valor;
    } catch (e) {
        alert(e.message);
    }
}

function prepararConfiguracionParaLaGrafica() {
    // Creamos las variables necesarias para el objeto de configuración
    const tipoDeGrafica = "line";
    const fechas = ["31-03-22", "30-04-22", "31-05-22", "30-06-22", "29-07-22"];
    const titulo = "Dólar";
    const colorDeLinea = "red";
    const valoresUSD = [788.630, 857.510, 826.26, 919.97, 911.42];
    const valoresEUR = [880.256, 900.05, 890.85, 960.90, 926.24];
    // Creamos el objeto de configuración usando las variables anteriores
    const config = {
        type: tipoDeGrafica,
        data: {
            labels: fechas,
            datasets: [
                {
                    label: titulo,
                    backgroundColor: colorDeLinea,
                    borderWidth: 2,
                    data: valoresUSD
                },
                {
                    label: "Euro",
                    backgroundColor: "blue",
                    borderWidth: 2,
                    data: valoresEUR
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
              }
            },
        }
    };
    return config;
}

async function renderGrafica() {
    const config = prepararConfiguracionParaLaGrafica();
    const chartDOM = document.getElementById("grafica");
    new Chart(chartDOM, config);
}

renderGrafica();
    
    
    
