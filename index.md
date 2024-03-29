**<center>
Template do Documento do Projeto** <br>
**Módulo 6 - Engenharia de Software** <br>
**Elaboração de aplicação para dispositivos móveis**
</center>** <br><br>

<center>
[template-documento1](../img/template-documento1.jpg)
</center>
<table>
<tr>
<table>
<tr>
<td>
<a href= "[https://klabin.com.br/](https://www.dell.com/pt-br)"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/72px-Dell_logo_2016.svg.png" alt="Dell" border="0" width="100%"></a>
</td>
<td><a href= "https://www.inteli.edu.br/"><img src="https://s3.amazonaws.com/gupy5/production/companies/26702/career/63484/images/2022-04-28_16-56_logo.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width="30%"></a>
</td>
</tr>
</table>

>  Nome do Projeto: LearnLink  <br>
>  Nome do Parceiro: Dell <br> 
>  Nome do Grupo: Lírios <br>  <br> 
>  Integrantes do grupo:  <br> 
  <a href="https://www.linkedin.com/in/bruno-omeira/"> Bruno Meira,  <br> 
  <a href="https://www.linkedin.com/in/gabrielriostorres/"> Gabriel Torres,  <br> 
  <a href="https://www.linkedin.com/in/liviapcoutinho/"> Livia Coutinho,  <br> 
  <a href="https://www.linkedin.com/in/marcos-vinicius-166531239/"> Marcos Vinicius,  <br> 
  <a href="https://www.linkedin.com/in/matheusmacedosantos/"> Matheus Macedo,  <br> 
  <a href="https://www.linkedin.com/in/liviapcoutinho/"> Raíssa Sabino e  <br> 
  <a href="https://www.linkedin.com/in/yveslevi/"> Yves Lapa  <br> 
	  
**Conteúdo**

