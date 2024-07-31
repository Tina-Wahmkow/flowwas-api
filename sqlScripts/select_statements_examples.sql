/* 
    fuzzy kann leider nicht zusammen mit syn (à la 'SYN(FUZZY(rot))') verwendet werden. Das ist syntaktisch nicht möglich
    Würde man zunächst die Einträge suchen, die mit fuzzy das Wort 'rot' oder Abweichungen davon (z.B. Konjugationen) entahelten, 
    um dann wieder auf die Synonyme zu schauen, würde man die Abweichungen wieder ausschließen, da SYN auf exakte Übereinstimmung schaut
    Die folgende Query habe ich als Beispiel dazu geschrieben:
 */

WITH flower_matches1 AS (
  SELECT *
  FROM flowers
  WHERE color IN ('red', 'yellow')
  AND (
    LOWER(name) LIKE '%rose%' OR LOWER(name) LIKE '%tulip%' OR LOWER(name) LIKE '%daisy%'
    OR LOWER(latin_name) LIKE '%rosa%' OR LOWER(latin_name) LIKE '%tulipa%' OR LOWER(latin_name) LIKE '%bellis%'
    OR (CONTAINS(description, 'fuzzy(rot)', 1) > 0)
  )
)
SELECT *
FROM flower_matches1
WHERE CONTAINS(description, 'SYN(rot, flower-thes)', 0) > 0


/* 
    Beispiel Query für unseren Filter mit 3 searchterms
*/
 WITH flower_matches0 AS (
        SELECT *
        FROM flowers
        WHERE color IN ('pink', 'red')

      AND (
        LOWER(name) LIKE '%rose%' OR LOWER(name) LIKE '%königin%' OR LOWER(name) LIKE '%liebe%'
        OR (LOWER(latin_name) LIKE '%rose%' OR LOWER(latin_name) LIKE '%königin%' OR LOWER(latin_name) LIKE '%liebe%')
        OR CONTAINS(description, 'SYN(rose, flower-thes)', 0) > 0
      )
      )
      ,
            flower_matches1 AS (
              SELECT *
              FROM flower_matches0
              WHERE (
                CONTAINS(description, 'SYN(königin, flower-thes)', 0) > 0
              )
            ),
            flower_matches2 AS (
              SELECT *
              FROM flower_matches1
              WHERE (
                CONTAINS(description, 'SYN(liebe, flower-thes)', 0) > 0
              )
            )
      SELECT *
      FROM flower_matches2