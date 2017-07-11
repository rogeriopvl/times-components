import AdManager from "./ad-manager";
import { getSlotConfig } from "./generate-config";
import gptManager from "./gpt-manager";
import pbjs from "./pbjs-manager";
import { pbjs as pbjsConfig } from "./config";

const pbjsManager = pbjs(pbjsConfig);

function loadAds(adUnit = "d.thetimes.co.uk", networkId = "25436805", section, code) {
  const adManager = new AdManager({
    networkId,
    adUnit,
    section,
    gptManager,
    pbjsManager,
    getSlotConfig
  })
  adManager.registerAd(code, 320)
  adManager.init()
    .then(adManager.display.bind(adManager))
    .catch(err => {
      throw new Error(err);
    });
  window.adManager = adManager
}

window.loadAds = loadAds
