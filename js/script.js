const regStorageGet = JSON.parse(localStorage.getItem("regStorage"));
let regStorage = regStorageGet !== null ? regStorageGet : [];

const regStoragesGet = JSON.parse(localStorage.getItem("regStorages"));
let regStorages = regStoragesGet !== null ? regStoragesGet : [];

function regStorageRemove() {
	console.log("Antes");
	console.log(regStorageGet);
	setTimeout(function () {
		localStorage.removeItem("regStorage"); // Remove apenas "meuArray"
		console.log("Depois");
		console.log(regStorageGet);
	}, 3000);

	// localStorage.clear(); // Apaga TODOS os dados do localStorage
}

function dataFim() {
	// Data final
	const dataFinal = new Date();

	dataFinal.setMonth(dataFinal.getMonth() + 6);

	let atual = dataFinal.toISOString().split("T")[0];

	atual = atual.split("-");
	atual[2] = atual[2] < 10 ? atual[2] : atual[2];
	atual = atual.join("-");
	return atual;
}

function obterDataRegs() {
	// Obter a data e hora atual do dispositivo
	const dataHoraAtual = new Date();

	// Formatar a data e hora para o formato correto
	const ano = dataHoraAtual.getFullYear();
	const mes = String(dataHoraAtual.getMonth() + 1).padStart(2, "0");
	const dia = String(dataHoraAtual.getDate()).padStart(2, "0");
	const horas = String(dataHoraAtual.getHours()).padStart(2, "0");
	const minutos = String(dataHoraAtual.getMinutes()).padStart(2, "0");
	const segundos = String(dataHoraAtual.getSeconds()).padStart(2, "0");
	const milisegundos = String(dataHoraAtual.getMilliseconds()).padStart(2, "0");

	const dataReg = `${ano}-${mes}-${dia}`;
	return dataReg;
}

// function regexRegistro(texto) {
// 		const regex = /^(\d{11});([^;]+);(\d{4}-\d{2}-\d{2});(\d{4}-\d{2}-\d{2});(\d+);(\d{11})$/gm;

//     const regexRegistros = [];
//     const registrosFormatados = [];
//     let match;

//     while ((match = regex.exec(texto)) !== null) {
//         regexRegistros.push({
//             cpfInicial: match[1],
//             nome: match[2],
//             dataInicial: match[3],
//             dataFinal: match[4],
//             numero: match[5],
//             cpfFinal: match[6]
//         });

//       registrosFormatados.push(

//             `${match[1]};${match[2]};${match[3]};${match[4]};${match[5]};${match[6]}`
//             );
//     }

//     console.log(regexRegistros); // Exibe os registros extraídos no console
//     console.log(registrosFormatados); // Exibe os registros extraídos no console

// 	}

function regexRegistro(texto) {
	const regex = /^([\d.-]+);([^;]+);(\d{4}-\d{2}-\d{2});(\d{4}-\d{2}-\d{2});(\d+);([\d.-]+)$/gm;

	const regexRegistros = [];
	const registrosFormatados = [];
	let match;

	while ((match = regex.exec(texto)) !== null) {
		// Remove pontos e traços dos CPFs
		const cpfInicial = match[1].replace(/[.-]/g, "");
		const cpfFinal = match[6].replace(/[.-]/g, "");

		// Formata o nome
		const nomeSemAcento = removerAcentos(match[2]).toUpperCase();
		const nomes = nomeSemAcento.split(" ");
		const primeiroNome = nomes[0];
		const ultimoNome = nomes[nomes.length - 1];
		const nomeFormatado = `${primeiroNome} ${ultimoNome}`;

		regexRegistros.push({
			cpfInicial: cpfInicial,
			nome: nomeFormatado,
			dataInicial: match[3],
			dataFinal: match[4],
			numero: match[5],
			cpfFinal: cpfFinal
		});

		registrosFormatados.push(`${cpfInicial};${nomeFormatado};${match[3]};${match[4]};${match[5]};${cpfFinal}`);

	}
	 //console.log(regexRegistros); // Exibe os registros extraídos no console
	// console.log(registrosFormatados); // Exibe os registros formatados no console
}

