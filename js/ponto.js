const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
let diasTrabalhados = [];
let diasTrabalho = [];
let diasSemIntervalos = [];
let registrosDias = [];
let pontoDia = []; 
// function selecionarFuncionarioECalcularHoras(funcionarios) {
//     let nomesFuncionarios = funcionarios.map(f => `${f.id} - ${f.nome}`).join("\n");
//     let idSelecionado = prompt(`Selecione um funcionário pelo ID:\n${nomesFuncionarios}`, 10);

//     if (!idSelecionado) return;

//     let funcionario = funcionarios.find(f => f.id == idSelecionado.trim());
// console.log(funcionario.id);
// console.log(funcionarios.length);
//     if (!funcionario) {
//         alert("Funcionário não encontrado!");
//         return;
//     }

//     let mesSelecionado = prompt("Digite o mês desejado (formato MM):", `01`);

//     if (!mesSelecionado || !/^\d{2}$/.test(mesSelecionado)) {
//         alert("Mês inválido!");
//         return;
//     }

//     let resultado = calcularHorasTrabalhadas(funcionario, mesSelecionado);
//     // console.log(`Horas trabalhadas por ${funcionario.nome} no mês ${mesSelecionado}: ${resultado.horasTrabalhadas}`);
//     // console.log(`Horas de intervalo por ${funcionario.nome} no mês ${mesSelecionado}: ${resultado.horasIntervalo}`);
//     console.log(resultado.mensagemSemIntervalo);
//     viewDomPonto(funcionario.nome, mesSelecionado, resultado.horasTrabalhadas, resultado.mensagemSemIntervalo);
// }
const btn_ponto_auto = document.querySelector("#btn_ponto_auto");
btn_ponto_auto.addEventListener("click", () => {
	const listasText = document.querySelector("#listasText");
	// const pontosUltras = ()=>{
	// 	return `10	mauricio	Not Set7	 2025-01-02     13:00:00	1
	// 10	mauricio	Not Set7	 2025-01-02     16:00:00	1
	// 10	mauricio	Not Set7	 2025-01-02     17:00:00	1
	// 10	mauricio	Not Set7	 2025-01-02     21:20:00	1
	// `;
	// };
	const pontoUltra = () => {
		return `
13	barbara souza	Not Set1	 2025-01-02     04:52:56	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-02     07:45:04	1
13	barbara souza	Not Set1	 2025-01-02     10:24:30	1
13	barbara souza	Not Set1	 2025-01-02     11:21:48	1
8	lurdes	Not Set1	 2025-01-02     11:39:39	1
10	mauricio	Not Set7	 2025-01-02     12:43:08	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-02     13:19:40	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-02     14:20:19	1
15	robson	Not Set6	 2025-01-02     14:31:11	1
11	marcia	Not Set1	 2025-01-02     14:34:50	1
8	lurdes	Not Set1	 2025-01-02     15:02:17	1
8	lurdes	Not Set1	 2025-01-02     16:00:17	1
10	mauricio	Not Set7	 2025-01-02     16:51:19	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-02     16:53:51	1
10	mauricio	Not Set7	 2025-01-02     17:47:19	1
15	robson	Not Set6	 2025-01-02     18:27:01	1
11	marcia	Not Set1	 2025-01-02     19:13:44	1
15	robson	Not Set6	 2025-01-02     19:29:48	1
8	lurdes	Not Set1	 2025-01-02     20:03:32	1
11	marcia	Not Set1	 2025-01-02     20:10:04	1
10	mauricio	Not Set7	 2025-01-02     21:03:50	1
15	robson	Not Set6	 2025-01-02     22:47:38	1
11	marcia	Not Set1	 2025-01-02     22:58:35	1
13	barbara souza	Not Set1	 2025-01-03     04:55:58	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-03     07:48:50	1
13	barbara souza	Not Set1	 2025-01-03     08:40:16	1
13	barbara souza	Not Set1	 2025-01-03     09:51:10	1
8	lurdes	Not Set1	 2025-01-03     11:40:03	1
12	nath	Not Set1	 2025-01-03     13:46:43	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-03     13:48:01	1
15	robson	Not Set6	 2025-01-03     14:38:11	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-03     14:45:56	1
11	marcia	Not Set1	 2025-01-03     14:58:55	1
8	lurdes	Not Set1	 2025-01-03     15:05:49	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-03     15:58:46	1
8	lurdes	Not Set1	 2025-01-03     16:05:13	1
10	mauricio	Not Set7	 2025-01-03     16:10:57	1
12	nath	Not Set1	 2025-01-03     17:16:08	1
15	robson	Not Set6	 2025-01-03     17:58:01	1
12	nath	Not Set1	 2025-01-03     18:14:24	1
15	robson	Not Set6	 2025-01-03     19:00:29	1
8	lurdes	Not Set1	 2025-01-03     20:02:03	1
10	mauricio	Not Set7	 2025-01-03     20:27:04	1
12	nath	Not Set1	 2025-01-03     21:58:32	1
15	robson	Not Set6	 2025-01-03     22:50:05	1
11	marcia	Not Set1	 2025-01-03     23:02:29	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-04     07:45:55	1
10	mauricio	Not Set7	 2025-01-04     07:45:58	1
12	nath	Not Set1	 2025-01-04     09:42:32	1
10	mauricio	Not Set7	 2025-01-04     10:43:23	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-04     10:46:41	1
10	mauricio	Not Set7	 2025-01-04     11:41:27	1
12	nath	Not Set1	 2025-01-04     11:45:10	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-04     12:00:19	1
12	nath	Not Set1	 2025-01-04     12:44:11	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-04     13:54:41	1
10	mauricio	Not Set7	 2025-01-04     14:41:37	1
12	nath	Not Set1	 2025-01-04     16:52:21	1
11	marcia	Not Set1	 2025-01-05     07:34:28	1
15	robson	Not Set6	 2025-01-05     07:59:22	1
15	robson	Not Set6	 2025-01-05     13:57:42	1
11	marcia	Not Set1	 2025-01-05     14:04:47	1
13	barbara souza	Not Set1	 2025-01-06     04:53:52	1
9	manuella meireles	Not Set1	 2025-01-06     07:45:11	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-06     07:47:51	1
13	barbara souza	Not Set1	 2025-01-06     10:15:02	1
13	barbara souza	Not Set1	 2025-01-06     11:22:06	1
8	lurdes	Not Set1	 2025-01-06     11:40:13	1
12	nath	Not Set1	 2025-01-06     12:49:51	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-06     12:50:04	1
13	barbara souza	Not Set1	 2025-01-06     13:25:14	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-06     13:52:02	1
9	manuella meireles	Not Set1	 2025-01-06     14:00:21	1
10	mauricio	Not Set7	 2025-01-06     14:17:42	1
15	robson	Not Set6	 2025-01-06     14:39:39	1
8	lurdes	Not Set1	 2025-01-06     15:01:00	1
6	alisson carvalho	Not Set1	 2025-01-06     15:05:37	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-06     15:52:46	1
8	lurdes	Not Set1	 2025-01-06     16:00:04	1
12	nath	Not Set1	 2025-01-06     16:41:43	1
15	robson	Not Set6	 2025-01-06     16:54:26	1
12	nath	Not Set1	 2025-01-06     17:35:50	1
10	mauricio	Not Set7	 2025-01-06     17:53:22	1
15	robson	Not Set6	 2025-01-06     18:01:35	1
6	alisson carvalho	Not Set1	 2025-01-06     18:37:39	1
10	mauricio	Not Set7	 2025-01-06     18:50:44	1
6	alisson carvalho	Not Set1	 2025-01-06     19:54:38	1
8	lurdes	Not Set1	 2025-01-06     20:06:25	1
10	mauricio	Not Set7	 2025-01-06     21:21:21	1
15	robson	Not Set6	 2025-01-06     21:47:24	1
6	alisson carvalho	Not Set1	 2025-01-06     22:57:52	1
12	nath	Not Set1	 2025-01-06     23:00:08	1
13	barbara souza	Not Set1	 2025-01-07     04:47:59	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-07     07:33:11	1
9	manuella meireles	Not Set1	 2025-01-07     07:57:57	1
13	barbara souza	Not Set1	 2025-01-07     09:43:31	1
13	barbara souza	Not Set1	 2025-01-07     10:58:03	1
8	lurdes	Not Set1	 2025-01-07     11:40:02	1
10	mauricio	Not Set7	 2025-01-07     12:55:04	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-07     12:56:51	1
12	nath	Not Set1	 2025-01-07     13:03:31	1
13	barbara souza	Not Set1	 2025-01-07     13:29:56	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-07     13:55:28	1
15	robson	Not Set6	 2025-01-07     14:12:30	1
8	lurdes	Not Set1	 2025-01-07     15:21:07	1
12	nath	Not Set1	 2025-01-07     15:48:04	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-07     16:02:16	1
8	lurdes	Not Set1	 2025-01-07     16:21:15	1
12	nath	Not Set1	 2025-01-07     16:34:37	1
15	robson	Not Set6	 2025-01-07     17:55:23	1
15	robson	Not Set6	 2025-01-07     18:58:33	1
8	lurdes	Not Set1	 2025-01-07     20:04:17	1
10	mauricio	Not Set7	 2025-01-07     20:45:37	1
15	robson	Not Set6	 2025-01-07     21:37:59	1
12	nath	Not Set1	 2025-01-07     22:59:01	1
13	barbara souza	Not Set1	 2025-01-08     04:48:44	1
9	manuella meireles	Not Set1	 2025-01-08     07:49:06	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-08     08:00:33	1
8	lurdes	Not Set1	 2025-01-08     11:40:59	1
12	nath	Not Set1	 2025-01-08     12:36:39	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-08     12:52:21	1
13	barbara souza	Not Set1	 2025-01-08     13:19:49	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-08     13:54:38	1
10	mauricio	Not Set7	 2025-01-08     14:07:41	1
8	lurdes	Not Set1	 2025-01-08     15:16:28	1
15	robson	Not Set6	 2025-01-08     15:19:34	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-08     15:45:13	1
8	lurdes	Not Set1	 2025-01-08     16:21:18	1
12	nath	Not Set1	 2025-01-08     17:26:15	1
12	nath	Not Set1	 2025-01-08     18:28:48	1
10	mauricio	Not Set7	 2025-01-08     18:32:38	1
10	mauricio	Not Set7	 2025-01-08     19:11:20	1
15	robson	Not Set6	 2025-01-08     19:20:23	1
8	lurdes	Not Set1	 2025-01-08     20:07:12	1
15	robson	Not Set6	 2025-01-08     20:10:24	1
10	mauricio	Not Set7	 2025-01-08     20:19:09	1
15	robson	Not Set6	 2025-01-08     22:46:46	1
12	nath	Not Set1	 2025-01-08     22:52:19	1
13	barbara souza	Not Set1	 2025-01-09     04:49:06	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-09     07:58:10	1
8	lurdes	Not Set1	 2025-01-09     11:41:12	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-09     12:57:07	1
10	mauricio	Not Set7	 2025-01-09     13:24:37	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-09     13:56:46	1
12	nath	Not Set1	 2025-01-09     14:04:37	1
9	manuella meireles	Not Set1	 2025-01-09     14:25:21	1
15	robson	Not Set6	 2025-01-09     14:42:59	1
16	moacir xavier	Not Set1	 2025-01-09     15:04:02	1
8	lurdes	Not Set1	 2025-01-09     15:05:24	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-09     15:54:23	1
8	lurdes	Not Set1	 2025-01-09     16:06:32	1
12	nath	Not Set1	 2025-01-09     16:23:33	1
10	mauricio	Not Set7	 2025-01-09     17:00:30	1
12	nath	Not Set1	 2025-01-09     17:21:00	1
16	moacir xavier	Not Set1	 2025-01-09     17:39:07	1
10	mauricio	Not Set7	 2025-01-09     17:49:36	1
16	moacir xavier	Not Set1	 2025-01-09     18:38:52	1
15	robson	Not Set6	 2025-01-09     18:47:55	1
15	robson	Not Set6	 2025-01-09     19:56:47	1
8	lurdes	Not Set1	 2025-01-09     20:00:14	1
10	mauricio	Not Set7	 2025-01-09     21:20:58	1
15	robson	Not Set6	 2025-01-09     22:48:38	1
16	moacir xavier	Not Set1	 2025-01-09     23:03:16	1
15	robson	Not Set6	 2025-01-10     07:58:27	1
8	lurdes	Not Set1	 2025-01-10     11:40:03	1
15	robson	Not Set6	 2025-01-10     11:57:42	1
15	robson	Not Set6	 2025-01-10     13:01:20	1
10	mauricio	Not Set7	 2025-01-10     13:05:01	1
12	nath	Not Set1	 2025-01-10     13:10:11	1
13	barbara souza	Not Set1	 2025-01-10     13:14:46	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-10     14:39:02	1
16	moacir xavier	Not Set1	 2025-01-10     14:43:39	1
8	lurdes	Not Set1	 2025-01-10     15:07:40	1
15	robson	Not Set6	 2025-01-10     16:00:05	1
8	lurdes	Not Set1	 2025-01-10     16:06:03	1
12	nath	Not Set1	 2025-01-10     16:40:14	1
10	mauricio	Not Set7	 2025-01-10     17:22:58	1
12	nath	Not Set1	 2025-01-10     17:39:44	1
10	mauricio	Not Set7	 2025-01-10     18:28:09	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-10     18:46:33	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-10     19:49:14	1
8	lurdes	Not Set1	 2025-01-10     20:03:38	1
16	moacir xavier	Not Set1	 2025-01-10     20:04:20	1
16	moacir xavier	Not Set1	 2025-01-10     21:07:24	1
10	mauricio	Not Set7	 2025-01-10     21:21:50	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-10     22:57:54	1
12	nath	Not Set1	 2025-01-10     23:00:25	1
16	moacir xavier	Not Set1	 2025-01-10     23:03:02	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-11     07:51:56	1
10	mauricio	Not Set7	 2025-01-11     08:02:03	1
8	lurdes	Not Set1	 2025-01-11     09:38:10	1
16	moacir xavier	Not Set1	 2025-01-11     09:41:57	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-11     11:27:21	1
10	mauricio	Not Set7	 2025-01-11     11:58:23	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-11     12:48:52	1
10	mauricio	Not Set7	 2025-01-11     12:56:07	1
16	moacir xavier	Not Set1	 2025-01-11     13:00:02	1
8	lurdes	Not Set1	 2025-01-11     13:40:41	1
16	moacir xavier	Not Set1	 2025-01-11     14:08:56	1
8	lurdes	Not Set1	 2025-01-11     14:40:34	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-11     14:57:37	1
10	mauricio	Not Set7	 2025-01-11     15:20:04	1
8	lurdes	Not Set1	 2025-01-11     17:02:26	1
16	moacir xavier	Not Set1	 2025-01-11     17:06:38	1
16	moacir xavier	Not Set1	 2025-01-12     07:54:54	1
15	robson	Not Set6	 2025-01-12     08:19:52	1
15	robson	Not Set6	 2025-01-12     14:00:02	1
13	barbara souza	Not Set1	 2025-01-12     14:04:33	1
13	barbara souza	Not Set1	 2025-01-13     04:48:54	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-13     07:50:16	1
9	manuella meireles	Not Set1	 2025-01-13     07:58:28	1
13	barbara souza	Not Set1	 2025-01-13     09:50:01	1
13	barbara souza	Not Set1	 2025-01-13     10:42:23	1
8	lurdes	Not Set1	 2025-01-13     11:40:07	1
10	mauricio	Not Set7	 2025-01-13     12:51:07	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-13     12:59:21	1
13	barbara souza	Not Set1	 2025-01-13     13:11:21	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-13     14:02:33	1
8	lurdes	Not Set1	 2025-01-13     15:00:16	1
12	nath	Not Set1	 2025-01-13     15:27:30	1
8	lurdes	Not Set1	 2025-01-13     16:00:15	1
10	mauricio	Not Set7	 2025-01-13     17:03:18	1
10	mauricio	Not Set7	 2025-01-13     18:02:14	1
12	nath	Not Set1	 2025-01-13     18:19:21	1
12	nath	Not Set1	 2025-01-13     19:18:25	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-13     19:52:32	1
10	mauricio	Not Set7	 2025-01-13     21:20:16	1
12	nath	Not Set1	 2025-01-13     22:57:27	1
8	lurdes	Not Set1	 2025-01-13     23:00:15	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-14     07:55:38	1
13	barbara souza	Not Set1	 2025-01-14     10:21:34	1
13	barbara souza	Not Set1	 2025-01-14     11:23:13	1
8	lurdes	Not Set1	 2025-01-14     11:40:04	1
10	mauricio	Not Set7	 2025-01-14     12:51:07	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-14     13:04:12	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-14     14:03:47	1
12	nath	Not Set1	 2025-01-14     14:26:32	1
17	lays	Not Set1	 2025-01-14     14:28:48	1
8	lurdes	Not Set1	 2025-01-14     15:00:17	1
8	lurdes	Not Set1	 2025-01-14     16:00:14	1
12	nath	Not Set1	 2025-01-14     16:20:07	1
12	nath	Not Set1	 2025-01-14     17:20:38	1
10	mauricio	Not Set7	 2025-01-14     17:41:31	1
10	mauricio	Not Set7	 2025-01-14     18:22:07	1
8	lurdes	Not Set1	 2025-01-14     19:43:49	1
17	lays	Not Set1	 2025-01-14     19:56:55	1
17	lays	Not Set1	 2025-01-14     20:55:03	1
10	mauricio	Not Set7	 2025-01-14     21:01:22	1
12	nath	Not Set1	 2025-01-14     22:54:00	1
17	lays	Not Set1	 2025-01-14     22:54:05	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-14     22:54:11	1
13	barbara souza	Not Set1	 2025-01-15     04:48:39	1
18	juliana	Not Set1	 2025-01-15     04:48:41	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-15     08:18:29	1
18	juliana	Not Set1	 2025-01-15     08:30:26	1
18	juliana	Not Set1	 2025-01-15     09:30:03	1
8	lurdes	Not Set1	 2025-01-15     11:40:04	1
10	mauricio	Not Set7	 2025-01-15     12:48:30	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-15     13:01:10	1
18	juliana	Not Set1	 2025-01-15     13:08:13	1
13	barbara souza	Not Set1	 2025-01-15     13:16:11	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-15     14:01:45	1
17	lays	Not Set1	 2025-01-15     14:32:56	1
12	nath	Not Set1	 2025-01-15     14:36:58	1
8	lurdes	Not Set1	 2025-01-15     15:13:12	1
8	lurdes	Not Set1	 2025-01-15     16:13:24	1
12	nath	Not Set1	 2025-01-15     16:41:50	1
12	nath	Not Set1	 2025-01-15     17:39:50	1
17	lays	Not Set1	 2025-01-15     19:06:54	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-15     19:50:01	1
17	lays	Not Set1	 2025-01-15     20:03:02	1
10	mauricio	Not Set7	 2025-01-15     20:03:46	1
12	nath	Not Set1	 2025-01-15     22:57:54	1
17	lays	Not Set1	 2025-01-15     22:58:05	1
18	juliana	Not Set1	 2025-01-16     04:56:57	1
9	manuella meireles	Not Set1	 2025-01-16     07:03:07	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-16     07:56:42	1
14	Rosangela Fagundes	Not Set1	 2025-01-16     07:58:21	1
18	juliana	Not Set1	 2025-01-16     08:27:54	1
18	juliana	Not Set1	 2025-01-16     09:27:06	1
14	Rosangela Fagundes	Not Set1	 2025-01-16     09:52:16	1
13	barbara souza	Not Set1	 2025-01-16     10:15:56	1
14	Rosangela Fagundes	Not Set1	 2025-01-16     10:48:29	1
13	barbara souza	Not Set1	 2025-01-16     11:12:36	1
8	lurdes	Not Set1	 2025-01-16     11:40:26	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-16     11:50:40	1
10	mauricio	Not Set7	 2025-01-16     12:57:06	1
18	juliana	Not Set1	 2025-01-16     13:06:03	1
13	barbara souza	Not Set1	 2025-01-16     13:07:37	1
14	Rosangela Fagundes	Not Set1	 2025-01-16     14:22:58	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-16     14:28:01	1
12	nath	Not Set1	 2025-01-16     14:30:55	1
17	lays	Not Set1	 2025-01-16     14:35:20	1
8	lurdes	Not Set1	 2025-01-16     15:31:48	1
10	mauricio	Not Set7	 2025-01-16     15:42:59	1
8	lurdes	Not Set1	 2025-01-16     16:31:03	1
10	mauricio	Not Set7	 2025-01-16     16:40:24	1
12	nath	Not Set1	 2025-01-16     16:52:43	1
8	lurdes	Not Set1	 2025-01-16     17:23:09	1
9	manuella meireles	Not Set1	 2025-01-16     17:23:15	1
12	nath	Not Set1	 2025-01-16     17:52:57	1
17	lays	Not Set1	 2025-01-16     20:05:30	1
10	mauricio	Not Set7	 2025-01-16     20:09:43	1
17	lays	Not Set1	 2025-01-16     21:05:00	1
12	nath	Not Set1	 2025-01-16     22:55:56	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-16     22:56:56	1
17	lays	Not Set1	 2025-01-16     23:00:08	1
18	juliana	Not Set1	 2025-01-17     04:45:48	1
13	barbara souza	Not Set1	 2025-01-17     04:45:57	1
14	Rosangela Fagundes	Not Set1	 2025-01-17     06:06:12	1
8	lurdes	Not Set1	 2025-01-17     08:03:23	1
9	manuella meireles	Not Set1	 2025-01-17     08:03:28	1
13	barbara souza	Not Set1	 2025-01-17     08:31:28	1
13	barbara souza	Not Set1	 2025-01-17     09:29:29	1
18	juliana	Not Set1	 2025-01-17     09:42:10	1
14	Rosangela Fagundes	Not Set1	 2025-01-17     09:59:29	1
18	juliana	Not Set1	 2025-01-17     10:54:08	1
14	Rosangela Fagundes	Not Set1	 2025-01-17     10:55:27	1
10	mauricio	Not Set7	 2025-01-17     12:56:47	1
18	juliana	Not Set1	 2025-01-17     13:11:22	1
8	lurdes	Not Set1	 2025-01-17     13:24:07	1
9	manuella meireles	Not Set1	 2025-01-17     14:03:07	1
14	Rosangela Fagundes	Not Set1	 2025-01-17     14:17:32	1
8	lurdes	Not Set1	 2025-01-17     14:23:50	1
12	nath	Not Set1	 2025-01-17     14:25:52	1
17	lays	Not Set1	 2025-01-17     14:28:18	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-17     14:34:07	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-17     16:29:26	1
12	nath	Not Set1	 2025-01-17     17:05:15	1
10	mauricio	Not Set7	 2025-01-17     17:08:22	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-17     17:29:02	1
10	mauricio	Not Set7	 2025-01-17     17:36:25	1
9	manuella meireles	Not Set1	 2025-01-17     17:38:20	1
8	lurdes	Not Set1	 2025-01-17     17:38:30	1
12	nath	Not Set1	 2025-01-17     18:11:47	1
17	lays	Not Set1	 2025-01-17     19:22:25	1
17	lays	Not Set1	 2025-01-17     20:22:52	1
10	mauricio	Not Set7	 2025-01-17     21:20:00	1
12	nath	Not Set1	 2025-01-17     22:59:01	1
17	lays	Not Set1	 2025-01-17     22:59:04	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-17     22:59:17	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-18     07:56:14	1
12	nath	Not Set1	 2025-01-18     07:56:58	1
17	lays	Not Set1	 2025-01-18     09:36:19	1
8	lurdes	Not Set1	 2025-01-18     09:39:02	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-18     11:59:38	1
12	nath	Not Set1	 2025-01-18     12:21:01	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-18     13:07:28	1
8	lurdes	Not Set1	 2025-01-18     13:16:00	1
12	nath	Not Set1	 2025-01-18     13:31:43	1
17	lays	Not Set1	 2025-01-18     14:00:56	1
8	lurdes	Not Set1	 2025-01-18     14:15:04	1
17	lays	Not Set1	 2025-01-18     15:02:40	1
12	nath	Not Set1	 2025-01-18     15:28:09	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-18     15:28:22	1
8	lurdes	Not Set1	 2025-01-18     16:57:22	1
9	manuella meireles	Not Set1	 2025-01-19     07:52:38	1
14	Rosangela Fagundes	Not Set1	 2025-01-19     08:01:15	1
14	Rosangela Fagundes	Not Set1	 2025-01-19     10:12:59	1
14	Rosangela Fagundes	Not Set1	 2025-01-19     11:11:30	1
14	Rosangela Fagundes	Not Set1	 2025-01-19     13:59:04	1
13	barbara souza	Not Set1	 2025-01-20     04:52:53	1
18	juliana	Not Set1	 2025-01-20     05:21:21	1
14	Rosangela Fagundes	Not Set1	 2025-01-20     06:08:29	1
18	juliana	Not Set1	 2025-01-20     06:58:47	1
14	Rosangela Fagundes	Not Set1	 2025-01-20     09:59:17	1
9	manuella meireles	Not Set1	 2025-01-20     10:26:06	1
8	lurdes	Not Set1	 2025-01-20     10:30:58	1
14	Rosangela Fagundes	Not Set1	 2025-01-20     10:40:28	1
10	mauricio	Not Set7	 2025-01-20     12:38:26	1
12	nath	Not Set1	 2025-01-20     12:45:38	1
8	lurdes	Not Set1	 2025-01-20     12:59:16	1
8	lurdes	Not Set1	 2025-01-20     13:59:59	1
12	nath	Not Set1	 2025-01-20     14:05:09	1
17	lays	Not Set1	 2025-01-20     14:30:19	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-20     14:41:43	1
12	nath	Not Set1	 2025-01-20     15:05:29	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-20     16:37:49	1
10	mauricio	Not Set7	 2025-01-20     17:35:13	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-20     17:36:03	1
10	mauricio	Not Set7	 2025-01-20     18:14:20	1
8	lurdes	Not Set1	 2025-01-20     18:36:55	1
17	lays	Not Set1	 2025-01-20     20:28:29	1
10	mauricio	Not Set7	 2025-01-20     21:21:15	1
17	lays	Not Set1	 2025-01-20     21:27:55	1
17	lays	Not Set1	 2025-01-20     22:54:59	1
12	nath	Not Set1	 2025-01-20     22:55:07	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-20     22:55:10	1
18	juliana	Not Set1	 2025-01-21     04:44:12	1
14	Rosangela Fagundes	Not Set1	 2025-01-21     06:00:00	1
9	manuella meireles	Not Set1	 2025-01-21     08:29:05	1
18	juliana	Not Set1	 2025-01-21     08:46:18	1
18	juliana	Not Set1	 2025-01-21     09:46:24	1
14	Rosangela Fagundes	Not Set1	 2025-01-21     10:10:18	1
8	lurdes	Not Set1	 2025-01-21     10:55:34	1
10	mauricio	Not Set7	 2025-01-21     12:42:19	1
18	juliana	Not Set1	 2025-01-21     13:05:30	1
9	manuella meireles	Not Set1	 2025-01-21     13:20:23	1
12	nath	Not Set1	 2025-01-21     14:11:18	1
17	lays	Not Set1	 2025-01-21     14:25:46	1
9	manuella meireles	Not Set1	 2025-01-21     14:28:42	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-21     14:43:11	1
10	mauricio	Not Set7	 2025-01-21     16:36:12	1
8	lurdes	Not Set1	 2025-01-21     16:36:15	1
10	mauricio	Not Set7	 2025-01-21     17:02:16	1
12	nath	Not Set1	 2025-01-21     17:06:11	1
8	lurdes	Not Set1	 2025-01-21     17:36:05	1
12	nath	Not Set1	 2025-01-21     17:39:33	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-21     17:48:12	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-21     18:39:47	1
17	lays	Not Set1	 2025-01-21     19:59:41	1
8	lurdes	Not Set1	 2025-01-21     20:03:47	1
17	lays	Not Set1	 2025-01-21     20:57:59	1
10	mauricio	Not Set7	 2025-01-21     21:25:14	1
12	nath	Not Set1	 2025-01-21     22:54:35	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-21     22:54:38	1
17	lays	Not Set1	 2025-01-21     22:55:02	1
18	juliana	Not Set1	 2025-01-22     04:51:25	1
14	Rosangela Fagundes	Not Set1	 2025-01-22     06:07:42	1
9	manuella meireles	Not Set1	 2025-01-22     08:09:31	1
18	juliana	Not Set1	 2025-01-22     09:43:31	1
14	Rosangela Fagundes	Not Set1	 2025-01-22     10:32:56	1
18	juliana	Not Set1	 2025-01-22     10:43:08	1
8	lurdes	Not Set1	 2025-01-22     11:15:02	1
14	Rosangela Fagundes	Not Set1	 2025-01-22     11:27:03	1
10	mauricio	Not Set7	 2025-01-22     12:52:33	1
18	juliana	Not Set1	 2025-01-22     13:05:23	1
14	Rosangela Fagundes	Not Set1	 2025-01-22     14:15:42	1
12	nath	Not Set1	 2025-01-22     14:31:59	1
17	lays	Not Set1	 2025-01-22     14:32:32	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-22     14:32:39	1
10	mauricio	Not Set7	 2025-01-22     16:01:56	1
8	lurdes	Not Set1	 2025-01-22     16:31:15	1
10	mauricio	Not Set7	 2025-01-22     17:00:50	1
12	nath	Not Set1	 2025-01-22     17:09:01	1
8	lurdes	Not Set1	 2025-01-22     17:30:39	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-22     17:35:35	1
9	manuella meireles	Not Set1	 2025-01-22     17:55:53	1
12	nath	Not Set1	 2025-01-22     18:04:14	1
8	lurdes	Not Set1	 2025-01-22     18:39:41	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-22     18:44:38	1
10	mauricio	Not Set7	 2025-01-22     19:06:53	1
17	lays	Not Set1	 2025-01-22     19:45:05	1
17	lays	Not Set1	 2025-01-22     20:44:12	1
17	lays	Not Set1	 2025-01-22     22:56:18	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-22     22:56:27	1
12	nath	Not Set1	 2025-01-22     22:56:36	1
18	juliana	Not Set1	 2025-01-23     05:02:14	1
14	Rosangela Fagundes	Not Set1	 2025-01-23     06:10:30	1
18	juliana	Not Set1	 2025-01-23     09:33:18	1
14	Rosangela Fagundes	Not Set1	 2025-01-23     10:15:18	1
18	juliana	Not Set1	 2025-01-23     10:33:24	1
14	Rosangela Fagundes	Not Set1	 2025-01-23     10:56:13	1
8	lurdes	Not Set1	 2025-01-23     11:13:38	1
9	manuella meireles	Not Set1	 2025-01-23     12:24:00	1
10	mauricio	Not Set7	 2025-01-23     13:01:14	1
18	juliana	Not Set1	 2025-01-23     13:10:08	1
9	manuella meireles	Not Set1	 2025-01-23     13:21:09	1
12	nath	Not Set1	 2025-01-23     14:21:30	1
17	lays	Not Set1	 2025-01-23     14:31:24	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-23     14:36:48	1
8	lurdes	Not Set1	 2025-01-23     15:49:25	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-23     16:46:22	1
8	lurdes	Not Set1	 2025-01-23     16:48:43	1
10	mauricio	Not Set7	 2025-01-23     16:50:12	1
12	nath	Not Set1	 2025-01-23     17:01:13	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-23     17:44:46	1
12	nath	Not Set1	 2025-01-23     17:58:58	1
10	mauricio	Not Set7	 2025-01-23     17:59:47	1
17	lays	Not Set1	 2025-01-23     20:00:03	1
17	lays	Not Set1	 2025-01-23     20:58:46	1
8	lurdes	Not Set1	 2025-01-23     21:19:29	1
10	mauricio	Not Set7	 2025-01-23     21:20:01	1
12	nath	Not Set1	 2025-01-23     22:10:47	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-23     22:50:18	1
17	lays	Not Set1	 2025-01-23     23:01:09	1
18	juliana	Not Set1	 2025-01-24     04:34:10	1
14	Rosangela Fagundes	Not Set1	 2025-01-24     06:24:21	1
18	juliana	Not Set1	 2025-01-24     09:52:09	1
14	Rosangela Fagundes	Not Set1	 2025-01-24     10:12:40	1
18	juliana	Not Set1	 2025-01-24     10:55:00	1
14	Rosangela Fagundes	Not Set1	 2025-01-24     11:02:27	1
8	lurdes	Not Set1	 2025-01-24     11:34:21	1
9	manuella meireles	Not Set1	 2025-01-24     12:44:57	1
10	mauricio	Not Set7	 2025-01-24     12:53:28	1
18	juliana	Not Set1	 2025-01-24     13:07:03	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-24     13:15:24	1
17	lays	Not Set1	 2025-01-24     13:36:18	1
14	Rosangela Fagundes	Not Set1	 2025-01-24     14:20:29	1
12	nath	Not Set1	 2025-01-24     14:29:35	1
8	lurdes	Not Set1	 2025-01-24     15:31:24	1
10	mauricio	Not Set7	 2025-01-24     15:55:24	1
10	mauricio	Not Set7	 2025-01-24     16:18:45	1
8	lurdes	Not Set1	 2025-01-24     16:26:16	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-24     16:30:28	1
12	nath	Not Set1	 2025-01-24     17:11:29	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-24     17:18:34	1
12	nath	Not Set1	 2025-01-24     18:05:36	1
17	lays	Not Set1	 2025-01-24     20:24:16	1
8	lurdes	Not Set1	 2025-01-24     20:57:46	1
10	mauricio	Not Set7	 2025-01-24     21:20:29	1
17	lays	Not Set1	 2025-01-24     21:28:32	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-24     22:48:01	1
12	nath	Not Set1	 2025-01-24     22:55:31	1
17	lays	Not Set1	 2025-01-24     22:55:35	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-25     07:58:16	1
8	lurdes	Not Set1	 2025-01-25     07:58:34	1
17	lays	Not Set1	 2025-01-25     07:59:47	1
18	juliana	Not Set1	 2025-01-25     10:20:00	1
9	manuella meireles	Not Set1	 2025-01-25     11:13:04	1
9	manuella meireles	Not Set1	 2025-01-25     12:10:11	1
8	lurdes	Not Set1	 2025-01-25     12:10:17	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-25     12:10:22	1
17	lays	Not Set1	 2025-01-25     12:10:35	1
18	juliana	Not Set1	 2025-01-25     12:10:40	1
17	lays	Not Set1	 2025-01-25     13:09:11	1
18	juliana	Not Set1	 2025-01-25     13:09:14	1
8	lurdes	Not Set1	 2025-01-25     13:14:00	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-25     13:15:06	1
17	lays	Not Set1	 2025-01-25     16:42:51	1
18	juliana	Not Set1	 2025-01-25     17:02:01	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-25     18:28:16	1
8	lurdes	Not Set1	 2025-01-25     18:34:58	1
9	manuella meireles	Not Set1	 2025-01-25     20:00:44	1
10	mauricio	Not Set7	 2025-01-26     08:13:36	1
8	lurdes	Not Set1	 2025-01-26     08:13:51	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-26     08:13:58	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-26     12:00:25	1
8	lurdes	Not Set1	 2025-01-26     12:02:20	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-26     13:02:32	1
8	lurdes	Not Set1	 2025-01-26     13:05:08	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-26     19:18:16	1
8	lurdes	Not Set1	 2025-01-26     19:18:52	1
10	mauricio	Not Set7	 2025-01-26     20:00:51	1
18	juliana	Not Set1	 2025-01-27     04:48:59	1
14	Rosangela Fagundes	Not Set1	 2025-01-27     06:04:25	1
18	juliana	Not Set1	 2025-01-27     09:56:33	1
18	juliana	Not Set1	 2025-01-27     10:24:01	1
14	Rosangela Fagundes	Not Set1	 2025-01-27     10:24:35	1
14	Rosangela Fagundes	Not Set1	 2025-01-27     11:14:56	1
18	juliana	Not Set1	 2025-01-27     12:41:54	1
10	mauricio	Not Set7	 2025-01-27     12:49:18	1
14	Rosangela Fagundes	Not Set1	 2025-01-27     14:18:45	1
12	nath	Not Set1	 2025-01-27     14:22:45	1
17	lays	Not Set1	 2025-01-27     14:33:18	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-27     14:38:45	1
8	lurdes	Not Set1	 2025-01-27     14:48:42	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-27     16:57:31	1
10	mauricio	Not Set7	 2025-01-27     17:04:22	1
10	mauricio	Not Set7	 2025-01-27     17:58:40	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-27     18:09:11	1
8	lurdes	Not Set1	 2025-01-27     18:30:17	1
12	nath	Not Set1	 2025-01-27     18:54:41	1
8	lurdes	Not Set1	 2025-01-27     19:30:32	1
12	nath	Not Set1	 2025-01-27     19:56:05	1
17	lays	Not Set1	 2025-01-27     20:21:28	1
10	mauricio	Not Set7	 2025-01-27     20:35:35	1
17	lays	Not Set1	 2025-01-27     21:21:38	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-27     22:53:02	1
17	lays	Not Set1	 2025-01-27     22:53:13	1
12	nath	Not Set1	 2025-01-27     22:56:41	1
8	lurdes	Not Set1	 2025-01-27     22:58:47	1
18	juliana	Not Set1	 2025-01-28     04:47:41	1
14	Rosangela Fagundes	Not Set1	 2025-01-28     06:08:41	1
19	claudete	Not Set1	 2025-01-28     07:48:53	1
18	juliana	Not Set1	 2025-01-28     08:56:33	1
18	juliana	Not Set1	 2025-01-28     09:56:28	1
14	Rosangela Fagundes	Not Set1	 2025-01-28     10:31:12	1
14	Rosangela Fagundes	Not Set1	 2025-01-28     10:50:07	1
8	lurdes	Not Set1	 2025-01-28     11:20:29	1
9	manuella meireles	Not Set1	 2025-01-28     12:16:08	1
19	claudete	Not Set1	 2025-01-28     12:16:30	1
10	mauricio	Not Set7	 2025-01-28     13:00:16	1
19	claudete	Not Set1	 2025-01-28     13:01:00	1
18	juliana	Not Set1	 2025-01-28     13:10:50	1
9	manuella meireles	Not Set1	 2025-01-28     13:40:56	1
14	Rosangela Fagundes	Not Set1	 2025-01-28     14:18:04	1
12	nath	Not Set1	 2025-01-28     14:27:28	1
17	lays	Not Set1	 2025-01-28     14:28:50	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-28     14:33:25	1
19	claudete	Not Set1	 2025-01-28     16:01:43	1
10	mauricio	Not Set7	 2025-01-28     16:32:26	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-28     16:46:51	1
9	manuella meireles	Not Set1	 2025-01-28     17:27:51	1
10	mauricio	Not Set7	 2025-01-28     17:31:46	1
12	nath	Not Set1	 2025-01-28     17:34:28	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-28     17:47:54	1
8	lurdes	Not Set1	 2025-01-28     17:48:48	1
12	nath	Not Set1	 2025-01-28     18:36:17	1
8	lurdes	Not Set1	 2025-01-28     18:49:43	1
8	lurdes	Not Set1	 2025-01-28     20:03:19	1
17	lays	Not Set1	 2025-01-28     20:06:15	1
17	lays	Not Set1	 2025-01-28     21:05:32	1
10	mauricio	Not Set7	 2025-01-28     21:19:45	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-28     22:53:14	1
12	nath	Not Set1	 2025-01-28     22:56:20	1
17	lays	Not Set1	 2025-01-28     23:00:01	1
18	juliana	Not Set1	 2025-01-29     05:13:11	1
14	Rosangela Fagundes	Not Set1	 2025-01-29     06:05:21	1
19	claudete	Not Set1	 2025-01-29     07:32:35	1
9	manuella meireles	Not Set1	 2025-01-29     08:18:23	1
18	juliana	Not Set1	 2025-01-29     08:33:40	1
18	juliana	Not Set1	 2025-01-29     09:26:28	1
14	Rosangela Fagundes	Not Set1	 2025-01-29     10:00:04	1
14	Rosangela Fagundes	Not Set1	 2025-01-29     10:38:07	1
8	lurdes	Not Set1	 2025-01-29     11:34:22	1
19	claudete	Not Set1	 2025-01-29     12:25:41	1
10	mauricio	Not Set7	 2025-01-29     12:51:53	1
19	claudete	Not Set1	 2025-01-29     13:04:15	1
18	juliana	Not Set1	 2025-01-29     13:07:21	1
9	manuella meireles	Not Set1	 2025-01-29     13:42:52	1
14	Rosangela Fagundes	Not Set1	 2025-01-29     14:16:22	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-29     14:32:53	1
12	nath	Not Set1	 2025-01-29     14:33:47	1
17	lays	Not Set1	 2025-01-29     14:42:30	1
9	manuella meireles	Not Set1	 2025-01-29     15:18:15	1
10	mauricio	Not Set7	 2025-01-29     15:59:27	1
19	claudete	Not Set1	 2025-01-29     16:01:15	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-29     16:07:27	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-29     16:56:16	1
10	mauricio	Not Set7	 2025-01-29     16:59:39	1
12	nath	Not Set1	 2025-01-29     17:00:10	1
8	lurdes	Not Set1	 2025-01-29     17:20:53	1
12	nath	Not Set1	 2025-01-29     17:57:56	1
8	lurdes	Not Set1	 2025-01-29     18:20:44	1
17	lays	Not Set1	 2025-01-29     20:08:35	1
8	lurdes	Not Set1	 2025-01-29     20:51:31	1
17	lays	Not Set1	 2025-01-29     21:07:36	1
10	mauricio	Not Set7	 2025-01-29     21:22:24	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-29     22:47:47	1
12	nath	Not Set1	 2025-01-29     22:57:30	1
17	lays	Not Set1	 2025-01-29     22:57:33	1
14	Rosangela Fagundes	Not Set1	 2025-01-30     06:11:00	1
19	claudete	Not Set1	 2025-01-30     08:00:06	1
9	manuella meireles	Not Set1	 2025-01-30     08:06:32	1
14	Rosangela Fagundes	Not Set1	 2025-01-30     09:54:49	1
14	Rosangela Fagundes	Not Set1	 2025-01-30     10:28:31	1
8	lurdes	Not Set1	 2025-01-30     11:38:16	1
10	mauricio	Not Set7	 2025-01-30     12:58:02	1
9	manuella meireles	Not Set1	 2025-01-30     14:12:23	1
14	Rosangela Fagundes	Not Set1	 2025-01-30     14:21:30	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-30     14:34:43	1
12	nath	Not Set1	 2025-01-30     14:35:52	1
17	lays	Not Set1	 2025-01-30     14:35:57	1
10	mauricio	Not Set7	 2025-01-30     16:01:31	1
8	lurdes	Not Set1	 2025-01-30     16:01:34	1
10	mauricio	Not Set7	 2025-01-30     16:51:20	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-30     17:01:17	1
8	lurdes	Not Set1	 2025-01-30     17:01:26	1
12	nath	Not Set1	 2025-01-30     17:26:22	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-30     18:02:32	1
12	nath	Not Set1	 2025-01-30     18:42:25	1
17	lays	Not Set1	 2025-01-30     19:59:29	1
8	lurdes	Not Set1	 2025-01-30     20:31:17	1
17	lays	Not Set1	 2025-01-30     21:06:03	1
10	mauricio	Not Set7	 2025-01-30     21:20:45	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-30     22:51:23	1
12	nath	Not Set1	 2025-01-30     22:56:14	1
17	lays	Not Set1	 2025-01-30     22:57:45	1
14	Rosangela Fagundes	Not Set1	 2025-01-31     06:07:52	1
9	manuella meireles	Not Set1	 2025-01-31     08:18:08	1
8	lurdes	Not Set1	 2025-01-31     11:25:50	1
14	Rosangela Fagundes	Not Set1	 2025-01-31     12:28:02	1
10	mauricio	Not Set7	 2025-01-31     13:01:01	1
9	manuella meireles	Not Set1	 2025-01-31     13:04:29	1
14	Rosangela Fagundes	Not Set1	 2025-01-31     13:59:05	1
12	nath	Not Set1	 2025-01-31     14:12:30	1
14	Rosangela Fagundes	Not Set1	 2025-01-31     14:21:59	1
17	lays	Not Set1	 2025-01-31     14:32:52	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-31     14:40:16	1
10	mauricio	Not Set7	 2025-01-31     16:15:30	1
8	lurdes	Not Set1	 2025-01-31     16:16:01	1
10	mauricio	Not Set7	 2025-01-31     17:10:25	1
2	LEANDRO  LIMAS	Not Set1	 2025-01-31     17:15:58	1
12	nath	Not Set1	 2025-01-31     17:16:37	1
8	lurdes	Not Set1	 2025-01-31     17:16:53	1
	`;
	};
	const pontosUltrasMy = () => {
		return `10	mauricio	Not Set7	 2025-01-02     13:00:00	1
10	mauricio	Not Set7	 2025-01-02     16:00:00	1
10	mauricio	Not Set7	 2025-01-02     17:00:00	1
10	mauricio	Not Set7	 2025-01-02     21:20:00	1
10	mauricio	Not Set7	 2025-01-03     13:00:00	1
10	mauricio	Not Set7	 2025-01-03     16:00:00	1
10	mauricio	Not Set7	 2025-01-03     17:00:00	1
10	mauricio	Not Set7	 2025-01-03     21:20:00	1
10	mauricio	Not Set7	 2025-01-04     13:00:00	1
10	mauricio	Not Set7	 2025-01-04     16:00:00	1
10	mauricio	Not Set7	 2025-01-04     17:00:00	1
10	mauricio	Not Set7	 2025-01-04     21:20:00	1

10	mauricio	Not Set7	 2025-01-05     13:00:00	1
10	mauricio	Not Set7	 2025-01-05     16:00:00	1
10	mauricio	Not Set7	 2025-01-05     17:00:00	1
10	mauricio	Not Set7	 2025-01-05     21:20:00	1

10	mauricio	Not Set7	 2025-01-06     13:00:00	1
10	mauricio	Not Set7	 2025-01-06     16:00:00	1
10	mauricio	Not Set7	 2025-01-06     17:00:00	1
10	mauricio	Not Set7	 2025-01-06     21:20:00	1
`;
	};
	const UltrasMys = () => {
		return `10	mauricio	Not Set7	 2025-01-02     13:00:00	1

10	mauricio	Not Set7	 2025-01-02     17:00:00	1
10	mauricio	Not Set7	 2025-01-02     21:20:00	1
10	mauricio	Not Set7	 2025-01-03     13:00:00	1
10	mauricio	Not Set7	 2025-01-03     16:00:00	1

10	mauricio	Not Set7	 2025-01-03     21:20:00	1
10	mauricio	Not Set7	 2025-01-04     13:00:00	1
10	mauricio	Not Set7	 2025-01-04     16:00:00	1
10	mauricio	Not Set7	 2025-01-04     17:00:00	1
10	mauricio	Not Set7	 2025-01-04     21:20:00	1

10	mauricio	Not Set7	 2025-01-05     13:00:00	1
10	mauricio	Not Set7	 2025-01-05     16:00:00	1
10	mauricio	Not Set7	 2025-01-05     17:00:00	1
10	mauricio	Not Set7	 2025-01-05     21:20:00	1

10	mauricio	Not Set7	 2025-01-06     13:00:00	1

10	mauricio	Not Set7	 2025-01-06     17:00:00	1
10	mauricio	Not Set7	 2025-01-06     21:20:00	1

10	mauricio	Not Set7	 2025-01-07     13:00:00	1
10	mauricio	Not Set7	 2025-01-07     16:00:00	1

10	mauricio	Not Set7	 2025-01-07     21:20:00	1

10	mauricio	Not Set7	 2025-01-08     13:00:00	1
10	mauricio	Not Set7	 2025-01-08     16:00:00	1
10	mauricio	Not Set7	 2025-01-08     17:00:00	1
10	mauricio	Not Set7	 2025-01-08     21:20:00	1

10	mauricio	Not Set7	 2025-01-09     13:00:00	1
10	mauricio	Not Set7	 2025-01-09     16:00:00	1
10	mauricio	Not Set7	 2025-01-09     17:00:00	1
10	mauricio	Not Set7	 2025-01-09     21:20:00	1

10	mauricio	Not Set7	 2025-01-10     13:00:00	1
10	mauricio	Not Set7	 2025-01-10     16:00:00	1
10	mauricio	Not Set7	 2025-01-10     17:00:00	1
10	mauricio	Not Set7	 2025-01-10     21:20:00	1

10	mauricio	Not Set7	 2025-01-11     13:00:00	1
10	mauricio	Not Set7	 2025-01-11     16:00:00	1
10	mauricio	Not Set7	 2025-01-11     17:00:00	1
10	mauricio	Not Set7	 2025-01-11     21:20:00	1

10	mauricio	Not Set7	 2025-01-12     13:00:00	1
10	mauricio	Not Set7	 2025-01-12     16:00:00	1
10	mauricio	Not Set7	 2025-01-12     17:00:00	1
10	mauricio	Not Set7	 2025-01-12     21:20:00	1

10	mauricio	Not Set7	 2025-01-13     13:00:00	1
10	mauricio	Not Set7	 2025-01-13     16:00:00	1
10	mauricio	Not Set7	 2025-01-13     17:00:00	1
10	mauricio	Not Set7	 2025-01-13     21:20:00	1
10	mauricio	Not Set7	 2025-01-14     13:00:00	1
10	mauricio	Not Set7	 2025-01-14     16:00:00	1
10	mauricio	Not Set7	 2025-01-14     17:00:00	1
10	mauricio	Not Set7	 2025-01-14     21:20:00	1


10	mauricio	Not Set7	 2025-01-15     13:00:00	1
10	mauricio	Not Set7	 2025-01-15     16:00:00	1
10	mauricio	Not Set7	 2025-01-15     17:00:00	1
10	mauricio	Not Set7	 2025-01-15     21:20:00	1

10	mauricio	Not Set7	 2025-01-16     13:00:00	1
10	mauricio	Not Set7	 2025-01-16     16:00:00	1
10	mauricio	Not Set7	 2025-01-16     17:00:00	1
10	mauricio	Not Set7	 2025-01-16     21:20:00	1

10	mauricio	Not Set7	 2025-01-17     13:00:00	1
10	mauricio	Not Set7	 2025-01-17     16:00:00	1
10	mauricio	Not Set7	 2025-01-17     17:00:00	1
10	mauricio	Not Set7	 2025-01-17     21:20:00	1


10	mauricio	Not Set7	 2025-01-18     13:00:00	1
10	mauricio	Not Set7	 2025-01-18     16:00:00	1
10	mauricio	Not Set7	 2025-01-18     17:00:00	1
10	mauricio	Not Set7	 2025-01-18     21:20:00	1

10	mauricio	Not Set7	 2025-01-19     13:00:00	1
10	mauricio	Not Set7	 2025-01-19     16:00:00	1
10	mauricio	Not Set7	 2025-01-19     17:00:00	1
10	mauricio	Not Set7	 2025-01-19     21:20:00	1

10	mauricio	Not Set7	 2025-01-20     13:00:00	1
10	mauricio	Not Set7	 2025-01-20     16:00:00	1
10	mauricio	Not Set7	 2025-01-20     17:00:00	1
10	mauricio	Not Set7	 2025-01-20     21:20:00	1
`;
	};
	const UltrasMy = () => {
		return `10	mauricio	Not Set7	 2025-01-02     13:00:00	1
10	mauricio	Not Set7	 2025-01-02     16:00:00	1
10	mauricio	Not Set7	 2025-01-02     17:00:00	1
10	mauricio	Not Set7	 2025-01-02     21:20:00	1
10	mauricio	Not Set7	 2025-01-03     13:00:00	1
10	mauricio	Not Set7	 2025-01-03     16:00:00	1
10	mauricio	Not Set7	 2025-01-03     17:00:00	1
10	mauricio	Not Set7	 2025-01-03     21:20:00	1
10	mauricio	Not Set7	 2025-01-04     13:00:00	1
10	mauricio	Not Set7	 2025-01-04     16:00:00	1
10	mauricio	Not Set7	 2025-01-04     17:00:00	1
10	mauricio	Not Set7	 2025-01-04     21:20:00	1

10	mauricio	Not Set7	 2025-01-05     13:00:00	1
10	mauricio	Not Set7	 2025-01-05     16:00:00	1
10	mauricio	Not Set7	 2025-01-05     17:00:00	1
10	mauricio	Not Set7	 2025-01-05     21:20:00	1

10	mauricio	Not Set7	 2025-01-06     13:00:00	1
10	mauricio	Not Set7	 2025-01-06     16:00:00	1
10	mauricio	Not Set7	 2025-01-06     17:00:00	1
10	mauricio	Not Set7	 2025-01-06     21:20:00	1

10	mauricio	Not Set7	 2025-01-07     13:00:00	1
10	mauricio	Not Set7	 2025-01-07     16:00:00	1
10	mauricio	Not Set7	 2025-01-07     17:00:00	1
10	mauricio	Not Set7	 2025-01-07     21:20:00	1

10	mauricio	Not Set7	 2025-01-08     13:00:00	1
10	mauricio	Not Set7	 2025-01-08     16:00:00	1
10	mauricio	Not Set7	 2025-01-08     17:00:00	1
10	mauricio	Not Set7	 2025-01-08     21:20:00	1

10	mauricio	Not Set7	 2025-01-09     13:00:00	1
10	mauricio	Not Set7	 2025-01-09     16:00:00	1
10	mauricio	Not Set7	 2025-01-09     17:00:00	1
10	mauricio	Not Set7	 2025-01-09     21:20:00	1

10	mauricio	Not Set7	 2025-01-10     13:00:00	1
10	mauricio	Not Set7	 2025-01-10     16:00:00	1
10	mauricio	Not Set7	 2025-01-10     17:00:00	1
10	mauricio	Not Set7	 2025-01-10     21:20:00	1

10	mauricio	Not Set7	 2025-01-11     13:00:00	1
10	mauricio	Not Set7	 2025-01-11     16:00:00	1
10	mauricio	Not Set7	 2025-01-11     17:00:00	1
10	mauricio	Not Set7	 2025-01-11     21:20:00	1

10	mauricio	Not Set7	 2025-01-12     13:00:00	1
10	mauricio	Not Set7	 2025-01-12     16:00:00	1
10	mauricio	Not Set7	 2025-01-12     17:00:00	1
10	mauricio	Not Set7	 2025-01-12     21:20:00	1

10	mauricio	Not Set7	 2025-01-13     13:00:00	1
10	mauricio	Not Set7	 2025-01-13     16:00:00	1
10	mauricio	Not Set7	 2025-01-13     17:00:00	1
10	mauricio	Not Set7	 2025-01-13     21:20:00	1
10	mauricio	Not Set7	 2025-01-14     13:00:00	1
10	mauricio	Not Set7	 2025-01-14     16:00:00	1
10	mauricio	Not Set7	 2025-01-14     17:00:00	1
10	mauricio	Not Set7	 2025-01-14     21:20:00	1


10	mauricio	Not Set7	 2025-01-15     13:00:00	1
10	mauricio	Not Set7	 2025-01-15     16:00:00	1
10	mauricio	Not Set7	 2025-01-15     17:00:00	1
10	mauricio	Not Set7	 2025-01-15     21:20:00	1

10	mauricio	Not Set7	 2025-01-16     13:00:00	1
10	mauricio	Not Set7	 2025-01-16     16:00:00	1
10	mauricio	Not Set7	 2025-01-16     17:00:00	1
10	mauricio	Not Set7	 2025-01-16     21:20:00	1

10	mauricio	Not Set7	 2025-01-17     13:00:00	1
10	mauricio	Not Set7	 2025-01-17     16:00:00	1
10	mauricio	Not Set7	 2025-01-17     17:00:00	1
10	mauricio	Not Set7	 2025-01-17     21:20:00	1


10	mauricio	Not Set7	 2025-01-18     13:00:00	1
10	mauricio	Not Set7	 2025-01-18     16:00:00	1
10	mauricio	Not Set7	 2025-01-18     17:00:00	1
10	mauricio	Not Set7	 2025-01-18     21:20:00	1

10	mauricio	Not Set7	 2025-01-19     13:00:00	1
10	mauricio	Not Set7	 2025-01-19     16:00:00	1
10	mauricio	Not Set7	 2025-01-19     17:00:00	1
10	mauricio	Not Set7	 2025-01-19     21:20:00	1

10	mauricio	Not Set7	 2025-01-20     13:00:00	1
10	mauricio	Not Set7	 2025-01-20     16:00:00	1
10	mauricio	Not Set7	 2025-01-20     17:00:00	1
10	mauricio	Not Set7	 2025-01-20     21:20:00	1
`;
	};
	const pontosUltrasMys = () => {
		let days = [];
		let day = [];
		for (let i = 1; i < 32; i++) {
			// let ob = {
			// 	id: "10   ",
			// 	nome: "mauricio   ",
			// 	seta: "      Not Set7      ",
			// 	da: i < 10 ? `   2025-01-0${i}   ` : `   2025-01-${i}   `,
			// 	hor1: "  13:00:00   ",
			// 	hor2: "  16:00:00   ",
			// 	hor3: "  17:00:00   ",
			// 	hor4: "  21:20:00   ",
			// 	op: "   1"
			// };

			let ob = {
				id: "10\t",
				nome: "mauricio\t",
				seta: "Not Set7\t ",
				da: i < 10 ? `2025-01-0${i} ` : `2025-01-${i} `,
				hor1: "\t  13:00:00",
				hor2: "\t  16:00:00",
				hor3: "\t  17:00:00",
				hor4: "\t  21:20:00",
				op: "\t1"
			};

			let dayOb1 = `${ob.id}${ob.nome}${ob.seta}${ob.da}${ob.hor1}${ob.op}`;
			let dayOb2 = `${ob.id}${ob.nome}${ob.seta}${ob.da}${ob.hor2}${ob.op}`;
			let dayOb3 = `${ob.id}${ob.nome}${ob.seta}${ob.da}${ob.hor3}${ob.op}`;
			let dayOb4 = `${ob.id}${ob.nome}${ob.seta}${ob.da}${ob.hor4}${ob.op}`;

			/*
		let dayOb1 = `${ob.id}\t${ob.nome}\t${ob.seta}\t${ob.da}\t ${ob.hor1}\t ${ob.op}`;
		let dayOb2 = `${ob.id}\t${ob.nome}\t${ob.seta}\t${ob.da}\t ${ob.hor2}\t${ob.op}`;
		let dayOb3 = `${ob.id}\t${ob.nome}\t${ob.seta}\t${ob.da}\t ${ob.hor3}\t${ob.op}`;
		let dayOb4 = `${ob.id}\t${ob.nome}\t${ob.seta}\t${ob.da}\t ${ob.hor4}\t${ob.op}`;
		*/

			days.push(ob);
			day.push(dayOb1);
			day.push(dayOb2);
			day.push(dayOb3);
			day.push(dayOb4);
		}
		// const regss = day.map(it => it);

		const regss = day.map(it => {
			// console.log(it);
			return `${it}`;
		});

		let re = regss;
		re = regss.forEach((item, index) => {
			//console.log(item);
			return item;
		});
		const regsss = day.map(it => it);
		let p = () => {
			`
		10	mauricio	Not Set7	 2025-01-02     13:00:00	1
10	mauricio	Not Set7	 2025-01-02     16:00:00	1
10	mauricio	Not Set7	 2025-01-02     17:00:00	1
10	mauricio	Not Set7	 2025-01-02     21:20:00	1`;
		};
		return regss;
	};

	const pontosUltras = () => {
		return `10	mauricio	Not Set7	 2025-01-02     13:00:00	1
10	mauricio	Not Set7	 2025-01-02     16:00:00	1
10	mauricio	Not Set7	 2025-01-02     17:00:00	1
10	mauricio	Not Set7	 2025-01-02     21:20:00	1
10	mauricio	Not Set7	 2025-01-03     13:00:00	1
10	mauricio	Not Set7	 2025-01-03     16:00:00	1
10	mauricio	Not Set7	 2025-01-03     17:00:00	1
10	mauricio	Not Set7	 2025-01-03     21:20:00	1
10	mauricio	Not Set7	 2025-01-04     13:00:00	1
10	mauricio	Not Set7	 2025-01-04     16:00:00	1
10	mauricio	Not Set7	 2025-01-04     21:20:00	1
`;
	};
	const pontosUltraFev = () => {
		return `2		Not Set1	 2025-02-01     07:57:08	1
9	manuella meireles	Not Set1	 2025-02-01     08:05:51	1
12		Not Set1	 2025-02-01     09:27:03	1
8	lurdes	Not Set1	 2025-02-01     09:41:15	1
2		Not Set1	 2025-02-01     09:45:27	1
2		Not Set1	 2025-02-01     10:43:36	1
12		Not Set1	 2025-02-01     12:32:03	1
12		Not Set1	 2025-02-01     13:24:49	1
8	lurdes	Not Set1	 2025-02-01     13:56:15	1
8	lurdes	Not Set1	 2025-02-01     14:56:38	1
2		Not Set1	 2025-02-01     15:34:44	1
12		Not Set1	 2025-02-01     16:57:09	1
10	mauricio	Not Set7	 2025-02-02     07:50:25	1
14	Rosangela Fagundes	Not Set1	 2025-02-02     08:15:13	1
14	Rosangela Fagundes	Not Set1	 2025-02-02     10:53:26	1
14	Rosangela Fagundes	Not Set1	 2025-02-02     11:26:03	1
10	mauricio	Not Set7	 2025-02-02     14:02:22	1
10	mauricio	Not Set7	 2025-02-03     05:10:57	1
14	Rosangela Fagundes	Not Set1	 2025-02-03     06:11:35	1
14	Rosangela Fagundes	Not Set1	 2025-02-03     09:49:56	1
14	Rosangela Fagundes	Not Set1	 2025-02-03     10:14:08	1
8	lurdes	Not Set1	 2025-02-03     11:33:30	1
9	manuella meireles	Not Set1	 2025-02-03     11:34:38	1
9	manuella meireles	Not Set1	 2025-02-03     11:43:04	1
10	mauricio	Not Set7	 2025-02-03     12:11:43	1
12		Not Set7	 2025-02-03     13:38:04	1
17	lays	Not Set1	 2025-02-03     14:25:00	1
2		Not Set1	 2025-02-03     14:29:04	1
8	lurdes	Not Set1	 2025-02-03     14:44:52	1
9	manuella meireles	Not Set1	 2025-02-03     14:45:00	1
9	manuella meireles	Not Set1	 2025-02-03     15:47:52	1
8	lurdes	Not Set1	 2025-02-03     15:47:56	1
12		Not Set1	 2025-02-03     17:04:44	1
2		Not Set1	 2025-02-03     17:39:56	1
12		Not Set1	 2025-02-03     18:06:41	1
2		Not Set1	 2025-02-03     18:40:47	1
9	manuella meireles	Not Set1	 2025-02-03     20:02:33	1
8	lurdes	Not Set1	 2025-02-03     20:09:35	1
17	lays	Not Set1	 2025-02-03     20:27:30	1
17	lays	Not Set1	 2025-02-03     21:25:26	1
2		Not Set1	 2025-02-03     22:50:24	1
17	lays	Not Set1	 2025-02-03     22:50:31	1
12		Not Set1	 2025-02-03     22:55:55	1
14	Rosangela Fagundes	Not Set1	 2025-02-04     06:04:30	1
14	Rosangela Fagundes	Not Set1	 2025-02-04     10:13:46	1
14	Rosangela Fagundes	Not Set1	 2025-02-04     10:49:28	1
8	lurdes	Not Set1	 2025-02-04     11:40:38	1
10	mauricio	Not Set7	 2025-02-04     12:16:35	1
14	Rosangela Fagundes	Not Set1	 2025-02-04     14:22:37	1
17	lays	Not Set1	 2025-02-04     14:37:08	1
12		Not Set1	 2025-02-04     14:39:17	1
2		Not Set1	 2025-02-04     14:39:34	1
8	lurdes	Not Set1	 2025-02-04     15:58:44	1
10	mauricio	Not Set7	 2025-02-04     15:59:03	1
10	mauricio	Not Set7	 2025-02-04     16:26:31	1
12		Not Set7	 2025-02-04     16:50:16	1
8	lurdes	Not Set1	 2025-02-04     16:57:20	1
2		Not Set1	 2025-02-04     17:00:10	1
12		Not Set1	 2025-02-04     17:39:24	1
2		Not Set1	 2025-02-04     18:02:50	1
10	mauricio	Not Set7	 2025-02-04     19:20:07	1
17	lays	Not Set1	 2025-02-04     20:13:24	1
17	lays	Not Set1	 2025-02-04     21:20:58	1
12		Not Set1	 2025-02-04     22:55:29	1
2		Not Set1	 2025-02-04     22:55:49	1
17	lays	Not Set1	 2025-02-04     22:55:54	1
10	mauricio	Not Set7	 2025-02-05     04:56:20	1
14	Rosangela Fagundes	Not Set1	 2025-02-05     06:18:13	1
14	Rosangela Fagundes	Not Set1	 2025-02-05     10:00:18	1
14	Rosangela Fagundes	Not Set1	 2025-02-05     10:58:34	1
8	lurdes	Not Set1	 2025-02-05     11:39:11	1
12		Not Set1	 2025-02-05     12:40:13	1
10	mauricio	Not Set7	 2025-02-05     12:41:59	1
17	lays	Not Set1	 2025-02-05     14:31:53	1
2		Not Set1	 2025-02-05     14:40:25	1
12		Not Set1	 2025-02-05     16:03:44	1
8	lurdes	Not Set1	 2025-02-05     16:03:47	1
2		Not Set1	 2025-02-05     17:01:18	1
12		Not Set1	 2025-02-05     17:02:06	1
2		Not Set1	 2025-02-05     17:53:59	1
17	lays	Not Set1	 2025-02-05     19:53:47	1
17	lays	Not Set1	 2025-02-05     20:53:39	1
8	lurdes	Not Set1	 2025-02-05     21:21:19	1
12		Not Set1	 2025-02-05     22:19:18	1
2		Not Set1	 2025-02-05     22:49:06	1
17	lays	Not Set1	 2025-02-05     22:59:13	1
10	mauricio	Not Set7	 2025-02-06     05:13:26	1
14	Rosangela Fagundes	Not Set1	 2025-02-06     06:02:46	1
14	Rosangela Fagundes	Not Set1	 2025-02-06     10:12:13	1
14	Rosangela Fagundes	Not Set1	 2025-02-06     11:17:27	1
10	mauricio	Not Set7	 2025-02-06     11:34:45	1
8	lurdes	Not Set1	 2025-02-06     11:40:10	1
12		Not Set1	 2025-02-06     13:06:57	1
14	Rosangela Fagundes	Not Set1	 2025-02-06     14:22:03	1
2		Not Set1	 2025-02-06     14:31:29	1
17	lays	Not Set1	 2025-02-06     14:37:12	1
9	manuella meireles	Not Set1	 2025-02-06     15:05:48	1
8	lurdes	Not Set1	 2025-02-06     15:47:42	1
12		Not Set1	 2025-02-06     16:10:08	1
8	lurdes	Not Set1	 2025-02-06     16:47:19	1
12		Not Set1	 2025-02-06     17:12:42	1
8	lurdes	Not Set1	 2025-02-06     20:02:18	1
17	lays	Not Set1	 2025-02-06     20:02:58	1
17	lays	Not Set1	 2025-02-06     21:01:46	1
12		Not Set1	 2025-02-06     21:53:28	1
2		Not Set1	 2025-02-06     22:56:00	1
17	lays	Not Set1	 2025-02-06     22:57:12	1
10	mauricio	Not Set7	 2025-02-07     04:43:13	1
14	Rosangela Fagundes	Not Set1	 2025-02-07     06:03:42	1
14	Rosangela Fagundes	Not Set1	 2025-02-07     10:03:29	1
14	Rosangela Fagundes	Not Set1	 2025-02-07     10:35:17	1
8	lurdes	Not Set1	 2025-02-07     11:41:25	1
10	mauricio	Not Set7	 2025-02-07     12:14:32	1
12		Not Set7	 2025-02-07     14:05:11	1
14	Rosangela Fagundes	Not Set1	 2025-02-07     14:08:03	1
17	lays	Not Set1	 2025-02-07     14:31:06	1
2		Not Set1	 2025-02-07     14:35:53	1
12		Not Set1	 2025-02-07     16:02:04	1
8	lurdes	Not Set1	 2025-02-07     16:02:46	1
8	lurdes	Not Set1	 2025-02-07     17:02:29	1
2		Not Set1	 2025-02-07     17:04:43	1
12		Not Set1	 2025-02-07     17:09:50	1
2		Not Set1	 2025-02-07     18:03:41	1
17	lays	Not Set1	 2025-02-07     19:56:38	1
8	lurdes	Not Set1	 2025-02-07     20:18:59	1
17	lays	Not Set1	 2025-02-07     20:56:38	1
12		Not Set1	 2025-02-07     22:55:56	1
17	lays	Not Set1	 2025-02-07     22:56:00	1
2		Not Set1	 2025-02-07     22:56:07	1
12		Not Set1	 2025-02-08     07:53:57	1
2		Not Set1	 2025-02-08     07:54:42	1
17	lays	Not Set1	 2025-02-08     09:37:54	1
8	lurdes	Not Set1	 2025-02-08     09:48:33	1
2		Not Set1	 2025-02-08     11:56:09	1
17	lays	Not Set1	 2025-02-08     11:58:14	1
17	lays	Not Set1	 2025-02-08     12:54:38	1
12		Not Set1	 2025-02-08     12:56:01	1
2		Not Set1	 2025-02-08     13:01:00	1
8	lurdes	Not Set1	 2025-02-08     14:01:22	1
2		Not Set1	 2025-02-08     15:46:40	1
8	lurdes	Not Set1	 2025-02-08     16:58:19	1
17	lays	Not Set1	 2025-02-08     16:58:27	1
9	manuella meireles	Not Set1	 2025-02-09     07:51:43	1
14	Rosangela Fagundes	Not Set1	 2025-02-09     07:52:25	1
14	Rosangela Fagundes	Not Set1	 2025-02-09     10:01:52	1
14	Rosangela Fagundes	Not Set1	 2025-02-09     10:18:41	1
10	mauricio	Not Set7	 2025-02-10     04:41:01	1
14	Rosangela Fagundes	Not Set1	 2025-02-10     06:07:10	1
14	Rosangela Fagundes	Not Set1	 2025-02-10     09:56:11	1
10	mauricio	Not Set7	 2025-02-10     10:23:02	1
14	Rosangela Fagundes	Not Set1	 2025-02-10     10:38:00	1
10	mauricio	Not Set7	 2025-02-10     11:20:41	1
8	lurdes	Not Set1	 2025-02-10     11:47:23	1
10	mauricio	Not Set7	 2025-02-10     13:28:00	1
17	lays	Not Set1	 2025-02-10     13:59:06	1
14	Rosangela Fagundes	Not Set1	 2025-02-10     14:17:11	1
12		Not Set1	 2025-02-10     14:28:45	1
2		Not Set1	 2025-02-10     14:36:16	1
8	lurdes	Not Set1	 2025-02-10     16:03:41	1
12		Not Set1	 2025-02-10     16:04:22	1
12		Not Set1	 2025-02-10     16:54:31	1
2		Not Set1	 2025-02-10     17:01:33	1
8	lurdes	Not Set1	 2025-02-10     17:03:37	1
2		Not Set1	 2025-02-10     17:56:31	1
8	lurdes	Not Set1	 2025-02-10     20:04:05	1
17	lays	Not Set1	 2025-02-10     20:27:53	1
17	lays	Not Set1	 2025-02-10     21:24:35	1
17	lays	Not Set1	 2025-02-10     22:20:08	1
2		Not Set1	 2025-02-10     22:54:21	1
12		Not Set1	 2025-02-10     22:56:05	1
10	mauricio	Not Set7	 2025-02-11     05:41:27	1
14	Rosangela Fagundes	Not Set1	 2025-02-11     06:07:30	1
10	mauricio	Not Set7	 2025-02-11     09:11:29	1
14	Rosangela Fagundes	Not Set1	 2025-02-11     10:09:08	1
10	mauricio	Not Set7	 2025-02-11     10:10:22	1
14	Rosangela Fagundes	Not Set1	 2025-02-11     10:38:32	1
8	lurdes	Not Set1	 2025-02-11     11:40:23	1
12		Not Set1	 2025-02-11     12:55:40	1
10	mauricio	Not Set7	 2025-02-11     13:08:28	1
14	Rosangela Fagundes	Not Set1	 2025-02-11     14:17:03	1
17	lays	Not Set1	 2025-02-11     14:36:13	1
2		Not Set1	 2025-02-11     14:36:19	1
12		Not Set1	 2025-02-11     15:04:32	1
8	lurdes	Not Set1	 2025-02-11     15:04:35	1
20	carolina peixoto	Not Set1	 2025-02-11     15:17:14	1
8	lurdes	Not Set1	 2025-02-11     16:02:10	1
2		Not Set1	 2025-02-11     16:05:32	1
12		Not Set1	 2025-02-11     16:06:07	1
20	carolina peixoto	Not Set1	 2025-02-11     16:11:12	1
2		Not Set1	 2025-02-11     17:08:14	1
17	lays	Not Set1	 2025-02-11     19:47:23	1
8	lurdes	Not Set1	 2025-02-11     20:15:10	1
17	lays	Not Set1	 2025-02-11     20:46:16	1
2		Not Set1	 2025-02-11     22:55:07	1
17	lays	Not Set1	 2025-02-11     22:56:02	1
12		Not Set1	 2025-02-11     22:57:06	1
10	mauricio	Not Set7	 2025-02-12     04:49:49	1
14	Rosangela Fagundes	Not Set1	 2025-02-12     06:04:17	1
20	carolina peixoto	Not Set1	 2025-02-12     07:51:49	1
14	Rosangela Fagundes	Not Set1	 2025-02-12     10:01:28	1
14	Rosangela Fagundes	Not Set1	 2025-02-12     11:04:21	1
10	mauricio	Not Set7	 2025-02-12     11:10:38	1
8	lurdes	Not Set1	 2025-02-12     11:40:36	1
10	mauricio	Not Set7	 2025-02-12     11:57:01	1
12		Not Set7	 2025-02-12     13:11:01	1
20	carolina peixoto	Not Set1	 2025-02-12     13:13:23	1
10	mauricio	Not Set7	 2025-02-12     13:14:19	1
20	carolina peixoto	Not Set1	 2025-02-12     14:13:43	1
14	Rosangela Fagundes	Not Set1	 2025-02-12     14:15:55	1
17	lays	Not Set1	 2025-02-12     14:30:19	1
2		Not Set1	 2025-02-12     14:36:54	1
8	lurdes	Not Set1	 2025-02-12     15:21:44	1
12		Not Set1	 2025-02-12     15:24:03	1
20	carolina peixoto	Not Set1	 2025-02-12     16:08:01	1
12		Not Set1	 2025-02-12     16:19:33	1
8	lurdes	Not Set1	 2025-02-12     16:21:55	1
2		Not Set1	 2025-02-12     16:25:48	1
2		Not Set1	 2025-02-12     17:27:12	1
17	lays	Not Set1	 2025-02-12     20:09:41	1
8	lurdes	Not Set1	 2025-02-12     20:48:48	1
17	lays	Not Set1	 2025-02-12     21:10:36	1
2		Not Set1	 2025-02-12     22:54:38	1
17	lays	Not Set1	 2025-02-12     22:56:24	1
12		Not Set1	 2025-02-12     22:57:21	1
10	mauricio	Not Set7	 2025-02-13     04:49:00	1
21	brenda pierini	Not Set1	 2025-02-13     05:22:26	1
14	Rosangela Fagundes	Not Set1	 2025-02-13     06:13:30	1
20	carolina peixoto	Not Set1	 2025-02-13     07:52:04	1
21	brenda pierini	Not Set1	 2025-02-13     09:13:30	1
21	brenda pierini	Not Set1	 2025-02-13     10:12:44	1
14	Rosangela Fagundes	Not Set1	 2025-02-13     10:18:49	1
14	Rosangela Fagundes	Not Set1	 2025-02-13     10:40:01	1
8	lurdes	Not Set1	 2025-02-13     11:40:50	1
10	mauricio	Not Set7	 2025-02-13     12:19:23	1
21	brenda pierini	Not Set1	 2025-02-13     13:09:32	1
14	Rosangela Fagundes	Not Set1	 2025-02-13     14:17:40	1
17	lays	Not Set1	 2025-02-13     14:37:33	1
12		Not Set1	 2025-02-13     14:40:33	1
2		Not Set1	 2025-02-13     14:41:00	1
20	carolina peixoto	Not Set1	 2025-02-13     14:41:25	1
20	carolina peixoto	Not Set1	 2025-02-13     15:40:56	1
12		Not Set1	 2025-02-13     16:04:30	1
8	lurdes	Not Set1	 2025-02-13     16:04:40	1
20	carolina peixoto	Not Set1	 2025-02-13     16:12:56	1
12		Not Set1	 2025-02-13     17:02:59	1
8	lurdes	Not Set1	 2025-02-13     17:03:13	1
2		Not Set1	 2025-02-13     17:04:29	1
2		Not Set1	 2025-02-13     18:00:43	1
17	lays	Not Set1	 2025-02-13     20:02:02	1
8	lurdes	Not Set1	 2025-02-13     20:05:17	1
9	manuella meireles	Not Set1	 2025-02-13     20:35:27	1
17	lays	Not Set1	 2025-02-13     21:00:48	1
2		Not Set1	 2025-02-13     22:54:36	1
17	lays	Not Set1	 2025-02-13     22:54:40	1
12		Not Set1	 2025-02-13     22:58:26	1
21	brenda pierini	Not Set1	 2025-02-14     04:49:58	1
10	mauricio	Not Set7	 2025-02-14     04:50:02	1
14	Rosangela Fagundes	Not Set1	 2025-02-14     06:14:22	1
20	carolina peixoto	Not Set1	 2025-02-14     07:59:49	1
21	brenda pierini	Not Set1	 2025-02-14     09:18:15	1
14	Rosangela Fagundes	Not Set1	 2025-02-14     10:08:58	1
21	brenda pierini	Not Set1	 2025-02-14     10:12:43	1
14	Rosangela Fagundes	Not Set1	 2025-02-14     10:27:05	1
10	mauricio	Not Set7	 2025-02-14     10:52:25	1
10	mauricio	Not Set7	 2025-02-14     11:25:14	1
8	lurdes	Not Set1	 2025-02-14     11:40:03	1
20	carolina peixoto	Not Set1	 2025-02-14     11:59:51	1
20	carolina peixoto	Not Set1	 2025-02-14     12:59:50	1
21	brenda pierini	Not Set1	 2025-02-14     13:05:17	1
10	mauricio	Not Set7	 2025-02-14     13:06:10	1
14	Rosangela Fagundes	Not Set1	 2025-02-14     14:16:11	1
17	lays	Not Set1	 2025-02-14     14:32:44	1
12		Not Set1	 2025-02-14     14:33:41	1
2		Not Set1	 2025-02-14     14:48:43	1
12		Not Set1	 2025-02-14     16:31:14	1
8	lurdes	Not Set1	 2025-02-14     16:31:18	1
20	carolina peixoto	Not Set1	 2025-02-14     16:42:27	1
12		Not Set1	 2025-02-14     17:31:48	1
8	lurdes	Not Set1	 2025-02-14     17:31:53	1
2		Not Set1	 2025-02-14     17:32:02	1
2		Not Set1	 2025-02-14     18:21:57	1
17	lays	Not Set1	 2025-02-14     20:00:54	1
8	lurdes	Not Set1	 2025-02-14     20:07:51	1
17	lays	Not Set1	 2025-02-14     21:00:06	1
12		Not Set1	 2025-02-14     22:53:46	1
2		Not Set1	 2025-02-14     22:55:08	1
17	lays	Not Set1	 2025-02-14     22:55:20	1
21	brenda pierini	Not Set1	 2025-02-15     07:49:40	1
2		Not Set1	 2025-02-15     07:49:48	1
22	nilo	Not Set1	 2025-02-15     09:39:42	1
12		Not Set1	 2025-02-15     09:50:10	1
21	brenda pierini	Not Set1	 2025-02-15     11:00:36	1
2		Not Set1	 2025-02-15     11:52:24	1
21	brenda pierini	Not Set1	 2025-02-15     12:05:34	1
22	nilo	Not Set1	 2025-02-15     13:00:05	1
2		Not Set1	 2025-02-15     13:00:08	1
12		Not Set1	 2025-02-15     13:09:20	1
22	nilo	Not Set1	 2025-02-15     14:00:20	1
12		Not Set1	 2025-02-15     14:13:07	1
2		Not Set1	 2025-02-15     15:16:58	1
21	brenda pierini	Not Set1	 2025-02-15     15:20:12	1
12		Not Set1	 2025-02-15     16:52:24	1
22	nilo	Not Set1	 2025-02-15     16:52:29	1
10	mauricio	Not Set7	 2025-02-16     07:52:38	1
14	Rosangela Fagundes	Not Set1	 2025-02-16     07:56:45	1
14	Rosangela Fagundes	Not Set1	 2025-02-16     11:12:49	1
14	Rosangela Fagundes	Not Set1	 2025-02-16     11:59:09	1
10	mauricio	Not Set7	 2025-02-16     14:01:36	1
21	brenda pierini	Not Set1	 2025-02-17     05:06:45	1
10	mauricio	Not Set7	 2025-02-17     05:13:18	1
14	Rosangela Fagundes	Not Set1	 2025-02-17     06:05:18	1
20	carolina peixoto	Not Set1	 2025-02-17     07:49:00	1
22	nilo	Not Set1	 2025-02-17     08:00:23	1
21	brenda pierini	Not Set1	 2025-02-17     09:31:34	1
14	Rosangela Fagundes	Not Set1	 2025-02-17     09:55:42	1
21	brenda pierini	Not Set1	 2025-02-17     10:27:18	1
14	Rosangela Fagundes	Not Set1	 2025-02-17     10:36:32	1
9	manuella meireles	Not Set1	 2025-02-17     11:12:52	1
8	lurdes	Not Set1	 2025-02-17     11:49:29	1
22	nilo	Not Set1	 2025-02-17     12:00:29	1
20	carolina peixoto	Not Set1	 2025-02-17     12:19:24	1
10	mauricio	Not Set7	 2025-02-17     12:25:20	1
22	nilo	Not Set1	 2025-02-17     13:00:21	1
21	brenda pierini	Not Set1	 2025-02-17     13:12:13	1
20	carolina peixoto	Not Set1	 2025-02-17     13:19:35	1
12		Not Set1	 2025-02-17     14:02:18	1
14	Rosangela Fagundes	Not Set1	 2025-02-17     14:14:55	1
17	lays	Not Set1	 2025-02-17     14:20:16	1
2		Not Set1	 2025-02-17     14:39:24	1
22	nilo	Not Set1	 2025-02-17     16:01:08	1
20	carolina peixoto	Not Set1	 2025-02-17     16:20:50	1
12		Not Set1	 2025-02-17     16:21:01	1
8	lurdes	Not Set1	 2025-02-17     16:21:06	1
12		Not Set1	 2025-02-17     17:25:24	1
8	lurdes	Not Set1	 2025-02-17     17:25:27	1
2		Not Set1	 2025-02-17     17:29:57	1
2		Not Set1	 2025-02-17     18:53:39	1
17	lays	Not Set1	 2025-02-17     20:06:04	1
9	manuella meireles	Not Set1	 2025-02-17     20:23:54	1
8	lurdes	Not Set1	 2025-02-17     20:23:58	1
17	lays	Not Set1	 2025-02-17     21:06:32	1
12		Not Set1	 2025-02-17     22:56:18	1
17	lays	Not Set1	 2025-02-17     23:00:46	1
2		Not Set1	 2025-02-17     23:02:08	1
21	brenda pierini	Not Set1	 2025-02-18     04:52:38	1
14	Rosangela Fagundes	Not Set1	 2025-02-18     06:07:37	1
20	carolina peixoto	Not Set1	 2025-02-18     07:56:22	1
22	nilo	Not Set1	 2025-02-18     08:00:27	1
10	mauricio	Not Set7	 2025-02-18     09:27:39	1
21	brenda pierini	Not Set1	 2025-02-18     10:00:21	1
20	carolina peixoto	Not Set1	 2025-02-18     10:14:54	1
14	Rosangela Fagundes	Not Set1	 2025-02-18     10:24:25	1
20	carolina peixoto	Not Set1	 2025-02-18     11:14:17	1
14	Rosangela Fagundes	Not Set1	 2025-02-18     11:17:21	1
8	lurdes	Not Set1	 2025-02-18     11:40:13	1
22	nilo	Not Set1	 2025-02-18     12:01:08	1
22	nilo	Not Set1	 2025-02-18     12:59:53	1
21	brenda pierini	Not Set1	 2025-02-18     13:11:48	1
10	mauricio	Not Set7	 2025-02-18     14:00:20	1
14	Rosangela Fagundes	Not Set1	 2025-02-18     14:14:57	1
17	lays	Not Set1	 2025-02-18     14:30:46	1
12		Not Set1	 2025-02-18     14:31:49	1
2		Not Set1	 2025-02-18     14:40:25	1
10	mauricio	Not Set7	 2025-02-18     14:51:59	1
22	nilo	Not Set1	 2025-02-18     16:00:06	1
20	carolina peixoto	Not Set1	 2025-02-18     16:10:56	1
12		Not Set1	 2025-02-18     16:16:25	1
8	lurdes	Not Set1	 2025-02-18     16:16:33	1
12		Not Set1	 2025-02-18     17:12:50	1
8	lurdes	Not Set1	 2025-02-18     17:16:35	1
2		Not Set1	 2025-02-18     17:16:59	1
10	mauricio	Not Set7	 2025-02-18     18:01:52	1
2		Not Set7	 2025-02-18     18:02:03	1
17	lays	Not Set1	 2025-02-18     19:51:21	1
8	lurdes	Not Set1	 2025-02-18     20:27:26	1
17	lays	Not Set1	 2025-02-18     20:51:17	1
12		Not Set1	 2025-02-18     22:57:04	1
2		Not Set1	 2025-02-18     22:57:07	1
17	lays	Not Set1	 2025-02-18     23:00:10	1
21	brenda pierini	Not Set1	 2025-02-19     04:45:21	1
14	Rosangela Fagundes	Not Set1	 2025-02-19     06:04:31	1
20	carolina peixoto	Not Set1	 2025-02-19     07:58:44	1
22	nilo	Not Set1	 2025-02-19     08:00:27	1
21	brenda pierini	Not Set1	 2025-02-19     09:07:19	1
10	mauricio	Not Set7	 2025-02-19     10:03:10	1
21	brenda pierini	Not Set1	 2025-02-19     10:05:00	1
14	Rosangela Fagundes	Not Set1	 2025-02-19     10:10:05	1
20	carolina peixoto	Not Set1	 2025-02-19     10:10:28	1
14	Rosangela Fagundes	Not Set1	 2025-02-19     10:41:48	1
20	carolina peixoto	Not Set1	 2025-02-19     11:09:35	1
8	lurdes	Not Set1	 2025-02-19     11:41:20	1
22	nilo	Not Set1	 2025-02-19     12:00:03	1
12		Not Set1	 2025-02-19     12:50:02	1
22	nilo	Not Set1	 2025-02-19     13:01:15	1
21	brenda pierini	Not Set1	 2025-02-19     13:09:58	1
10	mauricio	Not Set7	 2025-02-19     13:13:48	1
10	mauricio	Not Set7	 2025-02-19     14:06:10	1
14	Rosangela Fagundes	Not Set1	 2025-02-19     14:16:59	1
17	lays	Not Set1	 2025-02-19     14:24:28	1
2		Not Set1	 2025-02-19     14:38:44	1
22	nilo	Not Set1	 2025-02-19     16:03:35	1
12		Not Set1	 2025-02-19     16:03:54	1
8	lurdes	Not Set1	 2025-02-19     16:04:02	1
20	carolina peixoto	Not Set1	 2025-02-19     16:14:18	1
9	manuella meireles	Not Set1	 2025-02-19     17:02:32	1
8	lurdes	Not Set1	 2025-02-19     17:10:52	1
12		Not Set1	 2025-02-19     17:10:58	1
2		Not Set1	 2025-02-19     17:29:43	1
10	mauricio	Not Set7	 2025-02-19     18:25:05	1
2		Not Set7	 2025-02-19     18:30:39	1
17	lays	Not Set1	 2025-02-19     19:51:45	1
8	lurdes	Not Set1	 2025-02-19     20:23:18	1
17	lays	Not Set1	 2025-02-19     20:50:58	1
12		Not Set1	 2025-02-19     20:59:33	1
2		Not Set1	 2025-02-19     22:55:47	1
17	lays	Not Set1	 2025-02-19     22:59:09	1
21	brenda pierini	Not Set1	 2025-02-20     04:47:39	1
14	Rosangela Fagundes	Not Set1	 2025-02-20     06:09:07	1
20	carolina peixoto	Not Set1	 2025-02-20     07:59:53	1
22	nilo	Not Set1	 2025-02-20     08:00:26	1
21	brenda pierini	Not Set1	 2025-02-20     09:22:14	1
10	mauricio	Not Set7	 2025-02-20     10:05:20	1
21	brenda pierini	Not Set1	 2025-02-20     10:14:54	1
20	carolina peixoto	Not Set1	 2025-02-20     10:16:58	1
14	Rosangela Fagundes	Not Set1	 2025-02-20     10:19:04	1
14	Rosangela Fagundes	Not Set1	 2025-02-20     10:34:45	1
20	carolina peixoto	Not Set1	 2025-02-20     11:14:27	1
8	lurdes	Not Set1	 2025-02-20     11:40:48	1
22	nilo	Not Set1	 2025-02-20     12:00:36	1
22	nilo	Not Set1	 2025-02-20     12:59:42	1
21	brenda pierini	Not Set1	 2025-02-20     13:05:18	1
12		Not Set1	 2025-02-20     13:41:09	1
14	Rosangela Fagundes	Not Set1	 2025-02-20     14:22:57	1
17	lays	Not Set1	 2025-02-20     14:25:43	1
2		Not Set1	 2025-02-20     14:37:13	1
10	mauricio	Not Set7	 2025-02-20     15:08:43	1
12		Not Set7	 2025-02-20     15:08:48	1
8	lurdes	Not Set1	 2025-02-20     15:09:24	1
10	mauricio	Not Set7	 2025-02-20     15:57:03	1
22	nilo	Not Set1	 2025-02-20     16:03:10	1
12		Not Set1	 2025-02-20     16:05:02	1
2		Not Set1	 2025-02-20     16:05:31	1
20	carolina peixoto	Not Set1	 2025-02-20     16:11:41	1
8	lurdes	Not Set1	 2025-02-20     16:18:33	1
2		Not Set1	 2025-02-20     17:05:23	1
10	mauricio	Not Set7	 2025-02-20     18:31:10	1
8	lurdes	Not Set1	 2025-02-20     20:01:40	1
17	lays	Not Set1	 2025-02-20     20:18:38	1
9	manuella meireles	Not Set1	 2025-02-20     20:30:33	1
17	lays	Not Set1	 2025-02-20     21:20:22	1
12		Not Set1	 2025-02-20     22:27:41	1
17	lays	Not Set1	 2025-02-20     22:56:32	1
2		Not Set1	 2025-02-20     22:57:19	1
21	brenda pierini	Not Set1	 2025-02-21     04:45:05	1
14	Rosangela Fagundes	Not Set1	 2025-02-21     06:08:01	1
22	nilo	Not Set1	 2025-02-21     08:00:19	1
20	carolina peixoto	Not Set1	 2025-02-21     08:13:11	1
21	brenda pierini	Not Set1	 2025-02-21     09:00:26	1
10	mauricio	Not Set7	 2025-02-21     10:01:18	1
21	brenda pierini	Not Set1	 2025-02-21     10:02:23	1
20	carolina peixoto	Not Set1	 2025-02-21     10:06:13	1
14	Rosangela Fagundes	Not Set1	 2025-02-21     10:33:59	1
14	Rosangela Fagundes	Not Set1	 2025-02-21     10:54:50	1
20	carolina peixoto	Not Set1	 2025-02-21     11:03:27	1
8	lurdes	Not Set1	 2025-02-21     11:40:51	1
22	nilo	Not Set1	 2025-02-21     12:03:11	1
22	nilo	Not Set1	 2025-02-21     13:00:24	1
21	brenda pierini	Not Set1	 2025-02-21     13:07:17	1
12		Not Set1	 2025-02-21     13:36:16	1
14	Rosangela Fagundes	Not Set1	 2025-02-21     14:11:20	1
17	lays	Not Set1	 2025-02-21     14:27:50	1
2		Not Set1	 2025-02-21     14:40:09	1
12		Not Set1	 2025-02-21     15:18:52	1
20	carolina peixoto	Not Set1	 2025-02-21     15:38:02	1
10	mauricio	Not Set7	 2025-02-21     15:52:52	1
8	lurdes	Not Set1	 2025-02-21     15:54:55	1
22	nilo	Not Set1	 2025-02-21     16:00:19	1
12		Not Set1	 2025-02-21     16:17:46	1
10	mauricio	Not Set7	 2025-02-21     16:35:05	1
8	lurdes	Not Set1	 2025-02-21     16:50:44	1
2		Not Set1	 2025-02-21     16:50:58	1
2		Not Set1	 2025-02-21     17:49:02	1
10	mauricio	Not Set7	 2025-02-21     18:22:03	1
8	lurdes	Not Set1	 2025-02-21     20:03:50	1
17	lays	Not Set1	 2025-02-21     20:04:39	1
17	lays	Not Set1	 2025-02-21     21:04:14	1
2		Not Set1	 2025-02-21     22:55:00	1
17	lays	Not Set1	 2025-02-21     23:00:01	1
20	carolina peixoto	Not Set1	 2025-02-22     07:57:35	1
8	lurdes	Not Set1	 2025-02-22     08:29:57	1
14	Rosangela Fagundes	Not Set1	 2025-02-22     09:32:13	1
21	brenda pierini	Not Set1	 2025-02-22     09:43:02	1
20	carolina peixoto	Not Set1	 2025-02-22     11:06:15	1
20	carolina peixoto	Not Set1	 2025-02-22     12:11:24	1
8	lurdes	Not Set1	 2025-02-22     12:22:20	1
21	brenda pierini	Not Set1	 2025-02-22     12:25:06	1
14	Rosangela Fagundes	Not Set1	 2025-02-22     12:48:11	1
14	Rosangela Fagundes	Not Set1	 2025-02-22     13:16:58	1
21	brenda pierini	Not Set1	 2025-02-22     13:24:24	1
8	lurdes	Not Set1	 2025-02-22     15:19:28	1
20	carolina peixoto	Not Set1	 2025-02-22     15:21:51	1
14	Rosangela Fagundes	Not Set1	 2025-02-22     16:49:26	1
21	brenda pierini	Not Set1	 2025-02-22     17:01:27	1
17	lays	Not Set1	 2025-02-23     07:41:35	1
22	nilo	Not Set1	 2025-02-23     07:41:58	1
22	nilo	Not Set1	 2025-02-23     10:23:28	1
22	nilo	Not Set1	 2025-02-23     10:43:12	1
17	lays	Not Set1	 2025-02-23     13:58:14	1
22	nilo	Not Set1	 2025-02-23     13:59:12	1
21	brenda pierini	Not Set1	 2025-02-24     04:45:48	1
14	Rosangela Fagundes	Not Set1	 2025-02-24     06:05:20	1
22	nilo	Not Set1	 2025-02-24     08:00:17	1
20	carolina peixoto	Not Set1	 2025-02-24     08:36:31	1
21	brenda pierini	Not Set1	 2025-02-24     09:32:07	1
10	mauricio	Not Set7	 2025-02-24     09:54:39	1
21	brenda pierini	Not Set1	 2025-02-24     10:31:05	1
14	Rosangela Fagundes	Not Set1	 2025-02-24     10:31:55	1
14	Rosangela Fagundes	Not Set1	 2025-02-24     10:56:48	1
8	lurdes	Not Set1	 2025-02-24     11:41:15	1
22	nilo	Not Set1	 2025-02-24     12:00:41	1
22	nilo	Not Set1	 2025-02-24     13:00:40	1
21	brenda pierini	Not Set1	 2025-02-24     13:05:53	1
20	carolina peixoto	Not Set1	 2025-02-24     13:12:34	1
12		Not Set1	 2025-02-24     13:37:35	1
20	carolina peixoto	Not Set1	 2025-02-24     14:15:25	1
14	Rosangela Fagundes	Not Set1	 2025-02-24     14:22:58	1
17	lays	Not Set1	 2025-02-24     14:35:26	1
2		Not Set1	 2025-02-24     14:37:55	1
9	manuella meireles	Not Set1	 2025-02-24     15:14:59	1
10	mauricio	Not Set7	 2025-02-24     15:15:05	1
12		Not Set7	 2025-02-24     15:40:49	1
22	nilo	Not Set1	 2025-02-24     16:00:18	1
10	mauricio	Not Set7	 2025-02-24     16:05:49	1
8	lurdes	Not Set1	 2025-02-24     16:16:51	1
12		Not Set1	 2025-02-24     16:36:38	1
20	carolina peixoto	Not Set1	 2025-02-24     16:57:13	1
2		Not Set1	 2025-02-24     17:30:43	1
10	mauricio	Not Set7	 2025-02-24     18:30:35	1
2		Not Set7	 2025-02-24     19:00:38	1
17	lays	Not Set1	 2025-02-24     20:03:14	1
8	lurdes	Not Set1	 2025-02-24     20:05:35	1
17	lays	Not Set1	 2025-02-24     21:02:56	1
12		Not Set1	 2025-02-24     21:55:13	1
2		Not Set1	 2025-02-24     21:58:48	1
17	lays	Not Set1	 2025-02-24     22:57:18	1
21	brenda pierini	Not Set1	 2025-02-25     04:51:18	1
2		Not Set1	 2025-02-25     05:06:42	1
14	Rosangela Fagundes	Not Set1	 2025-02-25     06:10:26	1
20	carolina peixoto	Not Set1	 2025-02-25     07:52:19	1
21	brenda pierini	Not Set1	 2025-02-25     07:56:32	1
2		Not Set1	 2025-02-25     09:12:00	1
10	mauricio	Not Set7	 2025-02-25     09:52:29	1
14	Rosangela Fagundes	Not Set1	 2025-02-25     09:59:43	1
14	Rosangela Fagundes	Not Set1	 2025-02-25     10:26:09	1
2		Not Set1	 2025-02-25     10:26:27	1
9	manuella meireles	Not Set1	 2025-02-25     10:58:54	1
8	lurdes	Not Set1	 2025-02-25     11:48:37	1
20	carolina peixoto	Not Set1	 2025-02-25     13:27:41	1
12		Not Set1	 2025-02-25     14:08:15	1
14	Rosangela Fagundes	Not Set1	 2025-02-25     14:20:59	1
20	carolina peixoto	Not Set1	 2025-02-25     14:33:35	1
17	lays	Not Set1	 2025-02-25     14:33:38	1
22	nilo	Not Set1	 2025-02-25     14:40:16	1
10	mauricio	Not Set7	 2025-02-25     15:03:00	1
8	lurdes	Not Set1	 2025-02-25     15:03:11	1
10	mauricio	Not Set7	 2025-02-25     15:53:01	1
8	lurdes	Not Set1	 2025-02-25     16:03:40	1
20	carolina peixoto	Not Set1	 2025-02-25     16:16:33	1
12		Not Set1	 2025-02-25     16:36:05	1
12		Not Set1	 2025-02-25     17:21:05	1
10	mauricio	Not Set7	 2025-02-25     17:57:40	1
22	nilo	Not Set1	 2025-02-25     17:58:13	1
22	nilo	Not Set1	 2025-02-25     18:56:55	1
17	lays	Not Set1	 2025-02-25     20:05:17	1
8	lurdes	Not Set1	 2025-02-25     20:14:15	1
17	lays	Not Set1	 2025-02-25     21:04:53	1
12		Not Set1	 2025-02-25     21:59:06	1
22	nilo	Not Set1	 2025-02-25     22:00:55	1
17	lays	Not Set1	 2025-02-25     22:57:40	1
21	brenda pierini	Not Set1	 2025-02-26     04:53:16	1
14	Rosangela Fagundes	Not Set1	 2025-02-26     06:04:00	1
20	carolina peixoto	Not Set1	 2025-02-26     08:16:17	1
21	brenda pierini	Not Set1	 2025-02-26     09:22:10	1
10	mauricio	Not Set7	 2025-02-26     09:51:21	1
21	brenda pierini	Not Set1	 2025-02-26     10:25:33	1
20	carolina peixoto	Not Set1	 2025-02-26     10:39:01	1
14	Rosangela Fagundes	Not Set1	 2025-02-26     11:12:21	1
20	carolina peixoto	Not Set1	 2025-02-26     11:45:43	1
14	Rosangela Fagundes	Not Set1	 2025-02-26     11:55:05	1
8	lurdes	Not Set1	 2025-02-26     11:57:02	1
21	brenda pierini	Not Set1	 2025-02-26     13:06:33	1
12		Not Set1	 2025-02-26     13:16:12	1
22	nilo	Not Set1	 2025-02-26     13:40:02	1
14	Rosangela Fagundes	Not Set1	 2025-02-26     14:23:25	1
17	lays	Not Set1	 2025-02-26     14:32:26	1
10	mauricio	Not Set7	 2025-02-26     15:48:53	1
8	lurdes	Not Set1	 2025-02-26     15:58:49	1
20	carolina peixoto	Not Set1	 2025-02-26     16:32:43	1
10	mauricio	Not Set7	 2025-02-26     16:35:41	1
22	nilo	Not Set1	 2025-02-26     17:01:52	1
8	lurdes	Not Set1	 2025-02-26     17:04:41	1
12		Not Set1	 2025-02-26     17:08:43	1
12		Not Set1	 2025-02-26     17:50:54	1
22	nilo	Not Set1	 2025-02-26     18:00:21	1
10	mauricio	Not Set7	 2025-02-26     19:02:27	1
17	lays	Not Set1	 2025-02-26     19:55:31	1
8	lurdes	Not Set1	 2025-02-26     20:08:38	1
17	lays	Not Set1	 2025-02-26     20:55:39	1
12		Not Set1	 2025-02-26     21:58:36	1
22	nilo	Not Set1	 2025-02-26     22:00:13	1
17	lays	Not Set1	 2025-02-26     23:02:21	1
21	brenda pierini	Not Set1	 2025-02-27     05:02:29	1
14	Rosangela Fagundes	Not Set1	 2025-02-27     06:03:58	1
20	carolina peixoto	Not Set1	 2025-02-27     07:51:48	1
21	brenda pierini	Not Set1	 2025-02-27     07:52:45	1
20	carolina peixoto	Not Set1	 2025-02-27     09:24:22	1
9	manuella meireles	Not Set1	 2025-02-27     09:28:47	1
14	Rosangela Fagundes	Not Set1	 2025-02-27     10:05:32	1
10	mauricio	Not Set7	 2025-02-27     10:10:24	1
20	carolina peixoto	Not Set1	 2025-02-27     10:26:18	1
8	lurdes	Not Set1	 2025-02-27     10:45:48	1
14	Rosangela Fagundes	Not Set1	 2025-02-27     11:21:16	1
9	manuella meireles	Not Set1	 2025-02-27     12:43:24	1
8	lurdes	Not Set1	 2025-02-27     12:43:29	1
21	brenda pierini	Not Set1	 2025-02-27     13:05:08	1
22	nilo	Not Set1	 2025-02-27     13:40:39	1
12		Not Set1	 2025-02-27     13:52:51	1
8	lurdes	Not Set1	 2025-02-27     14:00:45	1
14	Rosangela Fagundes	Not Set1	 2025-02-27     14:20:31	1
17	lays	Not Set1	 2025-02-27     14:36:07	1
12		Not Set1	 2025-02-27     16:04:50	1
20	carolina peixoto	Not Set1	 2025-02-27     16:38:36	1
12		Not Set1	 2025-02-27     16:55:51	1
22	nilo	Not Set1	 2025-02-27     17:01:44	1
10	mauricio	Not Set7	 2025-02-27     17:15:39	1
22	nilo	Not Set1	 2025-02-27     18:00:22	1
10	mauricio	Not Set7	 2025-02-27     18:14:22	1
22	nilo	Not Set1	 2025-02-27     18:20:06	1
10	mauricio	Not Set7	 2025-02-27     18:37:16	1
17	lays	Not Set1	 2025-02-27     20:00:09	1
17	lays	Not Set1	 2025-02-27     21:00:09	1
8	lurdes	Not Set1	 2025-02-27     21:10:47	1
12		Not Set1	 2025-02-27     21:57:34	1
17	lays	Not Set1	 2025-02-27     22:59:19	1
21	brenda pierini	Not Set1	 2025-02-28     04:47:37	1
14	Rosangela Fagundes	Not Set1	 2025-02-28     06:05:57	1
20	carolina peixoto	Not Set1	 2025-02-28     08:15:09	1
21	brenda pierini	Not Set1	 2025-02-28     09:02:48	1
10	mauricio	Not Set7	 2025-02-28     09:52:05	1
21	brenda pierini	Not Set1	 2025-02-28     10:04:48	1
14	Rosangela Fagundes	Not Set1	 2025-02-28     10:21:17	1
14	Rosangela Fagundes	Not Set1	 2025-02-28     10:53:23	1
8	lurdes	Not Set1	 2025-02-28     11:44:43	1
20	carolina peixoto	Not Set1	 2025-02-28     13:04:03	1
21	brenda pierini	Not Set1	 2025-02-28     13:06:54	1
20	carolina peixoto	Not Set1	 2025-02-28     14:03:54	1
14	Rosangela Fagundes	Not Set1	 2025-02-28     14:24:01	1
12		Not Set1	 2025-02-28     14:31:10	1
17	lays	Not Set1	 2025-02-28     14:31:57	1
22	nilo	Not Set1	 2025-02-28     14:39:20	1
10	mauricio	Not Set7	 2025-02-28     15:32:54	1
8	lurdes	Not Set1	 2025-02-28     15:33:03	1
20	carolina peixoto	Not Set1	 2025-02-28     16:15:02	1
10	mauricio	Not Set7	 2025-02-28     16:32:42	1
8	lurdes	Not Set1	 2025-02-28     16:32:50	1
12		Not Set1	 2025-02-28     17:06:48	1
22	nilo	Not Set1	 2025-02-28     17:45:54	1
12		Not Set1	 2025-02-28     17:57:30	1
10	mauricio	Not Set7	 2025-02-28     18:43:30	1
22	nilo	Not Set1	 2025-02-28     18:44:04	1
17	lays	Not Set1	 2025-02-28     20:02:23	1
8	lurdes	Not Set1	 2025-02-28     20:10:37	1
17	lays	Not Set1	 2025-02-28     21:01:30	1
17	lays	Not Set1	 2025-02-28     22:53:49	1
12		Not Set1	 2025-02-28     22:54:03	1
22	nilo	Not Set1	 2025-02-28     22:54:15	1


`;
	};
	const pontoUltras = () => {
		return `10	mauricio	Not Set7	 2025-01-02     12:43:08	1`;
	};
	const pontoUltrasCompl = () => {
		return `10   mauricio      Not Set7      2025-01-01      13:00:00   1
10   mauricio      Not Set7      2025-01-01      16:00:00   1
10   mauricio      Not Set7      2025-01-01      17:00:00   1
10   mauricio      Not Set7      2025-01-01      21:20:00   1
10   mauricio      Not Set7      2025-01-02      13:00:00   1
10   mauricio      Not Set7      2025-01-02      16:00:00   1
10   mauricio      Not Set7      2025-01-02      17:00:00   1
10   mauricio      Not Set7      2025-01-02      21:20:00   1
10   mauricio      Not Set7      2025-01-03      13:00:00   1
10   mauricio      Not Set7      2025-01-03      16:00:00   1
10   mauricio      Not Set7      2025-01-03      17:00:00   1
10   mauricio      Not Set7      2025-01-03      21:20:00   1
10   mauricio      Not Set7      2025-01-04      13:00:00   1
10   mauricio      Not Set7      2025-01-04      16:00:00   1
10   mauricio      Not Set7      2025-01-04      17:00:00   1
10   mauricio      Not Set7      2025-01-04      21:20:00   1
10   mauricio      Not Set7      2025-01-05      13:00:00   1
10   mauricio      Not Set7      2025-01-05      16:00:00   1
10   mauricio      Not Set7      2025-01-05      17:00:00   1
10   mauricio      Not Set7      2025-01-05      21:20:00   1
10   mauricio      Not Set7      2025-01-06      13:00:00   1
10   mauricio      Not Set7      2025-01-06      16:00:00   1
10   mauricio      Not Set7      2025-01-06      17:00:00   1
10   mauricio      Not Set7      2025-01-06      21:20:00   1
10   mauricio      Not Set7      2025-01-07      13:00:00   1
10   mauricio      Not Set7      2025-01-07      16:00:00   1
10   mauricio      Not Set7      2025-01-07      17:00:00   1
10   mauricio      Not Set7      2025-01-07      21:20:00   1
10   mauricio      Not Set7      2025-01-08      13:00:00   1
10   mauricio      Not Set7      2025-01-08      16:00:00   1
10   mauricio      Not Set7      2025-01-08      17:00:00   1
10   mauricio      Not Set7      2025-01-08      21:20:00   1
10   mauricio      Not Set7      2025-01-09      13:00:00   1
10   mauricio      Not Set7      2025-01-09      16:00:00   1
10   mauricio      Not Set7      2025-01-09      17:00:00   1
10   mauricio      Not Set7      2025-01-09      21:20:00   1
10   mauricio      Not Set7      2025-01-10      13:00:00   1
10   mauricio      Not Set7      2025-01-10      16:00:00   1
10   mauricio      Not Set7      2025-01-10      17:00:00   1
10   mauricio      Not Set7      2025-01-10      21:20:00   1
10   mauricio      Not Set7      2025-01-11      13:00:00   1
10   mauricio      Not Set7      2025-01-11      16:00:00   1
10   mauricio      Not Set7      2025-01-11      17:00:00   1
10   mauricio      Not Set7      2025-01-11      21:20:00   1
10   mauricio      Not Set7      2025-01-12      13:00:00   1
10   mauricio      Not Set7      2025-01-12      16:00:00   1
10   mauricio      Not Set7      2025-01-12      17:00:00   1
10   mauricio      Not Set7      2025-01-12      21:20:00   1
10   mauricio      Not Set7      2025-01-13      13:00:00   1
10   mauricio      Not Set7      2025-01-13      16:00:00   1
10   mauricio      Not Set7      2025-01-13      17:00:00   1
10   mauricio      Not Set7      2025-01-13      21:20:00   1
10   mauricio      Not Set7      2025-01-14      13:00:00   1
10   mauricio      Not Set7      2025-01-14      16:00:00   1
10   mauricio      Not Set7      2025-01-14      17:00:00   1
10   mauricio      Not Set7      2025-01-14      21:20:00   1
10   mauricio      Not Set7      2025-01-15      13:00:00   1
10   mauricio      Not Set7      2025-01-15      16:00:00   1
10   mauricio      Not Set7      2025-01-15      17:00:00   1
10   mauricio      Not Set7      2025-01-15      21:20:00   1
10   mauricio      Not Set7      2025-01-16      13:00:00   1
10   mauricio      Not Set7      2025-01-16      16:00:00   1
10   mauricio      Not Set7      2025-01-16      17:00:00   1
10   mauricio      Not Set7      2025-01-16      21:20:00   1
10   mauricio      Not Set7      2025-01-17      13:00:00   1
10   mauricio      Not Set7      2025-01-17      16:00:00   1
10   mauricio      Not Set7      2025-01-17      17:00:00   1
10   mauricio      Not Set7      2025-01-17      21:20:00   1
10   mauricio      Not Set7      2025-01-18      13:00:00   1
10   mauricio      Not Set7      2025-01-18      16:00:00   1
10   mauricio      Not Set7      2025-01-18      17:00:00   1
10   mauricio      Not Set7      2025-01-18      21:20:00   1
10   mauricio      Not Set7      2025-01-19      13:00:00   1
10   mauricio      Not Set7      2025-01-19      16:00:00   1
10   mauricio      Not Set7      2025-01-19      17:00:00   1
10   mauricio      Not Set7      2025-01-19      21:20:00   1
10   mauricio      Not Set7      2025-01-20      13:00:00   1
10   mauricio      Not Set7      2025-01-20      16:00:00   1
10   mauricio      Not Set7      2025-01-20      17:00:00   1
10   mauricio      Not Set7      2025-01-20      21:20:00   1
10   mauricio      Not Set7      2025-01-21      13:00:00   1
10   mauricio      Not Set7      2025-01-21      16:00:00   1
10   mauricio      Not Set7      2025-01-21      17:00:00   1
10   mauricio      Not Set7      2025-01-21      21:20:00   1
10   mauricio      Not Set7      2025-01-22      13:00:00   1
10   mauricio      Not Set7      2025-01-22      16:00:00   1
10   mauricio      Not Set7      2025-01-22      17:00:00   1
10   mauricio      Not Set7      2025-01-22      21:20:00   1
10   mauricio      Not Set7      2025-01-23      13:00:00   1
10   mauricio      Not Set7      2025-01-23      16:00:00   1
10   mauricio      Not Set7      2025-01-23      17:00:00   1
10   mauricio      Not Set7      2025-01-23      21:20:00   1
10   mauricio      Not Set7      2025-01-24      13:00:00   1
10   mauricio      Not Set7      2025-01-24      16:00:00   1
10   mauricio      Not Set7      2025-01-24      17:00:00   1
10   mauricio      Not Set7      2025-01-24      21:20:00   1
10   mauricio      Not Set7      2025-01-25      13:00:00   1
10   mauricio      Not Set7      2025-01-25      16:00:00   1
10   mauricio      Not Set7      2025-01-25      17:00:00   1
10   mauricio      Not Set7      2025-01-25      21:20:00   1
10   mauricio      Not Set7      2025-01-26      13:00:00   1
10   mauricio      Not Set7      2025-01-26      16:00:00   1
10   mauricio      Not Set7      2025-01-26      17:00:00   1
10   mauricio      Not Set7      2025-01-26      21:20:00   1
10   mauricio      Not Set7      2025-01-27      13:00:00   1
10   mauricio      Not Set7      2025-01-27      16:00:00   1
10   mauricio      Not Set7      2025-01-27      17:00:00   1
10   mauricio      Not Set7      2025-01-27      21:20:00   1
10   mauricio      Not Set7      2025-01-28      13:00:00   1
10   mauricio      Not Set7      2025-01-28      16:00:00   1
10   mauricio      Not Set7      2025-01-28      17:00:00   1
10   mauricio      Not Set7      2025-01-28      21:20:00   1
10   mauricio      Not Set7      2025-01-29      13:00:00   1
10   mauricio      Not Set7      2025-01-29      16:00:00   1
10   mauricio      Not Set7      2025-01-29      17:00:00   1
10   mauricio      Not Set7      2025-01-29      21:20:00   1
10   mauricio      Not Set7      2025-01-30      13:00:00   1
10   mauricio      Not Set7      2025-01-30      16:00:00   1
10   mauricio      Not Set7      2025-01-30      17:00:00   1
10   mauricio      Not Set7      2025-01-30      21:20:00   1
10   mauricio      Not Set7      2025-01-31      13:00:00   1
10   mauricio      Not Set7      2025-01-31      16:00:00   1
10   mauricio      Not Set7      2025-01-31      17:00:00   1
10   mauricio      Not Set7      2025-01-31      21:20:00   1`;
	};
	const UltrasCompl = () => {
		return `10   mauricio         Not Set7         2025-01-01     13:00:00      1
10   mauricio         Not Set7         2025-01-01     16:00:00      1
10   mauricio         Not Set7         2025-01-01     17:00:00      1
10   mauricio         Not Set7         2025-01-01     21:20:00      1
10   mauricio         Not Set7         2025-01-02     13:00:00      1
10   mauricio         Not Set7         2025-01-02     16:00:00      1
10   mauricio         Not Set7         2025-01-02     17:00:00      1
10   mauricio         Not Set7         2025-01-02     21:20:00      1
10   mauricio         Not Set7         2025-01-03     13:00:00      1
10   mauricio         Not Set7         2025-01-03     16:00:00      1
10   mauricio         Not Set7         2025-01-03     17:00:00      1
10   mauricio         Not Set7         2025-01-03     21:20:00      1
10   mauricio         Not Set7         2025-01-04     13:00:00      1
10   mauricio         Not Set7         2025-01-04     16:00:00      1
10   mauricio         Not Set7         2025-01-04     17:00:00      1
10   mauricio         Not Set7         2025-01-04     21:20:00      1
10   mauricio         Not Set7         2025-01-05     13:00:00      1
10   mauricio         Not Set7         2025-01-05     16:00:00      1
10   mauricio         Not Set7         2025-01-05     17:00:00      1
10   mauricio         Not Set7         2025-01-05     21:20:00      1
10   mauricio         Not Set7         2025-01-06     13:00:00      1
10   mauricio         Not Set7         2025-01-06     16:00:00      1
10   mauricio         Not Set7         2025-01-06     17:00:00      1
10   mauricio         Not Set7         2025-01-06     21:20:00      1
10   mauricio         Not Set7         2025-01-07     13:00:00      1
10   mauricio         Not Set7         2025-01-07     16:00:00      1
10   mauricio         Not Set7         2025-01-07     17:00:00      1
10   mauricio         Not Set7         2025-01-07     21:20:00      1
10   mauricio         Not Set7         2025-01-08     13:00:00      1
10   mauricio         Not Set7         2025-01-08     16:00:00      1
10   mauricio         Not Set7         2025-01-08     17:00:00      1
10   mauricio         Not Set7         2025-01-08     21:20:00      1
10   mauricio         Not Set7         2025-01-09     13:00:00      1
10   mauricio         Not Set7         2025-01-09     16:00:00      1
10   mauricio         Not Set7         2025-01-09     17:00:00      1
10   mauricio         Not Set7         2025-01-09     21:20:00      1
10   mauricio         Not Set7         2025-01-10     13:00:00      1
10   mauricio         Not Set7         2025-01-10     16:00:00      1
10   mauricio         Not Set7         2025-01-10     17:00:00      1
10   mauricio         Not Set7         2025-01-10     21:20:00      1
10   mauricio         Not Set7         2025-01-11     13:00:00      1
10   mauricio         Not Set7         2025-01-11     16:00:00      1
10   mauricio         Not Set7         2025-01-11     17:00:00      1
10   mauricio         Not Set7         2025-01-11     21:20:00      1
10   mauricio         Not Set7         2025-01-12     13:00:00      1
10   mauricio         Not Set7         2025-01-12     16:00:00      1
10   mauricio         Not Set7         2025-01-12     17:00:00      1
10   mauricio         Not Set7         2025-01-12     21:20:00      1
10   mauricio         Not Set7         2025-01-13     13:00:00      1
10   mauricio         Not Set7         2025-01-13     16:00:00      1
10   mauricio         Not Set7         2025-01-13     17:00:00      1
10   mauricio         Not Set7         2025-01-13     21:20:00      1
10   mauricio         Not Set7         2025-01-14     13:00:00      1
10   mauricio         Not Set7         2025-01-14     16:00:00      1
10   mauricio         Not Set7         2025-01-14     17:00:00      1
10   mauricio         Not Set7         2025-01-14     21:20:00      1
10   mauricio         Not Set7         2025-01-15     13:00:00      1
10   mauricio         Not Set7         2025-01-15     16:00:00      1
10   mauricio         Not Set7         2025-01-15     17:00:00      1
10   mauricio         Not Set7         2025-01-15     21:20:00      1
10   mauricio         Not Set7         2025-01-16     13:00:00      1
10   mauricio         Not Set7         2025-01-16     16:00:00      1
10   mauricio         Not Set7         2025-01-16     17:00:00      1
10   mauricio         Not Set7         2025-01-16     21:20:00      1
10   mauricio         Not Set7         2025-01-17     13:00:00      1
10   mauricio         Not Set7         2025-01-17     16:00:00      1
10   mauricio         Not Set7         2025-01-17     17:00:00      1
10   mauricio         Not Set7         2025-01-17     21:20:00      1
10   mauricio         Not Set7         2025-01-18     13:00:00      1
10   mauricio         Not Set7         2025-01-18     16:00:00      1
10   mauricio         Not Set7         2025-01-18     17:00:00      1
10   mauricio         Not Set7         2025-01-18     21:20:00      1
10   mauricio         Not Set7         2025-01-19     13:00:00      1
10   mauricio         Not Set7         2025-01-19     16:00:00      1
10   mauricio         Not Set7         2025-01-19     17:00:00      1
10   mauricio         Not Set7         2025-01-19     21:20:00      1
10   mauricio         Not Set7         2025-01-20     13:00:00      1
10   mauricio         Not Set7         2025-01-20     16:00:00      1
10   mauricio         Not Set7         2025-01-20     17:00:00      1
10   mauricio         Not Set7         2025-01-20     21:20:00      1
10   mauricio         Not Set7         2025-01-21     13:00:00      1
10   mauricio         Not Set7         2025-01-21     16:00:00      1
10   mauricio         Not Set7         2025-01-21     17:00:00      1
10   mauricio         Not Set7         2025-01-21     21:20:00      1
10   mauricio         Not Set7         2025-01-22     13:00:00      1
10   mauricio         Not Set7         2025-01-22     16:00:00      1
10   mauricio         Not Set7         2025-01-22     17:00:00      1
10   mauricio         Not Set7         2025-01-22     21:20:00      1
10   mauricio         Not Set7         2025-01-23     13:00:00      1
10   mauricio         Not Set7         2025-01-23     16:00:00      1
10   mauricio         Not Set7         2025-01-23     17:00:00      1
10   mauricio         Not Set7         2025-01-23     21:20:00      1
10   mauricio         Not Set7         2025-01-24     13:00:00      1
10   mauricio         Not Set7         2025-01-24     16:00:00      1
10   mauricio         Not Set7         2025-01-24     17:00:00      1
10   mauricio         Not Set7         2025-01-24     21:20:00      1
10   mauricio         Not Set7         2025-01-25     13:00:00      1
10   mauricio         Not Set7         2025-01-25     16:00:00      1
10   mauricio         Not Set7         2025-01-25     17:00:00      1
10   mauricio         Not Set7         2025-01-25     21:20:00      1
10   mauricio         Not Set7         2025-01-26     13:00:00      1
10   mauricio         Not Set7         2025-01-26     16:00:00      1
10   mauricio         Not Set7         2025-01-26     17:00:00      1
10   mauricio         Not Set7         2025-01-26     21:20:00      1
10   mauricio         Not Set7         2025-01-27     13:00:00      1
10   mauricio         Not Set7         2025-01-27     16:00:00      1
10   mauricio         Not Set7         2025-01-27     17:00:00      1
10   mauricio         Not Set7         2025-01-27     21:20:00      1
10   mauricio         Not Set7         2025-01-28     13:00:00      1
10   mauricio         Not Set7         2025-01-28     16:00:00      1
10   mauricio         Not Set7         2025-01-28     17:00:00      1
10   mauricio         Not Set7         2025-01-28     21:20:00      1
10   mauricio         Not Set7         2025-01-29     13:00:00      1
10   mauricio         Not Set7         2025-01-29     16:00:00      1
10   mauricio         Not Set7         2025-01-29     17:00:00      1
10   mauricio         Not Set7         2025-01-29     21:20:00      1
10   mauricio         Not Set7         2025-01-30     13:00:00      1
10   mauricio         Not Set7         2025-01-30     16:00:00      1
10   mauricio         Not Set7         2025-01-30     17:00:00      1
10   mauricio         Not Set7         2025-01-30     21:20:00      1
10   mauricio         Not Set7         2025-01-31     13:00:00      1
10   mauricio         Not Set7         2025-01-31     16:00:00      1
10   mauricio         Not Set7         2025-01-31     17:00:00      1
10   mauricio         Not Set7         2025-01-31     21:20:00      1`;
	};
	const pontosUltraMarco = () => {
		return `12		Not Set1	 2025-03-01     07:55:15	1
22	nilo	Not Set1	 2025-03-01     07:55:56	1
10	mauricio	Not Set7	 2025-03-01     09:54:08	1
12		Not Set7	 2025-03-01     11:18:41	1
22	nilo	Not Set1	 2025-03-01     11:18:48	1
22	nilo	Not Set1	 2025-03-01     12:18:19	1
12		Not Set1	 2025-03-01     12:19:05	1
10	mauricio	Not Set7	 2025-03-01     13:01:49	1
10	mauricio	Not Set7	 2025-03-01     13:47:29	1
22	nilo	Not Set1	 2025-03-01     15:40:02	1
12		Not Set1	 2025-03-01     15:43:44	1
10	mauricio	Not Set7	 2025-03-01     17:06:21	1
8	lurdes	Not Set1	 2025-03-02     07:55:49	1
9	manuella meireles	Not Set1	 2025-03-02     07:56:09	1
8	lurdes	Not Set1	 2025-03-02     12:04:49	1
8	lurdes	Not Set1	 2025-03-02     13:04:24	1
9	manuella meireles	Not Set1	 2025-03-02     14:00:03	1
8	lurdes	Not Set1	 2025-03-02     14:00:37	1
10	mauricio	Not Set7	 2025-03-03     07:52:16	1
14	Rosangela Fagundes	Not Set1	 2025-03-03     07:56:44	1
20	carolina peixoto	Not Set1	 2025-03-03     07:57:11	1
8	lurdes	Not Set1	 2025-03-03     08:14:42	1
22	nilo	Not Set1	 2025-03-03     08:14:46	1
14	Rosangela Fagundes	Not Set1	 2025-03-03     10:39:57	1
20	carolina peixoto	Not Set1	 2025-03-03     10:58:45	1
14	Rosangela Fagundes	Not Set1	 2025-03-03     11:02:07	1
20	carolina peixoto	Not Set1	 2025-03-03     11:57:37	1
22	nilo	Not Set1	 2025-03-03     12:05:59	1
10	mauricio	Not Set7	 2025-03-03     12:18:52	1
8	lurdes	Not Set1	 2025-03-03     12:18:57	1
22	nilo	Not Set1	 2025-03-03     13:04:45	1
10	mauricio	Not Set7	 2025-03-03     13:17:34	1
8	lurdes	Not Set1	 2025-03-03     13:18:09	1
20	carolina peixoto	Not Set1	 2025-03-03     14:02:54	1
14	Rosangela Fagundes	Not Set1	 2025-03-03     15:59:57	1
22	nilo	Not Set1	 2025-03-03     16:00:09	1
8	lurdes	Not Set1	 2025-03-03     16:03:26	1
10	mauricio	Not Set7	 2025-03-03     16:05:36	1
14	Rosangela Fagundes	Not Set1	 2025-03-04     07:41:32	1
12		Not Set1	 2025-03-04     07:41:43	1
17	lays	Not Set1	 2025-03-04     07:47:54	1
21	brenda pierini	Not Set1	 2025-03-04     07:56:30	1
10	mauricio	Not Set7	 2025-03-04     07:57:11	1
20	carolina peixoto	Not Set1	 2025-03-04     08:01:58	1
22	nilo	Not Set1	 2025-03-04     08:36:31	1
8	lurdes	Not Set1	 2025-03-04     08:36:36	1
12		Not Set1	 2025-03-04     09:39:22	1
14	Rosangela Fagundes	Not Set1	 2025-03-04     10:21:08	1
14	Rosangela Fagundes	Not Set1	 2025-03-04     11:15:40	1
17	lays	Not Set1	 2025-03-04     11:26:09	1
20	carolina peixoto	Not Set1	 2025-03-04     11:26:13	1
21	brenda pierini	Not Set1	 2025-03-04     11:26:18	1
22	nilo	Not Set1	 2025-03-04     12:00:21	1
17	lays	Not Set1	 2025-03-04     12:28:34	1
20	carolina peixoto	Not Set1	 2025-03-04     12:28:43	1
21	brenda pierini	Not Set1	 2025-03-04     12:28:50	1
22	nilo	Not Set1	 2025-03-04     12:55:30	1
8	lurdes	Not Set1	 2025-03-04     13:42:42	1
20	carolina peixoto	Not Set1	 2025-03-04     14:30:36	1
8	lurdes	Not Set1	 2025-03-04     14:42:32	1
10	mauricio	Not Set7	 2025-03-04     14:54:15	1
10	mauricio	Not Set7	 2025-03-04     15:57:02	1
17	lays	Not Set1	 2025-03-04     16:00:29	1
21	brenda pierini	Not Set1	 2025-03-04     16:01:37	1
10	mauricio	Not Set7	 2025-03-04     16:03:18	1
22	nilo	Not Set1	 2025-03-04     16:08:30	1
8	lurdes	Not Set1	 2025-03-04     16:11:28	1
21	brenda pierini	Not Set1	 2025-03-05     04:43:55	1
14	Rosangela Fagundes	Not Set1	 2025-03-05     06:04:31	1
20	carolina peixoto	Not Set1	 2025-03-05     08:38:02	1
21	brenda pierini	Not Set1	 2025-03-05     09:09:10	1
14	Rosangela Fagundes	Not Set1	 2025-03-05     10:02:36	1
21	brenda pierini	Not Set1	 2025-03-05     10:05:02	1
10	mauricio	Not Set7	 2025-03-05     10:07:52	1
20	carolina peixoto	Not Set1	 2025-03-05     10:15:52	1
14	Rosangela Fagundes	Not Set1	 2025-03-05     10:49:30	1
20	carolina peixoto	Not Set1	 2025-03-05     11:21:52	1
8	lurdes	Not Set1	 2025-03-05     11:44:11	1
21	brenda pierini	Not Set1	 2025-03-05     13:06:39	1
14	Rosangela Fagundes	Not Set1	 2025-03-05     14:21:38	1
17	lays	Not Set1	 2025-03-05     14:27:51	1
22	nilo	Not Set1	 2025-03-05     14:34:12	1
10	mauricio	Not Set7	 2025-03-05     14:50:48	1
8	lurdes	Not Set1	 2025-03-05     14:50:56	1
12		Not Set1	 2025-03-05     14:59:29	1
10	mauricio	Not Set7	 2025-03-05     15:48:28	1
8	lurdes	Not Set1	 2025-03-05     15:48:33	1
12		Not Set1	 2025-03-05     16:32:59	1
20	carolina peixoto	Not Set1	 2025-03-05     16:47:16	1
12		Not Set1	 2025-03-05     17:28:53	1
22	nilo	Not Set1	 2025-03-05     17:57:33	1
22	nilo	Not Set1	 2025-03-05     18:57:31	1
17	lays	Not Set1	 2025-03-05     20:00:21	1
8	lurdes	Not Set1	 2025-03-05     20:11:44	1
17	lays	Not Set1	 2025-03-05     21:00:20	1
17	lays	Not Set1	 2025-03-05     22:57:12	1
12		Not Set1	 2025-03-05     22:57:17	1
22	nilo	Not Set1	 2025-03-05     23:02:14	1
21	brenda pierini	Not Set1	 2025-03-06     04:45:05	1
14	Rosangela Fagundes	Not Set1	 2025-03-06     06:16:23	1
20	carolina peixoto	Not Set1	 2025-03-06     08:11:02	1
21	brenda pierini	Not Set1	 2025-03-06     09:22:49	1
14	Rosangela Fagundes	Not Set1	 2025-03-06     10:04:41	1
10	mauricio	Not Set7	 2025-03-06     10:10:21	1
21	brenda pierini	Not Set1	 2025-03-06     10:31:00	1
20	carolina peixoto	Not Set1	 2025-03-06     10:33:01	1
14	Rosangela Fagundes	Not Set1	 2025-03-06     10:37:22	1
20	carolina peixoto	Not Set1	 2025-03-06     11:31:07	1
8	lurdes	Not Set1	 2025-03-06     11:41:29	1
14	Rosangela Fagundes	Not Set1	 2025-03-06     14:20:35	1
17	lays	Not Set1	 2025-03-06     14:33:06	1
22	nilo	Not Set1	 2025-03-06     14:39:34	1
12		Not Set1	 2025-03-06     14:40:25	1
8	lurdes	Not Set1	 2025-03-06     15:36:51	1
10	mauricio	Not Set7	 2025-03-06     16:00:21	1
20	carolina peixoto	Not Set1	 2025-03-06     16:30:32	1
8	lurdes	Not Set1	 2025-03-06     16:38:30	1
12		Not Set1	 2025-03-06     16:48:34	1
10	mauricio	Not Set7	 2025-03-06     16:54:46	1
12		Not Set7	 2025-03-06     17:45:24	1
22	nilo	Not Set1	 2025-03-06     18:00:16	1
10	mauricio	Not Set7	 2025-03-06     18:05:07	1
22	nilo	Not Set1	 2025-03-06     19:00:33	1
17	lays	Not Set1	 2025-03-06     20:21:05	1
17	lays	Not Set1	 2025-03-06     21:17:45	1
22	nilo	Not Set1	 2025-03-06     21:54:03	1
17	lays	Not Set1	 2025-03-06     22:55:11	1
12		Not Set1	 2025-03-06     22:55:26	1
21	brenda pierini	Not Set1	 2025-03-07     04:46:31	1
14	Rosangela Fagundes	Not Set1	 2025-03-07     06:05:29	1
20	carolina peixoto	Not Set1	 2025-03-07     08:13:57	1
21	brenda pierini	Not Set1	 2025-03-07     09:10:00	1
10	mauricio	Not Set7	 2025-03-07     10:01:09	1
14	Rosangela Fagundes	Not Set1	 2025-03-07     10:24:36	1
21	brenda pierini	Not Set1	 2025-03-07     10:29:29	1
20	carolina peixoto	Not Set1	 2025-03-07     10:38:40	1
14	Rosangela Fagundes	Not Set1	 2025-03-07     11:01:48	1
20	carolina peixoto	Not Set1	 2025-03-07     11:39:12	1
8	lurdes	Not Set1	 2025-03-07     11:41:32	1
21	brenda pierini	Not Set1	 2025-03-07     13:08:00	1
22	nilo	Not Set1	 2025-03-07     13:43:13	1
14	Rosangela Fagundes	Not Set1	 2025-03-07     14:18:47	1
12		Not Set1	 2025-03-07     14:29:34	1
17	lays	Not Set1	 2025-03-07     14:31:45	1
10	mauricio	Not Set7	 2025-03-07     15:01:58	1
8	lurdes	Not Set1	 2025-03-07     15:06:53	1
10	mauricio	Not Set7	 2025-03-07     15:53:40	1
8	lurdes	Not Set1	 2025-03-07     15:53:43	1
20	carolina peixoto	Not Set1	 2025-03-07     16:23:48	1
12		Not Set1	 2025-03-07     16:43:19	1
22	nilo	Not Set1	 2025-03-07     17:01:11	1
12		Not Set1	 2025-03-07     17:41:55	1
22	nilo	Not Set1	 2025-03-07     18:01:37	1
10	mauricio	Not Set7	 2025-03-07     18:19:02	1
8	lurdes	Not Set1	 2025-03-07     20:03:39	1
17	lays	Not Set1	 2025-03-07     21:02:45	1
22	nilo	Not Set1	 2025-03-07     22:00:05	1
17	lays	Not Set1	 2025-03-07     22:00:47	1
17	lays	Not Set1	 2025-03-07     22:54:48	1
12		Not Set1	 2025-03-07     22:55:56	1
21	brenda pierini	Not Set1	 2025-03-08     08:24:44	1
8	lurdes	Not Set1	 2025-03-08     08:37:08	1
17	lays	Not Set1	 2025-03-08     09:47:14	1
21	brenda pierini	Not Set1	 2025-03-08     11:07:31	1
21	brenda pierini	Not Set1	 2025-03-08     12:09:11	1
8	lurdes	Not Set1	 2025-03-08     12:42:40	1
17	lays	Not Set1	 2025-03-08     13:19:43	1
8	lurdes	Not Set1	 2025-03-08     14:01:26	1
17	lays	Not Set1	 2025-03-08     14:19:00	1
8	lurdes	Not Set1	 2025-03-08     15:07:02	1
21	brenda pierini	Not Set1	 2025-03-08     15:12:43	1
17	lays	Not Set1	 2025-03-08     16:59:05	1
14	Rosangela Fagundes	Not Set1	 2025-03-09     08:18:46	1
14	Rosangela Fagundes	Not Set1	 2025-03-09     10:05:58	1
14	Rosangela Fagundes	Not Set1	 2025-03-09     11:05:55	1
20	carolina peixoto	Not Set1	 2025-03-09     14:06:27	1
21	brenda pierini	Not Set1	 2025-03-10     04:46:55	1
14	Rosangela Fagundes	Not Set1	 2025-03-10     06:05:26	1
20	carolina peixoto	Not Set1	 2025-03-10     08:02:00	1
21	brenda pierini	Not Set1	 2025-03-10     09:06:22	1
10	mauricio	Not Set7	 2025-03-10     09:51:33	1
21	brenda pierini	Not Set1	 2025-03-10     10:09:27	1
20	carolina peixoto	Not Set1	 2025-03-10     10:57:06	1
14	Rosangela Fagundes	Not Set1	 2025-03-10     11:06:16	1
8	lurdes	Not Set1	 2025-03-10     11:34:07	1
20	carolina peixoto	Not Set1	 2025-03-10     12:02:05	1
14	Rosangela Fagundes	Not Set1	 2025-03-10     12:09:02	1
21	brenda pierini	Not Set1	 2025-03-10     13:07:33	1
14	Rosangela Fagundes	Not Set1	 2025-03-10     14:16:21	1
17	lays	Not Set1	 2025-03-10     14:21:02	1
22	nilo	Not Set1	 2025-03-10     15:01:42	1
12		Not Set1	 2025-03-10     16:01:28	1
20	carolina peixoto	Not Set1	 2025-03-10     16:14:49	1
10	mauricio	Not Set7	 2025-03-10     16:51:58	1
8	lurdes	Not Set1	 2025-03-10     16:52:01	1
10	mauricio	Not Set7	 2025-03-10     17:46:20	1
8	lurdes	Not Set1	 2025-03-10     17:52:01	1
22	nilo	Not Set1	 2025-03-10     17:59:17	1
10	mauricio	Not Set7	 2025-03-10     18:19:20	1
22	nilo	Not Set1	 2025-03-10     18:51:49	1
12		Not Set1	 2025-03-10     18:58:20	1
12		Not Set1	 2025-03-10     19:51:38	1
8	lurdes	Not Set1	 2025-03-10     20:19:46	1
17	lays	Not Set1	 2025-03-10     21:22:42	1
17	lays	Not Set1	 2025-03-10     22:22:03	1
22	nilo	Not Set1	 2025-03-10     22:44:13	1
12		Not Set1	 2025-03-10     22:59:33	1
17	lays	Not Set1	 2025-03-10     22:59:42	1
21	brenda pierini	Not Set1	 2025-03-11     04:46:31	1
14	Rosangela Fagundes	Not Set1	 2025-03-11     06:06:10	1
20	carolina peixoto	Not Set1	 2025-03-11     08:06:26	1
14	Rosangela Fagundes	Not Set1	 2025-03-11     10:01:14	1
10	mauricio	Not Set7	 2025-03-11     10:12:46	1
21	brenda pierini	Not Set1	 2025-03-11     10:38:42	1
14	Rosangela Fagundes	Not Set1	 2025-03-11     10:41:20	1
21	brenda pierini	Not Set1	 2025-03-11     11:35:23	1
8	lurdes	Not Set1	 2025-03-11     11:45:32	1
20	carolina peixoto	Not Set1	 2025-03-11     11:48:12	1
9	manuella meireles	Not Set1	 2025-03-11     11:52:54	1
20	carolina peixoto	Not Set1	 2025-03-11     12:48:26	1
21	brenda pierini	Not Set1	 2025-03-11     13:07:25	1
14	Rosangela Fagundes	Not Set1	 2025-03-11     14:23:43	1
22	nilo	Not Set1	 2025-03-11     14:39:59	1
17	lays	Not Set1	 2025-03-11     14:43:08	1
17	lays	Not Set1	 2025-03-11     16:07:01	1
20	carolina peixoto	Not Set1	 2025-03-11     16:07:04	1
10	mauricio	Not Set7	 2025-03-11     16:48:48	1
8	lurdes	Not Set1	 2025-03-11     16:49:04	1
17	lays	Not Set1	 2025-03-11     17:06:36	1
10	mauricio	Not Set7	 2025-03-11     17:43:43	1
8	lurdes	Not Set1	 2025-03-11     17:47:10	1
22	nilo	Not Set1	 2025-03-11     17:50:44	1
22	nilo	Not Set1	 2025-03-11     18:50:19	1
8	lurdes	Not Set1	 2025-03-11     20:06:46	1
22	nilo	Not Set1	 2025-03-11     22:31:34	1
17	lays	Not Set1	 2025-03-11     22:56:41	1
21	brenda pierini	Not Set1	 2025-03-12     04:55:02	1
14	Rosangela Fagundes	Not Set1	 2025-03-12     06:03:22	1
20	carolina peixoto	Not Set1	 2025-03-12     07:57:37	1
14	Rosangela Fagundes	Not Set1	 2025-03-12     10:10:48	1
10	mauricio	Not Set7	 2025-03-12     10:33:54	1
21	brenda pierini	Not Set1	 2025-03-12     10:49:28	1
14	Rosangela Fagundes	Not Set1	 2025-03-12     11:08:43	1
21	brenda pierini	Not Set1	 2025-03-12     11:47:20	1
8	lurdes	Not Set1	 2025-03-12     11:50:04	1
20	carolina peixoto	Not Set1	 2025-03-12     11:55:03	1
20	carolina peixoto	Not Set1	 2025-03-12     12:55:08	1
21	brenda pierini	Not Set1	 2025-03-12     13:09:11	1
17	lays	Not Set1	 2025-03-12     14:09:27	1
14	Rosangela Fagundes	Not Set1	 2025-03-12     14:23:15	1
22	nilo	Not Set1	 2025-03-12     15:10:46	1
10	mauricio	Not Set7	 2025-03-12     16:07:46	1
8	lurdes	Not Set1	 2025-03-12     16:07:52	1
20	carolina peixoto	Not Set1	 2025-03-12     16:08:38	1
10	mauricio	Not Set7	 2025-03-12     16:33:34	1
17	lays	Not Set1	 2025-03-12     16:40:06	1
8	lurdes	Not Set1	 2025-03-12     17:08:17	1
17	lays	Not Set1	 2025-03-12     17:41:27	1
22	nilo	Not Set1	 2025-03-12     17:50:54	1
10	mauricio	Not Set7	 2025-03-12     18:20:56	1
22	nilo	Not Set1	 2025-03-12     18:50:55	1
8	lurdes	Not Set1	 2025-03-12     19:58:09	1
17	lays	Not Set1	 2025-03-12     22:58:31	1
22	nilo	Not Set1	 2025-03-12     23:01:05	1
21	brenda pierini	Not Set1	 2025-03-13     04:47:49	1
14	Rosangela Fagundes	Not Set1	 2025-03-13     06:04:16	1
20	carolina peixoto	Not Set1	 2025-03-13     08:20:11	1
10	mauricio	Not Set7	 2025-03-13     09:51:52	1
14	Rosangela Fagundes	Not Set1	 2025-03-13     10:13:38	1
14	Rosangela Fagundes	Not Set1	 2025-03-13     10:48:17	1
21	brenda pierini	Not Set1	 2025-03-13     11:02:54	1
8	lurdes	Not Set1	 2025-03-13     11:40:46	1
21	brenda pierini	Not Set1	 2025-03-13     12:00:04	1
20	carolina peixoto	Not Set1	 2025-03-13     12:07:59	1
20	carolina peixoto	Not Set1	 2025-03-13     13:10:47	1
21	brenda pierini	Not Set1	 2025-03-13     13:27:18	1
14	Rosangela Fagundes	Not Set1	 2025-03-13     14:14:29	1
10	mauricio	Not Set7	 2025-03-13     14:22:09	1
17	lays	Not Set1	 2025-03-13     14:39:04	1
22	nilo	Not Set1	 2025-03-13     14:39:40	1
10	mauricio	Not Set7	 2025-03-13     15:20:27	1
8	lurdes	Not Set1	 2025-03-13     15:23:12	1
20	carolina peixoto	Not Set1	 2025-03-13     16:06:18	1
17	lays	Not Set1	 2025-03-13     16:06:21	1
8	lurdes	Not Set1	 2025-03-13     16:24:42	1
17	lays	Not Set1	 2025-03-13     17:04:53	1
22	nilo	Not Set1	 2025-03-13     17:50:25	1
10	mauricio	Not Set7	 2025-03-13     18:14:54	1
22	nilo	Not Set1	 2025-03-13     18:50:42	1
8	lurdes	Not Set1	 2025-03-13     20:08:00	1
22	nilo	Not Set1	 2025-03-13     22:30:13	1
17	lays	Not Set1	 2025-03-13     23:01:37	1
21	brenda pierini	Not Set1	 2025-03-14     05:08:44	1
14	Rosangela Fagundes	Not Set1	 2025-03-14     06:02:51	1
20	carolina peixoto	Not Set1	 2025-03-14     08:07:27	1
14	Rosangela Fagundes	Not Set1	 2025-03-14     09:58:27	1
10	mauricio	Not Set7	 2025-03-14     10:21:04	1
21	brenda pierini	Not Set1	 2025-03-14     10:44:05	1
14	Rosangela Fagundes	Not Set1	 2025-03-14     11:07:26	1
21	brenda pierini	Not Set1	 2025-03-14     11:33:13	1
20	carolina peixoto	Not Set1	 2025-03-14     11:39:19	1
20	carolina peixoto	Not Set1	 2025-03-14     12:39:09	1
21	brenda pierini	Not Set1	 2025-03-14     13:07:07	1
14	Rosangela Fagundes	Not Set1	 2025-03-14     14:14:00	1
17	lays	Not Set1	 2025-03-14     14:30:49	1
22	nilo	Not Set1	 2025-03-14     14:32:47	1
20	carolina peixoto	Not Set1	 2025-03-14     16:25:07	1
17	lays	Not Set1	 2025-03-14     16:25:10	1
17	lays	Not Set1	 2025-03-14     17:25:48	1
10	mauricio	Not Set7	 2025-03-14     17:41:55	1
22	nilo	Not Set1	 2025-03-14     17:47:13	1
10	mauricio	Not Set7	 2025-03-14     18:01:36	1
10	mauricio	Not Set7	 2025-03-14     18:08:25	1
22	nilo	Not Set1	 2025-03-14     18:48:17	1
22	nilo	Not Set1	 2025-03-14     22:26:23	1
17	lays	Not Set1	 2025-03-14     22:59:35	1
21	brenda pierini	Not Set1	 2025-03-15     08:04:05	1
22	nilo	Not Set1	 2025-03-15     08:11:33	1
21	brenda pierini	Not Set1	 2025-03-15     11:22:27	1
22	nilo	Not Set1	 2025-03-15     11:40:08	1
21	brenda pierini	Not Set1	 2025-03-15     12:03:48	1
22	nilo	Not Set1	 2025-03-15     12:51:34	1
21	brenda pierini	Not Set1	 2025-03-15     13:56:24	1
22	nilo	Not Set1	 2025-03-15     16:01:51	1
10	mauricio	Not Set7	 2025-03-16     07:47:40	1
14	Rosangela Fagundes	Not Set1	 2025-03-16     08:06:25	1
14	Rosangela Fagundes	Not Set1	 2025-03-16     10:34:00	1
14	Rosangela Fagundes	Not Set1	 2025-03-16     11:44:19	1
14	Rosangela Fagundes	Not Set1	 2025-03-16     14:02:08	1
10	mauricio	Not Set7	 2025-03-16     14:04:48	1
21	brenda pierini	Not Set1	 2025-03-17     05:06:20	1
14	Rosangela Fagundes	Not Set1	 2025-03-17     06:04:58	1
20	carolina peixoto	Not Set1	 2025-03-17     08:06:26	1
21	brenda pierini	Not Set1	 2025-03-17     09:46:06	1
14	Rosangela Fagundes	Not Set1	 2025-03-17     10:07:33	1
10	mauricio	Not Set7	 2025-03-17     10:10:49	1
21	brenda pierini	Not Set1	 2025-03-17     10:43:49	1
14	Rosangela Fagundes	Not Set1	 2025-03-17     10:51:06	1
20	carolina peixoto	Not Set1	 2025-03-17     11:02:10	1
8	lurdes	Not Set1	 2025-03-17     11:40:21	1
20	carolina peixoto	Not Set1	 2025-03-17     12:00:38	1
21	brenda pierini	Not Set1	 2025-03-17     13:10:53	1
14	Rosangela Fagundes	Not Set1	 2025-03-17     14:18:42	1
17	lays	Not Set1	 2025-03-17     14:29:25	1
22	nilo	Not Set1	 2025-03-17     14:40:19	1
20	carolina peixoto	Not Set1	 2025-03-17     16:12:12	1
17	lays	Not Set1	 2025-03-17     16:12:15	1
10	mauricio	Not Set7	 2025-03-17     16:40:24	1
8	lurdes	Not Set1	 2025-03-17     16:40:29	1
17	lays	Not Set1	 2025-03-17     17:13:44	1
10	mauricio	Not Set7	 2025-03-17     17:16:18	1
8	lurdes	Not Set1	 2025-03-17     17:39:43	1
22	nilo	Not Set1	 2025-03-17     17:57:25	1
10	mauricio	Not Set7	 2025-03-17     18:19:31	1
22	nilo	Not Set1	 2025-03-17     18:56:33	1
8	lurdes	Not Set1	 2025-03-17     20:01:55	1
22	nilo	Not Set1	 2025-03-17     22:31:58	1
17	lays	Not Set1	 2025-03-17     23:00:15	1
21	brenda pierini	Not Set1	 2025-03-18     04:50:22	1
14	Rosangela Fagundes	Not Set1	 2025-03-18     06:03:22	1
20	carolina peixoto	Not Set1	 2025-03-18     08:16:32	1
21	brenda pierini	Not Set1	 2025-03-18     09:43:04	1
14	Rosangela Fagundes	Not Set1	 2025-03-18     09:53:33	1
10	mauricio	Not Set7	 2025-03-18     10:13:31	1
14	Rosangela Fagundes	Not Set1	 2025-03-18     10:49:02	1
21	brenda pierini	Not Set1	 2025-03-18     10:49:52	1
20	carolina peixoto	Not Set1	 2025-03-18     11:37:37	1
8	lurdes	Not Set1	 2025-03-18     11:41:59	1
20	carolina peixoto	Not Set1	 2025-03-18     12:36:51	1
21	brenda pierini	Not Set1	 2025-03-18     13:11:31	1
14	Rosangela Fagundes	Not Set1	 2025-03-18     14:16:14	1
17	lays	Not Set1	 2025-03-18     14:30:06	1
22	nilo	Not Set1	 2025-03-18     14:37:23	1
17	lays	Not Set1	 2025-03-18     16:13:23	1
20	carolina peixoto	Not Set1	 2025-03-18     16:13:39	1
17	lays	Not Set1	 2025-03-18     17:16:08	1
22	nilo	Not Set1	 2025-03-18     17:52:44	1
10	mauricio	Not Set7	 2025-03-18     18:29:12	1
22	nilo	Not Set1	 2025-03-18     19:02:57	1
8	lurdes	Not Set1	 2025-03-18     19:03:29	1
8	lurdes	Not Set1	 2025-03-18     20:02:46	1
22	nilo	Not Set1	 2025-03-18     22:31:27	1
17	lays	Not Set1	 2025-03-18     23:00:44	1
21	brenda pierini	Not Set1	 2025-03-19     04:48:51	1
14	Rosangela Fagundes	Not Set1	 2025-03-19     06:05:34	1
20	carolina peixoto	Not Set1	 2025-03-19     07:55:35	1
21	brenda pierini	Not Set1	 2025-03-19     09:53:04	1
14	Rosangela Fagundes	Not Set1	 2025-03-19     10:05:43	1
10	mauricio	Not Set7	 2025-03-19     10:11:00	1
14	Rosangela Fagundes	Not Set1	 2025-03-19     10:42:54	1
21	brenda pierini	Not Set1	 2025-03-19     10:53:26	1
20	carolina peixoto	Not Set1	 2025-03-19     11:08:56	1
20	carolina peixoto	Not Set1	 2025-03-19     12:08:04	1
8	lurdes	Not Set1	 2025-03-19     13:02:37	1
21	brenda pierini	Not Set1	 2025-03-19     13:05:29	1
17	lays	Not Set1	 2025-03-19     14:32:16	1
22	nilo	Not Set1	 2025-03-19     14:34:31	1
17	lays	Not Set1	 2025-03-19     16:13:30	1
20	carolina peixoto	Not Set1	 2025-03-19     16:13:38	1
8	lurdes	Not Set1	 2025-03-19     17:00:37	1
17	lays	Not Set1	 2025-03-19     17:12:44	1
22	nilo	Not Set1	 2025-03-19     18:03:22	1
10	mauricio	Not Set7	 2025-03-19     18:05:27	1
22	nilo	Not Set1	 2025-03-19     19:04:25	1
8	lurdes	Not Set1	 2025-03-19     21:02:52	1
22	nilo	Not Set1	 2025-03-19     22:31:00	1
17	lays	Not Set1	 2025-03-19     23:01:23	1
8	lurdes	Not Set1	 2025-03-19     23:24:40	1
8	lurdes	Not Set1	 2025-03-20     04:56:17	1
14	Rosangela Fagundes	Not Set1	 2025-03-20     06:02:46	1
20	carolina peixoto	Not Set1	 2025-03-20     08:09:23	1
21	brenda pierini	Not Set1	 2025-03-20     08:20:12	1
8	lurdes	Not Set1	 2025-03-20     09:34:15	1
14	Rosangela Fagundes	Not Set1	 2025-03-20     09:59:18	1
8	lurdes	Not Set1	 2025-03-20     10:27:48	1
14	Rosangela Fagundes	Not Set1	 2025-03-20     10:44:48	1
21	brenda pierini	Not Set1	 2025-03-20     11:04:41	1
21	brenda pierini	Not Set1	 2025-03-20     11:59:15	1
20	carolina peixoto	Not Set1	 2025-03-20     12:07:16	1
8	lurdes	Not Set1	 2025-03-20     13:02:01	1
20	carolina peixoto	Not Set1	 2025-03-20     13:05:50	1
10	mauricio	Not Set7	 2025-03-20     13:09:31	1
14	Rosangela Fagundes	Not Set1	 2025-03-20     14:14:10	1
22	nilo	Not Set1	 2025-03-20     14:40:31	1
17	lays	Not Set1	 2025-03-20     14:48:00	1
21	brenda pierini	Not Set1	 2025-03-20     15:09:20	1
20	carolina peixoto	Not Set1	 2025-03-20     16:28:02	1
17	lays	Not Set1	 2025-03-20     16:35:47	1
17	lays	Not Set1	 2025-03-20     17:35:00	1
22	nilo	Not Set1	 2025-03-20     17:49:50	1
22	nilo	Not Set1	 2025-03-20     18:51:58	1
10	mauricio	Not Set7	 2025-03-20     19:10:38	1
22	nilo	Not Set1	 2025-03-20     22:30:45	1
17	lays	Not Set1	 2025-03-20     23:00:08	1
21	brenda pierini	Not Set1	 2025-03-21     04:51:53	1
14	Rosangela Fagundes	Not Set1	 2025-03-21     06:07:01	1
20	carolina peixoto	Not Set1	 2025-03-21     08:16:17	1
21	brenda pierini	Not Set1	 2025-03-21     08:42:43	1
21	brenda pierini	Not Set1	 2025-03-21     09:40:25	1
14	Rosangela Fagundes	Not Set1	 2025-03-21     10:06:01	1
10	mauricio	Not Set7	 2025-03-21     10:34:56	1
14	Rosangela Fagundes	Not Set1	 2025-03-21     11:02:16	1
8	lurdes	Not Set1	 2025-03-21     11:41:47	1
21	brenda pierini	Not Set1	 2025-03-21     13:06:25	1
20	carolina peixoto	Not Set1	 2025-03-21     14:12:11	1
14	Rosangela Fagundes	Not Set1	 2025-03-21     14:20:15	1
22	nilo	Not Set1	 2025-03-21     14:40:09	1
17	lays	Not Set1	 2025-03-21     14:43:12	1
23	yaritza bueno	Not Set1	 2025-03-21     14:46:45	1
20	carolina peixoto	Not Set1	 2025-03-21     15:20:14	1
17	lays	Not Set1	 2025-03-21     16:51:55	1
8	lurdes	Not Set1	 2025-03-21     17:34:07	1
17	lays	Not Set1	 2025-03-21     17:49:59	1
8	lurdes	Not Set1	 2025-03-21     18:33:53	1
22	nilo	Not Set1	 2025-03-21     18:35:01	1
10	mauricio	Not Set7	 2025-03-21     18:39:04	1
23	yaritza bueno	Not Set1	 2025-03-21     19:02:35	1
22	nilo	Not Set1	 2025-03-21     19:34:42	1
8	lurdes	Not Set1	 2025-03-21     20:02:32	1
23	yaritza bueno	Not Set1	 2025-03-21     20:02:46	1
23	yaritza bueno	Not Set1	 2025-03-21     22:00:23	1
22	nilo	Not Set1	 2025-03-21     22:30:51	1
17	lays	Not Set1	 2025-03-21     22:57:59	1
23	yaritza bueno	Not Set1	 2025-03-22     07:50:13	1
22	nilo	Not Set1	 2025-03-22     09:53:14	1
20	carolina peixoto	Not Set1	 2025-03-22     10:02:02	1
23	yaritza bueno	Not Set1	 2025-03-22     11:10:15	1
23	yaritza bueno	Not Set1	 2025-03-22     12:10:14	1
20	carolina peixoto	Not Set1	 2025-03-22     12:29:26	1
22	nilo	Not Set1	 2025-03-22     12:59:56	1
20	carolina peixoto	Not Set1	 2025-03-22     13:11:26	1
22	nilo	Not Set1	 2025-03-22     14:03:41	1
23	yaritza bueno	Not Set1	 2025-03-22     15:35:58	1
22	nilo	Not Set1	 2025-03-22     17:00:12	1
20	carolina peixoto	Not Set1	 2025-03-22     17:03:10	1
17	lays	Not Set1	 2025-03-23     07:42:37	1
8	lurdes	Not Set1	 2025-03-23     08:13:41	1
8	lurdes	Not Set1	 2025-03-23     13:00:02	1
8	lurdes	Not Set1	 2025-03-23     13:31:28	1
17	lays	Not Set1	 2025-03-23     13:59:35	1
8	lurdes	Not Set1	 2025-03-23     14:00:02	1
21	brenda pierini	Not Set1	 2025-03-24     04:47:24	1
14	Rosangela Fagundes	Not Set1	 2025-03-24     06:05:18	1
20	carolina peixoto	Not Set1	 2025-03-24     08:14:15	1
21	brenda pierini	Not Set1	 2025-03-24     09:36:55	1
14	Rosangela Fagundes	Not Set1	 2025-03-24     10:04:21	1
10	mauricio	Not Set7	 2025-03-24     10:11:48	1
21	brenda pierini	Not Set1	 2025-03-24     10:32:08	1
14	Rosangela Fagundes	Not Set1	 2025-03-24     10:51:13	1
8	lurdes	Not Set1	 2025-03-24     11:42:14	1
21	brenda pierini	Not Set1	 2025-03-24     13:05:53	1
23	yaritza bueno	Not Set1	 2025-03-24     13:36:05	1
10	mauricio	Not Set7	 2025-03-24     13:36:15	1
20	carolina peixoto	Not Set1	 2025-03-24     14:07:03	1
14	Rosangela Fagundes	Not Set1	 2025-03-24     14:16:31	1
10	mauricio	Not Set7	 2025-03-24     14:31:53	1
17	lays	Not Set1	 2025-03-24     14:36:40	1
22	nilo	Not Set1	 2025-03-24     14:37:49	1
20	carolina peixoto	Not Set1	 2025-03-24     15:03:33	1
8	lurdes	Not Set1	 2025-03-24     16:09:12	1
17	lays	Not Set1	 2025-03-24     16:28:19	1
20	carolina peixoto	Not Set1	 2025-03-24     16:28:41	1
8	lurdes	Not Set1	 2025-03-24     17:08:42	1
17	lays	Not Set1	 2025-03-24     17:29:03	1
22	nilo	Not Set1	 2025-03-24     18:00:03	1
10	mauricio	Not Set7	 2025-03-24     18:29:15	1
22	nilo	Not Set1	 2025-03-24     18:58:25	1
8	lurdes	Not Set1	 2025-03-24     20:00:14	1
23	yaritza bueno	Not Set1	 2025-03-24     20:10:21	1
23	yaritza bueno	Not Set1	 2025-03-24     21:09:43	1
23	yaritza bueno	Not Set1	 2025-03-24     22:02:14	1
17	lays	Not Set1	 2025-03-24     23:00:36	1
22	nilo	Not Set1	 2025-03-24     23:03:05	1
21	brenda pierini	Not Set1	 2025-03-25     04:51:33	1
14	Rosangela Fagundes	Not Set1	 2025-03-25     06:06:27	1
20	carolina peixoto	Not Set1	 2025-03-25     08:04:23	1
14	Rosangela Fagundes	Not Set1	 2025-03-25     09:56:17	1
21	brenda pierini	Not Set1	 2025-03-25     10:09:12	1
10	mauricio	Not Set7	 2025-03-25     10:13:38	1
14	Rosangela Fagundes	Not Set1	 2025-03-25     10:31:10	1
21	brenda pierini	Not Set1	 2025-03-25     11:06:21	1
8	lurdes	Not Set1	 2025-03-25     11:36:33	1
20	carolina peixoto	Not Set1	 2025-03-25     11:41:02	1
20	carolina peixoto	Not Set1	 2025-03-25     12:39:30	1
21	brenda pierini	Not Set1	 2025-03-25     13:06:16	1
23	yaritza bueno	Not Set1	 2025-03-25     13:41:24	1
14	Rosangela Fagundes	Not Set1	 2025-03-25     14:22:07	1
22	nilo	Not Set1	 2025-03-25     14:39:59	1
17	lays	Not Set1	 2025-03-25     14:53:55	1
17	lays	Not Set1	 2025-03-25     16:17:57	1
20	carolina peixoto	Not Set1	 2025-03-25     16:18:10	1
10	mauricio	Not Set7	 2025-03-25     17:03:33	1
8	lurdes	Not Set1	 2025-03-25     17:03:39	1
17	lays	Not Set1	 2025-03-25     17:19:45	1
22	nilo	Not Set1	 2025-03-25     18:00:20	1
8	lurdes	Not Set1	 2025-03-25     18:09:12	1
10	mauricio	Not Set7	 2025-03-25     18:09:16	1
10	mauricio	Not Set7	 2025-03-25     18:22:41	1
22	nilo	Not Set1	 2025-03-25     18:59:05	1
23	yaritza bueno	Not Set1	 2025-03-25     19:41:16	1
8	lurdes	Not Set1	 2025-03-25     20:11:21	1
23	yaritza bueno	Not Set1	 2025-03-25     20:41:52	1
23	yaritza bueno	Not Set1	 2025-03-25     22:02:09	1
22	nilo	Not Set1	 2025-03-25     22:34:12	1
17	lays	Not Set1	 2025-03-25     23:01:04	1
21	brenda pierini	Not Set1	 2025-03-26     04:54:58	1
14	Rosangela Fagundes	Not Set1	 2025-03-26     06:08:01	1
22	nilo	Not Set1	 2025-03-26     08:04:49	1
20	carolina peixoto	Not Set1	 2025-03-26     08:23:18	1
14	Rosangela Fagundes	Not Set1	 2025-03-26     10:07:34	1
14	Rosangela Fagundes	Not Set1	 2025-03-26     11:02:12	1
8	lurdes	Not Set1	 2025-03-26     11:41:25	1
10	mauricio	Not Set7	 2025-03-26     11:48:50	1
22	nilo	Not Set1	 2025-03-26     11:58:57	1
20	carolina peixoto	Not Set1	 2025-03-26     12:28:38	1
22	nilo	Not Set1	 2025-03-26     13:03:24	1
20	carolina peixoto	Not Set1	 2025-03-26     13:25:32	1
23	yaritza bueno	Not Set1	 2025-03-26     13:42:17	1
14	Rosangela Fagundes	Not Set1	 2025-03-26     14:15:37	1
17	lays	Not Set1	 2025-03-26     14:29:55	1
22	nilo	Not Set1	 2025-03-26     16:02:01	1
10	mauricio	Not Set7	 2025-03-26     16:07:53	1
8	lurdes	Not Set1	 2025-03-26     16:09:01	1
17	lays	Not Set1	 2025-03-26     16:35:25	1
20	carolina peixoto	Not Set1	 2025-03-26     16:36:11	1
10	mauricio	Not Set7	 2025-03-26     16:45:59	1
8	lurdes	Not Set1	 2025-03-26     17:08:43	1
17	lays	Not Set1	 2025-03-26     17:36:57	1
23	yaritza bueno	Not Set1	 2025-03-26     19:38:19	1
10	mauricio	Not Set7	 2025-03-26     20:15:02	1
8	lurdes	Not Set1	 2025-03-26     20:33:17	1
23	yaritza bueno	Not Set1	 2025-03-26     20:34:20	1
23	yaritza bueno	Not Set1	 2025-03-26     22:01:21	1
17	lays	Not Set1	 2025-03-26     23:00:01	1
21	brenda pierini	Not Set1	 2025-03-27     04:48:55	1
14	Rosangela Fagundes	Not Set1	 2025-03-27     06:04:14	1
20	carolina peixoto	Not Set1	 2025-03-27     08:17:40	1
22	nilo	Not Set1	 2025-03-27     08:27:49	1
14	Rosangela Fagundes	Not Set1	 2025-03-27     10:11:43	1
14	Rosangela Fagundes	Not Set1	 2025-03-27     11:04:16	1
8	lurdes	Not Set1	 2025-03-27     11:40:36	1
22	nilo	Not Set1	 2025-03-27     12:01:44	1
21	brenda pierini	Not Set1	 2025-03-27     12:08:13	1
22	nilo	Not Set1	 2025-03-27     13:04:47	1
10	mauricio	Not Set7	 2025-03-27     13:07:11	1
21	brenda pierini	Not Set1	 2025-03-27     13:08:06	1
23	yaritza bueno	Not Set1	 2025-03-27     13:40:06	1
21	brenda pierini	Not Set1	 2025-03-27     14:06:13	1
20	carolina peixoto	Not Set1	 2025-03-27     14:09:10	1
17	lays	Not Set1	 2025-03-27     14:23:47	1
22	nilo	Not Set1	 2025-03-27     15:11:57	1
17	lays	Not Set1	 2025-03-27     16:01:34	1
8	lurdes	Not Set1	 2025-03-27     16:42:44	1
10	mauricio	Not Set7	 2025-03-27     16:42:49	1
17	lays	Not Set1	 2025-03-27     16:59:27	1
10	mauricio	Not Set7	 2025-03-27     17:34:54	1
8	lurdes	Not Set1	 2025-03-27     17:41:40	1
23	yaritza bueno	Not Set1	 2025-03-27     19:17:20	1
8	lurdes	Not Set1	 2025-03-27     20:10:12	1
10	mauricio	Not Set7	 2025-03-27     20:16:13	1
23	yaritza bueno	Not Set1	 2025-03-27     20:18:08	1
23	yaritza bueno	Not Set1	 2025-03-27     22:01:11	1
17	lays	Not Set1	 2025-03-27     22:59:39	1
21	brenda pierini	Not Set1	 2025-03-28     04:46:03	1
14	Rosangela Fagundes	Not Set1	 2025-03-28     06:04:01	1
20	carolina peixoto	Not Set1	 2025-03-28     08:03:20	1
22	nilo	Not Set1	 2025-03-28     08:33:15	1
14	Rosangela Fagundes	Not Set1	 2025-03-28     10:08:21	1
14	Rosangela Fagundes	Not Set1	 2025-03-28     10:52:44	1
21	brenda pierini	Not Set1	 2025-03-28     11:30:14	1
8	lurdes	Not Set1	 2025-03-28     11:39:10	1
22	nilo	Not Set1	 2025-03-28     12:14:57	1
21	brenda pierini	Not Set1	 2025-03-28     12:30:19	1
10	mauricio	Not Set7	 2025-03-28     12:40:27	1
21	brenda pierini	Not Set1	 2025-03-28     13:07:21	1
22	nilo	Not Set1	 2025-03-28     13:11:03	1
23	yaritza bueno	Not Set1	 2025-03-28     13:38:48	1
20	carolina peixoto	Not Set1	 2025-03-28     13:53:37	1
14	Rosangela Fagundes	Not Set1	 2025-03-28     14:30:38	1
17	lays	Not Set1	 2025-03-28     14:42:40	1
20	carolina peixoto	Not Set1	 2025-03-28     14:51:10	1
22	nilo	Not Set1	 2025-03-28     16:08:16	1
17	lays	Not Set1	 2025-03-28     16:20:48	1
20	carolina peixoto	Not Set1	 2025-03-28     16:21:03	1
8	lurdes	Not Set1	 2025-03-28     17:02:09	1
10	mauricio	Not Set7	 2025-03-28     17:03:13	1
17	lays	Not Set1	 2025-03-28     17:25:29	1
10	mauricio	Not Set7	 2025-03-28     17:36:58	1


	`;
	};
	let con = prompt(
		`Selecione um funcionário pelo ID:
\nMeu S/ um intervalo - 1
\nTodos Janeiro - 2
\nMeu Um - 3
\nMeu C/ intervalo - 4
\nMeu S/ dois intervalos - 5
\nMeu All - 6
\nMeu Unos - 7
\nMeu Unos S/ intervalo - 8
\nTodos Fevereiro - 9
\nTodos Março - 10
`,
		10
	);
	if (con == 1) {
		listasText.value = pontosUltras();
	} else if (con == 2) {
		listasText.value = pontoUltra();
	} else if (con == 3) {
		listasText.value = pontoUltras();
	} else if (con == 4) {
		listasText.value = pontosUltrasMy();
	} else if (con == 5) {
		listasText.value = `10	mauricio	Not Set7	 2025-01-02     13:00:00	1
10	mauricio	Not Set7	 2025-01-02     17:00:00	1
10	mauricio	Not Set7	 2025-01-02     21:20:00	1
10	mauricio	Not Set7	 2025-01-03     13:00:00	1
10	mauricio	Not Set7	 2025-01-03     16:00:00	1
10	mauricio	Not Set7	 2025-01-03     17:00:00	1
10	mauricio	Not Set7	 2025-01-03     21:20:00	1
10	mauricio	Not Set7	 2025-01-04     13:00:00	1
10	mauricio	Not Set7	 2025-01-04     16:00:00	1
10	mauricio	Not Set7	 2025-01-04     21:20:00	1
10	mauricio	Not Set7	 2025-01-05     13:00:00	1
10	mauricio	Not Set7	 2025-01-05     16:00:00	1
10	mauricio	Not Set7	 2025-01-05     17:00:00	1
10	mauricio	Not Set7	 2025-01-05     21:20:00	1
`;
	} else if (con == 6) {
		listasText.value = "";
		const lis = pontosUltrasMys();
		listasText.value += lis.join("\n");

		// listasText.value += UltrasCompl();
	} else if (con == 7) {
		listasText.value = UltrasMy();

		// listasText.value += UltrasCompl();
	} else if (con == 8) {
		listasText.value = UltrasMys();

		// listasText.value += UltrasCompl();
	} else if (con == 9) {
		listasText.value = pontosUltraFev();

		// listasText.value += UltrasCompl();
	} else if (con == 10) {
		listasText.value = pontosUltraMarco();

		// listasText.value += UltrasCompl();
	} else {
		alert("INVÁLIDO");
		return;
	}
});
let objeto = [];
document.querySelector("#btn_ajustarPonto").addEventListener("click", () => {
	const listasText = document.querySelector("#listasText").value;
	const pontos = listasText.split("\n");

	pontos.forEach((item, index) => {
		const regex = /(\d+)\s+(\w+)\s+Not Set(\d+)\s+(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})\s+(\d+)/;

		const partes = item.split(" ");

		const match = item.match(regex);

		if (match) {
			const dados = {
				Id: match[1],
				Nome: match[2],
				Setor: match[3],
				Data: match[4],
				Hora: match[5],
				Maquina: match[6]
			};
			const d = {
				Id: match[1],
				Nome: match[2],
				Setor: "Not Set" + match[3],
				Data: match[4],
				Hora: match[5],
				Maquina: match[6]
			};

			/*
10	mauricio	Not Set7	 2025-01-06     21:20:00	1

10	mauricio	Not Set7	 2025-01-01     13:00:00 1
  */

			let elemento = `${d.Id}	${d.Nome}	${d.Setor}	 ${d.Data}     ${d.Hora} ${d.Maquina}`;
			let el = { elemento };
			objeto.push(match[0]);
		} else {
			console.log("Nenhuma correspondência encontrada.");
		}
	});
});

