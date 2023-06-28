$(document).ready(function() {
// Máscara para o campo nome solicitante
    $('#nomeSolicitante').mask('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {
      translation: {
        'A': {pattern: /[A-Za-zÀ-ÿ ]/} // Define a máscara para aceitar letras maiúsculas, minúsculas e acentos
      }
    });

// Máscara para o campo de telefone
    $('#numeroTelefone').mask('(00) 00000-0000'); // Define a máscara para um número de telefone no formato (00) 00000-0000

// Exibir/ocultar campos de data e hora ao selecionar/desselecionar "Estádio Municipal" ou "Transporte"
    $('input[name="opcao"]').on('change', function() {
      if ($(this).val() === 'estadioMunicipal') {
        $('.date-input, .start-time-input, .end-time-input').show();
        $('.transporte-input').hide();
      } else if ($(this).val() === 'transporte') {
        $('.date-input, .start-time-input, .end-time-input').hide();
        $('.transporte-input').show();
      }
      
        $('.motivo-container').hide();
    });

// Exibir/ocultar botões de motivo ao preencher/limpar data e horários ou selecionar/desselecionar "Transporte"
    $('#dataDesejada, #horaInicial, #horaFinal, #local, #horaJogo, #horaSaida').on('change', function() {
      if ($('#dataDesejada').val() !== '' && $('#horaInicial').val() !== '' && $('#horaFinal').val() !== '' && $('input[name="opcao"]:checked').val() === 'estadioMunicipal') {
        $('.motivo-container').show();
      } else if ($('input[name="opcao"]:checked').val() === 'transporte' && $('#local').val() !== '' && $('#data').val() !== '' && $('#horaJogo').val() !== '' && $('#horaSaida').val() !== '') {
        $('.motivo-container').show();
      } else {
        $('.motivo-container').hide();
      } 
    });

// Passo 1: Coletar os dados preenchidos pelo usuário.
    $('#btnGerarOficio').click(function() {
      var dataAtual = moment().format('DD/MM/YYYY');  
      var nomeSolicitante = $('#nomeSolicitante').val();
      var numeroTelefone = $('#numeroTelefone').val();
      var nomeTime = $('#nomeTime').val();
      var opcao = $('input[name="opcao"]:checked').val();
      var dataDesejada = $('#dataDesejada').val();
      var horaInicial = $('#horaInicial').val();
      var horaFinal = $('#horaFinal').val();
      var local = $('#local').val();
      var data = $('#data').val();
      var horaJogo = $('#horaJogo').val();
      var horaSaida = $('#horaSaida').val();
      var motivo = $('input[name="motivo"]:checked').val();

      var docDefinition = {
        content: [
          { text: 'PREFEITURA MUNICIPAL DE ANDRELÂNDIA', fontSize: 20, bold: true,alignment: 'center', margin: [0, 0, 0, 2] },
          { text: 'ESTADO DE MINAS GERAIS', fontSize: 8, alignment: 'center' },
          { text: 'Avenida Nossa Senhora Do Porto Da Eterna Salvação Nº 208, Centro / CEP 37300-000 - Andrelândia - MG', fontSize: 8, alignment: 'center' },
          { text: 'Fone/Fax: (35) 3325-1177/1472', fontSize: 8, alignment: 'center' },
          { text: 'http://www.andrelandia.mg.gov.br \n\n\n', fontSize: 8, alignment: 'center' },
          { text: 'Andrelândia, ' + dataAtual, fontSize: 12, alignment: 'right' },
          { text: '\n\nOfício', fontSize: 12, alignment: 'left'},
          { text: '\n\n REF.: APOIO AO ESPORTE', fontSize: 12, alignment: 'left'},
          { text: '\n\n\n Solicito ###########################################################.',
            fontSize: 12,
            margin: [0, 0, 0, 10],
            width: 400, // Largura máxima do parágrafo
            alignment: 'justify' // Alinhamento do texto (opcional)
          },


          //{ text: 'Nome do Solicitante: ' + nomeSolicitante, fontSize: 12 },
          //{ text: 'Número de Telefone: ' + numeroTelefone, fontSize: 12 },
          //{ text: 'Nome do Time Solicitante: ' + nomeTime, fontSize: 12 },
          //{ text: 'Tipo de Solicitação: ' + opcao, fontSize: 12 },
          //{ 
            //text: 'Este é um texto com várias linhas que será ajustado para caber na página1. Este é um texto com várias linhas que será ajustado para caber na página.2 2Este é um texto com várias linhas que será ajustado para caber na página. 3Este é um texto com várias linhas que será ajustado para caber na página. 4Este é um texto com várias linhas que será ajustado para caber na página.',
            //fontSize: 12,
            //margin: [0, 0, 0, 10],
            //width: 400, // Largura máxima do parágrafo
            //alignment: 'justify' // Alinhamento do texto (opcional)
          //},
        ]
      };

// Gerando o arquivo PDF
      pdfMake.createPdf(docDefinition).download('oficio.pdf');
    });
});