// Função para remover acentos das letras
function removerAcentos(str) {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Função para validar CPF
function validarCPF(cpf) {
	cpf = cpf.replace(/[^\d]+/g, ""); // Remover pontos e traços
	if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verificar tamanho e sequência repetida
	let soma = 0,
		resto;
	for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
	resto = (soma * 10) % 11;
	if (resto === 10 || resto === 11) resto = 0;
	if (resto !== parseInt(cpf.substring(9, 10))) return false;

	soma = 0;
	for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
	resto = (soma * 10) % 11;
	if (resto === 10 || resto === 11) resto = 0;
	return resto === parseInt(cpf.substring(10, 11));
}

function autoLabel() {
	const btn_reg_estaci = document.querySelector("#btn_reg_estaci");
	const btnLabel = document.querySelector("#btnLabel");
	const inputRadio = document.querySelector(".boxe input[type=radio]");
	const inputCheck = document.querySelectorAll(".boxe input[type=checkbox]");
	inputRadio.checked = true;
	inputRadio.dataset.check = "";
	// inputCheck.forEach(c => (c.checked = true));
	// inputCheck.forEach(c => (c.dataset.check = ""));

	const conf = confirm("Deseja Preencher Registros");
	if (conf) {
		inputRadio.checked = true;
		inputRadio.dataset.check = "";
		inputCheck.forEach((c, index) => {
			c.checked = true;
			c.dataset.check = "";
		//	console.log(c);
		});
		btnLabel.click();
	} else if (!conf) {
		inputRadio.checked = false;
		delete inputRadio.dataset.check;
		inputCheck.forEach((c, index) => {
			c.checked = false;
			delete c.dataset.check;
		//	console.log(c);
		});
		return;
	}
}

function analisarEstacionamento() {
	const atual = dataFim();
	const resultado = document.querySelector("#resultado");
	const box_res_footer = document.querySelector(".box_resultados_footers");

	const divResCpfRepetido = document.createElement("div");

	const divResDom = document.createElement("div");

	const divRes = document.createElement("div");

	const divResOver = document.createElement("div");

	box_res_footer.innerHTML = ``;

	// Obter o conteúdo do elemento <label>
	const label = document.getElementById("listasText").value.trim();
	// Se label estiver vazio, exibe erro e para execução
	if (!label) {
		mostrarMensagem("Nenhum registro encontrado!", "erro");
		return;
	}

	regexRegistro(label);
	const regexCPFs = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;

	const cpfsSemFormatacao = label.match(regexCPFs) || [];

	const cpfsFormatados = cpfsSemFormatacao.map(cpf => cpf.replace(/[^\d]/g, ""));

	const cpfCounts = cpfsFormatados.reduce((acc, cpf) => {
		acc[cpf] = (acc[cpf] || 0) + 1;
		return acc;
	}, {});
	const cpfsRepetidos = Object.keys(cpfCounts).filter(cpf => cpfCounts[cpf] > 2);

	const registros = label.split(/(?<=\d{11})\s+/);

	const regArray = [];
	const regArrayMod = [];
	const regArrayData = [];
	// Ajustar nome e data final, validar CPF
	// Obtenha a data
	function obterDataReg() {
		// Obter a data e hora atual do dispositivo
		const dataHoraAtual = new Date();

		// Formatar a data e hora para o formato correto
		const ano = dataHoraAtual.getFullYear();
		const mes = String(dataHoraAtual.getMonth() + 1).padStart(2, "0");
		const dia = String(dataHoraAtual.getDate()).padStart(2, "0");
		const horas = String(dataHoraAtual.getHours()).padStart(2, "0");
		const minutos = String(dataHoraAtual.getMinutes()).padStart(2, "0");
		const segundos = String(dataHoraAtual.getSeconds()).padStart(2, "0");
		const milisegundos = String(dataHoraAtual.getMilliseconds()).padStart(2, "0");

		const dataReg = `${ano}-${mes}-${dia}`;
		return dataReg;
	}
	// Criar um conjunto para armazenar CPFs únicos
	const cpfsRegistrados = new Set();
	// const registrosRegistrados = new Array();
	let registrosRegistrados = [];
	if (registros[0] !== "") {
		registros.forEach(item => {
			const parte = item.split(";");
			const cpfSemFormatacao = parte[0].replace(/[^\d]/g, "");
			const cpfValido = validarCPF(cpfSemFormatacao);
			if (parte[0] !== "") {
				// Verificar se o CPF já foi registrado
				if (cpfValido && !cpfsRegistrados.has(cpfSemFormatacao)) {
					
					const dias = difDatas(obterDataReg(), parte[3]);
					
					const nomeCompleto = parte[1]
						.trim()
						.toUpperCase()
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "")
						.split(" ");
					const nome = nomeCompleto[0];
					const sobreNome = nomeCompleto[nomeCompleto.length - 1];
					const nomeRegistro = nome + " " + sobreNome;

					parte[0] = cpfSemFormatacao;
					parte[5] = parte[5].replace(/[^\d]/g, "");
					parte[1] = nomeRegistro;
const registroObj = {
	cpfUm: parte[0].replace(/[^\d]/g, ""),
	nome: nomeRegistro,
	dataFinal: parte[2],
	dataInicial: parte[3],
	digito: "1",
	cpfDois: parte[5].replace(/[^\d]/g, "")
};
					if (dias < 90) {
						let dataMod = [
							`${parte[0]}`,`${parte[1]}`, `${parte[2]}`, `${(parte[3] = atual)}`, `${parte[4]}`, `${parte[5]}`];
						let regMods = [``,
						`${parte[0]}`, `${parte[1]}`, `${parte[2]}`, `${(parte[3] = atual)}`, `erro`];
						let regMod = {
							id: ``,
							cpf: `${parte[0]}`,
							nome: `${parte[1]}`,
							dataInicio: `${parte[2]}`,
							dataFim: `${(parte[3] = atual)}`,
							resultado: `erro`
						};
						regArrayData.push(dataMod.join(";"));
						regArray.push(parte.join(";"));
						regArrayMod.push(regMods.join(";"));
registrosRegistrados.push(registroObj);
						localStorage.setItem("regStorage", JSON.stringify(regArray));
					} else {
						let regMods = [``,
						`${parte[0]}`, `${parte[1]}`, `${parte[2]}`, `${parte[3]}`, `sucesso`];

						regArray.push(parte.join(";"));
						regArrayMod.push(regMods.join(";"));
						registrosRegistrados.push(registroObj);
					}

					//   else {
					//   	let regMods =
					//       {
					//       	id: ``,
					//       	cpf: `${parte[0]}`,
					//       	nome: `${parte[1]}`,
					//       	dataInicio: `${parte[2]}`,
					//       	dataFim: `${parte[3]}`,
					//       	resultado: `sucesso`}
					//       	;

					//       regArray.push(parte.join(";"));
					//       regArrayMod.push(regMods.join(";"));

					//localStorage.setItem("regStorages", JSON.stringify(regArrayMod));

					//   }

					// Adicionar CPF ao conjunto para evitar duplicação
					cpfsRegistrados.add(cpfSemFormatacao);
					
					mostrarMensagem("Verificação concluída com sucesso!", "sucesso");
				}
			} else {
				mostrarMensagem("Verificação não foi concluída com sucesso!", "erro");
			}
		});
		const registrosUnico = regArray.reduce((acc, registro) => {
			const cpf = registro.match(/\b\d{11}\b/g)?.[0];
			if (cpf && !acc.has(cpf)) {
				acc.set(cpf, registro);
			}
			return acc;
		}, new Map());


		const registrosData = regArrayData.reduce((acc, registro) => {
			const cpf = registro.match(/\b\d{11}\b/g)?.[0];
			if (cpf && !acc.has(cpf)) {
				acc.set(cpf, registro);
			}
			return acc;
		}, new Map());

		const resultadoDom = () => {
			return `
  	<h6 class=" color_green">
  	${registros.length > 
  	1 ? registros.length + " Registros Foram Analisados." : registros.length == 0 ? "Nenhum Registro Foi Analisado." : registros.length + " Registro Foi Analisado."}  
  	</h6>
  
  	<p>
  	${ulLista.length > 
  	1 ? ulLista.length + " CPF's Encontrados em Mais de Um Registro." : ulLista.length === 1 ? ulLista.length + " CPF Encontrado em Mais de Um Registro." : "Nenhum CPF Duplicado."} 
 	</p>
  	<p>
  ${regArrayData.length > 
  1 ? regArrayData.length + " Datas de Registros Ajustados." : regArrayData.length === 1 ? regArrayData.length + " Data de Registro Ajustado." : "Nenhuma Data de Registro Ajustada."}
 	</p>
  	
  	
  	<h6 class="color_red">
  	${
				registros.length - Array.from(registrosUnico.values()).length > 1
					? registros.length - Array.from(registrosUnico.values()).length + " Registros Foram Excluídos!"
					: registros.length - Array.from(registrosUnico.values()).length + " Registro Foi Excluído!"
			}
  	</h6>
  	
  	<h6 class="color_green">
  	${
				Array.from(registrosUnico.values()).length > 1
					? Array.from(registrosUnico.values()).length + " REGISTROS  AJUSTADOS E PRONTOS PARA USO!"
					: Array.from(registrosUnico.values()).length + " REGISTRO AJUSTADO E PRONTO PARA USO!"
			}  
  	</h6>
  	
  
  <!--
  <h6 class="color_red">
  	${
				registros.length - Array.from(registrosUnico.values()).length > 1
					? registros.length - Array.from(registrosUnico.values()).length + " Registros Foram Excluídos!"
					: registros.length - Array.from(registrosUnico.values()).length === 0
					? "Nenhum Registro Foi Excluído!"
					: registros.length - Array.from(registrosUnico.values()).length + " Registro Foi Excluído!"
			}
  	</h6>
  	
  		<h6 class="color_green">
  	(Sem Repetição de CPF + Vencimento ${atual.split("-").reverse().join("/")})
  	REGISTROS ANALISADOS, AJUSTADOS E PRONTOS PARA USO!
  		</h6>
  	-->
  	`;
		};

		const divsDom = () => {
			return `
		<h3>
		Registros Ajustados:
		</h3>
  <ul class="box_listas scroll_bar">
      ${Array.
      from(registrosUnico.values())
							.map(
								(registro, index) => `
							<!--
							<li>
							${index + 1}.
							</li>
							<li>&nbsp; ${registro} &nbsp;</li>
							-->
							<li> ${registro} </li>`
							)
							.join("")}
  </ul>
  	`;
		};

// 		const resCpfRepetido = () => {
// 			return `
//     <h3>  
//     ${cpfsRepetidos.length > 
//     1 ? cpfsRepetidos.length + " CPFs Duplicados:" : cpfsRepetidos.length + " CPF Duplicado:"}
//             </h3>
           
//             <ul class="box_listas box_lista_ul scroll_bar">
//           ${cpfsRepetidos
// 												.map(
// 													(registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> foi  encontrado em ${Math.floor(cpfCounts[registro] / 2)} registros. 
//                 ${Math.floor(cpfCounts[registro] / 2 - 1) > 1 ? cpfCounts[registro] / 2 - 1 + " Registros Foram Excluídos &nbsp;" : cpfCounts[registro] / 2 - 1 + " Registro Foi Excluído &nbsp;"}
// </li>`
// 												)
// 												.join("")}
//             </ul>
   
//     <h3>  
//     ${regArrayData.length > 
//     1 ? regArrayData.length + " Datas Modificadas:" : regArrayData.length + " Data Modificada:"}
//             </h3>
           
//   <ul class="box_listas scroll_bar">
//     ${Array.
//     from(regArrayData.values())
// 					.map((registro, index) => `<li>&nbsp;${index + 1}. ${registro} &nbsp;</li>`)
// 					.join("")}
// </ul>

//     `;
// 		};
		const resCpfRepetido = () => {
			return `
    <h3>  
    ${cpfsRepetidos.length > 
    1 ? cpfsRepetidos.length + " CPFs Duplicados:" : cpfsRepetidos.length + " CPF Duplicado:"}
            </h3>
           
            <ul class="box_listas box_lista_ul scroll_bar">
          ${cpfsRepetidos
												.map(
													(registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> foi  encontrado em ${Math.floor(cpfCounts[registro] / 2)} registros. 
                ${Math.floor((cpfCounts[registro] / 2) - 1) > 1 
  ? (Math.floor((cpfCounts[registro] / 2) - 1) + " Registros Foram Excluídos &nbsp;") 
  : (Math.floor((cpfCounts[registro] / 2) - 1) + " Registro Foi Excluído &nbsp;")}

</li>`
												)
												.join("")}
            </ul>
   
    <h3>  
    ${regArrayData.length > 
    1 ? regArrayData.length + " Datas Modificadas:" : regArrayData.length + " Data Modificada:"}
            </h3>
           
  <ul class="box_listas scroll_bar">
    ${Array.
    from(regArrayData.values())
					.map((registro, index) => `<li>&nbsp;${index + 1}. ${registro} &nbsp;</li>`)
					.join("")}
</ul>

    `;
		};
	
// 		const resCpfRepetido = () => {
// 			return `
//     <h3>  
//     ${cpfsRepetidos.length > 
//     1 ? cpfsRepetidos.length + " CPFs Duplicados:" : cpfsRepetidos.length + " CPF Duplicado:"}
//             </h3>
           
//             <ul class="box_listas box_lista_ul scroll_bar">
//           ${cpfsRepetidos.map((registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> foi  encontrado em ${Math.floor(cpfCounts[registro] / 2)} registros. 
//                 ${Math.floor(cpfCounts[registro] / 2 - 1) > 1 ? cpfCounts[registro] / 2 - 1 + " Registros Foram Excluídos &nbsp;" : cpfCounts[registro] / 2 - 1 + " Registro Foi Excluído &nbsp;"}
// </li>`
// 												)
// 												.join("")}
//             </ul>
   
//     <h3>  
// registros
//             </h3>
           
//             <ul class="box_listas box_lista_ul scroll_bar">
//                   ${Object.values(registrosRegistrados)
// 					.map((registro, index) => `<li>&nbsp;${index + 1}. ${registro} &nbsp;</li>`)
// 					}
//             </ul>
   
//     <h3>  
//     ${regArrayData.length > 
//     1 ? regArrayData.length + " Datas Modificadas:" : regArrayData.length + " Data Modificada:"}
//             </h3>
           
//   <ul class="box_listas scroll_bar">
//     ${Array.
//     from(regArrayData.values())
// 					.map((registro, index) => `<li>&nbsp;${index + 1}. ${registro} &nbsp;</li>`)
// 					.join("")}
// </ul>

//     `;
// 		};

		box_res_footer.appendChild(divResDom);
		divResDom.classList.add("divResDom"); //resultadoDom
		divResDom.classList.add("resultadoDom"); //resultadoDom

		divResOver.appendChild(divRes);
		divResOver.appendChild(divResCpfRepetido);
		box_res_footer.appendChild(divResOver);
		// box_res_footer.appendChild(divRes);
		// box_res_footer.appendChild(divResCpfRepetido);
		divResOver.classList.add("divResOver");
		divRes.classList.add("divRes");
		divResCpfRepetido.classList.add("divResCpfRepetido");
		divResCpfRepetido.innerHTML = resCpfRepetido();

		divRes.innerHTML = divsDom();

		//

		//

		const ulListasLenght = document.querySelectorAll(".box_resultados_footers .box_listas li");
ulListasLenght.classList.add("ulListasLenght");
		const ulLista = document.querySelectorAll(".box_lista_ul li");

		divResDom.innerHTML = resultadoDom();

		//
		//

		// exibirListaRegistros(regArrayMod);
		exibirListaRegistros(regArrayMod);
		// mostrarMensagem("texto bom", "Ativo");
		function marcarCpf() {
			const negrito = document.querySelectorAll(".negrito");
			negrito.forEach((it, index) => {
				it.addEventListener("click", event => {
					const target = event.target;
					const liB = it.querySelector("b");
					liB.classList.toggle("color_green");
				});
			});
		}
		marcarCpf();
	} else if (registros[0] == "") {
		mostrarMensagem("Verificação não foi concluída com sucesso!", "erro");
		return;
	}
}

// function resEstacionamento(registros, ulLista, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep) {
// 	const container_resultados = document.querySelector("#container_resultados");
// 	const cabecalho = document.querySelector(".cabecalho");
// 	const corpo = document.querySelector(".corpo");
// 	const rodape = document.querySelector(".rodape");
	
// const div_corpo = (registros, ulLista, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts) => {
// 	return `
// <div>
// 				<h4>
//       REGISTROS ESTACIONAMENTO:
// </h4>
// 				<p>
// 				  	${registros.length > 
//   	1 ? registros.length + " FORAM ANALISADOS." : registros.length == 0 ? "NENHUM FOI ANALISADO." : registros.length + " FOI ANALISADO."}  
// </p>
// <!--
// 					<p>
// 					  	${ulLista.length > 
//   	1 ? ulLista.length + " REGISTROS ESTÃO DUPLICADOS." : ulLista.length === 1 ? ulLista.length + " REGISTRO ESTÁ DUPLICADO." : "NENHUM REGISTRO DUPLICADO."} 
					
// 						</p>
// 						-->
// 					<p>
// 					  	${cpfsRepetidos.length > 
//   	1 ? cpfsRepetidos.length + " REGISTROS ESTÃO DUPLICADOS." : cpfsRepetidos.length === 1 ? ulLista.length + " REGISTRO ESTÁ DUPLICADO." : "NENHUM REGISTRO DUPLICADO."} 
					
// 						</p>
				
// 					<p>
// 					  ${regArrayData.length > 
//   1 ? regArrayData.length + " ESTÃO VENCENDO." : regArrayData.length === 1 ? regArrayData.length + " ESTÁ VENCENDO." : "NENHUM REGISTRO VENCENDO."}
// 						</p>

// 					<p class="color_red">
// 					  	${
// 				registros.length - Array.from(registrosUnico.values()).length > 1
// 					? registros.length - Array.from(registrosUnico.values()).length + " FORAM EXCLUÍDOS!"
// 					: registros.length - Array.from(registrosUnico.values()).length  == 1
// 					? registros.length - Array.from(registrosUnico.values()).length + " REGISTRO FOI EXCLUÍDO!" : "NENHUM REGISTRO EXCLUÍDO!"
// 			}
// 						</p>
 
// 					<p class="color_green">
// 						${
// 				Array.from(registrosUnico.values()).length > 1
// 					? Array.from(registrosUnico.values()).length + " ESTÃO PRONTOS PARA USO!"
// 					: Array.from(registrosUnico.values()).length + " REGISTRO PRONTO PARA USO!"
// 			}  
// 						</p>
// 				</div>
// 	`;
// }


// const div_rodape = (registros, ulLista, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep) => {
// 	return `
// 	<div>
// 					<h4>
// 				${
// 				Array.from(registrosUnico.values()).length > 1
// 					? Array.from(registrosUnico.values()).length + " REGISTROS AJUSTADOS!"
// 					: Array.from(registrosUnico.values()).length == 1 ? Array.from(registrosUnico.values()).length + " REGISTRO AJUSTADO!" : "NENHUM REGISTRO AJUSTADO!"
// 			}  	
		
					  
// 					</h4>
// 					<ul class="boxe_lista scroll_bar">
// 						         ${Array.
//       from(registrosUnico.values())
// 							.map(
// 								(registro, index) => `
							
// 							<li> ${registro} </li>`
// 							)
// 							.join("")}
// 					</ul>
// 					<h4>
// 					  ${cpfsRepetidos.length > 
//     1 ? cpfsRepetidos.length + " REGISTROS DUPLICADOS:" : cpfsRepetidos.length + " REGISTRO DUPLICADO:"}
// 					</h4>
				
