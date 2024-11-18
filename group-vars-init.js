const NormalSdk = require("@normalframework/applications-sdk");

/**
 * Invoke hook function
 * @param {NormalSdk.InvokeParams} params
 * @returns {NormalSdk.InvokeResult}
 */
module.exports = async ({points, sdk, update, groupVariables, args}) => {
 console.log(groupVariables[0].latestValue)
 await groupVariables[0].write(11)
};