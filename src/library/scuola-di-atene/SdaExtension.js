/* eslint-disable no-underscore-dangle, no-param-reassign */
export default class SdaExtension {
  // will be execute after the paper is ready
  init() {}

  createExtensionForShape(injectedResult, shape, options) {}

  destroyExtensionForShape(injectedResult, shape, extensionForShape, options) {
    if (extensionForShape) {
      extensionForShape.destroy();
    }
  }

  destroy() {}
}
