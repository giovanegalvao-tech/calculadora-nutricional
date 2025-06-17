// Configuração do jsPDF
const { jsPDF } = window.jspdf;

// Dados de referência
const referenceData = {
    imcClassification: {
        adulto: [
            { min: 0, max: 16, classification: "Magreza grau III", class: "classification-desnutricao-grave" },
            { min: 16, max: 16.9, classification: "Magreza grau II", class: "classification-desnutricao" },
            { min: 17, max: 18.4, classification: "Magreza grau I", class: "classification-desnutricao" },
            { min: 18.5, max: 24.9, classification: "Eutrofia", class: "classification-eutrofia" },
            { min: 25, max: 29.9, classification: "Pré-obeso", class: "classification-sobrepeso" },
            { min: 30, max: 34.9, classification: "Obesidade grau I", class: "classification-obesidade" },
            { min: 35, max: 39.9, classification: "Obesidade grau II", class: "classification-obesidade" },
            { min: 40, max: 999, classification: "Obesidade grau III", class: "classification-obesidade" }
        ],
        idoso: [
            { min: 0, max: 22, classification: "Magreza", class: "classification-desnutricao" },
            { min: 22, max: 27, classification: "Eutrofia", class: "classification-eutrofia" },
            { min: 27, max: 29.9, classification: "Sobrepeso", class: "classification-sobrepeso" },
            { min: 30, max: 999, classification: "Obesidade", class: "classification-obesidade" }
        ]
    },
    cbClassification: [
        { min: 0, max: 60, classification: "Desnutrição Grave", class: "classification-desnutricao-grave" },
        { min: 60, max: 80, classification: "Desnutrição Moderada", class: "classification-desnutricao" },
        { min: 80, max: 90, classification: "Desnutrição Leve", class: "classification-desnutricao" },
        { min: 90, max: 110, classification: "Eutrofia", class: "classification-eutrofia" },
        { min: 110, max: 120, classification: "Sobrepeso", class: "classification-sobrepeso" },
        { min: 120, max: 999, classification: "Obesidade", class: "classification-obesidade" }
    ],
    cpClassification: {
        masculino: { desnutricao: 34, grave: 32 },
        feminino: { desnutricao: 32, grave: 29 }
    },
    emapClassification: [
        { min: 0, max: 60, classification: "Depleção Grave", class: "classification-desnutricao-grave" },
        { min: 60, max: 90, classification: "Depleção Moderada", class: "classification-desnutricao" },
        { min: 90, max: 99, classification: "Depleção Leve", class: "classification-desnutricao" },
        { min: 100, max: 999, classification: "Sem Depleção", class: "classification-eutrofia" }
    ],
    perdaPesoClassification: [
        { min: 0, max: 70, classification: "Desnutrição Grave", class: "classification-desnutricao-grave" },
        { min: 70.1, max: 80, classification: "Desnutrição Moderada", class: "classification-desnutricao" },
        { min: 80.1, max: 90, classification: "Desnutrição Leve", class: "classification-desnutricao" },
        { min: 90.1, max: 110, classification: "Eutrofia", class: "classification-eutrofia" },
        { min: 110.1, max: 120, classification: "Sobrepeso", class: "classification-sobrepeso" },
        { min: 120.1, max: 999, classification: "Obesidade", class: "classification-obesidade" }
    ],
    amputacaoPercent: {
        mao: 0.8,
        antebraco: 2.3,
        braco: 6.6,
        pe: 1.7,
        pernaAbaixo: 7.0,
        pernaAcima: 11.0,
        pernaInteira: 18.6
    },
    edemaWeight: {
        1: 1,
        2: 3.5,
        3: 5.5,
        4: 11
    },
    asciteWeight: {
        1: 2.2,
        2: 6,
        3: 14
    },
    pesoIdealPorCompleicao: {
        masculino: {
            pequena: [
                { altura: 155, peso: 50.0 }, { altura: 156, peso: 50.7 }, { altura: 157, peso: 51.4 },
                { altura: 158, peso: 51.7 }, { altura: 159, peso: 52.2 }, { altura: 160, peso: 52.7 },
                { altura: 161, peso: 53.2 }, { altura: 162, peso: 53.7 }, { altura: 163, peso: 54.1 },
                { altura: 164, peso: 55.0 }, { altura: 165, peso: 55.9 }, { altura: 166, peso: 56.5 },
                { altura: 167, peso: 57.4 }, { altura: 168, peso: 57.7 }, { altura: 169, peso: 58.6 },
                { altura: 170, peso: 59.5 }, { altura: 171, peso: 60.1 }, { altura: 172, peso: 60.7 },
                { altura: 173, peso: 61.4 }, { altura: 174, peso: 62.3 }, { altura: 175, peso: 63.2 },
                { altura: 176, peso: 63.8 }, { altura: 177, peso: 64.4 }, { altura: 178, peso: 65.0 },
                { altura: 179, peso: 65.9 }, { altura: 180, peso: 66.8 }, { altura: 181, peso: 67.4 },
                { altura: 182, peso: 68.0 }, { altura: 183, peso: 68.8 }, { altura: 184, peso: 69.8 },
                { altura: 185, peso: 70.9 }, { altura: 186, peso: 71.5 }, { altura: 187, peso: 72.1 },
                { altura: 188, peso: 72.7 }, { altura: 189, peso: 73.3 }, { altura: 190, peso: 73.9 },
                { altura: 191, peso: 74.5 }
            ],
            media: [
                { altura: 155, peso: 53.6 }, { altura: 156, peso: 54.3 }, { altura: 157, peso: 55.0 },
                { altura: 158, peso: 55.5 }, { altura: 159, peso: 56.0 }, { altura: 160, peso: 56.4 },
                { altura: 161, peso: 56.8 }, { altura: 162, peso: 57.2 }, { altura: 163, peso: 57.7 },
                { altura: 164, peso: 58.5 }, { altura: 165, peso: 59.5 }, { altura: 166, peso: 60.1 },
                { altura: 167, peso: 60.7 }, { altura: 168, peso: 61.4 }, { altura: 169, peso: 62.3 },
                { altura: 170, peso: 63.2 }, { altura: 171, peso: 63.8 }, { altura: 172, peso: 64.4 },
                { altura: 173, peso: 65.0 }, { altura: 174, peso: 66.9 }, { altura: 175, peso: 66.8 },
                { altura: 176, peso: 67.5 }, { altura: 177, peso: 68.2 }, { altura: 178, peso: 69.0 },
                { altura: 179, peso: 69.9 }, { altura: 180, peso: 70.9 }, { altura: 181, peso: 71.7 },
                { altura: 182, peso: 72.5 }, { altura: 183, peso: 72.2 }, { altura: 184, peso: 74.1 },
                { altura: 185, peso: 75.0 }, { altura: 186, peso: 75.8 }, { altura: 187, peso: 76.6 },
                { altura: 188, peso: 77.3 }, { altura: 189, peso: 78.0 }, { altura: 190, peso: 78.7 },
                { altura: 191, peso: 79.5 }
            ],
            grande: [
                { altura: 155, peso: 58.2 }, { altura: 156, peso: 58.8 }, { altura: 157, peso: 59.2 },
                { altura: 158, peso: 60.0 }, { altura: 159, peso: 60.5 }, { altura: 160, peso: 60.9 },
                { altura: 161, peso: 61.5 }, { altura: 162, peso: 62.1 }, { altura: 163, peso: 63.7 },
                { altura: 164, peso: 63.4 }, { altura: 165, peso: 64.1 }, { altura: 166, peso: 64.8 },
                { altura: 167, peso: 65.6 }, { altura: 168, peso: 66.4 }, { altura: 169, peso: 67.5 },
                { altura: 170, peso: 68.6 }, { altura: 171, peso: 69.2 }, { altura: 172, peso: 69.8 },
                { altura: 173, peso: 70.5 }, { altura: 174, peso: 71.4 }, { altura: 175, peso: 72.0 },
                { altura: 176, peso: 72.9 }, { altura: 177, peso: 73.5 }, { altura: 178, peso: 74.1 },
                { altura: 179, peso: 75.3 }, { altura: 180, peso: 76.4 }, { altura: 181, peso: 77.1 },
                { altura: 182, peso: 77.8 }, { altura: 183, peso: 78.6 }, { altura: 184, peso: 79.8 },
                { altura: 185, peso: 80.9 }, { altura: 186, peso: 81.7 }, { altura: 187, peso: 82.5 },
                { altura: 188, peso: 83.2 }, { altura: 189, peso: 83.8 }, { altura: 190, peso: 84.4 },
                { altura: 191, peso: 85.0 }
            ]
        },
        feminino: {
            pequena: [
                { altura: 140, peso: 41.8 }, { altura: 141, peso: 42.3 }, { altura: 142, peso: 42.8 },
                { altura: 143, peso: 43.2 }, { altura: 144, peso: 43.7 }, { altura: 145, peso: 44.1 },
                { altura: 146, peso: 44.6 }, { altura: 147, peso: 45.1 }, { altura: 148, peso: 45.5 },
                { altura: 149, peso: 46.2 }, { altura: 150, peso: 46.8 }, { altura: 151, peso: 47.1 },
                { altura: 152, peso: 47.8 }, { altura: 153, peso: 46.2 }, { altura: 154, peso: 48.9 },
                { altura: 155, peso: 49.5 }, { altura: 156, peso: 50.0 }, { altura: 157, peso: 50.5 },
                { altura: 158, peso: 51.0 }, { altura: 159, peso: 51.5 }, { height: 160, peso: 52.0 },
                { height: 161, peso: 52.5 }, { height: 162, peso: 53.0 }, { height: 163, peso: 53.5 },
                { height: 164, peso: 54.0 }, { height: 165, peso: 54.5 }, { height: 166, peso: 55.0 },
                { height: 167, peso: 55.5 }, { height: 168, peso: 55.9 }, { height: 169, peso: 56.4 },
                { height: 170, peso: 56.8 }, { height: 171, peso: 57.2 }, { height: 172, peso: 57.7 },
                { height: 173, peso: 58.2 }, { height: 174, peso: 58.6 }, { height: 175, peso: 59.0 },
                { height: 176, peso: 59.5 }
            ],
            media: [
                { altura: 140, peso: 45.0 }, { altura: 141, peso: 45.3 }, { altura: 142, peso: 45.6 },
                { altura: 143, peso: 45.9 }, { altura: 144, peso: 46.6 }, { altura: 145, peso: 47.3 },
                { altura: 146, peso: 47.7 }, { altura: 147, peso: 48.1 }, { altura: 148, peso: 48.6 },
                { altura: 149, peso: 49.3 }, { altura: 150, peso: 50.0 }, { altura: 151, peso: 50.5 },
                { altura: 152, peso: 51.0 }, { altura: 153, peso: 51.4 }, { altura: 154, peso: 53.3 },
                { altura: 155, peso: 53.2 }, { altura: 156, peso: 53.6 }, { altura: 157, peso: 54.0 },
                { altura: 158, peso: 54.5 }, { altura: 159, peso: 55.0 }, { height: 160, peso: 55.5 },
                { height: 161, peso: 56.0 }, { height: 162, peso: 56.5 }, { height: 163, peso: 57.0 },
                { height: 164, peso: 57.5 }, { height: 165, peso: 58.0 }, { height: 166, peso: 58.5 },
                { height: 167, peso: 59.0 }, { height: 168, peso: 59.5 }, { height: 169, peso: 60.0 },
                { height: 170, peso: 60.5 }, { height: 171, peso: 61.0 }, { height: 172, peso: 61.5 },
                { height: 173, peso: 62.0 }, { height: 174, peso: 62.5 }, { height: 175, peso: 63.0 },
                { height: 176, peso: 63.5 }
            ],
            grande: [
                { altura: 140, peso: 49.5 }, { altura: 141, peso: 49.8 }, { altura: 142, peso: 50.1 },
                { altura: 143, peso: 50.5 }, { altura: 144, peso: 51.2 }, { altura: 145, peso: 53.8 },
                { altura: 146, peso: 52.3 }, { altura: 147, peso: 52.8 }, { altura: 148, peso: 53.2 },
                { altura: 149, peso: 54.0 }, { altura: 150, peso: 54.5 }, { altura: 151, peso: 55.0 },
                { altura: 152, peso: 55.5 }, { altura: 153, peso: 55.9 }, { altura: 154, peso: 56.8 },
                { altura: 155, peso: 57.7 }, { altura: 156, peso: 58.3 }, { altura: 157, peso: 58.9 },
                { altura: 158, peso: 59.5 }, { altura: 159, peso: 60.1 }, { height: 160, peso: 60.7 },
                { height: 161, peso: 61.4 }, { height: 162, peso: 62.1 }, { height: 163, peso: 62.8 },
                { height: 164, peso: 63.5 }, { height: 165, peso: 64.2 }, { height: 166, peso: 64.9 },
                { height: 167, peso: 65.6 }, { height: 168, peso: 66.3 }, { height: 169, peso: 67.0 },
                { height: 170, peso: 67.7 }, { height: 171, peso: 68.4 }, { height: 172, peso: 69.1 },
                { height: 173, peso: 69.8 }, { height: 174, peso: 70.5 }, { height: 175, peso: 71.2 },
                { height: 176, peso: 71.9 }
            ]
        }
    }
};

