function eval() {
    // Do not use eval!!!
    return;
}

class ExpressionError extends Error {
    constructor(message) {
      super(message);
      this.name = "ExpressionError";
    }
  }

function applyOp(a, b, op) {
    switch (op) {
        case '+':
            return a + b;
            break;
        case '-':
            return a - b;
            break;
        case '*':
            return a * b;
            break;
        case '/':
            if (b === 0) {
                throw new TypeError("TypeError: Division by zero.");
            }
            return a / b;
            break;
    }
}

function precedence(op) {
    if (op == "+" || op == "-") {
        return 1;
    }

    if (op == "*" || op == "/") {
        return 2;
    }

    return 0;
}

function expressionCalculator(expr) {
    // write your solution here
    
    if ((expr.match(/\(/g) || []).length !== (expr.match(/\)/g) || []).length) {
        throw new ExpressionError("ExpressionError: Brackets must be paired");
    }

    let values = [];
    let ops = [];
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] == ' ') continue;
        else if (expr[i] == '(') {
            ops.push(expr[i]);
        }

        else if (!isNaN(expr[i])) {
            let val = 0;
            while (i < expr.length && expr[i] >= '0' && expr[i] <= '9') {
                val = (val * 10) + parseInt(expr[i]);
                i++;
            }
            i--;
            values.push(val);
        }

        else if (expr[i] == '(') {
            while (ops.length !== 0 && ops[ops.length - 1] != '(') {
                let val2 = values[values.length - 1];
                values.pop();

                let val1 = values[values.length - 1];
                values.pop();

                let op = ops[ops.length - 1];
                ops.pop();

                values.push(applyOp(val1, val2, op));
            }

            if (ops.length !== 0) {
                ops.pop();
            }

        }

        else {
            while (ops.length !== 0 && precedence(ops[ops.length - 1]) >= precedence(expr[i])) {
                let val2 = values[values.length - 1];
                values.pop();

                let val1 = values[values.length - 1];
                values.pop();

                let op = ops[ops.length - 1];
                ops.pop();

                values.push(applyOp(val1, val2, op));
            }

            ops.push(expr[i]);
        }
    }

    while (ops.length !== 0) {
        let val2 = values[values.length - 1];
        values.pop();

        let val1 = values[values.length - 1];
        values.pop();

        let op = ops[ops.length - 1];
        ops.pop();

        values.push(applyOp(val1, val2, op));
    }

    return values[values.length - 1];
}

module.exports = {
    expressionCalculator
}