document.querySelector("#btn_ajustarInput").addEventListener("click", () => {
	const listasText = document.querySelector("#listasText");

	objeto.forEach((item, index) => {
		listasText.value += item;
		//console.log(item,"item");
	});
});

//console.log(objeto,"objeto");

document.getElementById("btn_ponto").addEventListener("click", function () {
	diasTrabalhados = [];
	diasTrabalho = [];
	diasSemIntervalos = [];
	let textarea = document.getElementById("listasText").value.trim();
	let linhas = textarea.split("\n");
	let funcionarios = {};
	linhas.forEach(linha => {
		let partes = linha.split("\t");
		if (partes.length < 5) return;

		let id = parseInt(partes[0].trim());
		let nome = partes[1].trim();
		let setor = partes[2].trim();
		let dataMatch = partes[3].match(/\d{4}-\d{2}-\d{2}/);
		let horaMatch = partes[3].match(/\d{2}:\d{2}:\d{2}/);
		let data = dataMatch ? dataMatch[0] : null;
		let hora = horaMatch ? horaMatch[0] : null;
		let maquina = parseInt(partes[4].trim());
		if (!funcionarios[id]) {
			funcionarios[id] = { id, nome, setor, registros: [] };
		}

		if (data && hora) {
			funcionarios[id].registros.push({ data, hora, maquina });
		}
	});

	let resultado = Object.values(funcionarios);
	selecionarFuncionarioECalcularHoras(resultado);

/*
	//     registrosDias.forEach(obj => {
	//     const data = Object.keys(obj)[0]; // Pega a data (chave do objeto)
	//     const horarios = obj[data]; // Obtém o array de horários

	//     console.log(`Data: ${data}`);
	//     horarios.forEach(horario => {
	//         console.log(`  Horário: ${horario}`);
	//     });
	// });


	// console.log(diasTrabalhados,"diasTrabalhados");
	//console.log(diasTrabalho,"diasTrabalho");
	//console.log(diasSemIntervalos,"diasSemIntervalos");
	*/
});

