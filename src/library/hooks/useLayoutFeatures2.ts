import { IFieldLink, IInputLinker, FieldValue, FieldConfig } from '~/utils/InputLinker/core/interfaces';
import useLayoutFeatures, { LayoutFeatureProps } from './useLayoutFeatures';

export const defaultIlOnInit = <
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
>(props : any) => (il : LinkerType) => {
  const { fields = [], defaultValues } : {
    fields?: FieldConfig<FieldLink>[];
    defaultValues?: { [s : string] : FieldValue };
  } = props;

  il.add(...(
    fields.map(field => ({
      presets: [field],
    }))
  ));

  il.setDefaultValues(defaultValues || {});
  il.resetDirtyFlags();
};

export default <
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
>(props : LayoutFeatureProps<LinkerType>, ilOnInit?: Function) => useLayoutFeatures<FieldLink, LinkerType>(
  props, ilOnInit || defaultIlOnInit(props),
);
