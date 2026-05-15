import { jsPDF } from 'jspdf';
import type { CompetitorAnalysisResponse } from '@/features/dashboard/types/competitorAnalysis';

export function generateCompetitorAnalysisPDF(analysis: CompetitorAnalysisResponse): Blob {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let y = 20;

  // Helper functions
  const addText = (text: string, size: number = 12, isBold: boolean = false, x: number = margin) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.text(text, x, y);
    y += size * 0.5;
  };

  const addLine = () => {
    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
  };

  const checkPageBreak = (spaceNeeded: number = 50) => {
    if (y + spaceNeeded > doc.internal.pageSize.height - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Safely get values with defaults
  const userUrl = analysis?.urls?.user || 'Unknown';
  const competitorUrl = analysis?.urls?.competitor || 'Unknown';
  const mode = analysis?.mode || 'QUICK';
  const createdAt = analysis?.createdAt || new Date().toISOString();
  const durationSeconds = analysis?.analysisMeta?.durationSeconds || 0;
  const userScore = analysis?.overallScores?.user || 0;
  const competitorScore = analysis?.overallScores?.competitor || 0;
  const headline = analysis?.comparisonSummary?.headline || 'Analysis Complete';
  const keyInsight = analysis?.comparisonSummary?.keyInsight || '';
  const encouragement = analysis?.comparisonSummary?.encouragement;
  const analysisId = analysis?.analysisId || 'unknown';

  // Title
  addText('Competitor Analysis Report', 24, true);
  addLine();

  // URLs & Mode
  addText('Comparison Details', 16, true);
  y += 5;
  addText(`Your Website: ${userUrl}`, 11);
  addText(`Competitor: ${competitorUrl}`, 11);
  addText(`Analysis Mode: ${mode.replace(/_/g, ' ')}`, 11);
  addText(`Date: ${new Date(createdAt).toLocaleString()}`, 11);
  addText(`Duration: ${durationSeconds.toFixed(1)} seconds`, 11);
  addLine();

  // Overall Scores
  addText('Overall Scores', 16, true);
  y += 5;
  
  const scoreWidth = (pageWidth - 2 * margin - 20) / 2;
  
  // User Score Box
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, y, scoreWidth, 40, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Your Score', margin + 5, y + 12);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(userScore > competitorScore ? 16 : 185, 
                    userScore > competitorScore ? 185 : 28, 
                    userScore > competitorScore ? 129 : 28);
  doc.text(userScore.toString(), margin + 5, y + 32);
  doc.setTextColor(0, 0, 0);

  // Competitor Score Box
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(margin + scoreWidth + 20, y, scoreWidth, 40, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Competitor Score', margin + scoreWidth + 25, y + 12);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(competitorScore > userScore ? 16 : 185, 
                    competitorScore > userScore ? 185 : 28, 
                    competitorScore > userScore ? 129 : 28);
  doc.text(competitorScore.toString(), margin + scoreWidth + 25, y + 32);
  doc.setTextColor(0, 0, 0);

  y += 50;
  addText(`Result: ${headline}`, 12, true);
  if (keyInsight) {
    addText(keyInsight, 10);
  }
  if (encouragement) {
    addText(encouragement, 10);
  }
  addLine();

  // Strengths
  const whereYouWin = analysis?.comparisonMatrix?.whereYouWin || [];
  if (whereYouWin.length > 0) {
    checkPageBreak();
    addText('Your Strengths', 16, true);
    y += 5;
    whereYouWin.slice(0, 5).forEach((strength) => {
      checkPageBreak(30);
      const metric = strength?.metric || 'Unknown';
      const category = strength?.category || 'General';
      const yourValue = strength?.yourValue || 'N/A';
      const competitorValue = strength?.competitorValue || 'N/A';
      const whatThisMeans = strength?.whatThisMeans || '';
      
      addText(`• ${metric} (${category})`, 11, true);
      addText(`  Your Value: ${yourValue} | Their Value: ${competitorValue}`, 10);
      if (whatThisMeans) {
        addText(`  ${whatThisMeans}`, 9);
      }
      y += 3;
    });
    addLine();
  }

  // Areas to Improve
  const whereYouLose = analysis?.comparisonMatrix?.whereYouLose || [];
  if (whereYouLose.length > 0) {
    checkPageBreak();
    addText('Areas to Improve', 16, true);
    y += 5;
    whereYouLose.slice(0, 5).forEach((weakness) => {
      checkPageBreak(30);
      const metric = weakness?.metric || 'Unknown';
      const category = weakness?.category || 'General';
      const yourValue = weakness?.yourValue || 'N/A';
      const competitorValue = weakness?.competitorValue || 'N/A';
      const whatThisMeans = weakness?.whatThisMeans || '';
      
      addText(`• ${metric} (${category})`, 11, true);
      addText(`  Your Value: ${yourValue} | Their Value: ${competitorValue}`, 10);
      if (whatThisMeans) {
        addText(`  ${whatThisMeans}`, 9);
      }
      y += 3;
    });
    addLine();
  }

  // Quick Wins
  const quickWins = analysis?.quickWins || [];
  if (quickWins.length > 0) {
    checkPageBreak();
    addText('Quick Wins', 16, true);
    y += 5;
    quickWins.slice(0, 5).forEach((win) => {
      checkPageBreak(40);
      const issue = win?.issue || 'Unknown';
      const effort = win?.effort || 'Unknown';
      const impact = win?.impact || 'Unknown';
      const whyItMatters = win?.whyItMatters || '';
      
      addText(`• ${issue}`, 11, true);
      addText(`  Effort: ${effort} | Impact: ${impact}`, 10);
      if (whyItMatters) {
        addText(`  ${whyItMatters}`, 9);
      }
      y += 3;
    });
    addLine();
  }

  // Suggestions
  const suggestions = analysis?.suggestions || [];
  if (suggestions.length > 0) {
    checkPageBreak();
    addText('Detailed Suggestions', 16, true);
    y += 5;
    suggestions.slice(0, 5).forEach((suggestion) => {
      checkPageBreak(50);
      const priorityLabel = (suggestion?.priority || 'low').toUpperCase();
      const issue = suggestion?.issue || 'Unknown';
      const yourMetric = suggestion?.yourMetric || 'N/A';
      const competitorMetric = suggestion?.competitorMetric || 'N/A';
      const whatThisMeans = suggestion?.whatThisMeans || '';
      
      addText(`• [${priorityLabel}] ${issue}`, 11, true);
      addText(`  Your Metric: ${yourMetric}`, 10);
      addText(`  Competitor: ${competitorMetric}`, 10);
      
      // Wrap text for whatThisMeans
      if (whatThisMeans) {
        const splitText = doc.splitTextToSize(whatThisMeans, pageWidth - 2 * margin - 10);
        splitText.forEach((line: string) => {
          checkPageBreak(15);
          addText(`  ${line}`, 9);
        });
      }
      
      y += 3;
    });
  }

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(128, 128, 128);
  doc.text(`Analysis ID: ${analysisId}`, margin, doc.internal.pageSize.height - 10);
  doc.text('Generated by SEO Lens', pageWidth - margin - 50, doc.internal.pageSize.height - 10);
  doc.setTextColor(0, 0, 0);

  return doc.output('blob');
}