// 					<ul class="boxe_lista scroll_bar">
// 					 ${cpfsRepetidos
// 												.map(
// 													(registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> FOI  ENCONTRADO EM ${Math.floor(cpfCounts[registro] / 2)} Registros. 
//                 ${Math.floor((cpfCounts[registro] / 2) - 1) > 1 
//   ? (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTROS FORAM EXCLUÍDOS &nbsp;") 
//   : (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTRO FOI EXCLUÍDO &nbsp;")}

// </li>`
// 												)
// 												.join("")}
						
					
// 					</ul>
// 					<br/>
// 					<h4>
// 					    ${regArrayData.length > 
//     1 ? regArrayData.length + " DATAS MODIFICADAS:" : regArrayData.length + " DATA MODIFICADA:"}
					
// 					</h4>
// 					<ul class="boxe_lista scroll_bar">
// 						    ${Array.
//     from(regArrayData.values())
// 					.map((registro, index) => `<li>&nbsp;${index + 1}. ${registro} &nbsp;</li>`)
// 					.join("")}
// 					</ul>
					
// 				</div>
// 	`;
// }

// corpo.innerHTML = div_corpo(registros, ulLista, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts);
// rodape.innerHTML = div_rodape(registros, ulLista, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep);
// }


// function resEstaci(registros, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep) {
// 	const container_resultados = document.querySelector("#container_resultados");
// 	const cabecalho = document.querySelector(".cabecalho");
// 	const corpo = document.querySelector(".corpo");
// 	const rodape = document.querySelector(".rodape");

// const div_corpo = (registros, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts) => {
// 	return `
// <div>
// 				<h4>
//       REGISTROS ESTACIONAMENTO:
// </h4>
// 				<p>
// 				  	${registros.length > 
//   	1 ? registros.length + " FORAM ANALISADOS." : registros.length == 0 ? "NENHUM FOI ANALISADO." : registros.length + " FOI ANALISADO."}  
// </p>

// 					<p>
// 					  	${cpfsRepetidos.length > 
//   	1 ? cpfsRepetidos.length + " REGISTROS ESTÃO DUPLICADOS." : cpfsRepetidos.length === 1 ? cpfsRepetidos.length + " REGISTRO ESTÁ DUPLICADO." : "NENHUM REGISTRO DUPLICADO."} 
					
// 						</p>
				
// 					<p>
// 					  ${regArrayData.length > 
//   1 ? regArrayData.length + " ESTÃO VENCENDO." : regArrayData.length === 1 ? regArrayData.length + " ESTÁ VENCENDO." : "NENHUM REGISTRO VENCENDO."}
// 						</p>

					
// 					<p class="${registros.length - Array.
// 					from(registrosUnico.values()).length >= 1
// 					? "color_red" : "color_green"}">
// 					  	${
// 				registros.length - Array.from(registrosUnico.values()).length > 1
// 					? registros.length - Array.from(registrosUnico.values()).length + " FORAM EXCLUÍDOS!"
// 					: registros.length - Array.from(registrosUnico.values()).length  == 1
// 					? registros.length - Array.from(registrosUnico.values()).length + " REGISTRO FOI EXCLUÍDO!" : "NENHUM REGISTRO EXCLUÍDO!"
// 			}
// 						</p>
 
// 					<p class="${Array.
// 					from(registrosUnico.values()).length >= 1
// 					? "color_green" : "color_red"}">
// 					${Array.
// 				from(registrosUnico.values()).length > 1 ? Array.from(registrosUnico.values()).length + " REGISTROS AJUSTADOS!"
// 					: Array.from(registrosUnico.values()).length == 1 ? Array.from(registrosUnico.values()).length + " REGISTRO AJUSTADO!" : "NENHUM REGISTRO AJUSTADO!"
// 			}  	
						
// 						</p>
// 						<!--
// 					<p class="${Array.
// 					from(registrosUnico.values()).length >= 1
// 					? "color_green" : "color_red"}">
// 						${
// 				Array.from(registrosUnico.values()).length > 1
// 					? Array.from(registrosUnico.values()).length + " ESTÃO PRONTOS PARA USO!"
// 					: Array.from(registrosUnico.values()).length + " REGISTRO PRONTO PARA USO!"
// 			}  
// 						</p>
// 					<h4>
// 				${Array.
// 				from(registrosUnico.values()).length > 1 ? Array.from(registrosUnico.values()).length + " REGISTROS AJUSTADOS!"
// 					: Array.from(registrosUnico.values()).length == 1 ? Array.from(registrosUnico.values()).length + " REGISTRO AJUSTADO!" : "NENHUM REGISTRO AJUSTADO!"
// 			}  	
// 		</h4>
// 		-->
// 				</div>
// 	`;
// }


// // const div_rodape = (registros, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep) => {
// // 	return `
// // 	<div>
					
					
// // 					<h4 class="${Array.
// // 					from(registrosUnico.values()).length >= 1
// // 					? "color_green" : "color_red"}">
// // 					${
// // 				Array.from(registrosUnico.values()).length > 1
// // 					? Array.from(registrosUnico.values()).length + " ESTÃO PRONTOS PARA USO:"
// // 					: Array.from(registrosUnico.values()).length + " ESTÁ PRONTO PARA USO:"
// // 			}  
// // 		</h4>
// // 		<!--
// // 					<h4>
// // 				${Array.
// // 				from(registrosUnico.values()).length > 1 ? Array.from(registrosUnico.values()).length + " REGISTROS AJUSTADOS!"
// // 					: Array.from(registrosUnico.values()).length == 1 ? Array.from(registrosUnico.values()).length + " REGISTRO AJUSTADO!" : "NENHUM REGISTRO AJUSTADO!"
// // 			}  	
// // 		</h4>
// // 		-->
// // 					<ul class="boxe_lista lista_ajustada scroll_bar" onclick="copias(event)">
// // 						         ${Array.
// //       from(registrosUnico.values())
// // 							.map(
// // 								(registro, index) => `
							
// // 							<li> ${registro} </li>`
// // 							)
// // 							.join("")}
// // 					</ul>
					
// // 					<h4 class="${cpfsRepetidos.length <
// //     1
// // 					? "" : "color_red"}">
// // 					  ${cpfsRepetidos.length > 
// //     1 ? cpfsRepetidos.length + " ESTÃO DUPLICADOS:" : cpfsRepetidos.length == 
// //     1 ? cpfsRepetidos.length + " ESTÁ DUPLICADO:" : "NENHUM ESTÁ DUPLICADO"}
// // 					</h4>
// // 				<!--	
// // 				<ul class="boxe_lista scroll_bar">
// // 					 ${cpfsRepetidos
// // 												.map(
// // 													(registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> FOI  ENCONTRADO EM ${Math.floor(cpfCounts[registro] / 2)} Registros. 
// //                 ${Math.floor((cpfCounts[registro] / 2) - 1) > 1 
// //   ? (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTROS FORAM EXCLUÍDOS &nbsp;") 
// //   : (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTRO FOI EXCLUÍDO &nbsp;")}

// // </li>`
// // 												)
// // 												.join("")}
// // 					</ul>
// // 					-->
// // 					<ul class="boxe_lista scroll_bar">
// // 					 ${cpfsRepetidos.length > 0 ? cpfsRepetidos
// // 												.map(
// // 													(registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> FOI  ENCONTRADO EM ${Math.floor(cpfCounts[registro] / 2)} Registros. 
// //                 ${Math.floor((cpfCounts[registro] / 2) - 1) > 1 
// //   ? (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTROS FORAM EXCLUÍDOS &nbsp;") 
// //   : (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTRO FOI EXCLUÍDO &nbsp;")}

// // </li>`
// // 												)
// // 												.join("") : `<li>NENHUM REGISTRO DUPLICADO FOI ENCONTRADO</li>`}
// // 					</ul>
				
// // 					<br/>
					
// // 					<h4>
// // 					    ${regArrayData.length > 
// //     1 ? regArrayData.length + " DATAS MODIFICADAS:" : regArrayData.length == 
// //     1 ? regArrayData.length + " DATA MODIFICADA:" : "NENHUMA DATA MODIFICADA"}
// // 					</h4>
// // 					<ul class="boxe_lista scroll_bar">
// // 						    ${Array.
// //     from(regArrayData.values())
// // 					.map((registro, index) => `<li>&nbsp;${index + 1}. ${registro} &nbsp;</li>`)
// // 					.join("")}
// // 					</ul>
					
// // 				</div>
// // 	`;
// // }


// const div_rodape = (registros, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep) => {
// 	return `
// 	<div>
					
// 					<span>
// 					<h4 class="${Array.
// 					from(registrosUnico.values()).length >= 1
// 					? "color_green" : "color_red"}">
// 					${
// 				Array.from(registrosUnico.values()).length > 1
// 					? Array.from(registrosUnico.values()).length + " ESTÃO PRONTOS PARA USO:"
// 					: Array.from(registrosUnico.values()).length + " ESTÁ PRONTO PARA USO:"
// 			}  
// 		</h4>
		
// 					<ul class="boxe_lista lista_ajustada scroll_bar" onclick="copias(event)">
// 						         ${Array.
//       from(registrosUnico.values())
// 							.map(
// 								(registro, index) => `
							
// 							<li> ${registro} </li>`
// 							)
// 							.join("")}
// 					</ul>
// 					</span>
					
// 				<!--
// 					<span>
// 					<h4 class="${cpfsRepetidos.length <
//     1
// 					? "" : "color_red"}">
// 					  ${cpfsRepetidos.length > 
//     1 ? cpfsRepetidos.length + " ESTÃO DUPLICADOS:" : cpfsRepetidos.length == 
//     1 ? cpfsRepetidos.length + " ESTÁ DUPLICADO:" : "NENHUM ESTÁ DUPLICADO"}
// 					</h4>
// 					<ul class="boxe_lista scroll_bar">
// 					 ${cpfsRepetidos.length > 0 ? cpfsRepetidos
// 												.map(
// 													(registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> FOI  ENCONTRADO EM ${Math.floor(cpfCounts[registro] / 2)} Registros. 
//                 ${Math.floor((cpfCounts[registro] / 2) - 1) > 1 
//   ? (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTROS FORAM EXCLUÍDOS &nbsp;") 
//   : (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTRO FOI EXCLUÍDO &nbsp;")}

// </li>`
// 												)
// 												.join("") : `<li>NENHUM REGISTRO DUPLICADO FOI ENCONTRADO</li>`}
// 					</ul>
			
// 					${cpfsRepetidos.length > 0 ?
// 					 `<ul class="boxe_lista scroll_bar">` +
// 					 cpfsRepetidos
// 												.map(
// 													(registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> FOI  ENCONTRADO EM ${Math.floor(cpfCounts[registro] / 2)} Registros. 
//                 ${Math.floor((cpfCounts[registro] / 2) - 1) > 1 
//   ? (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTROS FORAM EXCLUÍDOS &nbsp;") 
//   : (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTRO FOI EXCLUÍDO &nbsp;")}

// </li>`
// 												)
// 												.join("") + `</ul>`: `<h4>NENHUM REGISTRO DUPLICADO FOI ENCONTRADO</h4>`}
					
					
// 				</span>
				
