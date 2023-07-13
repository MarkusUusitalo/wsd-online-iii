import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as chatServices from "./services/chatServices.js";

configure({

 views: `${Deno.cwd()}/views/`,

});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response("-", {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addMessage = async (request) => {
  const formData = await request.formData();
  const sender = formData.get("sender");
  const message = formData.get("message");

  await chatServices.create(sender, message);
  return redirectTo("/")

};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (request.method === "GET") {
    const messages =  await chatServices.fiveMessages();
    return new Response(await renderFile("index.eta", { messages }), responseDetails);
  }

  else if (request.method === "POST") {
    return await addMessage(request);
  }
};

serve(handleRequest, { port: 7777 });
