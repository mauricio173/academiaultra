// Lista de meses e dias da semana para uso em formatação
const mesesDoAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const diasDaSemana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

// Estruturas para armazenar dados processados
let funcionarios = {};
let registrosDeFuncionarios = [];
let registrosComErro = [];
let totalMinutosTrabalhados = 0;
let totalMinutosIntervalo = 0;
let totalDiasTrabalhados = 0;

// Função principal para processar os registros de funcionários
function calculoFuncionario() {
	// Limpa as estruturas de dados
	funcionarios = {};
	registrosDeFuncionarios = [];
	registrosComErro = [];
totalDiasTrabalhados = 0;
totalMinutosTrabalhados = 0;
	totalMinutosIntervalo = 0;
	// Obtém o conteúdo da textarea
	const textarea = document.querySelector("#listasText").value.trim();
	const linhas = textarea.split("\n");

	// Processa cada linha do input
	linhas.forEach(linha => {
		const partes = linha.split("\t");
		// Se a linha estiver incompleta, registra como erro
		const dataRegex = partes[3].match(/\d{4}-\d{2}-\d{2}/);
		const horaRegex = partes[3].match(/\d{2}:\d{2}:\d{2}/);
// 		if (partes.length < 5 || partes !== "" || !dataRegex || !horaRegex) {
// console.log("partes erro",partes);
// 			registrosComErro.push(partes);
// 			 return;
// 		}
		if (partes.length < 5 ) {
console.log("partes erro",partes);
			registrosComErro.push(partes);
			 return;
		}

		// Extrai dados da linha
		const id = parseInt(partes[0].trim());
		const nome = partes[1].trim();
		const setor = partes[2].trim();
		const dataMatch = partes[3].match(/\d{4}-\d{2}-\d{2}/);
		const horaMatch = partes[3].match(/\d{2}:\d{2}:\d{2}/);
		const data = dataMatch ? dataMatch[0] : null;
		const hora = horaMatch ? horaMatch[0] : null;
		const maquina = parseInt(partes[4].trim());

		// Ignora se não tiver data
		if (!data) return;
		

		// Se o funcionário ainda não foi registrado, cria o objeto
		if (!funcionarios[nome]) {
			funcionarios[nome] = {
				id,
				nome,
				setor,
				dias: [],
				maquina
			};
			registrosDeFuncionarios.push(funcionarios[nome]);
		}

		// Adiciona o horário no dia correspondente
		if (data && hora) {
			let diaExistente = funcionarios[nome].dias.find(d => d.data === data);
			if (diaExistente) {
				if (!diaExistente.horarios.includes(hora)) {
					diaExistente.horarios.push(hora);
				}
			} else {
				funcionarios[nome].dias.push({ data, horarios: [hora] });
			
			}
			
		}
	});

	// Prompt para seleção do funcionário
	let promptUsuario = prompt(`SELECIONE O ID:\n${registrosDeFuncionarios.map((f, i) => `ID: ${f.id}  ${f.nome}`).join("\n")}`, 10);
	let p = prompt(`SELECIONE O ID:\n${registrosDeFuncionarios.map((f, i) => `${i}! ID: ${f.id}  ${f.nome}`).join("\n")}`, 10);
	
	let funIds = registrosDeFuncionarios.find(el => el.id == p);
let confirmar;
confirmar = registrosDeFuncionarios.forEach((item, index, array) => {
	const indice = array.indexOf(item);
	if (registrosDeFuncionarios[index].id == p) {
		
	promptUsuario = indice;
	p = indice;
	}
});
	
	if (!registrosDeFuncionarios[p]) return;

	const registrosPorDia = registrosDeFuncionarios[p].dias;
	const corpo = document.querySelector(".corpo");
	corpo.innerHTML = ``;
	const ulLi = document.createElement("ul");

	// Processa os dias de trabalho do funcionário selecionado
	registrosPorDia.forEach(item => {
		
		totalDiasTrabalhados = registrosPorDia.length;
		const li = document.createElement("li");
		
		const registrosPorHora = item.horarios;

		// Inicializa variáveis
		let entrada, saida, idaIntervalo, voltaIntervalo;
		let cargaHoraria, horasDeIntervalo, horasTrabalhadasNoDia;

		// Se houver 4 registros, considera como entrada, saída para almoço, volta, saída
		if (registrosPorHora.length === 4) {
			entrada = registrosPorHora[0];
			idaIntervalo = registrosPorHora[1];
			voltaIntervalo = registrosPorHora[2];
			saida = registrosPorHora[3];
			const minutosTrabalhados = diferencaEmMinutos(entrada, saida) - diferencaEmMinutos(idaIntervalo, voltaIntervalo);
			const minutosIntervalo = diferencaEmMinutos(idaIntervalo, voltaIntervalo);

			totalMinutosTrabalhados += minutosTrabalhados;
			totalMinutosIntervalo += minutosIntervalo;
		} else if (registrosPorHora.length === 2) {
			// Se houver 2 registros, considera como entrada e saída horas trabalhadas. Saída para almoço e volta recebem 00:00:00
			entrada = registrosPorHora[0];
			saida = registrosPorHora[1];

			idaIntervalo = "00:00:00";
			voltaIntervalo = "00:00:00";
			const minutosTrabalhados = diferencaEmMinutos(entrada, saida);
			totalMinutosTrabalhados += minutosTrabalhados;
		} else if (registrosPorHora.length === 3) {
			// Se houver 3 registros, considera como entrada e saída horas trabalhadas. Saída para almoço e volta recebem 00:00:00
			entrada = registrosPorHora[0];
			saida = registrosPorHora[registrosPorHora.length - 1];

			idaIntervalo = "00:00:00";
			voltaIntervalo = "00:00:00";
			const minutosTrabalhados = diferencaEmMinutos(entrada, saida);
			totalMinutosTrabalhados += minutosTrabalhados;
		}
		if (entrada && saida) {
			cargaHoraria = formatarHoras(diferencaEmMinutos(entrada, saida));
			horasDeIntervalo = formatarHoras(diferencaEmMinutos(idaIntervalo, voltaIntervalo));
			horasTrabalhadasNoDia = formatarHoras(diferencaEmMinutos(entrada, saida) - diferencaEmMinutos(idaIntervalo, voltaIntervalo));
      
			// Monta HTML para o dia
			const verDia = () => {
				return `
				<ul>
                    <li>Nome: ${registrosDeFuncionarios[p].nome}</li>
                    <li>Data: 
                    ${item.data
                    .split("-").reverse().join("/")} - ${diasDaSemana[new Date(item.data).getUTCDay()]}</li>
                    <li>Horário:
                        <br>
                        ${registrosPorHora
                        .map((h, i) => `${i + 1 === 1 ? "Entrada: " : i + 1 === 2 ? "Saída Intervalo: " : i + 1 === 3 ? "Entrada Intervalo: " : "Saída: "} ${h}`).join("<br>")}
                    </li>
                    <li>
                    
            Total Minutos Trabalhados no Mês:
           <br> ${formatarHoras(totalMinutosTrabalhados)}        <br>   
            Total Minutos Intervalo no Mês: 
           <br> ${formatarHoras(totalMinutosIntervalo)}           
               
                    </li>
                    <li>Horas Trabalhadas: ${horasTrabalhadasNoDia}</li>
                    <li>Horas de Intervalo: ${horasDeIntervalo}</li>
                    <li>Carga Horária: ${cargaHoraria}</li>
                </ul>
            
				`;
			};
			li.innerHTML = verDia();
		} else {
			li.innerHTML = `<li>Data: ${item.data}  — ${registrosPorHora} Horários incompletos</li>`;
		}
		// Exibir os totais no console (ou substituir por renderização HTML)

		li.classList.add("listaDiasTrabalhados");
		li.setAttribute("id", item.data);
		ulLi.appendChild(li);
	console.log("Total Dias Trabalhados length no mês:", registrosPorDia.length);
	});
	
	console.log("Total Dias Trabalhados no mês:", totalDiasTrabalhados);
	
	console.log("Total horas trabalhadas no mês:", formatarHoras(totalMinutosTrabalhados));
	
	console.log("Total de intervalo no mês:", formatarHoras(totalMinutosIntervalo));
	
	corpo.appendChild(ulLi);
}

