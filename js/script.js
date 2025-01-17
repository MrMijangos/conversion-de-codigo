document.getElementById("boton-convertir").addEventListener("click", convertir);

function convertir() {
    let origen = document.getElementById("idioma-origen").value;
    let destino = document.getElementById("idioma-destino").value;
    let textoOrigen = document.getElementById("texto-origen").value;

    if (textoOrigen.length > 20) {
        alert("¡Solo puedes ingresar hasta 20 caracteres!");
        return;
    }

   
    if (textoOrigen === "") {
        alert("¡Por favor ingresa algo en el campo de texto de origen!");
        return;
    }

   
    if (origen === "decimal" && isNaN(textoOrigen)) {
        alert("¡El valor ingresado no es un número válido para el sistema decimal!");
        return;
    }

    if (origen === "binario" && !/^[01]+$/.test(textoOrigen)) {
        alert("¡El valor binario solo puede contener los dígitos 0 y 1!");
        return;
    }

    if (origen === "octal" && !/^[0-7]+$/.test(textoOrigen)) {
        alert("¡El valor octal solo puede contener los dígitos del 0 al 7!");
        return;
    }

    if (origen === "hexadecimal" && !/^[0-9A-Fa-f]+$/.test(textoOrigen)) {
        alert("¡El valor hexadecimal solo puede contener los dígitos 0-9 y las letras A-F!");
        return;
    }

    if (origen === "ascii" && !/^[\x00-\x7F]*$/.test(textoOrigen)) {
        alert("¡El valor ASCII solo puede contener caracteres ASCII válidos!");
        return;
    }

    let resultado = "";

    if (origen === "decimal" && destino === "binario") {
        resultado = decimalToBinary(textoOrigen);
    } else if (origen === "decimal" && destino === "ascii") {
        resultado = decimalToASCII(textoOrigen);
    } else if (origen === "decimal" && destino === "octal") {
        resultado = decimalToOctal(textoOrigen); 
    } else if (origen === "decimal" && destino === "hexadecimal") {
        resultado = decimalToHexadecimal(textoOrigen); 
    } else if (origen === "binario" && destino === "decimal") {
        resultado = binaryToDecimal(textoOrigen);
    } else if (origen === "binario" && destino === "ascii") {
        resultado = binaryToASCII(textoOrigen);
    } else if (origen === "binario" && destino === "octal") {
        resultado = binaryToOctal(textoOrigen); 
    } else if (origen === "binario" && destino === "hexadecimal") {
        resultado = binaryToHexadecimal(textoOrigen); 
    } else if (origen === "ascii" && destino === "decimal") {
        resultado = asciiToDecimal(textoOrigen);
    } else if (origen === "ascii" && destino === "binario") {
        resultado = asciiToBinary(textoOrigen);
    } else if (origen === "ascii" && destino === "octal") {
        resultado = asciiToOctal(textoOrigen); 
    } else if (origen === "ascii" && destino === "hexadecimal") {
        resultado = asciiToHexadecimal(textoOrigen); 
    } else if (origen === "binario" && destino === "texto") {
        resultado = binaryToTexto(textoOrigen);
    } else if (origen === "decimal" && destino === "texto") {
        resultado = decimalToTexto(textoOrigen);
    } else if (origen === "ascii" && destino === "texto") {
        resultado = asciiToTexto(textoOrigen);
    }

    document.getElementById("texto-destino").value = resultado;
}


function decimalToBinary(decimal) {
    return parseInt(decimal).toString(2); 
}

function decimalToASCII(decimal) {
    return String.fromCharCode(decimal); 
}

function decimalToOctal(decimal) {
    return parseInt(decimal).toString(8); 
}

function decimalToHexadecimal(decimal) {
    return parseInt(decimal).toString(16); 
}

function binaryToDecimal(binario) {
    return parseInt(binario, 2);
}

function binaryToASCII(binario) {
    let resultado = '';
    for (let i = 0; i < binario.length; i += 8) {
        let byte = binario.substr(i, 8); 
        resultado += String.fromCharCode(parseInt(byte, 2)); 
    }
    return resultado;
}

function binaryToOctal(binario) {
    return parseInt(binario, 2).toString(8); 
}

function binaryToHexadecimal(binario) {
    return parseInt(binario, 2).toString(16); 
}

function asciiToDecimal(ascii) {
    let resultado = '';
    for (let i = 0; i < ascii.length; i++) {
        resultado += ascii.charCodeAt(i) + ' '; 
    }
    return resultado.trim();
}

function asciiToBinary(ascii) {
    let resultado = '';
    for (let i = 0; i < ascii.length; i++) {
        let binario = ascii.charCodeAt(i).toString(2); 
        resultado += binario.padStart(8, '0') + ' '; 
    }
    return resultado.trim();
}

function asciiToOctal(ascii) {
    let resultado = '';
    for (let i = 0; i < ascii.length; i++) {
        let octal = ascii.charCodeAt(i).toString(8); 
        resultado += octal.padStart(3, '0') + ' '; 
    }
    return resultado.trim();
}

function asciiToHexadecimal(ascii) {
    let resultado = '';
    for (let i = 0; i < ascii.length; i++) {
        let hex = ascii.charCodeAt(i).toString(16); 
        resultado += hex.padStart(2, '0') + ' '; 
    }
    return resultado.trim();
}


function asciiToTexto(ascii) {
    let resultado = '';
    let arr = ascii.split(' ');
    arr.forEach((valor) => {
        resultado += String.fromCharCode(parseInt(valor));
    });
    return resultado;
}

function binaryToTexto(binario) {
    let resultado = '';
    let arr = binario.split(' ');
    arr.forEach((byte) => {
        resultado += String.fromCharCode(parseInt(byte, 2)); 
    });
    return resultado;
}

function decimalToTexto(decimal) {
    let resultado = '';
    let arr = decimal.split(' ');
    arr.forEach((val) => {
        resultado += String.fromCharCode(val); 
    });
    return resultado;
}
