"use strict";

let cryptoAddressDisplay = document.getElementById("crypto-address");
let nairaAccountDisplay = document.getElementById("bank-account");
let paydayUsernameDisplay = document.getElementById("payday_username");
let cryptoGenNotifier = document.querySelector('.generatenotify');

// copy buttons

let cryptoCopyTrigger = document.getElementById('copy-crypto');
let nairaCopyTrigger = document.getElementById('copy-naira-account');
let paydayCopyTrigger = document.getElementById('copy-payday');

// crypto values
let bitcoinSelect = document.getElementById('bitcoin');
let ethereumSelect = document.getElementById('ethereum');
let litecoinSelect = document.getElementById('litecoin');

// donation popup trigger
let donationTriggerTop = document.getElementById("triggerTop");
let donationTriggerDown = document.getElementById("triggerDown");
let donation_popup = document.querySelector(".donation_popup");

donationTriggerDown.addEventListener("click", (e) => {
    donation_popup.style.display = "block";
})

donationTriggerTop.addEventListener("click", (e) => {
    donation_popup.style.display = "block";
})

let closeDonationPopup = document.getElementById("close_donation")

closeDonationPopup.addEventListener("click", (e) => {
    donation_popup.style.display = "none";
});


// listen when crypto is selected

bitcoinSelect.addEventListener('click', async (e) => {
    // console.log('bitcoin')

    cryptoGenNotifier.style.display = "block";
    cryptoGenNotifier.innerHTML = `Generating ${bitcoinSelect.value} wallet ...`;
    let btcAddr =  await generateCryptoAddress(bitcoinSelect.value.trim());
    // console.log(`BTC`,btcAddr.address)
    if(btcAddr) {
        cryptoGenNotifier.innerHTML = btcAddr.message;
        cryptoAddressDisplay.value = btcAddr.address;
    } else {
        cryptoGenNotifier.innerHTML = 'Failed to generate crypto address';
        cryptoAddressDisplay.value = "";
    }
});


ethereumSelect.addEventListener('click', async (e) => {
    cryptoGenNotifier.style.display = "block";
    cryptoGenNotifier.innerHTML = `Generating ${ethereumSelect.value} wallet ...`;
    let ethAddr = await generateCryptoAddress(ethereumSelect.value.trim());
    if(ethAddr) {
        cryptoGenNotifier.innerHTML = ethAddr.message;
        cryptoAddressDisplay.value = ethAddr.address;
    } else {
        cryptoGenNotifier.innerHTML = 'Failed to generate crypto address';
        cryptoAddressDisplay.value = "";
    }
});


litecoinSelect.addEventListener('click', async (e) => {
    cryptoGenNotifier.style.display = "block";
    cryptoGenNotifier.innerHTML = `Generating ${litecoinSelect.value} wallet ...`;
    let liteAddr = await generateCryptoAddress(litecoinSelect.value.trim());
    if(liteAddr) {
        cryptoGenNotifier.innerHTML = liteAddr.message;
        cryptoAddressDisplay.value = liteAddr.address;
    } else {
        cryptoGenNotifier.innerHTML = 'Failed to generate crypto address';
        cryptoAddressDisplay.value = "";
    }
});

// function to generate crypto address

let HELPDEV_CRYPTO_PROCESSOR_API= `https://helpdevs-pay-api.herokuapp.com/generateaddress`;
async function generateCryptoAddress(addressType) {
    return new Promise(async (resolve, reject) => {
        try {
            let cryptoAddress = await fetch(HELPDEV_CRYPTO_PROCESSOR_API, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ coinType :  `${addressType}`})
            })
            .then(resp => {
                return resp.json();
            })
            .then(address => {
                // console.log(address);
                resolve(address)
            })
            .catch(err => {
                console.log(err)
                reject(err.message);
            });
        } catch (e) {
            console.log(e)
            throw e;
        }
    });
};

// copy function

function copyToClipBoard(elem) {
  let input = document.getElementById(`${elem.id}`);
  input.select();
  input.setSelectionRange(0, 999999);
  navigator.clipboard.writeText(input.value.trim());
};

// copy triggers

cryptoCopyTrigger.addEventListener('click', (e) => {
    copyToClipBoard(cryptoAddressDisplay);
    cryptoCopyTrigger.style.fill= "blue";
});

paydayCopyTrigger.addEventListener('click', (e) => {
    copyToClipBoard(paydayUsernameDisplay);
    paydayCopyTrigger.style.fill= "blue";
});

nairaCopyTrigger.addEventListener('click', (e) => {
    copyToClipBoard(nairaAccountDisplay);
    nairaCopyTrigger.style.fill= "blue";
});