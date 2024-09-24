let custoAdicionalPix = 0; // Variável global para armazenar o valor do custo adicional Pix

function calcularRentabilidade() {
    // Pegando os valores dos inputs
    const fator = parseFloat(document.getElementById("fator").value);
    const capitalMinimo = parseFloat(document.getElementById("capitalMinimo").value);
    const quantidadePix = parseInt(document.getElementById("pix").value);
    const quantidadeBoleto = parseInt(document.getElementById("boleto").value);

    // Cálculo da rentabilidade
    const rentabilidade = (fator * capitalMinimo)-capitalMinimo;

    // Cálculo do custo adicional (rentabilidade * soma do Pix e Boletos)
    custoAdicionalPix = rentabilidade / (quantidadePix + quantidadeBoleto);

    // Exibindo os resultados
    const resultado = `
        <p><strong>Rentabilidade:</strong> R$ ${rentabilidade.toFixed(2)}</p>
        <p><strong>Custo Adicional Pix:</strong> R$ ${custoAdicionalPix.toFixed(2)}</p>
    `;

    document.getElementById("resultado").innerHTML = resultado;
}

function exportarCSV() {
    const data = document.getElementById("date").value;
    const fator = parseFloat(document.getElementById("fator").value);
    const quantidadePix = parseInt(document.getElementById("pix").value);
    const quantidadeBoleto = parseInt(document.getElementById("boleto").value);

    if (!data || custoAdicionalPix === 0) {
        alert("Por favor, preencha todos os campos e calcule a rentabilidade antes de exportar.");
        return;
    }

    // Formatar os dados para CSV
    const csvData = [
        ["Data", "Fator", "Quantidade Pix", "Quantidade Boleto", "Custo Adicional Pix"],
        [data, fator.toFixed(8), quantidadePix, quantidadeBoleto, custoAdicionalPix.toFixed(2)]
    ];

    let csvContent = "data:text/csv;charset=utf-8,";

    csvData.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    // Criar um link para download do arquivo CSV
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "custo_adicional_pix.csv");

    document.body.appendChild(link);

    // Clicar no link para iniciar o download
    link.click();

    // Remover o link do DOM
    document.body.removeChild(link);
}