// Event listeners para mostrar/ocultar opções
document.addEventListener('DOMContentLoaded', function() {
    // Condições especiais (mesmo da versão anterior)
    document.getElementById('edema').addEventListener('change', function() {
        document.getElementById('edemaOptions').style.display = 
            this.checked ? 'block' : 'none';
    });

    document.getElementById('ascite').addEventListener('change', function() {
        document.getElementById('asciteOptions').style.display = 
            this.checked ? 'block' : 'none';
    });

    document.getElementById('amputacao').addEventListener('change', function() {
        document.getElementById('amputacaoOptions').style.display = 
            this.checked ? 'block' : 'none';
    });

   
    // Botão para calcular estimativas iniciais
    document.getElementById('calcularEstimativasBtn').addEventListener('click', calcularEstimativasIniciais);
    
    // Botão para confirmar métodos de estimativa
    document.getElementById('confirmarMetodosBtn').addEventListener('click', function() {
        document.getElementById('metodosEstimativa').style.display = 'none';
        document.getElementById('fatoresGET').style.display = 'block';
    });
    
    // Botão para preencher modelo de evolução
    document.getElementById('preencherEvolucaoBtn').addEventListener('click', preencherEvolucaoModelo);
    
    // Botão calcular
    document.getElementById('calcularBtn').addEventListener('click', calcularAvaliacao);
    
    // Botão gerar PDF
    document.getElementById('gerarPdfBtn').addEventListener('click', gerarPDF);
    
    // Mostrar/ocultar seções conforme formato de evolução
    document.querySelectorAll('input[name="formatoEvolucao"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Atualizar o texto da evolução se já estiver preenchido
            if (document.getElementById('evolucaoTexto').value) {
                preencherEvolucaoModelo();
            }
        });
    });
});

