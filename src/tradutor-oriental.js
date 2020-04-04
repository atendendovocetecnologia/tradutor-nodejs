/**
 * 
 * Arquivo: src/tradutor-texto.js
 * Descrição: arquivo responsável por traduzir textos usando o Translator Text API.
 * Data: 03/04/2020
 * Author: Márcio C Gomes
 * 
 */

const request = require('request');
//const uuidv4 = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');

// nome da variável de ambiente
let chave_translator = 'TRANSLATOR_TEXT_SUBSCRIPTION_KEY';

//==> Caso não encontrar uma variável de ambiente definida, envia mensagem de erro.
if (!process.env[chave_translator]) {
  throw new Error('Por favor, configure a sua variável de ambiente: ' + chave_translator);
}

let subscriptionKey = process.env[chave_translator];

let endpoint_translator = 'TRANSLATOR_TEXT_ENDPOINT';

if (!process.env[endpoint_translator]) {
  throw new Error('Por favor, configure a sua variável de ambiente: ' + endpoint_translator);
}

let endpoint = process.env[endpoint_translator];

// Configurando as requisições
function traduzirTexto() {
    // ==> Aqui vamos configurar os requests
    let options = {
      method: 'POST',
      baseUrl: endpoint,
      url: 'transliterate',
      qs: {
        'api-version': '3.0',
        'language': 'zh-Hans',
        'fromScript': 'Hans',
        'toScript': 'latn'
      },
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
      },
      body: [{
        'text': '你能拿一把兰博基尼的钥匙吗？'
      }],
      json: true,
    }

    // ==> Aqui vamos imprimir a nossa requisição
    request(options, (err, res, body) => {
        console.log(JSON.stringify(body, null, 4));
    });
};

// Aqui vamos chamar a função para que possa realizar
// a tradução via API
traduzirTexto();