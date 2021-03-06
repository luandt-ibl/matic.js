const Matic = require('maticjs').default
const config = require('./config')

const token = config.MATIC_ERC721_TOKEN // test token address
const tokenId = '1' // ERC721 token Id
const from = config.FROM_ADDRESS // from address

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
  withdrawManagerAddress: config.WITHDRAWMANAGER_ADDRESS,	
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`

matic
  .startERC721Withdraw(token, tokenId, {
    from,
    onTransactionHash: (hash) => {
      // action on Transaction success
      console.log(hash) // eslint-disable-line
    },
  })

// NOTE: Wait for next checkpoint, which will take approximately 5-10 mins. 
// Then you can call complete-withdraw.js to submit proof.
