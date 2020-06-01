var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready( function(){

	$('#btn_iniciar').click( function(){ //botão para comecar o jogo
		
		//valida se foi digitado os apelidos dos jogadores
		if ($('#apelido_jogador1').val() == '')//val vai recuperar o valor
		{
			alert('Apelido de jogador 1 não foi preenchido');
			return false;
		}

		if ($('#apelido_jogador2').val() == '')
		{
			alert('Apelido de jogador 2 não foi preenchido');
			return false;
		}
		
		//exibir os apelidos embaixo das imagens
		$('#nome_jogador1').html($('#apelido_jogador1').val());//a função html, é uma função nativa do JQuery, ela funciona como o inner html
		$('#nome_jogador2').html($('#apelido_jogador2').val());

		//mostra e esconder a pag inicial e o palco do jogo
		$('#pagina_inicial').hide();
		$('#palco_jogo').show();
	});

	$('.jogada').click( function(){

		var id_campo_clicado = this.id; //o this para refernciar o id da posição clicada
		$('#'+id_campo_clicado).off();
		jogada(id_campo_clicado);
	});

	function jogada(id){
		var icone = '';
		var ponto = 0;

		if ((rodada % 2) == 1)
		{
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
		}
		else
		{
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
		}
		rodada++;

		$('#'+id).css('background-image', icone);

		var linha_coluna = id.split('-'); //o spit vai o pegar, a informacao que esta sendo separada por -
		/* ele vai pegar, por exemplo a posição b-1, vai separar o b em uma posição do array que será linha_coluna
		   e o 1 vai por em outra posição do array. 
		   Exemplo:
		   linha_coluna[0] = b;
		   linha_coluna[1] = 1;
		   agora eu consigo marcar na posição da matriz aonde foi marcado o ponto
		   Exemplo: 
		   matriz_jogo[b, 1] = ponto; na linha b coluna 1, vai receber o ponto, dependendo de quem jogou 1 ou -1.
		 */
		 matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		 verifica_combinação();
	}

	function verifica_combinação(){

		//verificando horizontalmente
		//linha a
		var pontos = 0;
		for (var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['a'][i];
		}
		ganhador(pontos);

		//linha b
		pontos = 0;
		for (var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['b'][i];
		}
		ganhador(pontos);

		//linha c
		pontos = 0;
		for (var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['c'][i];
		}
		ganhador(pontos);

		//verificando verticalmente
		pontos = 0;
		for (var l = 1; l <= 3; l++){
			pontos = 0;
			pontos += matriz_jogo['a'][l];
			pontos += matriz_jogo['b'][l];
			pontos += matriz_jogo['c'][l];

			ganhador(pontos);
		}

		//verificando na diagonal
		pontos = 0;
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];	
		ganhador(pontos);
	}

	function ganhador(pontos){
		if (pontos == -3){
			var jogador1 = $('#apelido_jogador1').val();
			alert(jogador1 + " é o vencedor");
			$('.jogada').off(); //desabilita a função click, para não receber mais valor
		}
		else if (pontos == 3){
			var jogador2 = $('#apelido_jogador2').val();
			alert(jogador2 + " é o vencedor");
			$('.jogada').off();
		}
	}
});