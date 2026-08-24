# Matriz de cobertura linha a linha — Preparatório de Engenharia Informática

> **Fonte curricular:** `exactas.pdf` — Universidade Agostinho Neto, Subcomissão de Ciências Exactas, tópicos para o exame de acesso 2026/2027. Esta matriz é gerada a partir de `server/officialPdfSubtopics.ts`, cuja origem rastreável está em `docs/source/exactas_programa_2026_2027.txt`. Todas as questões indicadas são **questões de treino** do LUANDA PREP, não enunciados oficiais.

## Método de validação

Cada linha da tabela corresponde a um subtema canónico do programa oficial, identificado pela referência impressa no PDF. A matriz associa esse subtema a um único módulo, uma aula, uma sessão temática com definição e exemplo e uma questão de treino. O teste `server/content.test.ts` exige equivalência exacta entre `OFFICIAL_PDF_SUBTOPICS` e `OFFICIAL_PDF_COVERAGE`, incluindo identificador, referência, texto, disciplina, módulo e questão.

| Disciplina | Subtemas canónicos mapeados |
| --- | ---: |
| Matemática | 88 |
| Física | 124 |
| Química | 75 |
| Desenho e Geometria Descritiva | 28 |
| Língua Portuguesa | 20 |
| **Total** | **335** |

## Matemática

