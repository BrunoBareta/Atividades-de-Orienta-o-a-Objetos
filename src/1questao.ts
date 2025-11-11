// CLASSE LIVRO 
class Livro {
  // Atributos básicos do livro
  titulo: string;
  autor: string;
  editora: string;
  anoPublicacao: number;
  disponivel: boolean;

  // Construtor para criar o livro já com todas as informações
  constructor(
    titulo: string,
    autor: string,
    editora: string,
    anoPublicacao: number,
    disponivel: boolean = true // Por padrão o livro começa disponível
  ) {
    this.titulo = titulo;
    this.autor = autor;
    this.editora = editora;
    this.anoPublicacao = anoPublicacao;
    this.disponivel = disponivel;
  }

  // Método para emprestar o livro
  emprestar(): boolean {
    if (this.disponivel) {           // Só empresta se estiver disponível
      this.disponivel = false;
      console.log(`Livro emprestado: "${this.titulo}"`);
      return true;
    } else {
      console.log(`Ocupado: "${this.titulo}" já está emprestado`);
      return false;
    }
  }

  // Método para devolver o livro
  devolver(): boolean {
    if (!this.disponivel) {         // Só devolve se estiver emprestado
      this.disponivel = true;
      console.log(`Livro devolvido: "${this.titulo}"`);
      return true;
    } else {
      console.log(`Erro: "${this.titulo}" já estava disponível`);
      return false;
    }
  }
}


//  CLASSE MEMBRO 
class Membro {
  nome: string;
  identificacao: string;
  livrosEmprestados: Livro[]; // Lista com os livros que ele pegou

  constructor(nome: string, identificacao: string) {
    this.nome = nome;
    this.identificacao = identificacao;
    this.livrosEmprestados = [];
  }

  // Método para pegar um livro emprestado
  pegarEmprestado(livro: Livro): void {
    // Primeiro tenta emprestar o livro
    if (livro.emprestar()) { // Se deu certo...
      this.livrosEmprestados.push(livro); // Adiciona na lista do membro
      console.log(`${this.nome} agora possui: "${livro.titulo}"`);
    }
  }

  // Método para devolver um livro
  devolverLivro(livro: Livro): void {
    // Procura o livro dentro da lista de emprestados
    const index = this.livrosEmprestados.indexOf(livro);

    if (index !== -1) { // Se o livro foi encontrado
      this.livrosEmprestados.splice(index, 1); // Remove da lista
      livro.devolver(); // Marca o livro como devolvido
      console.log(`${this.nome} devolveu "${livro.titulo}"`);
    } else {
      // Se o membro tentar devolver algo que não está com ele
      console.log(`${this.nome} não pode devolver "${livro.titulo}" pois não o possui.`);
    }
  }
}


//  OBJETOS (Livros e Membros)
const livro1 = new Livro("Pai Rico, Pai Pobre", "Robert Martin", "Alta Books", 2008);
const livro2 = new Livro("O Pequeno Príncipe", "Andrew Hunt", "Bookman", 1999);
const livro3 = new Livro("007", "Robert Martin", "Alta Books", 2017);
const livro4 = new Livro("Dom Quixote", "Miguel de Cervantes", "O'Reilly", 2008);

const membro1 = new Membro("Bruno", "M001");
const membro2 = new Membro("Felipe", "M002");
const membro3 = new Membro("Igor", "M003");


// SIMULAÇÃO DAS AÇÕES 
membro1.pegarEmprestado(livro1);  // Bruno pega livro 1
membro2.pegarEmprestado(livro1);  // Felipe tenta pegar, mas tá emprestado
membro2.pegarEmprestado(livro2);  // Felipe pega livro 2
membro1.pegarEmprestado(livro2);  // Bruno tenta pegar, mas já tá com Felipe
membro3.pegarEmprestado(livro3);  // Igor pega livro 3
membro3.devolverLivro(livro3);    // Igor devolve livro 3
membro1.devolverLivro(livro2);    // Bruno tenta devolver algo que não tem
membro2.devolverLivro(livro2);    // Felipe devolve livro 2
membro1.pegarEmprestado(livro2);  // Agora Bruno consegue pegar livro 2
membro3.pegarEmprestado(livro4);  // Igor pega livro 4
membro3.devolverLivro(livro4);    // Igor devolve livro 4
membro1.devolverLivro(livro1);    // Bruno devolve livro 1
