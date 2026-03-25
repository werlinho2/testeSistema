const { createClient } = require('c:/Users/WillyCat_WillyKit/Desktop/Teste/node_modules/@supabase/supabase-js');
const sb = createClient('https://qchjosttwjnzhnfutxga.supabase.co', 'sb_publishable_IeamPZqcaWHKkRcRkes3Zg_myc3kiQa');

async function testNotif() {
  console.log("Enviando notificacao de teste via script...");
  const { data, error } = await sb.from('notificacoes').insert({ 
      titulo: 'Sistema Atualizado! 🚀', 
      mensagem: 'As novas automações, gestão de IA (RAG) e a hierarquia da equipe foram implementadas com sucesso no ecossistema.', 
      tipo: 'success' 
  });
  console.log("Fim", data, error);
}

testNotif();
