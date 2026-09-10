# 💰 FinanSee

### Veja seu dinheiro. Entenda seu mês.

**FinanSee** é um aplicativo de controle financeiro pessoal desenvolvido como **Progressive Web App (PWA)**, com foco em simplicidade, organização e visão real do dinheiro disponível.

A proposta é permitir que qualquer pessoa consiga responder rapidamente:

> **Quanto entrou, quanto ainda vai sair, o que falta pagar e quanto realmente posso gastar?**

Sem planilhas complicadas, anúncios ou assinatura obrigatória.

---

## ✨ Sobre o projeto

O FinanSee nasceu como um projeto de controle financeiro pessoal e evoluiu para uma aplicação completa de acompanhamento mensal.

Ele permite controlar:

- 💰 Rendas
- 💸 Gastos
- 💳 Parcelamentos
- 🔄 Despesas recorrentes
- ✅ Contas pagas e pendentes
- 💳 PIX Crédito
- 🥗 Vale Alimentação
- 🎯 Metas
- 🔐 Cofres
- 📅 Calendário financeiro
- 📊 Orçamentos por categoria
- 📈 Projeções financeiras
- 📄 Relatórios mensais
- 💾 Backup e restauração

Tudo organizado por **competência mensal**.

---

# 🏠 Dashboard

A tela inicial apresenta uma visão geral do mês selecionado.

Entre as informações exibidas estão:

- renda estimada;
- renda realmente recebida;
- gastos do mês;
- contas pagas;
- contas pendentes;
- pendências de meses anteriores;
- saldo disponível;
- projeção para o final do mês;
- média segura de gasto diário;
- saldo do Vale Alimentação;
- metas;
- cofres;
- próximas cobranças;
- atividade financeira recente.

O usuário pode navegar entre diferentes competências para consultar meses anteriores ou futuros.

---

# 💰 Rendas

O FinanSee permite cadastrar **múltiplas fontes de renda**.

Exemplos:

- salário;
- freelance;
- benefício;
- renda extra;
- trabalho eventual;
- outras entradas.

Cada fonte pode possuir:

- nome;
- valor estimado;
- valor realmente recebido;
- dia de pagamento;
- histórico por competência.

### Estimado x recebido

Nem sempre o salário recebido corresponde exatamente ao valor previsto.

Por isso, o FinanSee mantém os dois valores:

```text
Estimado: R$ 2.100,00
Recebido: R$ 2.054,81
Diferença: -R$ 45,19
```

Quando uma nova competência começa, o campo de valor recebido fica disponível para o novo lançamento, enquanto os valores anteriores permanecem armazenados no histórico.

Enquanto o valor real ainda não foi informado, o aplicativo utiliza o valor estimado como **previsão**.

---

# 💸 Gastos

Os gastos podem ser cadastrados de diferentes formas:

- gasto único;
- gasto recorrente;
- assinatura;
- parcelamento;
- dívida compartilhada.

Cada despesa pertence à competência correspondente e pode possuir vencimento e forma de pagamento.

---

## ✅ Controle de pagamento

As contas podem ser marcadas como:

- ✅ **Pago**
- 🟡 **Pendente**
- 🔴 **Atrasado**

Se uma conta recorrente não for paga dentro da competência, ela continua registrada no histórico e pode aparecer como **pendência anterior** no mês seguinte.

Assim é possível identificar rapidamente situações como:

```text
Agosto/2026

✅ Internet
✅ Energia
✅ Cartão
🔴 Faculdade — pendente
```

No próximo mês, a dívida anterior continua visível sem substituir a nova cobrança recorrente.

---

# 💳 PIX Crédito

O FinanSee possui suporte específico para operações realizadas através de **PIX Crédito**.

É possível registrar:

- valor enviado;
- quantidade de parcelas;
- valor total cobrado;
- custo adicional;
- percentual efetivo da operação.

### Exemplo

```text
Valor enviado:       R$ 460,50
Total cobrado:       R$ 496,51
Custo adicional:      R$ 36,01
Acréscimo efetivo:       7,82%
```

O orçamento passa a considerar o **valor realmente cobrado**, evitando a falsa impressão de que taxas e juros não fazem parte da despesa.

As taxas não são estimadas automaticamente, pois variam entre bancos, cartões, clientes e condições de parcelamento.

---

# 🥗 Vale Alimentação

O Vale Alimentação possui controle separado do dinheiro disponível em conta.

Para cada competência é possível acompanhar:

```text
Previsto
R$ 650,00

Depositado
R$ 620,00

Gasto
R$ 410,00

Restante
R$ 210,00
```

Os lançamentos podem ser organizados em categorias como:

- 🛒 Mercado
- 🍽️ Restaurante
- 🛵 Delivery / iFood
- 📦 Outros

Na categoria **Outros**, o usuário pode informar livremente a descrição do gasto.

O saldo restante do VA também aparece no Dashboard.

---

# 🎯 Metas

Crie objetivos financeiros e acompanhe a evolução de cada um.

Exemplo:

