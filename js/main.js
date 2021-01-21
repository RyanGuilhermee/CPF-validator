// exemplos de CPF válido: 705.484.450-52 | 070.987.720-03

class ValidatesCPF {
    constructor(cpf) {
        this.cpf = cpf;
        Object.defineProperty(this, 'cleanCpf', {
            value: this.cpf.replace(/\D+/g, ''),
            writable: false,
            configurable: false,
            enumerable: true
        });
    }

    manipulateCpf() {
        const iterableCpf = Array.from(this.cleanCpf);
        return iterableCpf.slice(0, -2);
    }

    generateFirstDigit() {
        let multi = 10;
        const cpfWithoutLastDigits = this.manipulateCpf();
        const totalFirstDigit = cpfWithoutLastDigits.reduce((ac, el) => {
            ac += multi * Number(el);
            multi--;

            return ac;
        }, 0);

        let firstDigit = 11 - (totalFirstDigit % 11);
        firstDigit = firstDigit > 9 ? 0 : firstDigit;

        cpfWithoutLastDigits.push(firstDigit.toString());
        return cpfWithoutLastDigits;
    }

    generateSecondDigit() {
        let multi = 11;
        const cpfWithoutLastDigit = this.generateFirstDigit();
        const totalSecondDigit = cpfWithoutLastDigit.reduce((ac, el) => {
            ac += multi * Number(el);
            multi--;

            return ac;
        }, 0);

        let SecondDigit = 11 - (totalSecondDigit % 11);
        SecondDigit = SecondDigit > 9 ? 0 : SecondDigit;

        cpfWithoutLastDigit.push(SecondDigit.toString());
        return cpfWithoutLastDigit;
    }

    validateCpf() {
        let generatedCpf = this.generateSecondDigit();
        generatedCpf = generatedCpf.join('');

        if (this.cleanCpf.charAt(0).repeat(11) === this.cleanCpf) return 'CPF inválido';

        //console.log(generatedCpf + ' é igual a ' + this.cleanCpf + '?');
        return generatedCpf === this.cleanCpf ? 'CPF válido' : 'CPF inválido';

    }
}

const cpf = new ValidatesCPF('705.484.450-52');
console.log(cpf.validateCpf());