| Ref. PDF | Texto exacto do subtema | Módulo LUANDA PREP | Aula | Sessão temática | Questão de treino |
| --- | --- | --- | --- | --- | --- |
| 1.1 | Introdução. | `mat-geometria-espacial` | `aula-mat-geometria-espacial` | `Introdução.` | `q-mat-geometria-espacial-topico-8` |
| 1.2 | Problemas geométricos e estratégias de resolução. | `mat-geometria-espacial` | `aula-mat-geometria-espacial` | `Problemas geométricos e estratégias de resolução.` | `q-mat-geometria-espacial-topico-9` |
| 1.3 | Polígonos regulares. Poliedros regulares. | `mat-geometria-espacial` | `aula-mat-geometria-espacial` | `Polígonos regulares. Poliedros regulares.` | `q-mat-geometria-espacial-topico-10` |
| 1.4 | Representação de sólidos. | `mat-geometria-espacial` | `aula-mat-geometria-espacial` | `Representação de sólidos.` | `q-mat-geometria-espacial-topico-11` |
| 1.5 | Interpretação de um desenho. | `mat-geometria-espacial` | `aula-mat-geometria-espacial` | `Interpretação de um desenho.` | `q-mat-geometria-espacial-topico-12` |
| 1.6 | Rectas e planos no espaço. | `mat-geometria-espacial` | `aula-mat-geometria-espacial` | `Rectas e planos no espaço.` | `q-mat-geometria-espacial-topico-13` |
| 1.7 | Projecção ortogonal de um ponto sobre uma recta e sobre um plano. | `mat-geometria-espacial` | `aula-mat-geometria-espacial` | `Projecção ortogonal de um ponto sobre uma recta e sobre um plano.` | `q-mat-geometria-espacial-topico-14` |
| 1.8 | Plano mediador. | `mat-geometria-espacial` | `aula-mat-geometria-espacial` | `Plano mediador.` | `q-mat-geometria-espacial-topico-15` |
| 1.9 | Posições relativas de rectas no espaço. | `mat-geometria-espacial` | `aula-mat-geometria-espacial` | `Posições relativas de rectas no espaço.` | `q-mat-geometria-espacial-topico-16` |
| 1.10 | Posições relativas de rectas e planos no espaço. | `mat-geometria-espacial` | `aula-mat-geometria-espacial` | `Posições relativas de rectas e planos no espaço.` | `q-mat-geometria-espacial-topico-17` |
| 1.11 | Posições relativas de dois planos. | `mat-geometria-espacial` | `aula-mat-geometria-espacial` | `Posições relativas de dois planos.` | `q-mat-geometria-espacial-topico-18` |
| 2.1 | Referências no plano. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `Referências no plano.` | `q-mat-conjuntos-condicoes-topico-10` |
| 2.2 | As condições como expressões matemáticas. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `As condições como expressões matemáticas.` | `q-mat-conjuntos-condicoes-topico-11` |
| 2.3 | Proposições elementares. Operações lógicas. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `Proposições elementares. Operações lógicas.` | `q-mat-conjuntos-condicoes-topico-12` |
| 2.4 | Propriedades das operações lógicas. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `Propriedades das operações lógicas.` | `q-mat-conjuntos-condicoes-topico-13` |
| 2.5 | Operações com condições e com conjuntos. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `Operações com condições e com conjuntos.` | `q-mat-conjuntos-condicoes-topico-14` |
| 2.6 | Conjunção de condições e intersecção de conjuntos. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `Conjunção de condições e intersecção de conjuntos.` | `q-mat-conjuntos-condicoes-topico-15` |
| 2.7 | Disjunção de condições e reunião de conjuntos. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `Disjunção de condições e reunião de conjuntos.` | `q-mat-conjuntos-condicoes-topico-16` |
| 2.8 | Negação e complementação. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `Negação e complementação.` | `q-mat-conjuntos-condicoes-topico-17` |
| 2.9 | Condições incompatíveis e conjuntos disjuntos. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `Condições incompatíveis e conjuntos disjuntos.` | `q-mat-conjuntos-condicoes-topico-18` |
| 2.10 | Leis de Morgan. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `Leis de Morgan.` | `q-mat-conjuntos-condicoes-topico-19` |
| 2.11 | Conjuntos numéricos. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `Conjuntos numéricos.` | `q-mat-conjuntos-condicoes-topico-20` |
| 2.12 | Conjuntos e condições no plano. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `Conjuntos e condições no plano.` | `q-mat-conjuntos-condicoes-topico-21` |
| 2.13 | Disjunção e conjunção de condições em R2. | `mat-conjuntos-condicoes` | `aula-mat-conjuntos-condicoes` | `Disjunção e conjunção de condições em R2.` | `q-mat-conjuntos-condicoes-topico-22` |
| 3.1 | Sistema de coordenadas no espaço. | `mat-coordenadas-vetores-espaco` | `aula-mat-coordenadas-vetores-espaco` | `Sistema de coordenadas no espaço.` | `q-mat-coordenadas-vetores-espaco-topico-9` |
| 3.2 | Coordenadas dos pontos dos eixos coordenados. | `mat-coordenadas-vetores-espaco` | `aula-mat-coordenadas-vetores-espaco` | `Coordenadas dos pontos dos eixos coordenados.` | `q-mat-coordenadas-vetores-espaco-topico-10` |
| 3.3 | Planos perpendiculares aos eixos. | `mat-coordenadas-vetores-espaco` | `aula-mat-coordenadas-vetores-espaco` | `Planos perpendiculares aos eixos.` | `q-mat-coordenadas-vetores-espaco-topico-11` |
| 3.4 | Coordenadas de um ponto no espaço. | `mat-coordenadas-vetores-espaco` | `aula-mat-coordenadas-vetores-espaco` | `Coordenadas de um ponto no espaço.` | `q-mat-coordenadas-vetores-espaco-topico-12` |
| 3.5 | Conjunto R3. | `mat-coordenadas-vetores-espaco` | `aula-mat-coordenadas-vetores-espaco` | `Conjunto R3.` | `q-mat-coordenadas-vetores-espaco-topico-13` |
| 3.6 | Condições no espaço. | `mat-coordenadas-vetores-espaco` | `aula-mat-coordenadas-vetores-espaco` | `Condições no espaço.` | `q-mat-coordenadas-vetores-espaco-topico-14` |
| 4.1 | Distância entre dois pontos do plano. | `mat-lugares-geometricos` | `aula-mat-lugares-geometricos` | `Distância entre dois pontos do plano.` | `q-mat-lugares-geometricos-topico-7` |
| 4.2 | Mediatriz de um segmento de recta. | `mat-lugares-geometricos` | `aula-mat-lugares-geometricos` | `Mediatriz de um segmento de recta.` | `q-mat-lugares-geometricos-topico-8` |
| 4.3 | Circunferência e círculo. | `mat-lugares-geometricos` | `aula-mat-lugares-geometricos` | `Circunferência e círculo.` | `q-mat-lugares-geometricos-topico-9` |
| 4.4 | Elipse. | `mat-lugares-geometricos` | `aula-mat-lugares-geometricos` | `Elipse.` | `q-mat-lugares-geometricos-topico-10` |
| 4.5 | Distância entre dois pontos no espaço. Plano mediador. Superfície esférica e esfera. | `mat-lugares-geometricos` | `aula-mat-lugares-geometricos` | `Distância entre dois pontos no espaço. Plano mediador. Superfície esférica e esfera.` | `q-mat-lugares-geometricos-topico-11` |
| 5.1 | Vectores no plano e no espaço. | `mat-coordenadas-vetores-espaco` | `aula-mat-coordenadas-vetores-espaco` | `Vectores no plano e no espaço.` | `q-mat-coordenadas-vetores-espaco-topico-15` |
| 5.2 | Equações vectoriais | `mat-coordenadas-vetores-espaco` | `aula-mat-coordenadas-vetores-espaco` | `Equações vectoriais` | `q-mat-coordenadas-vetores-espaco-topico-5` |
| 6.1 | Revisão e sistematização da potenciação de expoente inteiro. | `mat-potencias-radicais` | `aula-mat-potencias-radicais` | `Revisão e sistematização da potenciação de expoente inteiro.` | `q-mat-potencias-radicais-topico-4` |
| 6.2 | Potenciação com expoente racional. | `mat-potencias-radicais` | `aula-mat-potencias-radicais` | `Potenciação com expoente racional.` | `q-mat-potencias-radicais-topico-5` |
| 6.3 | Cálculo com radicais. | `mat-potencias-radicais` | `aula-mat-potencias-radicais` | `Cálculo com radicais.` | `q-mat-potencias-radicais-topico-6` |
| 7.1 | Revisão da noção da função como correspondência unívoca. | `mat-funcoes` | `aula-funcoes` | `Revisão da noção da função como correspondência unívoca.` | `q-mat-funcoes-topico-6` |
| 7.2 | Gráficos das funções afim, linear e constante. | `mat-funcoes` | `aula-funcoes` | `Gráficos das funções afim, linear e constante.` | `q-mat-funcoes-topico-7` |
| 7.3 | Estudo das características de uma função por observação do gráfico. | `mat-funcoes` | `aula-funcoes` | `Estudo das características de uma função por observação do gráfico.` | `q-mat-funcoes-topico-8` |
| 7.4 | Definições. | `mat-funcoes` | `aula-funcoes` | `Definições.` | `q-mat-funcoes-topico-9` |
| 7.5 | Extremos de uma função. | `mat-funcoes` | `aula-funcoes` | `Extremos de uma função.` | `q-mat-funcoes-topico-10` |
| 7.6 | Transformações de funções. | `mat-funcoes` | `aula-funcoes` | `Transformações de funções.` | `q-mat-funcoes-topico-11` |
| 8.1 | Introdução da função quadrática. | `mat-graficos-quadratica` | `aula-mat-graficos-quadratica` | `Introdução da função quadrática.` | `q-mat-graficos-quadratica-topico-10` |
| 8.2 | Gráfico de uma função quadrática. | `mat-graficos-quadratica` | `aula-mat-graficos-quadratica` | `Gráfico de uma função quadrática.` | `q-mat-graficos-quadratica-topico-11` |
| 8.3 | Eixo de simetria e vértice do gráfico. | `mat-graficos-quadratica` | `aula-mat-graficos-quadratica` | `Eixo de simetria e vértice do gráfico.` | `q-mat-graficos-quadratica-topico-12` |
| 8.4 | Zeros da função quadrática. Equações do 2º grau. | `mat-graficos-quadratica` | `aula-mat-graficos-quadratica` | `Zeros da função quadrática. Equações do 2º grau.` | `q-mat-graficos-quadratica-topico-13` |
| 8.5 | Sinal da função quadrática. | `mat-graficos-quadratica` | `aula-mat-graficos-quadratica` | `Sinal da função quadrática.` | `q-mat-graficos-quadratica-topico-14` |
| 8.6 | Inequações do 2º grau. | `mat-graficos-quadratica` | `aula-mat-graficos-quadratica` | `Inequações do 2º grau.` | `q-mat-graficos-quadratica-topico-15` |
| 8.7 | Parábola. | `mat-graficos-quadratica` | `aula-mat-graficos-quadratica` | `Parábola.` | `q-mat-graficos-quadratica-topico-16` |
| 9.1 | Revisão das operações com polinómios. | `mat-polinomios` | `aula-polinomios` | `Revisão das operações com polinómios.` | `q-mat-polinomios-topico-6` |
| 9.2 | Regra de Ruffini. | `mat-polinomios` | `aula-polinomios` | `Regra de Ruffini.` | `q-mat-polinomios-topico-7` |
| 9.3 | Teorema do resto. Zeros de um polinómio. | `mat-polinomios` | `aula-polinomios` | `Teorema do resto. Zeros de um polinómio.` | `q-mat-polinomios-topico-8` |
| 9.4 | Decomposição de polinómios em factores. Determinação das raízes de um polinómio. | `mat-polinomios` | `aula-polinomios` | `Decomposição de polinómios em factores. Determinação das raízes de um polinómio.` | `q-mat-polinomios-topico-9` |
| 10.1 | Medidas de um ângulo. Generalização de um ângulo. As razões trigonométricas. | `mat-trigonometria` | `aula-trigonometria` | `Medidas de um ângulo. Generalização de um ângulo. As razões trigonométricas.` | `q-mat-trigonometria-topico-7` |
| 10.2 | As funções trigonométricas y = sen α, y = cos en α, y = tg α para quaisquer ângulos. Equações trigonométricas. Redução ao 1º quadrante. | `mat-trigonometria` | `aula-trigonometria` | `As funções trigonométricas y = sen α, y = cos en α, y = tg α para quaisquer ângulos. Equações trigonométricas. Redução ao 1º quadrante.` | `q-mat-trigonometria-topico-8` |
| 10.3 | Equações trigonométricas sen α = a, cos en α = a, tg α = a, redução ao 1º quadrante. | `mat-trigonometria` | `aula-trigonometria` | `Equações trigonométricas sen α = a, cos en α = a, tg α = a, redução ao 1º quadrante.` | `q-mat-trigonometria-topico-9` |
| 11.1 | Produto escalar. | `mat-coordenadas-vetores-espaco` | `aula-mat-coordenadas-vetores-espaco` | `Produto escalar.` | `q-mat-coordenadas-vetores-espaco-topico-16` |
| 11.2 | Perpendicularidade de vectores e rectas. Conjuntos definidos por condições. | `mat-coordenadas-vetores-espaco` | `aula-mat-coordenadas-vetores-espaco` | `Perpendicularidade de vectores e rectas. Conjuntos definidos por condições.` | `q-mat-coordenadas-vetores-espaco-topico-17` |
| 11.3 | Planos. Intersecção de planos e rectas no espaço. | `mat-coordenadas-vetores-espaco` | `aula-mat-coordenadas-vetores-espaco` | `Planos. Intersecção de planos e rectas no espaço.` | `q-mat-coordenadas-vetores-espaco-topico-18` |
| 12.1 | Sucessões. Sucessões monótonas e sucessões limitadas. | `mat-sucessoes` | `aula-sucessoes` | `Sucessões. Sucessões monótonas e sucessões limitadas.` | `q-mat-sucessoes-topico-11` |
| 12.2 | Progressões aritméticas e progressões geométricas. | `mat-sucessoes` | `aula-sucessoes` | `Progressões aritméticas e progressões geométricas.` | `q-mat-sucessoes-topico-12` |
| 12.3 | Progressão geométrica. Definições. | `mat-sucessoes` | `aula-sucessoes` | `Progressão geométrica. Definições.` | `q-mat-sucessoes-topico-13` |
| 13.1 | Limite de uma sucessão. | `mat-estatistica-inducao` | `aula-mat-estatistica-inducao` | `Limite de uma sucessão.` | `q-mat-estatistica-inducao-topico-9` |
| 13.2 | Cálculo de limite de sucessões. Número de Neper. | `mat-estatistica-inducao` | `aula-mat-estatistica-inducao` | `Cálculo de limite de sucessões. Número de Neper.` | `q-mat-estatistica-inducao-topico-10` |
| 13.3 | Indução matemática. | `mat-estatistica-inducao` | `aula-mat-estatistica-inducao` | `Indução matemática.` | `q-mat-estatistica-inducao-topico-11` |
| 14.1 | O objecto da estatística. Conceitos básicos. | `mat-estatistica-inducao` | `aula-mat-estatistica-inducao` | `O objecto da estatística. Conceitos básicos.` | `q-mat-estatistica-inducao-topico-12` |
| 14.2 | Organização e apresentação dos dados. | `mat-estatistica-inducao` | `aula-mat-estatistica-inducao` | `Organização e apresentação dos dados.` | `q-mat-estatistica-inducao-topico-13` |
| 14.3 | Medidas de localização. | `mat-estatistica-inducao` | `aula-mat-estatistica-inducao` | `Medidas de localização.` | `q-mat-estatistica-inducao-topico-14` |
| 14.4 | Medidas de dispersão. | `mat-estatistica-inducao` | `aula-mat-estatistica-inducao` | `Medidas de dispersão.` | `q-mat-estatistica-inducao-topico-15` |
| 14.5 | Distribuições binominais. | `mat-estatistica-inducao` | `aula-mat-estatistica-inducao` | `Distribuições binominais.` | `q-mat-estatistica-inducao-topico-16` |
| 15.1 | Funções racionais. | `mat-funcoes` | `aula-funcoes` | `Funções racionais.` | `q-mat-funcoes-topico-12` |
| 15.2 | Funções irracionais. | `mat-funcoes` | `aula-funcoes` | `Funções irracionais.` | `q-mat-funcoes-topico-13` |
| 15.3 | Operações com funções. Resolução de problemas envolvendo funções. | `mat-funcoes` | `aula-funcoes` | `Operações com funções. Resolução de problemas envolvendo funções.` | `q-mat-funcoes-topico-14` |
| 16.1 | Funções exponenciais e funções logarítmicas. | `mat-exp-log-trig` | `aula-mat-exp-log-trig` | `Funções exponenciais e funções logarítmicas.` | `q-mat-exp-log-trig-topico-7` |
| 16.2 | Funções logarítmicas. | `mat-exp-log-trig` | `aula-mat-exp-log-trig` | `Funções logarítmicas.` | `q-mat-exp-log-trig-topico-8` |
| 17.1 | Revisão de algumas noções trigonométricas já estudadas. | `mat-exp-log-trig` | `aula-mat-exp-log-trig` | `Revisão de algumas noções trigonométricas já estudadas.` | `q-mat-exp-log-trig-topico-9` |
| 17.2 | Funções trigonométricas. Equações trigonométricas. | `mat-exp-log-trig` | `aula-mat-exp-log-trig` | `Funções trigonométricas. Equações trigonométricas.` | `q-mat-exp-log-trig-topico-10` |
| 17.3 | Transformações de expressões trigonométricas. | `mat-exp-log-trig` | `aula-mat-exp-log-trig` | `Transformações de expressões trigonométricas.` | `q-mat-exp-log-trig-topico-11` |
| 18.1 | Limite de funções. | `mat-limites` | `aula-limites` | `Limite de funções.` | `q-mat-limites-topico-5` |
| 18.2 | Continuidade de uma função. | `mat-limites` | `aula-limites` | `Continuidade de uma função.` | `q-mat-limites-topico-6` |
| 19.1 | Introdução ao conceito de derivada. | `mat-derivadas` | `aula-derivadas` | `Introdução ao conceito de derivada.` | `q-mat-derivadas-topico-6` |
| 19.2 | Aplicações das derivadas. | `mat-derivadas` | `aula-derivadas` | `Aplicações das derivadas.` | `q-mat-derivadas-topico-7` |
| 20.1 | Noção de integral. | `mat-integrais` | `aula-integrais` | `Noção de integral.` | `q-mat-integrais-topico-8` |
| 20.2 | Primitivas de uma função. | `mat-integrais` | `aula-integrais` | `Primitivas de uma função.` | `q-mat-integrais-topico-9` |