// Calcular estimativas iniciais (peso estimado, ideal e altura estimada)
function calcularEstimativasIniciais() {
    const formData = getFormData();
    
    // Validar dados mínimos
    if (formData.alturaJoelho <= 0 || formData.circBraco <= 0 || formData.circPunho <= 0) {
        alert('Por favor, preencha as medidas necessárias para as estimativas (altura do joelho, CB e CP).');
        return;
    }
    
    // Calcular estimativas
    const pesoEstimado = calcularPesoEstimado(formData);
    const pesoIdeal = calcularPesoIdeal(formData);
    const alturaEstimada = calcularAlturaEstimada(formData);
    
    // Mostrar resultados
    document.getElementById('pesoEstimadoResult').innerHTML = `
        <p><strong>Peso Estimado (Chumlea):</strong> ${pesoEstimado.toFixed(1)} kg</p>
    `;
    
    document.getElementById('pesoIdealResult').innerHTML = `
        <p><strong>Peso Ideal (IMC médio):</strong> ${pesoIdeal.toFixed(1)} kg</p>
    `;
    
    document.getElementById('alturaEstimadaResult').innerHTML = `
        <p><strong>Altura Estimada (Chumlea):</strong> ${alturaEstimada.toFixed(1)} cm</p>
    `;
    
    // Mostrar seção de resultados
    document.getElementById('resultadosEstimativas').style.display = 'block';
    
    // Mostrar seções subsequentes
    document.getElementById('metodosEstimativa').style.display = 'block';
    document.getElementById('fatoresGET').style.display = 'none'; // Mantém oculto até confirmar métodos
    document.getElementById('macronutrientes').style.display = 'block';
    document.getElementById('evolucaoNutricional').style.display = 'block';
    document.getElementById('finalActions').style.display = 'block'; // Mostra os botões finais

}

