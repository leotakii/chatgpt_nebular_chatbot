import { Injectable } from '@angular/core';

import { messages } from './messages';
import { botReplies, botRepliesConfirmacao, gifsLinks, imageLinks, GPT_Reply } from './bot-replies';
import defaultExport from './api/generate';

@Injectable()
export class ChatShowcaseService {
  state = 'Cadastro';
  cpf_cnpj_input = ''; //input do usuário
  cpf_cnpj_array = [];
  valid_cpf_array: Array<string> = []; 
  valid_cnpj_array: Array<string>  = [];
  //User messages
  loadMessages() {
    return messages;
  }
  //Bot messages
  loadBotReplies() {
    switch (this.state) {
      case 'Cadastro':
        return botReplies;
      case 'Confirmacao':
        return botRepliesConfirmacao;
      default:
        return null;
    }
  }
  concatMessageGPT(messageGPT: string, newMessage: string) {
    return messageGPT + '\n' + newMessage;
  }

  reply = async (messageGPT: string, newMessage: string): Promise<any> => {
    try {
      const botReply: any = this.loadBotReplies().find((reply: any) => newMessage.search(reply.regExp) !== -1);

      if (botReply.reply.type === 'quote') {
        botReply.reply.quote = newMessage;
      } else if (botReply.type === 'gif') {
        botReply.reply.files[0].url = gifsLinks[Math.floor(Math.random() * gifsLinks.length)];
      } else if (botReply.type === 'pic') {
        botReply.reply.files[0].url = imageLinks[Math.floor(Math.random() * imageLinks.length)];
      } else if (botReply.type === 'group') {
        botReply.reply.files[1].url = gifsLinks[Math.floor(Math.random() * gifsLinks.length)];
        botReply.reply.files[2].url = imageLinks[Math.floor(Math.random() * imageLinks.length)];
      }

      botReply.reply.text = botReply.answerArray[Math.floor(Math.random() * botReply.answerArray.length)];
      if (botReply.reply.text == 'Confirma os dados inseridos?' && this.state == 'Cadastro') {
        this.cpf_cnpj_input = newMessage;
        this.cpf_cnpj_input = this.cpf_cnpj_input.replace(/[.\-/]/g, '');
        this.cpf_cnpj_array = this.cpf_cnpj_input.split(/\,+|\s+|\;+/);
        console.log(this.cpf_cnpj_array);
        //09552021910;;;; 09552021910,09552021910 09552021910; 00.000.000/0001-91
        let failed_cpf_cnpj = '';
        this.cpf_cnpj_array = this.cpf_cnpj_array.filter((item) => item); //filtra strings vazias
        this.cpf_cnpj_array = this.cpf_cnpj_array.filter(function (elem, index, self) {
          //filtra repeticoes
          return index === self.indexOf(elem);
        });
        

        for (let i = 0; i < this.cpf_cnpj_array.length; ++i) { //verifica se as entradas são válidas e se elas se repetem.
          if (isValidCPF(this.cpf_cnpj_array[i]) && this.valid_cpf_array.includes(this.cpf_cnpj_array[i]) == false) {
            //this.valid_cpf_array.push(this.cpf_cnpj_array[i]);
            this.valid_cpf_array.push(this.cpf_cnpj_array[i]);
          }
          else if (isValidCNPJ(this.cpf_cnpj_array[i]) && this.valid_cnpj_array.includes(this.cpf_cnpj_array[i]) == false) {
            this.valid_cnpj_array.push(this.cpf_cnpj_array[i]);
          }

          else {
            failed_cpf_cnpj += this.cpf_cnpj_array[i] + '\n';
          }

        }

        if (failed_cpf_cnpj != '') {
          botReply.reply.text = 'Existem valores inválidos ou repetidos na sua requisição:\n' + failed_cpf_cnpj + 'Corrija e tente novamente.';
        }

        else { //se nao houve entrada inválida
          this.state = 'Confirmacao';
        }

        console.log(this.cpf_cnpj_array);
        console.log("this.valid_cpf_array");
        console.log(this.valid_cpf_array);
        console.log("this.valid_cnpj_array");
        console.log(this.valid_cnpj_array);
      }

      if (
        botReply.reply.text == 'Entendido. A investigação foi cadastrada com sucesso e informações acerca de seu progresso serão informadas por e-mail.' 
        && this.state == 'Confirmacao'
      ) {

        
        this.state = 'Cadastro';
      }
      if (
        botReply.reply.text == 'Certo, então peço que me informe os dados novamente.'
        && this.state == 'Confirmacao'
      ) {
        this.state = 'Cadastro';
      }

      return { no_gpt: botReply.reply };
      console.log(botReply.reply.text);

      if (botReply.reply.text != 'Unknown Regex, asking GPT') {
        return { no_gpt: botReply.reply };
      }

      /* condicao do GPT
    else { 
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: this.concatMessageGPT(messageGPT, newMessage) }),
      };
// Descomentar caso exista chave da API do gpt 
      const response = await fetch("http://localhost:4400/api/generate", request); //TODO TROCAR por variável de ambiente

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      return {'gpt': GPT_Reply(data.result)};
     // return {'gpt': GPT_Reply("Placeholder GPT")};
    }
    */
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert('Meus neurônios colapsaram. Recarregue a página.');
      return 'error';
      //return {obj: ["error", null]};
    }
  };
}

