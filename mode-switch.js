const NormalSdk = require("@normalframework/applications-sdk");

const STATE_SETBACK = 1
const STATE_REGULAR = 2

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({points, sdk, groupVariables, args}) => {
    console.log("running")
    //console.log(points)
  let sensor = points.byLabel("occupancy-sensor")
  if (sensor.length != 1) {
    return NormalSdk.InvokeError("no occupancy sensor point found")
  }
  let sp = points.byLabel("zone-air-temp-occ-heating-sp")
  if (sp.length != 1) {
    return NormalSdk.InvokeError("No setpoint found")
  }
  var state = 0

  if (await sensor[0].trueFor("15m", (x) => {
    return x.value == 0
    })) {
    sdk.logEvent("Zone unoccupied for 15 mninutes, turning off")
    state = STATE_SETBACK
 } else {
    sdk.logEvent("Turning zone on")
    state = STATE_REGULAR
  }
  console.log(groupVariables)
  let currentState = groupVariables[0].latestValue.value
    sdk.logEvent("State is", state, currentState)

  if (currentState === undefined || currentState != state) {
    sdk.logEvent("state change detected, writing point to", state)
    let res = await groupVariables[0].write(state)
    sdk.logEvent(res)
    if (state == STATE_REGULAR) {
      await sp.write(undefined)
    } else {
      await sp.write(sp.value + 3)
    } 
  }
};