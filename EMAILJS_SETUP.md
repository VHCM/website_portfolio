Guia rápido para configurar EmailJS e permitir o envio de mensagens do formulário

1) Criar conta no EmailJS
- Acesse https://www.emailjs.com/ e crie uma conta gratuita.

2) Adicionar um serviço (email provider)
- Em "Email Services" adicione um serviço (ex: Gmail, ou use SMTP se preferir).
- Após adicionar, você terá um `service_id` (ex: `service_xxx`).

3) Criar um template de e-mail
- Em "Email Templates" crie um novo template. No corpo do template, use as variáveis que o formulário envia, por exemplo:
  - `{{from_name}}`
  - `{{from_email}}`
  - `{{subject}}`
  - `{{message}}`
  - `{{to_email}}`
- Salve o template e anote o `template_id` (ex: `template_xxx`).

4) Obter seu `user_id`
- Em "Integration" você verá algo como `user_xxxxxxxxx`. Copie esse `user_id`.

5) Preencher a configuração no projeto
- Abra `js/main.js` e localize o objeto `CONFIG.emailjs` no topo do arquivo.
- Preencha os valores:
  ```js
  emailjs: {
    userId: 'user_xxxxx',
    serviceId: 'service_xxx',
    templateId: 'template_xxx'
  }
  ```

6) Testar localmente
- Sirva o site via HTTP (algumas funcionalidades exigem contexto seguro):

  - Python 3 (na pasta do site):
    ```powershell
    python -m http.server 8000
    ```

  - Ou, se preferir, com Node.js (instale `serve`):
    ```powershell
    npx serve -s . -l 8000
    ```

- Abra `http://localhost:8000` no navegador e teste o formulário em "Contato".

7) Notas de segurança e recomendações
- O `user_id` do EmailJS é uma chave pública pensada para ser usada no cliente; caso precise de maior segurança, implemente um backend para enviar e-mails com credenciais secretas.
- Verifique seu provedor de e-mail (Gmail pode exigir configurações adicionais/APP Password quando usar SMTP).

Se quiser, posso inserir os IDs diretamente no arquivo `js/main.js` se você me fornecer `userId`, `serviceId` e `templateId`.
