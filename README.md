## Sistema que permitirá aos:

## Gestores 👩‍💻👨‍💻:

Gerenciarem de maneira eficiente o cadastro de professores, Disciplinas e reservas de salas.
O gestor será responsável por cadastrar, visualizar, atualizar e excluir informações relacionadas aos
professores, suas Disciplinas e a reserva de ambientes, garantindo que todas as operações aconteçam
de forma organizada e acessível.
Os Gestores podem cadastrar, visualizar, atualizar e excluir informações sobre professores, suas Disciplinas e as reservas de salas.
Além disso, o sistema oferecerá funcionalidades de autenticação para garantir que apenas os gestores possam realizar
essas operações.

## Professores👨‍🏫👩‍🏫:

Por outro lado, os professores terão acesso ao sistema de forma mais restrita, podendo apenas visualizar
as informações relacionadas às suas Disciplinas e aos ambientes reservados para suas aulas, sem a
possibilidade de realizar alterações.
Os professores terão acesso restrito à visualização das informações
pertinentes às suas atividades.

## EndPoint's ⚡:

token/ - login 
professores/  - consultar e cadastrar professores (de acordo com a permissão)
professores/<int:pk>/  - atualizar e deletar professores (de acordo com a permissão)
disciplinas/ - consultar e cadastrar disciplinas (de acordo com a permissão)
disciplinas/<int:pk>/  - atualizar e deletar disciplinas (de acordo com a permissão)
reservaAmbiente/ - consultar e cadastrar reservas (de acordo com a permissão)
reservaAmbiente/<int:pk>/ - atualizar e deletar disciplinas (de acordo com a permissão)
professoresReservas/ - professor consulta suas reservas
professoresDisciplinas/ - professor consulta suas disciplinas

# Como Rodar o Projeto - (Back-End)🚀:

** 1️⃣ Clonando o Projeto**
Para rodar o projeto basta clona-lo 
No terminal da sua maquina:
```git clone <URL_DO_REPOSITORIO>```
```cd nome_do_projeto```
```code .```
(Para abrir no VsCode, caso nao tenha instalado, instale e execute o comando novamente)

**Após isso, criar a env e ativa-lá:**

**2️⃣ Ativando a Env**
**No terminal do VsCode:**

```bash
python -m venv env 
cd .\env\Scripts\
.\activate
```

**após isso voltar para a pasta raiz utilizando o comando:**

`cd..` 2 vezes

**Agora instale os requirements:**

**3️⃣ Instalando o Requirements**

```bash
pip install -r requirements.txt 
```

**Caso queira verificar se as dependencias foram instaladas use o comando:**

`pip freeze`


**Agora que já realizou os passos necessarios basta rodar o comando:**
**4️⃣ Rodando o Projeto**

`python .\manage.py runserver `

**✅ Pronto! Agora basta acessar as URLs desejadas. 🚀😃**


## Link da Documentação completa - (documentado no Postman) 📚✨:
https://documenter.getpostman.com/view/41931886/2sB2qWF3HB
