# DevTest-J1-base

## Teste para Programador C# + JavaScript

Este teste é para avaliar suas habilidades como programador fullstack.

Desenvolva uma solução ASP.NET para um CRUD de Clientes e Contatos. Deve existir uma lista de clientes, e para cada cliente, uma lista de contatos.

Você é livre para definir a usabilidade da solução. Como dica, normalmente é desenvolvido uma lista de clientes, com opções de inclusão, alteração e exclusão. Na tela de edição de cliente, além dos campos do cliente, uma lista de contatos, com as mesmas opções.

Mas Fique a vontade para fazer diferente.

## Backend e Frontend

- No lado servidor, deverá desenvolver o código com ASP.NET Core C#.
- No lado cliente (Navegador), pode escolher entre Html+Css+JavaScript Vanilla, ReactJS, VueJs ou KnockoutJS.
- Fique totalmente livre quanto ao layout das telas, botões, menus, componentes etc.


## Banco de Dados

Utilize o arquivo de SqLite (DevTest_A.db) disponível neste repositório, este banco já possui as tabelas de cliente e contato, e alguns registros de exemplos, fique livre para modificar se for necessário, apenas documente as alterações.

Estrutura Banco de Dados
```sql
CREATE TABLE cliente (
   codigo INTEGER PRIMARY KEY AUTOINCREMENT,
   clienteAtivo BOOLEAN,
   nome VARCHAR (200),
   telefone VARCHAR (30),
   municipio VARCHAR (150),
   dataContrato DATE,
   valorMensalContrato DECIMAL (17, 2),
   observacoes TEXT,
   dataInclusao DATETIME NOT NULL
);

CREATE TABLE contato (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   codigoCliente INTEGER REFERENCES cliente (codigo),
   nome VARCHAR (110),
   dataNascimento DATE,
   email VARCHAR (150),
   telefone VARCHAR (30),
   dataInclusao DATETIME NOT NULL
);
```

Exemplo de conexão
```c#
var sqliteConnection = new SQLiteConnection("Data Source=E:\\tempo\\TesteDev\\db\\DevTest_A.db; Version=3;datetimeformat=CurrentCulture");
sqliteConnection.Open();

DataTable dt = new DataTable();
try
{
    using (var cmd = sqliteConnection.CreateCommand())
    {
        cmd.CommandText = "SELECT * FROM Cliente";
        var da = new SQLiteDataAdapter(cmd.CommandText, sqliteConnection);
        da.Fill(dt);
        return JsonConvert.SerializeObject(dt);
    }
}
catch (Exception ex)
{
    throw ex;
}
```

## Avaliação

É importante comentar os commits, o processo de desenvolvimento é importante para nossa avaliação.

Seu código, organização, nomes de funções e variáveis, componentes utilizados, usabilidade nas telas, tudo será considerado na avaliação.

Esperamos receber uma solução ASPNET que possamos testar, na avaliação iremos baixar o código e executar a solução.

Mas mesmo que não conclua a tarefa, não tem problema, nos entregue o código comentado, também será avaliado.

## Prazo

Imaginamos que consiga concluir o teste em 5 dias, mas se precisar mais algum tempo não tem problema.

Ao terminar a solução, não esqueça de subir tudo para o GitLab, nos responda o email comunicando a entrega.

Boa sorte !


