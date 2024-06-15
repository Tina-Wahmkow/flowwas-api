/*
    Kp wie man erstellte Relationen löscht. Ich würde einfach nen neuen THesaurus erstellen
*/

/* irgendein index muss noch erstellt werden, kp wie (INDEX) */
EXEC Ctx_Thes.Create_Thesaurus ( 'flower-thes', false );


/* 
    Relationen für Wut
 */
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Wut', 'SYN', 'Hass');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Wut', 'SYN', 'Verachtung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Wut', 'SYN', 'Zorn');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Wut', 'SYN', 'Abscheu');
/* --- */


/* 
    Relationen für Antipathie
 */
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Antipathie', 'SYN', 'Eifersucht');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Antipathie', 'SYN', 'Falscheit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Antipathie', 'SYN', 'Eitelkeit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Antipathie', 'SYN', 'Feindschaft');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Antipathie', 'SYN', 'Selbstverliebtheit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Antipathie', 'SYN', 'Spießigkeit');
/* --- */
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Antipathie', 'SYN', 'Gift');


/* 
    Relationen für Trauer
 */
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Gedenken');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Gedenkveranstaltung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Enttäuschung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Scheidung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Trennung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Vergessen');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Vergänglichkeit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Beerdigung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Bestattung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Todesfall');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Verzweiflung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Leid');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Schmerz');
/* --- */
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Abschied');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Erinnerung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Trauer', 'SYN', 'Tod');




/* 
    Relationen für Angst
*/
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Angst', 'SYN', 'Panik');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Angst', 'SYN', 'Furcht');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Angst', 'SYN', 'Sorge');
/* --- */
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Angst', 'SYN', 'Verlassenheit');


/* 
    ---------------------------------------------------------------------------------
    positive Emotionen
*/

/* 
    Relationen für Freude
*/
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Freude', 'SYN', 'Wärme');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Freude', 'SYN', 'Fröhlichkeit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Freude', 'SYN', 'Lebensfreude');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Freude', 'SYN', 'Glücklich');
/* --- */
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Freude', 'SYN', 'Glückseligkeit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Freude', 'SYN', 'Vorfreude');


/* 
    Relationen für Liebe
*/
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Reinheit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Charme');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Schönheit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Romantik');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Partner');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Partnerschaft');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Jubiläum');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Freundschaft');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Familie');
/* --- */
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Unsterblichkeit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Sehnsucht');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Treue');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Unschuld');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Verführung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Eleganz');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Stabilität');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Zartheit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Zärte');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Anmut');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Zuneigung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Verliebtheit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Sinnlichkeit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Verabredung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Liebe', 'SYN', 'Beziehung');






/* 
    Relationen zu Hoffnug
*/
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Optimismus');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Positiv');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Inspiration');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Ermutigung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Genesung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Heilung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Krankenbesuch');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Krankheitsfall');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Kraft');
/* --- */
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Schutz');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Frühling');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Fruchtbarkeit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Hoffnug', 'SYN', 'Erneuerung');



/* 
    Relationen für Erfolg
*/
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Stolz');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Reichtum');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Leistung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Bestätigung');
/* --- */
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Risiko');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Widerstand');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Glück');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Bewunderung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Selbstliebe');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Eigenliebe');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Perfektion');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Sieg');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Ehre');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Erfolg', 'SYN', 'Wohlstand');




/* 
    Relationen für Dankbarkeit
*/
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Dankbarkeit', 'SYN', 'Zufriedenheit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Dankbarkeit', 'SYN', 'Gelassenheit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Dankbarkeit', 'SYN', 'Wohlbefinden');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Dankbarkeit', 'SYN', 'Wertschätzung');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Dankbarkeit', 'SYN', 'Hilfe');
/* --- */
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Dankbarkeit', 'SYN', 'Demut');



/* 
    Relationen für neutrale Emotionen 
*/
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Gleichgültigkeit', 'SYN', 'Unverbindlichkeit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Gleichgültigkeit', 'SYN', 'Verschlossenheit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Gleichgültigkeit', 'SYN', 'Verschwiegenheit');


/* somehow positiv aber keine Kategorie */
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Ehrlichkeit', 'SYN', 'Aufrichtigkeit');
EXEC Ctx_Thes.Create_Relation('flower-thes', 'Ehrlichkeit', 'SYN', 'Natürlichkeit');


/* siehe erste Zeile */
EXEC ctx_ddl.sync_index('INDEX');