// function selecionarFuncionarioECalcularHoras(funcionarios) {
//     let datasFuncionarios = funcionarios.map(f => `${f.registros}`).join("\n");
//     let nomesFuncionarios = funcionarios.map(f => `${f.id} - ${f.nome}`).join("\n");
//     let nomeFuncionario = funcionarios.map(f => `${f.id}`).join("\n");

//     let idSelecionado;
//     let mesSelecionado;

//     if (funcionarios.length < 2) {
//     const d = new Date();
//     idSelecionado = nomeFuncionario;

//     	let func = funcionarios.find(f => f.id == idSelecionado);
//     	mesSelecionado = (d.getMonth()+1);

//     } else if (funcionarios.length > 1) {
//     idSelecionado = prompt(`Selecione um funcionário pelo ID:\n${nomesFuncionarios}`, 10);
//     }

//     if (!idSelecionado) return;

//     let funcionario = funcionarios.find(f => f.id == idSelecionado.trim());

//     if (!funcionario) {
//         alert("Funcionário não encontrado!");
//         return;
//     }

//     mesSelecionado = prompt("Digite o mês desejado (formato MM):", `01`);

//     if (!mesSelecionado || !/^\d{2}$/.test(mesSelecionado)) {
//         alert("Mês inválido!");
//         return;
//     }