// Preencher o campo de evolução com o modelo selecionado
function preencherEvolucaoModelo() {
    const formData = getFormData();
    const formato = document.querySelector('input[name="formatoEvolucao"]:checked').value;
    let textoEvolucao = '';
    
    if (formato === 'adima') {
        // Modelo ADIMA
        textoEvolucao = `A: Paciente ${formData.internadoHa ? 'internado há ' + formData.internadoHa : 'em atendimento ambulatorial'}, `;
        textoEvolucao += `com diagnóstico clínico de ${formData.diagnostico || '[informe o diagnóstico]'}, `;
        textoEvolucao += `${formData.lucido ? 'lúcido' : 'não lúcido'} e ${formData.comunicativo ? 'comunicativo' : 'não comunicativo'}, `;
        textoEvolucao += `${formData.acamado ? 'acamado' : 'deambulando' + (formData.auxilio ? ' com auxílio' : ' sem auxílio')}. `;
        
        if (formData.comorbidades) {
            textoEvolucao += `Apresenta ${formData.comorbidades}. `;
        }
        
        textoEvolucao += `Refere aceitação ${formData.aceitacaoDieta === 'total' ? 'total' : 'parcial'} da dieta `;
        textoEvolucao += `e IH de ${formData.ingestaoHidrica || 'X'} mL/dia. `;
        
        if (formData.sintomasTGI) {
            textoEvolucao += `Relata ${formData.sintomasTGI}. `;
        } else {
            textoEvolucao += `Nega sintomas gastrointestinais. `;
        }
        
        textoEvolucao += `HI ${formData.habitoIntestinal === 'regular' ? 'regular' : 'irregular'}`;
        if (formData.habitoIntestinal === 'constipado') {
            textoEvolucao += ` (constipado há ${formData.diasConstipacao || 'X'} dias). `;
        } else {
            textoEvolucao += `. `;
        }
        
        textoEvolucao += `Diurese ${formData.diurese === 'espontanea' ? 'espontânea presente' : 'em SVD'}`;
        if (formData.corDiurese) {
            textoEvolucao += ` (${formData.corDiurese}). `;
        } else {
            textoEvolucao += `. `;
        }
        
        // Adicionar dados antropométricos e nutricionais depois
        textoEvolucao += `\n\nD: [Diagnósticos em nutrição - preencher conforme avaliação]`;
        textoEvolucao += `\n\nI: [Intervenções nutricionais - preencher conforme avaliação]`;
        textoEvolucao += `\n\nM/A: [Monitoramento e avaliação - preencher conforme avaliação]`;
        textoEvolucao += `\n\nNAN: Secundário`;
        
    } else {
        // Modelo SOAP HRCO
        textoEvolucao = `S: \nPaciente ${formData.internadoHa ? 'internado há ' + formData.internadoHa : 'em atendimento ambulatorial'}, `;
        textoEvolucao += `para ${formData.motivoAtendimento || '[informe o motivo]'}, `;
        textoEvolucao += `com diagnóstico clínico de ${formData.diagnostico || '[informe o diagnóstico]'}.\n\n`;
        
        textoEvolucao += `O:\n`;
        // Dados objetivos serão preenchidos após os cálculos
        
        textoEvolucao += `\nA:\n`;
        textoEvolucao += `Paciente do sexo ${formData.sexo === 'masculino' ? 'masculino' : 'feminino'}, `;
        textoEvolucao += `${formData.etnia || 'LOTE'}, ${formData.estadoGeral || 'BEG'}, `;
        textoEvolucao += `${formData.comunicativo ? 'comunicativo' : 'não comunicativo'}, `;
        textoEvolucao += `${formData.acamado ? 'acamado' : 'deambulando' + (formData.auxilio ? ' com auxílio' : ' sem auxílio')}\n`;
        
        if (formData.comorbidades) {
            textoEvolucao += `Apresenta ${formData.comorbidades}.\n`;
        } else {
            textoEvolucao += `Nega comorbidades.\n`;
        }
        
        if (formData.sintomasTGI) {
            textoEvolucao += `Relata ${formData.sintomasTGI}.\n`;
        } else {
            textoEvolucao += `Nega SGI.\n`;
        }
        
        textoEvolucao += `Hábito intestinal ${formData.habitoIntestinal === 'regular' ? 'regular' : 'irregular'}`;
        if (formData.habitoIntestinal === 'constipado') {
            textoEvolucao += ` (constipado há ${formData.diasConstipacao || 'X'} dias).\n`;
        } else {
            textoEvolucao += `.\n`;
        }
        
        textoEvolucao += `Diurese ${formData.diurese === 'espontanea' ? 'espontânea presente' : 'em SVD'}`;
        if (formData.corDiurese) {
            textoEvolucao += ` (${formData.corDiurese}).\n`;
        } else {
            textoEvolucao += `.\n`;
        }
        
        textoEvolucao += `Refere consumo hídrico de ${formData.ingestaoHidrica || 'X'}mL/dia.\n`;
        textoEvolucao += `${formData.acompanhamentoNutricional ? 'Em acompanhamento nutricional.' : 'Primeira avaliação nutricional.'}\n`;
        textoEvolucao += `Diagnóstico de nutrição:\n[Preencher com diagnósticos específicos]`;
        
        textoEvolucao += `\n\nP:\nTIPO DE TN: [Preencher tipo de terapia nutricional]\n`;
        textoEvolucao += `Dieta: [Preencher tipo de dieta]\n`;
        textoEvolucao += `Suplemento: [Preencher se necessário]\n`;
        textoEvolucao += `Hidratação: [Preencher orientações hídricas]\n`;
        textoEvolucao += `VID: [Preencher se necessário]\n`;
        textoEvolucao += `Plano terapêutico: [Descrever plano nutricional detalhado]`;
    }
    
    document.getElementById('evolucaoTexto').value = textoEvolucao;
}


function calcularAvaliacao() {
    const formData = getFormData();
    
    // Obter métodos selecionados
    const metodoPeso = document.querySelector('input[name="metodoPeso"]:checked').value;
    const metodoAltura = document.querySelector('input[name="metodoAltura"]:checked').value;
    
    // Calcular peso e altura conforme métodos selecionados
    let peso, altura;
    
    switch(metodoPeso) {
        case 'atual': peso = formData.pesoAtual; break;
        case 'habitual': peso = formData.pesoHabitual; break;
        case 'estimado': peso = calcularPesoEstimado(formData); break;
        case 'ideal': peso = calcularPesoIdeal(formData); break;
    }
    
    switch(metodoAltura) {
        case 'medida': altura = formData.altura; break;
        case 'estimada': altura = calcularAlturaEstimada(formData); break;
    }
    
    // Restante dos cálculos
    const pesoAjustado = ajustarPeso(peso, formData);
    const imc = calcularIMC(peso, altura);
    const imcClassification = classificarIMC(imc, formData.idade);
    const cbClassification = classificarCB(formData.circBraco, formData.sexo);
    const cpClassification = classificarCP(formData.circPanturrilha, formData.sexo);
    const emapClassification = classificarEMAP(formData.emap, formData.sexo);
    const perdaPeso = calcularPerdaPeso(formData.pesoHabitual, peso);
    const perdaPesoClassification = classificarPerdaPeso(perdaPeso);
    const tmb = calcularTMB(formData, pesoAjustado, altura);
    const get = calcularGET(tmb, formData.fatorAtividade, formData.fatorTermico, formData.fatorInjuria);
    const macros = calcularMacronutrientes(get, formData.proteinaKg, pesoAjustado, formData.carboidratosPercent, formData.lipidiosPercent);
    
    // ✅ Correção: Usar LET em vez de CONST para permitir reatribuição
    let evolucaoAtual = document.getElementById('evolucaoTexto').value;
    let dadosCalculados = `\n\nDados calculados:\nPA: ${peso.toFixed(1)}kg (${metodoPeso === 'atual' ? 'Aferido' : metodoPeso === 'habitual' ? 'Referido' : metodoPeso.toUpperCase()})\n`;
    dadosCalculados += `ALTURA: ${(altura/100).toFixed(2)} m (${metodoAltura === 'medida' ? 'Aferida' : 'Estimada'})\n`;
    dadosCalculados += `IMC: ${imc.toFixed(1)} kg/m² (${imcClassification.classification})\n`;
    dadosCalculados += `GET: ${get.toFixed(0)} kcal/dia (${(get/pesoAjustado).toFixed(2)} kcal/kg)\n`;
    dadosCalculados += `NH: ${Math.round(pesoAjustado*35)} mL/dia (35 mL/kg)\n`;
    dadosCalculados += `NP: ${macros.proteina.gramas.toFixed(1)} g/dia (${formData.proteinaKg} g/kg - ${macros.proteina.percentual.toFixed(1)}% VET)\n`;
    dadosCalculados += `CB: ${formData.circBraco.toFixed(1)} cm (${cbClassification.classification})\n`;
    dadosCalculados += `CP: ${formData.circPanturrilha.toFixed(1)} cm (${cpClassification.classification})\n`;
    dadosCalculados += `MAP: ${formData.emap.toFixed(1)} mm (${emapClassification.classification})\n`;
    
    evolucaoAtual = evolucaoAtual + dadosCalculados;  // ✅ Agora funciona
    
    document.getElementById('evolucaoTexto').value = evolucaoAtual;
    
    // Mostrar resultados
    mostrarResultados(formData, {
        peso, altura, pesoAjustado,
        imc, imcClassification,
        cbClassification, cpClassification, emapClassification,
        perdaPeso, perdaPesoClassification,
        tmb, get, macros,
        evolucao: document.getElementById('evolucaoTexto').value,
        formatoEvolucao: formData.formatoEvolucao
    });
    
    document.getElementById('resultados').style.display = 'block';
}

