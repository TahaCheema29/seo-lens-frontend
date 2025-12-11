import jsPDF from 'jspdf'
import { AnalyzeSiteSeoResponse, CheckStatus } from '@/types/analyzeSiteSEO'

interface PDFColors {
  pass: [number, number, number]
  warning: [number, number, number]
  fail: [number, number, number]
  info: [number, number, number]
  gray: [number, number, number]
  dark: [number, number, number]
}

const colors: PDFColors = {
  pass: [16, 185, 129],      // #10B981
  warning: [245, 158, 11],    // #F59E0B
  fail: [239, 68, 68],       // #EF4444
  info: [59, 130, 246],      // #3B82F6
  gray: [107, 114, 128],     // #6B7280
  dark: [17, 24, 39],        // #111827
}

export function generateSEOReportPDF(data: AnalyzeSiteSeoResponse, baseUrl: string): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 19 // 0.75 inch in mm
  let yPos = margin

  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace: number = 10) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage()
      yPos = margin
    }
  }

  // Helper function to draw rounded rectangle
  const drawRoundedRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    fillColor?: [number, number, number],
    strokeColor?: [number, number, number]
  ) => {
    doc.setLineWidth(0.5)
    if (fillColor) {
      doc.setFillColor(fillColor[0], fillColor[1], fillColor[2])
    }
    if (strokeColor) {
      doc.setDrawColor(strokeColor[0], strokeColor[1], strokeColor[2])
    }
    doc.roundedRect(x, y, width, height, radius, radius, fillColor ? 'FD' : 'D')
  }

  // Helper function to draw status badge
  const drawStatusBadge = (x: number, y: number, status: CheckStatus, width: number = 20, height: number = 6) => {
    const statusColors = {
      [CheckStatus.PASS]: colors.pass,
      [CheckStatus.WARNING]: colors.warning,
      [CheckStatus.FAIL]: colors.fail,
    }
    const color = statusColors[status] || colors.gray
    
    drawRoundedRect(x, y, width, height, 1, color)
    
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    // Center text both horizontally and vertically in the badge
    const textX = x + width / 2
    const textY = y + height / 2 + 2.5 // Adjusted for better vertical centering
    doc.text(status, textX, textY, { align: 'center' })
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
  }

  // Header
  doc.setFontSize(32)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
  doc.text('SEO Audit Report', margin, yPos)
  yPos += 10

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
  doc.text(baseUrl, margin, yPos)
  yPos += 5

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
  doc.text(`Generated on ${dateStr}`, margin, yPos)
  yPos += 15

  // Calculate scores
  let totalChecks = 0
  let totalPass = 0
  let totalWarnings = 0
  let totalFails = 0

  // Count base URL checks
  const baseChecks = [
    data.baseUrlChecks.wwwRedirectCheck,
    data.baseUrlChecks.robotsTxtCheck,
    data.baseUrlChecks.httpsSslCheck,
    data.baseUrlChecks.directoryListingCheck,
    data.baseUrlChecks.expiresHeadersCheck,
    data.baseUrlChecks.cachingAdvice,
  ]

  baseChecks.forEach((check) => {
    if (check) {
      totalChecks++
      if (check.status === CheckStatus.PASS) totalPass++
      else if (check.status === CheckStatus.WARNING) totalWarnings++
      else if (check.status === CheckStatus.FAIL) totalFails++
    }
  })

  // Count URL result checks
  data.urlResults.forEach((result) => {
    const checks = [
      result.titleLengthCheck,
      result.titleKeywordPresence,
      result.metaDescriptionLengthCheck,
      result.metaDescriptionKeywordPresence,
      result.h1Check,
      result.imageAltCheck,
      result.canonicalCheck,
      result.noindexCheck,
      result.openGraphCheck,
      result.schemaValidation,
      result.htmlSizeCheck,
      result.responseTimeCheck,
      result.jsMinificationCheck,
      result.cssMinificationCheck,
      result.mobileResponsiveness,
    ]

    checks.forEach((check) => {
      if (check) {
        totalChecks++
        if (check.status === CheckStatus.PASS) totalPass++
        else if (check.status === CheckStatus.WARNING) totalWarnings++
        else if (check.status === CheckStatus.FAIL) totalFails++
      }
    })
  })

  // Calculate score: PASS = 100%, WARNING = 50%, FAIL = 0% (matching SEOReport.tsx)
  const scorePercentage = totalChecks > 0 
    ? Math.round(((totalPass * 100 + totalWarnings * 50) / totalChecks))
    : 0

  // Score Cards
  checkPageBreak(25)
  const cardWidth = (pageWidth - 2 * margin - 15) / 4
  const cardHeight = 20
  const cardY = yPos

  // Overall Score Card
  drawRoundedRect(margin, cardY, cardWidth, cardHeight, 2, [240, 253, 244])
  doc.setFontSize(11)
  doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
  doc.setFont('helvetica', 'normal')
  doc.text('Overall Score', margin + cardWidth / 2, cardY + 4, { align: 'center' })
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
  doc.text(`${scorePercentage} / 100`, margin + cardWidth / 2, cardY + 14, { align: 'center' })

  // Pages Analyzed Card
  drawRoundedRect(margin + cardWidth + 5, cardY, cardWidth, cardHeight, 2, [239, 246, 255])
  doc.setFontSize(11)
  doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
  doc.setFont('helvetica', 'normal')
  doc.text('Pages Analyzed', margin + cardWidth + 5 + cardWidth / 2, cardY + 4, { align: 'center' })
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
  doc.text(`${data.urlResults.length}`, margin + cardWidth + 5 + cardWidth / 2, cardY + 14, { align: 'center' })

  // Issues Found Card
  drawRoundedRect(margin + (cardWidth + 5) * 2, cardY, cardWidth, cardHeight, 2, [254, 242, 242])
  doc.setFontSize(11)
  doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
  doc.setFont('helvetica', 'normal')
  doc.text('Issues Found', margin + (cardWidth + 5) * 2 + cardWidth / 2, cardY + 4, { align: 'center' })
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
  doc.text(`${totalFails}`, margin + (cardWidth + 5) * 2 + cardWidth / 2, cardY + 14, { align: 'center' })

  // Warnings Card
  drawRoundedRect(margin + (cardWidth + 5) * 3, cardY, cardWidth, cardHeight, 2, [255, 251, 235])
  doc.setFontSize(11)
  doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
  doc.setFont('helvetica', 'normal')
  doc.text('Warnings', margin + (cardWidth + 5) * 3 + cardWidth / 2, cardY + 4, { align: 'center' })
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
  doc.text(`${totalWarnings}`, margin + (cardWidth + 5) * 3 + cardWidth / 2, cardY + 14, { align: 'center' })

  yPos = cardY + cardHeight + 10

  // Base URL Checks Section
  checkPageBreak(30)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
  doc.text('Base URL Configuration', margin, yPos)
  yPos += 8

  const baseCheckItems = [
    { name: 'WWW Redirect Check', check: data.baseUrlChecks.wwwRedirectCheck },
    { name: 'Robots.txt Check', check: data.baseUrlChecks.robotsTxtCheck },
    { name: 'HTTPS SSL Check', check: data.baseUrlChecks.httpsSslCheck },
    { name: 'Directory Listing Check', check: data.baseUrlChecks.directoryListingCheck },
    { name: 'Expires Headers Check', check: data.baseUrlChecks.expiresHeadersCheck },
    { name: 'Caching Advice', check: data.baseUrlChecks.cachingAdvice },
  ]

  baseCheckItems.forEach((item) => {
    if (item.check) {
      checkPageBreak(15)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
      doc.text(item.name, margin, yPos)
      
      const badgeX = pageWidth - margin - 20
      drawStatusBadge(badgeX, yPos - 4, item.check.status)
      
      yPos += 5
      
      if (item.check.description) {
        const description = typeof item.check.description === 'string' 
          ? item.check.description 
          : JSON.stringify(item.check.description)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
        const lines = doc.splitTextToSize(description, pageWidth - 2 * margin - 25)
        doc.text(lines, margin, yPos)
        yPos += lines.length * 4 + 3
      } else {
        yPos += 3
      }
    }
  })

  // Page Analysis Sections
  data.urlResults.forEach((urlData, index) => {
    checkPageBreak(30)
    doc.addPage()
    yPos = margin

    // Page Header
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
    doc.text(`Page ${index + 1}`, margin, yPos)
    yPos += 8

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
    const urlLines = doc.splitTextToSize(urlData.url, pageWidth - 2 * margin)
    doc.text(urlLines, margin, yPos)
    yPos += urlLines.length * 5 + 8

    // Title
    if (urlData.title) {
      checkPageBreak(15)
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
      doc.text('Title', margin, yPos)
      yPos += 6

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
      const titleLines = doc.splitTextToSize(urlData.title, pageWidth - 2 * margin)
      doc.text(titleLines, margin, yPos)
      yPos += titleLines.length * 5 + 3

      if (urlData.titleLengthCheck) {
        drawStatusBadge(pageWidth - margin - 20, yPos - titleLines.length * 5 - 3, urlData.titleLengthCheck.status)
        if (urlData.titleLengthCheck.description) {
          const desc = typeof urlData.titleLengthCheck.description === 'string'
            ? urlData.titleLengthCheck.description
            : JSON.stringify(urlData.titleLengthCheck.description)
          doc.setFontSize(9)
          doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
          const descLines = doc.splitTextToSize(desc, pageWidth - 2 * margin - 25)
          doc.text(descLines, margin, yPos)
          yPos += descLines.length * 4 + 5
        }
      }
      yPos += 3
    }

    // Meta Description
    if (urlData.metaDescription) {
      checkPageBreak(20)
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
      doc.text('Meta Description', margin, yPos)
      yPos += 6

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
      const metaLines = doc.splitTextToSize(urlData.metaDescription, pageWidth - 2 * margin)
      doc.text(metaLines, margin, yPos)
      const metaStartY = yPos
      yPos += metaLines.length * 5 + 3

      if (urlData.metaDescriptionLengthCheck) {
        drawStatusBadge(pageWidth - margin - 20, metaStartY - 4, urlData.metaDescriptionLengthCheck.status)
        if (urlData.metaDescriptionLengthCheck.description) {
          const desc = typeof urlData.metaDescriptionLengthCheck.description === 'string'
            ? urlData.metaDescriptionLengthCheck.description
            : JSON.stringify(urlData.metaDescriptionLengthCheck.description)
          doc.setFontSize(9)
          doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
          const descLines = doc.splitTextToSize(desc, pageWidth - 2 * margin - 25)
          doc.text(descLines, margin, yPos)
          yPos += descLines.length * 4 + 5
        }
      }
    }

    // Meta Keywords
    if (urlData.metaKeywords) {
      checkPageBreak(15)
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
      doc.text('Meta Keywords', margin, yPos)
      yPos += 6

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
      const keywordLines = doc.splitTextToSize(urlData.metaKeywords, pageWidth - 2 * margin)
      doc.text(keywordLines, margin, yPos)
      yPos += keywordLines.length * 5 + 8
    }

    // Title Keyword Presence
    if (urlData.titleKeywordPresence) {
      checkPageBreak(12)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
      doc.text('Title Keyword Presence', margin, yPos)
      drawStatusBadge(pageWidth - margin - 20, yPos - 4, urlData.titleKeywordPresence.status)
      yPos += 5
      if (urlData.titleKeywordPresence.description) {
        const desc = typeof urlData.titleKeywordPresence.description === 'string'
          ? urlData.titleKeywordPresence.description
          : JSON.stringify(urlData.titleKeywordPresence.description)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
        const descLines = doc.splitTextToSize(desc, pageWidth - 2 * margin - 25)
        doc.text(descLines, margin, yPos)
        yPos += descLines.length * 4 + 5
      } else {
        yPos += 3
      }
    }

    // Meta Description Keyword Presence
    if (urlData.metaDescriptionKeywordPresence) {
      checkPageBreak(12)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
      doc.text('Meta Description Keyword Presence', margin, yPos)
      drawStatusBadge(pageWidth - margin - 20, yPos - 4, urlData.metaDescriptionKeywordPresence.status)
      yPos += 5
      if (urlData.metaDescriptionKeywordPresence.description) {
        const desc = typeof urlData.metaDescriptionKeywordPresence.description === 'string'
          ? urlData.metaDescriptionKeywordPresence.description
          : JSON.stringify(urlData.metaDescriptionKeywordPresence.description)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
        const descLines = doc.splitTextToSize(desc, pageWidth - 2 * margin - 25)
        doc.text(descLines, margin, yPos)
        yPos += descLines.length * 4 + 5
      } else {
        yPos += 3
      }
    }

    // H1 Check
    checkPageBreak(15)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
    doc.text('H1 Check', margin, yPos)
    yPos += 6

    if (urlData.h1Check) {
      drawStatusBadge(pageWidth - margin - 20, yPos - 4, urlData.h1Check.status)
      if (urlData.h1Check.description) {
        const desc = typeof urlData.h1Check.description === 'string'
          ? urlData.h1Check.description
          : JSON.stringify(urlData.h1Check.description)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
        const descLines = doc.splitTextToSize(desc, pageWidth - 2 * margin - 25)
        doc.text(descLines, margin, yPos)
        yPos += descLines.length * 4 + 3
      }
      if (urlData.h1) {
        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
        const h1Lines = doc.splitTextToSize(`H1: ${urlData.h1}`, pageWidth - 2 * margin)
        doc.text(h1Lines, margin, yPos)
        yPos += h1Lines.length * 5 + 5
      } else {
        yPos += 3
      }
    } else {
      yPos += 5
    }

    // H2 Optimization
    checkPageBreak(15)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
    doc.text('H2 Optimization', margin, yPos)
    yPos += 6

    const h2Count = urlData.h2Count || 0
    const h2Status = h2Count > 0 ? CheckStatus.PASS : CheckStatus.WARNING
    drawStatusBadge(pageWidth - margin - 20, yPos - 4, h2Status)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
    doc.text(`Found ${h2Count} H2 tags${urlData.h2OptimizationGuidance ? `. ${urlData.h2OptimizationGuidance}` : ''}`, margin, yPos)
    yPos += 8

    // H3
    if (urlData.h3) {
      checkPageBreak(12)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
      doc.text('H3', margin, yPos)
      yPos += 5
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
      const h3Lines = doc.splitTextToSize(`H3: ${urlData.h3}`, pageWidth - 2 * margin)
      doc.text(h3Lines, margin, yPos)
      yPos += h3Lines.length * 5 + 8
    }

    // Image Alt Check
    checkPageBreak(15)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
    doc.text('Image Alt Check', margin, yPos)
    yPos += 6

    if (urlData.imageAltCheck) {
      drawStatusBadge(pageWidth - margin - 20, yPos - 4, urlData.imageAltCheck.status)
      if (urlData.imageAltCheck.description) {
        const desc = typeof urlData.imageAltCheck.description === 'string'
          ? urlData.imageAltCheck.description
          : JSON.stringify(urlData.imageAltCheck.description)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
        const descLines = doc.splitTextToSize(desc, pageWidth - 2 * margin - 25)
        doc.text(descLines, margin, yPos)
        yPos += descLines.length * 4 + 5
      } else {
        yPos += 3
      }
    } else {
      yPos += 5
    }

    // Links Quality
    checkPageBreak(15)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
    doc.text('Links Quality', margin, yPos)
    yPos += 6

    const internalLinks = urlData.internalLinksCount || 0
    const externalLinks = urlData.externalLinksCount || 0
    const linkStatus = internalLinks > 0 && externalLinks > 0 ? CheckStatus.PASS : CheckStatus.WARNING
    drawStatusBadge(pageWidth - margin - 20, yPos - 4, linkStatus)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
    doc.text(`Internal: ${internalLinks}, External: ${externalLinks}${urlData.linksQualityGuidance ? `. ${urlData.linksQualityGuidance}` : ''}`, margin, yPos)
    yPos += 8

    // Additional checks
    const additionalChecks = [
      { label: 'Canonical Check', check: urlData.canonicalCheck, value: urlData.canonical },
      { label: 'Noindex Check', check: urlData.noindexCheck },
      { label: 'Open Graph Check', check: urlData.openGraphCheck },
      { label: 'Schema Validation', check: urlData.schemaValidation },
      { label: 'HTML Size Check', check: urlData.htmlSizeCheck, value: urlData.htmlSizeBytes ? `${(urlData.htmlSizeBytes / 1024).toFixed(1)} Kb` : undefined },
      { label: 'Response Time Check', check: urlData.responseTimeCheck, value: urlData.responseTimeMs ? `${(urlData.responseTimeMs / 1000).toFixed(1)}s` : undefined },
      { label: 'JS Minification', check: urlData.jsMinificationCheck },
      { label: 'CSS Minification', check: urlData.cssMinificationCheck },
      { label: 'Mobile Responsiveness', check: urlData.mobileResponsiveness },
      { label: 'Total Requests', value: urlData.totalRequests ? `${urlData.totalRequests} requests` : undefined },
      { label: 'Core Web Vitals', value: urlData.lcp || urlData.fid || urlData.cls ? `LCP: ${urlData.lcp || 'N/A'}, FID: ${urlData.fid || 'N/A'}, CLS: ${urlData.cls || 'N/A'}` : undefined },
    ]

    additionalChecks.forEach((item) => {
      if (item.check || item.value) {
        checkPageBreak(15)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2])
        doc.text(item.label, margin, yPos)
        
        if (item.check) {
          drawStatusBadge(pageWidth - margin - 20, yPos - 4, item.check.status)
        }
        
        yPos += 5

        if (item.value) {
          doc.setFontSize(9)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
          doc.text(item.value, margin, yPos)
          yPos += 5
        }

        if (item.check?.description) {
          const desc = typeof item.check.description === 'string'
            ? item.check.description
            : JSON.stringify(item.check.description)
          doc.setFontSize(9)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2])
          const descLines = doc.splitTextToSize(desc, pageWidth - 2 * margin - 25)
          doc.text(descLines, margin, yPos)
          yPos += descLines.length * 4 + 5
        } else if (!item.value) {
          yPos += 3
        }
      }
    })
  })

  // Save PDF
  const siteName = baseUrl.replace(/https?:\/\//, '').replace(/www\./, '').split('/')[0]
  const fileName = `SEO_Report_${siteName}_${now.toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}

