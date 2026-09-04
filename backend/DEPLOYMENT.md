# Publicação da API

Esta API pode ser publicada em qualquer plataforma que aceite Docker, como Render ou Railway. O banco em produção deve ser PostgreSQL; o SQLite é apenas para desenvolvimento local.

## Configuração do serviço

- Diretório do serviço: `backend`
- Dockerfile: `backend/Dockerfile`
- Health check: `/api/health`
- Porta: fornecida automaticamente pela plataforma na variável `PORT`

## Variáveis de ambiente obrigatórias

Configure-as somente no painel da hospedagem, nunca no GitHub:

```text
ENVIRONMENT=production
DATABASE_URL=postgresql+psycopg://USUARIO:SENHA@HOST:5432/NOME_DO_BANCO
JWT_SECRET_KEY=uma-chave-aleatoria-com-no-minimo-32-caracteres
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
ALLOWED_ORIGINS=["https://seu-projeto.vercel.app"]
```

Depois do primeiro deploy do frontend, substitua a origem acima pelo domínio real da Vercel. Se houver domínio próprio, inclua-o também na lista.

## Vercel (frontend)

1. Importe o repositório no painel da Vercel.
2. Escolha `frontend` como **Root Directory**.
3. Defina `VITE_API_URL` como `https://URL-DA-SUA-API/api` nas variáveis de produção.
4. Faça o deploy. O `vercel.json` já preserva as rotas do React ao abrir links diretamente.

## Antes de divulgar

1. Acesse `/api/health` pela URL pública da API.
2. Verifique login, criação de aviso, calendário e leitura pública em uma janela anônima.
3. Teste CORS pelo site da Vercel.
4. Faça um backup do banco PostgreSQL e guarde o acesso apenas com a direção.