- [Visão Geral do Projeto](#visão-geral-do-projeto)
  - [Parceiro de Negócios](#parceiro-de-negócios)
  - [Problema](#problema)
    - [Análise do Problema](#análise-do-problema)
    - [Matriz de avaliação de valor Oceano Azul](#matriz-de-avaliação-de-valor-oceano-azul)
    - [Proposta de Valor e Value Proposition Canvas](#proposta-de-valor-e-value-proposition-canvas)
    - [Matriz de Risco](#matriz-de-risco)
    - [Análise financeira do projeto](#análise-financeira-do-projeto)
    - [Mapeamento do processo](#mapeamento-do-processo)
  - [Descritivo da Solução](#descritivo-da-solução)
    - [Objetivos](#objetivos)
      - [Objetivos gerais](#objetivos-gerais)
      - [Objetivos específicos](#objetivos-específicos)
    - [Justificativa](#justificativa)
  - [Partes Interessadas](#partes-interessadas)
- [Requisitos](#requisitos)
  - [Requisitos Funcionais](#requisitos-funcionais)
  - [Requisitos não Funcionais](#requisitos-não-funcionais)
  - [Perfis de Usuários](#perfis-de-usuários)
  - [Casos de Uso](#casos-de-uso)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [UX e UI Design](#ux-e-ui-design)
  - [Wireframes](#wireframes)
  - [Design de Interface - Guia de Estilos](#design-de-interface---guia-de-estilos)
- [Projeto de Banco de Dados](#projeto-de-banco-de-dados)
  - [Modelo Conceitual](#modelo-conceitual)
  - [Modelo Lógico](#modelo-conceitual)
- [Testes de Software](#testes-de-software)
  - [Teste Unitário](#teste-unitário)
  - [Teste de Integração](#teste-de-integração)
  - [Teste de Regressão](#teste-de-regressão)
  - [Teste de Usabilidade](#teste-de-usabilidade)
  - [Teste de Funcionalidade](#teste-de-funcionalidade)
  - [Teste de API](#teste-de-api)
- [Documentação da API](#documentação-da-api)
- [Manual do Usuário](#Manual-do-usuário)
- [Referências](#referências)
- [Apêndice](#apêndice)


# Visão Geral do Projeto
	


## Parceiro de Negócios

A Dell é uma empresa que foi criada em 1984 com o objetivo de oferecer acesso fácil à melhor tecnologia em todos os lugares do planeta. Estão entre as maiores empresas de tecnologia do mundo, sendo líder no mercado de computadores pessoais, servidores, dispositivos de armazenamento, soluções de segurança e soluções de rede, atuando com diversos recursos extraordinários . As aplicações da Dell vão desde soluções de nuvem híbrida e computação de alto desempenho até iniciativas de impacto social e sustentabilidade.



## Problema

Muitos profissionais de T.I se interessam por aprender novas tecnologias. Por exemplo, uma pessoa que trabalha com Front-end usando JavaScript quer aprender Ciência de Dados e programar em Python. Na Dell, alguns profissionais estão saindo da empresa por não estarem se sentindo desafiados e não estarem tendo oportunidades de ganhar novos conhecimentos no vasto mundo da programação.


### Análise do Problema

A problemática surge do fato de vários profissionais de tecnologia da Dell não estarem se sentindo desafiados e não terem oportunidades de aprender novas tecnologias, pois os times da Dell ficam centralizados em suas áreas respectivas e utilizam, na maioria das vezes, as mesmas linguagens e frameworks em todos os projetos. Tais razões fazem com que alguns funcionários saiam da instituição em busca de novos desafios e aprendizados. Com o objetivo de não perder esses desenvolvedores e como forma de engajar seus funcionários, a DELL precisa de uma aplicação web que consiga centralizar e conectar essa demanda dos funcionários de adquirirem novos conhecimentos com a oferta de projetos temporários que há na companhia.


### Matriz de avaliação de valor Oceano Azul

- Fatores que devem ser eliminados ou reduzidos:

	- Falta de incentivo ao aprendizado e engajamento dos colaboradores
	- Baixa participação dos colaboradores na cultura organizacional

- Fatores que devem ser reduzidos:

	- Complexidade na descoberta e compartilhamento de conteúdo relevante
	- Falta de fluidez na interação com o sistema de recomendação

- Fatores que devem ser mantidos:

	- Utilização de bases rotuladas de projetos e documentários fornecidas pelos próprios colaboradores
	- Funcionalidade de publicação, edição, solicitação para participar e exclusão de conteúdo
	- Sistema de gamification para os participantes nos projetos
	- Histórico de projetos e recomendações relacionadas ao usuário

- Fatores que devem ser criados:

	- Sistema de recomendação otimizado para facilitar a descoberta de escolhas relevantes
	- Barra de busca para procurar conteúdo
	- Página de perfil para cada funcionário com suas recomendações publicadas
	- Notificações para atualizar os funcionários sobre novos conteúdos disponíveis ou edições feitas em seus próprios conteúdos
	- Compliance com opção de marcar conteúdo como "NON-COMPLIANT" e retirá-lo do ar após validação pelo moderador.
	  
![image](https://user-images.githubusercontent.com/99189965/235700862-d2f3b72a-a67a-4095-bd9d-2b41ae3e3e7a.png)



### Proposta de Valor e Value Proposition Canvas

<img src="docs/img/VPC.jpg">


### Matriz de Risco
	  
Abaixo está a matriz de risco do projeto, sendo elencadas as maiores ameaças e oportunidades com relação ao desenvolvimento do projeto:
	  
![image](https://user-images.githubusercontent.com/98428867/234990138-763882ca-b0c7-4a2f-a8a5-264cd94dac62.png)


### Análise financeira do projeto
	  
A empresa Dell, a stakeholder do projeto, deseja um aplicativo móvel que possua front-end, back-end e banco de dados hospedados na AWS, além de um sistema de recomendação e gamificação. Considerando esses requisitos, a Dell pode ter que arcar com os seguintes custos: <br>

- Gastos com infraestrutura na nuvem: A AWS oferece um modelo de cobrança baseado no uso mensal de servidores. Portanto, o valor gasto nesse subtema varia de acordo com a quantidade e a qualidade dos servidores necessários para o projeto. Um exemplo de instância EC2 (para o back-end da aplicação) poderia ser a t2.micro, que custa cerca de US$ 0,0116 por hora. Se você executasse a instância por 24 horas por dia, sete dias por semana, o custo seria de cerca de US $8,46 por mês.  Já para o RDS (para o banco de dados da aplicação), considerando um banco de dados de 10 GB com 100.000 leituras/gravações por mês, custaria cerca de US $ 25,68 por mês. E, para o S3 (front-end da aplicação) com 10 GB de armazenamento e 100GB de transferência de dados, custaria cerca de US $0,22 por mês. Portanto, somando os custos mensais estimados de cada serviço, podemos ter uma estimativa geral de cerca de US $34,36 por mês para esse ambiente específico. <br>

- Manutenção do software: Como se trata de um MVP, o software precisará passar por melhorias e, após sua hospedagem, por manutenção. Para isso, serão necessários custos com desenvolvedores de back-end, front-end e infraestrutura. Além disso, pode ser necessário adaptar o aplicativo para obter um desempenho ou eficiência melhorados, o que pode levar a um gasto adicional de tempo e dinheiro para melhorias no código e infraestrutura. <br>
- Licença para distribuição do aplicativo: Para que os funcionários possam usar o aplicativo, ele precisa estar disponível em um serviço de distribuição digital de aplicativos móveis, como a Play Store, o Enterprise Program ou a App Store, por exemplo. Para manter o aplicativo nesses serviços, é preciso pagar uma taxa, que na App Store é de 99 dólares por ano, enquanto no Enterprise Program, indicado para empresas que desejam publicar aplicativos internos, a taxa chega a 299 dólares por ano. <br>
- Escalabilidade: Como se trata de uma empresa internacional, a Dell tem vários funcionários, e conforme a solução for disponibilizada para mais países, pode ser necessário fazer mudanças na infraestrutura ou no banco de dados da plataforma. Isso gera custos adicionais de manutenção e nuvem, como mencionado anteriormente.
Os gastos da criação e prototipação da aplicação não serão gastos, já que a empresa entrou em parceria com o Inteli para que a turma de Engenharia de Software faça um MVP do produto. Porém, considerando em uma análise geral, a empresa iria precisar de desenvolvedores Back-end, Front-end, Design - UX - e de Infraestrutura (DevOps). 
Abaixo está um exemplo de planilha de salários sobre tais funcionários: Porém podem ser necessários para futuras manutenções da plataforma. <br>
<img width="760" alt="image" src="https://user-images.githubusercontent.com/99200253/234987118-924ccc55-f2b5-4b51-9dde-dfd32ad04739.png"> <br>
Considerando todos os gastos, exceto manutenção, temos anualmente que: <br>
<img width="509" alt="image" src="https://user-images.githubusercontent.com/99200253/234984538-02190f03-0746-46da-b53e-d33ff79ba773.png"> <br>

Como retorno financeiro esperado, a empresa almeja solucionar o problema da evasão de funcionários, que acarreta prejuízos em termos de perda de conhecimento e habilidades de profissionais experientes, além de gerar custos adicionais com a contratação e treinamento de novos colaboradores. Além disso, a imagem da empresa perante o mercado, seus funcionários e potenciais novos integrantes seria beneficiada, uma vez que a solução proporcionará aos colaboradores a oportunidade de sentirem que suas carreiras estão evoluindo. Com isso, seriam fomentados profissionais engajados e, consequentemente, resultados mais expressivos seriam alcançados.



## Mapeamento do processo

![image](https://user-images.githubusercontent.com/99200253/235394367-f9c26908-f469-4ab4-be3f-9c49a3e385c7.png)
<img width="713" alt="image" src="https://user-images.githubusercontent.com/99200253/235395425-4cdde302-9aef-4204-9a88-c5815ee41990.png"> <br>
Para mais informações, acesse: <a href="https://miro.com/app/board/uXjVMRXrhB0=/"> Miro
	  
	  
## Descritivo da Solução

A solução proposta é desenvolver um aplicativo web/mobile em nuvem (AWS) para a Intranet da Dell, com o objetivo de recomendar conteúdos sobre tecnologia aos funcionários. A plataforma permitirá aos usuários explorar diferentes áreas da tecnologia, se inscrever em tópicos de interesse e receber recomendações personalizadas com base em seu perfil.
Além disso, haverá recursos de interação social para compartilhar informações e participar de discussões.
A solução também oferecerá análises e métricas para acompanhar o engajamento e fazer melhorias contínuas.
Em resumo, a solução proposta busca fornecer uma plataforma abrangente, personalizada e interativa para o compartilhamento de conteúdo e o aprendizado de tecnologia pelos funcionários da Dell, com o objetivo de promover o desenvolvimento profissional, o engajamento e o compartilhamento de conhecimentos dentro da empresa.


### Objetivos

#### Objetivos gerais
	  
- Desenvolver uma plataforma para compartilhamento de conteúdo interno da empresa com seus colaboradores.
- Fornecer uma ferramenta de comunicação eficiente entre os colaboradores da empresa.
- Melhorar o engajamento dos funcionários com a cultura e os valores da empresa.

#### Objetivos específicos
	  
- Criar um ambiente seguro para compartilhamento de informações internas da empresa.
- Permitir que os colaboradores possam interagir e colaborar com seus colegas de trabalho.
- Possibilitar o reconhecimento dos funcionários através de um sistema de ranking.
- Garantir a conformidade das publicações com as diretrizes da empresa através de um sistema de denúncia.
- Proporcionar aos usuários uma experiência personalizada com base em seus interesses e avaliações de conteúdo.

### Justificativa

Descrever o tipo de arquitetura escolhida, sua justificativa, como deverá ser utilizada e quais os benefícios que ela proporciona.


## Partes Interessadas 

Descrever os principais stakeholders envolvidos no projeto e seus papéis.


# Requisitos

Os requisitos, funcionais e não funcionais, junto com a matriz de ratreabilidade e casos de uso se encontram na planilha abaixo:
<a href=https://docs.google.com/spreadsheets/d/1omDtc8WQxxAnrNdvlt_fXABqTSAwoPLrm8FABHv8-e0> M6 - Requisitos e Rastreabilidade

## Requisitos Funcionais
Esta seção da documentação do software fornece uma descrição detalhada dos requisitos do sistema. Ela inclui informações sobre as funcionalidades esperadas do software, as restrições e limitações do sistema e outras especificações relevantes.
<img width="508" alt="image" src="https://user-images.githubusercontent.com/99200253/235172889-475ec0e4-e77f-4685-a9af-d38b4f8bb04e.png">
<img width="508" alt="image" src="https://user-images.githubusercontent.com/99200253/235172964-8cd29a72-3975-4743-9326-711d37878b7b.png">


## Requisitos não Funcionais
	  
<img width="508" alt="image" src="https://user-images.githubusercontent.com/99200253/235173645-7d9b2fe5-703d-49bd-ab13-321217c5794b.png">


## Perfis de Usuários 

A seção de perfil de usuário da documentação de software é responsável por descrever instruções detalhadas sobre o uso de cada opção e recursos relacionados ao perfil do usuário, garantindo uma experiência fácil e intuitiva para o usuário final.


## Casos de Uso

A seção de casos de uso da documentação de software é uma parte crucial que descreve as funcionalidades 
do software e como elas serão utilizadas pelos usuários. Aqui, são listados todos os cenários possíveis de uso do software, incluindo as ações que o usuário pode realizar, as interações com o sistema e os resultados esperados. Os casos de uso são descritos em detalhes, incluindo a descrição do objetivo da funcionalidade, as entradas de dados, as ações do usuário e os resultados esperados. Além disso, também são incluídos os critérios de aceitação, que são os padrões que o software precisa atender para ser considerado como funcionando corretamente.
<img width="345" alt="image" src="https://user-images.githubusercontent.com/99200253/235174603-c309645e-9628-466c-aa2a-6326075572bc.png"> <br>
<img width="347" alt="image" src="https://user-images.githubusercontent.com/99200253/235174763-8b0a7840-b1e5-4276-948b-31adfa7bc26d.png">
![Arquitetura da Solução - V1](https://user-images.githubusercontent.com/99200253/235395680-3293047e-f09f-4909-a46e-fe2d5544b5cb.png)
Para mais informações, acesse: <a href="https://www.canva.com/design/DAFgavuTP8Y/nq-w85X-fIzCM1Fnc-zS0g/edit?utm_content=DAFgavuTP8Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)"> Diagrama de Caso de Uso

<center>
[template-documento3](../img/template-documento3.jpg)

Exemplo de Diagrama de Casos de Uso
</center>

# Arquitetura do Sistema <br>
	
   Uma arquitetura de sistema é uma estrutura planejada e organizada para um sistema de software que descreve como os componentes do sistema interagem e se comunicam uns com os outros. Estabelece os fundamentos, diretrizes e padrões que orientam a criação, implementação e manutenção de um sistema com a intenção de satisfazer requisitos funcionais e ineficazes.Ela descreve a estrutura geral do sistema, incluindo seus componentes, suas relações, mecanismos de comunicação e princípios de operação. Ela fornece uma visão de alto nível do sistema, cobrindo elementos como compartilhamento de responsabilidade, separação de preocupações, modularidade e escalabilidade. <br>
	
  Uma arquitetura bem planejada e robusta torna possível construir sistemas complexos de forma mais eficaz, incentivando a reutilização de peças, a facilidade de manutenção, a flexibilidade e a capacidade do sistema de evoluir ao longo do tempo. Além disso, uma arquitetura adequada torna mais fácil identificar e tratar riscos e problemas, o que melhora a qualidade e a confiabilidade do sistema. <br>
	
  Em resumo, esta arquitetura de sistema é um projeto estruturado que estabelece como os componentes do sistema interagem e funcionam como um todo, fornecendo uma base estável para o desenvolvimento e evolução do nosso sistema ao longo do tempo.  <br>
	
<img width="661" alt="image" src="https://user-images.githubusercontent.com/99200253/235394478-8c6032bf-b423-4c4c-a851-2b151fe31373.png"> <br>
Para mais informações, acesse: <a href="https://miro.com/app/board/uXjVO5baQmg=/"> Miro <br>
	
# Arquitetura do Sistema (versão 2)
	
  Na versão dois da nossa arquitetura nós adicionamos o apache kafka da aws, ele atua como uma fila de mensagens para o nosso sistema, desempenhando um papel crucial na nossa arquitetura. Ele permite que nossos serviços troquem mensagens em sincronia, fornecendo um canal de comunicação seguro e expandível. O Kafka pode lidar com altas taxas de transferência de dados, garantindo a entrega de mensagens, apoiando a replicação e tolerando erros.<br>

  Nesta arquitetura, os eventos são usados para alertar sobre mudanças de estado ou a ocorrência de ações relevantes para o sistema. Cada serviço tem a capacidade de criar e consumir eventos em Kafka, permitindo a comunicação entre os muitos componentes do sistema. Os eventos podem ser analisados imediatamente ou armazenados para análise adicional. Assim nossa arquitetura com Kafka oferece se torna poderosa para desenvolver o nosso sistemas distribuídos que são focados em eventos. Ela combina os benefícios da SOA, como modularidade e reutilização de serviços, com a escalabilidade e resiliência oferecidas por Kafka.

<img width="836" alt="image" src="https://github.com/2023M6T3-Inteli/Grupo-3/assets/99189965/40dbbf39-8022-4067-86ac-6f464dffce48"> 
	
# Diagrama do fluxo de sequência 
 Este Diagrama do fluxo de sequência é uma ferramenta visual usada para descrever como os objetos interagem na nossa sequência de eventos. Ele exibe a ordem em que os objetos interagem ao longo do tempo, exibindo as mensagens que estão sendo enviadas entre eles (nós detalharemos melhor essas mensagens na especificação da mensageria com relação ao fluxo de sequência). 
	
 O nosso diagrama é usado para descrever o comportamento dinâmico do sistema, demonstrando como vários objetos trabalham juntos para realizar uma determinada função. Ele é especialmente útil para entender a lógica do fluxo de execução e identificar potenciais locais de interação.
	
 Assim o mesmo é uma representação visual da interação e sequência de eventos. Ele é usado para simular o comportamento dinâmico do sistema, nos ajudando a entender a ordem em que as ações são realizadas e identificando potenciais problemas ou melhorias no fluxo de interação entre elas.

![WhatsApp Image 2023-06-02 at 16 24 57](https://github.com/2023M6T3-Inteli/Grupo-3/assets/99209068/575814a3-ff54-4b6e-bc23-3ecdab9d960b)

# Especificação de mensageria com relação ao fluxo de sequência 

Como dito anteriormente a especificação de mensageria é uma continuação do nosso fluxo de sequência, ela busca detalhar as mensagens que estaremos enviando através das apis, assim nós representação mensagens trocadas quando objetos estão interagindo. Essas mensagens podem ser sincronizadas ou assíncronas, e sua inclusão no diagrama é crucial para descrever a comunicação entre os objetos e o fluxo de informações ao longo do tempo.
	
 Esta especificação mensageria do diagrama permite ver como as mensagens são enviadas e recebidas de objetos, ilustrando a troca de informações e a sequência em que essas interações ocorrem. Isso nos ajuda a entender o fluxo de execução do sistema e identificar dependências de objeto.

  A nós incluimos essa especificação para uma representar completamente as interações de objeto, ela ajuda a melhorar a compreensão do sistema, tornando possível reconhecer os pontos de comunicação e o fluxo de informações ao longo do tempo. Esta especificação é especialmente útil na nossa arquitetura de microsserviços onde a comunicação entre muitos componentes é crucial para a funcionalidade geral do sistema.

![image](https://github.com/2023M6T3-Inteli/Grupo-3/assets/99209068/b06d3764-0da6-42d9-aad4-2ab1e76feb43)
	
	
# Arquitetura do Sistema (versão 3)
<img width="836" alt="image" src="https://github.com/2023M6T3-Inteli/Grupo-3/assets/99189965/0c15109c-178c-4287-bd16-6e163debc6f3"> <br>
Para uma visualização ampliada, acesse o link: https://miro.com/app/board/uXjVO5baQmg=/

# Diagrama de fluxo de dados: <br>
	
  O diagrama de fluxo de dados é uma representação visual que descreve o movimento e a transformação dos dados no nosso sistema. Ele mostra como os dados são capturados, processados, armazenados e distribuídos por apis entre os diferentes componentes do sistema.

  Assim nos usamos este diagrama para analisar e modelar o fluxo de dados do sistema, ajudando a identificar como os dados são manipulados e como as informações fluem entre os diferentes elementos do sistema. Ele fornece uma visão clara das entradas, saídas e processos de transformação de dados.

<img width="421" alt="image" src="https://user-images.githubusercontent.com/99200253/235394849-65ce8ad5-49b6-4280-9a6d-24f647258d6b.png"> <br>
Para mais informações, acesse: <a href="https://www.canva.com/design/DAFhCxQEjfE/NpXwvJpZzgwx2GHI2j4buQ/edit?utm_content=DAFhCxQEjfE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"> Canva



<center>
[template-documento4](../img/template-documento4.jpg)

Exemplo de Diagrama de Arquitetura
</center>


# UX e UI Design

Aborda o design e a funcionalidade da aplicação ou sistema em questão. Ela fornece informações sobre como o software é projetado para ser fácil de usar e intuitivo para os usuários. Nesta seção, deve ser possível encontrar descrições detalhadas sobre as principais características e recursos da interface do usuário, como botões, menus, ícones e outros elementos que são utilizados para facilitar a interação do usuário com o software. Além disso, são fornecidos exemplos de como as funcionalidades do software são acessadas e usadas pelos usuários, incluindo informações sobre os passos necessários para realizar tarefas específicas. Esta seção também aborda as principais preocupações de UX, como acessibilidade, usabilidade, consistência e simplicidade. São apresentados exemplos de como o software é projetado para atender às necessidades dos usuários com diferentes tipos de habilidades e recursos.

## Benchmark e Revisão de Design Systems

Neste estudo, iremos comparar e analisar três Design Systems relevantes no mercado: o da Dell Technologies (https://www.delldesignsystem.com/), o da Apple (https://developer.apple.com/design/human-interface-guidelines/guidelines/overview/) e o Atlassian Design System (https://atlassian.design/). O objetivo dessa análise é entender as qualidades e fragilidades de cada Design System, com ênfase no utilizado em nosso projeto, o Dell Technologies Design System. Essa comparação nos permitirá avaliar as melhores práticas e recursos disponíveis em cada sistema, a fim de tomar decisões informadas e garantir que nosso projeto ofereça uma experiência de usuário otimizada e consistente. <br>

O Dell Technologies Design System é uma solução abrangente para o desenvolvimento de interfaces de usuário modernas e responsivas. Ele fornece uma série de componentes, padrões e diretrizes que facilitam a criação de aplicativos eficientes e visualmente atraentes.<br>

O Apple Human Interface Guidelines é um conjunto de diretrizes e padrões de design criados pela Apple para garantir a consistência e a qualidade da experiência do usuário em seus dispositivos e sistemas operacionais. Ele abrange uma ampla gama de tópicos, desde a escolha de cores e tipografia até a organização de elementos na tela e a interação do usuário.<br>

O Atlassian Design System é um conjunto de diretrizes, padrões e componentes de design desenvolvidos pela Atlassian, uma empresa líder em software colaborativo. Ele visa simplificar a criação de interfaces de usuário intuitivas e agradáveis para os produtos da Atlassian e é amplamente utilizado por desenvolvedores e designers em todo o mundo.<br>

De início, após analisar tais Design Systems, pode-se afirmar que esses são unificados, universais, icônicos e conversacionais. Nesse sentido, o primeiro ponto descreve que os DS’s analisados têm uma identidade coesa, seguindo uma lógica interna, já o segundo ponto estabelece que os as definições desses são convencionadas e seguidas externamente, a terceira descreve que todas as funcionalidades das aplicações passam uma mensagem clara do que deve ser feito e a última estabelece que o Design System precisa criar um ambiente de dinâmico e acessível para todas o máximo possível de pessoas. Em segundo lugar, ao classificar o nível hierárquico dos Design Systems da Dell, da Apple e da Atlassian, pode-se definir que todos estes se encontram no nível otimizado, uma vez que estão sempre lançando novas atualizações para o documento, mantendo-o vivo à medida que as necessidades aparecem.<br>

Comparando os DS’s, buscaremos identificar seus pontos fortes e fracos, destacando aspectos como facilidade de uso, customização, disponibilidade de componentes, documentação e suporte, desempenho e compatibilidade com diferentes plataformas e navegadores. Com base nessa análise, poderemos tomar decisões informadas sobre a melhor abordagem a ser seguida em nosso projeto e garantir uma experiência de usuário de alta qualidade<br>

Para que essa análise ocorra de maneira organizada, serão divididos os critérios:<br>
- Facilidade de uso e integração:<br>
No contexto da Dell Technologies e da Atlassian,  se tratam de um ponto forte pela facilidade de usar e integrar em projetos, com uma ampla gama de componentes pré-construídos e exemplos de código disponíveis. Além disso, fornece diversas ferramentas e recursos para facilitar a implementação e a colaboração entre designers e desenvolvedores. 
Já no caso da Apple, concentra-se majoritariamente em fornecer diretrizes de design, em vez de fornecer componentes pré-construídos. <br>
- Customização e flexibilidade:<br>
		Mais uma vez os Design System da Dell e da Atlassian se assemelha por garantir uma boa experiência de customização, permitindo aos desenvolvedores ajustarem os componentes e estilos de acordo com suas necessidades, enquanto os da Apple, mais uma vez, é menos focado em customização e mais em seguir as diretrizes específicas para garantir a consistência da experiência do usuário em dispositivos Apple.
- Componentes disponíveis:<br>
	A Dell Technologies e a Atlassian disponibilizam uma vasta camada de componentes para o desenvolvimento, enquanto a Apple segue por outro lado, fornecendo frameworks e kits de desenvolvimento de software (SDKs) com componentes básicos para suas plataformas.
- Documentação e suporte:<br>
	Todas as documentações analisadas são completas e cumprem seu propósito de auxiliar no desenvolvimento seguindo um design system eficiente, porém dois deles possuem especificidades interessantes. A Apple, oferecendo um canal de suporte e a Atlassian, fornecendo além de kits de design, materiais de aprendizagem. <br>
- Performance e otimização:<br>
	Neste aspecto, a Apple se destaca, por focar em seus dispositivos de fabricação própria, prezando pela otimização nestes, de modo que os frameworks e SDKs fornecidos pela Apple são otimizados para seus dispositivos e sistemas operacionais.
- Escalabilidade e manutenção:<br>
		Os três design systems analisados possuem uma boa estrutura de escalabilidade e manutenção, de modo a ter cada detalhe documentado, para que a solução por inteiro siga um padrão.
- Exemplo de aplicação:<br>
Mesmo com um Design System bem estruturado e detalhado, é importante lembrar que o sucesso de um projeto de interface de usuário depende em grande parte da habilidade da equipe de desenvolvimento e design. Um exemplo disso é o aplicativo mobile "AR Assistent", que segue algumas diretrizes do Dell Technologies Design System, mas que não conseguiu implementá-las de forma eficiente e harmoniosa, resultando em uma aplicação com problemas de interação e aparência.<br>

Para garantir uma implementação adequada do Design System, é fundamental que a equipe de desenvolvimento e design trabalhe em conjunto, mantendo a consistência visual e a experiência do usuário em mente. Isso pode incluir revisões de design e testes de usabilidade para identificar e corrigir problemas de interação e aparência.<br>

No caso do "AR Assistent", a falta de aderência eficaz ao Design System pode ser vista como uma oportunidade de aprendizado para a equipe responsável pelo projeto. Ao analisar os pontos fracos da aplicação e buscar melhorias com base nas diretrizes e componentes disponíveis no Design System, é possível criar uma aplicação mais atraente e com melhor interação com o usuário, proporcionando uma experiência de usuário de alta qualidade.<br>

Em resumo, embora o Dell Technologies Design System forneça um conjunto valioso de recursos e diretrizes para o desenvolvimento de interfaces de usuário, é importante lembrar que a implementação bem-sucedida desses recursos depende da habilidade da equipe em aplicá-los corretamente e garantir que a aparência e a experiência do usuário sejam priorizadas em todo o projeto.<br>

As imagens a seguir ilustram o aplicativo "AR Assistent" e destacam algumas das falhas na implementação do Dell Technologies Design System:<br>

<img src="docs/img/app1.png">
<img src="docs/img/app2.png">
<img src="docs/img/app3.png">
<img src="docs/img/app4.png">
<img src="docs/img/app5.png">

Como pode ser observado nas imagens acima, o exemplo demonstra algumas deficiências no que diz respeito à responsividade nas telas de dispositivos móveis atualmente utilizados. Além disso, as cores não são aplicadas de maneira adequada, resultando em uma aparência visualmente desagradável. A interface também deixa a desejar em termos de intuição e auto explicação, o que dificulta a navegação e a interação do usuário com o aplicativo.
De modo geral, cada um dos analisados tem pontos altos e baixos, porém todos mantendo um padrão de excelente qualidade. Cada Design System apresenta qualidades e fragilidades distintas. O Dell Technologies Design System, utilizado em nosso projeto, oferece facilidade de uso, uma ampla gama de componentes e boa customização. O Apple Human Interface Guidelines é ideal para projetos específicos da Apple, mas pode ser limitado em termos de customização. O Atlassian Design System apresenta uma ampla gama de componentes e padrões, com ênfase na performance e escalabilidade.<br>

Ao considerar essas características, nossa equipe pode tomar decisões informadas sobre a melhor abordagem a ser seguida em nosso projeto, garantindo uma experiência de usuário consistente e de alta qualidade.





	
## Wireframes

Telas de baixa fidelidade das áreas do usuário, conectados, demonstrando a diagramação e o fluxo de navegação. Exemplos: home, login, dashboards etc. Em cada tela colocar: cabeçalho, rodapé, barra lateral, área de conteúdo.
	
https://www.figma.com/file/fh5kuqzdg3gPhQpXDwC3B9/LearnLink?type=design&node-id=0-1&t=avdiGzQZDwmc5Xsl-0
	
Recursos e funcionalidades de inclusão e acessibilidade já devem estar previstos nesse protótipo. 
	
O grupo deve demonstrar que a UI: (1) se adequa a diferentes contextos e necessidades do usuário, já que se trata de uma aplicação mobile, (2) é transparente, ou seja, atualiza o usuário de forma clara e precisa sobre cada processo que ocorre no sistema, (3) oferece feedbacks (visuais, textuais e, se aplicável, sonoros e táteis) rápidos/imediatos, (4) implementa linguagem amigável e personalizável para constituir uma experiência (4a) coerente com a identidade da marca e (4b) intuitiva e fluida, mitigando possíveis erros do usuário.
	

## Design de Interface  - Seleção de Estilos
	
Refere-se ao design visual, cores, tipografia, imagens, logotipos, ou seja, os elementos visuais que compõem o produto. Aqui você deve colocar o link para seu documento de guia de estilos e também colar as capturas de tela destes estilos.

# Projeto de Banco de Dados

Documento contendo diagrama de entidades e relacionamentos do banco de dados


## Modelo Conceitual

O modelo conceitual deve garantir uma conexão com a realidade. Os 4 tipos de conexões com a realidade são:
conceitos
atributos
identificações
associações
O Modelo Entidade-Relacionamento - MER
entidades e tipos de entidades
atributos e tipos de atributos
relacionamentos e tipos de relacionamentos


## Modelo Lógico 

O modelo lógico de banco de dados é uma representação abstrata e simplificada dos dados armazenados no sistema. É utilizado para entender como os dados são relacionados e para garantir a integridade e consistência dos dados armazenados. Incluir  uma descrição detalhada das tabelas, campos e relações presentes no modelo lógico de banco de dados. Também serão apresentadas as regras de negócio e as restrições aplicadas aos dados para garantir a integridade e a consistência dos dados armazenados.
	
## Construção da base de dados

Colab disponível para visualização através do seguinte link:
https://colab.research.google.com/drive/1IByt3WEJskN7BR6_IpcmLoJw2KjRy5j0?authuser=1#scrollTo=66BwjNHjkOH9


# Testes de Software



## Teste Unitário

Link ou imagem da tabela com dados organizados dos testes realizados.
	
Testes Unitários do Ranking <br>
![image](https://github.com/2023M6T3-Inteli/Grupo-3/assets/98428867/ea0cc837-7979-4f80-802f-44f50830b789) <br>
Testes Unitários do Usuário <br>
![image](https://github.com/2023M6T3-Inteli/Grupo-3/assets/98428867/b2cf93e6-088c-451d-9ce8-77d7ae4fef37) <br>
	
Testes Unitários - geral - controllers && services <br>
![image](https://github.com/2023M6T3-Inteli/Grupo-3/assets/98428867/154fee6b-4ac7-4f7a-9757-b09117d81ffe)


## Teste de Integração
	
Testes e logs da mensageria <br>
![image](https://github.com/2023M6T3-Inteli/Grupo-3/assets/99200253/5d105f1b-75ae-4ca4-b60f-67b446a90ea4)
![image](https://github.com/2023M6T3-Inteli/Grupo-3/assets/99200253/a122f5f7-5dd1-45cf-95b3-73633c29ef22)

## Teste de Regressão


## Teste de Usabilidade 

Link ou imagem da tabela com dados organizados dos testes realizados.


## Teste de Funcionalidade 

Link ou imagem da tabela com dados organizados dos testes realizados.


## Teste de API 
Testes e Logs de API <br>
![image](https://github.com/2023M6T3-Inteli/Grupo-3/assets/99200253/edf56d3c-5743-4f99-81bf-6364c36a8562)



# Documentação da API

Devido ao problema enfretado pela AWS acessada pelo lab, que, quando fechada, o EC2 cai com os load balancers, a documentação teve que ficar no local, seguem os prints abaixo da documentação da API:
	![image](https://github.com/2023M6T3-Inteli/Grupo-3/assets/98428867/91b5ac06-3a3b-4586-b8fe-5b04f7e8ec13)
	![image](https://github.com/2023M6T3-Inteli/Grupo-3/assets/98428867/919e360f-76e5-4d80-b8de-72f5e23d2235)
	![image](https://github.com/2023M6T3-Inteli/Grupo-3/assets/98428867/54049bdf-499c-4123-8543-43b5cdd403fb)
No botão Authorize você irá registrar o access_token gerado pela criação de uma conta ou entrada nela e estará permitido a acessar todos os endpoints a depender das suas permissões no site, se é administrador ou usuário normal.


# Manual do Usuário

Fornecer instruções detalhadas sobre como usar o software corretamente. É uma ferramenta valiosa para ajudar os usuários a compreender as funções do software, instalar o software, configurar as preferências do usuário, entre outras tarefas. O manual do usuário geralmente inclui screenshots, animações e outros recursos visuais para tornar a experiência do usuário mais clara e intuitiva. Além disso, ele também pode incluir informações sobre solução de problemas, dicas e truques, bem como informações de contato para suporte técnico. É importante que a seção de manual do usuário seja atualizada frequentemente para garantir que os usuários tenham acesso à informação mais recente e precisa sobre o software.


# Referências

Toda referência citada no texto deverá constar nessa seção, utilizando o padrão de normalização da ABNT - ABNT NBR 10520). As citações devem ser confiáveis e relevantes para o trabalho. São imprescindíveis as citações dos sites de download das ferramentas utilizadas, bem como a citação de algum objeto, música, textura ou outros que não tenham sido produzidos pelo grupo, mas utilizados (mesmo no caso de licenças gratuitas, royalty free ou similares).
Sugerimos o uso do sistema autor-data para citações.


# Apêndice 

Os apêndices representam informações adicionais que não caberiam no documento exposto acima, mas que são importantes por alguma razão específica do projeto. 
