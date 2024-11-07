// Function to decode a base-encoded value to decimal
function decodeValue(base, encodedValue) {
    return parseInt(encodedValue, base); // Converts encoded value in the specified base to a decimal number
}

// Function to perform Lagrange interpolation and find the constant term
function lagrangeInterpolation(points) {
    const n = points.length;
    let constantTerm = 0;

    for (let i = 0; i < n; i++) {
        let term = points[i].y;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (0 - points[j].x) / (points[i].x - points[j].x);
            }
        }
        constantTerm += term;
    }

    return constantTerm;
}

// Main function to parse JSON input and calculate the constant term
function main(jsonInput) {
    // Parse the JSON input
    const data = JSON.parse(jsonInput);
    const n = data.keys.n;
    const k = data.keys.k;

    // Extract points and decode values
    const points = [];
    for (const key in data) {
        if (key !== 'keys') {
            const x = parseInt(key, 10);
            const base = parseInt(data[key].base);
            const value = data[key].value;

            // Decode the y value in the specified base
            const y = decodeValue(base, value);
            points.push({ x, y });
        }
    }

    // Calculate the constant term using Lagrange interpolation
    const constantTerm = lagrangeInterpolation(points);
    return constantTerm;
}

// Example usage with JSON input as a string
const jsonInput = `{
"keys": {
    "n": 10,
    "k": 7
  },
  "1": {
    "base": "7",
    "value": "420020006424065463"
  },
  "2": {
    "base": "7",
    "value": "10511630252064643035"
  },
  "3": {
    "base": "2",
    "value": "101010101001100101011100000001000111010010111101100100010"
  },
  "4": {
    "base": "8",
    "value": "31261003022226126015"
  },
  "5": {
    "base": "7",
    "value": "2564201006101516132035"
  },
  "6": {
    "base": "15",
    "value": "a3c97ed550c69484"
  },
  "7": {
    "base": "13",
    "value": "134b08c8739552a734"
  },
  "8": {
    "base": "10",
    "value": "23600283241050447333"
  },
  "9": {
    "base": "9",
    "value": "375870320616068547135"
  },
  "10": {
    "base": "6",
    "value": "30140555423010311322515333"
  }
}`;

try {
    const constantTerm = main(jsonInput);
    console.log(`Constant term: ${constantTerm}`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}