## Física

| Ref. PDF | Texto exacto do subtema | Módulo LUANDA PREP | Aula | Sessão temática | Questão de treino |
| --- | --- | --- | --- | --- | --- |
| 1.1 | Conceito de trabalho mecânico. | `fis-energia-trabalho` | `aula-fis-energia-trabalho` | `Conceito de trabalho mecânico.` | `q-fis-energia-trabalho-topico-8` |
| 1.2 | Trabalho de uma força e de uma resultante de forças. Unidades de trabalho. | `fis-energia-trabalho` | `aula-fis-energia-trabalho` | `Trabalho de uma força e de uma resultante de forças. Unidades de trabalho.` | `q-fis-energia-trabalho-topico-9` |
| 1.3 | Potência. Unidades de potência. | `fis-energia-trabalho` | `aula-fis-energia-trabalho` | `Potência. Unidades de potência.` | `q-fis-energia-trabalho-topico-10` |
| 1.4 | Energia cinética de um corpo em movimento de translação. | `fis-energia-trabalho` | `aula-fis-energia-trabalho` | `Energia cinética de um corpo em movimento de translação.` | `q-fis-energia-trabalho-topico-11` |
| 1.5 | Energia potencial gravítica e energia potencial elástica. | `fis-energia-trabalho` | `aula-fis-energia-trabalho` | `Energia potencial gravítica e energia potencial elástica.` | `q-fis-energia-trabalho-topico-12` |
| 1.6 | Relação entre o trabalho e energias cinética, potencial gravítica e potencial elástica. | `fis-energia-trabalho` | `aula-fis-energia-trabalho` | `Relação entre o trabalho e energias cinética, potencial gravítica e potencial elástica.` | `q-fis-energia-trabalho-topico-13` |
| 2.1 | Energia mecânica. | `fis-energia-trabalho` | `aula-fis-energia-trabalho` | `Energia mecânica.` | `q-fis-energia-trabalho-topico-14` |
| 2.2 | Lei da conservação da energia mecânica. | `fis-energia-trabalho` | `aula-fis-energia-trabalho` | `Lei da conservação da energia mecânica.` | `q-fis-energia-trabalho-topico-15` |
| 2.3 | Forças conservativas e não conservativas. | `fis-energia-trabalho` | `aula-fis-energia-trabalho` | `Forças conservativas e não conservativas.` | `q-fis-energia-trabalho-topico-16` |
| 2.4 | Lei da conservação da energia mecânica. | `fis-energia-trabalho` | `aula-fis-energia-trabalho` | `Lei da conservação da energia mecânica.` | `q-fis-energia-trabalho-topico-15` |
| 2.5 | Choques elásticos e inelásticos. | `fis-energia-trabalho` | `aula-fis-energia-trabalho` | `Choques elásticos e inelásticos.` | `q-fis-energia-trabalho-topico-17` |
| 3.1 | Conceito de gás ideal. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Conceito de gás ideal.` | `q-fis-gases-termodinamica-topico-11` |
| 3.2 | Equação da pressão na Teoria cinética de gás ideal. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Equação da pressão na Teoria cinética de gás ideal.` | `q-fis-gases-termodinamica-topico-12` |
| 3.3 | Conceito da temperatura segundo a Teoria cinética. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Conceito da temperatura segundo a Teoria cinética.` | `q-fis-gases-termodinamica-topico-13` |
| 3.4 | Escala absoluta de temperatura. Escalas termométricas. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Escala absoluta de temperatura. Escalas termométricas.` | `q-fis-gases-termodinamica-topico-14` |
| 3.5 | Relação da temperatura com a velocidade das moléculas. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Relação da temperatura com a velocidade das moléculas.` | `q-fis-gases-termodinamica-topico-15` |
| 3.6 | Leis dos gases (leis de Boyle-Mariotte, de Charles e de Gay-Lussac). | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Leis dos gases (leis de Boyle-Mariotte, de Charles e de Gay-Lussac).` | `q-fis-gases-termodinamica-topico-16` |
| 3.7 | Equação de Clapeyron. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Equação de Clapeyron.` | `q-fis-gases-termodinamica-topico-17` |
| 3.8 | Aplicação da equação de estado de gás ideal aos isoprocessos. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Aplicação da equação de estado de gás ideal aos isoprocessos.` | `q-fis-gases-termodinamica-topico-18` |
| 3.9 | Representação e transformação gráfica dos processos: p-V, V-T e p- T. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Representação e transformação gráfica dos processos: p-V, V-T e p- T.` | `q-fis-gases-termodinamica-topico-19` |
| 4.1 | Conceito de Termodinâmica. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Conceito de Termodinâmica.` | `q-fis-gases-termodinamica-topico-20` |
| 4.2 | Trabalho na Termodinâmica. Trabalho nos isoprocessos. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Trabalho na Termodinâmica. Trabalho nos isoprocessos.` | `q-fis-gases-termodinamica-topico-21` |
| 4.3 | Quantidade de calor. Equivalência entre trabalho e quantidade de calor. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Quantidade de calor. Equivalência entre trabalho e quantidade de calor.` | `q-fis-gases-termodinamica-topico-22` |
| 4.4 | Energia interna. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Energia interna.` | `q-fis-gases-termodinamica-topico-23` |
| 5.1 | Processo adiabático. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Processo adiabático.` | `q-fis-gases-termodinamica-topico-24` |
| 5.2 | Primeira (1ª) lei da Termodinâmica. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Primeira (1ª) lei da Termodinâmica.` | `q-fis-gases-termodinamica-topico-25` |
| 5.3 | Aplicação da 1ª lei da Termodinâmica aos isoprocessos. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Aplicação da 1ª lei da Termodinâmica aos isoprocessos.` | `q-fis-gases-termodinamica-topico-26` |
| 5.4 | Processos reversíveis e irreversíveis . Segunda (2ª) lei da Termodinâmica, segundo Thompson. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Processos reversíveis e irreversíveis . Segunda (2ª) lei da Termodinâmica, segundo Thompson.` | `q-fis-gases-termodinamica-topico-27` |
| 5.5 | Motor térmico e refrigerador. Eficiência térmica. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Motor térmico e refrigerador. Eficiência térmica.` | `q-fis-gases-termodinamica-topico-28` |
| 5.6 | Ciclo de Carnot. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Ciclo de Carnot.` | `q-fis-gases-termodinamica-topico-29` |
| 5.7 | Entropia. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Entropia.` | `q-fis-gases-termodinamica-topico-30` |
| 5.8 | Lei Zero da Termodinâmica. | `fis-gases-termodinamica` | `aula-fis-gases-termodinamica` | `Lei Zero da Termodinâmica.` | `q-fis-gases-termodinamica-topico-31` |
| 6.1 | Conceito da corrente eléctrica. | `fis-corrente-redes` | `aula-fis-corrente-redes` | `Conceito da corrente eléctrica.` | `q-fis-corrente-redes-topico-9` |
| 6.2 | Intensidade da corrente eléctrica. | `fis-corrente-redes` | `aula-fis-corrente-redes` | `Intensidade da corrente eléctrica.` | `q-fis-corrente-redes-topico-10` |
| 6.3 | Resistência de um condutor. Resistividade de uma substância. Tensão nos seus extremos. | `fis-corrente-redes` | `aula-fis-corrente-redes` | `Resistência de um condutor. Resistividade de uma substância. Tensão nos seus extremos.` | `q-fis-corrente-redes-topico-11` |
| 6.4 | Lei de Ohm para um circuito completo. | `fis-corrente-redes` | `aula-fis-corrente-redes` | `Lei de Ohm para um circuito completo.` | `q-fis-corrente-redes-topico-12` |
| 6.5 | Potência dissipada. | `fis-corrente-redes` | `aula-fis-corrente-redes` | `Potência dissipada.` | `q-fis-corrente-redes-topico-13` |
| 7.1 | Associação de resistências. | `fis-corrente-redes` | `aula-fis-corrente-redes` | `Associação de resistências.` | `q-fis-corrente-redes-topico-14` |
| 7.2 | Leis de circuitos derivados. | `fis-corrente-redes` | `aula-fis-corrente-redes` | `Leis de circuitos derivados.` | `q-fis-corrente-redes-topico-15` |
| 7.3 | Leis de Kirchhoff (lei dos nodos e lei das malhas). | `fis-corrente-redes` | `aula-fis-corrente-redes` | `Leis de Kirchhoff (lei dos nodos e lei das malhas).` | `q-fis-corrente-redes-topico-16` |
| 7.4 | Aplicação das leis de Kirchhoff nas redes eléctricas. | `fis-corrente-redes` | `aula-fis-corrente-redes` | `Aplicação das leis de Kirchhoff nas redes eléctricas.` | `q-fis-corrente-redes-topico-17` |
| 8.1 | Generalidades sobre o movimento mecânico. | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Generalidades sobre o movimento mecânico.` | `q-fis-cinematica-newton-topico-10` |
| 8.2 | Movimento rectilíneo uniformemente variado. | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Movimento rectilíneo uniformemente variado.` | `q-fis-cinematica-newton-topico-11` |
| 8.3 | Movimento circular uniforme. | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Movimento circular uniforme.` | `q-fis-cinematica-newton-topico-12` |
| 8.4 | Velocidade linear e angular. Relação entre as velocidades linear e angular. | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Velocidade linear e angular. Relação entre as velocidades linear e angular.` | `q-fis-cinematica-newton-topico-13` |
| 8.5 | Aceleração centrípeta. Componentes tangencial e normal da aceleração centrípeta. | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Aceleração centrípeta. Componentes tangencial e normal da aceleração centrípeta.` | `q-fis-cinematica-newton-topico-14` |
| 8.6 | Período e frequência no movimento circular uniforme. | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Período e frequência no movimento circular uniforme.` | `q-fis-cinematica-newton-topico-15` |
| 8.7 | Movimento de queda livre. Aceleração de gravidade. | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Movimento de queda livre. Aceleração de gravidade.` | `q-fis-cinematica-newton-topico-16` |
| 8.8 | Movimento ascensional de um grave. | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Movimento ascensional de um grave.` | `q-fis-cinematica-newton-topico-17` |
| 8.9 | Movimento circular uniformemente variado. | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Movimento circular uniformemente variado.` | `q-fis-cinematica-newton-topico-18` |
| 9.1 | Lei da inércia (1ª lei de Newton). Sistemas inerciais. | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Lei da inércia (1ª lei de Newton). Sistemas inerciais.` | `q-fis-cinematica-newton-topico-19` |
| 9.2 | Quantidade de movimento de translação (momento linear). | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Quantidade de movimento de translação (momento linear).` | `q-fis-cinematica-newton-topico-20` |
| 9.3 | Variação do momento linear. Conceito de força. Impulso de uma força. Unidades. | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Variação do momento linear. Conceito de força. Impulso de uma força. Unidades.` | `q-fis-cinematica-newton-topico-21` |
| 9.4 | Lei fundamental da dinâmica (2ª lei de Newton). | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Lei fundamental da dinâmica (2ª lei de Newton).` | `q-fis-cinematica-newton-topico-22` |
| 9.5 | Lei da acção e reacção (3ª lei de Newton). | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Lei da acção e reacção (3ª lei de Newton).` | `q-fis-cinematica-newton-topico-23` |
| 9.6 | Lei da conservação do momento linear. | `fis-cinematica-newton` | `aula-fis-cinematica-newton` | `Lei da conservação do momento linear.` | `q-fis-cinematica-newton-topico-24` |
| 10.1 | Conceito do movimento oscilatório. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Conceito do movimento oscilatório.` | `q-fis-oscilacoes-ondas-luz-topico-10` |
| 10.2 | Movimento harmónico simples. As suas características. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Movimento harmónico simples. As suas características.` | `q-fis-oscilacoes-ondas-luz-topico-11` |
| 10.3 | Oscilações livres e oscilações amortecidas. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Oscilações livres e oscilações amortecidas.` | `q-fis-oscilacoes-ondas-luz-topico-12` |
| 10.4 | Oscilações forçadas. Ressonância. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Oscilações forçadas. Ressonância.` | `q-fis-oscilacoes-ondas-luz-topico-13` |
| 10.5 | Pêndulo simples. Sistema corpo-mola. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Pêndulo simples. Sistema corpo-mola.` | `q-fis-oscilacoes-ondas-luz-topico-14` |
| 10.6 | Energia de um oscilador harmónico simples. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Energia de um oscilador harmónico simples.` | `q-fis-oscilacoes-ondas-luz-topico-15` |
| 11.1 | Noção de onda. Características do movimento ondulatório. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Noção de onda. Características do movimento ondulatório.` | `q-fis-oscilacoes-ondas-luz-topico-16` |
| 11.2 | Classificação das ondas. Equação de onda progressiva. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Classificação das ondas. Equação de onda progressiva.` | `q-fis-oscilacoes-ondas-luz-topico-17` |
| 11.3 | Relação entre os parâmetros fundamentais na propagação das ondas. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Relação entre os parâmetros fundamentais na propagação das ondas.` | `q-fis-oscilacoes-ondas-luz-topico-18` |
| 11.4 | Reflexão e refracção das ondas. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Reflexão e refracção das ondas.` | `q-fis-oscilacoes-ondas-luz-topico-19` |
| 11.5 | Sobreposição de ondas. Interferência das ondas. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Sobreposição de ondas. Interferência das ondas.` | `q-fis-oscilacoes-ondas-luz-topico-20` |
| 11.6 | Difracção das ondas. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Difracção das ondas.` | `q-fis-oscilacoes-ondas-luz-topico-21` |
| 11.7 | Ondas estacionárias. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Ondas estacionárias.` | `q-fis-oscilacoes-ondas-luz-topico-22` |
| 12.1 | Natureza da luz. Características do movimento ondulatório. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Natureza da luz. Características do movimento ondulatório.` | `q-fis-oscilacoes-ondas-luz-topico-23` |
| 12.2 | Reflexão e refracção da luz. Leis da reflexão e índice de refracção. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Reflexão e refracção da luz. Leis da reflexão e índice de refracção.` | `q-fis-oscilacoes-ondas-luz-topico-24` |
| 12.3 | Reflexão total. Fibras ópticas. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Reflexão total. Fibras ópticas.` | `q-fis-oscilacoes-ondas-luz-topico-25` |
| 12.4 | Dispersão da luz. Absorção e difusão. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Dispersão da luz. Absorção e difusão.` | `q-fis-oscilacoes-ondas-luz-topico-26` |
| 12.5 | Lentes e as suas aplicações. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Lentes e as suas aplicações.` | `q-fis-oscilacoes-ondas-luz-topico-27` |
| 12.6 | Interferência da luz. Interferência nas lâminas finas. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Interferência da luz. Interferência nas lâminas finas.` | `q-fis-oscilacoes-ondas-luz-topico-28` |
| 12.7 | Difracção. Redes de difracção. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Difracção. Redes de difracção.` | `q-fis-oscilacoes-ondas-luz-topico-29` |
| 12.8 | Efeito Doppler. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Efeito Doppler.` | `q-fis-oscilacoes-ondas-luz-topico-30` |
| 12.9 | Polarização da luz. Caracter electromagnético da luz. | `fis-oscilacoes-ondas-luz` | `aula-fis-oscilacoes-ondas-luz` | `Polarização da luz. Caracter electromagnético da luz.` | `q-fis-oscilacoes-ondas-luz-topico-31` |
| 13.1 | Movimento curvilíneo de uma partícula actuada por uma força constante. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Movimento curvilíneo de uma partícula actuada por uma força constante.` | `q-fis-dinamica-fluidos-topico-9` |
| 13.2 | Movimento de um projéctil. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Movimento de um projéctil.` | `q-fis-dinamica-fluidos-topico-10` |
| 13.3 | Componentes normal e tangencial do vector aceleração. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Componentes normal e tangencial do vector aceleração.` | `q-fis-dinamica-fluidos-topico-11` |
| 13.4 | Movimento relativo. Princípio de relatividade de Galileu. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Movimento relativo. Princípio de relatividade de Galileu.` | `q-fis-dinamica-fluidos-topico-12` |
| 13.5 | Movimento de uma partícula material sujeita a forças de atrito. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Movimento de uma partícula material sujeita a forças de atrito.` | `q-fis-dinamica-fluidos-topico-13` |
| 14.1 | Centro de massa de um sistema de partículas. O seu movimento. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Centro de massa de um sistema de partículas. O seu movimento.` | `q-fis-dinamica-fluidos-topico-14` |
| 14.2 | Lei fundamental de Newton para um sistema de partículas. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Lei fundamental de Newton para um sistema de partículas.` | `q-fis-dinamica-fluidos-topico-15` |
| 14.3 | Conservação do momento linear de um sistema de partículas. Aplicações. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Conservação do momento linear de um sistema de partículas. Aplicações.` | `q-fis-dinamica-fluidos-topico-16` |
| 14.4 | Momento angular de um sistema de partículas. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Momento angular de um sistema de partículas.` | `q-fis-dinamica-fluidos-topico-17` |
| 14.5 | Variação do momento angular. Momento de uma força. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Variação do momento angular. Momento de uma força.` | `q-fis-dinamica-fluidos-topico-18` |
| 14.6 | Momento angular de um corpo rígido móvel em torno de um eixo fixo em relação a um referencial inercial. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Momento angular de um corpo rígido móvel em torno de um eixo fixo em relação a um referencial inercial.` | `q-fis-dinamica-fluidos-topico-19` |
| 14.6 | Lei da conservação do momento angular. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Lei da conservação do momento angular.` | `q-fis-dinamica-fluidos-topico-20` |
| 15.1 | Pressão nos fluidos. Lei fundamental da Hidrostática. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Pressão nos fluidos. Lei fundamental da Hidrostática.` | `q-fis-dinamica-fluidos-topico-21` |
| 15.2 | Lei de Arquimedes. Equilíbrio de corpos flutuantes. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Lei de Arquimedes. Equilíbrio de corpos flutuantes.` | `q-fis-dinamica-fluidos-topico-22` |
| 15.3 | Equação de Bernoulli. | `fis-dinamica-fluidos` | `aula-fis-dinamica-fluidos` | `Equação de Bernoulli.` | `q-fis-dinamica-fluidos-topico-23` |
| 16.1 | Vector de campo magnético B. | `fis-magnetismo-inducao` | `aula-fis-magnetismo-inducao` | `Vector de campo magnético B.` | `q-fis-magnetismo-inducao-topico-11` |
| 16.2 | Espetros de campos magnéticos (íman, dipolo, condutor de corrente, bobina e solenoide). | `fis-magnetismo-inducao` | `aula-fis-magnetismo-inducao` | `Espetros de campos magnéticos (íman, dipolo, condutor de corrente, bobina e solenoide).` | `q-fis-magnetismo-inducao-topico-12` |
| 16.3 | Regras para a determinação do sentido do campo magnético. | `fis-magnetismo-inducao` | `aula-fis-magnetismo-inducao` | `Regras para a determinação do sentido do campo magnético.` | `q-fis-magnetismo-inducao-topico-13` |
| 16.4 | Acção de um campo magnético sobre um elemento de corrente estacionária e sobre uma carga eléctrica em movimento. | `fis-magnetismo-inducao` | `aula-fis-magnetismo-inducao` | `Acção de um campo magnético sobre um elemento de corrente estacionária e sobre uma carga eléctrica em movimento.` | `q-fis-magnetismo-inducao-topico-14` |
| 16.5 | Movimento de cargas eléctricas num campo magnético. | `fis-magnetismo-inducao` | `aula-fis-magnetismo-inducao` | `Movimento de cargas eléctricas num campo magnético.` | `q-fis-magnetismo-inducao-topico-15` |
| 16.6 | Movimento de cargas eléctricas sob acção simultânea de um campo eléctrico e de um campo magnético. | `fis-magnetismo-inducao` | `aula-fis-magnetismo-inducao` | `Movimento de cargas eléctricas sob acção simultânea de um campo eléctrico e de um campo magnético.` | `q-fis-magnetismo-inducao-topico-16` |
| 16.7 | Campo magnético de uma corrente rectilínea. | `fis-magnetismo-inducao` | `aula-fis-magnetismo-inducao` | `Campo magnético de uma corrente rectilínea.` | `q-fis-magnetismo-inducao-topico-17` |
| 16.8 | Interacção entre correntes eléctricas paralelas. | `fis-magnetismo-inducao` | `aula-fis-magnetismo-inducao` | `Interacção entre correntes eléctricas paralelas.` | `q-fis-magnetismo-inducao-topico-18` |
| 17.1 | Fluxo magnético. Lei de indução electromagnética. Sentido da corrente induzida. Lei de Lenz. | `fis-magnetismo-inducao` | `aula-fis-magnetismo-inducao` | `Fluxo magnético. Lei de indução electromagnética. Sentido da corrente induzida. Lei de Lenz.` | `q-fis-magnetismo-inducao-topico-19` |
| 17.2 | Autoindução. Indução mútua. | `fis-magnetismo-inducao` | `aula-fis-magnetismo-inducao` | `Autoindução. Indução mútua.` | `q-fis-magnetismo-inducao-topico-20` |
| 17.3 | Correntes de Foucault. Bobina de indução. | `fis-magnetismo-inducao` | `aula-fis-magnetismo-inducao` | `Correntes de Foucault. Bobina de indução.` | `q-fis-magnetismo-inducao-topico-21` |
| 17.4 | Transformadores estáticos. Geradores e motores. | `fis-magnetismo-inducao` | `aula-fis-magnetismo-inducao` | `Transformadores estáticos. Geradores e motores.` | `q-fis-magnetismo-inducao-topico-22` |
| 18.1 | Produção da corrente alternada sinusoidal. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Produção da corrente alternada sinusoidal.` | `q-fis-ca-ondas-em-topico-11` |
| 18.2 | Efeitos da corrente alternada de baixa frequência. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Efeitos da corrente alternada de baixa frequência.` | `q-fis-ca-ondas-em-topico-12` |
| 18.3 | Intensidade e diferença de potencial eficaz. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Intensidade e diferença de potencial eficaz.` | `q-fis-ca-ondas-em-topico-13` |
| 18.4 | Circuitos em corrente alternada. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Circuitos em corrente alternada.` | `q-fis-ca-ondas-em-topico-14` |
| 18.5 | Diferença de fase entre a intensidade da corrente e a diferença de potencial em circuitos de corrente alternada. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Diferença de fase entre a intensidade da corrente e a diferença de potencial em circuitos de corrente alternada.` | `q-fis-ca-ondas-em-topico-15` |
| 18.6 | Impedância. Lei de Ohm em corrente alternada (RL, RC, RLC). | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Impedância. Lei de Ohm em corrente alternada (RL, RC, RLC).` | `q-fis-ca-ondas-em-topico-16` |
| 19.1 | Transformação de energia num circuito oscilante fechado. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Transformação de energia num circuito oscilante fechado.` | `q-fis-ca-ondas-em-topico-17` |
| 19.2 | Frequência de oscilações próprias. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Frequência de oscilações próprias.` | `q-fis-ca-ondas-em-topico-18` |
| 19.3 | Oscilações electromagnéticas amortecidas. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Oscilações electromagnéticas amortecidas.` | `q-fis-ca-ondas-em-topico-19` |
| 19.4 | Ressonância eléctrica. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Ressonância eléctrica.` | `q-fis-ca-ondas-em-topico-20` |
| 19.5 | Obtenção de oscilações não-amortecidas com o auxílio de gerador de válvula. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Obtenção de oscilações não-amortecidas com o auxílio de gerador de válvula.` | `q-fis-ca-ondas-em-topico-21` |
| 19.6 | Correntes de altas frequências e a sua aplicação. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Correntes de altas frequências e a sua aplicação.` | `q-fis-ca-ondas-em-topico-22` |
| 19.7 | Circuito oscilante aberto. Radiação. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Circuito oscilante aberto. Radiação.` | `q-fis-ca-ondas-em-topico-23` |
| 20.1 | Propagação de ondas electromagnéticas. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Propagação de ondas electromagnéticas.` | `q-fis-ca-ondas-em-topico-24` |
| 20.2 | Campos eléctricos e magnéticos associados à onda electromagnética. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Campos eléctricos e magnéticos associados à onda electromagnética.` | `q-fis-ca-ondas-em-topico-25` |
| 20.3 | Micro-ondas. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Micro-ondas.` | `q-fis-ca-ondas-em-topico-26` |
| 20.4 | Hipótese de Maxwell. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Hipótese de Maxwell.` | `q-fis-ca-ondas-em-topico-27` |
| 20.5 | Experiência de Hertz. Comunicação radiofónica. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Experiência de Hertz. Comunicação radiofónica.` | `q-fis-ca-ondas-em-topico-28` |
| 20.6 | Espectro electromagnético. Espectro óptico. | `fis-ca-ondas-em` | `aula-fis-ca-ondas-em` | `Espectro electromagnético. Espectro óptico.` | `q-fis-ca-ondas-em-topico-29` |

## Química

| Ref. PDF | Texto exacto do subtema | Módulo LUANDA PREP | Aula | Sessão temática | Questão de treino |
| --- | --- | --- | --- | --- | --- |
| 1.1 | Significado de equação química. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Significado de equação química.` | `q-qui-equacoes-cinetica-equilibrio-topico-8` |
| 1.2 | Apresentação das equações químicas. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Apresentação das equações químicas.` | `q-qui-equacoes-cinetica-equilibrio-topico-9` |
| 1.3 | Reacções completas e reacções incompletas. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Reacções completas e reacções incompletas.` | `q-qui-equacoes-cinetica-equilibrio-topico-10` |
| 1.4 | Cálculos baseados nas equações químicas. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Cálculos baseados nas equações químicas.` | `q-qui-equacoes-cinetica-equilibrio-topico-11` |
| 1.5 | A análise química. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `A análise química.` | `q-qui-equacoes-cinetica-equilibrio-topico-12` |
| 2.1 | Avaliação da rapidez de uma reacção química. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Avaliação da rapidez de uma reacção química.` | `q-qui-equacoes-cinetica-equilibrio-topico-13` |
| 2.2 | Efeito da concentração dos reagentes. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Efeito da concentração dos reagentes.` | `q-qui-equacoes-cinetica-equilibrio-topico-14` |
| 2.3 | Reacções químicas a nível molecular. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Reacções químicas a nível molecular.` | `q-qui-equacoes-cinetica-equilibrio-topico-15` |
| 2.4 | Outros factores que influenciam a velocidade de uma reacção. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Outros factores que influenciam a velocidade de uma reacção.` | `q-qui-equacoes-cinetica-equilibrio-topico-16` |
| 3.1 | Introdução. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Introdução.` | `q-qui-equacoes-cinetica-equilibrio-topico-17` |
| 3.2 | Reversibilidade das transformações e químicas. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Reversibilidade das transformações e químicas.` | `q-qui-equacoes-cinetica-equilibrio-topico-18` |
| 3.3 | Noção de sistema. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Noção de sistema.` | `q-qui-equacoes-cinetica-equilibrio-topico-19` |
| 3.4 | Equilíbrio em sistemas homogêneos. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Equilíbrio em sistemas homogêneos.` | `q-qui-equacoes-cinetica-equilibrio-topico-20` |
| 3.5 | Factores que afectam o estado de equilíbrio de um sistema. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Factores que afectam o estado de equilíbrio de um sistema.` | `q-qui-equacoes-cinetica-equilibrio-topico-21` |
| 3.6 | Aplicações práticas do princípio de le Chantilier. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Aplicações práticas do princípio de le Chantilier.` | `q-qui-equacoes-cinetica-equilibrio-topico-22` |
| 3.7 | Equilíbrio em sistemas heterogéneos. | `qui-equacoes-cinetica-equilibrio` | `aula-qui-equacoes-cinetica-equilibrio` | `Equilíbrio em sistemas heterogéneos.` | `q-qui-equacoes-cinetica-equilibrio-topico-23` |
| 4.1 | Ácidos em solução aquosa. | `qui-acidos-bases` | `aula-qui-acidos-bases` | `Ácidos em solução aquosa.` | `q-qui-acidos-bases-topico-8` |
| 4.2 | pH de uma solução. Relação com a concentração do ião H+. | `qui-acidos-bases` | `aula-qui-acidos-bases` | `pH de uma solução. Relação com a concentração do ião H+.` | `q-qui-acidos-bases-topico-9` |
| 4.3 | Dissociação completa e incompleta. | `qui-acidos-bases` | `aula-qui-acidos-bases` | `Dissociação completa e incompleta.` | `q-qui-acidos-bases-topico-10` |
| 4.4 | Caracterização qualitativa do equilíbrio. | `qui-acidos-bases` | `aula-qui-acidos-bases` | `Caracterização qualitativa do equilíbrio.` | `q-qui-acidos-bases-topico-11` |
| 5.1 | Ácidos polipróticos e os seus sais. | `qui-acidos-bases` | `aula-qui-acidos-bases` | `Ácidos polipróticos e os seus sais.` | `q-qui-acidos-bases-topico-12` |
| 5.2 | Comportamento ácido ou básico de soluções de alguns sais. | `qui-acidos-bases` | `aula-qui-acidos-bases` | `Comportamento ácido ou básico de soluções de alguns sais.` | `q-qui-acidos-bases-topico-13` |
| 5.3 | Os hidróxidos solúveis. | `qui-acidos-bases` | `aula-qui-acidos-bases` | `Os hidróxidos solúveis.` | `q-qui-acidos-bases-topico-14` |
| 5.4 | Reacções de neutralização. | `qui-acidos-bases` | `aula-qui-acidos-bases` | `Reacções de neutralização.` | `q-qui-acidos-bases-topico-15` |
| 6.1 | O modelo atómico do Bohr. | `qui-atomo-ligacoes` | `aula-qui-atomo-ligacoes` | `O modelo atómico do Bohr.` | `q-qui-atomo-ligacoes-topico-8` |
| 6.2 | A Mecânica Quântica e a estrutura electrónica dos átomos. | `qui-atomo-ligacoes` | `aula-qui-atomo-ligacoes` | `A Mecânica Quântica e a estrutura electrónica dos átomos.` | `q-qui-atomo-ligacoes-topico-9` |
| 6.3 | Átomos polielectrónicos. | `qui-atomo-ligacoes` | `aula-qui-atomo-ligacoes` | `Átomos polielectrónicos.` | `q-qui-atomo-ligacoes-topico-10` |
| 6.4 | Espetro de emissão de hidrogénio. | `qui-atomo-ligacoes` | `aula-qui-atomo-ligacoes` | `Espetro de emissão de hidrogénio.` | `q-qui-atomo-ligacoes-topico-11` |
| 6.5 | Energia de ionização. | `qui-atomo-ligacoes` | `aula-qui-atomo-ligacoes` | `Energia de ionização.` | `q-qui-atomo-ligacoes-topico-12` |
| 6.6 | Distribuição electrónica de alguns átomos e dos respectivos iões. | `qui-atomo-ligacoes` | `aula-qui-atomo-ligacoes` | `Distribuição electrónica de alguns átomos e dos respectivos iões.` | `q-qui-atomo-ligacoes-topico-13` |
| 6.7 | Energia de ionização e tabela periódica. | `qui-atomo-ligacoes` | `aula-qui-atomo-ligacoes` | `Energia de ionização e tabela periódica.` | `q-qui-atomo-ligacoes-topico-14` |
| 7.1 | Ligações químicas em moléculas diatómicas. | `qui-atomo-ligacoes` | `aula-qui-atomo-ligacoes` | `Ligações químicas em moléculas diatómicas.` | `q-qui-atomo-ligacoes-topico-15` |
| 7.2 | Ligações químicas em moléculas poliatómicas. | `qui-atomo-ligacoes` | `aula-qui-atomo-ligacoes` | `Ligações químicas em moléculas poliatómicas.` | `q-qui-atomo-ligacoes-topico-16` |
| 8.1 | O que é uma reacção de oxidação e redução. | `qui-eletroquimica-coordenacao` | `aula-qui-eletroquimica-coordenacao` | `O que é uma reacção de oxidação e redução.` | `q-qui-eletroquimica-coordenacao-topico-9` |
| 8.2 | Acerto de equação redox. | `qui-eletroquimica-coordenacao` | `aula-qui-eletroquimica-coordenacao` | `Acerto de equação redox.` | `q-qui-eletroquimica-coordenacao-topico-10` |
| 8.3 | Pilhas electroquímicas. | `qui-eletroquimica-coordenacao` | `aula-qui-eletroquimica-coordenacao` | `Pilhas electroquímicas.` | `q-qui-eletroquimica-coordenacao-topico-11` |
| 8.4 | A electrólise. | `qui-eletroquimica-coordenacao` | `aula-qui-eletroquimica-coordenacao` | `A electrólise.` | `q-qui-eletroquimica-coordenacao-topico-12` |
| 9.1 | Compostos e iões complexos. Importância. Definição. Diferença entre sais e compostos. | `qui-eletroquimica-coordenacao` | `aula-qui-eletroquimica-coordenacao` | `Compostos e iões complexos. Importância. Definição. Diferença entre sais e compostos.` | `q-qui-eletroquimica-coordenacao-topico-13` |
| 9.2 | Teoria de coordenação de Werner. | `qui-eletroquimica-coordenacao` | `aula-qui-eletroquimica-coordenacao` | `Teoria de coordenação de Werner.` | `q-qui-eletroquimica-coordenacao-topico-14` |
| 9.3 | Definição de ião central, ligante, esfera interna e externa, nº de coordenação, carga de ião complexo. | `qui-eletroquimica-coordenacao` | `aula-qui-eletroquimica-coordenacao` | `Definição de ião central, ligante, esfera interna e externa, nº de coordenação, carga de ião complexo.` | `q-qui-eletroquimica-coordenacao-topico-15` |
| 9.4 | Nomenclatura dos compostos de coordenação. | `qui-eletroquimica-coordenacao` | `aula-qui-eletroquimica-coordenacao` | `Nomenclatura dos compostos de coordenação.` | `q-qui-eletroquimica-coordenacao-topico-16` |
| 9.5 | Geometria dos iões complexos, de coordenação 2, 4 e 6. | `qui-eletroquimica-coordenacao` | `aula-qui-eletroquimica-coordenacao` | `Geometria dos iões complexos, de coordenação 2, 4 e 6.` | `q-qui-eletroquimica-coordenacao-topico-17` |
| 9.6 | Dissociação electrolítica. Constante de formação ou de estabilidade dos iões complexos. | `qui-eletroquimica-coordenacao` | `aula-qui-eletroquimica-coordenacao` | `Dissociação electrolítica. Constante de formação ou de estabilidade dos iões complexos.` | `q-qui-eletroquimica-coordenacao-topico-18` |
| 9.7 | Importância e aplicação dos compostos de coordenação. | `qui-eletroquimica-coordenacao` | `aula-qui-eletroquimica-coordenacao` | `Importância e aplicação dos compostos de coordenação.` | `q-qui-eletroquimica-coordenacao-topico-19` |
| 10.1 | Características gerais dos elementos do grupo. | `qui-carbono-organica` | `aula-qui-carbono-organica` | `Características gerais dos elementos do grupo.` | `q-qui-carbono-organica-topico-7` |
| 10.2 | O carbono. | `qui-carbono-organica` | `aula-qui-carbono-organica` | `O carbono.` | `q-qui-carbono-organica-topico-8` |
| 10.3 | O silício. | `qui-carbono-organica` | `aula-qui-carbono-organica` | `O silício.` | `q-qui-carbono-organica-topico-9` |
| 10.4 | Indústria do vidro e do cimento. | `qui-carbono-organica` | `aula-qui-carbono-organica` | `Indústria do vidro e do cimento.` | `q-qui-carbono-organica-topico-10` |
| 11.1 | Introdução. | `qui-carbono-organica` | `aula-qui-carbono-organica` | `Introdução.` | `q-qui-carbono-organica-topico-11` |
| 11.2 | Os hidrocarbonetos. | `qui-carbono-organica` | `aula-qui-carbono-organica` | `Os hidrocarbonetos.` | `q-qui-carbono-organica-topico-12` |
| 11.3 | Outros compostos orgânicos. | `qui-carbono-organica` | `aula-qui-carbono-organica` | `Outros compostos orgânicos.` | `q-qui-carbono-organica-topico-13` |
| 12.1 | Os álcoois. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Os álcoois.` | `q-qui-funcoes-reacoes-organicas-topico-12` |
| 12.2 | Aldeídos e cetonas. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Aldeídos e cetonas.` | `q-qui-funcoes-reacoes-organicas-topico-13` |
| 12.3 | Ácidos carboxílicos. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Ácidos carboxílicos.` | `q-qui-funcoes-reacoes-organicas-topico-14` |
| 12.4 | Éteres. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Éteres.` | `q-qui-funcoes-reacoes-organicas-topico-15` |
| 12.5 | Ésteres. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Ésteres.` | `q-qui-funcoes-reacoes-organicas-topico-16` |
| 12.6 | As aminas. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `As aminas.` | `q-qui-funcoes-reacoes-organicas-topico-17` |
| 12.7 | Amidas. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Amidas.` | `q-qui-funcoes-reacoes-organicas-topico-18` |
| 13.1 | Introdução. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Introdução.` | `q-qui-funcoes-reacoes-organicas-topico-19` |
| 13.2 | Oxidação. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Oxidação.` | `q-qui-funcoes-reacoes-organicas-topico-20` |
| 13.3 | Reacções de substituição, mecanismo. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Reacções de substituição, mecanismo.` | `q-qui-funcoes-reacoes-organicas-topico-21` |
| 13.4 | Adição a compostos insaturados, mecanismo. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Adição a compostos insaturados, mecanismo.` | `q-qui-funcoes-reacoes-organicas-topico-22` |
| 13.5 | Esterificação. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Esterificação.` | `q-qui-funcoes-reacoes-organicas-topico-23` |
| 13.6 | Hidrólise. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Hidrólise.` | `q-qui-funcoes-reacoes-organicas-topico-24` |
| 13.7 | Polímeros. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Polímeros.` | `q-qui-funcoes-reacoes-organicas-topico-25` |
| 14.1 | As biomoléculas. | `qui-biomoleculas-solucoes` | `aula-qui-biomoleculas-solucoes` | `As biomoléculas.` | `q-qui-biomoleculas-solucoes-topico-9` |
| 14.2 | Os aminoácidos. | `qui-biomoleculas-solucoes` | `aula-qui-biomoleculas-solucoes` | `Os aminoácidos.` | `q-qui-biomoleculas-solucoes-topico-10` |
| 14.3 | As proteínas. | `qui-biomoleculas-solucoes` | `aula-qui-biomoleculas-solucoes` | `As proteínas.` | `q-qui-biomoleculas-solucoes-topico-11` |
| 14.4 | Os glícidos. | `qui-biomoleculas-solucoes` | `aula-qui-biomoleculas-solucoes` | `Os glícidos.` | `q-qui-biomoleculas-solucoes-topico-12` |
| 13.5 | Os lípidos. | `qui-funcoes-reacoes-organicas` | `aula-qui-funcoes-reacoes-organicas` | `Os lípidos.` | `q-qui-funcoes-reacoes-organicas-topico-26` |
| 15.1 | As forças intermoleculares. | `qui-biomoleculas-solucoes` | `aula-qui-biomoleculas-solucoes` | `As forças intermoleculares.` | `q-qui-biomoleculas-solucoes-topico-13` |
| 15.2 | Tipos de forças intermoleculares. | `qui-biomoleculas-solucoes` | `aula-qui-biomoleculas-solucoes` | `Tipos de forças intermoleculares.` | `q-qui-biomoleculas-solucoes-topico-14` |
| 15.3 | Moléculas no estado gasoso. | `qui-biomoleculas-solucoes` | `aula-qui-biomoleculas-solucoes` | `Moléculas no estado gasoso.` | `q-qui-biomoleculas-solucoes-topico-15` |
| 15.4 | O equilíbrio líquido-vapor. | `qui-biomoleculas-solucoes` | `aula-qui-biomoleculas-solucoes` | `O equilíbrio líquido-vapor.` | `q-qui-biomoleculas-solucoes-topico-16` |
| 15.5 | Propriedades coligativas de soluções. | `qui-biomoleculas-solucoes` | `aula-qui-biomoleculas-solucoes` | `Propriedades coligativas de soluções.` | `q-qui-biomoleculas-solucoes-topico-17` |