// 				<span>
// 					<h4>
// 					    ${regArrayData.length > 
//     1 ? regArrayData.length + " DATAS MODIFICADAS:" : regArrayData.length == 
//     1 ? regArrayData.length + " DATA MODIFICADA:" : "NENHUMA DATA MODIFICADA"}
// 					</h4>
// 					<ul class="boxe_lista scroll_bar">
// 						    ${Array.
//     from(regArrayData.values())
// 					.map((registro, index) => `<li>&nbsp;${index + 1}. ${registro} &nbsp;</li>`)
// 					.join("")}
// 					</ul>
// 					</span>
// 				-->
// 				<span name="duplicado">
// 				${cpfsRepetidos.length > 0 ?
// `										<h4 class="${cpfsRepetidos.length <
//     1
// 					? "" : "color_red"}">
// 					${cpfsRepetidos.length > 
//     1 ? cpfsRepetidos.length + " ESTÃO DUPLICADOS:" :  cpfsRepetidos.length + " ESTÁ DUPLICADO:" }
// 					</h4>` + `${cpfsRepetidos.length > 0 ?
// 					 `<ul class="boxe_lista scroll_bar">` +
// 					 cpfsRepetidos
// 												.map(
// 													(registro, index) => `<li class="negrito">${index + 1}. O CPF <b> ${registro} </b> FOI  ENCONTRADO EM ${Math.floor(cpfCounts[registro] / 2)} Registros. 
//                 ${Math.floor((cpfCounts[registro] / 2) - 1) > 1 
//   ? (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTROS FORAM EXCLUÍDOS &nbsp;") 
//   : (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTRO FOI EXCLUÍDO &nbsp;")}

// </li>`
// 												)
// 												.join("") + `</ul>`: `<h4>NENHUM REGISTRO DUPLICADO FOI ENCONTRADO</h4>`}` : `<h4>NENHUM ESTÁ DUPLICADO
// 					</h4>`
// 				}
					
// 					</span>
// 					<br/>
// 					<span name="vencido">
// 					${regArrayData.length > 
//     0 ? `<h4 class="${regArrayData.length <
//     1
// 					? "" : "color_red"}">
//     ${regArrayData.length > 
//     1 ? regArrayData.length + " DATAS MODIFICADAS:" : regArrayData.length + " DATA MODIFICADA:"}</h4>` + 
//     `${regArrayData.length > 0 ?
// 					 `<ul class="boxe_lista scroll_bar">` +
// 					 Array.from(regArrayData.values()).map((registro, index) => `<li>${index + 1}. ${registro} &nbsp;</li>`)
// 					.join("") + `</ul>`: `<h4>NENHUMA DATA MODIFICADA</h4>`}` 
//     : `<h4>NENHUMA DATA MODIFICADA
// 					</h4>`}
					
// 					</span>
// 				</div>
// 	`;
// }

// corpo.innerHTML = div_corpo(registros,  regArrayData, registrosUnico, cpfsRepetidos, cpfCounts);
// rodape.innerHTML = div_rodape(registros, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep);
// }

function resEstaci(registros, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep) {
	const container_resultados = document.querySelector("#container_resultados");
	const cabecalho = document.querySelector(".cabecalho");
	const corpo = document.querySelector(".corpo");
	// const rodape = document.querySelector(".rodape");
	const rodape = document.querySelector(".rodape");

const div_corpo = (registros, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts) => {
	return `
<div>
				<h4>
      REGISTROS ESTACIONAMENTO:
</h4>
				<p>
				  	${registros.length > 
  	1 ? registros.length + " FORAM ANALISADOS." : registros.length == 0 ? "NENHUM FOI ANALISADO." : registros.length + " FOI ANALISADO."}  
</p>

					<p>
					  	${cpfsRepetidos.length > 
  	1 ? cpfsRepetidos.length + " REGISTROS ESTÃO DUPLICADOS." : cpfsRepetidos.length === 1 ? cpfsRepetidos.length + " REGISTRO ESTÁ DUPLICADO." : "NENHUM REGISTRO DUPLICADO."} 
					
						</p>
				
					<p>
					  ${regArrayData.length > 
  1 ? regArrayData.length + " ESTÃO VENCENDO." : regArrayData.length === 1 ? regArrayData.length + " ESTÁ VENCENDO." : "NENHUM REGISTRO VENCENDO."}
						</p>

					
					<p class="${registros.length - Array.
					from(registrosUnico.values()).length >= 1
					? "color_red" : "color_green"}">
					  	${
				registros.length - Array.from(registrosUnico.values()).length > 1
					? registros.length - Array.from(registrosUnico.values()).length + " FORAM EXCLUÍDOS!"
					: registros.length - Array.from(registrosUnico.values()).length  == 1
					? registros.length - Array.from(registrosUnico.values()).length + " REGISTRO FOI EXCLUÍDO!" : "NENHUM REGISTRO EXCLUÍDO!"
			}
						</p>
 
					<p class="${Array.
					from(registrosUnico.values()).length >= 1
					? "color_green" : "color_red"}">
					${Array.
				from(registrosUnico.values()).length > 1 ? Array.from(registrosUnico.values()).length + " REGISTROS AJUSTADOS!"
					: Array.from(registrosUnico.values()).length == 1 ? Array.from(registrosUnico.values()).length + " REGISTRO AJUSTADO!" : "NENHUM REGISTRO AJUSTADO!"
			}  	
						
						</p>
						<!--
					<p class="${Array.
					from(registrosUnico.values()).length >= 1
					? "color_green" : "color_red"}">
						${
				Array.from(registrosUnico.values()).length > 1
					? Array.from(registrosUnico.values()).length + " ESTÃO PRONTOS PARA USO!"
					: Array.from(registrosUnico.values()).length + " REGISTRO PRONTO PARA USO!"
			}  
						</p>
					<h4>
				${Array.
				from(registrosUnico.values()).length > 1 ? Array.from(registrosUnico.values()).length + " REGISTROS AJUSTADOS!"
					: Array.from(registrosUnico.values()).length == 1 ? Array.from(registrosUnico.values()).length + " REGISTRO AJUSTADO!" : "NENHUM REGISTRO AJUSTADO!"
			}  	
		</h4>
		-->
				</div>
	`;
}


// const div_rodape = (registros, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep) => {
// 	return `
// 	<div>
					
					
// 					<h4 class="${Array.
// 					from(registrosUnico.values()).length >= 1
// 					? "color_green" : "color_red"}">
// 					${
// 				Array.from(registrosUnico.values()).length > 1
// 					? Array.from(registrosUnico.values()).length + " ESTÃO PRONTOS PARA USO:"
// 					: Array.from(registrosUnico.values()).length + " ESTÁ PRONTO PARA USO:"
// 			}  
// 		</h4>
// 		<!--
// 					<h4>
// 				${Array.
// 				from(registrosUnico.values()).length > 1 ? Array.from(registrosUnico.values()).length + " REGISTROS AJUSTADOS!"
// 					: Array.from(registrosUnico.values()).length == 1 ? Array.from(registrosUnico.values()).length + " REGISTRO AJUSTADO!" : "NENHUM REGISTRO AJUSTADO!"
// 			}  	
// 		</h4>
// 		-->
// 					<ul class="boxe_lista lista_ajustada scroll_bar" onclick="copias(event)">
// 						         ${Array.
//       from(registrosUnico.values())
// 							.map(
// 								(registro, index) => `
							
// 							<li> ${registro} </li>`
// 							)
// 							.join("")}
// 					</ul>
					
// 					<h4 class="${cpfsRepetidos.length <
//     1
// 					? "" : "color_red"}">
// 					  ${cpfsRepetidos.length > 
//     1 ? cpfsRepetidos.length + " ESTÃO DUPLICADOS:" : cpfsRepetidos.length == 
//     1 ? cpfsRepetidos.length + " ESTÁ DUPLICADO:" : "NENHUM ESTÁ DUPLICADO"}
// 					</h4>
// 				<!--	
// 				<ul class="boxe_lista scroll_bar">
// 					 ${cpfsRepetidos
// 												.map(
// 													(registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> FOI  ENCONTRADO EM ${Math.floor(cpfCounts[registro] / 2)} Registros. 
//                 ${Math.floor((cpfCounts[registro] / 2) - 1) > 1 
//   ? (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTROS FORAM EXCLUÍDOS &nbsp;") 
//   : (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTRO FOI EXCLUÍDO &nbsp;")}

// </li>`
// 												)
// 												.join("")}
// 					</ul>
// 					-->
// 					<ul class="boxe_lista scroll_bar">
// 					 ${cpfsRepetidos.length > 0 ? cpfsRepetidos
// 												.map(
// 													(registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> FOI  ENCONTRADO EM ${Math.floor(cpfCounts[registro] / 2)} Registros. 
//                 ${Math.floor((cpfCounts[registro] / 2) - 1) > 1 
//   ? (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTROS FORAM EXCLUÍDOS &nbsp;") 
//   : (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTRO FOI EXCLUÍDO &nbsp;")}

// </li>`
// 												)
// 												.join("") : `<li>NENHUM REGISTRO DUPLICADO FOI ENCONTRADO</li>`}
// 					</ul>
				
// 					<br/>
					
// 					<h4>
// 					    ${regArrayData.length > 
//     1 ? regArrayData.length + " DATAS MODIFICADAS:" : regArrayData.length == 
//     1 ? regArrayData.length + " DATA MODIFICADA:" : "NENHUMA DATA MODIFICADA"}
// 					</h4>
// 					<ul class="boxe_lista scroll_bar">
// 						    ${Array.
//     from(regArrayData.values())
// 					.map((registro, index) => `<li>&nbsp;${index + 1}. ${registro} &nbsp;</li>`)
// 					.join("")}
// 					</ul>
					
// 				</div>
// 	`;
// }


const div_rodape = (registros, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep) => {
	return `
	<div>
	
	<h4>
		LISTA REGISTROS AJUSTADOS
	</h4>
					
					<span>
					<h4 class="${Array.
					from(registrosUnico.values()).length >= 1
					? "color_green" : "color_red"}">
					${
				Array.from(registrosUnico.values()).length > 1
					? Array.from(registrosUnico.values()).length + " ESTÃO PRONTOS PARA USO:"
					: Array.from(registrosUnico.values()).length + " ESTÁ PRONTO PARA USO:"
			}  
		</h4>
		
					<ul class="boxe_lista lista_ajustada scroll_bar" onclick="copias(event)">
						         ${Array.
      from(registrosUnico.values())
							.map(
								(registro, index) => `
							
							<li> ${registro} </li>`
							)
							.join("")}
					</ul>
					</span>
					
	<h4>
		LISTA REGISTROS DUPLICADOS
	</h4>
				<span name="duplicado">
				${cpfsRepetidos.length > 0 ?
`										<h4 class="${cpfsRepetidos.length <
    1
					? "" : "color_red"}">
					${cpfsRepetidos.length > 
    1 ? cpfsRepetidos.length + " ESTÃO DUPLICADOS:" :  cpfsRepetidos.length + " ESTÁ DUPLICADO:" }
					</h4>` + `${cpfsRepetidos.length > 0 ?
					 `<ul class="boxe_lista scroll_bar">` +
					 cpfsRepetidos
												.map(
													(registro, index) => `<li class="negrito">${index + 1}. O CPF <b> ${registro} </b> FOI  ENCONTRADO EM ${Math.floor(cpfCounts[registro] / 2)} Registros. 
                ${Math.floor((cpfCounts[registro] / 2) - 1) > 1 
  ? (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTROS FORAM EXCLUÍDOS &nbsp;") 
  : (Math.floor((cpfCounts[registro] / 2) - 1) + " REGISTRO FOI EXCLUÍDO &nbsp;")}

</li>`
												)
												.join("") + `</ul>`: `<h4>NENHUM REGISTRO DUPLICADO FOI ENCONTRADO</h4>`}` : `<h4>NENHUM ESTÁ DUPLICADO
					</h4>`
				}
					
					</span>
					<br/>
	<h4>
		LISTA REGISTROS VENCIDOS
	</h4>
					<span name="vencido">
					${regArrayData.length > 
    0 ? `<h4 class="${regArrayData.length <
    1
					? "" : "color_red"}">
    ${regArrayData.length > 
    1 ? regArrayData.length + " DATAS MODIFICADAS:" : regArrayData.length + " DATA MODIFICADA:"}</h4>` + 
    `${regArrayData.length > 0 ?
					 `<ul class="boxe_lista scroll_bar">` +
					 Array.from(regArrayData.values()).map((registro, index) => `<li>${index + 1}. ${registro} &nbsp;</li>`)
					.join("") + `</ul>`: `<h4>NENHUMA DATA MODIFICADA</h4>`}` 
    : `<h4>NENHUMA DATA MODIFICADA
					</h4>`}
					
					</span>
				</div>
	`;
}

