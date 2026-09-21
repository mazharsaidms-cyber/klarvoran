"""Rebuild the two public factsheets from the website's confirmed source data.

Run via npm run docs:build. Requires reportlab, pypdf and DejaVu Sans fonts.
The PDFs are committed static assets; Python is not required on Vercel.
"""

import json
import os
import sys
from pathlib import Path
from xml.sax.saxutils import escape

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
W, H = A4
M = 38
CW = W - 2 * M
NAVY = colors.HexColor("#1b222e")
GREY = colors.HexColor("#454e5f")
RED = colors.HexColor("#a51116")
TINT = colors.HexColor("#f4f5f6")
LINE = colors.HexColor("#e4e6e9")
FONT_DIR = Path(os.environ.get("PDF_FONT_DIR", "/usr/share/fonts/truetype/dejavu"))
pdfmetrics.registerFont(TTFont("Body", str(FONT_DIR / "DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("BodyBold", str(FONT_DIR / "DejaVuSans-Bold.ttf")))
pdfmetrics.registerFontFamily("Body", normal="Body", bold="BodyBold")


def clean(value):
    return str(value).replace("–", "-").replace("—", "-").replace("‑", "-")


def safe(value):
    return escape(clean(value))


def para(c, text, x, y, width=CW, size=9.2, leading=13.2, color=GREY, bold=False):
    style = ParagraphStyle("text", fontName="BodyBold" if bold else "Body", fontSize=size,
                           leading=leading, textColor=color, spaceAfter=0)
    p = Paragraph(clean(text), style)
    _, height = p.wrap(width, H)
    if y - height < 37:
        raise ValueError(f"Page overflow: {text[:90]}")
    p.drawOn(c, x, y - height)
    return y - height


def heading(c, text, y):
    return para(c, safe(text), M, y, size=11.4, leading=15, color=NAVY, bold=True) - 5


def draw_header(c, eyebrow, title, subtitle):
    c.drawImage(str(ROOT / "public/images/klarvoran-logo.png"), M, H - 70,
                width=153, height=32.7, preserveAspectRatio=True, mask="auto")
    c.setFont("BodyBold", 8)
    c.setFillColor(GREY)
    c.drawRightString(W - M, H - 51, eyebrow)
    c.setStrokeColor(RED)
    c.setLineWidth(2)
    c.line(M, H - 86, W - M, H - 86)
    y = para(c, title, M, H - 98, size=23, leading=28, color=NAVY, bold=True)
    return para(c, subtitle, M, y - 8, size=9.6, leading=14) - 15


def stats(c, y, values):
    height = 51
    c.setFillColor(NAVY)
    c.roundRect(M, y - height, CW, height, 7, fill=1, stroke=0)
    unit = CW / len(values)
    for i, (value, label) in enumerate(values):
        x = M + unit * i + 12
        para(c, safe(value), x, y - 10, width=unit - 20, size=13, leading=17,
             color=colors.white, bold=True)
        para(c, safe(label), x, y - 32, width=unit - 20, size=7.5, leading=10,
             color=colors.HexColor("#e4e6e9"))
    return y - height - 15


def columns(c, y, left_title, left, right_title, right):
    gap = 24
    width = (CW - gap) / 2
    positions = []
    for x, title, body in [(M, left_title, left), (M + width + gap, right_title, right)]:
        p = para(c, title, x, y, width=width, size=10.5, leading=14, color=NAVY, bold=True)
        positions.append(para(c, body, x, p - 6, width=width))
    return min(positions) - 17


def footer(c, site, document):
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.line(M, 118, W - M, 118)
    y = para(c, f'<b>Ihr Kontakt: {safe(site["founder"])}</b> · Gründer und fachliche Leitung',
             M, 106, size=9, leading=12, color=NAVY)
    phone, email, url = site["contact"]["phoneDisplay"], site["contact"]["email"], site["url"]
    contact = (f'<link href="{safe(site["contact"]["phoneHref"])}">{safe(phone)}</link> · '
               f'<link href="mailto:{safe(email)}">{safe(email)}</link> · '
               f'<link href="{safe(url)}">www.klarvoran.de</link>')
    y = para(c, contact, M, y - 4, size=8.5, leading=12)
    address = site["address"]
    para(c, f'Geschäfts- und Postanschrift: {safe(address["street"])}, '
         f'{safe(address["zip"])} {safe(address["city"])}. Keine Coachingtermine vor Ort.',
         M, y - 4, size=7.4, leading=10)
    para(c, f'Stand {document["updatedAt"]} · Informationsblatt, kein Zulassungsnachweis.',
         M, 48, size=7.4, leading=10)
    c.setFont("Body", 7.4)
    c.setFillColor(GREY)
    c.drawRightString(W - M, 39, "1 / 1")


def make_canvas(document):
    output = ROOT / "public" / document["href"].lstrip("/")
    output.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(output), pagesize=A4, pageCompression=1, invariant=1,
                      lang="de-DE", initialFontName="Body")
    c.setTitle(document["title"])
    c.setAuthor("KlarVoran - Mazhar Said")
    c.setSubject(document["description"])
    return c, output


def finish(c, path, y, site, document):
    if y < 134:
        raise ValueError(f"Body collides with footer: {path.name}, y={y:.1f}")
    footer(c, site, document)
    c.showPage()
    c.save()
    reader = PdfReader(path)
    assert len(reader.pages) == 1, "Factsheet must fit on one A4 page"
    text = reader.pages[0].extract_text()
    assert site["contact"]["email"] in text
    assert site["certificate"]["number"] in text
    assert "Informationsblatt" in text
    print(f"{path.relative_to(ROOT)}: 1 page, {path.stat().st_size} bytes")


def measure_sheet(data):
    site, modules, document = data["site"], data["modules"], data["downloads"]["jobcenter"]
    measure, cert, loc = site["measure"], site["certificate"], site["presenceLocation"]
    c, output = make_canvas(document)
    y = draw_header(c, "JOBCENTER & AGENTUR FÜR ARBEIT", "AVGS-Einzelcoaching",
                    safe(measure["title"]))
    y = stats(c, y, [(str(sum(m["ue"] for m in modules)) + " UE", "je 45 Minuten"),
                     ("8 Wochen", "maximale Laufzeit"), ("1:1", "Einzelcoaching"),
                     ("§ 45 SGB III", "AVGS-Maßnahme")])
    y = heading(c, "Zielgruppe und Zugang", y)
    y = para(c, "Arbeitsuchende und von Arbeitslosigkeit bedrohte Personen mit Unterstützungsbedarf "
             "bei beruflicher Orientierung, Stellensuche und Bewerbung. Individuelle Passung, Deutschkenntnisse "
             "und bei Online-Teilnahme die technischen Voraussetzungen werden im Erstgespräch geklärt. "
             "Kostenfrei für Teilnehmende bei passendem, vor Beginn bewilligtem AVGS.", M, y) - 16
    y = heading(c, "Vier Module mit konkreten Arbeitsergebnissen", y)
    style = ParagraphStyle("cell", fontName="Body", fontSize=8.1, leading=11.3, textColor=GREY)
    rows = [[Paragraph("<b>Modul</b>", style), Paragraph("<b>Arbeitsergebnis</b>", style), Paragraph("<b>UE</b>", style)]]
    for m in modules:
        rows.append([Paragraph(safe(m["title"]), style), Paragraph(safe(m["institutionOutcome"]), style),
                     Paragraph(str(m["ue"]), style)])
    table = Table(rows, colWidths=[190, CW - 224, 34])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), TINT), ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LINEBELOW", (0, 0), (-1, -1), 0.5, LINE),
    ]))
    _, height = table.wrap(CW, H)
    table.drawOn(c, M, y - height)
    y -= height + 17
    y = columns(c, y, "Durchführung", f'<b>{safe(loc["name"])}</b><br/>'
                f'{safe(loc["street"])}, {safe(loc["zip"])} {safe(loc["city"])}.<br/>'
                'Präsenz nach Terminbestätigung, online oder hybrid. Keine Hausbesuche.<br/>'
                f'{safe(measure["schedule"])}.',
                "Dokumentation und Abstimmung", "Individueller Coaching-Plan, Sitzungs- und Anwesenheitsdokumentation, "
                "Abschlussbericht und Teilnahmebescheinigung. Gutschein, Förderziel und Teilnahme werden vor dem Start abgestimmt.")
    y = heading(c, "Zulassung und offizieller Eintrag", y)
    y = para(c, f'<b>Träger:</b> CERTQUA {safe(cert["number"])} · Fachbereich 1<br/>'
             f'<b>Maßnahme:</b> {safe(measure["certificateNumber"])} · gültig {safe(measure["approvalFrom"])} '
             f'bis {safe(measure["approvalTo"])}<br/>'
             f'<b>BA:</b> Veranstaltungs-ID {safe(measure["eventId"])} · Anbieter-ID {safe(measure["providerId"])} · '
             f'<link href="{safe(measure["baHref"])}" color="#a51116"><u>Offiziellen Eintrag öffnen</u></link>',
             M, y, size=8.5, leading=12) - 7
    y = para(c, f'Die Zulassungsunterlagen lauten noch auf {safe(cert["holderName"])}. '
             'KlarVoran ist die aktuelle Trägerbezeichnung; die formale Anpassung ist in Bearbeitung. '
             f'<link href="{safe(site["url"] + cert["pdfHref"])}" color="#a51116"><u>Trägerzertifikat</u></link>.',
             M, y, size=7.8, leading=11) - 5
    finish(c, output, y, site, document)


