/**
 * Tägliche NLP-Impulse aus Stefans WhatsApp-Status (Galerie auf /coaching).
 * Bilder: public/images-nlp/impulse/<slug>.webp, 900×1600, aus rohdaten/WhatsApp Posts
 * (Umwandlung: sharp, WebP q80). Alt = Kernaussage des Posts – liest Google mit.
 *
 * Neuer Post: Bild als WebP dort ablegen und vorne in die Liste eintragen.
 * Bewusst nicht dabei: der Stallone-Post (erkennbares Promi-Gesicht, § 22 KUG).
 */

export type DailyPost = { slug: string; alt: string };

export const dailyPosts: DailyPost[] = [
  { slug: 'veraenderung-ist-unvermeidbar', alt: 'Veränderung ist unvermeidbar. Widerstand ist optional.' },
  { slug: 'klagen-eleganteste-form', alt: 'Klagen ist die eleganteste Form, die eigene Macht abzugeben.' },
  { slug: 'aerger-dauert-15-sekunden', alt: 'Ärger dauert 15 Sekunden. Wenn wir uns länger ärgern, haben wir uns selbst dafür entschieden.' },
  { slug: 'keine-neue-zukunft', alt: 'Du kannst keine neue Zukunft erschaffen, wenn du an den Emotionen der Vergangenheit festhältst.' },
  { slug: 'leben-ganztagsschule', alt: 'Das Leben ist eine Ganztagsschule. Herausforderungen sind keine Störung deines Lebens – sie sind der Lehrplan.' },
  { slug: 'erkenntnis-ist-gut', alt: 'Erkenntnis ist gut. Veränderung ist besser.' },
  { slug: 'leben-beginnt-wo-plaene-enden', alt: 'Dein Leben beginnt genau da, wo deine Pläne enden.' },
  { slug: 'leiden-das-nicht-wahr-ist', alt: 'Und was, wenn du gerade an etwas leidest, das gar nicht wahr ist?' },
  { slug: 'sicherheit-ist-gefaehrlich', alt: 'Sicherheit ist gefährlich. Ein Schiff ist im Hafen sicher. Doch dafür wurde es nicht gebaut.' },
  { slug: 'andere-ihr-leben-leben-lassen', alt: '„Je mehr du andere ihr Leben leben lässt, desto besser wird auch dein eigenes Leben.“ (Mel Robbins)' },
  { slug: 'drei-grosse-k', alt: 'Wer nur aus dem Kopf lebt, landet oft in den 3 großen K: Krise. Krankheit. Konflikt.' },
  { slug: 'wer-durchs-leben-rast', alt: 'Wer durchs Leben rast, ohne innezuhalten, wird vom Leben angehalten.' },
  { slug: 'es-gibt-keine-probleme', alt: 'Es gibt keine Probleme. Du machst eine Herausforderung zu deinem Problem.' },
  { slug: 'raupe-und-schmetterling', alt: '„Es hat keinen Sinn, der Raupe mehr Klasse zu vermitteln. Du bist als Schmetterling gedacht.“ (Dieter Lange)' },
  { slug: 'leichter-haben', alt: 'Du willst es leichter haben? Dann hör auf, dich zu beschweren.' },
  { slug: 'kontrollparadoxon', alt: 'Das Kontrollparadoxon: Du kontrollierst, um weniger Angst zu haben – und erzeugst dadurch noch mehr Angst.' },
  { slug: 'angst-vor-erfolg', alt: 'Manche fürchten nicht den Misserfolg, sondern den Erfolg.' },
  { slug: 'macht-des-noch', alt: 'Die Macht des Noch: Aus „Ich kann das nicht“ wird „Ich kann das noch nicht“.' },
  { slug: 'selbstverantwortung', alt: 'Selbstverantwortung ist die Fähigkeit, dem Leben zu antworten.' },
  { slug: 'arschengel', alt: 'Ein Arschengel sagt dir nicht immer das, was du hören willst. Aber manchmal genau das, was du hören musst.' },
  { slug: 'opferhaltung', alt: 'Opferhaltung bleibt nicht im Kopf. Sie schreibt sich in dein Gesicht.' },
  { slug: 'das-beste-fuer-die-kinder', alt: '„Das Beste, was wir für die Kinder tun können, ist, sie davor zu bewahren, dass sie so werden wie wir.“' },
  { slug: 'grosse-schlachten', alt: 'Die großen Schlachten des Lebens tragen wir in uns selbst aus.' },
  { slug: 'glueck-ueberwindungspraemie', alt: 'Glück ist eine Überwindungsprämie.' },
  { slug: 'dagegensein', alt: 'Nicht das Leben macht dich kaputt. Dein ständiges Dagegensein tut es.' },
  { slug: 'raus-aus-dem-klagen', alt: 'Raus aus dem Klagen. Rein in deine Macht.' },
  { slug: 'tyrannei-des-wie', alt: 'Die Tyrannei des Wie. Vielleicht ist genau das die falsche Frage.' },
  { slug: 'beziehung-wachstumsort', alt: 'Eine Beziehung ist ein Wachstumsort. Kein Erlösungsort.' },
  { slug: 'immer-dagegen', alt: 'Glückliche Menschen nehmen das Leben, wie es kommt. Unglückliche Menschen sind immer dagegen.' },
  { slug: 'nicht-kontrollieren', alt: 'Du kannst nicht kontrollieren, was andere denken, sagen oder tun.' },
  { slug: 'luegendetektor', alt: 'Dein Problem ist der beste Lügendetektor für deinen Veränderungswillen.' },
  { slug: 'ich-muss', alt: 'Ich muss … Du musst gar nichts. Du willst es.' },
  { slug: 'gut-und-schlecht', alt: 'Gibt es wirklich gut und schlecht? Es passiert weder gut noch schlecht – es passiert einfach.' },
  { slug: 'alles-ist-licht', alt: 'Alles ist Licht. Und Materie sein Spiegel.' },
  { slug: 'liebe-ist-wahrheit', alt: 'Liebe ist nicht nur Wärme, Liebe ist auch Wahrheit.' },
  { slug: 'harte-arbeit', alt: 'Harte Arbeit ist kein Zeichen von Tugend.' },
  { slug: 'lmaa', alt: 'Mein Motto fürs Leben: LMAA. Lache mehr als andere.' },
  { slug: 'mauer-um-dein-herz', alt: 'Die Mauer um dein Herz mag von außen Schutz sein. Doch von innen ist sie ein Gefängnis.' },
  { slug: 'zebras', alt: 'Rassismus ist, wenn weiße Zebras mit schwarzen Streifen schwarze Zebras mit weißen Streifen hassen.' },
  { slug: 'then-why-worry', alt: 'Do you have a problem? Can you do something about it? Then why worry?' },
  { slug: 'selbst-heiraten', alt: 'Würdest du dich selbst heiraten?' },
  { slug: 'krisen-produktiv', alt: 'Krisen sind der produktivste Zustand.' },
  { slug: 'groll-und-wut', alt: 'Groll oder Wut auf andere ist so, als würdest du jeden Tag einen Tropfen Arsen trinken und hoffen, der andere stirbt.' },
  { slug: 'warum-stark-genug', alt: 'Wenn dein Warum stark genug ist, findet dein System den Weg zum Wie.' },
  { slug: 'erfolg-hat-keinen-wecker', alt: 'Erfolg hat keinen Wecker.' },
  { slug: 'veraenderung-so-schwer', alt: 'Warum fällt Veränderung so schwer? Weil wir Kontrolle verlieren.' },
  { slug: 'glaubenssaetze-luegen', alt: '85 % unserer Glaubenssätze sind nichts als Lügen.' },
  { slug: 'wenn-du-dich-veraenderst', alt: 'Wenn du dich veränderst, verändert sich mehr als nur dein eigenes Leben.' },
  { slug: 'wer-mich-aergert', alt: '„Wer mich ärgert, bestimme immer noch ich.“ (Karin Kuschik)' },
  { slug: 'nebenprodukte', alt: 'Glück und Erfolg sind Nebenprodukte.' },
  { slug: 'waehrung-zeit', alt: 'Die wahre Währung des Lebens ist Zeit.' },
  { slug: 'nicht-negativ-denken', alt: 'Du kannst nicht negativ denken und positiv fühlen wollen.' },
  { slug: 'hier-und-jetzt', alt: 'Die beste Möglichkeit, dem Göttlichen zu danken, ist die Vergangenheit hinter sich zu lassen und im Hier und Jetzt zu leben.' },
  { slug: 'perfektionist', alt: 'Der Perfektionist konzentriert sich aufs Ziel und vernachlässigt dadurch die Gegenwart.' },
  { slug: 'denken-hilft-zwar', alt: '„Denken hilft zwar, nützt aber nichts.“ (Dan Ariely, deutscher Buchtitel)' },
  { slug: 'nicht-wollen-was-du-willst', alt: '„Du kannst tun, was du willst. Aber du kannst nicht wollen, was du willst.“ (nach Arthur Schopenhauer)' },
  { slug: 'was-du-tolerierst', alt: 'Du bekommst im Leben nicht das, was du verdienst. Du bekommst das, was du tolerierst.' },
];

export const postSrc = (slug: string) => `/images-nlp/impulse/${slug}.webp`;