```text
PC Novo

R$ 1.500 / R$ 5.000

████████░░░░░░░░░░░░ 30%
```

Uma meta pode possuir:

- nome;
- valor desejado;
- valor acumulado;
- contribuição mensal;
- prazo;
- histórico de depósitos.

---

# 🔐 Cofres

Os Cofres permitem separar dinheiro reservado para diferentes finalidades.

Exemplos:

- Emergência
- Casa
- Educação
- Viagem
- Tecnologia
- Lazer
- Família
- Investimentos

Cada cofre possui saldo próprio e histórico de:

- depósitos;
- retiradas.

---

# 📊 Orçamento por categoria

O usuário pode definir limites mensais para diferentes categorias.

Exemplo:

```text
Alimentação

R$ 420 / R$ 600
██████████████░░░░░░ 70%
```

Ou:

```text
Lazer

R$ 290 / R$ 300
███████████████████░ 97%
⚠ Próximo do limite
```

O FinanSee ajuda a visualizar quando determinada categoria está se aproximando ou ultrapassando o orçamento definido.

---

# 📅 Calendário financeiro

O calendário apresenta uma visão mensal dos acontecimentos financeiros.

Os dias que possuem informações recebem indicadores visuais.

Ao selecionar uma data, um painel apresenta os eventos daquele dia.

Podem aparecer:

- vencimentos;
- contas pagas;
- contas pendentes;
- parcelas;
- rendas;
- movimentações;
- gastos;
- eventos financeiros;
- feriados.

O aplicativo também permite registrar feriados ou datas regionais e municipais manualmente.

---

# 📄 Relatório mensal

Cada competência possui um relatório consolidado.

O relatório pode apresentar:

- renda prevista;
- renda recebida;
- diferença entre previsto e realizado;
- gastos previstos;
- gastos pagos;
- contas pendentes;
- contas atrasadas;
- pendências anteriores;
- custos adicionais de PIX Crédito;
- Vale Alimentação;
- metas;
- cofres;
- saldo final;
- projeções do mês.

---

## 🖨️ Imprimir ou salvar em PDF

O relatório possui um layout específico para impressão.

Utilizando o próprio navegador:

```text
Relatório
    ↓
Imprimir
    ↓
Salvar como PDF
```

Não é necessário instalar nenhuma ferramenta adicional.

---

# 📈 Projeção financeira

O FinanSee não mostra apenas o saldo atual.

Ele também utiliza informações do mês para apresentar uma estimativa do que pode restar depois das obrigações conhecidas.

Exemplo:

```text
Recebido              R$ 2.500,00
Gastos confirmados   -R$ 1.480,00
Contas pendentes     -R$   420,00
Pendências anteriores-R$   100,00
──────────────────────────────────
Saldo projetado       R$   500,00
```

---

# 💵 Quanto posso gastar por dia?

Com base no dinheiro disponível e nos dias restantes até o próximo pagamento, o FinanSee apresenta uma referência diária.

Exemplo:

```text
Disponível
R$ 840,00

21 dias restantes

Média disponível por dia
R$ 40,00
```

O valor serve apenas como uma referência matemática para auxiliar no planejamento.

---

# 🔄 Competência mensal

Uma das principais características do FinanSee é a organização por competência.

Em vez de manter uma tela financeira estática, cada mês possui seus próprios:

- recebimentos;
- gastos;
- pagamentos;
- pendências;
- Vale Alimentação;
- relatórios;
- histórico.

O usuário pode navegar entre:

```text
‹ Agosto/2026    Setembro/2026    Outubro/2026 ›
```

Gastos recorrentes e parcelamentos são projetados automaticamente para suas respectivas competências.

---

# 👤 Perfis

O FinanSee possui sistema de usuários locais.

Cada perfil mantém separadamente:

- rendas;
- gastos;
- metas;
- cofres;
- Vale Alimentação;
- configurações;
- histórico;
- orçamento;
- PIN.

Uma conta recém-criada começa completamente zerada.

---

# 🔐 Segurança

O aplicativo possui:

- login com e-mail e senha;
- senha protegida através de derivação criptográfica;
- PIN local opcional;
- bloqueio automático;
- separação entre perfis;
- logout.

O menu de perfil oferece acesso rápido a:

- 👤 Meu perfil
- 🔐 Segurança
- 💾 Backup e restauração
- 🎨 Aparência
- ℹ️ Sobre o FinanSee
- 🚪 Sair

---

# 🚀 Primeiro acesso

O FinanSee possui um fluxo de configuração inicial para evitar que novos usuários sejam simplesmente jogados em um Dashboard vazio.

O processo é:

```text
Abrir FinanSee
      ↓
Instalar aplicativo
ou continuar no navegador
      ↓
Entrar / Criar conta
      ↓
Cadastrar renda
      ↓
Cadastrar gastos
      ↓
Criar metas
      ↓
Criar cofre
      ↓
Dashboard
```

A renda é apresentada primeiro porque ela é a base para os cálculos financeiros do aplicativo.

---