//     const r = funcionario.registros;
//     r.forEach((item, index) => {
//     	diasTrabalhados.push(item.data);
//     });
//     const diasUnicos = [...new Set(diasTrabalhados.map(data => data.slice(0, 10)))];
//     diasTrabalho.push(diasUnicos);
//     // console.log(diasTrabalhados);
//     	 //console.log("diasUnicos",diasUnicos);
//     // diasTrabalho.forEach((item, index) => {
//     // 	console.log(item);
//     // });

// const cpfsFormatados = r.map(cpf => cpf.data);

// 	const cpfCounts = cpfsFormatados.reduce((acc, cpf) => {
// 		acc[cpf] = (acc[cpf] || 0) + 1;
// 		return acc;
// 	}, {});
// 	const cpfsRepetidos = Object.keys(cpfCounts).filter(cpf => cpfCounts[cpf] < 4);
// let datasRepetidas = [];
// const semIntervalos = cpfsRepetidos.map((item, index) => {
// //console.log(item.split("-").reverse().join("/"));
// 	const dates = item.split("-").reverse().join("/");
// 	datasRepetidas.push(dates);
// });

// //semIntervalos.forEach((item, index) => {
// //	const dates = item.split("-").reverse().join("/");

// //});
// //console.log(datasRepetidas);
//   //     funcionarios.forEach((item, index) => {
//   // 	const r = item.registros;
//   // 	console.log("nome item: ",item.nome,item);
//   // 	r.forEach((it, i) => {
//   // 	console.log("it.data",it.data);

