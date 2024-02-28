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

    $('#btnGerarOficio').hide(); // Oculta o botão "Gerar Ofício"

    // Verifica se a opção selecionada é "Amistoso" ou "Campeonato"
    $('input[name="motivo"]').on('change', function() {
      if ($(this).val() === 'Amistoso' || $(this).val() === 'Campeonato') {
        $('#btnGerarOficio').show(); // Mostra o botão "Gerar Ofício"
      }
    });


// Exibir/ocultar botões de motivo ao preencher/limpar data e horários ou selecionar/desselecionar "Transporte"
    $('#dataDesejada, #horaInicial, #horaFinal, #localviagem, #horaJogo, #horaSaida').on('change', function() {
      if ($('#dataDesejada').val() !== '' && $('#horaInicial').val() !== '' && $('#horaFinal').val() !== '' && $('input[name="opcao"]:checked').val() === 'estadioMunicipal') {
        $('.motivo-container').show();
      } else if ($('input[name="opcao"]:checked').val() === 'transporte' && $('#localviagem').val() !== '' && $('#dataviagem').val() !== '' && $('#horaJogo').val() !== '' && $('#horaSaida').val() !== '') {
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
      var dataDesejada =  moment($('#dataDesejada').val()).format("DD/MM/YYYY");
      var horaInicial = $('#horaInicial').val();
      var horaFinal = $('#horaFinal').val();
      var localviagem = $('#localviagem').val();
      var dataviagem = moment($('#dataviagem').val()).format("DD/MM/YYYY");
      var horaJogo = $('#horaJogo').val();
      var horaSaida = $('#horaSaida').val();
      var motivo = $('input[name="motivo"]:checked').val();

// Verificar a opção selecionada
      if (opcao === 'estadioMunicipal') {
// Configurar docDefinition para Estádio Municipal
      var docDefinition = {
        content: [
          { text: 'PREFEITURA MUNICIPAL DE ANDRELÂNDIA', fontSize: 20, bold: true,alignment: 'center', margin: [0, 0, 0, 2] },
          { text: 'ESTADO DE MINAS GERAIS', fontSize: 8, alignment: 'center' },
          { text: 'Avenida Nossa Senhora Do Porto Da Eterna Salvação Nº 208, Centro / CEP 37300-000 - Andrelândia - MG', fontSize: 8, alignment: 'center' },
          { text: 'Fone/Fax: (35) 3325-1177/1472', fontSize: 8, alignment: 'center' },
          { text: 'http://www.andrelandia.mg.gov.br \n\n\n', fontSize: 8, alignment: 'center' },
          { text: 'Andrelândia, ' + dataAtual, fontSize: 12, alignment: 'right' },
          { text: '\n\nOfício', fontSize: 12, alignment: 'left'},
          { text: '\n\n REF.: Solicitação de espaço para atividades esportivas', fontSize: 12, alignment: 'left'},
          { text: '\n\n\nEscrevo em nome do time ' + nomeTime + ', a fim de solicitar gentilmente a disponibilização do estádio municipal para a prática esportiva regular.',
            fontSize: 12,
            margin: [0, 0, 0, 10],
            width: 400, // Largura máxima do parágrafo
            alignment: 'justify' // Alinhamento do texto (opcional)
          },
          { text: 'Data: ' + dataDesejada, fontSize: 12,bold: true, alignment: 'left'},
          { text: 'Horário de Início: ' + horaInicial, fontSize: 12,bold: true, alignment: 'left'},
          { text: 'Horário de Término: ' + horaFinal, fontSize: 12,bold: true, alignment: 'left'},
          { text: 'Motivo: ' + motivo, fontSize: 12,bold: true, alignment: 'left'},
          { text: '\nAcreditamos que a disponibilização de um espaço público designado para a prática de esportes trará inúmeros benefícios para nossa cidade, como promover a atividade física, melhorar a qualidade de vida dos moradores e criar um ambiente propício para o convívio social saudável.\n\nSendo assim, solicitamos que o órgão responsável considere nossa solicitação e, se possível, nos forneça o espaço público adequado para a prática esportiva regular.\n\nEstamos dispostos a colaborar e contribuir para a manutenção e conservação do local, bem como para a promoção de eventos e atividades esportivas que beneficiem a cidade.\n\nAgradecemos sinceramente sua atenção e aguardamos ansiosamente sua resposta positiva a essa solicitação.\n\nAtenciosamente,',
            fontSize: 12,
            margin: [0, 0, 0, 10],
            width: 400, // Largura máxima do parágrafo
            alignment: 'justify' // Alinhamento do texto (opcional)
          },
          { text: '\n\n' + nomeSolicitante + '\nTel: ' + numeroTelefone, fontSize: 12, alignment: 'center'},

        ]}
      } else if (opcao === 'transporte') {
      var docDefinition = {
        content: [
          { text: 'PREFEITURA MUNICIPAL DE ANDRELÂNDIA', fontSize: 20, bold: true,alignment: 'center', margin: [0, 0, 0, 2] },
          { text: 'ESTADO DE MINAS GERAIS', fontSize: 8, alignment: 'center' },
          { text: 'Avenida Nossa Senhora Do Porto Da Eterna Salvação Nº 208, Centro / CEP 37300-000 - Andrelândia - MG', fontSize: 8, alignment: 'center' },
          { text: 'Fone/Fax: (35) 3325-1177/1472', fontSize: 8, alignment: 'center' },
          { text: 'http://www.andrelandia.mg.gov.br \n\n\n', fontSize: 8, alignment: 'center' },
          { text: 'Andrelândia, ' + dataAtual, fontSize: 12, alignment: 'right' },
          { text: '\n\nOfício', fontSize: 12, alignment: 'left'},
          { text: '\n\n REF.: Solicitação de transporte para atividades esportivas', fontSize: 12, alignment: 'left'},
          { text: '\n\n\nEscrevo em nome do time ' + nomeTime + ', a fim de solicitar gentilmente a disponibilização de meio de transporte coletivo para auxílio na prática esportiva regular.',
          fontSize: 12,
          margin: [0, 0, 0, 10],
          width: 400, // Largura máxima do parágrafo
          alignment: 'justify' // Alinhamento do texto (opcional)
        },
        { text: 'Data: ' + dataviagem, fontSize: 12,bold: true, alignment: 'left'},
        { text: 'Horário da saída: ' + horaSaida, fontSize: 12,bold: true, alignment: 'left'},
        { text: 'Horário do jogo: ' + horaJogo, fontSize: 12,bold: true, alignment: 'left'},
        { text: 'Motivo: ' + motivo, fontSize: 12,bold: true, alignment: 'left'},
        { text: 'Local: ' + localviagem, fontSize: 12,bold: true, alignment: 'left'},
        { text: '\nAcreditamos que a disponibilização de recurso designado para a prática de esportes trará inúmeros benefícios para nossa cidade, como promover a atividade física, melhorar a qualidade de vida dos moradores e criar um ambiente propício para o convívio social saudável.\n\nSendo assim, solicitamos que o órgão responsável considere nossa solicitação e, se possível, nos forneça o transporte público adequado para a prática esportiva regular.\n\nEstamos dispostos a colaborar e contribuir para a manutenção e conservação do meio disponibilizado, bem como para a promoção de eventos e atividades esportivas que beneficiem a cidade.\n\nAgradecemos sinceramente sua atenção e aguardamos ansiosamente sua resposta positiva a essa solicitação.\n\nAtenciosamente,',
        fontSize: 12,
        margin: [0, 0, 0, 10],
        width: 400, // Largura máxima do parágrafo
        alignment: 'justify' // Alinhamento do texto (opcional)
      },
      { text: '\n\n' + nomeSolicitante + '\nTel: ' + numeroTelefone, fontSize: 12, alignment: 'center'},
        ]};
    }
// Gerando o arquivo PDF
    pdfMake.createPdf(docDefinition).download('oficio.pdf');
    
    });
});