// 创建区块
const sha256 = require('sha256');
class Block {
    constructor(data, previousHash) {
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.computeHash();
    }

    computeHash(){
        return sha256(this.data + this.previousHash).toString();
    }

}

// 创建chain

class Chain {
    constructor() {
        this.chain = [this.bigBang()];
    }

    bigBang() {
        const genesisBlock = new Block('我是祖先', '');
        return genesisBlock;
    }

    getLastBlock() {
        return this.chain[this.chain.length-1];
    }

    addBlockToChain(block) {

        block.previousHash = this.getLastBlock().hash;
        block.hash = block.computeHash();
        this.chain.push(block);
    }

    // 验证这个链是否合规；
    validateChain() {
        if(this.chain.length === 1) {
            return this.chain[0].hash === this.chain[0].computeHash();
        }
        for(let i=1; i<this.chain.length; i++){
            // 判断hash值是否正确；
            if(this.chain[i].hash !== this.chain[i].computeHash()) {
                console.log('this.chain[i].hash',i, this.chain[i].hash);
                console.log('this.chain[i].computeHash()', i, this.chain[i].computeHash());
                console.log('数据篡改');
                return false;
            }
            // 判断链的上下级关系是否正确；
            if(this.chain[i].previousHash !== this.chain[i-1].computeHash()) {
                console.log('数据断裂');
                return false;
            }
        }
        return true;
    }
}

// const block = new Block('转账10块', '12342');
// console.log('block', block);

const ss = new Chain();
//console.log(ss);

const bb1 = new Block('转账10块', '');
ss.addBlockToChain(bb1);
const bb2 = new Block('转账11块', '');
ss.addBlockToChain(bb2);

console.log('chain', ss, ss.validateChain());
