// CLASSE LIVRO
class Livro {
  private disponiveis: number;

  constructor(
    public id: number,
    public titulo: string,
    public autor: string,
    public ano: number,
    public quantidade: number,
    public categoria: string,
    public preco: number
  ) {
    this.disponiveis = quantidade;
  }

  public estaDisponivel(): boolean {
    return this.disponiveis > 0;
  }

  public retirar(): void {
    if (!this.estaDisponivel()) throw new Error("Livro indisponível");
    this.disponiveis--;
  }

  public devolver(): void {
    if (this.disponiveis < this.quantidade) {
      this.disponiveis++;
    }
  }

  public getDisponiveis(): number {
    return this.disponiveis;
  }
}


// CLASSE USUARIO 
class Usuario {
  public multas: number = 0;
  public ativo: boolean = true;

  constructor(
    public id: number,
    public nome: string,
    public cpf: string,
    public tipo: string,
    public telefone: string
  ) {}

  podeEmprestar(): boolean {
    return this.ativo && this.multas === 0;
  }
}


// CLASSE EMPRÉSTIMO
class Emprestimo {
  public devolvido: boolean = false;

  constructor(
    public id: number,
    public usuario: Usuario,
    public livro: Livro,
    public dataEmprestimo: Date,
    public dataDevolucao: Date,
    public multaDiaria: number
  ) {}

  registrarDevolucao(): void {
    this.devolvido = true;
  }
}


// CLASSE BIBLIOTECA 
class Biblioteca {
  private livros: Livro[] = [];
  private usuarios: Usuario[] = [];
  private emprestimos: Emprestimo[] = [];

  adicionarLivro(livro: Livro) {
    this.livros.push(livro);
    console.log(`Livro adicionado: ${livro.titulo}`);
  }

  adicionarUsuario(usuario: Usuario) {
    this.usuarios.push(usuario);
    console.log(`Usuário cadastrado: ${usuario.nome}`);
  }

  buscarUsuario(id: number): Usuario | undefined {
    return this.usuarios.find(u => u.id === id);
  }

  buscarLivro(id: number): Livro | undefined {
    return this.livros.find(l => l.id === id);
  }

  realizarEmprestimo(usuarioId: number, livroId: number, dias: number) {
    const usuario = this.buscarUsuario(usuarioId);
    const livro = this.buscarLivro(livroId);

    if (!usuario) throw new Error("Usuário não encontrado");
    if (!livro) throw new Error("Livro não encontrado");

    if (!usuario.podeEmprestar()) {
      throw new Error("Usuário não pode emprestar (inativo ou com multas)");
    }

    if (!livro.estaDisponivel()) {
      throw new Error("Livro indisponível no momento");
    }

    livro.retirar();

    const hoje = new Date();
    const devolucao = new Date();
    devolucao.setDate(hoje.getDate() + dias);

    const novoEmprestimo = new Emprestimo(
      this.emprestimos.length + 1,
      usuario,
      livro,
      hoje,
      devolucao,
      1.5
    );

    this.emprestimos.push(novoEmprestimo);

    //SIMPLES EMPRÉSTIMO
    console.log("\nEMPRÉSTIMO REALIZADO");
    console.log(`Usuário: ${usuario.nome}`);
    console.log(`Livro: ${livro.titulo}`);
    console.log(`Data de devolução: ${devolucao.toLocaleDateString()}`);

    return novoEmprestimo;
  }

  devolverLivro(emprestimoId: number) {
    const emp = this.emprestimos.find(e => e.id === emprestimoId);
    if (!emp) throw new Error("Empréstimo não encontrado");
    if (emp.devolvido) throw new Error("Este empréstimo já foi devolvido");

    emp.registrarDevolucao();
    emp.livro.devolver();

    // DEVOLUÇÃO
    console.log("\n DEVOLUÇÃO REALIZADA");
    console.log(`Usuário: ${emp.usuario.nome}`);
    console.log(`Livro: ${emp.livro.titulo}`);
    console.log(`Devolvido em: ${new Date().toLocaleDateString()}`);
  }
}


/*

2. Resumo das mudanças feitas

O código agora segue os pilares da OOP:
- Encapsulamento com atributos privados
- Classes reais representando entidades
- Métodos pequenos e separados
- Nada de métodos gigantes
- Nada de arrays de 'any'
- Nada de dados hardcoded misturados com lógica

3. Oportunidades de refatoração encontradas
- Tudo era public
- Métodos gigantes
- Falta de classes
- Falta de validação
- Mistura de interface com regra de negócio
- SRP violado
- Arrays sem tipo

4. O que aconteceria se não fosse refatorado
- Código quebraria com facilidade
- Muito bug
- Muito difícil de manter
- Duplicação infinita
- Sistema ficaria frágil
- Cresceria de forma desorganizada
- Viraria um "castelo de cartas"

*/


const biblioteca = new Biblioteca();

const livro1 = new Livro(1, "Clean Code", "Robert Martin", 2008, 3, "tecnologia", 89.90);
const livro2 = new Livro(2, "O Hobbit", "Tolkien", 1937, 2, "fantasia", 55.00);

const usuario1 = new Usuario(1, "Bruno", "12345678900", "estudante", "48999999999");
const usuario2 = new Usuario(2, "Igor", "98765432100", "professor", "48988888888");

biblioteca.adicionarLivro(livro1);
biblioteca.adicionarLivro(livro2);
biblioteca.adicionarUsuario(usuario1);
biblioteca.adicionarUsuario(usuario2);

biblioteca.realizarEmprestimo(1, 1, 7);
biblioteca.realizarEmprestimo(2, 2, 5);

biblioteca.devolverLivro(1);


