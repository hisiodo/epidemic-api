## LeftOver API 


Api que provê aesso a recursos para cadastro e recuperação de informações sobre valores a serem usados em promoções nas vendas.
Funcionalidades incluídas:
Cadastro:
  Vendedores
  Empresas
  Usuários
  Permissões
  Papéis (Administrador, vendedor)
  Valor de Abatimento(Left Over)
Operações:
  Validações de envio de dados
  Manipulação do saldo de promoção
### Para executar
1) Clone o repositório
2) execute no terminal o comando 
```js
npm install 
```
3) Execute as migrations
```js
adonis migration:run
```
4) Execute os seeders
```js
adonis seed --files='PermissionSeeder.js, RoleSeeder.js, UserSeeder.js'
```
5) Execute o servidor (homologação)
```js
yarn start
```

6) Execute o servidor (desenvolvimento)
```js
adonis serve --dev
```