//   // 	});
//   // });

//     //

//     let resultado = calcularHorasTrabalhadas(funcionario, mesSelecionado);
//     // console.log(`Horas trabalhadas por ${funcionario.nome} no mês ${mesSelecionado}: ${resultado.horasTrabalhadas}`);
//     // console.log(`Horas de intervalo por ${funcionario.nome} no mês ${mesSelecionado}: ${resultado.horasIntervalo}`);
//     // console.log(resultado.mensagemSemIntervalo);
//     // viewDomPonto(funcionario.nome, mesSelecionado, resultado.horasTrabalhadas, resultado.mensagemSemIntervalo);
//     viewDomPonto(funcionario.nome, mesSelecionado, resultado.horasTrabalhadas, resultado.mensagemSemIntervalo,resultado.horasIntervalo,datasRepetidas);
// // console.log(diasUnicos);
// // console.log(diasTrabalhados);
// // console.log(diasTrabalho);
// 	resPonto(funcionario.nome, mesSelecionado, resultado.horasTrabalhadas, resultado.mensagemSemIntervalo,resultado.horasIntervalo,diasUnicos,diasTrabalho);
// }

function selecionarFuncionarioECalcularHoras(funcionarios) {
	let datasFuncionarios = funcionarios.map(f => `${f.registros}`).join("\n");
	let datasFunci = funcionarios.map(f => f.registros);

	const oi = new Set();
	datasFunci.forEach((item, index) => {
		for (let i = 0; i < item.length; i++) {
			const ite = item[i].data;
			const iten = ite.split("-");
			oi.add(item[i].data);
			//console.log(item[i].data,"item: " + (i+1));
		}
		// console.log(oi,"oi");
	});
	let nomesFuncionarios = funcionarios.map(f => `${f.id} - ${f.nome}`).join("\n");
	let nomeFuncionario = funcionarios.map(f => `${f.id}`).join("\n");

	let idSelecionado;
	let mesSelecionado;

	if (funcionarios.length < 2) {
		const d = new Date();
		idSelecionado = nomeFuncionario;

		let func = funcionarios.find(f => f.id == idSelecionado);
		mesSelecionado = d.getMonth() + 1;
	} else if (funcionarios.length > 1) {
		idSelecionado = prompt(`Selecione um funcionário pelo ID:\n${nomesFuncionarios}`, 10);
	}

	if (!idSelecionado) return;

	let funcionario = funcionarios.find(f => f.id == idSelecionado.trim());

	if (!funcionario) {
		alert("Funcionário não encontrado!");
		return;
	}

	mesSelecionado = prompt("Digite o mês desejado (formato MM):", `03`);

	if (!mesSelecionado || !/^\d{2}$/.test(mesSelecionado)) {
		alert("Mês inválido!");
		return;
	}

	const r = funcionario.registros;
	r.forEach((item, index) => {
		diasTrabalhados.push(item.data);
	});
	const diasUnicos = [...new Set(diasTrabalhados.map(data => data.slice(0, 10)))];
	diasTrabalho.push(diasUnicos);
	//console.log("diasTrabalho2",diasTrabalho);
	//console.log("diasUnicos2",diasUnicos);
	//console.log("datasFunci",datasFunci);

	let resultado = calcularHorasTrabalhadas(funcionario, mesSelecionado);
	datasReg();

	resPonto(funcionario.nome, mesSelecionado, resultado.horasTrabalhadas, resultado.mensagemSemIntervalo, resultado.horasIntervalo, diasUnicos, diasTrabalho);
}