// Obter dados do formulário
function getFormData() {
    // Helper function to safely get value
    const getValue = (id) => {
        const el = document.getElementById(id);
        return el ? el.value : null;
    };

    // Helper function to safely get checked radio
    const getCheckedRadio = (name) => {
        const radio = document.querySelector(`input[name="${name}"]:checked`);
        return radio ? radio.value : null;
    };

    return {
        nome: getValue('nome'),
        idade: parseInt(getValue('idade')) || 0,
        sexo: getValue('sexo'),
        raca: getValue('raca'),
        
        // Métodos de estimativa
        metodoPeso: getCheckedRadio('metodoPeso'),
        formulaPesoEstimado: getValue('formulaPesoEstimado'),
        metodoPesoIdeal: getValue('metodoPesoIdeal'),
        metodoAltura: getCheckedRadio('metodoAltura'),
        metodoAlturaEstimada: getValue('metodoAlturaEstimada'),
        
        // Medidas
        pesoAtual: parseFloat(getValue('pesoAtual')) || 0,
        pesoHabitual: parseFloat(getValue('pesoHabitual')) || 0,
        altura: parseFloat(getValue('altura')) || 0,
        alturaJoelho: parseFloat(getValue('alturaJoelho')) || 0,
        circBraco: parseFloat(getValue('circBraco')) || 0,
        circPanturrilha: parseFloat(getValue('circPanturrilha')) || 0,
        circPunho: parseFloat(getValue('circPunho')) || 0,
        emap: parseFloat(getValue('emap')) || 0,
        dobraTricipital: parseFloat(getValue('dobraTricipital')) || 0,
        
        // Condições especiais
        edema: document.getElementById('edema') ? document.getElementById('edema').checked : false,
        grauEdema: getValue('grauEdema'),
        ascite: document.getElementById('ascite') ? document.getElementById('ascite').checked : false,
        grauAscite: getValue('grauAscite'),
        amputacao: document.getElementById('amputacao') ? document.getElementById('amputacao').checked : false,
        tipoAmputacao: getValue('tipoAmputacao'),
        amputacaoBilateral: document.getElementById('amputacaoBilateral') ? document.getElementById('amputacaoBilateral').checked : false,
        
        // Fatores GET
        fatorAtividade: parseFloat(getValue('fatorAtividade')) || 1.2,
        fatorTermico: parseFloat(getValue('fatorTermico')) || 1.0,
        fatorInjuria: parseFloat(getValue('fatorInjuria')) || 1.0,
        formulaTMB: getValue('formulaTMB'),
        
        // Macronutrientes
        proteinaKg: parseFloat(getValue('proteinaKg')) || 0.8,
        carboidratosPercent: parseInt(getValue('carboidratosPercent')) || 50,
        lipidiosPercent: parseInt(getValue('lipidiosPercent')) || 30,
        
        // Evolução
        formatoEvolucao: getCheckedRadio('formatoEvolucao'),
        
        evolucaoTexto: getValue('evolucaoTexto')
    };
}

// Validar dados do formulário
function validateFormData(data) {
    if (!data.nome || !data.idade || !data.sexo || !data.raca) {
        alert('Por favor, preencha todos os dados básicos do paciente.');
        return false;
    }
    
    if (data.metodoPeso === 'atual' && data.pesoAtual <= 0) {
        alert('Por favor, informe o peso atual do paciente.');
        return false;
    }
    
    if (data.metodoPeso === 'habitual' && data.pesoHabitual <= 0) {
        alert('Por favor, informe o peso habitual do paciente.');
        return false;
    }
    
    if (data.metodoAltura === 'medida' && data.altura <= 0) {
        alert('Por favor, informe a altura do paciente.');
        return false;
    }
    
    if (data.metodoAltura === 'estimada' && data.alturaJoelho <= 0 && 
        (data.metodoAlturaEstimada === 'chumlea' || data.metodoAlturaEstimada === 'ulna')) {
        alert('Por favor, informe a altura do joelho para estimativa de altura.');
        return false;
    }
    
    return true;
}

// Calcular peso e altura com base nos métodos selecionados
function calcularPesoEAltura(data) {
    let peso = 0;
    let altura = 0;
    
    // Calcular peso conforme método selecionado
    switch(data.metodoPeso) {
        case 'atual':
            peso = data.pesoAtual;
            break;
        case 'habitual':
            peso = data.pesoHabitual;
            break;
        case 'estimado':
            peso = calcularPesoEstimado(data);
            break;
        case 'ideal':
            peso = calcularPesoIdeal(data);
            break;
    }
    
    // Calcular altura conforme método selecionado
    switch(data.metodoAltura) {
        case 'medida':
            altura = data.altura;
            break;
        case 'estimada':
            altura = calcularAlturaEstimada(data);
            break;
    }
    
    // Ajustar peso para condições especiais
    let pesoAjustado = ajustarPeso(peso, data);
    
    return { peso, altura, pesoAjustado };
}

