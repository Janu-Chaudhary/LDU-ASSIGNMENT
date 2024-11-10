function generateMatrixInputs() {
  const dimension = parseInt(document.getElementById("dimension").value);

  if (dimension < 1) {
      alert("Please enter a valid positive number.");
      return;

    }


  for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
          const value = parseFloat(prompt(`Enter value for A[${i + 1}][${j + 1}]:`)) || 0;
      }
  }

  alert("Matrix generated successfully! Click 'Decompose' to see LDU decomposition.");
}

