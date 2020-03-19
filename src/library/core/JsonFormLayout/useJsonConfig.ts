/* eslint-disable no-param-reassign */
import { IFieldLink, IInputLinker, LinkerNamespace, FieldValue, FieldConfig } from '~/utils/InputLinker/core/interfaces';
import { RsBeforeRender, RsAfterRender } from './core/RenderSession';
import { JsonFormProps, OnDidMountFunction } from './interfaces';
import {
  normalizeJsonConfig,
} from './utils/index';

export type PropsEx<
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
> = {
  namespace: LinkerNamespace,
  rsBeforeRender: RsBeforeRender<FieldLink, LinkerType>,
  rsAfterRender: RsAfterRender<FieldLink, LinkerType>,
  onDidMount: OnDidMountFunction<FieldLink, LinkerType>,
  [s : string] : any;
};

export default <
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
>(props : JsonFormProps<FieldLink, LinkerType>) => {
  const {
    jsonConfig: jc,
    onDidMount = () => {},
  } = props;

  const jsonConfig = normalizeJsonConfig<FieldLink, LinkerType>(jc);

  const propsEx : PropsEx<FieldLink, LinkerType> = {
    namespace: jsonConfig.namespace || '',
    fields: jsonConfig.fields,
    rsBeforeRender: (rs) => {
      // console.log('RenderSession.beforeRender()');
      let $inputChanged = false;
      const $dirtyMap : any = {};
      Object.values(rs.linker.getFields())
      .filter(f => f.dirty && !f.name.startsWith('~'))
      .forEach((f) => {
        $dirtyMap[f.name] = true;
        $inputChanged = true;
      });

      jsonConfig.preRender(rs, {
        $dirtyMap,
        $inputChanged,
      });

      rs.linker.resetDirtyFlags();
    },
    rsAfterRender: (rs) => {
      // console.log('rs :', rs);
      // console.log('RenderSession.afterRender()');
    },
    onDidMount: (linker) => {
      const result = jsonConfig.normalizeInitValues(linker);
      if (result) {
        linker.changeValues(result);
      }
      onDidMount(linker);
    },
  };

  return {
    jsonConfig,
    propsEx,
  };
};