function isValidCPF(cpf) {
  if (typeof cpf !== 'string') return false;
  cpf = cpf.replace(/[\s.-]*/gim, '');
  if (
    !cpf ||
    cpf.length != 11 ||
    cpf == '00000000000' ||
    cpf == '11111111111' ||
    cpf == '22222222222' ||
    cpf == '33333333333' ||
    cpf == '44444444444' ||
    cpf == '55555555555' ||
    cpf == '66666666666' ||
    cpf == '77777777777' ||
    cpf == '88888888888' ||
    cpf == '99999999999'
  ) {
    return false;
  }
  var soma = 0;
  var resto;
  for (var i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (var i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(10, 11))) return false;
  return true;
}

function isValidCNPJ(cnpj) {
  // Verifica se a variável cnpj é igua a "undefined", exibindo uma msg de erro
  if (cnpj === undefined) {
    return false;
  }

  // Esta função retira os caracteres . / - da string do cnpj, deixando apenas os números
  var strCNPJ = cnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', '');

  // Testa as sequencias que possuem todos os dígitos iguais e se o cnpj não tem 14 dígitos, retonando falso e exibindo uma msg de erro
  if (
    strCNPJ === '00000000000000' ||
    strCNPJ === '11111111111111' ||
    strCNPJ === '22222222222222' ||
    strCNPJ === '33333333333333' ||
    strCNPJ === '44444444444444' ||
    strCNPJ === '55555555555555' ||
    strCNPJ === '66666666666666' ||
    strCNPJ === '77777777777777' ||
    strCNPJ === '88888888888888' ||
    strCNPJ === '99999999999999' ||
    strCNPJ.length !== 14
  ) {
    return false;
  }

  // A variável numeros pega o bloco com os números sem o DV, a variavel digitos pega apenas os dois ultimos numeros (Digito Verificador).
  var tamanho = strCNPJ.length - 2;
  var numeros = strCNPJ.substring(0, tamanho);
  var digitos = strCNPJ.substring(tamanho);
  var soma = 0;
  var pos = tamanho - 7;

  // Os quatro blocos seguintes de funções irá reaizar a validação do CNPJ propriamente dito, conferindo se o DV bate. Caso alguma das funções não consiga verificar
  // o DV corretamente, mostrará uma mensagem de erro ao usuário e retornará falso, para que o usário posso digitar novamente um número
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = strCNPJ.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let k = tamanho; k >= 1; k--) {
    soma += numeros.charAt(tamanho - k) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) {
    return false;
  }

  return true;
}
