const MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'Este e-mail já está cadastrado. Tente fazer login.',
  'auth/invalid-email': 'O e-mail informado não é válido.',
  'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
  'auth/user-not-found': 'Não encontramos uma conta com este e-mail.',
  'auth/wrong-password': 'E-mail ou senha incorretos.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde um pouco e tente novamente.',
  'auth/network-request-failed': 'Falha de conexão. Verifique sua internet.',
};
 
export function translateAuthError(error: unknown): string {
  const code = (error as { code?: string })?.code;
  if (code && MESSAGES[code]) {
    return MESSAGES[code];
  }
  return 'Não foi possível concluir a operação. Tente novamente.';
}
 