// Converte hora1 e hora2 para diferença em minutos
function diferencaEmMinutos(hora1, hora2) {
	const [h1, m1, s1] = hora1.split(":").map(Number);
	const [h2, m2, s2] = hora2.split(":").map(Number);
	const t1 = new Date(0, 0, 0, h1, m1, s1);
	const t2 = new Date(0, 0, 0, h2, m2, s2);
	return (t2 - t1) / 60000;
}

// Converte minutos totais em string no formato HH:MM
function formatarHoras(totalMinutos) {
	const horas = Math.floor(totalMinutos / 60);
	const minutos = Math.floor(totalMinutos % 60);
	return `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
}

// Arredonda minutos se houver fração (não usada nesse exemplo final, mas útil se quiser adicionar precisão)
function arredondarHorario(horarioStr) {
	const [hora, resto] = horarioStr.split(":");
	if (!resto) return null;
	const [minutoStr, fracaoStr] = resto.split(".");
	if (!fracaoStr) return null;

	let minutosTotais = parseInt(minutoStr, 10) + parseFloat("0." + fracaoStr);
	minutosTotais = Math.round(minutosTotais);

	let novaHora = parseInt(hora, 10);
	if (minutosTotais >= 60) {
		novaHora += 1;
		minutosTotais = 0;
	}

	return `${novaHora.toString().padStart(2, "0")}:${minutosTotais.toString().padStart(2, "0")}`;
}

const input = document.getElementById("arquivoPDF");

input.addEventListener("change", async function () {
	const file = this.files[0];
	if (!file) return;

	const fileReader = new FileReader();

	fileReader.onload = async function () {
		const typedarray = new Uint8Array(this.result);

		const loadingTask = pdfjsLib.getDocument({ data: typedarray });
		const pdf = await loadingTask.promise;

		console.log(`PDF carregado com ${pdf.numPages} página(s).`);

		let registrosPdf = [];

		// Percorrendo as páginas do PDF
		for (let i = 1; i <= pdf.numPages; i++) {
			const page = await pdf.getPage(i);
			const textContent = await page.getTextContent();
			const texto = textContent.items.map(item => item.str).join(" ");

			// Regex para extrair os registros no formato correto
			const regex = /(\d+)\s+([a-zA-Z\u00C0-\u00FF ]+)\s+Not Set\d?\s+(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})\s+(\d+)/g;

			// Captura os registros e os formata com tabs e espaços
			const registros = [...texto.matchAll(regex)].map(r => {
				// Verificando se todos os grupos de captura estão presentes
				//console.log(r[0],"r");
				const id = r[1] ? r[1].trim() : "";
				const nome = r[2] ? r[2].trim() : "Not Set";
				const data = r[3] ? r[3].trim() : "";
				const horario = r[4] ? r[4].trim() : "";
				const maquina = r[5] ? r[5].trim() : "";

				// Formatando com tabs e espaços

				return `${id}\t${nome}\tNot Set1\t${data}    ${horario}\t${maquina}`;
				// return `${r[0]}`;
			});

			// Adiciona os registros da página atual ao array total
			registrosPdf = [...registrosPdf, ...registros];
		}

		// Exibindo os registros no textarea
		document.getElementById("listasText").value = registrosPdf.join("\n");
	};

	fileReader.readAsArrayBuffer(file);
});

const cinco = document.querySelector("#cinco ");
cinco.addEventListener("click", () => {
	const listasText = document.querySelector("#listasText");
	listasText.value = abrilUltra();
});

function abrilUltra() {
	return `ID	Nome	Depart.	Tempo	Número da máquina	
14	Rosangela Fagundes	Not Set1	 2025-04-01     06:06:14	1
21	brenda pierini	Not Set1	 2025-04-01     06:14:13	1
20	carolina peixoto	Not Set1	 2025-04-01     07:56:29	1
22	nilo	Not Set1	 2025-04-01     08:11:22	1
21	brenda pierini	Not Set1	 2025-04-01     09:37:40	1
10	mauricio	Not Set7	 2025-04-01     09:49:26	1
14	Rosangela Fagundes	Not Set1	 2025-04-01     10:02:54	1
21	brenda pierini	Not Set1	 2025-04-01     10:36:44	1
8	lurdes	Not Set1	 2025-04-01     11:00:07	1
14	Rosangela Fagundes	Not Set1	 2025-04-01     11:01:28	1
20	carolina peixoto	Not Set1	 2025-04-01     11:04:33	1
20	carolina peixoto	Not Set1	 2025-04-01     11:57:52	1
22	nilo	Not Set1	 2025-04-01     11:59:35	1
21	brenda pierini	Not Set1	 2025-04-01     13:02:55	1
22	nilo	Not Set1	 2025-04-01     13:04:23	1
10	mauricio	Not Set7	 2025-04-01     13:41:39	1
8	lurdes	Not Set1	 2025-04-01     13:41:48	1
23	yaritza bueno	Not Set1	 2025-04-01     13:49:34	1
14	Rosangela Fagundes	Not Set1	 2025-04-01     14:18:37	1
10	mauricio	Not Set7	 2025-04-01     14:20:13	1
17	lays	Not Set1	 2025-04-01     14:31:40	1
8	lurdes	Not Set1	 2025-04-01     14:42:07	1
22	nilo	Not Set1	 2025-04-01     15:59:12	1
17	lays	Not Set1	 2025-04-01     16:57:24	1
20	carolina peixoto	Not Set1	 2025-04-01     16:57:40	1
17	lays	Not Set1	 2025-04-01     17:30:10	1
23	yaritza bueno	Not Set1	 2025-04-01     19:51:08	1
8	lurdes	Not Set1	 2025-04-01     19:55:41	1
23	yaritza bueno	Not Set1	 2025-04-01     20:50:20	1
17	lays	Not Set1	 2025-04-01     22:59:23	1
10	mauricio	Not Set7	 2025-04-02     04:52:34	1
14	Rosangela Fagundes	Not Set1	 2025-04-02     06:13:56	1
22	nilo	Not Set1	 2025-04-02     08:05:42	1
20	carolina peixoto	Not Set1	 2025-04-02     08:08:25	1
14	Rosangela Fagundes	Not Set1	 2025-04-02     09:59:11	1
14	Rosangela Fagundes	Not Set1	 2025-04-02     10:43:32	1
10	mauricio	Not Set7	 2025-04-02     11:00:31	1
8	lurdes	Not Set1	 2025-04-02     11:15:00	1
22	nilo	Not Set1	 2025-04-02     11:55:26	1
10	mauricio	Not Set7	 2025-04-02     11:57:04	1
22	nilo	Not Set1	 2025-04-02     13:00:42	1
23	yaritza bueno	Not Set1	 2025-04-02     13:41:15	1
10	mauricio	Not Set7	 2025-04-02     13:50:37	1
20	carolina peixoto	Not Set1	 2025-04-02     14:00:16	1
22	nilo	Not Set1	 2025-04-02     14:14:44	1
14	Rosangela Fagundes	Not Set1	 2025-04-02     14:20:20	1
17	lays	Not Set1	 2025-04-02     14:38:17	1
20	carolina peixoto	Not Set1	 2025-04-02     15:01:25	1
17	lays	Not Set1	 2025-04-02     16:11:03	1
20	carolina peixoto	Not Set1	 2025-04-02     16:11:15	1
8	lurdes	Not Set1	 2025-04-02     16:51:17	1
17	lays	Not Set1	 2025-04-02     17:09:30	1
23	yaritza bueno	Not Set1	 2025-04-02     20:11:22	1
9	manuella meireles	Not Set1	 2025-04-02     20:17:16	1
23	yaritza bueno	Not Set1	 2025-04-02     21:08:18	1
23	yaritza bueno	Not Set1	 2025-04-02     22:00:58	1
17	lays	Not Set1	 2025-04-02     23:01:15	1
9	manuella meireles	Not Set1	 2025-04-03     04:54:03	1
14	Rosangela Fagundes	Not Set1	 2025-04-03     06:02:14	1
22	nilo	Not Set1	 2025-04-03     08:05:37	1
20	carolina peixoto	Not Set1	 2025-04-03     08:07:49	1
10	mauricio	Not Set7	 2025-04-03     09:52:25	1
14	Rosangela Fagundes	Not Set1	 2025-04-03     10:03:31	1
14	Rosangela Fagundes	Not Set1	 2025-04-03     11:03:12	1
8	lurdes	Not Set1	 2025-04-03     11:40:48	1
22	nilo	Not Set1	 2025-04-03     12:08:33	1
22	nilo	Not Set1	 2025-04-03     13:01:11	1
20	carolina peixoto	Not Set1	 2025-04-03     13:17:23	1
23	yaritza bueno	Not Set1	 2025-04-03     13:40:17	1
14	Rosangela Fagundes	Not Set1	 2025-04-03     14:21:02	1
20	carolina peixoto	Not Set1	 2025-04-03     14:25:10	1
10	mauricio	Not Set7	 2025-04-03     14:29:14	1
17	lays	Not Set1	 2025-04-03     14:35:44	1
10	mauricio	Not Set7	 2025-04-03     15:43:35	1
22	nilo	Not Set1	 2025-04-03     16:09:22	1
8	lurdes	Not Set1	 2025-04-03     16:21:11	1
17	lays	Not Set1	 2025-04-03     16:23:49	1
20	carolina peixoto	Not Set1	 2025-04-03     17:22:27	1
8	lurdes	Not Set1	 2025-04-03     17:23:17	1
17	lays	Not Set1	 2025-04-03     17:24:35	1
10	mauricio	Not Set7	 2025-04-03     18:34:02	1
8	lurdes	Not Set1	 2025-04-03     20:00:40	1
23	yaritza bueno	Not Set1	 2025-04-03     20:20:54	1
23	yaritza bueno	Not Set1	 2025-04-03     21:19:26	1
23	yaritza bueno	Not Set1	 2025-04-03     22:00:31	1
17	lays	Not Set1	 2025-04-03     22:59:05	1
21	brenda pierini	Not Set1	 2025-04-04     04:44:54	1
14	Rosangela Fagundes	Not Set1	 2025-04-04     06:01:47	1
22	nilo	Not Set1	 2025-04-04     08:09:14	1
20	carolina peixoto	Not Set1	 2025-04-04     08:17:28	1
21	brenda pierini	Not Set1	 2025-04-04     09:14:26	1
10	mauricio	Not Set7	 2025-04-04     09:26:50	1
14	Rosangela Fagundes	Not Set1	 2025-04-04     09:56:27	1
21	brenda pierini	Not Set1	 2025-04-04     09:59:47	1
14	Rosangela Fagundes	Not Set1	 2025-04-04     10:25:17	1
8	lurdes	Not Set1	 2025-04-04     11:40:44	1
22	nilo	Not Set1	 2025-04-04     11:59:39	1
21	brenda pierini	Not Set1	 2025-04-04     12:01:16	1
9	manuella meireles	Not Set1	 2025-04-04     12:40:19	1
22	nilo	Not Set1	 2025-04-04     12:58:34	1
21	brenda pierini	Not Set1	 2025-04-04     13:07:08	1
23	yaritza bueno	Not Set1	 2025-04-04     13:39:31	1
20	carolina peixoto	Not Set1	 2025-04-04     14:13:51	1
14	Rosangela Fagundes	Not Set1	 2025-04-04     14:23:37	1
17	lays	Not Set1	 2025-04-04     14:38:28	1
20	carolina peixoto	Not Set1	 2025-04-04     15:21:45	1
22	nilo	Not Set1	 2025-04-04     16:00:17	1
8	lurdes	Not Set1	 2025-04-04     16:28:46	1
17	lays	Not Set1	 2025-04-04     16:31:59	1
20	carolina peixoto	Not Set1	 2025-04-04     16:59:36	1
8	lurdes	Not Set1	 2025-04-04     17:22:31	1
17	lays	Not Set1	 2025-04-04     17:32:51	1
10	mauricio	Not Set7	 2025-04-04     19:12:38	1
23	yaritza bueno	Not Set1	 2025-04-04     19:39:22	1
8	lurdes	Not Set1	 2025-04-04     20:00:15	1
23	yaritza bueno	Not Set1	 2025-04-04     20:46:31	1
23	yaritza bueno	Not Set1	 2025-04-04     22:01:24	1
17	lays	Not Set1	 2025-04-04     23:01:35	1
23	yaritza bueno	Not Set1	 2025-04-05     07:44:11	1
22	nilo	Not Set1	 2025-04-05     07:59:56	1
14	Rosangela Fagundes	Not Set1	 2025-04-05     09:23:24	1
10	mauricio	Not Set7	 2025-04-05     09:55:14	1
14	Rosangela Fagundes	Not Set1	 2025-04-05     11:28:21	1
14	Rosangela Fagundes	Not Set1	 2025-04-05     12:08:01	1
22	nilo	Not Set1	 2025-04-05     12:25:44	1
23	yaritza bueno	Not Set1	 2025-04-05     12:27:25	1
22	nilo	Not Set1	 2025-04-05     13:27:35	1
23	yaritza bueno	Not Set1	 2025-04-05     13:30:25	1
22	nilo	Not Set1	 2025-04-05     15:00:36	1
23	yaritza bueno	Not Set1	 2025-04-05     15:41:52	1
14	Rosangela Fagundes	Not Set1	 2025-04-05     17:02:17	1
10	mauricio	Not Set7	 2025-04-05     17:12:02	1
21	brenda pierini	Not Set1	 2025-04-07     04:46:16	1
14	Rosangela Fagundes	Not Set1	 2025-04-07     05:57:16	1
22	nilo	Not Set1	 2025-04-07     08:04:01	1
10	mauricio	Not Set7	 2025-04-07     08:16:36	1
20	carolina peixoto	Not Set1	 2025-04-07     08:48:53	1
21	brenda pierini	Not Set1	 2025-04-07     09:05:18	1
21	brenda pierini	Not Set1	 2025-04-07     10:04:31	1
14	Rosangela Fagundes	Not Set1	 2025-04-07     10:09:58	1
20	carolina peixoto	Not Set1	 2025-04-07     10:22:38	1
8	lurdes	Not Set1	 2025-04-07     11:08:02	1
14	Rosangela Fagundes	Not Set1	 2025-04-07     11:17:18	1
20	carolina peixoto	Not Set1	 2025-04-07     11:34:39	1
22	nilo	Not Set1	 2025-04-07     12:02:20	1
21	brenda pierini	Not Set1	 2025-04-07     13:10:10	1
22	nilo	Not Set1	 2025-04-07     13:11:59	1
23	yaritza bueno	Not Set1	 2025-04-07     13:39:00	1
17	lays	Not Set1	 2025-04-07     14:26:32	1
14	Rosangela Fagundes	Not Set1	 2025-04-07     14:32:41	1
22	nilo	Not Set1	 2025-04-07     16:03:01	1
10	mauricio	Not Set7	 2025-04-07     16:21:35	1
20	carolina peixoto	Not Set1	 2025-04-07     16:41:17	1
17	lays	Not Set1	 2025-04-07     16:41:19	1
8	lurdes	Not Set1	 2025-04-07     17:08:00	1
17	lays	Not Set1	 2025-04-07     17:40:39	1
8	lurdes	Not Set1	 2025-04-07     17:52:16	1
23	yaritza bueno	Not Set1	 2025-04-07     20:12:21	1
9	manuella meireles	Not Set1	 2025-04-07     20:31:15	1
23	yaritza bueno	Not Set1	 2025-04-07     21:14:36	1
8	lurdes	Not Set1	 2025-04-07     22:00:04	1
23	yaritza bueno	Not Set1	 2025-04-07     22:01:09	1
17	lays	Not Set1	 2025-04-07     23:02:07	1
21	brenda pierini	Not Set1	 2025-04-08     04:56:53	1
14	Rosangela Fagundes	Not Set1	 2025-04-08     06:01:25	1
20	carolina peixoto	Not Set1	 2025-04-08     08:19:29	1
21	brenda pierini	Not Set1	 2025-04-08     09:26:21	1
14	Rosangela Fagundes	Not Set1	 2025-04-08     09:57:12	1
21	brenda pierini	Not Set1	 2025-04-08     10:13:55	1
10	mauricio	Not Set7	 2025-04-08     10:27:37	1
20	carolina peixoto	Not Set1	 2025-04-08     10:42:33	1
14	Rosangela Fagundes	Not Set1	 2025-04-08     11:01:31	1
8	lurdes	Not Set1	 2025-04-08     11:41:05	1
20	carolina peixoto	Not Set1	 2025-04-08     11:43:45	1
21	brenda pierini	Not Set1	 2025-04-08     13:05:31	1
23	yaritza bueno	Not Set1	 2025-04-08     13:40:09	1
14	Rosangela Fagundes	Not Set1	 2025-04-08     14:20:10	1
10	mauricio	Not Set7	 2025-04-08     14:23:09	1
17	lays	Not Set1	 2025-04-08     14:30:52	1
10	mauricio	Not Set7	 2025-04-08     15:20:43	1
20	carolina peixoto	Not Set1	 2025-04-08     16:31:12	1
17	lays	Not Set1	 2025-04-08     16:31:17	1
8	lurdes	Not Set1	 2025-04-08     17:26:10	1
17	lays	Not Set1	 2025-04-08     17:31:12	1
8	lurdes	Not Set1	 2025-04-08     18:23:29	1
10	mauricio	Not Set7	 2025-04-08     18:31:09	1
8	lurdes	Not Set1	 2025-04-08     20:03:38	1
23	yaritza bueno	Not Set1	 2025-04-08     20:17:22	1
23	yaritza bueno	Not Set1	 2025-04-08     21:18:14	1
23	yaritza bueno	Not Set1	 2025-04-08     22:01:54	1
17	lays	Not Set1	 2025-04-08     22:59:11	1
21	brenda pierini	Not Set1	 2025-04-09     04:52:22	1
14	Rosangela Fagundes	Not Set1	 2025-04-09     05:59:39	1
20	carolina peixoto	Not Set1	 2025-04-09     08:27:17	1
21	brenda pierini	Not Set1	 2025-04-09     09:59:40	1
14	Rosangela Fagundes	Not Set1	 2025-04-09     10:23:33	1
10	mauricio	Not Set7	 2025-04-09     10:26:12	1
14	Rosangela Fagundes	Not Set1	 2025-04-09     11:22:09	1
8	lurdes	Not Set1	 2025-04-09     11:49:55	1
20	carolina peixoto	Not Set1	 2025-04-09     12:30:02	1
20	carolina peixoto	Not Set1	 2025-04-09     13:26:18	1
23	yaritza bueno	Not Set1	 2025-04-09     14:12:56	1
17	lays	Not Set1	 2025-04-09     14:36:56	1
20	carolina peixoto	Not Set1	 2025-04-09     16:38:54	1
17	lays	Not Set1	 2025-04-09     16:39:00	1
10	mauricio	Not Set7	 2025-04-09     17:00:02	1
8	lurdes	Not Set1	 2025-04-09     17:00:06	1
10	mauricio	Not Set7	 2025-04-09     17:25:12	1
17	lays	Not Set1	 2025-04-09     17:35:37	1
8	lurdes	Not Set1	 2025-04-09     18:00:08	1
10	mauricio	Not Set7	 2025-04-09     19:02:06	1
8	lurdes	Not Set1	 2025-04-09     20:04:06	1
23	yaritza bueno	Not Set1	 2025-04-09     20:27:04	1
23	yaritza bueno	Not Set1	 2025-04-09     21:22:52	1
23	yaritza bueno	Not Set1	 2025-04-09     22:01:26	1
17	lays	Not Set1	 2025-04-09     22:58:55	1
21	brenda pierini	Not Set1	 2025-04-10     04:54:19	1
14	Rosangela Fagundes	Not Set1	 2025-04-10     06:06:27	1
20	carolina peixoto	Not Set1	 2025-04-10     08:13:56	1
22	nilo	Not Set1	 2025-04-10     08:20:07	1
10	mauricio	Not Set7	 2025-04-10     10:15:05	1
14	Rosangela Fagundes	Not Set1	 2025-04-10     10:18:22	1
21	brenda pierini	Not Set1	 2025-04-10     10:25:44	1
8	lurdes	Not Set1	 2025-04-10     11:04:27	1
14	Rosangela Fagundes	Not Set1	 2025-04-10     11:10:54	1
21	brenda pierini	Not Set1	 2025-04-10     11:30:01	1
22	nilo	Not Set1	 2025-04-10     12:02:19	1
21	brenda pierini	Not Set1	 2025-04-10     13:04:35	1
22	nilo	Not Set1	 2025-04-10     13:05:02	1
23	yaritza bueno	Not Set1	 2025-04-10     13:44:24	1
20	carolina peixoto	Not Set1	 2025-04-10     13:58:52	1
14	Rosangela Fagundes	Not Set1	 2025-04-10     14:20:22	1
17	lays	Not Set1	 2025-04-10     14:36:26	1
20	carolina peixoto	Not Set1	 2025-04-10     15:33:33	1
22	nilo	Not Set1	 2025-04-10     16:11:57	1
20	carolina peixoto	Not Set1	 2025-04-10     16:41:55	1
17	lays	Not Set1	 2025-04-10     16:42:01	1
8	lurdes	Not Set1	 2025-04-10     16:55:00	1
10	mauricio	Not Set7	 2025-04-10     17:13:09	1
17	lays	Not Set1	 2025-04-10     17:43:19	1
10	mauricio	Not Set7	 2025-04-10     17:43:47	1
8	lurdes	Not Set1	 2025-04-10     17:53:40	1
10	mauricio	Not Set7	 2025-04-10     18:32:31	1
23	yaritza bueno	Not Set1	 2025-04-10     19:57:33	1
8	lurdes	Not Set1	 2025-04-10     20:01:04	1
23	yaritza bueno	Not Set1	 2025-04-10     20:50:01	1
23	yaritza bueno	Not Set1	 2025-04-10     22:00:09	1
17	lays	Not Set1	 2025-04-10     23:01:56	1
21	brenda pierini	Not Set1	 2025-04-11     04:49:51	1
14	Rosangela Fagundes	Not Set1	 2025-04-11     05:59:56	1
22	nilo	Not Set1	 2025-04-11     08:05:42	1
20	carolina peixoto	Not Set1	 2025-04-11     08:29:11	1
14	Rosangela Fagundes	Not Set1	 2025-04-11     10:04:25	1
10	mauricio	Not Set7	 2025-04-11     10:45:01	1
14	Rosangela Fagundes	Not Set1	 2025-04-11     11:05:37	1
21	brenda pierini	Not Set1	 2025-04-11     11:08:09	1
22	nilo	Not Set1	 2025-04-11     12:01:02	1
21	brenda pierini	Not Set1	 2025-04-11     12:09:44	1
20	carolina peixoto	Not Set1	 2025-04-11     12:24:03	1
22	nilo	Not Set1	 2025-04-11     13:03:14	1
21	brenda pierini	Not Set1	 2025-04-11     13:16:43	1
8	lurdes	Not Set1	 2025-04-11     13:17:08	1
23	yaritza bueno	Not Set1	 2025-04-11     13:32:01	1
17	lays	Not Set1	 2025-04-11     14:30:56	1
17	lays	Not Set1	 2025-04-11     17:00:46	1
20	carolina peixoto	Not Set1	 2025-04-11     17:00:51	1
8	lurdes	Not Set1	 2025-04-11     17:26:02	1
10	mauricio	Not Set7	 2025-04-11     17:26:18	1
10	mauricio	Not Set7	 2025-04-11     17:58:02	1
17	lays	Not Set1	 2025-04-11     18:00:05	1
22	nilo	Not Set1	 2025-04-11     18:04:29	1
8	lurdes	Not Set1	 2025-04-11     18:27:08	1
8	lurdes	Not Set1	 2025-04-11     19:46:15	1
10	mauricio	Not Set7	 2025-04-11     20:23:56	1
23	yaritza bueno	Not Set1	 2025-04-11     20:24:46	1
23	yaritza bueno	Not Set1	 2025-04-11     21:34:55	1
23	yaritza bueno	Not Set1	 2025-04-11     22:00:16	1
17	lays	Not Set1	 2025-04-11     23:00:26	1
8	lurdes	Not Set1	 2025-04-12     07:07:02	1
22	nilo	Not Set1	 2025-04-12     07:07:43	1
21	brenda pierini	Not Set1	 2025-04-12     07:41:47	1
17	lays	Not Set1	 2025-04-12     07:48:54	1
23	yaritza bueno	Not Set1	 2025-04-12     07:55:32	1
20	carolina peixoto	Not Set1	 2025-04-12     10:52:19	1
21	brenda pierini	Not Set1	 2025-04-12     12:00:25	1
23	yaritza bueno	Not Set1	 2025-04-12     13:52:53	1
17	lays	Not Set1	 2025-04-12     14:00:09	1
20	carolina peixoto	Not Set1	 2025-04-12     14:04:05	1
8	lurdes	Not Set1	 2025-04-12     14:26:34	1
17	lays	Not Set1	 2025-04-12     15:00:41	1
23	yaritza bueno	Not Set1	 2025-04-12     15:04:51	1
8	lurdes	Not Set1	 2025-04-12     15:27:43	1
20	carolina peixoto	Not Set1	 2025-04-12     15:31:59	1
22	nilo	Not Set1	 2025-04-12     15:40:10	1
21	brenda pierini	Not Set1	 2025-04-12     15:44:40	1
8	lurdes	Not Set1	 2025-04-12     15:44:51	1
23	yaritza bueno	Not Set1	 2025-04-12     16:19:52	1
17	lays	Not Set1	 2025-04-12     17:03:19	1
20	carolina peixoto	Not Set1	 2025-04-12     17:03:26	1
17	lays	Not Set1	 2025-04-13     07:54:49	1
14	Rosangela Fagundes	Not Set1	 2025-04-13     10:02:26	1
14	Rosangela Fagundes	Not Set1	 2025-04-13     11:44:00	1
17	lays	Not Set1	 2025-04-13     14:02:13	1
21	brenda pierini	Not Set1	 2025-04-14     04:55:06	1
14	Rosangela Fagundes	Not Set1	 2025-04-14     06:04:24	1
20	carolina peixoto	Not Set1	 2025-04-14     07:43:12	1
22	nilo	Not Set1	 2025-04-14     08:30:16	1
10	mauricio	Not Set7	 2025-04-14     10:09:34	1
14	Rosangela Fagundes	Not Set1	 2025-04-14     10:12:25	1
14	Rosangela Fagundes	Not Set1	 2025-04-14     10:58:00	1
21	brenda pierini	Not Set1	 2025-04-14     11:09:42	1
8	lurdes	Not Set1	 2025-04-14     11:39:46	1
22	nilo	Not Set1	 2025-04-14     11:50:07	1
9	manuella meireles	Not Set1	 2025-04-14     11:59:04	1
21	brenda pierini	Not Set1	 2025-04-14     12:06:50	1
20	carolina peixoto	Not Set1	 2025-04-14     12:12:00	1
22	nilo	Not Set1	 2025-04-14     12:54:31	1
20	carolina peixoto	Not Set1	 2025-04-14     13:06:26	1
21	brenda pierini	Not Set1	 2025-04-14     13:09:59	1
23	yaritza bueno	Not Set1	 2025-04-14     13:37:06	1
17	lays	Not Set1	 2025-04-14     14:26:58	1
22	nilo	Not Set1	 2025-04-14     16:10:25	1
20	carolina peixoto	Not Set1	 2025-04-14     16:29:18	1
23	yaritza bueno	Not Set1	 2025-04-14     16:33:54	1
10	mauricio	Not Set7	 2025-04-14     17:19:03	1
23	yaritza bueno	Not Set1	 2025-04-14     17:27:58	1
8	lurdes	Not Set1	 2025-04-14     17:28:11	1
8	lurdes	Not Set1	 2025-04-14     18:42:11	1
17	lays	Not Set1	 2025-04-14     20:16:29	1
8	lurdes	Not Set1	 2025-04-14     20:34:57	1
17	lays	Not Set1	 2025-04-14     21:14:05	1
23	yaritza bueno	Not Set1	 2025-04-14     22:09:25	1
17	lays	Not Set1	 2025-04-14     23:00:16	1
21	brenda pierini	Not Set1	 2025-04-15     05:54:37	1
14	Rosangela Fagundes	Not Set1	 2025-04-15     06:01:09	1
22	nilo	Not Set1	 2025-04-15     07:55:35	1
20	carolina peixoto	Not Set1	 2025-04-15     08:10:22	1
21	brenda pierini	Not Set1	 2025-04-15     08:18:17	1
21	brenda pierini	Not Set1	 2025-04-15     09:08:13	1
14	Rosangela Fagundes	Not Set1	 2025-04-15     10:02:08	1
20	carolina peixoto	Not Set1	 2025-04-15     10:37:28	1
14	Rosangela Fagundes	Not Set1	 2025-04-15     10:47:11	1
20	carolina peixoto	Not Set1	 2025-04-15     11:35:04	1
22	nilo	Not Set1	 2025-04-15     11:52:44	1
22	nilo	Not Set1	 2025-04-15     12:52:43	1
21	brenda pierini	Not Set1	 2025-04-15     13:05:04	1
8	lurdes	Not Set1	 2025-04-15     13:34:10	1
14	Rosangela Fagundes	Not Set1	 2025-04-15     14:24:06	1
23	yaritza bueno	Not Set1	 2025-04-15     14:33:04	1
23	yaritza bueno	Not Set1	 2025-04-15     16:03:46	1
22	nilo	Not Set1	 2025-04-15     16:08:03	1
23	yaritza bueno	Not Set1	 2025-04-15     17:04:42	1
20	carolina peixoto	Not Set1	 2025-04-15     17:16:36	1
8	lurdes	Not Set1	 2025-04-15     18:01:25	1
8	lurdes	Not Set1	 2025-04-15     18:58:59	1
8	lurdes	Not Set1	 2025-04-15     21:49:17	1
21	brenda pierini	Not Set1	 2025-04-16     04:54:50	1
14	Rosangela Fagundes	Not Set1	 2025-04-16     06:00:01	1
22	nilo	Not Set1	 2025-04-16     08:10:09	1
20	carolina peixoto	Not Set1	 2025-04-16     08:20:05	1
14	Rosangela Fagundes	Not Set1	 2025-04-16     10:27:01	1
10	mauricio	Not Set7	 2025-04-16     10:29:57	1
14	Rosangela Fagundes	Not Set1	 2025-04-16     11:04:51	1
21	brenda pierini	Not Set1	 2025-04-16     11:08:52	1
22	nilo	Not Set1	 2025-04-16     11:58:08	1
21	brenda pierini	Not Set1	 2025-04-16     12:21:34	1
8	lurdes	Not Set1	 2025-04-16     13:02:10	1
22	nilo	Not Set1	 2025-04-16     13:02:53	1
21	brenda pierini	Not Set1	 2025-04-16     13:05:03	1
14	Rosangela Fagundes	Not Set1	 2025-04-16     14:21:05	1
20	carolina peixoto	Not Set1	 2025-04-16     14:22:34	1
23	yaritza bueno	Not Set1	 2025-04-16     14:35:42	1
20	carolina peixoto	Not Set1	 2025-04-16     15:44:53	1
22	nilo	Not Set1	 2025-04-16     16:23:02	1
10	mauricio	Not Set7	 2025-04-16     16:48:11	1
8	lurdes	Not Set1	 2025-04-16     16:48:16	1
20	carolina peixoto	Not Set1	 2025-04-16     16:49:55	1
10	mauricio	Not Set7	 2025-04-16     17:15:32	1
8	lurdes	Not Set1	 2025-04-16     17:46:42	1
23	yaritza bueno	Not Set1	 2025-04-16     19:05:54	1
23	yaritza bueno	Not Set1	 2025-04-16     20:08:11	1
8	lurdes	Not Set1	 2025-04-16     21:06:42	1
10	mauricio	Not Set7	 2025-04-16     21:38:37	1
21	brenda pierini	Not Set1	 2025-04-17     04:51:21	1
14	Rosangela Fagundes	Not Set1	 2025-04-17     05:59:33	1
22	nilo	Not Set1	 2025-04-17     08:15:40	1
20	carolina peixoto	Not Set1	 2025-04-17     08:35:00	1
21	brenda pierini	Not Set1	 2025-04-17     09:06:27	1
21	brenda pierini	Not Set1	 2025-04-17     09:41:01	1
14	Rosangela Fagundes	Not Set1	 2025-04-17     10:05:36	1
10	mauricio	Not Set7	 2025-04-17     10:28:04	1
14	Rosangela Fagundes	Not Set1	 2025-04-17     11:03:12	1
20	carolina peixoto	Not Set1	 2025-04-17     11:06:55	1
22	nilo	Not Set1	 2025-04-17     11:57:22	1
20	carolina peixoto	Not Set1	 2025-04-17     12:08:47	1
22	nilo	Not Set1	 2025-04-17     12:59:01	1
8	lurdes	Not Set1	 2025-04-17     12:59:27	1
21	brenda pierini	Not Set1	 2025-04-17     13:07:22	1
14	Rosangela Fagundes	Not Set1	 2025-04-17     14:23:57	1
23	yaritza bueno	Not Set1	 2025-04-17     14:40:23	1
22	nilo	Not Set1	 2025-04-17     16:06:53	1
20	carolina peixoto	Not Set1	 2025-04-17     16:54:37	1
8	lurdes	Not Set1	 2025-04-17     18:33:40	1
23	yaritza bueno	Not Set1	 2025-04-17     18:48:50	1
23	yaritza bueno	Not Set1	 2025-04-17     19:41:28	1
8	lurdes	Not Set1	 2025-04-17     19:45:51	1
10	mauricio	Not Set7	 2025-04-17     20:07:38	1
8	lurdes	Not Set1	 2025-04-17     21:06:19	1
23	yaritza bueno	Not Set1	 2025-04-18     07:39:49	1
8	lurdes	Not Set1	 2025-04-18     08:26:15	1
23	yaritza bueno	Not Set1	 2025-04-18     14:00:26	1
8	lurdes	Not Set1	 2025-04-18     14:01:39	1
21	brenda pierini	Not Set1	 2025-04-19     07:35:09	1
10	mauricio	Not Set7	 2025-04-19     09:51:55	1
8	lurdes	Not Set1	 2025-04-19     11:04:28	1
21	brenda pierini	Not Set1	 2025-04-19     12:49:36	1
21	brenda pierini	Not Set1	 2025-04-19     13:50:48	1
10	mauricio	Not Set7	 2025-04-19     13:51:52	1
8	lurdes	Not Set1	 2025-04-19     13:52:30	1
10	mauricio	Not Set7	 2025-04-19     14:41:04	1
8	lurdes	Not Set1	 2025-04-19     14:53:27	1
8	lurdes	Not Set1	 2025-04-19     17:00:30	1
10	mauricio	Not Set7	 2025-04-19     17:02:42	1
10	mauricio	Not Set7	 2025-04-20     07:56:05	1
22	nilo	Not Set1	 2025-04-20     08:10:53	1
10	mauricio	Not Set7	 2025-04-20     13:49:33	1
22	nilo	Not Set1	 2025-04-20     13:50:23	1
9	manuella meireles	Not Set1	 2025-04-21     07:53:20	1
8	lurdes	Not Set1	 2025-04-21     08:21:39	1
8	lurdes	Not Set1	 2025-04-21     14:01:51	1
14	Rosangela Fagundes	Not Set1	 2025-04-22     05:59:50	1
22	nilo	Not Set1	 2025-04-22     08:18:11	1
20	carolina peixoto	Not Set1	 2025-04-22     08:25:39	1
14	Rosangela Fagundes	Not Set1	 2025-04-22     10:00:17	1
22	nilo	Not Set1	 2025-04-22     12:00:32	1
8	lurdes	Not Set1	 2025-04-22     13:01:13	1
22	nilo	Not Set1	 2025-04-22     13:06:19	1
10	mauricio	Not Set7	 2025-04-22     13:17:29	1
23	yaritza bueno	Not Set1	 2025-04-22     13:38:51	1
17	lays	Not Set1	 2025-04-22     14:10:37	1
14	Rosangela Fagundes	Not Set1	 2025-04-22     14:19:25	1
20	carolina peixoto	Not Set1	 2025-04-22     15:15:02	1
22	nilo	Not Set1	 2025-04-22     16:04:12	1
20	carolina peixoto	Not Set1	 2025-04-22     16:23:19	1
8	lurdes	Not Set1	 2025-04-22     16:25:44	1
20	carolina peixoto	Not Set1	 2025-04-22     16:30:07	1
17	lays	Not Set1	 2025-04-22     16:30:10	1
8	lurdes	Not Set1	 2025-04-22     17:26:17	1
17	lays	Not Set1	 2025-04-22     17:32:21	1
23	yaritza bueno	Not Set1	 2025-04-22     20:07:10	1
10	mauricio	Not Set7	 2025-04-22     20:24:11	1
8	lurdes	Not Set1	 2025-04-22     20:57:37	1
9	manuella meireles	Not Set1	 2025-04-22     20:59:29	1
23	yaritza bueno	Not Set1	 2025-04-22     21:06:37	1
23	yaritza bueno	Not Set1	 2025-04-22     22:11:37	1
17	lays	Not Set1	 2025-04-22     22:59:44	1
21	brenda pierini	Not Set1	 2025-04-23     04:48:31	1
14	Rosangela Fagundes	Not Set1	 2025-04-23     05:58:55	1
22	nilo	Not Set1	 2025-04-23     08:03:29	1
14	Rosangela Fagundes	Not Set1	 2025-04-23     10:03:28	1
10	mauricio	Not Set7	 2025-04-23     10:59:40	1
14	Rosangela Fagundes	Not Set1	 2025-04-23     11:00:02	1
21	brenda pierini	Not Set1	 2025-04-23     11:04:10	1
22	nilo	Not Set1	 2025-04-23     11:55:01	1
21	brenda pierini	Not Set1	 2025-04-23     12:02:50	1
8	lurdes	Not Set1	 2025-04-23     12:58:54	1
22	nilo	Not Set1	 2025-04-23     13:01:26	1
21	brenda pierini	Not Set1	 2025-04-23     13:10:37	1
23	yaritza bueno	Not Set1	 2025-04-23     13:36:58	1
14	Rosangela Fagundes	Not Set1	 2025-04-23     14:18:52	1
17	lays	Not Set1	 2025-04-23     14:38:55	1
22	nilo	Not Set1	 2025-04-23     16:04:56	1
17	lays	Not Set1	 2025-04-23     16:40:14	1
8	lurdes	Not Set1	 2025-04-23     17:28:07	1
17	lays	Not Set1	 2025-04-23     17:40:07	1
8	lurdes	Not Set1	 2025-04-23     18:31:38	1
10	mauricio	Not Set7	 2025-04-23     18:55:40	1
23	yaritza bueno	Not Set1	 2025-04-23     20:08:15	1
8	lurdes	Not Set1	 2025-04-23     21:00:05	1
23	yaritza bueno	Not Set1	 2025-04-23     21:08:43	1
23	yaritza bueno	Not Set1	 2025-04-23     22:00:59	1
17	lays	Not Set1	 2025-04-23     23:00:43	1
21	brenda pierini	Not Set1	 2025-04-24     04:55:52	1
14	Rosangela Fagundes	Not Set1	 2025-04-24     06:00:28	1
22	nilo	Not Set1	 2025-04-24     08:28:09	1
14	Rosangela Fagundes	Not Set1	 2025-04-24     10:04:32	1
14	Rosangela Fagundes	Not Set1	 2025-04-24     10:40:25	1
22	nilo	Not Set1	 2025-04-24     11:39:40	1
22	nilo	Not Set1	 2025-04-24     12:40:29	1
21	brenda pierini	Not Set1	 2025-04-24     12:43:29	1
8	lurdes	Not Set1	 2025-04-24     12:50:05	1
10	mauricio	Not Set7	 2025-04-24     12:54:22	1
23	yaritza bueno	Not Set1	 2025-04-24     13:43:04	1
14	Rosangela Fagundes	Not Set1	 2025-04-24     14:16:23	1
17	lays	Not Set1	 2025-04-24     14:41:19	1
22	nilo	Not Set1	 2025-04-24     16:00:05	1
17	lays	Not Set1	 2025-04-24     16:36:22	1
8	lurdes	Not Set1	 2025-04-24     17:31:51	1
17	lays	Not Set1	 2025-04-24     17:36:06	1
8	lurdes	Not Set1	 2025-04-24     18:19:29	1
23	yaritza bueno	Not Set1	 2025-04-24     20:34:59	1
10	mauricio	Not Set7	 2025-04-24     20:54:50	1
8	lurdes	Not Set1	 2025-04-24     20:56:16	1
23	yaritza bueno	Not Set1	 2025-04-24     21:42:36	1
23	yaritza bueno	Not Set1	 2025-04-24     22:03:09	1
17	lays	Not Set1	 2025-04-24     22:57:41	1
21	brenda pierini	Not Set1	 2025-04-25     04:54:31	1
14	Rosangela Fagundes	Not Set1	 2025-04-25     05:59:40	1
22	nilo	Not Set1	 2025-04-25     08:27:51	1
14	Rosangela Fagundes	Not Set1	 2025-04-25     10:12:55	1
10	mauricio	Not Set7	 2025-04-25     10:23:46	1
14	Rosangela Fagundes	Not Set1	 2025-04-25     10:35:26	1
21	brenda pierini	Not Set1	 2025-04-25     11:28:01	1
22	nilo	Not Set1	 2025-04-25     11:40:42	1
22	nilo	Not Set1	 2025-04-25     12:41:54	1
8	lurdes	Not Set1	 2025-04-25     12:59:39	1
21	brenda pierini	Not Set1	 2025-04-25     13:07:35	1
23	yaritza bueno	Not Set1	 2025-04-25     13:40:54	1
14	Rosangela Fagundes	Not Set1	 2025-04-25     14:00:23	1
17	lays	Not Set1	 2025-04-25     14:12:52	1
17	lays	Not Set1	 2025-04-25     14:32:02	1
22	nilo	Not Set1	 2025-04-25     16:00:24	1
17	lays	Not Set1	 2025-04-25     16:31:56	1
17	lays	Not Set1	 2025-04-25     17:31:06	1
8	lurdes	Not Set1	 2025-04-25     17:43:14	1`;
}