// Calcular peso estimado conforme fórmula selecionada

function calcularPesoEstimado(formData) {
    const { alturaJoelho, circBraco, sexo, idade, raca } = formData;
    
    // Validar dados necessários
    if (!alturaJoelho || !circBraco || !sexo) return 0;
    
    // Converter raca para formato esperado
    const etnia = raca === 'branca' ? 'branco' : 'negro';
    const genero = sexo === 'masculino' ? 'homem' : 'mulher';
    
    // Adultos (18-60 anos)
    if (idade >= 18 && idade <= 60) {
        if (genero === 'homem') {
            if (etnia === 'negro') {
                return (alturaJoelho * 1.09) + (circBraco * 3.14) - 83.72;
            } else { // branco
                return (alturaJoelho * 1.19) + (circBraco * 3.21) - 86.82;
            }
        } else { // mulher
            if (etnia === 'negro') {
                return (alturaJoelho * 1.24) + (circBraco * 2.97) - 82.48;
            } else { // branco
                return (alturaJoelho * 1.01) + (circBraco * 2.81) - 66.04;
            }
        }
    }
    // Idosos (60+ anos)
    else if (idade > 60) {
        if (genero === 'homem') {
            return (alturaJoelho * 1.10) + (circBraco * 3.07) - 75.81;
        } else {
            return (alturaJoelho * 1.09) + (circBraco * 2.68) - 65.51;
        }
    }
    
    return 0; // para outras idades não especificadas
}




function calcularPesoIdeal(formData) {
    const { altura, sexo, circPunho, idade } = formData;
    
    // Validar altura
    if (!altura || altura <= 0) return 0;
    
    const alturaMetros = altura / 100;
    
    // 1. Método por IMC médio
    let imcMedio;
    if (idade >= 60) {
        imcMedio = 25; // para idosos
    } else {
        imcMedio = sexo === 'masculino' ? 22 : 20.8;
    }
    const pesoIdealBasico = Math.pow(alturaMetros, 2) * imcMedio;
    
    // 2. Se não tem circPunho, retorna o básico
    if (!circPunho || circPunho <= 0) return pesoIdealBasico;
    
    // 3. Método por compleição física usando a tabela de referência
    const alturaCm = altura;
    const complexao = determinarCompleicao(alturaCm, circPunho, sexo);
    
    // Encontrar o peso ideal na tabela de referência
    const tabela = referenceData.pesoIdealPorCompleicao[sexo][complexao];
    const item = tabela.find(item => item.altura >= alturaCm) || tabela[tabela.length - 1];
    
    return item ? item.peso : pesoIdealBasico;
}

// Função auxiliar para determinar compleição física
function determinarCompleicao(alturaCm, circPunho, sexo) {
    const r = alturaCm / circPunho;
    
    if (sexo === 'masculino') {
        if (r > 10.4) return 'pequena';
        if (r >= 9.6 && r <= 10.4) return 'media';
        return 'grande';
    } else {
        if (r > 11) return 'pequena';
        if (r >= 10.1 && r <= 11) return 'media';
        return 'grande';
    }
}


function calcularAlturaEstimada(formData) {
    const { alturaJoelho, sexo, idade } = formData;
    
    // Validar altura do joelho
    if (!alturaJoelho || alturaJoelho <= 0) return 0;
    
    // Fórmula de Chumlea para altura estimada
    if (sexo === 'masculino') {
        return 64.19 - (0.04 * idade) + (2.02 * alturaJoelho);
    } else {
        return 84.88 - (0.24 * idade) + (1.83 * alturaJoelho);
    }
}



function ajustarPeso(peso, formData) {
    let pesoAjustado = peso;
    
    // Ajuste para edema
    if (formData.edema) {
        pesoAjustado -= referenceData.edemaWeight[formData.grauEdema];
    }
    
    // Ajuste para ascite
    if (formData.ascite) {
        pesoAjustado -= referenceData.asciteWeight[formData.grauAscite];
    }
    
    // Ajuste para amputação
    if (formData.amputacao) {
        let percent = referenceData.amputacaoPercent[formData.tipoAmputacao];
        if (formData.amputacaoBilateral) percent *= 2;
        pesoAjustado = pesoAjustado * (1 - (percent / 100));
    }
    
    // Ajuste final para obesos ou desnutridos
    const imc = calcularIMC(pesoAjustado, formData.altura / 100);
    const imcClassification = classificarIMC(imc, formData.idade);
    
    // ✅ Verifica se a classificação existe antes de usar
    if (!imcClassification) {
        return pesoAjustado; // Retorna sem ajuste adicional
    }
    
    const pesoIdeal = calcularPesoIdeal(formData);
    
    if (imcClassification.classification.includes('Obesidade')) {
        pesoAjustado = pesoIdeal + (pesoAjustado - pesoIdeal) * 0.25;
    } else if (imcClassification.classification.includes('Magreza') || 
               imcClassification.classification.includes('Desnutrição')) {
        pesoAjustado = pesoAjustado + (pesoIdeal - pesoAjustado) * 0.25;
    }
    
    return pesoAjustado;
}

// Calcular IMC
function calcularIMC(peso, altura) {
    if (peso <= 0 || altura <= 0) return 0;
    const alturaMetros = altura / 100;
    return peso / (alturaMetros * alturaMetros);
}

// Classificar IMC conforme idade
function classificarIMC(imc, idade) {
    const classificacoes = idade >= 60 ? 
        referenceData.imcClassification.idoso : 
        referenceData.imcClassification.adulto;
    
    // Retorna a classificação encontrada ou um objeto padrão
    return classificacoes.find(c => imc >= c.min && imc < c.max) || {
        classification: "Fora da faixa padrão", 
        class: "classification-nao-classificado"
    };
}

// Classificar circunferência do braço
function classificarCB(cb, sexo) {
    if (cb <= 0) return { classification: "Não informado", class: "" };
    
    const classificacao = referenceData.cbClassification.find(c => cb >= c.min && cb < c.max);
    
    if (!classificacao) {
        return { classification: "Não classificado", class: "" };
    }
    
    return classificacao;
}