## Desenho e Geometria Descritiva

| Ref. PDF | Texto exacto do subtema | Módulo LUANDA PREP | Aula | Sessão temática | Questão de treino |
| --- | --- | --- | --- | --- | --- |
| 1.1 | Geometria descritiva. | `geo-projecoes` | `aula-geo-projecoes` | `Geometria descritiva.` | `q-geo-projecoes-topico-5` |
| 1.2 | Variações num sistema de projecções. | `geo-projecoes` | `aula-geo-projecoes` | `Variações num sistema de projecções.` | `q-geo-projecoes-topico-6` |
| 1.3 | Sistema de múltipla projecção ortogonal. | `geo-projecoes` | `aula-geo-projecoes` | `Sistema de múltipla projecção ortogonal.` | `q-geo-projecoes-topico-7` |
| 1.4 | Sistemas de projecções axonométricas. | `geo-projecoes` | `aula-geo-projecoes` | `Sistemas de projecções axonométricas.` | `q-geo-projecoes-topico-8` |
| 2.1 | Organização do espaço. | `geo-dupla-projecao` | `aula-geo-dupla-projecao` | `Organização do espaço.` | `q-geo-dupla-projecao-topico-8` |
| 2.2 | Representação do ponto. | `geo-dupla-projecao` | `aula-geo-dupla-projecao` | `Representação do ponto.` | `q-geo-dupla-projecao-topico-9` |
| 2.3 | Representação da recta. | `geo-dupla-projecao` | `aula-geo-dupla-projecao` | `Representação da recta.` | `q-geo-dupla-projecao-topico-10` |
| 2.4 | Visibilidade e invisibilidade da recta. | `geo-dupla-projecao` | `aula-geo-dupla-projecao` | `Visibilidade e invisibilidade da recta.` | `q-geo-dupla-projecao-topico-11` |
| 2.5 | Posição relativa de duas rectas. | `geo-dupla-projecao` | `aula-geo-dupla-projecao` | `Posição relativa de duas rectas.` | `q-geo-dupla-projecao-topico-12` |
| 2.6 | Representação do plano. | `geo-dupla-projecao` | `aula-geo-dupla-projecao` | `Representação do plano.` | `q-geo-dupla-projecao-topico-13` |
| 2.7 | Intersecções de rectas com planos. | `geo-dupla-projecao` | `aula-geo-dupla-projecao` | `Intersecções de rectas com planos.` | `q-geo-dupla-projecao-topico-14` |
| 2.8 | Representação de figuras planas situadas nos planos de projecções ou em planos paralelos a este. | `geo-dupla-projecao` | `aula-geo-dupla-projecao` | `Representação de figuras planas situadas nos planos de projecções ou em planos paralelos a este.` | `q-geo-dupla-projecao-topico-15` |
| 2.9 | Representação de poliedros rectos ou oblíquos (paralelepípedos, prismas e pirâmides) com bases situadas nos planos de projecção ou em planos paralelos a estes. | `geo-dupla-projecao` | `aula-geo-dupla-projecao` | `Representação de poliedros rectos ou oblíquos (paralelepípedos, prismas e pirâmides) com bases situadas nos planos de projecção ou em planos paralelos a estes.` | `q-geo-dupla-projecao-topico-16` |
| 2.10 | Representação de cones e cilindros de revolução com base(s) situada(s) nos planos de projecção ou em planos paralelos a estes. | `geo-dupla-projecao` | `aula-geo-dupla-projecao` | `Representação de cones e cilindros de revolução com base(s) situada(s) nos planos de projecção ou em planos paralelos a estes.` | `q-geo-dupla-projecao-topico-17` |
| 2.11 | Representação de cones e cilindros oblíquos com base(s) situada(s) nos planos de projecção ou em planos paralelos a estes. | `geo-dupla-projecao` | `aula-geo-dupla-projecao` | `Representação de cones e cilindros oblíquos com base(s) situada(s) nos planos de projecção ou em planos paralelos a estes.` | `q-geo-dupla-projecao-topico-18` |
| 3.1 | Generalidades. | `geo-metodos-metricos` | `aula-geo-metodos-metricos` | `Generalidades.` | `q-geo-metodos-metricos-topico-5` |
| 3.2 | Estrutura comparada dos métodos auxiliares. | `geo-metodos-metricos` | `aula-geo-metodos-metricos` | `Estrutura comparada dos métodos auxiliares.` | `q-geo-metodos-metricos-topico-6` |
| 3.3 | Métodos de mudança dos planos de projecção. | `geo-metodos-metricos` | `aula-geo-metodos-metricos` | `Métodos de mudança dos planos de projecção.` | `q-geo-metodos-metricos-topico-7` |
| 3.4 | Métodos de rotação. | `geo-metodos-metricos` | `aula-geo-metodos-metricos` | `Métodos de rotação.` | `q-geo-metodos-metricos-topico-8` |
| 3.5 | Métodos de rebatimentos. | `geo-metodos-metricos` | `aula-geo-metodos-metricos` | `Métodos de rebatimentos.` | `q-geo-metodos-metricos-topico-9` |
| 4.1 | Representação de figuras geométricas planas situadas em planos não paralelos aos planos de projecção. | `geo-formas-solidos` | `aula-geo-formas-solidos` | `Representação de figuras geométricas planas situadas em planos não paralelos aos planos de projecção.` | `q-geo-formas-solidos-topico-7` |
| 4.1.1 | Métodos de rebatimento. | `geo-formas-solidos` | `aula-geo-formas-solidos` | `Métodos de rebatimento.` | `q-geo-formas-solidos-topico-8` |
| 4.1.2 | Método de mudança dos planos de projecção. | `geo-formas-solidos` | `aula-geo-formas-solidos` | `Método de mudança dos planos de projecção.` | `q-geo-formas-solidos-topico-9` |
| 4.1.3 | Circunferências existentes em planos verticais. | `geo-formas-solidos` | `aula-geo-formas-solidos` | `Circunferências existentes em planos verticais.` | `q-geo-formas-solidos-topico-10` |
| 4.2 | Representação de sólidos rectos com base nos planos paralelos aos planos de posição. | `geo-formas-solidos` | `aula-geo-formas-solidos` | `Representação de sólidos rectos com base nos planos paralelos aos planos de posição.` | `q-geo-formas-solidos-topico-11` |
| 4.2.1 | Poliedros assentes em planos de topo e verticais. | `geo-formas-solidos` | `aula-geo-formas-solidos` | `Poliedros assentes em planos de topo e verticais.` | `q-geo-formas-solidos-topico-12` |
| 4.2.2 | Sólidos com bases assentes em planos de topo. | `geo-formas-solidos` | `aula-geo-formas-solidos` | `Sólidos com bases assentes em planos de topo.` | `q-geo-formas-solidos-topico-13` |
| 4.2.3 | Sólidos com bases assentes em planos de perfil. | `geo-formas-solidos` | `aula-geo-formas-solidos` | `Sólidos com bases assentes em planos de perfil.` | `q-geo-formas-solidos-topico-14` |

