/** Reviewed QM contract text for a single AVGS case. The case's approved UE are supplied explicitly. */
export function participantContractDraft(name: string, totalUe: number): string {
  if (!Number.isSafeInteger(totalUe) || totalUe < 2 || totalUe > 32) throw new Error('Ungültiger Fallumfang.');
  return `Maßnahmevertrag (AVGS Einzelcoaching nach § 45 SGB III)

§1 Vertragspartner
Träger: Mazhar Said – KlarVoran, Kolberger Weg 23, 65931 Frankfurt am Main
Teilnehmende Person: ${name.trim() || '[Name der teilnehmenden Person]'}
Geburtsdatum: [Geburtsdatum ergänzen]
Anschrift: [Anschrift ergänzen]

§2 Rechtsgrundlage und Ziel der Maßnahme
Diese Vereinbarung regelt die Teilnahme an einer Maßnahme zur Aktivierung und beruflichen Eingliederung gemäß § 45 SGB III auf Grundlage eines gültigen Aktivierungs- und Vermittlungsgutscheins (AVGS).
Ziel der Maßnahme ist die nachhaltige Integration der teilnehmenden Person in den Arbeitsmarkt durch individuelle Unterstützung im Bewerbungsprozess, berufliche Orientierung sowie Aktivierung und Stabilisierung.
Die Teilnahme ist nur mit einem gültigen AVGS möglich. Die Finanzierung erfolgt bei Vorliegen eines gültigen AVGS durch den zuständigen Kostenträger. Für die teilnehmende Person entstehen keine zusätzlichen Kosten für Teilnahme, Lernmittel oder Prüfungsgebühren; eine Rechnung an sie erfolgt nicht.
Vor Abschluss des Vertrages erfolgt eine individuelle Eingangsberatung zu Ausgangssituation, Förderzielen, Inhalten, Zugangsvoraussetzungen und Eignung.

§3 Umfang und Durchführung
Gesamtumfang: ${totalUe} UE. Eine Unterrichtseinheit (UE) dauert 45 Minuten. Dieser Umfang entspricht dem individuell für diese Person bewilligten Umfang laut AVGS und Akte.
Die Durchführung erfolgt als Einzelcoaching in Präsenz, online oder hybrid; eine Gruppenmaßnahme ist ausgeschlossen.
Durchführungsform in diesem Fall: [online / Präsenz / hybrid eintragen]
Der konkrete Terminplan wird individuell vereinbart. Vorgaben des jeweiligen AVGS zur Häufigkeit, Gültigkeit und Höchstdauer: [AVGS-Termin- und Fristvorgaben ergänzen]. Die Maßnahme wird in der Regel innerhalb von bis zu 8 Wochen abgeschlossen, soweit der AVGS keine abweichende Höchstdauer vorgibt.

§4 Maßnahmeinhalte
Die Maßnahme orientiert sich am zugelassenen Maßnahmekonzept und umfasst insbesondere Standortbestimmung und Potenzialanalyse; Zieldefinition und individuellen Coachingplan; Bewerbungsunterlagen; Bewerbungsstrategie; Stellenrecherche und Arbeitsmarktorientierung; Vorbereitung auf Vorstellungsgespräche; Aktivierung, Motivation und Stabilisierung; Abschlussgespräch und Auswertung der Zielerreichung. Die Inhalte werden individuell angepasst.
Erforderliche Unterlagen und Materialien stellt der Träger ohne gesonderte Kosten bereit. Sie verbleiben grundsätzlich bei der teilnehmenden Person, sofern keine ausdrückliche Rückgabevereinbarung getroffen wurde.

§5 Mitwirkungspflichten und Verhalten
Die teilnehmende Person hält vereinbarte Termine ein, wirkt aktiv mit, stellt erforderliche Unterlagen bereit, teilt Terminabsagen unverzüglich mit und nimmt respektvoll und kooperativ teil. Bei wiederholter unentschuldigter Nichtteilnahme oder Störungen kann die Maßnahme nach Rücksprache mit dem Kostenträger beendet werden.

§6 Dokumentation und Berichtswesen
Anwesenheiten, Inhalte und Fortschritte werden nachvollziehbar dokumentiert. Nach Abschluss wird ein strukturierter Abschlussbericht erstellt und dem Kostenträger entsprechend übermittelt.

§7 Teilnahmebescheinigung
Nach Abschluss erhält die teilnehmende Person eine Bescheinigung zu Inhalt, tatsächlich absolvierter Dauer und Ziel. Bei vorzeitigem Abbruch werden die bis dahin absolvierten Inhalte und Zeiten bescheinigt.

§8 Beendigung, Kündigung und Rücktritt
Die Maßnahme endet nach vollständiger Durchführung, bei Ablauf der Förderbewilligung, durch Abbruch des Kostenträgers oder bei schwerwiegenden Pflichtverletzungen. Die teilnehmende Person kann jederzeit beenden und vor Beginn jederzeit kostenfrei zurücktreten. Ein Abbruch wird dokumentiert und dem Kostenträger gemeldet. Bei Aufnahme einer sozialversicherungspflichtigen Beschäftigung oder Berufsausbildung mit erreichtem Förderzweck kann die Maßnahme ebenfalls kostenfrei beendet werden. Gleiches gilt bei Widerruf oder Aufhebung der Förderung durch den Kostenträger.

§9 Haftung
Es gelten die gesetzlichen Haftungsregelungen. Dies gilt auch für persönliche Gegenstände der teilnehmenden Person.

§10 Schlussbestimmungen
Änderungen und Ergänzungen werden in Textform festgehalten, soweit keine strengere gesetzliche Form erforderlich ist. Eine elektronische Bestätigung in der App wird der jeweiligen Fassung zugeordnet. Sollten einzelne Bestimmungen unwirksam sein, bleibt der Vertrag im Übrigen wirksam.

§11 Datenschutz
Die Verarbeitung personenbezogener Daten und die Rechte der teilnehmenden Person richten sich nach den gesondert bereitgestellten Datenschutzhinweisen und der DSGVO. Eine gesondert erteilte freiwillige Einwilligung kann mit Wirkung für die Zukunft widerrufen werden.

Ort und Datum: [Ort und Datum ergänzen]
Coach und teilnehmende Person bestätigen jeweils persönlich genau diese Fassung in der App.`;
}

export function participantContractPlaceholderIssue(body: string): string | null {
  return /\[(?:Geburtsdatum|Anschrift|online \/ Präsenz|Ort und Datum|Name der teilnehmenden Person|AVGS-Termin- und Fristvorgaben)[^\]]*\]/i.test(body)
    ? 'Bitte alle Platzhalter im Maßnahmevertrag vor dem Bereitstellen ausfüllen.' : null;
}