# 📲 Progressive Web App

O FinanSee foi desenvolvido como **Progressive Web App (PWA)**.

Isso permite utilizá-lo diretamente no navegador ou instalá-lo como um aplicativo.

### Entre as vantagens:

- 📱 interface adaptada para celular;
- 🖥️ interface responsiva para desktop;
- ⚡ carregamento rápido;
- 📴 recursos disponíveis offline;
- 📲 instalação sem APK;
- 🌐 atualização através da própria aplicação;
- 💾 armazenamento local.

Na primeira visita, o FinanSee apresenta a opção de instalação quando o navegador oferece suporte.

---

# 🌗 Aparência

O aplicativo possui três opções de tema:

- ☀️ Claro
- 🌙 Escuro
- 💻 Seguir sistema

A interface foi desenvolvida para funcionar tanto em dispositivos móveis quanto em telas maiores.

---

# 💾 Backup e restauração

O usuário pode exportar seus dados para um arquivo `.json`.

```text
FinanSee
    ↓
Exportar backup
    ↓
finansee-backup.json
```

Esse arquivo pode posteriormente ser importado para restaurar as informações.

O sistema de backup continua disponível mesmo com futuras evoluções do armazenamento do aplicativo.

---

# ☁️ Sincronização entre dispositivos

Na versão atual, os dados financeiros permanecem armazenados localmente no navegador/dispositivo.

Isso significa que alterações realizadas no computador ainda não são automaticamente refletidas no celular.

A sincronização em nuvem está entre as próximas grandes evoluções planejadas para o FinanSee.

### Arquitetura planejada

```text
Computador
     ↕
 Conta FinanSee
     ↕
   Nuvem
     ↕
Celular / PWA
```

Isso permitirá futuramente:

- sincronização automática;
- mesma conta em vários dispositivos;
- autenticação real por e-mail;
- recuperação de senha;
- login com Google;
- atualização de dados entre PC e celular.

---

# 🔒 Privacidade

O FinanSee foi desenvolvido com foco em simplicidade e controle dos próprios dados.

Na versão atual:

- os dados financeiros permanecem no dispositivo;
- não existem anúncios;
- não existe assinatura obrigatória;
- não existe venda de dados financeiros;
- o usuário pode manter seus próprios backups.

> **Seus dados financeiros pertencem a você.**

---

# 🛠️ Tecnologias

O projeto utiliza tecnologias web:

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Web App Manifest
- Service Workers
- PWA
- Chart.js

A estrutura foi mantida relativamente simples para facilitar manutenção e evolução.

---

# 📂 Estrutura do projeto

```text
FinanSee/
│
├── index.html
├── manifest.json
├── service-worker.js
│
├── css/
│   └── style.css
│
├── js/
│   ├── core.js
│   ├── navigation.js
│   ├── calculations.js
│   ├── expenses.js
│   ├── income.js
│   ├── planning.js
│   ├── purchase.js
│   ├── calendar-alerts.js
│   ├── reports.js
│   ├── settings.js
│   ├── security.js
│   ├── pwa.js
│   └── init.js
│
└── icons/
```

---

# ▶️ Executando localmente

Por utilizar recursos de PWA e Service Worker, recomenda-se executar o projeto através de um servidor local.

Se Python estiver instalado:

```bash
python -m http.server 8080
```

Depois abra:

```text
http://localhost:8080
```

---

# 🌐 Publicação

O projeto pode ser publicado gratuitamente através do **GitHub Pages**.

Depois de publicado, basta acessar o endereço pelo navegador.

Em navegadores compatíveis, o FinanSee também pode ser instalado como aplicativo.

---

# 🧭 Roadmap

O FinanSee continuará evoluindo de acordo com o uso real e o feedback dos usuários.

Entre as próximas possibilidades estão:

- ☁️ sincronização em nuvem;
- 🔐 autenticação entre dispositivos;
- 🟢 login com Google;
- 🔄 sincronização PC ↔ celular;
- 🔔 notificações aprimoradas;
- 🏷️ categorias personalizadas;
- 📊 evolução dos relatórios;
- 📈 novos indicadores financeiros;
- 📥 novas formas de importação;
- ⚙️ melhorias de experiência e acessibilidade.

---

# 🧪 Status

### 🚀 FinanSee v8 — em testes públicos

O aplicativo já está sendo utilizado por usuários convidados.

O objetivo desta fase é identificar:

- bugs;
- dificuldades de utilização;
- problemas em diferentes dispositivos;
- melhorias de interface;
- recursos realmente úteis no dia a dia.

O desenvolvimento continuará sendo guiado pelo uso real.

---

# ⚠️ Aviso

O FinanSee é uma ferramenta de organização financeira pessoal.

Cálculos, projeções e indicadores apresentados pelo aplicativo possuem caráter informativo e não constituem aconselhamento financeiro, contábil, fiscal ou jurídico.

---

<div align="center">

# 💚 FinanSee

### Veja seu dinheiro. Entenda seu mês.

**Simples • Visual • Gratuito**

</div>