corpo.innerHTML = div_corpo(registros,  regArrayData, registrosUnico, cpfsRepetidos, cpfCounts);

// rodape.appendChild(span);
rodape.innerHTML = div_rodape(registros, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep);
}

function copias(event) {
let textoCompleto = [];
const lista = document.querySelectorAll(".lista_ajustada li");

lista.forEach((item, index) => {
	const reg = item.textContent.trim();
		textoCompleto.push(reg);
});

const textoComQuebras = textoCompleto.join("\n");
const copiados = document.querySelector("#copiados");


		navigator.clipboard
			.writeText(textoComQuebras)
			.then(() => {
				// Cria os elementos <li> dinamicamente
				

				// Insere os itens na <ul> dentro do container

				copiados.innerHTML = `
                
                
                <div>
                <h4>
                ITENS COPIADOS
                </h4>
                    <ul class="boxe_lista  scroll_bar">
                        ${textoCompleto.
                        map(item => `<li>${item}</li>`).join("")}
                    </ul>
        </div>
      <div>
                <h4>
                ITENS COPIADOS
                </h4>
      <section id="sec_cop_input">
       
      <textarea class="labelLista" name="" id="" rows="8" cols="">${textoCompleto.
      map(item => item).join("\n")}</textarea>
      </section>
                </div>
            `;

				console.log("Texto copiado e exibido na lista!");
			})
			.catch(err => {
				console.error("Erro ao copiar texto: ", err);
			});
}

// function ajustarRegistros() {


// 	const atual = dataFim();
	
// 	// Obter o conteúdo do elemento <label>
// 	const label = document.getElementById("listasText").value.trim();

// 	if (!label) {
// 		mostrarMensagem("Nenhum registro encontrado!", "erro");
// 		return;
// 	}
// regexRegistro(label);
// 	const regexCPFs = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;

// 	const cpfsSemFormatacao = label.match(regexCPFs) || [];

// 	const cpfsFormatados = cpfsSemFormatacao.map(cpf => cpf.replace(/[^\d]/g, ""));

// 	const cpfCounts = cpfsFormatados.reduce((acc, cpf) => {
// 		acc[cpf] = (acc[cpf] || 0) + 1;
// 		return acc;
// 	}, {});

// 	const cpfsRepetidos = Object.keys(cpfCounts).filter(cpf => cpfCounts[cpf] > 2);

// 	const registros = label.split(/(?<=\d{11})\s+/);

// // registros.forEach((item, index) => {
// // 	const partes = item.split(";");
// // 	if (partes[0].length !== 11 || partes[5].length !== 11) {
		
// // 	}
	
// // });
// // 
// const regArrayCpf = [];
// const regArrayCpfs = [];
// registros.forEach((item, index) => {
// 	const partes = item.split(";");
	
// 	const ob = {
// 		cpf: partes[0],
// 		reg: item
// 	};
// 	regArrayCpfs.push(ob);
// 	regArrayCpf.push(partes[0]);
	
// });
// const ArrayReg = Array.from(regArrayCpfs.values());

// 	const cpfs = regArrayCpf.map(cpf => cpf.replace(/[^\d]/g, ""));
// 	const cpfsRep = cpfs.reduce((acc, cpf) => {
// 		acc[cpf] = (acc[cpf] || 0) + 1;
// 		return acc;
// 	}, {});
// 	const CPFsduplicidades = Object.keys(cpfsRep).filter(cpf => cpfsRep[cpf] > 1);

// 	const regArray = [];
// 	const regArrayMod = [];
// 	const regArrayData = [];
// 	// Ajustar nome e data final, validar CPF
// 	// Obtenha a data
// 	function obterDataReg() {
// 		// Obter a data e hora atual do dispositivo
// 		const dataHoraAtual = new Date();

// 		// Formatar a data e hora para o formato correto
// 		const ano = dataHoraAtual.getFullYear();
// 		const mes = String(dataHoraAtual.getMonth() + 1).padStart(2, "0");
// 		const dia = String(dataHoraAtual.getDate()).padStart(2, "0");
// 		const horas = String(dataHoraAtual.getHours()).padStart(2, "0");
// 		const minutos = String(dataHoraAtual.getMinutes()).padStart(2, "0");
// 		const segundos = String(dataHoraAtual.getSeconds()).padStart(2, "0");
// 		const milisegundos = String(dataHoraAtual.getMilliseconds()).padStart(2, "0");

// 		const dataReg = `${ano}-${mes}-${dia}`;
// 		return dataReg;
// 	}
// 	// Criar um conjunto para armazenar CPFs únicos
// 	const cpfsRegistrados = new Set();
// 	let registrosRegistrados = [];
// 	if (registros[0] !== "") {
// 		registros.forEach(item => {
// 			const parte = item.split(";");
// 			const cpfSemFormatacao = parte[0].replace(/[^\d]/g, "");
// 			const cpfValido = validarCPF(cpfSemFormatacao);
// 			if (parte[0] !== "") {
// 				// Verificar se o CPF já foi registrado
// 				if (cpfValido && !cpfsRegistrados.has(cpfSemFormatacao)) {
					
// 					const dias = difDatas(obterDataReg(), parte[3]);
					
// 					const nomeCompleto = parte[1]
// 						.trim()
// 						.toUpperCase()
// 						.normalize("NFD")
// 						.replace(/[\u0300-\u036f]/g, "")
// 						.split(" ");
// 					const nome = nomeCompleto[0];
// 					const sobreNome = nomeCompleto[nomeCompleto.length - 1];
// 					const nomeRegistro = nome + " " + sobreNome;

// 					parte[0] = cpfSemFormatacao;
// 					parte[5] = parte[5].replace(/[^\d]/g, "");
// 					parte[1] = nomeRegistro;
// const registroObj = {
// 	cpfUm: parte[0].replace(/[^\d]/g, ""),
// 	nome: nomeRegistro,
// 	dataFinal: parte[2],
// 	dataInicial: parte[3],
// 	digito: "1",
// 	cpfDois: parte[5].replace(/[^\d]/g, "")
// };
// 					if (dias < 90) {
// 						let dataMod = [
// 							`${parte[0]}`,`${parte[1]}`, `${parte[2]}`, `${(parte[3] = atual)}`, `${parte[4]}`, `${parte[5]}`];
// 						let regMods = [``,
// 						`${parte[0]}`, `${parte[1]}`, `${parte[2]}`, `${(parte[3] = atual)}`, `erro`];
// 						let regMod = {
// 							id: ``,
// 							cpf: `${parte[0]}`,
// 							nome: `${parte[1]}`,
// 							dataInicio: `${parte[2]}`,
// 							dataFim: `${(parte[3] = atual)}`,
// 							resultado: `erro`
// 						};
// 						regArrayData.push(dataMod.join(";"));
// 						regArray.push(parte.join(";"));
// 						regArrayMod.push(regMods.join(";"));
// registrosRegistrados.push(registroObj);
// 						localStorage.setItem("regStorage", JSON.stringify(regArray));
// 					} else {
// 						let regMods = [``,
// 						`${parte[0]}`, `${parte[1]}`, `${parte[2]}`, `${parte[3]}`, `sucesso`];

// 						regArray.push(parte.join(";"));
// 						regArrayMod.push(regMods.join(";"));
// 						registrosRegistrados.push(registroObj);
// 					}

// 					//   else {
// 					//   	let regMods =
// 					//       {
// 					//       	id: ``,
// 					//       	cpf: `${parte[0]}`,
// 					//       	nome: `${parte[1]}`,
// 					//       	dataInicio: `${parte[2]}`,
// 					//       	dataFim: `${parte[3]}`,
// 					//       	resultado: `sucesso`}
// 					//       	;

// 					//       regArray.push(parte.join(";"));
// 					//       regArrayMod.push(regMods.join(";"));

// 					//localStorage.setItem("regStorages", JSON.stringify(regArrayMod));

// 					//   }

// 					// Adicionar CPF ao conjunto para evitar duplicação
// 					cpfsRegistrados.add(cpfSemFormatacao);
					
// 					mostrarMensagem("Verificação concluída com sucesso!", "sucesso");
// 				}
// 			} else {
// 				mostrarMensagem("Verificação não foi concluída com sucesso!", "erro");
// 			}
// 		});
		
// 		const registrosUnico = regArray.reduce((acc, registro) => {
// 			const cpf = registro.match(/\b\d{11}\b/g)?.[0];
// 			if (cpf && !acc.has(cpf)) {
// 				acc.set(cpf, registro);
// 			}
// 			return acc;
// 		}, new Map());


// 		const registrosData = regArrayData.reduce((acc, registro) => {
// 			const cpf = registro.match(/\b\d{11}\b/g)?.[0];
// 			if (cpf && !acc.has(cpf)) {
// 				acc.set(cpf, registro);
// 			}
// 			return acc;
// 		}, new Map());
		
// 			function encontrarCpfsRepetidos(regArrayCpfs) {
//     const cpfCounts = new Map();

//     // Contar a frequência de cada CPF
//     regArrayCpfs.forEach(obj => {
//         const cpf = obj.cpf;
//         cpfCounts.set(cpf, (cpfCounts.get(cpf) || 0) + 1);
//     });

//     // Filtrar apenas os objetos cujo CPF aparece mais de uma vez
//     const repetidos = regArrayCpfs.filter(obj => cpfCounts.get(obj.cpf) > 1);

//     return repetidos;
// }

// // Exemplo de array de objetos

// const resultado = encontrarCpfsRepetidos(regArrayCpfs);


// 		function marcarCpf() {
// 			const negrito = document.querySelectorAll(".negrito");
// 			negrito.forEach((it, index) => {
// 				it.addEventListener("click", event => {
// 					const target = event.target;
// 					const liB = it.querySelector("b");
// 					liB.classList.toggle("color_green");
// 				});
// 			});
// 		}
// 		marcarCpf();
// 		resEstaci(registros, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep);
// 	} else if (registros[0] == "") {
// 		mostrarMensagem("Verificação não foi concluída com sucesso!", "erro");
// 		return;
// 	}
// }



