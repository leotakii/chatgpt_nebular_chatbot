const botAvatar: string = 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png';
export function GPT_Reply(message: string) {
  return {
    text: message,
    reply: false,
    date: new Date(),
    user: {
      name: 'Assistente Mica (IA)',
      avatar: botAvatar,
    },
  };
}

export const gifsLinks: string[] = [
  'https://media.tenor.com/images/ac287fd06319e47b1533737662d5bfe8/tenor.gif',
  'https://i.gifer.com/no.gif',
  'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
  'http://www.reactiongifs.com/r/wnd1.gif',
];
export const imageLinks: string[] = [
  'https://picsum.photos/320/240/?image=357',
  'https://picsum.photos/320/240/?image=556',
  'https://picsum.photos/320/240/?image=339',
  'https://picsum.photos/320/240/?image=387',
  'https://picsum.photos/320/240/?image=30',
  'https://picsum.photos/320/240/?image=271',
];
const fileLink: string = 'http://google.com';

export const botReplies = [
  {
    regExp: /([I,i]nvestiga[r,ção])/g,
    answerArray: ['Digite os CPFs e CNPJs separados por espaço.'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Assistente Mica (IA)',
        avatar: botAvatar,
      },
    },
  },
  {
    //cpf                                              cnpj
    regExp:
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}[; ,]*|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}[; ,]*)*$/,
    answerArray: ['Confirma os dados inseridos?'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Assistente Mica (IA)',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([S,s]obre)/g,
    answerArray: [
      'Minha função é ajudar a identificar e analisar informações relevantes sobre pessoas físicas ou jurídicas, como nomes, endereços, números de telefone, endereços de e-mail, histórico de transações financeiras, informações de contas bancárias, registros de propriedade, informações de empresas e outros detalhes.\nUsando meus algoritmos, posso ajudar a obter informações precisas e confiáveis, acelerando o processo de investigação. Além disso, posso ajudar a identificar padrões e tendências nos dados, que podem ser usados para prever e avaliar riscos.\nMinha tecnologia também pode ser usada para detectar fraudes, evitar atividades ilegais e monitorar transações financeiras. Além disso, posso ajudar a verificar a identidade de pessoas, a fim de evitar fraudes e outras atividades ilegais.',
      ,
    ],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Assistente Mica (IA)',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([A,a]juda)/g,
    answerArray: [`Texto de ajuda`],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Assistente Mica (IA)',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /(.*)/g,
    answerArray: ['Por favor, reformule seu pedido. Para mais instruções, digite Ajuda'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Assistente Mica (IA)',
        avatar: botAvatar,
      },
    },
  },
];
export const botRepliesConfirmacao = [
  {
    regExp: /([S,s]+|[S,s]im.?)/g,
    answerArray: [
      'Entendido. A investigação foi cadastrada com sucesso e informações acerca de seu progresso serão informadas por e-mail.',
    ],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Assistente Mica (IA)',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([N,n]+|[N,n][a,ã]o.?)/g,
    answerArray: ['Certo, então peço que me informe os dados novamente.'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Assistente Mica (IA)',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /(.*)/g,
    answerArray: ['Por favor, responda com apenas sim ou não.'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Assistente Mica (IA)',
        avatar: botAvatar,
      },
    },
  },
];