def cooperation_sheet(data):
    site, document = data["site"], data["downloads"]["cooperation"]
    cert = site["certificate"]
    c, output = make_canvas(document)
    y = draw_header(c, "BILDUNGSTRÄGER & SOZIALE EINRICHTUNGEN", "Berufliche Schritte ermöglichen",
                    "Jobcoaching, Bewerbungsmanagement und praxisnahe Workshops als klar vereinbarte Ergänzung Ihrer Angebote.")
    y = heading(c, "Leistungsbausteine nach Ihrem Bedarf", y)
    y = columns(c, y, "Für Bildungsträger", "Abgegrenzte Coaching- und Bewerbungsmodule im Unterauftrag; "
                "projektbezogene Dozenteneinsätze sowie zeitlich begrenzte Vertretung nach Verfügbarkeit. "
                "Einbindung in Ihre fachlichen Abläufe und Dokumentationsvorgaben.",
                "Für soziale Einrichtungen", "Einzelcoaching und Gruppenworkshops für berufliche Orientierung, "
                "Bewerbungen, Vorstellungsgespräche und digitale Bewerbungswege. Als ergänzendes Angebot für Ihre Klientinnen und Klienten.")
    y = heading(c, "Arbeitsweise: verstehen, umsetzen, selbst weitergehen", y)
    steps = [
        ("01  Verstanden werden", "Ausgangslage, vorhandene Fähigkeiten und berufliche Hindernisse klären."),
        ("02  System verstehen", "Anforderungen in verständliche, realistische Arbeitsschritte übersetzen."),
        ("03  Selbst handeln", "Aufgaben praktisch bearbeiten und Verantwortung schrittweise übertragen."),
        ("04  Dranbleiben", "Fortschritte reflektieren und Strategien bei Rückschlägen anpassen."),
    ]
    for title, body in steps:
        y = para(c, f'<b>{title}</b> · {body}', M, y, size=8.9, leading=12.8) - 7
    y -= 7
    y = columns(c, y, "Vereinbarter Leistungsumfang", "Inhalte und Durchführung, dokumentierte Anwesenheiten und "
                "Arbeitsschritte, Ergebnisrückmeldung und gegebenenfalls Abschlussbericht. Art und Umfang richten "
                "sich nach dem konkreten Auftrag.",
                "Rahmen vor dem Start klären", "Zielgruppe, Zeitraum, Kapazität, Räume und Technik, "
                "Vergütung, Zuständigkeiten und Datenschutz werden vor Beauftragung abgestimmt. "
                "Präsenz im Rhein-Main-Gebiet, online oder hybrid - nach Vereinbarung.")
    y = heading(c, "Fachliche Grundlage und Nachweise", y)
    y = para(c, f'<b>AZAV-Trägerzulassung Fachbereich 1</b> durch CERTQUA, Nr. {safe(cert["number"])}. '
             'Praxiserfahrung von Mazhar Said: seit 2026 Dozent für Bewerbungsmanagement und Jobcoaching '
             'beim BWHW; 2025 Jobcoach in einer berufsvorbereitenden Bildungsmaßnahme beim ZfW.',
             M, y) - 15
    y = heading(c, "Klare Grenzen und getrennte Auftragswege", y)
    y = para(c, "Kooperationen und Workshops werden individuell beauftragt. Sie sind nicht automatisch Bestandteil "
             "der eigenen zugelassenen AVGS-Maßnahme. Ein Unterauftrag setzt die Erfüllung der jeweiligen "
             "Vertrags- und Maßnahmevorgaben voraus. Keine Therapie, Rechtsberatung oder umfassende Sozialberatung.", M, y) - 8
    y = para(c, f'Zulassungsunterlagen: {safe(cert["holderName"])}; formale Anpassung auf KlarVoran in Bearbeitung. '
             f'<link href="{safe(site["url"] + cert["pdfHref"])}" color="#a51116"><u>Trägerzertifikat</u></link> · '
             f'<link href="{safe(site["url"] + "/fachkraefte-kooperationspartner")}" color="#a51116"><u>Kooperationswege und Details</u></link>',
             M, y, size=7.8, leading=11) - 6
    finish(c, output, y, site, document)


if __name__ == "__main__":
    payload = json.load(sys.stdin)
    measure_sheet(payload)
    cooperation_sheet(payload)
