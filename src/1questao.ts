class Livro {
  titulo: string;
  autor: string;
  editora: string;
  anoPublicacao: number;
  disponivel: boolean;

  constructor(
    titulo: string,
    autor: string,
    editora: string,
    anoPublicacao: number,
    disponivel: boolean = true
  ) {
    this.titulo = titulo;
    this.autor = autor;
    this.editora = editora;
    this.anoPublicacao = anoPublicacao;
    this.disponivel = disponivel;
  }

  emprestar(): boolean {
    if (this.disponivel) {
      this.disponivel = false;
      console.log(`Livro emprestado: "${this.titulo}"`);
      return true;
    } else {
      console.log(`Ocupado: "${this.titulo}" já está emprestado`);
      return false;
    }
  }

  devolver(): boolean {
    if (!this.disponivel) {
      this.disponivel = true;
      console.log(`Livro devolvido: "${this.titulo}"`);
      return true;
    } else {
      console.log(`Erro: "${this.titulo}" já estava disponível`);
      return false;
    }
  }
}

// -------------------- CLASSE MEMBRO --------------------
class Membro {
  nome: string;
  identificacao: string;
  livrosEmprestados: Livro[];

  constructor(nome: string, identificacao: string) {
    this.nome = nome;
    this.identificacao = identificacao;
    this.livrosEmprestados = [];
  }

  pegarEmprestado(livro: Livro): void {
    // Só registra se realmente realizou a operação
    if (livro.emprestar()) {
      this.livrosEmprestados.push(livro);
      console.log(`${this.nome} agora possui: "${livro.titulo}"`);
    }
  }

  devolverLivro(livro: Livro): void {
    const index = this.livrosEmprestados.indexOf(livro);

    if (index !== -1) {
      this.livrosEmprestados.splice(index, 1);
      livro.devolver();
      console.log(`${this.nome} devolveu "${livro.titulo}"`);
    } else {
      console.log(`${this.nome} não pode devolver "${livro.titulo}" pois não o possui.`);
    }
  }
}

// -------------------- OBJETOS --------------------
const livro1 = new Livro("Pai Rico, Pai Pobre", "Robert Martin", "Alta Books", 2008);
const livro2 = new Livro("O Pequeno Príncipe", "Andrew Hunt", "Bookman", 1999);
const livro3 = new Livro("007", "Robert Martin", "Alta Books", 2017);
const livro4 = new Livro("Dom Quixote", "Miguel de Cervantes", "O'Reilly", 2008);

const membro1 = new Membro("Bruno", "M001");
const membro2 = new Membro("Felipe", "M002");
const membro3 = new Membro("Igor", "M003");

// -------------------- SIMULAÇÃO --------------------
membro1.pegarEmprestado(livro1);
membro2.pegarEmprestado(livro1);
membro2.pegarEmprestado(livro2);
membro1.pegarEmprestado(livro2);
membro3.pegarEmprestado(livro3);
membro3.devolverLivro(livro3);
membro1.devolverLivro(livro2);
membro2.devolverLivro(livro2);
membro1.pegarEmprestado(livro2);
membro3.pegarEmprestado(livro4);
membro3.devolverLivro(livro4);
membro1.devolverLivro(livro1);