## Língua Portuguesa

| Ref. PDF | Texto exacto do subtema | Módulo LUANDA PREP | Aula | Sessão temática | Questão de treino |
| --- | --- | --- | --- | --- | --- |
| PT.1 | Constituintes da frase. | `pt-sintaxe-regencia-discurso` | `aula-pt-sintaxe-regencia-discurso` | `Constituintes da frase.` | `q-pt-sintaxe-regencia-discurso-topico-8` |
| PT.2 | Tempos e modos verbais. | `pt-gramatica` | `aula-gramatica` | `Tempos e modos verbais.` | `q-pt-gramatica-topico-4` |
| PT.3 | Pronominalização. | `pt-sintaxe-regencia-discurso` | `aula-pt-sintaxe-regencia-discurso` | `Pronominalização.` | `q-pt-sintaxe-regencia-discurso-topico-9` |
| PT.4 | Frase. | `pt-frases` | `aula-frases` | `Frase.` | `q-pt-frases-topico-4` |
| PT.5 | Regência nominal e verbal. | `pt-sintaxe-regencia-discurso` | `aula-pt-sintaxe-regencia-discurso` | `Regência nominal e verbal.` | `q-pt-sintaxe-regencia-discurso-topico-10` |
| PT.6 | Relações lexicais: sinonímia, antonímia, homofonia, homografia e paronímia. | `pt-palavras` | `aula-palavras` | `Relações lexicais: sinonímia, antonímia, homofonia, homografia e paronímia.` | `q-pt-palavras-topico-4` |
| PT.7 | Pontuação. | `pt-gramatica` | `aula-gramatica` | `Pontuação.` | `q-pt-gramatica-topico-5` |
| PT.8 | Acentuação. | `pt-gramatica` | `aula-gramatica` | `Acentuação.` | `q-pt-gramatica-topico-6` |
| PT.9 | Classificação das orações. | `pt-sintaxe-regencia-discurso` | `aula-pt-sintaxe-regencia-discurso` | `Classificação das orações.` | `q-pt-sintaxe-regencia-discurso-topico-11` |
| PT.10 | Concordância. | `pt-sintaxe-regencia-discurso` | `aula-pt-sintaxe-regencia-discurso` | `Concordância.` | `q-pt-sintaxe-regencia-discurso-topico-12` |
| PT.11 | Vozes activas e passiva. | `pt-sintaxe-regencia-discurso` | `aula-pt-sintaxe-regencia-discurso` | `Vozes activas e passiva.` | `q-pt-sintaxe-regencia-discurso-topico-13` |
| PT.12 | Tipos de discurso. | `pt-sintaxe-regencia-discurso` | `aula-pt-sintaxe-regencia-discurso` | `Tipos de discurso.` | `q-pt-sintaxe-regencia-discurso-topico-14` |
| PT.13 | Funções da linguagem. | `pt-comunicacao` | `aula-comunicacao` | `Funções da linguagem.` | `q-pt-comunicacao-topico-4` |
| PT.14 | Figuras de estilo. | `pt-literatura-angolana` | `aula-pt-literatura-angolana` | `Figuras de estilo.` | `q-pt-literatura-angolana-topico-8` |
| PT.15 | Agostinho Neto. | `pt-literatura-angolana` | `aula-pt-literatura-angolana` | `Agostinho Neto.` | `q-pt-literatura-angolana-topico-9` |
| PT.16 | António Jacinto. | `pt-literatura-angolana` | `aula-pt-literatura-angolana` | `António Jacinto.` | `q-pt-literatura-angolana-topico-10` |
| PT.17 | Manuel Rui Monteiro. | `pt-literatura-angolana` | `aula-pt-literatura-angolana` | `Manuel Rui Monteiro.` | `q-pt-literatura-angolana-topico-11` |
| PT.18 | Menas Abrantes. | `pt-literatura-angolana` | `aula-pt-literatura-angolana` | `Menas Abrantes.` | `q-pt-literatura-angolana-topico-12` |
| PT.19 | Óscar Ribas. | `pt-literatura-angolana` | `aula-pt-literatura-angolana` | `Óscar Ribas.` | `q-pt-literatura-angolana-topico-13` |
| PT.20 | Pepetela. | `pt-literatura-angolana` | `aula-pt-literatura-angolana` | `Pepetela.` | `q-pt-literatura-angolana-topico-14` |

## Controlo de actualização

Sempre que o programa oficial for revisto, actualize o texto extraído, execute `node scripts/extract-exactas-subtopics.mjs`, confirme o mapeamento de módulo de cada subtema, e execute `pnpm tsx scripts/generate-coverage-matrix.mjs && pnpm check && pnpm test`. A publicação só deve prosseguir depois de a matriz, as sessões e as questões de treino passarem na validação 1:1.
