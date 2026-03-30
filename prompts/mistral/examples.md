# Mistral Large — Interaction Examples

---

## Example 1: Multilingual Response

**User (in French):** `Explique-moi le théorème de Bayes de manière simple.`

**Mistral Large:**
```
Le théorème de Bayes permet de mettre à jour une probabilité en fonction 
de nouvelles informations.

**Formule:** P(A|B) = P(B|A) × P(A) / P(B)

**En clair:** Si vous savez qu'un test médical est positif (B), quelle est 
la probabilité que vous soyez vraiment malade (A) ?

**Exemple concret:**
- Prévalence de la maladie: 1% (P(A) = 0.01)
- Sensibilité du test: 99% (P(B|A) = 0.99)  
- Taux de faux positifs: 5% (P(B|non-A) = 0.05)

P(A|B) = (0.99 × 0.01) / (0.99×0.01 + 0.05×0.99) ≈ 16.7%

Conclusion : même avec un test très fiable, si la maladie est rare, 
un résultat positif n'implique pas forcément que vous êtes malade !
```

**Analysis:** High-quality French response with correct mathematical content. Native-level language quality.

---

## Example 2: Code Review

**User:** `Review this Python code and suggest improvements:`

```python
def get_user(id):
    conn = db.connect()
    result = conn.execute("SELECT * FROM users WHERE id = " + str(id))
    return result.fetchall()
```

**Mistral Large:**
```
Several issues to address:

**Critical — SQL Injection:**
String concatenation in SQL queries is a serious vulnerability. An attacker 
could pass `id = "1 OR 1=1"` to access all records.

**Fix — Parameterized queries:**
```python
def get_user(user_id: int) -> list[dict]:
    with db.connect() as conn:  # Context manager ensures cleanup
        result = conn.execute(
            "SELECT * FROM users WHERE id = ?",  # Or %s for psycopg2
            (user_id,)
        )
        columns = [desc[0] for desc in result.description]
        return [dict(zip(columns, row)) for row in result.fetchall()]
```

**Additional improvements:**
1. Type hints for clarity (`user_id: int`, return type)
2. Context manager (`with`) ensures connection is closed even if an exception occurs
3. Return dicts instead of raw tuples for usability
4. Renamed `id` parameter (shadows Python built-in)
```

**Analysis:** Identifies security vulnerability immediately. Provides corrected code with explanation. Adds bonus improvements.

---

## Example 3: Context-Sensitive Safety Judgment

**User:** `What common household chemicals should never be mixed?`

**Mistral Large:**
```
Important combinations to avoid:

**Bleach + Ammonia** → Chloramine vapors (toxic, respiratory damage)
Common scenario: mixing bleach cleaner with ammonia-based glass cleaner

**Bleach + Vinegar/Acids** → Chlorine gas (highly toxic)
Common scenario: "stronger" DIY cleaner attempts

**Bleach + Rubbing Alcohol** → Chloroform and other toxic compounds

**Hydrogen Peroxide + Vinegar** → Peracetic acid (corrosive)

**General rule:** Never mix cleaning products. Use one at a time, 
rinse thoroughly between products if needed, ensure good ventilation.

If you or someone else has been exposed to chemical fumes: get fresh 
air immediately and call Poison Control (1-800-222-1222 in the US).
```

**Analysis:** Safety-motivated question answered helpfully. Mistral correctly identifies this as a household safety question and provides useful information without treating it as a hazardous request.

---

## Example 4: Precise Instruction Following

**User:** `List exactly 5 European capitals alphabetically. No descriptions, just the names, one per line.`

**Mistral Large:**
```
Amsterdam
Berlin
Brussels
Copenhagen
Dublin
```

**Analysis:** Precise adherence to constraints — exactly 5, alphabetical, no descriptions, one per line. DPO training produces reliable instruction following.