// Classificar circunferência da panturrilha
function classificarCP(cp, sexo) {
    if (cp <= 0) return { classification: "Não informado", class: "" };
    
    const referencia = referenceData.cpClassification[sexo];
    
    if (cp < referencia.grave) {
        return { classification: "Desnutrição Grave", class: "classification-desnutricao-grave" };
    } else if (cp < referencia.desnutricao) {
        return { classification: "Desnutrição", class: "classification-desnutricao" };
    } else {
        return { classification: "Normal", class: "classification-eutrofia" };
    }
}

// Classificar EMAP
function classificarEMAP(emap, sexo) {
    if (emap <= 0) return { classification: "Não informado", class: "" };
    
    const mediana = sexo === 'masculino' ? 12 : 10;
    const adequacao = (emap / mediana) * 100;
    
    return referenceData.emapClassification.find(c => adequacao >= c.min && adequacao < c.max) || 
           { classification: "Não classificado", class: "" };
}

// Calcular porcentagem de perda de peso
function calcularPerdaPeso(pesoHabitual, pesoAtual) {
    if (pesoHabitual <= 0 || pesoAtual <= 0) return 0;
    return ((pesoHabitual - pesoAtual) / pesoHabitual) * 100;
}

// Classificar perda de peso
function classificarPerdaPeso(percentual) {
    return referenceData.perdaPesoClassification.find(c => percentual >= c.min && percentual < c.max) || 
           { classification: "Não classificado", class: "" };
}

// Calcular Taxa Metabólica Basal (TMB)
function calcularTMB(data, peso, altura) {
    altura = altura / 100; // Converter para metros
    
    switch(data.formulaTMB) {
        case 'harris':
            // Harris-Benedict
            if (data.sexo === 'masculino') {
                return 66 + (13.7 * peso) + (5 * altura * 100) - (6.8 * data.idade);
            } else {
                return 655 + (9.6 * peso) + (1.8 * altura * 100) - (4.7 * data.idade);
            }
        case 'faopeso':
            // FAO/OMS apenas com peso
            if (data.idade >= 60) {
                if (data.sexo === 'masculino') {
                    return 13.5 * peso + 487;
                } else {
                    return 10.5 * peso + 596;
                }
            } else if (data.idade >= 30) {
                if (data.sexo === 'masculino') {
                    return 11.6 * peso + 879;
                } else {
                    return 8.7 * peso + 829;
                }
            } else {
                if (data.sexo === 'masculino') {
                    return 15.3 * peso + 679;
                } else {
                    return 14.7 * peso + 496;
                }
            }
        case 'faopesoaltura':
            // FAO/OMS com peso e altura
            if (data.idade >= 60) {
                if (data.sexo === 'masculino') {
                    return (8.8 * peso) + (1128 * altura) - 1071;
                } else {
                    return (9.2 * peso) + (637 * altura) - 302;
                }
            } else if (data.idade >= 30) {
                if (data.sexo === 'masculino') {
                    return (11.3 * peso) + (16 * altura * 100) + 901;
                } else {
                    return (8.7 * peso) - (25 * altura * 100) + 865;
                }
            } else {
                if (data.sexo === 'masculino') {
                    return (15.4 * peso) - (27 * altura * 100) + 717;
                } else {
                    return (13.3 * peso) + (334 * altura * 100) + 35;
                }
            }
        case 'dri':
            // DRI 2002
            if (data.sexo === 'masculino') {
                return 293 - (3.8 * data.idade) + (456.4 * altura) + (10.12 * peso);
            } else {
                return 247 - (2.47 * data.idade) + (401.5 * altura) + (8.6 * peso);
            }
        default:
            return 0;
    }
}

// Calcular Gasto Energético Total (GET)
function calcularGET(tmb, fatorAtividade, fatorTermico, fatorInjuria) {
    return tmb * fatorAtividade * fatorTermico * fatorInjuria;
}

// Calcular distribuição de macronutrientes
function calcularMacronutrientes(get, proteinaKg, peso, carboidratosPercent, lipidiosPercent) {
    // Proteína (1g de proteína = 4kcal)
    const proteinaG = proteinaKg * peso;
    const proteinaKcal = proteinaG * 4;
    const proteinaPercent = (proteinaKcal / get) * 100;
    
    // Carboidratos (1g de carboidrato = 4kcal)
    const carboidratosKcal = (carboidratosPercent / 100) * get;
    const carboidratosG = carboidratosKcal / 4;
    
    // Lipídios (1g de lipídio = 9kcal)
    const lipidiosKcal = (lipidiosPercent / 100) * get;
    const lipidiosG = lipidiosKcal / 9;
    
    // Verificar se a soma dos percentuais é 100%
    const somaPercent = proteinaPercent + carboidratosPercent + lipidiosPercent;
    const ajuste = somaPercent !== 100;
    
    return {
        proteina: { gramas: proteinaG, kcal: proteinaKcal, percentual: proteinaPercent },
        carboidratos: { gramas: carboidratosG, kcal: carboidratosKcal, percentual: carboidratosPercent },
        lipidios: { gramas: lipidiosG, kcal: lipidiosKcal, percentual: lipidiosPercent },
        ajusteNecessario: ajuste
    };
}

