import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Olá, Bem-Vindo(a) à minha página do Desafio Publi!</h1><hr></hr>
            <p>Muito Obrigado pela oportunidade, segue um pouco sobre mim:</p>
            <br></br>
            <p>Me chamo Gabriel Mandel Dorneles, apaixonado por tecnologia sempre tive contato com computadores
                        desde pequeno resolvendo problemas mais simples.</p>
            <p>Estudante de Análise e Desenvolvimento de Sistemas desde 2020/2 e hoje busco me especializar em .NET
            fazendo cursos e Bootcamps. Também tenho experiência com um sistema de gestão do mercado livreiro
                construido em .NET Framework, o que me despertou a paixão pela linguagem C#.</p>
            <p> Também como autônomo estou contruindo uma API em Laravel e estudo ReactJS para completar minha meta de
                me tornar um desenvolvedor Fullstack</p>
        <ul>
          <li><a href='https://github.com/gabrielmandel/'>GitHub</a></li>
          <li><a href='https://www.linkedin.com/in/gabriel-dorneles-a77b8b181/'>LinkedIn</a></li>
        </ul>
      </div>
    );
  }
}
