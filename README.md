<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/BrunoCarvalhoFeitosa/FacebookClone">
    <img src="/public/image-facebook.png" alt="Logo" />
  </a>

  <p align="center">
    Clone e redesign do Facebook, foram feitas algumas das principais funcionalidades do aplicativo tendo cadastro, login e criação de uma timeline para apresentação de fotos e textos. Para isso foi-se utilizado Next.js (framework para React.js e criação de interfaces), TailwindCSS (framework criado para estilizações inline) e Firebase (banco de dados em cloud do Google).
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#feito-com">Feito com</a></li>
        <li><a href="#hospedagem">Hospedagem</a></li>
      </ul>
    </li>
    <li>
      <a href="#iniciando-o-projeto">Iniciando o projeto</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#license">Licenças</a></li>
    <li><a href="#contato">Contato</a></li>
    <li><a href="#reconhecimentos">Reconhecimentos</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Sobre o projeto
Este app foi feito com Next.js, possuindo três páginas ao total, sendo uma para o cadastro de um novo usuário, outra para o login e outra para apresentação do feed que conterá elementos para salvar uma publicação, exibir contatos, etc.



https://user-images.githubusercontent.com/46093815/159840314-f50a47e3-8d55-4042-b4f9-cf6dd36937e9.mp4




### Página de cadastro
Nesta página todos os dados do usuário são salvos no Realtime Database do Firebase, para posteriormente serem utilizados. Para o cadastro ser efetuado com sucesso, é preciso antes respeitar os padrões dos dados que são solicitados através do formulário, para isso foi utilizado o Yup, uma lib baseada em schemas onde podemos definir os tipos de dados que esperamos que o usuário preencha, por exemplo, no campo de nome foi feita uma validação para recusar nomes que contém valores númericos e para a senha é necessário ter caracteres especiais e números para reforçar a segurança. 

![facebookRegister](https://user-images.githubusercontent.com/46093815/159834304-e3983d53-a061-462a-a3ec-9766268a4163.png)

### Página de login
Nesta página os dados do usuário são validados no Firebase, caso os dados sejam verdadeiros sua sessão é autenticada e criada. Para melhorar a segurança, foi criada uma autenticação de 2 fatores, onde além da senha ter de coincidir com o que foi cadastrado no Firebase, ela deve ser repetida mais uma vez. Caso os dados estejam errados no Firebase ou na repetição o usuário será notificado através uma mensagem customizada na página. Aqui também foi utilizado o Yup.

![facebookLogin](https://user-images.githubusercontent.com/46093815/159834505-24d0b1dd-b80f-48e9-924a-0752304b5cd2.png)

### Feed
Ao ser autenticado através do login, o usuário é redirecionado para seu feed. Nesta página o usuário pode ver os seus contatos, publicar algo para aparecer em seu feed, que pode incluir um texto simples com opções de diversos emojis, além de adicionar uma imagem, por exemplo. Através de um lightbox é possível ver com mais nitídez a foto que o usurio publicou .

![facebookFeed](https://user-images.githubusercontent.com/46093815/159834761-82467b5e-c2b4-4e49-88b8-5c60bfe683f5.png)


![facebookPublicacao](https://user-images.githubusercontent.com/46093815/159838248-5c8d6a37-2539-4f61-bac8-9302a1210f22.png)


![facebookLightboxFeedWithoutZoom](https://user-images.githubusercontent.com/46093815/159837865-10c90a2f-30f4-4b09-b297-95ff0177c831.png)


![facebookLightboxFeedWithZoom](https://user-images.githubusercontent.com/46093815/159837968-fbcbb3c8-170c-49a3-88f9-171ba52b79c4.png)

### Feito com

* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Firebase](https://firebase.google.com/)
* [Vercel](https://vercel.com/)

### Hospedagem

O app está em produção neste link: (https://facebook-clone-jet-seven.vercel.app/).

<!-- GETTING STARTED -->
## Iniciando o projeto

Primeiramente será necessário clonar este projeto em (https://github.com/BrunoCarvalhoFeitosa/FacebookClone.git), após o download será necessário abrir este projeto no seu
editor e no terminal digitar npm install ou yarn, posteriormente é só rodar em seu terminal o comando npm run dev ou yarn dev. Também será necessário criar um arquivo .env.local e adicionar as variáveis do Firebase para haver as interações com o banco de dados, para isso acesse: (https://firebase.google.com/?hl=pt).

### Pré-requisitos

* npm
  ```sh
  npm install npm@latest -g
  ```

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/BrunoCarvalhoFeitosa/FacebookClone.git
   ```
2. Instale os pacotes do NPM
   ```sh
   npm install ou yarn
   ```
   
3. Inicie o projeto
   ```sh
   npm run dev ou yarn dev
   ```   

<!-- LICENSE -->
## License

Distribuído sob a licença MIT.

<!-- CONTACT -->
## Contato

Bruno Carvalho Feitosa - [GitHub](https://github.com/BrunoCarvalhoFeitosa) - [LinkedIn](https://www.linkedin.com/in/bruno-carvalho-feitosa/)
