"use strict";
const axios = require("axios");
require("dotenv/config");

module.exports.hello = async (event) => {
  const { to } = JSON.parse(event.body);

  const config = {
    url: "https://graph.facebook.com/v13.0/104064662321868/messages",
    method: "POST",
    headers: {
      "Content-Type": "application/json;",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    data: {
      messaging_product: "whatsapp",
      to: `55${to}`,
      type: "template",
      template: {
        name: "hello_world",
        language: {
          code: "en_US",
        },
      },
    },
  };

  let result;
  try {
    const request = await axios(config);
    if (request.status !== 200) {
      throw "Não foi possivel se contar ao Facebook";
    }
    result = request.data;
  } catch (err) {
    result = err;
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
