const { assert } = require("chai");
const { contracts_build_directory } = require("../truffle-config");

const Message = artifacts.require("Message");

require("chai").use(require("chai-as-promised")).should();

contract("Message", (accounts) => {
  let message;

  before(async () => {
    message = await Message.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = message.address;
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, 0x0);
      assert.notEqual(address, undefined);
    });
  });

  describe("storage", async () => {
    it("updates messageHash", async () => {
      const messageHash = "abc123";
      await message.set(messageHash);
      const result = await message.get();
      assert.equal(result, messageHash);
    });
  });
});
