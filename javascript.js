// Global matrix storage
let matrixData = [];
let matrixDimension = 0;

function generateMatrixInputs() {
  const dimension = parseInt(document.getElementById("dimension").value);

  if (!dimension || dimension < 1 || dimension > 8) {
    alert("Please enter a valid dimension between 1 and 8.");
    return;
  }

  matrixDimension = dimension;
  matrixData = [];

  const container = document.getElementById("matrixContainer");
  container.innerHTML = "";

  // Create input grid
  const table = document.createElement("table");
  table.style.cssText = "border-collapse: separate; border-spacing: 6px; margin: 1rem 0;";

  for (let i = 0; i < dimension; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < dimension; j++) {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.className = "matrix-input";
      input.id = `cell_${i}_${j}`;
      input.placeholder = `a${i+1}${j+1}`;
      input.step = "any";
      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  container.appendChild(table);

  document.getElementById("Decompose").style.display = "inline-block";
  const line = document.getElementById("line");
  line.textContent = `Your given matrix "A" (${dimension}x${dimension}) is:`;
  line.classList.add("visible");

  document.getElementById("result").innerHTML = "";
}

function readMatrixFromInputs() {
  const n = matrixDimension;
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
      const val = parseFloat(document.getElementById(`cell_${i}_${j}`).value);
      if (isNaN(val)) {
        alert(`Please fill all values. Missing at row ${i+1}, column ${j+1}.`);
        return null;
      }
      matrix[i][j] = val;
    }
  }
  return matrix;
}

function calculateLU() {
  const A = readMatrixFromInputs();
  if (!A) return;

  const n = matrixDimension;
  const a = A.map(row => [...row]);

  const L = Array.from({length: n}, (_, i) =>
    Array.from({length: n}, (_, j) => (i === j ? 1 : 0))
  );
  const D = Array.from({length: n}, () => Array(n).fill(0));
  const U = Array.from({length: n}, (_, i) =>
    Array.from({length: n}, (_, j) => (i === j ? 1 : 0))
  );

  try {
    for (let k = 0; k < n; k++) {
      if (Math.abs(a[k][k]) < 1e-12) {
        document.getElementById("result").innerHTML =
          `<div style="color:red; padding:1rem; background:#fff5f5; border-radius:8px; border-left:4px solid red;">
            LDU decomposition failed: Zero pivot at position (${k+1}, ${k+1}).<br>
            This matrix may be singular or require row permutation.
          </div>`;
        return;
      }

      D[k][k] = a[k][k];

      for (let i = k + 1; i < n; i++) {
        L[i][k] = a[i][k] / a[k][k];
        for (let j = k; j < n; j++) {
          a[i][j] -= L[i][k] * a[k][j];
        }
      }

      for (let j = k + 1; j < n; j++) {
        U[k][j] = a[k][j] / D[k][k];
      }
    }
  } catch (e) {
    document.getElementById("result").innerHTML =
      `<div style="color:red;">Error: ${e.message}</div>`;
    return;
  }

  displayResults(A, L, D, U, n);
}

function formatNum(val) {
  if (Number.isInteger(val)) return val.toString();
  return parseFloat(val.toFixed(4)).toString();
}

function matrixToHTML(matrix, label, color) {
  const n = matrix.length;
  let html = `
    <div style="display:inline-block; margin:0.8rem; vertical-align:top; text-align:center;">
      <div style="font-weight:700; font-size:1.2rem; color:${color}; margin-bottom:0.5rem;">${label}</div>
      <div style="display:inline-flex; align-items:center; gap:4px;">
        <span style="font-size:2.5rem; color:#555; font-weight:300;">[</span>
        <table style="border-collapse:separate; border-spacing:4px;">`;

  for (let i = 0; i < n; i++) {
    html += "<tr>";
    for (let j = 0; j < n; j++) {
      const val = formatNum(matrix[i][j]);
      html += `<td style="width:60px;height:38px;text-align:center;
        background:${color}18;border-radius:6px;
        font-size:0.95rem;font-weight:500;color:#2d3436;
        border:1.5px solid ${color}44;">${val}</td>`;
    }
    html += "</tr>";
  }

  html += `</table>
        <span style="font-size:2.5rem;color:#555;font-weight:300;">]</span>
      </div>
    </div>`;
  return html;
}

function multiplyMatrices(A, B) {
  const n = A.length;
  const C = Array.from({length: n}, () => Array(n).fill(0));
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      for (let k = 0; k < n; k++)
        C[i][j] += A[i][k] * B[k][j];
  return C;
}

function displayResults(A, L, D, U, n) {
  const resultDiv = document.getElementById("result");
  const LDU = multiplyMatrices(multiplyMatrices(L, D), U);
  let maxError = 0;
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      maxError = Math.max(maxError, Math.abs(LDU[i][j] - A[i][j]));
  const verified = maxError < 1e-8;

  resultDiv.innerHTML = `
    <div style="margin-top:1.5rem;">
      <h3 style="color:#2d3436;font-size:1.3rem;margin-bottom:1rem;
          border-bottom:2px solid #e0e0e0;padding-bottom:0.5rem;">
        LDU Decomposition Result — A = L x D x U
      </h3>
      <div style="overflow-x:auto;padding:0.5rem 0;">
        <div style="display:flex;align-items:center;flex-wrap:wrap;gap:0.5rem;font-size:1.4rem;color:#555;">
          ${matrixToHTML(A, "A (Input)", "#6c757d")}
          <span style="font-size:2rem;font-weight:300;">=</span>
          ${matrixToHTML(L, "L (Lower)", "#3b82f6")}
          <span style="font-size:2rem;font-weight:300;">x</span>
          ${matrixToHTML(D, "D (Diagonal)", "#10b981")}
          <span style="font-size:2rem;font-weight:300;">x</span>
          ${matrixToHTML(U, "U (Upper)", "#f59e0b")}
        </div>
      </div>
      <div style="margin-top:1.2rem;padding:0.8rem 1rem;
          background:${verified ? '#f0fdf4' : '#fff5f5'};border-radius:8px;
          border-left:4px solid ${verified ? '#10b981' : '#ef4444'};font-size:0.95rem;">
        ${verified
          ? `Verified: L x D x U = A (max error: ${maxError.toExponential(2)})`
          : `Verification failed. Max error: ${maxError.toExponential(2)}`}
      </div>
      <div style="margin-top:1rem;padding:0.8rem 1rem;background:#f8f9fa;
          border-radius:8px;font-size:0.9rem;color:#555;">
        <strong>L</strong> = Unit Lower Triangular &nbsp;|&nbsp;
        <strong>D</strong> = Diagonal (pivots) &nbsp;|&nbsp;
        <strong>U</strong> = Unit Upper Triangular
      </div>
    </div>
  `;
}
