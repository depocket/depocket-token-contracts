const { expect } = require('chai');
const { BN, expectEvent, expectRevert, constants } = require('@openzeppelin/test-helpers');
const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const DePocket = artifacts.require('DePocket');

const MAX_TOTAL_SUPPLY = new BN('21000000').mul((new BN('10')).pow(new BN('18')));
const DECIMALS = new BN('18');
const NAME = 'DePocket';
const SYMBOL = 'DEPO';

contract('DePocket', ([admin, multisig, sender, receiver]) => {
  beforeEach(async () => {
    this.value = new BN('100');
    this.depocket = await deployProxy(DePocket, [NAME, SYMBOL, MAX_TOTAL_SUPPLY, DECIMALS], { admin });
  });

  it('initialize value assigned in contructer', async () => {
    const name = await this.depocket.name();
    expect(name).to.equal(NAME);
    const symbol = await this.depocket.symbol();
    expect(symbol).to.equal(SYMBOL);
    const totalSupply = await this.depocket.totalSupply();
    expect(totalSupply).to.be.a.bignumber.that.equals(MAX_TOTAL_SUPPLY);
    const decimals = await this.depocket.decimals();
    expect(decimals).to.be.a.bignumber.that.equals(DECIMALS);
    const owner = await this.depocket.owner();
    expect(owner).to.equal(admin)
  });

  it('balanceOf return the correct balance value', async () => {
    const adminBalance = await this.depocket.balanceOf(admin)
    expect(adminBalance).to.be.a.bignumber.that.equals(MAX_TOTAL_SUPPLY)
  });

  it('reverts when transferring tokens to the zero address', async () => {
    await expectRevert(
      this.depocket.transfer(constants.ZERO_ADDRESS, this.value, { from: sender }),
      'BEP20: transfer to the zero address',
    );
  });

  it('emits a Transfer event on successful transfers', async () => {
    const receipt = await this.depocket.transfer(receiver, this.value, { from: admin });

    expectEvent(receipt, 'Transfer', {
      from: admin,
      to: receiver,
      value: this.value,
    });
  });

  it('updates balances on successful transfers', async () => {
    await this.depocket.transfer(sender, this.value, { from: admin });
    const amount = new BN('50');
    await this.depocket.transfer(receiver, amount, { from: sender });

    expect(await this.depocket.balanceOf(receiver)).to.be.bignumber.equal(amount);
  });
});