function ajustarRegistros() {


	const atual = dataFim();
	
	// Obter o conteúdo do elemento <label>
	const label = document.getElementById("listasText").value.trim();

	if (!label) {
		mostrarMensagem("Nenhum registro encontrado!", "erro");
		return;
	}
 regexRegistro(label);
	const regexCPFs = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;

	const cpfsSemFormatacao = label.match(regexCPFs) || [];

	const cpfsFormatados = cpfsSemFormatacao.map(cpf => cpf.replace(/[^\d]/g, ""));

	const cpfCounts = cpfsFormatados.reduce((acc, cpf) => {
		acc[cpf] = (acc[cpf] || 0) + 1;
		return acc;
	}, {});

	const cpfsRepetidos = Object.keys(cpfCounts).filter(cpf => cpfCounts[cpf] > 2);

	const registros = label.split(/(?<=\d{11})\s+/);

// registros.forEach((item, index) => {
// 	const partes = item.split(";");
// 	if (partes[0].length !== 11 || partes[5].length !== 11) {
		
// 	}
	
// });
// 
const regArrayCpf = [];
const regArrayCpfs = [];
registros.forEach((item, index) => {
	const partes = item.split(";");
	
	const ob = {
		cpf: partes[0],
		reg: item
	};
	regArrayCpfs.push(ob);
	regArrayCpf.push(partes[0]);
	
});
const ArrayReg = Array.from(regArrayCpfs.values());

	const cpfs = regArrayCpf.map(cpf => cpf.replace(/[^\d]/g, ""));
	const cpfsRep = cpfs.reduce((acc, cpf) => {
		acc[cpf] = (acc[cpf] || 0) + 1;
		return acc;
	}, {});
	const CPFsduplicidades = Object.keys(cpfsRep).filter(cpf => cpfsRep[cpf] > 1);

	const regArray = [];
	const regArrayMod = [];
	const regArrayData = [];
	// Ajustar nome e data final, validar CPF
	// Obtenha a data
	function obterDataReg() {
		// Obter a data e hora atual do dispositivo
		const dataHoraAtual = new Date();

		// Formatar a data e hora para o formato correto
		const ano = dataHoraAtual.getFullYear();
		const mes = String(dataHoraAtual.getMonth() + 1).padStart(2, "0");
		const dia = String(dataHoraAtual.getDate()).padStart(2, "0");
		const horas = String(dataHoraAtual.getHours()).padStart(2, "0");
		const minutos = String(dataHoraAtual.getMinutes()).padStart(2, "0");
		const segundos = String(dataHoraAtual.getSeconds()).padStart(2, "0");
		const milisegundos = String(dataHoraAtual.getMilliseconds()).padStart(2, "0");

		const dataReg = `${ano}-${mes}-${dia}`;
		return dataReg;
	}
	// Criar um conjunto para armazenar CPFs únicos
	const cpfsRegistrados = new Set();
	let registrosRegistrados = [];
	if (registros[0] !== "") {
		registros.forEach((item, index) => {
			const parte = item.split(";");
			const cpfSemFormatacao = parte[0].replace(/[^\d]/g, "");
			const cpfValido = validarCPF(cpfSemFormatacao);
			if (parte[0] !== "") {
				// Verificar se o CPF já foi registrado
				if (cpfValido && !cpfsRegistrados.has(cpfSemFormatacao)) {
					
					const dias = difDatas(obterDataReg(), parte[3]);
					console.log(dias, item,"dias item");
					const nomeCompleto = parte[1]
						.trim()
						.toUpperCase()
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "")
						.split(" ");
					const nome = nomeCompleto[0];
					const sobreNome = nomeCompleto[nomeCompleto.length - 1];
					const nomeRegistro = nome + " " + sobreNome;

					parte[0] = cpfSemFormatacao;
					parte[5] = parte[5].replace(/[^\d]/g, "");
					parte[1] = nomeRegistro;
const registroObj = {
	cpfUm: parte[0].replace(/[^\d]/g, ""),
	nome: nomeRegistro,
	dataFinal: parte[2],
	dataInicial: parte[3],
	digito: "1",
	cpfDois: parte[5].replace(/[^\d]/g, "")
};
					if (dias < 90) {
						let dataMod = [
							`${parte[0]}`,`${parte[1]}`, `${parte[2]}`, `${(parte[3] = atual)}`, `${parte[4]}`, `${parte[5]}`];
						let regMods = [``,
						`${parte[0]}`, `${parte[1]}`, `${parte[2]}`, `${(parte[3] = atual)}`, `erro`];
						let regMod = {
							id: ``,
							cpf: `${parte[0]}`,
							nome: `${parte[1]}`,
							dataInicio: `${parte[2]}`,
							dataFim: `${(parte[3] = atual)}`,
							resultado: `erro`
						};
						regArrayData.push(dataMod.join(";"));
						regArray.push(parte.join(";"));
						regArrayMod.push(regMods.join(";"));
registrosRegistrados.push(registroObj);
						localStorage.setItem("regStorage", JSON.stringify(regArray));
					} else {
						let regMods = [``,
						`${parte[0]}`, `${parte[1]}`, `${parte[2]}`, `${parte[3]}`, `sucesso`];

						regArray.push(parte.join(";"));
						regArrayMod.push(regMods.join(";"));
						registrosRegistrados.push(registroObj);
					}

					//   else {
					//   	let regMods =
					//       {
					//       	id: ``,
					//       	cpf: `${parte[0]}`,
					//       	nome: `${parte[1]}`,
					//       	dataInicio: `${parte[2]}`,
					//       	dataFim: `${parte[3]}`,
					//       	resultado: `sucesso`}
					//       	;

					//       regArray.push(parte.join(";"));
					//       regArrayMod.push(regMods.join(";"));

					//localStorage.setItem("regStorages", JSON.stringify(regArrayMod));

					//   }

					// Adicionar CPF ao conjunto para evitar duplicação
					cpfsRegistrados.add(cpfSemFormatacao);
					
					mostrarMensagem("Verificação concluída com sucesso!", "sucesso");
				}
			} else {
				mostrarMensagem("Verificação não foi concluída com sucesso!", "erro");
			}
		});
		
		const registrosUnico = regArray.reduce((acc, registro) => {
			const cpf = registro.match(/\b\d{11}\b/g)?.[0];
			if (cpf && !acc.has(cpf)) {
				acc.set(cpf, registro);
			}
			return acc;
		}, new Map());


		const registrosData = regArrayData.reduce((acc, registro) => {
			const cpf = registro.match(/\b\d{11}\b/g)?.[0];
			if (cpf && !acc.has(cpf)) {
				acc.set(cpf, registro);
			}
			return acc;
		}, new Map());
		
			function encontrarCpfsRepetidos(regArrayCpfs) {
    const cpfCounts = new Map();

    // Contar a frequência de cada CPF
    regArrayCpfs.forEach(obj => {
        const cpf = obj.cpf;
        cpfCounts.set(cpf, (cpfCounts.get(cpf) || 0) + 1);
    });

    // Filtrar apenas os objetos cujo CPF aparece mais de uma vez
    const repetidos = regArrayCpfs.filter(obj => cpfCounts.get(obj.cpf) > 1);

    return repetidos;
}

// Exemplo de array de objetos

const resultado = encontrarCpfsRepetidos(regArrayCpfs);


		function marcarCpf() {
			const negrito = document.querySelectorAll(".negrito");
			negrito.forEach((it, index) => {
				it.addEventListener("click", event => {
					const target = event.target;
					const liB = it.querySelector("b");
					liB.classList.toggle("color_green");
				});
			});
		}
		marcarCpf();
		resEstaci(registros, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep);
	} else if (registros[0] == "") {
		mostrarMensagem("Verificação não foi concluída com sucesso!", "erro");
		return;
	}
}



// function analisarRegistros() {
// 	const atual = dataFim();
// 	const resultado = document.querySelector("#resultado");
// 	const box_res_footer = document.querySelector(".box_resultados_footers");

// 	const divResCpfRepetido = document.createElement("div");

// 	const divResDom = document.createElement("div");

// 	const divRes = document.createElement("div");

// 	const divResOver = document.createElement("div");

// 	box_res_footer.innerHTML = ``;

// 	// Obter o conteúdo do elemento <label>
// 	const label = document.getElementById("listasText").value.trim();
// 	// Se label estiver vazio, exibe erro e para execução
// 	if (!label) {
// 		mostrarMensagem("Nenhum registro encontrado!", "erro");
// 		return;
// 	}

// 	regexRegistro(label);
// 	const regexCPFs = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;

// 	const cpfsSemFormatacao = label.match(regexCPFs) || [];

// 	const cpfsFormatados = cpfsSemFormatacao.map(cpf => cpf.replace(/[^\d]/g, ""));

// 	const cpfCounts = cpfsFormatados.reduce((acc, cpf) => {
// 		acc[cpf] = (acc[cpf] || 0) + 1;
// 		return acc;
// 	}, {});

// 	const cpfsRepetidos = Object.keys(cpfCounts).filter(cpf => cpfCounts[cpf] > 2);

// 	const registros = label.split(/(?<=\d{11})\s+/);
// // 
// const regArrayCpf = [];
// const regArrayCpfs = [];
// registros.forEach((item, index) => {
// 	const partes = item.split(";");
// 	const ob = {
// 		cpf: partes[0],
// 		reg: item
// 	};
// 	regArrayCpfs.push(ob);
// 	regArrayCpf.push(partes[0]);
	
// });
// const ArrayReg = Array.from(regArrayCpfs.values());

// 	const cpfs = regArrayCpf.map(cpf => cpf.replace(/[^\d]/g, ""));
// 	const cpfsRep = cpfs.reduce((acc, cpf) => {
// 		acc[cpf] = (acc[cpf] || 0) + 1;
// 		return acc;
// 	}, {});
// 	const CPFsduplicidades = Object.keys(cpfsRep).filter(cpf => cpfsRep[cpf] > 1);
// 	// const cpfsRepe = regArrayCpfs.reduce((acc, cpfs) => {
// 	// 	acc[cpfs.cpf] = (acc[cpfs.cpf] || 0) + 1;
// 	// 	cpfs.nome = cpfs;
// 	// 	return acc;
// 	// }, {});
	
// // 	function functionName() {
// // 		function encontrarCpfsRepetidos(regArrayCpfs) {
// //     const cpfCounts = new Map();

// //     // Contar a frequência de cada CPF
// //     regArrayCpfs.forEach(obj => {
// //         const cpf = obj.cpf;
// //         cpfCounts.set(cpf, (cpfCounts.get(cpf) || 0) + 1);
// //     });

// //     // Filtrar apenas os objetos cujo CPF aparece mais de uma vez
// //     const repetidos = regArrayCpfs.filter(obj => cpfCounts.get(obj.cpf) > 1);

// //     return repetidos;
// // }

// // // Exemplo de array de objetos
// // // const regArrayCpfs = [
// // //     { cpf: "12345678900", nome: "João" },
// // //     { cpf: "98765432100", nome: "Maria" },
// // //     { cpf: "12345678900", nome: "Pedro" },
// // //     { cpf: "55566677788", nome: "Ana" },
// // //     { cpf: "98765432100", nome: "Carlos" }
// // // ];

// // const resultado = encontrarCpfsRepetidos(regArrayCpfs);
// // console.log(resultado);

// // 	}
	

// function functionNames() {
// 	for (let key in window) {
//     let value = window[key];
//     if (Array.isArray(value)) {
//         console.log(`Array encontrado: ${key}`, value);
//     } else if (value instanceof Set) {
//         console.log(`Set encontrado: ${key}`, value);
//     } else if (value instanceof Map) {
//         console.log(`Map encontrado: ${key}`, value);
//     } else if (typeof value === 'object' && value !== null) {
//         console.log(`Objeto encontrado: ${key}`, value);
//     }
// }

// }
// function functionNamed() {
// 	function listarEstruturas(dados) {
//     for (let chave in dados) {
//         let valor = dados[chave];
//         if (Array.isArray(valor)) {
//             console.log(`Array: ${chave}`, valor);
//         } else if (valor instanceof Set) {
//             console.log(`Set: ${chave}`, Array.from(valor));
//         } else if (valor instanceof Map) {
//             console.log(`Map: ${chave}`, Array.from(valor.entries()));
//         } else if (typeof valor === 'object' && valor !== null) {
//             console.log(`Objeto: ${chave}`, valor);
//         }
//     }
// }

// // Exemplo de uso:
// let minhaAplicacao = {
//     regArrayCpf: regArrayCpf,
//     cpfsRep: cpfsRep,
    
// };

// listarEstruturas(minhaAplicacao);

// }
// //console.log(window); // No navegador
// //console.log(globalThis); // Para ambientes diferentes, como Node.js

// // functionName();
// // functionNamed();
// // 
// 	const regArray = [];
// 	const regArrayMod = [];
// 	const regArrayData = [];
// 	// Ajustar nome e data final, validar CPF
// 	// Obtenha a data
// 	function obterDataReg() {
// 		// Obter a data e hora atual do dispositivo
// 		const dataHoraAtual = new Date();

// 		// Formatar a data e hora para o formato correto
// 		const ano = dataHoraAtual.getFullYear();
// 		const mes = String(dataHoraAtual.getMonth() + 1).padStart(2, "0");
// 		const dia = String(dataHoraAtual.getDate()).padStart(2, "0");
// 		const horas = String(dataHoraAtual.getHours()).padStart(2, "0");
// 		const minutos = String(dataHoraAtual.getMinutes()).padStart(2, "0");
// 		const segundos = String(dataHoraAtual.getSeconds()).padStart(2, "0");
// 		const milisegundos = String(dataHoraAtual.getMilliseconds()).padStart(2, "0");

