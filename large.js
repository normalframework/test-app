const NormalSdk = require("@normalframework/applications-sdk");

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({points, sdk, update, args}) => { 
  console.log("large", points.length)
  sdk.logEvent("I'm a big event " + points.length)
  for (let i = 0 ; i < points.length; i++) {
    sdk.logEvent(JSON.stringify(points[i].latestValue))
    //let val = await points[i].read()
    //console.log(val)

    let res = await points[i].write(undefined)
    console.log(res)
  }
  return NormalSdk.InvokeSuccess(points.lenght)
};