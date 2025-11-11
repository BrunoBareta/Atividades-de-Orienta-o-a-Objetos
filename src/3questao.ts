// INTERFACE MEIO DE PAGAMENTO
// A interface obriga todas as classes de métodos de pagamento a terem o método processarPagamento.
// Isso garante que mesmo sendo diferentes meios, todos funcionem com a mesma "assinatura" de função.
interface MeioPagamento {
  processarPagamento(valor: number, conta: ContaBancaria): boolean;
}


//  CLASSE CONTA BANCÁRIA 
// Essa classe representa uma conta real: tem saldo, histórico e não permite acesso direto a saldo (encapsulamento).
class ContaBancaria {
  private saldo: number; // Valor protegido, só pode ser alterado internamente
  private historico: string[] = []; // Registro de transações
  private titular: string; // Nome da pessoa dona da conta

  constructor(titular: string, saldoInicial: number) {
    this.titular = titular;
    this.saldo = saldoInicial;
  }

  // Getter para ler o saldo sem modificar
  getSaldo(): number {
    return this.saldo;
  }

  // Getter para nome do titular
  getTitular(): string {
    return this.titular;
  }

  // Método protegido para retirar dinheiro se houver saldo suficiente
  descontar(valor: number): boolean {
    if (this.saldo >= valor) {
      this.saldo -= valor;
      this.historico.push(`Pagamento de R$${valor}`);
      return true;
    }
    return false;
  }

  // Método para receber dinheiro
  depositar(valor: number): void {
    this.saldo += valor;
    this.historico.push(`Depósito de R$${valor}`);
  }

  // Exibir histórico
  mostrarHistorico(): void {
    console.log(`\nHistórico da conta de ${this.titular}:`);
    this.historico.forEach(item => console.log(item));
    console.log(`Saldo final: R$${this.saldo}`);
  }
}


// CLASSE CARTÃO DE CRÉDITO 
// Cartão de crédito tem limite, logo precisamos de um atributo exclusivo
class CartaoCredito implements MeioPagamento {
  private limite: number;

  constructor(limite: number) {
    this.limite = limite;
  }

  processarPagamento(valor: number, conta: ContaBancaria): boolean {
    if (valor <= this.limite) {
      this.limite -= valor;
      console.log(`Pagamento de R$${valor} no crédito aprovado para ${conta.getTitular()}`);
      return true;
    } else {
      console.log(`Crédito recusado para ${conta.getTitular()}: limite insuficiente`);
      return false;
    }
  }
}


// CLASSE CARTÃO DE DÉBITO
class CartaoDebito implements MeioPagamento {
  processarPagamento(valor: number, conta: ContaBancaria): boolean {
    if (conta.descontar(valor)) {
      console.log(`Pagamento de R$${valor} no débito aprovado para ${conta.getTitular()}`);
      return true;
    } else {
      console.log(`Débito recusado para ${conta.getTitular()}: saldo insuficiente`);
      return false;
    }
  }
}


//  CLASSE BOLETO BANCÁRIO 
class BoletoBancario implements MeioPagamento {
  processarPagamento(valor: number, conta: ContaBancaria): boolean {
    console.log(`Boleto de R$${valor} gerado para ${conta.getTitular()}. Aguardando pagamento`);
    return true;
  }
}


// CLASSE PIX 
class Pix implements MeioPagamento {
  processarPagamento(valor: number, conta: ContaBancaria): boolean {
    if (conta.descontar(valor)) {
      console.log(`PIX de R$${valor} enviado para ${conta.getTitular()}`);
      return true;
    } else {
      console.log(`PIX recusado para ${conta.getTitular()}: saldo insuficiente`);
      return false;
    }
  }
}


// INSTÂNCIAS DE CONTAS 
const conta1 = new ContaBancaria("Bruno", 1000);
const conta2 = new ContaBancaria("Ana", 500);
const conta3 = new ContaBancaria("Carlos", 1500);
const conta4 = new ContaBancaria("Fernanda", 200);

// MÉTODOS DE PAGAMENTO 
const credito = new CartaoCredito(800);
const debito = new CartaoDebito();
const boleto = new BoletoBancario();
const pix = new Pix();


//  SIMULAÇÃO 
// Operações em várias contas mostrando validação e histórico

credito.processarPagamento(300, conta1);
debito.processarPagamento(200, conta1);
pix.processarPagamento(150, conta1);

debito.processarPagamento(600, conta2);
boleto.processarPagamento(500, conta2);

pix.processarPagamento(1000, conta3);
credito.processarPagamento(200, conta3);

debito.processarPagamento(150, conta4);
pix.processarPagamento(100, conta4);


// HISTÓRICO FINAL 
conta1.mostrarHistorico();
conta2.mostrarHistorico();
conta3.mostrarHistorico();
conta4.mostrarHistorico(); 




// EXPLICAÇÃO DO CÓDIGO 
// Esse código simula um sistema de pagamento. Foi criado uma interface chamada MeioPagamento que obriga
// todos os métodos de pagamento a terem a função processarPagamento. Isso garante que todos funcionem
// de forma padronizada.
//
// A classe ContaBancaria usa encapsulamento, então o saldo e o histórico ficam privados, garantindo
// segurança dos dados. O saldo só pode ser alterado por métodos internos.
//
// Depois, foram criados quatro meios de pagamento diferentes: CartaoCredito, CartaoDebito,
// BoletoBancario e Pix. Cada um tem sua regra de validação. Por exemplo: no crédito é verificado o limite,
// no débito e pix é verificado saldo, e o boleto só gera o pagamento para depois ser quitado.
//
// No final, criei quatro contas bancárias e simulei várias operações de pagamento com valores diferentes,
// mostrando quando o pagamento foi aceito ou recusado conforme as regras de cada meio de pagamento.
// Por fim, cada conta imprime seu histórico de movimentações e o saldo final.