// 		const dataReg = `${ano}-${mes}-${dia}`;
// 		return dataReg;
// 	}
// 	// Criar um conjunto para armazenar CPFs únicos
// 	const cpfsRegistrados = new Set();
// 	// const registrosRegistrados = new Array();
// 	let registrosRegistrados = [];
// 	if (registros[0] !== "") {
// 		registros.forEach(item => {
// 			const parte = item.split(";");
// 			const cpfSemFormatacao = parte[0].replace(/[^\d]/g, "");
// 			const cpfValido = validarCPF(cpfSemFormatacao);
// 			if (parte[0] !== "") {
// 				// Verificar se o CPF já foi registrado
// 				if (cpfValido && !cpfsRegistrados.has(cpfSemFormatacao)) {
					
// 					const dias = difDatas(obterDataReg(), parte[3]);
					
// 					const nomeCompleto = parte[1]
// 						.trim()
// 						.toUpperCase()
// 						.normalize("NFD")
// 						.replace(/[\u0300-\u036f]/g, "")
// 						.split(" ");
// 					const nome = nomeCompleto[0];
// 					const sobreNome = nomeCompleto[nomeCompleto.length - 1];
// 					const nomeRegistro = nome + " " + sobreNome;

// 					parte[0] = cpfSemFormatacao;
// 					parte[5] = parte[5].replace(/[^\d]/g, "");
// 					parte[1] = nomeRegistro;
// const registroObj = {
// 	cpfUm: parte[0].replace(/[^\d]/g, ""),
// 	nome: nomeRegistro,
// 	dataFinal: parte[2],
// 	dataInicial: parte[3],
// 	digito: "1",
// 	cpfDois: parte[5].replace(/[^\d]/g, "")
// };
// 					if (dias < 90) {
// 						let dataMod = [
// 							`${parte[0]}`,`${parte[1]}`, `${parte[2]}`, `${(parte[3] = atual)}`, `${parte[4]}`, `${parte[5]}`];
// 						let regMods = [``,
// 						`${parte[0]}`, `${parte[1]}`, `${parte[2]}`, `${(parte[3] = atual)}`, `erro`];
// 						let regMod = {
// 							id: ``,
// 							cpf: `${parte[0]}`,
// 							nome: `${parte[1]}`,
// 							dataInicio: `${parte[2]}`,
// 							dataFim: `${(parte[3] = atual)}`,
// 							resultado: `erro`
// 						};
// 						regArrayData.push(dataMod.join(";"));
// 						regArray.push(parte.join(";"));
// 						regArrayMod.push(regMods.join(";"));
// registrosRegistrados.push(registroObj);
// 						localStorage.setItem("regStorage", JSON.stringify(regArray));
// 					} else {
// 						let regMods = [``,
// 						`${parte[0]}`, `${parte[1]}`, `${parte[2]}`, `${parte[3]}`, `sucesso`];

// 						regArray.push(parte.join(";"));
// 						regArrayMod.push(regMods.join(";"));
// 						registrosRegistrados.push(registroObj);
// 					}

// 					//   else {
// 					//   	let regMods =
// 					//       {
// 					//       	id: ``,
// 					//       	cpf: `${parte[0]}`,
// 					//       	nome: `${parte[1]}`,
// 					//       	dataInicio: `${parte[2]}`,
// 					//       	dataFim: `${parte[3]}`,
// 					//       	resultado: `sucesso`}
// 					//       	;

// 					//       regArray.push(parte.join(";"));
// 					//       regArrayMod.push(regMods.join(";"));

// 					//localStorage.setItem("regStorages", JSON.stringify(regArrayMod));

// 					//   }

// 					// Adicionar CPF ao conjunto para evitar duplicação
// 					cpfsRegistrados.add(cpfSemFormatacao);
					
// 					mostrarMensagem("Verificação concluída com sucesso!", "sucesso");
// 				}
// 			} else {
// 				mostrarMensagem("Verificação não foi concluída com sucesso!", "erro");
// 			}
// 		});
		
// 		const registrosUnico = regArray.reduce((acc, registro) => {
// 			const cpf = registro.match(/\b\d{11}\b/g)?.[0];
// 			if (cpf && !acc.has(cpf)) {
// 				acc.set(cpf, registro);
// 			}
// 			return acc;
// 		}, new Map());


// 		const registrosData = regArrayData.reduce((acc, registro) => {
// 			const cpf = registro.match(/\b\d{11}\b/g)?.[0];
// 			if (cpf && !acc.has(cpf)) {
// 				acc.set(cpf, registro);
// 			}
// 			return acc;
// 		}, new Map());
		
// 			function encontrarCpfsRepetidos(regArrayCpfs) {
//     const cpfCounts = new Map();

//     // Contar a frequência de cada CPF
//     regArrayCpfs.forEach(obj => {
//         const cpf = obj.cpf;
//         cpfCounts.set(cpf, (cpfCounts.get(cpf) || 0) + 1);
//     });

//     // Filtrar apenas os objetos cujo CPF aparece mais de uma vez
//     const repetidos = regArrayCpfs.filter(obj => cpfCounts.get(obj.cpf) > 1);

//     return repetidos;
// }

// // Exemplo de array de objetos

// const resultado = encontrarCpfsRepetidos(regArrayCpfs);

// 		const resultadoDom = () => {
// 			return `
//   	<h6 class=" color_green">
//   	${registros.length > 
//   	1 ? registros.length + " Registros Foram Analisados." : registros.length == 0 ? "Nenhum Registro Foi Analisado." : registros.length + " Registro Foi Analisado."}  
//   	</h6>
  
//   	<p>
//   	${ulLista.length > 
//   	1 ? ulLista.length + " CPF's Encontrados em Mais de Um Registro." : ulLista.length === 1 ? ulLista.length + " CPF Encontrado em Mais de Um Registro." : "Nenhum CPF Duplicado."} 
// 	</p>
//   	<p>
//   ${regArrayData.length > 
//   1 ? regArrayData.length + " Datas de Registros Ajustados." : regArrayData.length === 1 ? regArrayData.length + " Data de Registro Ajustado." : "Nenhuma Data de Registro Ajustada."}
// 	</p>
  	
  	
//   	<h6 class="color_red">
//   	${
// 				registros.length - Array.from(registrosUnico.values()).length > 1
// 					? registros.length - Array.from(registrosUnico.values()).length + " Registros Foram Excluídos!"
// 					: registros.length - Array.from(registrosUnico.values()).length + " Registro Foi Excluído!"
// 			}
//   	</h6>
  	
//   	<h6 class="color_green">
//   	${
// 				Array.from(registrosUnico.values()).length > 1
// 					? Array.from(registrosUnico.values()).length + " REGISTROS  AJUSTADOS E PRONTOS PARA USO!"
// 					: Array.from(registrosUnico.values()).length + " REGISTRO AJUSTADO E PRONTO PARA USO!"
// 			}  
//   	</h6>
  	
  
//   <!--
//   <h6 class="color_red">
//   	${
// 				registros.length - Array.from(registrosUnico.values()).length > 1
// 					? registros.length - Array.from(registrosUnico.values()).length + " Registros Foram Excluídos!"
// 					: registros.length - Array.from(registrosUnico.values()).length === 0
// 					? "Nenhum Registro Foi Excluído!"
// 					: registros.length - Array.from(registrosUnico.values()).length + " Registro Foi Excluído!"
// 			}
//   	</h6>
  	
//   		<h6 class="color_green">
//   	(Sem Repetição de CPF + Vencimento ${atual.split("-").reverse().join("/")})
//   	REGISTROS ANALISADOS, AJUSTADOS E PRONTOS PARA USO!
//   		</h6>
//   	-->
//   	`;
// 		};

// 		const divsDom = () => {
// 			return `
// 		<h3>
// 		Registros Ajustados:
// 		</h3>
//   <ul class="box_listas scroll_bar">
//       ${Array.
//       from(registrosUnico.values())
// 							.map(
// 								(registro, index) => `
// 							<!--
// 							<li>
// 							${index + 1}.
// 							</li>
// 							<li>&nbsp; ${registro} &nbsp;</li>
// 							-->
// 							<li> ${registro} </li>`
// 							)
// 							.join("")}
//   </ul>
//   	`;
// 		};

// // 		const resCpfRepetido = () => {
// // 			return `
// //     <h3>  
// //     ${cpfsRepetidos.length > 
// //     1 ? cpfsRepetidos.length + " CPFs Duplicados:" : cpfsRepetidos.length + " CPF Duplicado:"}
// //             </h3>
           
// //             <ul class="box_listas box_lista_ul scroll_bar">
// //           ${cpfsRepetidos
// // 												.map(
// // 													(registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> foi  encontrado em ${Math.floor(cpfCounts[registro] / 2)} registros. 
// //                 ${Math.floor(cpfCounts[registro] / 2 - 1) > 1 ? cpfCounts[registro] / 2 - 1 + " Registros Foram Excluídos &nbsp;" : cpfCounts[registro] / 2 - 1 + " Registro Foi Excluído &nbsp;"}
// // </li>`
// // 												)
// // 												.join("")}
// //             </ul>
   
// //     <h3>  
// //     ${regArrayData.length > 
// //     1 ? regArrayData.length + " Datas Modificadas:" : regArrayData.length + " Data Modificada:"}
// //             </h3>
           
// //   <ul class="box_listas scroll_bar">
// //     ${Array.
// //     from(regArrayData.values())
// // 					.map((registro, index) => `<li>&nbsp;${index + 1}. ${registro} &nbsp;</li>`)
// // 					.join("")}
// // </ul>

// //     `;
// // 		};
	
// 		const resCpfRepetido = () => {
// 			return `
//     <h3>  
//     ${cpfsRepetidos.length > 
//     1 ? cpfsRepetidos.length + " CPFs Duplicados:" : cpfsRepetidos.length + " CPF Duplicado:"}
//             </h3>
           
//             <ul class="box_listas box_lista_ul scroll_bar">
//           ${cpfsRepetidos
// 												.map(
// 													(registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> foi  encontrado em ${Math.floor(cpfCounts[registro] / 2)} registros. 
//                 ${Math.floor(cpfCounts[registro] / 2 - 1) > 1 ? cpfCounts[registro] / 2 - 1 + " Registros Foram Excluídos &nbsp;" : cpfCounts[registro] / 2 - 1 + " Registro Foi Excluído &nbsp;"}
// </li>`
// 												)
// 												.join("")}
//             </ul>
            
 
//     <h3>  
//     ${regArrayData.length > 
//     1 ? regArrayData.length + " Datas Modificadas:" : regArrayData.length + " Data Modificada:"}
//             </h3>
           
//   <ul class="box_listas scroll_bar">
//     ${Array.
//     from(regArrayData.values())
// 					.map((registro, index) => `<li>&nbsp;${index + 1}. ${registro} &nbsp;</li>`)
// 					.join("")}
// </ul>

//     `;
// 		};
	
// // 		const resCpfRepetido = () => {
// // 			return `
// //     <h3>  
// //     ${cpfsRepetidos.length > 
// //     1 ? cpfsRepetidos.length + " CPFs Duplicados:" : cpfsRepetidos.length + " CPF Duplicado:"}
// //             </h3>
           
// //             <ul class="box_listas box_lista_ul scroll_bar">
// //           ${cpfsRepetidos.map((registro, index) => `<li class="negrito">&nbsp;${index + 1}. O CPF <b> ${registro} </b> foi  encontrado em ${Math.floor(cpfCounts[registro] / 2)} registros. 
// //                 ${Math.floor(cpfCounts[registro] / 2 - 1) > 1 ? cpfCounts[registro] / 2 - 1 + " Registros Foram Excluídos &nbsp;" : cpfCounts[registro] / 2 - 1 + " Registro Foi Excluído &nbsp;"}
// // </li>`
// // 												)
// // 												.join("")}
// //             </ul>
   
// //     <h3>  
// // registros
// //             </h3>
           
