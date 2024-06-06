document.addEventListener("DOMContentLoaded", function () {
  const passInput = document.querySelector("#inputPasswordId");
  const lenInput = document.querySelector("#inputLengthId");
  const infoLength = document.querySelector("#lengthValue");
  const btnGerar = document.querySelector("#btnGerar");
  const btnCopiar = document.querySelector("#copyIcon"); // Adicionando o botão de cópia
  const toggleModeButton = document.querySelector("#toggleModeButton");

  const chkLower = document.querySelector("#chkLowerId");
  const chkUpper = document.querySelector("#chkUpperId");
  const chkNumber = document.querySelector("#chkNumberId");
  const chkSymbols = document.querySelector("#chkSymbolsId");

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const symbols = ["!", "@", "#", "$", "%"];

  const caracters = Array.from(Array(26)).map((_, i) => i + 97);
  const LowercaseCaracters = caracters.map((item) => String.fromCharCode(item));
  const UppercaseCaracters = LowercaseCaracters.map((item) =>
    item.toUpperCase()
  );

  // Função para embaralhar um array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Função para gerar a senha
  // Função para gerar a senha
  // Função para gerar a senha
  const generatePassword = (
    hasNumbers,
    hasSymbols,
    hasLowercase,
    hasUppercase,
    length
  ) => {
    let availableChars = [];

    if (hasNumbers) availableChars = availableChars.concat(numbers);
    if (hasSymbols) availableChars = availableChars.concat(symbols);
    if (hasLowercase)
      availableChars = availableChars.concat(LowercaseCaracters);
    if (hasUppercase)
      availableChars = availableChars.concat(UppercaseCaracters);

    if (availableChars.length === 0) {
      alert("Selecione pelo menos uma opção para gerar a senha.");
      return;
    }

    let password = "";

    // Se apenas uma opção estiver selecionada, preencher a senha com caracteres dessa opção
    if (
      [hasNumbers, hasSymbols, hasLowercase, hasUppercase].filter(Boolean)
        .length === 1
    ) {
      for (let i = 0; i < length; i++) {
        const char =
          availableChars[Math.floor(Math.random() * availableChars.length)];
        password += char;
      }
    } else {
      let lastCharType = null;

      while (password.length < length) {
        const shuffledChars = shuffleArray(availableChars);
        let charAdded = false;
        for (const char of shuffledChars) {
          const charType = getCharType(char);
          if (charType !== lastCharType) {
            password += char;
            lastCharType = charType;
            charAdded = true;
            break;
          }
        }
        // Se nenhum caractere for adicionado nesta iteração, encerre o loop
        if (!charAdded) break;
      }
    }

    passInput.value = password;
  };

  // Função para determinar o tipo de caractere
  const getCharType = (char) => {
    if (numbers.includes(parseInt(char))) return "number";
    if (symbols.includes(char)) return "symbol";
    if (LowercaseCaracters.includes(char)) return "lowercase";
    if (UppercaseCaracters.includes(char)) return "uppercase";
    return "unknown";
  };

  // Gerar senha ao carregar a página
  generatePassword(
    chkNumber.checked,
    chkSymbols.checked,
    chkLower.checked,
    chkUpper.checked,
    lenInput.value
  );

  // Atualizar senha ao mudar o comprimento
  lenInput.addEventListener("input", () => {
    infoLength.textContent = lenInput.value;
    if (
      !chkLower.checked &&
      !chkUpper.checked &&
      !chkNumber.checked &&
      !chkSymbols.checked
    ) {
      alert("Selecione pelo menos uma opção para gerar a senha.");
      return;
    }
    generatePassword(
      chkNumber.checked,
      chkSymbols.checked,
      chkLower.checked,
      chkUpper.checked,
      lenInput.value
    );
  });

  // Atualizar senha ao clicar no botão de gerar
  btnGerar.addEventListener("click", () => {
    // Verificar se pelo menos uma checkbox está marcada
    if (
      !chkLower.checked &&
      !chkUpper.checked &&
      !chkNumber.checked &&
      !chkSymbols.checked
    ) {
      alert("Selecione pelo menos uma opção para gerar a senha.");
      return;
    }

    generatePassword(
      chkNumber.checked,
      chkSymbols.checked,
      chkLower.checked,
      chkUpper.checked,
      lenInput.value
    );
  });

  // Atualizar senha ao mudar o estado das checkboxes
  [chkLower, chkUpper, chkNumber, chkSymbols].forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (
        !chkLower.checked &&
        !chkUpper.checked &&
        !chkNumber.checked &&
        !chkSymbols.checked
      ) {
        alert("Selecione pelo menos uma opção para gerar a senha.");
        return;
      }
      generatePassword(
        chkNumber.checked,
        chkSymbols.checked,
        chkLower.checked,
        chkUpper.checked,
        lenInput.value
      );
    });
  });
  // Função para copiar a senha para a área de transferência
  btnCopiar.addEventListener("click", () => {
    passInput.select();
    document.execCommand("copy");
    alert("Senha copiada para a área de transferência!");
  });
});