// function datasReg() {
// 	// Array com os dias da semana
// 	const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
// /*
// 	// registrosDias.forEach(obj => {
// 	//     const data = Object.keys(obj)[0]; // Pega a data (chave do objeto)
// 	//     const horarios = obj[data]; // Obtém o array de horários

// 	//     // Converte a string da data para um objeto Date e obtém o dia da semana
// 	//     const diaSemana = diasSemana[new Date(data).getDay()];

// 	//     console.log(`Data: ${data} (${diaSemana})`);
// 	//     horarios.forEach(horario => {
// 	//         console.log(`  Horário: ${horario}`);
// 	//     });
// 	// });
// 	// registrosDias.forEach(obj => {

// 	// 	let data = Object.keys(obj)[0]; // Pega a data (chave do objeto)
// 	// 	const horarios = obj[data]; // Obtém o array de horários

// 	// 	// Converte a string da data para um objeto Date e obtém o dia da semana
// 	// 	const diaSemana = diasSemana[new Date(data).getDay()];

// 	// 	console.log(`Data: ${data} (${diaSemana})`);
// 	// 	horarios.forEach(horario => {
// 	// 		 console.log(`  Horário: ${horario}`);
// 	// 	});
// 	// });
// */

// // 	registrosDias.forEach(obj => {
// //     Object.entries(obj).forEach(([data, horarios]) => {
// //         console.log(`Data: ${data}`);
// //         horarios.forEach(horario => {
// //             console.log(`  Horário: ${horario}`);
// //         });
// //     });
// // });

