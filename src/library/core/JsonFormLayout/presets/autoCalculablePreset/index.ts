/* eslint-disable no-param-reassign */
import { IFieldLink, IInputLinker, LinkerNamespace, FieldConfig } from '~/utils/InputLinker/core/interfaces';
import AutoCalculable, { defaultIsEqual } from '~/core/AutoCalculable';
import resetableInputPreset from '../resetableInputPreset';

const autoCalculableBasePreset = <
  FieldLink extends IFieldLink<FieldLink>
>() : FieldConfig<FieldLink> => ({
  extraConverter: {
    normalize: ((v, { link }) => {
      if (link.data.autoCalc) {
        return link.data.calculatedValue;
      }
      return v;
    }),
  },
  mwRender: [
    ({ props, link, options: { renderSession: rs } }) => {
      const isEqual = link.options.isEqual || defaultIsEqual;
      link.data.calculatedValue = props.calculatedValue;
      link.data.autoCalc = isEqual(props.calculatedValue, props.value);
      const calculatedValue = rs.calculated && rs.calculated[link.name];
      return ({
        calculatedValue,
      });
    },
  ],
});

const autoCalculableDefaultPrerenderPreset = <
  FieldLink extends IFieldLink<FieldLink>
>() : FieldConfig<FieldLink> => ({
  mwPreRender: ({ nonProps }) => [{
    Component: nonProps.component,
  }, {
    component: AutoCalculable,
    shouldRender: true,
  }],
});

const autoCalculableLastPreset = <
  FieldLink extends IFieldLink<FieldLink>
>() : FieldConfig<FieldLink> => ({
  presets: [
    resetableInputPreset,
    autoCalculableBasePreset<FieldLink>(),
    autoCalculableDefaultPrerenderPreset<FieldLink>(),
  ],
  evaluate: cfg => ({
    ...cfg,
    extraOptions: {
      isEqual: (calculated : any, input : any) => !input || (calculated === input),
      // unmountWhileReset: true
    },
    mwRender: [
      ({ props, link, options: { renderSession: rs } }) => {
        const calculatedValue = rs.calculated && rs.calculated[link.name];
        return ({
          acOptions: {
            isEqual: link.options.isEqual,
            getExtraProps: (autoCalc : any) => {
              if (!autoCalc) {
                return {
                  // error: true,
                  helperText: props.helperText || calculatedValue,
                };
              }
              return {};
            },
            onAutoCalcChanged: undefined,
          },
        });
      },
    ],
  }),
});

export default <
  FieldLink extends IFieldLink<FieldLink>
>() : FieldConfig<FieldLink> => ({
  cfgMiddlewares: {
    last: [autoCalculableLastPreset<FieldLink>()],
  },
});
