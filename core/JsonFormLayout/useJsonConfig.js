"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("./utils/index");

var _default = props => {
  const {
    jsonConfig: jc,
    onDidMount = () => {}
  } = props;
  const jsonConfig = (0, _index.normalizeJsonConfig)(jc);
  const propsEx = {
    namespace: jsonConfig.namespace || '',
    fields: jsonConfig.fields,
    rsBeforeRender: rs => {
      let $inputChanged = false;
      const $dirtyMap = {};
      Object.values(rs.linker.getFields()).filter(f => f.dirty && !f.name.startsWith('~')).forEach(f => {
        $dirtyMap[f.name] = true;
        $inputChanged = true;
      });
      jsonConfig.preRender(rs, {
        $dirtyMap,
        $inputChanged
      });
      rs.linker.resetDirtyFlags();
    },
    rsAfterRender: rs => {},
    onDidMount: linker => {
      const result = jsonConfig.normalizeInitValues(linker);

      if (result) {
        linker.changeValues(result);
      }

      onDidMount(linker);
    }
  };
  return {
    jsonConfig,
    propsEx
  };
};

exports.default = _default;