// 	registrosDias.forEach(obj => {
//     Object.entries(obj).forEach(([data, horarios]) => {
// const diaSemana = diasSemana[new Date(data).getDay()+1];
// let ob = {
// 	dia: diaSemana,
// 	data: data,
// 	hora: horarios
// };
// pontoDia.push(ob);

//         // console.log(`obj:\n${Object.entries(obj).join("\n").split(",").join("\n")}`);
//         // console.log(`Data: ${data}`);
//         horarios.forEach(horario => {
//             // console.log(`  Horário: ${horario}`);
//         });
//     });
// });

// 	 console.log(pontoDia);
// }

function datasReg() {
	// Array com os dias da semana
	const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
/*
	// registrosDias.forEach(obj => {
	//     const data = Object.keys(obj)[0]; // Pega a data (chave do objeto)
	//     const horarios = obj[data]; // Obtém o array de horários

	//     // Converte a string da data para um objeto Date e obtém o dia da semana
	//     const diaSemana = diasSemana[new Date(data).getDay()];

	//     console.log(`Data: ${data} (${diaSemana})`);
	//     horarios.forEach(horario => {
	//         console.log(`  Horário: ${horario}`);
	//     });
	// });
	// registrosDias.forEach(obj => {

	// 	let data = Object.keys(obj)[0]; // Pega a data (chave do objeto)
	// 	const horarios = obj[data]; // Obtém o array de horários

	// 	// Converte a string da data para um objeto Date e obtém o dia da semana
	// 	const diaSemana = diasSemana[new Date(data).getDay()];

	// 	console.log(`Data: ${data} (${diaSemana})`);
	// 	horarios.forEach(horario => {
	// 		 console.log(`  Horário: ${horario}`);
	// 	});
	// });
*/

// 	registrosDias.forEach(obj => {
//     Object.entries(obj).forEach(([data, horarios]) => {
//         console.log(`Data: ${data}`);
//         horarios.forEach(horario => {
//             console.log(`  Horário: ${horario}`);
//         });
//     });
// });
pontoDia = [];
	registrosDias.forEach(obj => {
    Object.entries(obj).forEach(([data, horarios]) => {
 const diaSemana = diasSemana[new Date(data).getDay()+1];
 let regDiario = {
 	dia: diaSemana,
 	data: data,
 	hora: horarios
 };
 pontoDia.push(regDiario);

        
    });
});

	 console.log(pontoDia);
}



