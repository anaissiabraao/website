import { jsPDF } from 'jspdf';
import { ProposalData, COMPANY_INFO, SelectedService } from '@/types/services';

export const generateProposalPDF = (data: ProposalData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;

  // Cores da marca
  const primaryColor: [number, number, number] = [0, 168, 214]; // #00a8d6
  const darkColor: [number, number, number] = [31, 41, 55];
  const lightGray: [number, number, number] = [156, 163, 175];

  // Função auxiliar para adicionar nova página se necessário
  const checkPageBreak = (neededSpace: number) => {
    if (yPos + neededSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // Função para adicionar cabeçalho em todas as páginas
  const addHeader = () => {
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Anaissi Data Strategy', margin, 10);
  };

  // Função para adicionar rodapé
  const addFooter = (pageNum: number) => {
    doc.setFontSize(8);
    doc.setTextColor(...lightGray);
    doc.setFont('helvetica', 'normal');
    const footerText = `${COMPANY_INFO.address} | ${COMPANY_INFO.phone} | ${COMPANY_INFO.email}`;
    doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text(`Página ${pageNum}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
  };

  // ==================== CAPA ====================
  addHeader();
  
  yPos = 60;
  
  // Título da proposta
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('PROPOSTA', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 15;
  doc.setFontSize(24);
  doc.setTextColor(...darkColor);
  doc.text('COMERCIAL', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 40;
  
  // Nome do projeto
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkColor);
  const projectLines = doc.splitTextToSize(data.projectTitle, pageWidth - 2 * margin);
  doc.text(projectLines, pageWidth / 2, yPos, { align: 'center' });
  
  yPos += projectLines.length * 10 + 30;
  
  // Informações do cliente
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  doc.text('Preparado para:', margin, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'bold');
  doc.text(data.clientName, margin, yPos);
  yPos += 6;
  
  doc.setFont('helvetica', 'normal');
  if (data.clientCompany) {
    doc.text(data.clientCompany, margin, yPos);
    yPos += 6;
  }
  doc.text(data.clientEmail, margin, yPos);
  yPos += 6;
  doc.text(data.clientPhone, margin, yPos);
  
  // Data
  yPos = pageHeight - 40;
  doc.setFontSize(10);
  doc.setTextColor(...lightGray);
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  doc.text(currentDate, pageWidth / 2, yPos, { align: 'center' });
  
  addFooter(1);

  // ==================== PÁGINA 2: APRESENTAÇÃO ====================
  doc.addPage();
  addHeader();
  yPos = 30;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('Apresentação', margin, yPos);
  
  yPos += 15;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  
  const presentation = [
    'A Anaissi Data Strategy é uma empresa especializada em soluções digitais inovadoras,',
    'focada em transformar negócios através da tecnologia.',
    '',
    'Nossa missão é entregar soluções de alta qualidade que impulsionem o crescimento',
    'e a eficiência dos nossos clientes, combinando expertise técnica com atendimento',
    'personalizado.',
    '',
    'Nossos diferenciais:',
    '• Equipe especializada e experiente',
    '• Tecnologias modernas e atualizadas',
    '• Suporte contínuo e dedicado',
    '• Foco em resultados mensuráveis',
    '• Prazos e orçamentos transparentes',
  ];
  
  presentation.forEach(line => {
    doc.text(line, margin, yPos);
    yPos += 6;
  });
  
  addFooter(2);

  // ==================== PÁGINA 3: DESCRIÇÃO DO PROJETO ====================
  doc.addPage();
  addHeader();
  yPos = 30;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('Descrição do Projeto', margin, yPos);
  
  yPos += 15;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  
  const descLines = doc.splitTextToSize(data.projectDescription, pageWidth - 2 * margin);
  descLines.forEach((line: string) => {
    checkPageBreak(10);
    doc.text(line, margin, yPos);
    yPos += 6;
  });
  
  addFooter(3);

  // ==================== PÁGINA 4+: SERVIÇOS E VALORES ====================
  doc.addPage();
  addHeader();
  yPos = 30;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('Serviços e Investimento', margin, yPos);
  
  yPos += 15;

  // Tabela de serviços
  data.services.forEach((service: SelectedService, index: number) => {
    checkPageBreak(40);
    
    // Linha do serviço
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 30, 'F');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkColor);
    doc.text(`${index + 1}. ${service.name}`, margin + 5, yPos + 2);
    
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...lightGray);
    const serviceDescLines = doc.splitTextToSize(service.description, pageWidth - 2 * margin - 80);
    doc.text(serviceDescLines, margin + 5, yPos);
    
    // Valor
    const price = service.customPrice || service.priceMax;
    const qty = service.quantity || 1;
    const subtotal = price * qty;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    const priceText = `R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    doc.text(priceText, pageWidth - margin - 5, yPos + 2, { align: 'right' });
    
    if (qty > 1) {
      doc.setFontSize(9);
      doc.setTextColor(...lightGray);
      doc.text(`${qty}x R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 
        pageWidth - margin - 5, yPos + 8, { align: 'right' });
    }
    
    yPos += 25;
    
    // Observações do serviço
    if (service.notes) {
      checkPageBreak(15);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(...lightGray);
      const notesLines = doc.splitTextToSize(`Obs: ${service.notes}`, pageWidth - 2 * margin - 10);
      doc.text(notesLines, margin + 5, yPos);
      yPos += notesLines.length * 5 + 5;
    }
    
    yPos += 5;
  });

  // Total
  checkPageBreak(30);
  yPos += 10;
  
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  
  yPos += 10;
  
  const total = data.services.reduce((sum, s) => {
    const price = s.customPrice || s.priceMax;
    const qty = s.quantity || 1;
    return sum + (price * qty);
  }, 0);
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkColor);
  doc.text('INVESTIMENTO TOTAL:', margin, yPos);
  
  doc.setTextColor(...primaryColor);
  doc.text(`R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 
    pageWidth - margin, yPos, { align: 'right' });

  const currentPageAfterServices = (doc as any).internal.getNumberOfPages();
  addFooter(currentPageAfterServices);

  // ==================== CRONOGRAMA ====================
  doc.addPage();
  addHeader();
  yPos = 30;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('Cronograma', margin, yPos);
  
  yPos += 15;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  
  doc.text(`Prazo de entrega estimado: ${data.deliveryDate}`, margin, yPos);
  yPos += 10;
  
  doc.text('O cronograma detalhado será definido após aprovação da proposta,', margin, yPos);
  yPos += 6;
  doc.text('considerando a complexidade e interdependência dos serviços contratados.', margin, yPos);

  const currentPageAfterTimeline = (doc as any).internal.getNumberOfPages();
  addFooter(currentPageAfterTimeline);

  // ==================== CONDIÇÕES DE PAGAMENTO ====================
  doc.addPage();
  addHeader();
  yPos = 30;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('Condições de Pagamento', margin, yPos);
  
  yPos += 15;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  
  const paymentLines = doc.splitTextToSize(data.paymentTerms, pageWidth - 2 * margin);
  paymentLines.forEach((line: string) => {
    doc.text(line, margin, yPos);
    yPos += 6;
  });

  const currentPageAfterPayment = (doc as any).internal.getNumberOfPages();
  addFooter(currentPageAfterPayment);

  // ==================== GARANTIAS E DIFERENCIAIS ====================
  doc.addPage();
  addHeader();
  yPos = 30;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('Garantias e Diferenciais', margin, yPos);
  
  yPos += 15;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  
  const guarantees = [
    '✓ Garantia de 90 dias para correção de bugs',
    '✓ Código limpo e documentado',
    '✓ Treinamento para uso das ferramentas',
    '✓ Suporte técnico durante o período de garantia',
    '✓ Entregas parciais para acompanhamento',
    '✓ Comunicação transparente e frequente',
    '✓ Conformidade com LGPD',
  ];
  
  guarantees.forEach(item => {
    doc.text(item, margin, yPos);
    yPos += 8;
  });

  const currentPageAfterGuarantees = (doc as any).internal.getNumberOfPages();
  addFooter(currentPageAfterGuarantees);

  // ==================== OBSERVAÇÕES ====================
  if (data.observations) {
    doc.addPage();
    addHeader();
    yPos = 30;

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text('Observações', margin, yPos);
    
    yPos += 15;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkColor);
    
    const obsLines = doc.splitTextToSize(data.observations, pageWidth - 2 * margin);
    obsLines.forEach((line: string) => {
      checkPageBreak(10);
      doc.text(line, margin, yPos);
      yPos += 6;
    });

    const currentPageAfterObs = (doc as any).internal.getNumberOfPages();
    addFooter(currentPageAfterObs);
  }

  // ==================== ASSINATURA ====================
  doc.addPage();
  addHeader();
  yPos = 30;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('Aceite da Proposta', margin, yPos);
  
  yPos += 20;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  
  doc.text('Ao assinar esta proposta, o cliente concorda com todos os termos,', margin, yPos);
  yPos += 6;
  doc.text('valores e condições apresentados neste documento.', margin, yPos);
  
  yPos += 30;
  
  // Linha de assinatura do cliente
  doc.line(margin, yPos, pageWidth / 2 - 10, yPos);
  yPos += 6;
  doc.setFontSize(10);
  doc.text(data.clientName, margin, yPos);
  yPos += 5;
  doc.text('Cliente', margin, yPos);
  
  // Linha de assinatura da empresa
  yPos -= 11;
  doc.line(pageWidth / 2 + 10, yPos, pageWidth - margin, yPos);
  yPos += 6;
  doc.text(COMPANY_INFO.responsible, pageWidth / 2 + 10, yPos);
  yPos += 5;
  doc.text('Anaissi Data Strategy', pageWidth / 2 + 10, yPos);
  
  yPos += 20;
  
  doc.setFontSize(9);
  doc.setTextColor(...lightGray);
  doc.text('Data: ___/___/______', margin, yPos);
  doc.text('Data: ___/___/______', pageWidth / 2 + 10, yPos);

  const currentPageAfterSignature = (doc as any).internal.getNumberOfPages();
  addFooter(currentPageAfterSignature);

  // ==================== PÁGINA FINAL ====================
  doc.addPage();
  addHeader();
  
  yPos = pageHeight / 2 - 30;
  
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('Obrigado pela confiança!', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 20;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkColor);
  doc.text('Estamos à disposição para esclarecer qualquer dúvida.', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 20;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text(COMPANY_INFO.phone, pageWidth / 2, yPos, { align: 'center' });
  yPos += 8;
  doc.text(COMPANY_INFO.email, pageWidth / 2, yPos, { align: 'center' });

  const finalPage = (doc as any).internal.getNumberOfPages();
  addFooter(finalPage);

  // Salvar PDF
  const fileName = `Proposta_${data.clientName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
  doc.save(fileName);
};