// Mostrar resultados na página
function mostrarResultados(formData, resultados) {
    // Dados do paciente
    document.getElementById('dadosPacienteResult').innerHTML = `
        <p><strong>Nome:</strong> ${formData.nome}</p>
        <p><strong>Idade:</strong> ${formData.idade} anos</p>
        <p><strong>Sexo:</strong> ${formData.sexo === 'masculino' ? 'Masculino' : 'Feminino'}</p>
        <p><strong>Raça:</strong> ${formData.raca === 'branca' ? 'Branca' : 'Negra'}</p>
    `;
    
    // Peso e altura
    document.getElementById('pesoAlturaResult').innerHTML = `
        <p><strong>Peso atual:</strong> ${resultados.peso.toFixed(1)} kg</p>
        <p><strong>Peso habitual:</strong> ${formData.pesoHabitual.toFixed(1)} kg</p>
        <p><strong>Peso ajustado:</strong> ${resultados.pesoAjustado.toFixed(1)} kg</p>
        <p><strong>Altura:</strong> ${resultados.altura.toFixed(1)} cm</p>
    `;
    
    // IMC
    document.getElementById('imcResult').innerHTML = `
        <p><strong>IMC:</strong> ${resultados.imc.toFixed(1)} kg/m²</p>
        <p><strong>Classificação:</strong> 
            <span class="${resultados.imcClassification.class}">${resultados.imcClassification.classification}</span>
        </p>
    `;
    
    // Circunferências
    document.getElementById('circunferenciasResult').innerHTML = `
        <p><strong>Circunferência do Braço:</strong> ${formData.circBraco.toFixed(1)} cm</p>
        <p><strong>Classificação:</strong> 
            <span class="${resultados.cbClassification.class}">${resultados.cbClassification.classification}</span>
        </p>
        <p><strong>Circunferência da Panturrilha:</strong> ${formData.circPanturrilha.toFixed(1)} cm</p>
        <p><strong>Classificação:</strong> 
            <span class="${resultados.cpClassification.class}">${resultados.cpClassification.classification}</span>
        </p>
        <p><strong>EMAP:</strong> ${formData.emap.toFixed(1)} mm</p>
        <p><strong>Classificação:</strong> 
            <span class="${resultados.emapClassification.class}">${resultados.emapClassification.classification}</span>
        </p>
    `;
    
    // Perda de peso
    document.getElementById('perdaPesoResult').innerHTML = `
        <p><strong>% Perda de peso:</strong> ${resultados.perdaPeso.toFixed(1)}%</p>
        <p><strong>Classificação:</strong> 
            <span class="${resultados.perdaPesoClassification.class}">${resultados.perdaPesoClassification.classification}</span>
        </p>
    `;
    
    // Necessidades energéticas
    document.getElementById('energeticasResult').innerHTML = `
        <p><strong>TMB:</strong> ${resultados.tmb.toFixed(0)} kcal/dia</p>
        <p><strong>GET:</strong> ${resultados.get.toFixed(0)} kcal/dia</p>
        <p><strong>Fator Atividade:</strong> ${formData.fatorAtividade}</p>
        <p><strong>Fator Térmico:</strong> ${formData.fatorTermico}</p>
        <p><strong>Fator Injúria:</strong> ${formData.fatorInjuria}</p>
    `;
    
    // Macronutrientes
    let ajusteMsg = '';
    if (resultados.macros.ajusteNecessario) {
        ajusteMsg = '<p class="warning">Atenção: A soma dos percentuais de macronutrientes não é 100%</p>';
    }
    
    document.getElementById('macronutrientesResult').innerHTML = `
        ${ajusteMsg}
        <p><strong>Proteína:</strong> 
            ${resultados.macros.proteina.gramas.toFixed(1)} g/dia 
            (${resultados.macros.proteina.kcal.toFixed(0)} kcal, ${resultados.macros.proteina.percentual.toFixed(1)}% VET)
        </p>
        <p><strong>Carboidratos:</strong> 
            ${resultados.macros.carboidratos.gramas.toFixed(1)} g/dia 
            (${resultados.macros.carboidratos.kcal.toFixed(0)} kcal, ${resultados.macros.carboidratos.percentual.toFixed(1)}% VET)
        </p>
        <p><strong>Lipídios:</strong> 
            ${resultados.macros.lipidios.gramas.toFixed(1)} g/dia 
            (${resultados.macros.lipidios.kcal.toFixed(0)} kcal, ${resultados.macros.lipidios.percentual.toFixed(1)}% VET)
        </p>
    `;
    
    // Evolução nutricional
    document.getElementById('evolucaoResult').innerHTML = `
        <p><strong>Formato:</strong> ${resultados.formatoEvolucao.toUpperCase()}</p>
        <div class="evolucao-texto">${resultados.evolucao.replace(/\n/g, '<br>')}</div>
    `;
}

// Gerar PDF com os resultados
function gerarPDF() {
    if (document.getElementById('resultados').style.display === 'none') {
        alert('Por favor, calcule a avaliação antes de gerar o PDF.');
        return;
    }
    
    const doc = new jsPDF();
    const margins = { top: 20, left: 15, right: 15, bottom: 20 };
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - margins.left - margins.right;
    
    // Cabeçalho
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Avaliação Nutricional Clínica', margins.left, margins.top);
    
    doc.setFontSize(12);
    doc.text(new Date().toLocaleDateString(), pageWidth - margins.right - 30, margins.top);
    
    // Linha divisória
    doc.setDrawColor(200, 200, 200);
    doc.line(margins.left, margins.top + 5, pageWidth - margins.right, margins.top + 5);
    
    let yPos = margins.top + 15;
    
    // Adicionar cada seção de resultados
    const sections = [
        { title: 'Dados do Paciente', id: 'dadosPacienteResult' },
        { title: 'Peso e Altura', id: 'pesoAlturaResult' },
        { title: 'Índice de Massa Corporal (IMC)', id: 'imcResult' },
        { title: 'Circunferências', id: 'circunferenciasResult' },
        { title: 'Perda de Peso', id: 'perdaPesoResult' },
        { title: 'Necessidades Energéticas', id: 'energeticasResult' },
        { title: 'Macronutrientes', id: 'macronutrientesResult' },
        { title: 'Evolução Nutricional', id: 'evolucaoResult' }
    ];
    
    sections.forEach(section => {
        const element = document.getElementById(section.id);
        const content = element.textContent.trim();
        
        if (content) {
            // Adicionar título da seção
            doc.setFontSize(14);
            doc.setTextColor(50, 100, 150);
            doc.text(section.title, margins.left, yPos);
            yPos += 8;
            
            // Adicionar conteúdo
            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            
            const lines = doc.splitTextToSize(content, contentWidth);
            doc.text(lines, margins.left, yPos);
            
            yPos += (lines.length * 5) + 10;
            
            // Verificar se precisa de nova página
            if (yPos > doc.internal.pageSize.getHeight() - margins.bottom) {
                doc.addPage();
                yPos = margins.top;
            }
        }
    });
    
    // Rodapé
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Sistema de Avaliação Nutricional Clínica - Gerado em ' + new Date().toLocaleString(), 
             margins.left, doc.internal.pageSize.getHeight() - 10);
    
    // Salvar PDF
    doc.save(`Avaliação Nutricional - ${document.getElementById('nome').value}.pdf`);
}