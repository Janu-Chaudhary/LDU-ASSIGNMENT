# LDU Matrix Factorization
Live demo - https://graceful-tartufo-c9a93f.netlify.app/

A web-based interactive tool for **LDU Matrix Decomposition**, built as a college group assignment.

Given any invertible matrix **A**, this tool computes its factorization into:

```
A = L × D × U
```

where **L** is a unit lower triangular matrix, **D** is a diagonal matrix, and **U** is a unit upper triangular matrix.

---

## Features

- **Interactive Calculator** — Enter any matrix (up to 8×8) and instantly get L, D, U matrices
- **Auto Verification** — Result is verified by computing L × D × U and checking against the original matrix
- **Theory Page** — Explanation of LDU decomposition with properties, applications, and a worked example
- **Documentation** — Algorithm breakdown, file structure, and usage guide
- **Team Page** — Group member profiles with photos

---

## Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Page structure |
| CSS3 | Styling and layout |
| Vanilla JavaScript | LDU decomposition algorithm |

---

## Algorithm

The decomposition uses **Gaussian Elimination without pivoting**:

1. For each pivot `k`, store `D[k][k] = a[k][k]`
2. Compute lower multipliers: `L[i][k] = a[i][k] / a[k][k]`
3. Eliminate entries below pivot
4. Compute upper row: `U[k][j] = a[k][j] / D[k][k]`

**Time complexity:** `O(n³)` &nbsp;|&nbsp; **Space complexity:** `O(n²)`

---

## Project Structure

```
LDU-ASSIGNMENT/
├── main.html           # Home / landing page
├── Ldu.html            # Calculator page
├── javascript.js       # LDU decomposition algorithm
├── Ldu.css             # Calculator styles
├── theory.html         # Theory and explanation
├── theory.css          # Theory page styles
├── documentation.html  # Project documentation
├── Group.html          # Team members page
├── group.css           # Team page styles
├── main.css            # Home page styles
└── bg.webp             # Background image
```

## Group Members

- Anushree Mishra
- Janu Chaudhary
- Manish Chhaba
- Rajeev Yadav
- Vinay Kumar Gupta
