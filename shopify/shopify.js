import Client from 'shopify-buy';


const client = Client.buildClient({
    domain: 'cicc-class.myshopify.com',
    storefrontAccessToken: 'ad138462401345eb26afec162030e0df'
  });

export default client;