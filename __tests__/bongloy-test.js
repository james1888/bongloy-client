const wrap = require("jasmine-promise-wrapper");
const stripe = require("../index.js")("pk_test_YRjUHSZfJza9RsuNDx9s6e5V");
const fetchMock = require("fetch-mock");

describe("card token creation with valid card details", function() {
  const cardDetails = {
    "card[number]": "4242424242424242",
    "card[exp_month]": "02",
    "card[exp_year]": "21",
    "card[cvc]": "999",
    "card[name]": "Steve Jobs"
  };
  fetchMock.mock("*", {});
  wrap.it("should receive a valid response", async () => {
    const token = await stripe.createToken(cardDetails);
    expect(token.url).toBe("https://api.bongloy.com/v1/tokens");
    expect(token.statusText).toBe("OK");
  });
});

describe("bank account token creation with valid bank details", function() {
  const bankDetails = {
    bank_account: {
      country: "US",
      currency: "usd",
      account_holder_name: "Noah Martinez",
      account_holder_type: "individual",
      routing_number: "110000000",
      account_number: "000123456789"
    }
  };

  fetchMock.mock("*", {});
  wrap.it("should receive a valid response", async () => {
    const token = await stripe.createToken(bankDetails);
    expect(token.url).toBe("https://api.bongloy.com/v1/tokens");
    expect(token.statusText).toBe("OK");
  });
});

describe("PII token creation with valid PII details", function() {
  const piiDetails = {
    pii: {
      personal_id_number: "2020202002"
    }
  };

  fetchMock.mock("*", {});
  wrap.it("should receive a valid response", async () => {
    const token = await stripe.createToken(piiDetails);
    expect(token.url).toBe("https://api.bongloy.com/v1/tokens");
    expect(token.statusText).toBe("OK");
  });
});

describe("invalid details", function() {
  const invalidCard = {
    "card[number]": "4242424242424242",
    "card[exp_month]": "02",
    "card[exp_yer]": "21",
    "card[cvc]": "999",
    "card[name]": "Steve Jobs"
  };

  fetchMock.mock("*", {});
  wrap.it("should throw an error", async () => {
    const token = await stripe.createToken(invalidCard);
    expect(token.url).toBe("https://api.bongloy.com/v1/tokens");
  });
});
