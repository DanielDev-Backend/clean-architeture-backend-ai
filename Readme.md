ts-node-dev --respawn --transpile-only src/server.ts


Passo a Passo da Construção do Projeto (secure-backend-ai)
Estrutura de Pastas e Arquivos Base

Criação da arquitetura em camadas (src/config, src/errors, src/middlewares, src/routes, src/controllers, src/services, src/repositories).

Configuração do Servidor e Tratamento de Erros (src/app.ts)

Implementação da classe App com Orientação a Objetos (POO), encapsulamento (private), injeção de middlewares globais (express.json(), cors) e rota de health-check (/funciona).

Configuração do middleware centralizado de tratamento de exceções.

Definição dos Erros Personalizados (src/errors/appError.ts e errorMiddleware.ts)

Criação da classe AppError para gerenciar códigos de status HTTP customizados e mensagens de erro controladas.

Configuração do Banco de Dados e Prisma (prisma/schema.prisma e src/config/prisma.ts)

Definição do modelo relacional securityLog no Prisma com os campos id, ipadress, action, riskLevel, details e createdAt.

Inicialização e exportação limpa do PrismaClient.

Camada de Repositório (src/repositories/SecurityLogRepository.ts)

Construção da classe responsável por isolar a comunicação com o banco de dados utilizando o Prisma (prisma.securityLog.create).

Camada de Serviço (src/services/SecurityLogService.ts)

Implementação das regras de negócio, incluindo a normalização de dados sensíveis (ex: conversão do nível de risco para letras maiúsculas via .toUpperCase()).

Camada de Controller (src/controllers/SecurityLogController.ts)

Captura dos dados vindos da requisição HTTP (req.body), tratamento de exceções com blocos try/catch e retornos explícitos tipados (Promise<Response>).

Configuração das Rotas (src/routes/securityLogRoutes.ts)

Mapeamento da rota HTTP POST (/security-logs) conectando a requisição diretamente ao Controller.

Sincronização e Teste de Ponta a Ponta

Execução do comando npx prisma db push para criar fisicamente a tabela no PostgreSQL.

Disparo do payload de teste via Postman obtendo o retorno bem-sucedido 201 Created.