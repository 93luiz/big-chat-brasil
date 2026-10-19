CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (document, document_type, name, password_hash) VALUES
  ('12345678909',    'cpf',  'João da Silva',  crypt('dev12345', gen_salt('bf', 10))),
  ('98765432100',    'cpf',  'Maria Fernandes', crypt('dev12345', gen_salt('bf', 10))),
  ('11222333000181', 'cnpj', 'Solusoft - Soluções de Software', crypt('dev12345', gen_salt('bf', 10)));

  DO $$
DECLARE
  joao INT;
  maria INT;
  solusoft INT;
  conv1 INT;
  conv2 INT;
BEGIN
  SELECT id INTO joao FROM users WHERE document = '12345678909'    AND document_type = 'cpf';
  SELECT id INTO maria   FROM users WHERE document = '98765432100'    AND document_type = 'cpf';
  SELECT id INTO solusoft  FROM users WHERE document = '11222333000181' AND document_type = 'cnpj';

  INSERT INTO conversation (last_message, created_at, updated_at)
  VALUES ('Tá ótimo, até amanhã!', NOW() - INTERVAL '3 hours', NOW() - INTERVAL '1 hour')
  RETURNING id INTO conv1;

  INSERT INTO conversation_user (conversation_id, user_id, reciever_user_id)
  VALUES (conv1, joao, maria), (conv1, maria, joao);

  INSERT INTO message (conversation_id, user_id, type, text, created_at) VALUES
    (conv1, joao, 'text', 'Boa tarde, que horas podemos fazer uma reunião amanhã?', NOW() - INTERVAL '3 hours'),
    (conv1, maria, 'text', 'Às 10:00 estarei livre, pode ser?', NOW() - INTERVAL '2 hours'),
    (conv1, joao, 'text', 'Tá ótimo, até amanhã!', NOW() - INTERVAL '1 hour');


  INSERT INTO conversation (last_message, created_at, updated_at)
  VALUES ('Obrigado', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '30 minutes')
  RETURNING id INTO conv2;

  INSERT INTO conversation_user (conversation_id, user_id, reciever_user_id)
  VALUES (conv2, joao, solusoft), (conv2, solusoft, joao);

  INSERT INTO message (conversation_id, user_id, type, text, created_at) VALUES
    (conv2, joao, 'text', 'Boa tarde, preciso da segunda via do meu boleto', NOW() - INTERVAL '1 hour'),
    (conv2, joao, 'text', 'Boa tarde, estou mandando no seu e-mail', NOW() - INTERVAL '45 minutes'),
    (conv2, solusoft, 'text', 'Obrigado',   NOW() - INTERVAL '30 minutes');
END $$;