document.addEventListener("DOMContentLoaded", () => {
	const maur = 60 * 24;
	const mau = maur * 30;

	const ma = 2293.04 / 30;
	const ar = ma * 30;
	const m = 2293.04 / 23;
	const a = m * 23;

});

// function resPonto(nome, mesSelecionado, horasTrabalhadas, mensagemSemIntervalo,intervalo,semIntervalos, diasUnicos) {
// 	mesSelecionado = meses[mesSelecionado - 1];
// 	diasUnicos = [...new Set(diasTrabalhados.map(data => data.slice(0, 10)))];

// 	const corpo = document.querySelector(".corpo");
// 	const rodape = document.querySelector(".rodape");

// 	function capitalizar(str) {
//   if (str === null || str === undefined || str.length === 0) {
//     return str; // Retorna vazio ou null se a string for inválida
//   }
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// const nomes = nome.split(" ");
// const trabalhadas = horasTrabalhadas.split(":");
// const trabalhada = trabalhadas[1].split(".");

// // const salMin = (trabalhadas[0] + (trabalhada[0] / 60));
// // const salMin = salHora /  ((trabalhada[0] / 60));
// // const salHora = salDia/7.33;
// const salDia = (2293.04 / 30);
// const salMin = (salDia/440).toFixed(2);
// const salHora = (salMin*60).toFixed(2);
// let salario = (salHora * trabalhadas[0]) + (salMin * trabalhada[0]);

// horasTrabalhadas = trabalhadas[0] + " Horas e "+ trabalhada[0] + " Minutos";
// nome = capitalizar(nomes[0]) + " " + capitalizar(nomes[nomes.length - 1]);

// 	const div_corpo = (nome, mesSelecionado, horasTrabalhadas, mensagemSemIntervalo,intervalo,semIntervalos, diasUnicos) => {
// 	return `
// 	<div>
// 	<span name="informacoes">
// 	<h4>
// 				Funcionário(A):
// 	<br>
// 	<strong class="color_green">
// 				${nome}
// 	</strong>
// 	<br>
// 				Mês Selecionado:
// 	<br>
// 			${mesSelecionado}
// 		</h4>
// 				</span>

// 				<span>

// 				${diasUnicos}

// 					</span>
// 				</div>
// 	`;
// }
// 	const div_rodape = (nome, mesSelecionado, horasTrabalhadas, mensagemSemIntervalo,intervalo,semIntervalos, diasUnicos) => {
// 	return `
// 	<div>
// 	<span name="informacoes">
// 	<h4>

// 			Horas trabalhadas:	${horasTrabalhadas}
// 			<br>
// 				Salário Bruto:
// 				${salario}
// 		</h4>
// 				</span>

// 				<span>

// 				<h4>
// 			${mensagemSemIntervalo}
// 				</h4>

// 					<ul class="boxe_lista lista_ajustada scroll_bar" >
// 						         ${semIntervalos.
// 				map((data, index) => `
//     <li>${(index + 1) < 10 ? "0" + (index+1 ): index+1}.
//     &nbsp; ${data} &nbsp;</li>
//   `).join("")}
// 					</ul>
// 					</span>
// 				</div>
// 	`;
// }

// corpo.innerHTML = div_corpo(nome, mesSelecionado, horasTrabalhadas, mensagemSemIntervalo,intervalo,semIntervalos,diasUnicos);
// rodape.innerHTML = div_rodape(nome, mesSelecionado, horasTrabalhadas, mensagemSemIntervalo,intervalo,semIntervalos, diasUnicos);
// }

function resPonto(nome, mesSelecionado, horasTrabalhadas, mensagemSemIntervalo, intervalo, semIntervalos, diasUnicos, x) {
	mesSelecionado = meses[mesSelecionado - 1];
	x = [];
	diasUnicos = [...new Set(x.map(data => data.slice(0, 10)))];
	const corpo = document.querySelector(".corpo");
	const rodape = document.querySelector(".rodape");

	function capitalizar(str) {
		if (str === null || str === undefined || str.length === 0) {
			return str; // Retorna vazio ou null se a string for inválida
		}
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	const nomes = nome.split(" ");
	const trabalhadas = horasTrabalhadas.split(":");

	// Original
	const trabalhada = trabalhadas[1].split(".");

	horasTrabalhadas = trabalhadas[0] + " Horas e " + trabalhada[0] + " Minutos";

	// horasTrabalhadas = trabalhadas[0] + " Horas e "+ trabalhada + " Minutos";

	nome = capitalizar(nomes[0]) + " " + capitalizar(nomes[nomes.length - 1]);

	const div_corpo = (nome, mesSelecionado, horasTrabalhadas, mensagemSemIntervalo, intervalo, semIntervalos, diasUnicos) => {
		return `
	<div>
	<span name="informacoes">
	<h4>
				Funcionário(A): 
	<br>
	<strong class="color_green">
				${nome} 
	</strong>
	<br>
				Mês Selecionado:
	<br>
			${mesSelecionado}
		</h4>
				</span>
				
				<span>
	<br>
		<h4>
		${semIntervalos.length} Dias Trabalhados:
		</h4>
	
				<ul class="boxe_lista color_green scroll_bar" >
				
${semIntervalos
	.map(
		(dias, index) => `
    <li>${index + 1 < 10 ? "0" + (index + 1) : index + 1}.
    &nbsp; ${dias.split("-").reverse().join(" / ")} &nbsp;</li>
  `
	)
	.join("")}
					</ul>
					
			
					</span>
				</div>
	`;
	};
	const div_rodape = (nome, mesSelecionado, horasTrabalhadas, mensagemSemIntervalo, intervalo, semIntervalos, diasUnicos) => {
		return `
	<div>
	<span name="informacoes">
	<h4>
				
			Horas trabalhadas:	${horasTrabalhadas} 
			
		</h4>
				</span>
				
				<span>
				
				<h4>
			${mensagemSemIntervalo}
				</h4>
				
					<ul class="boxe_lista lista_ajustada scroll_bar" >
					${diasSemIntervalos
																.map(
																	(data, index) => `
    <li>
    &nbsp; ${data} &nbsp;</li>
  `
																)
																.join("")}
					</ul>
					</span>
					<br>
					<span>
					 <ul class="boxe_lista lista_ajustada scroll_bar">
  	${registrosDias
  	.map((data, index) => 
  	
    
  	 `
    <li>
   ${Object.entries(data).join("<br>").split(",").join(":<br>")} &nbsp;
   
   </li>
     
    
  `).join("")}
  </ul>

					</span>
				
				</div>
	`;
	};

	corpo.innerHTML = div_corpo(nome, mesSelecionado, horasTrabalhadas, mensagemSemIntervalo, intervalo, semIntervalos, diasUnicos);
	rodape.innerHTML = div_rodape(nome, mesSelecionado, horasTrabalhadas, mensagemSemIntervalo, intervalo, semIntervalos, diasUnicos);
}

function viewDomPonto(nome, mesSelecionado, horasTrabalhadas, mensagemSemIntervalo, intervalo, semIntervalos) {
	const boxePonto = document.querySelector("#viewListaCopia");
	mesSelecionado = meses[mesSelecionado - 1];
	let mau = mensagemSemIntervalo.match(/\d{4}-\d{2}-\d{2}/g);
	boxePonto.innerHTML = `
<div class="boxes">
				<h3>
					Hora Funcionário
				</h3>
				<p>
				Horas trabalhadas por ${nome} no mês ${mesSelecionado}: ${horasTrabalhadas}
				</p>
				<p>			
				Horas de intervalo por ${nome} no mês ${mesSelecionado}: ${intervalo}
				</p>
				<p>				${mensagemSemIntervalo}
				
				</p>
				
				<ul class="box_lista scroll_bar" style="width:95%;height:100px;">
				${semIntervalos
					.map(
						(data, index) => `
    <li>${index + 1 < 10 ? "0" + (index + 1) : index + 1}.
    &nbsp; ${data} &nbsp;</li>
  `
					)
					.join("")}
				
				</ul>
				
			</div>
			
`;
	// console.log(semIntervalos);
}

// function calcularHorasTrabalhadas(funcionario, mes) {
//     let registros = funcionario.registros.filter(reg => reg.data.split("-")[1] === mes).sort((a, b) => a.data.localeCompare(b.data) || a.hora.localeCompare(b.hora));
//     // console.log(registros);
//     // console.log(funcionario);
//     if (registros.length < 2) return { horasTrabalhadas: "Dados insuficientes", horasIntervalo: "N/A", mensagemSemIntervalo: "" };

//     let totalMinutosTrabalho = 0;
//     let totalMinutosIntervalo = 0;
//     registrosDias = [];
//     let diasSemIntervalo = [];
//     let diaTrabalhados = [];
//     let registrosPorDia = {};

//     // Agrupa os registros por data
//     registros.forEach(reg => {
//         if (!registrosPorDia[reg.data]) {
//             registrosPorDia[reg.data] = [];
//             // console.log("registrosPorDia",registrosPorDia);
//             // console.log("Object.keys(registrosPorDia)",Object.keys(registrosPorDia));
//         }

//       diasTrabalhados.push(reg.data);

//       registrosPorDia[reg.data].push(reg.hora);
//     });

//   // Extrair e filtrar dias únicos do mês de março
// const diasUnicos = [...new Set(diasTrabalhados.map(data => data.slice(0, 10)))];

// // console.log("diasUnicos",diasUnicos);

//     for (let data in registrosPorDia) {
//         let pontos = registrosPorDia[data];

//         pontos.sort();
// if (pontos.length < 4) {
//     // Se houver menos de 4 registros, considerar primeiro e último como horas trabalhadas
//     totalMinutosTrabalho += diferencaEmMinutos(pontos[0], pontos[pontos.length - 1]);
//     diasSemIntervalo.push(data);
//     diasSemIntervalos.push(data);
//     continue;
// }

//         // if (pontos.length < 2) continue; // Se houver apenas dois registro no dia, ignora

//         let minutosDia = 0;
//         let minutosIntervalo = 0;
//         for (let i = 0; i < pontos.length - 1; i += 2) {
//             minutosDia += diferencaEmMinutos(pontos[i], pontos[i + 1]);
//         }

//         if (pontos.length > 3) {
//             for (let i = 1; i < pontos.length - 1; i += 2) {
//         minutosIntervalo += diferencaEmMinutos(pontos[i], pontos[i + 1]);
//             }
//         } else {
//             diasSemIntervalo.push(data);
//         }

// // console.log(registrosPorDia);
//     registrosDias.push(registrosPorDia);

//         totalMinutosTrabalho += minutosDia;
//         totalMinutosIntervalo += minutosIntervalo;
//     }

//     let horasTrabalhoFormatadas = formatarHoras(totalMinutosTrabalho);
//     let horasIntervaloFormatadas = formatarHoras(totalMinutosIntervalo);

//   // const semIntervalo = diasSemIntervalo.map(item => `${item.split("-").reverse().join("/")}`).join(", ");
//   const semIntervalo = diasSemIntervalo.map(item => `${item.split("-").reverse().join("/")}`).join("<br>");

//     if (diasSemIntervalo.length == 1) {
//     	 //mensagemSemIntervalo = `O funcionário não teve intervalo no dia: ${diasSemIntervalo.map(item => `${item.split("-").reverse().join("/")}`).join(", ")}`;
//     	 mensagemSemIntervalo = `O funcionário não teve intervalo no dia: ${semIntervalo}`;

//     }
//     // if (diasSemIntervalo.length > 1) {

//     // 	 mensagemSemIntervalo = `O funcionário não teve intervalo nos dias:
//     // 	<br>
//     // 	 ${diasSemIntervalo.map(item => `${item.split("-").reverse().join("/")}`).join(", ")}
//     // 	 `;
//     // }
//     if (diasSemIntervalo.length > 1) {

//     	 mensagemSemIntervalo = `O funcionário não teve <strong class="color_red">
//     	 ${diasSemIntervalo.length}
//     	 </strong> dias de intervalo nas datas:

//     	<strong class="color_red" style="display:none">
//     	 ${semIntervalo}
//     </strong>
//     	 `;
//     }

//     if (diasSemIntervalo.length < 1) {
//     	mensagemSemIntervalo = "Todos os dias possuem intervalo.";
//     }
//   //console.log(diasSemIntervalo);

//     // return { horasTrabalhadas: horasTrabalhoFormatadas, horasIntervalo: horasIntervaloFormatadas, mensagemSemIntervalo };
//   // console.log(registrosDias);
//     return { horasTrabalhadas: horasTrabalhoFormatadas, horasIntervalo: horasIntervaloFormatadas, mensagemSemIntervalo, diasUnicos, semIntervalo };
// }

function calcularHorasTrabalhadas(funcionario, mes) {
	let registros = funcionario.registros.filter(reg => reg.data.split("-")[1] === mes).sort((a, b) => a.data.localeCompare(b.data) || a.hora.localeCompare(b.hora));
	// console.log(registros);
	// console.log(funcionario);
	registroFuncionario = [];
	if (registros.length < 2) return {
		
		horasTrabalhadas: "Dados insuficientes", horasIntervalo: "N/A", mensagemSemIntervalo: "" };

	let totalMinutosTrabalho = 0;
	let totalMinutosIntervalo = 0;
	registrosDias = [];
	let diasSemIntervalo = [];
	let diaTrabalhados = [];
	let registrosPorDia = {};

	// Agrupa os registros por data
	registros.forEach(reg => {
		if (!registrosPorDia[reg.data]) {
			registrosPorDia[reg.data] = [];
			// console.log("registrosPorDia",registrosPorDia);
			// console.log("Object.keys(registrosPorDia)",Object.keys(registrosPorDia));
		}

		diasTrabalhados.push(reg.data);

		registrosPorDia[reg.data].push(reg.hora);
	});

	// Extrair e filtrar dias únicos do mês de março
	const diasUnicos = [...new Set(diasTrabalhados.map(data => data.slice(0, 10)))];

	// console.log("diasUnicos",diasUnicos);

	for (let data in registrosPorDia) {
		let pontos = registrosPorDia[data];

		pontos.sort();
		if (pontos.length < 4) {
			// Se houver menos de 4 registros, considerar primeiro e último como horas trabalhadas
			totalMinutosTrabalho += diferencaEmMinutos(pontos[0], pontos[pontos.length - 1]);
			diasSemIntervalo.push(data);
			diasSemIntervalos.push(data);
			continue;
		}

		// if (pontos.length < 2) continue; // Se houver apenas dois registro no dia, ignora

		let minutosDia = 0;
		let minutosIntervalo = 0;
		for (let i = 0; i < pontos.length - 1; i += 2) {
			minutosDia += diferencaEmMinutos(pontos[i], pontos[i + 1]);
		}

		if (pontos.length > 3) {
			for (let i = 1; i < pontos.length - 1; i += 2) {
				minutosIntervalo += diferencaEmMinutos(pontos[i], pontos[i + 1]);
			}
		} else {
			diasSemIntervalo.push(data);
		}

		// console.log(registrosPorDia);
		if (registrosDias.length == 0) {
			
		registrosDias.push(registrosPorDia);
		}
		// console.log("registrosPorDia",registrosPorDia);
		// console.log("registrosDias",registrosDias);
		totalMinutosTrabalho += minutosDia;
		totalMinutosIntervalo += minutosIntervalo;
	}

	let horasTrabalhoFormatadas = formatarHoras(totalMinutosTrabalho);
	let horasIntervaloFormatadas = formatarHoras(totalMinutosIntervalo);

	// const semIntervalo = diasSemIntervalo.map(item => `${item.split("-").reverse().join("/")}`).join(", ");
	const semIntervalo = diasSemIntervalo.map(item => `${item.split("-").reverse().join("/")}`).join("<br>");

	if (diasSemIntervalo.length == 1) {
		//mensagemSemIntervalo = `O funcionário não teve intervalo no dia: ${diasSemIntervalo.map(item => `${item.split("-").reverse().join("/")}`).join(", ")}`;
		mensagemSemIntervalo = `O funcionário não teve intervalo no dia: ${semIntervalo}`;
	}
	// if (diasSemIntervalo.length > 1) {

	// 	 mensagemSemIntervalo = `O funcionário não teve intervalo nos dias:
	// 	<br>
	// 	 ${diasSemIntervalo.map(item => `${item.split("-").reverse().join("/")}`).join(", ")}
	// 	 `;
	// }
	if (diasSemIntervalo.length > 1) {
		mensagemSemIntervalo = `O funcionário não teve <strong class="color_red">
    	 ${diasSemIntervalo.length} 
    	 </strong> dias de intervalo nas datas:
    	
    	<strong class="color_red" style="display:none">
    	 ${semIntervalo}
     </strong> 
    	 `;
	}

	if (diasSemIntervalo.length < 1) {
		mensagemSemIntervalo = "Todos os dias possuem intervalo.";
	}
	//console.log(diasSemIntervalo);

	// return { horasTrabalhadas: horasTrabalhoFormatadas, horasIntervalo: horasIntervaloFormatadas, mensagemSemIntervalo };
	// console.log(registrosDias);
	return { horasTrabalhadas: horasTrabalhoFormatadas, horasIntervalo: horasIntervaloFormatadas, mensagemSemIntervalo, diasUnicos, semIntervalo };
}

function diferencaEmMinutos(hora1, hora2) {
	let [h1, m1, s1] = hora1.split(":").map(Number);
	let [h2, m2, s2] = hora2.split(":").map(Number);

	let t1 = new Date(0, 0, 0, h1, m1, s1);
	let t2 = new Date(0, 0, 0, h2, m2, s2);

	return (t2 - t1) / 60000;
}

function formatarHoras(totalMinutos) {
	let horas = Math.floor(totalMinutos / 60);
	let minutos = totalMinutos % 60;
	return `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
}
