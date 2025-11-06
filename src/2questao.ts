// -------------------- CLASSE FUNCIONÁRIO (ABSTRATA) --------------------
// Essa classe é abstrata porque ela serve apenas como modelo para outras classes.
// Ela define atributos e um método que as classes filhas devem implementar.
abstract class Funcionario {
  nome: string;
  identificacao: string;
  salario: number;

  constructor(nome: string, identificacao: string, salario: number) {
    this.nome = nome;
    this.identificacao = identificacao;
    this.salario = salario;
  }

  // Método abstrato: cada tipo de funcionário vai calcular o salário de forma diferente.
  abstract calcularSalario(): number;
}


// -------------------- CLASSE GERENTE --------------------
// Herdando da classe Funcionario.
// O gerente recebe bonus fixo de 20%.
class Gerente extends Funcionario {

  calcularSalario(): number {
    return this.salario + (this.salario * 0.20);
  }
}


// -------------------- CLASSE DESENVOLVEDOR --------------------
// Herdando da classe Funcionario.
// O desenvolvedor recebe 10% por projeto entregue.
// Aqui adicionamos o atributo projetosEntregues.
class Desenvolvedor extends Funcionario {
  projetosEntregues: number;

  constructor(nome: string, identificacao: string, salario: number, projetosEntregues: number) {
    super(nome, identificacao, salario);
    this.projetosEntregues = projetosEntregues;
  }

  calcularSalario(): number {
    const bonus = this.projetosEntregues * (this.salario * 0.10);
    return this.salario + bonus;
  }
}


// -------------------- CLASSE ESTAGIÁRIO --------------------
// Herdando da classe Funcionario.
// O estagiário recebe salário fixo, sem bônus.
class Estagiario extends Funcionario {
  calcularSalario(): number {
    return this.salario;
  }
}


// -------------------- INSTÂNCIAS DOS FUNCIONÁRIOS --------------------

// Criando 4 Gerentes
const g1 = new Gerente("Carlos", "G001", 8000);
const g2 = new Gerente("Marcos", "G002", 8500);
const g3 = new Gerente("Julia", "G003", 9000);
const g4 = new Gerente("Ana", "G004", 9500);

// Criando 4 Desenvolvedores
const d1 = new Desenvolvedor("Bruno", "D001", 5000, 3);
const d2 = new Desenvolvedor("Rafael", "D002", 5500, 2);
const d3 = new Desenvolvedor("Letícia", "D003", 5200, 4);
const d4 = new Desenvolvedor("Fernanda", "D004", 6000, 1);

// Criando 4 Estagiários
const e1 = new Estagiario("Mateus", "E001", 1500);
const e2 = new Estagiario("Bianca", "E002", 1400);
const e3 = new Estagiario("Paulo", "E003", 1300);
const e4 = new Estagiario("Mariana", "E004", 1600);


// -------------------- LISTA POLIMÓRFICA --------------------
// Aqui temos uma única lista do tipo Funcionario, mas com objetos de tipos diferentes.
// Isso mostra o polimorfismo: a mesma referência se comportando de formas diferentes.
const funcionarios: Funcionario[] = [
  g1, g2, g3, g4,
  d1, d2, d3, d4,
  e1, e2, e3, e4
];


// -------------------- SIMULAÇÃO --------------------
// Percorre a lista e calcula o salário de cada funcionário.
// O método calcularSalario será chamado conforme o tipo real do objeto.
for (const funcionario of funcionarios) {
  const salarioFinal = funcionario.calcularSalario();
  console.log(
    `Funcionário: ${funcionario.nome} | ID: ${funcionario.identificacao} | Salário Final: R$${salarioFinal}`
  );
}
