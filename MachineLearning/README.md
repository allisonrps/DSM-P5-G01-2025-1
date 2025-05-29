# Documentação: Machine Learning

## 1. Informações Gerais do Dataset

### Estrutura do Dataset

- **Tamanho**: Aproximadamente 100.000 registros  
- **Variáveis**: 27 colunas, incluindo identificadores, dados demográficos, informações financeiras e comportamentais  
- **Variável Alvo**: `Credit_Mix`, categorizada em:
  - `Poor` (Ruim)
  - `Standard` (Padrão)
  - `Good` (Bom)

### Descrição das Variáveis

| Variável                     | Descrição (Português)                                     |
|-----------------------------|------------------------------------------------------------|
| `ID`                        | Identificação da linha                                     |
| `Customer_ID`               | Identificador do cliente                                   |
| `Month`                     | Mês da transação/dado                                     |
| `Name`                      | Nome do cliente                                           |
| `Age`                       | Idade do cliente                                          |
| `SSN`                       | Número de Seguridade Social (ou CPF)                      |
| `Occupation`                | Ocupação profissional                                     |
| `Annual_Income`             | Renda anual                                               |
| `Monthly_Inhand_Salary`     | Salário mensal líquido                                    |
| `Num_Bank_Accounts`         | Número de contas bancárias                                |
| `Num_Credit_Card`           | Número de cartões de crédito                              |
| `Interest_Rate`             | Taxa de juros                                             |
| `Num_of_Loan`               | Quantidade de empréstimos ativos                          |
| `Type_of_Loan`              | Tipos de empréstimos existentes                           |
| `Delay_from_due_date`       | Dias de atraso em relação à data de vencimento            |
| `Num_of_Delayed_Payment`    | Número de pagamentos atrasados                            |
| `Changed_Credit_Limit`      | Alteração no limite de crédito                            |
| `Num_Credit_Inquiries`      | Número de consultas de crédito                            |
| `Credit_Mix`                | Tipo de crédito utilizado                                 |
| `Outstanding_Debt`          | Dívida pendente                                           |
| `Credit_Utilization_Ratio`  | Índice de utilização do crédito                           |
| `Credit_History_Age`        | Tempo de histórico de crédito                             |
| `Payment_of_Min_Amount`     | Indica se o pagamento mínimo foi realizado                |
| `Total_EMI_per_month`       | Total de parcelas mensais (EMI)                           |
| `Amount_invested_monthly`   | Valor investido mensalmente                               |
| `Payment_Behaviour`         | Comportamento de pagamento                                |
| `Monthly_Balance`           | Saldo mensal                                              |

🔗 **Link para download do dataset**: [Kaggle - Credit Score Classification](https://www.kaggle.com/datasets/parisrohan/credit-score-classification/data)

---

## 2. Pré-processamento

### Importação de Dados e Bibliotecas

- **Bibliotecas utilizadas**: `pandas`, `numpy`, `matplotlib`, `seaborn`
- **Leitura do dataset**: `pd.read_csv()`

---

### Remoção de Colunas Irrelevantes ou Sensíveis

**Colunas removidas**:

- `ID`, `Customer_ID`, `Name`, `SSN`  
  *Justificativa*: Dados identificadores ou pessoais

- `Month`  
  *Justificativa*: Sem valor temporal útil no modelo

- `Occupation`  
  *Justificativa*: Alta cardinalidade e baixa padronização

- `Type_of_Loan`  
  *Justificativa*: Múltiplos valores concatenados, difícil de codificar

- `Changed_Credit_Limit`  
  *Justificativa*: Redundante com outras variáveis

- `Payment_Behaviour`  
  *Justificativa*: Difícil de transformar e potencialmente redundante

- `Annual_Income`  
  *Justificativa*: Redundante com `Monthly_Inhand_Salary`

- `Credit_Utilization_Ratio`, `Credit_History_Age`, `Monthly_Balance`, `Interest_Rate`, `Num_Credit_Inquiries`  
  *Justificativa*: Dados técnicos não acessíveis diretamente por usuários comuns

---

### Colunas Mantidas

- `Age`
- `Monthly_Inhand_Salary`
- `Num_Bank_Accounts`
- `Num_Credit_Card`
- `Num_of_Loan`
- `Delay_from_due_date`
- `Num_of_Delayed_Payment`
- `Outstanding_Debt`
- `Payment_of_Min_Amount`
- `Total_EMI_per_month`
- `Amount_invested_monthly`

---

### Tratamento de Valores Inválidos

- Substituição de valores como `'_'`, `'__10000__'`, `'_____'` por `NaN`

---

### Conversão de Dados para Tipos Numéricos

- Remoção de caracteres não numéricos em colunas como:
  - `Age`
  - `Annual_Income`
  - `Num_of_Loan`
  - `Outstanding_Debt`

- Conversão para `float` usando `pd.to_numeric()`

---

### Tratamento de Valores Ausentes

- Identificação e tratamento de valores `NaN` nas colunas numéricas

---

### Remoção de Outliers

- Aplicação do método **IQR (Intervalo Interquartil)** para detectar e remover valores extremos

---

### Visualizações Utilizadas

- **Boxplot**
- **Pairplot**
- **Countplot** (para a variável alvo `Credit_Mix`)
- **Matriz de Correlação** e **Heatmap** para análise de relações entre variáveis numéricas