// //             <ul class="box_listas box_lista_ul scroll_bar">
// //                   ${Object.values(registrosRegistrados)
// // 					.map((registro, index) => `<li>&nbsp;${index + 1}. ${registro} &nbsp;</li>`)
// // 					}
// //             </ul>
   
// //     <h3>  
// //     ${regArrayData.length > 
// //     1 ? regArrayData.length + " Datas Modificadas:" : regArrayData.length + " Data Modificada:"}
// //             </h3>
           
// //   <ul class="box_listas scroll_bar">
// //     ${Array.
// //     from(regArrayData.values())
// // 					.map((registro, index) => `<li>&nbsp;${index + 1}. ${registro} &nbsp;</li>`)
// // 					.join("")}
// // </ul>

// //     `;
// // 		};

// 		box_res_footer.appendChild(divResDom);
// 		divResDom.classList.add("divResDom"); //resultadoDom
// 		divResDom.classList.add("resultadoDom"); //resultadoDom

// 		divResOver.appendChild(divRes);
// 		divResOver.appendChild(divResCpfRepetido);
// 		box_res_footer.appendChild(divResOver);
// 		// box_res_footer.appendChild(divRes);
// 		// box_res_footer.appendChild(divResCpfRepetido);
// 		divResOver.classList.add("divResOver");
// 		divRes.classList.add("divRes");
// 		divResCpfRepetido.classList.add("divResCpfRepetido");
// 		divResCpfRepetido.innerHTML = resCpfRepetido();

// 		divRes.innerHTML = divsDom();

// 		//

// 		//

// 		const ulListasLenght = document.querySelectorAll(".box_resultados_footers .box_listas li");

// 		const ulLista = document.querySelectorAll(".box_lista_ul li");
// 		divResDom.innerHTML = resultadoDom();

// 		//
// 		//

// 		// exibirListaRegistros(regArrayMod);
// 		exibirListaRegistros(regArrayMod);
// 		// mostrarMensagem("texto bom", "Ativo");
// 		function marcarCpf() {
// 			const negrito = document.querySelectorAll(".negrito");
// 			negrito.forEach((it, index) => {
// 				it.addEventListener("click", event => {
// 					const target = event.target;
// 					const liB = it.querySelector("b");
// 					liB.classList.toggle("color_green");
// 				});
// 			});
// 		}
// 		marcarCpf();
// 		resEstacionamento(registros, ulLista, regArrayData, registrosUnico, cpfsRepetidos, cpfCounts,cpfsRep)
// 	} else if (registros[0] == "") {
// 		mostrarMensagem("Verificação não foi concluída com sucesso!", "erro");
// 		return;
// 	}
// }

// function analisarRegistro() {
// 	const dadosAnalise = {}; // Objeto global para armazenar as estruturas

// function analisarReg() {
//     const regArrayCpf = [];
//     const regArray = [];
//     const regArrayMod = [];
//     const regArrayData = [];
//     const cpfsRep = {};
//     const cpfsRegistrados = new Set();
//     let registrosRegistrados = [];
//     const registrosUnico = new Map();
//     const registrosData = new Map();

//     // Adicionar as estruturas ao objeto de análise
//     dadosAnalise.regArrayCpf = regArrayCpf;
//     dadosAnalise.regArray = regArray;
//     dadosAnalise.regArrayMod = regArrayMod;
//     dadosAnalise.regArrayData = regArrayData;
//     dadosAnalise.cpfsRep = cpfsRep;
//     dadosAnalise.cpfsRegistrados = cpfsRegistrados;
//     dadosAnalise.registrosRegistrados = registrosRegistrados;
//     dadosAnalise.registrosUnico = registrosUnico;
//     dadosAnalise.registrosData = registrosData;

//     // Lógica da função continua...
// }

// function listarEstruturas(dados) {
//     for (let chave in dados) {
//         let valor = dados[chave];
//         if (Array.isArray(valor)) {
//             console.log(`Array: ${chave}`, valor);
//         } else if (valor instanceof Set) {
//             console.log(`Set: ${chave}`, Array.from(valor));
//         } else if (valor instanceof Map) {
//             console.log(`Map: ${chave}`, Array.from(valor.entries()));
//         } else if (typeof valor === 'object' && valor !== null) {
//             console.log(`Objeto: ${chave}`, valor);
//         }
//     }
// }

// // Chamar após executar `analisarRegistros()`
// listarEstruturas(dadosAnalise);
// }

function functionNamed() {
	const label = document.getElementById("listasText").value.trim();
	const regexCPFs = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;
	const cpfsExtraidos = label.match(regexCPFs) || [];
	const cpfsFormatados = cpfsExtraidos.map(cpf => cpf.replace(/\D/g, ""));
	const cpfsValidos = cpfsFormatados.filter(validarCPF);
}

function difDatas(dinicio, dfim) {
	const diffInMs = new Date(dfim) - new Date(dinicio);
	const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
	return diffInDays;
}

// function ajusteRegistros() {
// 	const listaCpfs = [];
// 	const listaRegistros = [];
// 	const listaRegistrosRepetidos = [];
// 	const registr = `
// 021.752.030-85;MAURICIO MARQUES RIOS;2024-09-20;2025-02-28;1;021.752.030-85 
// 86569929020;MAURICIO VANDER HOLIFIELD;2024-09-20;2025-03-02;1;86569929020
// 93603835034;MAURICIO MARQUES RIOS INÁCIO;2025-01-01;2025-09-03;1;93603835034
// 86569929020;MAURICIO MOURA ALBUQUERQUE;2024-09-20;2025-03-02;1;86569929020
// 00997902035;MAURICIO SILVA RAMOS;2024-09-20;2025-03-02;1;00997902035
// `;

// 	// Função para limpar o CPF (remover pontos e traços)
// 	const limparCPF = cpf => cpf.replace(/[.-]/g, "");

// 	// Função para limpar o nome (remover acentos e números)
// 	const limparNome = nome => {
// 		return nome
// 			.normalize("NFD") // Decompor caracteres acentuados
// 			.replace(/[\u0300-\u036f]/g, "") // Remover os acentos
// 			.replace(/\d/g, ""); // Remover números
// 	};

// 	// Processar os registros
// 	const arrayRegistros = registr
// 		.trim() // Remover espaços extras no início e no final
// 		.split("\n") // Separar por linha
// 		.map(linha => {
// 			let campos = linha.split(";"); // Separar os campos pelo ";"
// 			let nomeCompleto = campos[1].split(" ");
// 			nomeCompleto = nomeCompleto[0] + " " + nomeCompleto[nomeCompleto.length - 1];
// 			campos[0] = limparCPF(campos[0]).trim(); // Limpar CPF
// 			// campos[1] = limparNome(campos[1]); // Limpar Nome
// 			campos[1] = limparNome(nomeCompleto); // Limpar Nome
// 			campos[5] = limparCPF(campos[5]).trim(); // Limpar CPF duplicado

// 			listaCpfs.push(campos[0]);
// 			listaCpfs.push(campos[5]);
// 			listaRegistros.push(campos.join(";"));
// 			return campos.join(";"); // Retornar a linha processada
// 		});

// 	//listaRegistros.map((item, index) => {
// 	//	const partes = item.split(";");
// 	//	const parteCpf = partes[0];
// 	//});

// 	// Objeto para armazenar a contagem de CPFs
// 	const contagemCPF = {};

// 	// Processar os registros
// 	listaRegistros.forEach(item => {
// 		const partes = item.split(";"); // Extrair e limpar CPFs (removendo pontos e traços)
// 		const cpf1 = partes[0].replace(/[.-]/g, "");
// 		const cpf2 = partes[5].replace(/[.-]/g, "");

// 		// Incrementar a contagem no objeto para ambos os CPFs
// 		contagemCPF[cpf1] = (contagemCPF[cpf1] || 0) + 1;
// 		contagemCPF[cpf2] = (contagemCPF[cpf2] || 0) + 1;
// 	});

// 	const cpfCount = listaCpfs.reduce((acc, cpf) => {
// 		acc[cpf] = (acc[cpf] || 0) + 1;
// 		return acc;
// 	}, {});

// 	const cpfRepetido = Object.keys(cpfCount).filter(cpf => cpfCount[cpf] > 2);
// }
// ajusteRegistros();

function showLoading() {
	document.getElementById("loading").classList.remove("hidden");
}

function hideLoading() {
	document.getElementById("loading").classList.add("hidden");
}

function mostrarMensagem(texto, tipo) {
	const msg = document.getElementById("mensagem");
	msg.textContent = texto;
	msg.className = `mensagem ${tipo}`;
	msg.classList.remove("hidden");
	setTimeout(() => {
		msg.classList.add("hidden");
	}, 3000);
}

// Exemplo de uso ao clicar em um botão
// document.getElementById("btn_verificar").addEventListener("click", function() {
//     showLoading();
//     setTimeout(() => {
//         hideLoading();
//         mostrarMensagem("Verificação concluída com sucesso!", "sucesso");
//     }, 1000); // Simula um tempo de processamento
// });

// Exemplo de uso
function exibirListaRegistros(registros) {
	const corpoTabela = document.getElementById("lista_corpo");
	corpoTabela.innerHTML = ""; // Limpa antes de adicionar novos dados

	// registros.forEach(reg => {
	//     const linha = document.createElement("tr");
	//     const colunas = reg.split(";");

	//     colunas.forEach((coluna, index) => {
	//         const td = document.createElement("td");
	//         td.textContent = coluna;
	//         linha.appendChild(td);
	//     });
	//         console.log(reg);

	//     corpoTabela.appendChild(linha);
	// });

	const rege = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;
	const regeData = /\d{4}-\d{2}-\d{2}/g;
	registros.forEach((reg, i) => {
		const linha = document.createElement("tr");
		linha.classList.add(`trTd`);
		// const tdDataFim = linha.querySelector("td:nth-child(5)");
		const colunas = reg.split(";");

		colunas.forEach((coluna, index) => {
			const td = document.createElement("td");
			td.textContent = coluna;
			// if (td.textContent == reg.match(rege)) {
			// 	td.textContent = (i + 1) + ". " + coluna;
			// }

			if (td.textContent == "") {
				td.textContent = i + 1;
			}

			if (td.textContent == "erro") {
				td.textContent = "Data Alterada";
			}

			if (td.textContent == "sucesso") {
				td.textContent = "Data Não Alterada";
			}
			if (td.textContent == td.textContent.match(regeData)) {
				//td.textContent = difDatas(obterDataReg(), tdDataFim.textContent);
				// console.log(difDatas(obterDataRegs(), tdDataFim.textContent));
			}
			if (td.textContent == td.textContent.match(regeData)) {
				td.classList.add(`td${i + 1}`);
				// console.log(td.cellIndex === 1);

				td.textContent = td.textContent.split("-").reverse().join("/");
			}

			linha.appendChild(td);
		});

		corpoTabela.appendChild(linha);
	});
	const trTd = document.querySelectorAll(".trTd");
	const tdDatasFims = [...document.querySelectorAll(".trTd:nth-child(5) td")];
	tdDatasFims.style = "background: red";
	trTd.forEach((item, index) => {
		//const tdDatasFim = [...document.querySelector(".trTd td:nth-child(5)")];
		const tdDatasFim = document.querySelectorAll(".trTd td:nth-child(5)");
	//	console.log(tdDatasFim);
		// tdDatasFim.map(it => {
		//});
		//console.log(tdDatasFim.textContent);
	});
}

// Exemplo de uso
// document.getElementById("btn_verificar").addEventListener("click", function() {
//     showLoading();
//     setTimeout(() => {
//         hideLoading();
//         const registrosExemplo = [
//             "02175203085;Mauricio Rios;2024-09-20;2025-08-18;Ativo",
//             "03312991196;Mauricio Bettio;2024-09-20;2025-08-18;Expirado"
//         ];
//         // exibirListaRegistros(registrosExemplo);
//         //mostrarMensagem("Registros carregados com sucesso!", "sucesso");
//     }, 2000);
// });
