/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { ChatShowcaseService } from './chat-showcase.service';

@Component({
  selector: 'nb-chat-showcase',
  templateUrl: './chat-showcase.component.html',
  providers: [ChatShowcaseService],
  styles: [
    `
      ::ng-deep nb-layout-column {
        justify-content: center;
        display: flex;
      }
      nb-chat {
        width: 1000px;
        height: 900px;
      }
    `,
  ],
})
export class ChatShowcaseComponent {
  //mensagens gerais, não necessariamente as do GPT
  messages: any[];
  //TODO: mover a inicialização do prompt do GPT para o backend, de modo que o frontend não possa alterá-lo.
  // Utilizar os parâmetros 'role': 'system' e 'content': 'lorem ipsum...' nas mensagens enviadas para a API na seguinte forma:

  /*messages.append(
      {'role':'system', 'content':'create a json summary of the previous food order. Itemize the price for each item\
      The fields should be 1) pizza, include size 2) list of toppings 3) list of drinks, include size   4) list of sides include size  5)total price '}
      */
  ID_processo: string = '';
  ID_TIPO_INVESTIGA: string = '';
  gptMessage: string = '';
  constructor(protected chatShowcaseService: ChatShowcaseService) {
    this.messages = this.chatShowcaseService.loadMessages();
  }

  sendMessage(event: any) {
    const files = !event.files
      ? []
      : event.files.map((file) => {
          return {
            url: file.src,
            type: file.type,
            icon: 'file-text-outline',
          };
        });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Usuário',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });

    //this.concatMessageGPT({text: event.message});
    let newMessage = event.message;
    const botReply = this.chatShowcaseService.reply(this.gptMessage, newMessage);

    setTimeout(() => {
      botReply.then((result) => this.concatMessageGPT(result, newMessage)).then((result) => this.messages.push(result));
    }, 3000);
    //console.log(this.gptMessage);
  }

  concatMessageGPT(message: any, newMessage: string) {
    console.log(message);
    if (message.gpt) {
      this.gptMessage = this.gptMessage + newMessage + '\n' + message.gpt.text + '\n';
      return message.gpt;
    } else if (message.no_gpt) {
      return message.no_gpt;
    }

    return null;
  }
}
