/* eslint-disable no-param-reassign */
import { JsonFormConfig } from '~/core/JsonFormLayout/interfaces';
import { IFieldLink, IInputLinker } from '~/utils/InputLinker/core/interfaces';

export default <
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
>() : JsonFormConfig<FieldLink, LinkerType> => ({
  namespace: 'form1',
  modules: {
    calcHelpers: `
      export { default as calc1 } from 'calc1';
    `,
    calc1: `
      export default (prevCalculated, username) => {
        const calculated = {
          ...prevCalculated,
        };
        calculated.usernameX = username && (username + 'psp');

        return calculated;
      };
    `,
    preRender: `
      import { calc1 } from 'calcHelpers';
      export default (rs, envs) => {
        const { $dirtyMap, $inputChanged } = envs;

        const username = rs.linker.getValue('username');
        if (rs.prevRenderSession && !$inputChanged) {
          return (rs.calculated = rs.calculated || rs.prevRenderSession.calculated);
        }

        // console.log('rs.calculated');

        rs.calculated = calc1(rs.calculated, username);

        return rs.calculated;
      };
    `,
    globalValidator: `
      export default (envs) => {
        const { linker, validate } = envs;
        if (!validate()) { return false; }
        const fields = linker.getFields();
        Object.keys(fields).map(k => fields[k])
        .forEach(f => f.setError(new Error('XXXX')));
        return false;
      };
    `,
    normalizeInitValues: `
      export default (linker) => {
        if (!('password' in linker.host.props.value)) {
          return {
            password: 'password',
            passwordVisibility: true,
          };
        }
        return null;
      };
    `,
  },
  fields: [
    {
      name: 'username',
      type: 'text',
      presets: [
        ['translateProp', 'label', 'username'],
        ['translateProp', 'placeholder', 'usernameEmptyError', {
          emailAddress: '$t(emailAddress)',
          phoneNumber: '$t(phoneNumber)',
        }],
      ],
    },
    {
      name: 'usernameX',
      type: 'text',
      presets: ['autoCalculable'],
      extraProps: {
        label: '可編輯輸入',
      },
      defaultValue: '',
    },
    {
      name: 'password',
      type: 'password',
      presets: [['translateProp', 'label', 'password']],
    },
    {
      name: 'colorInlinePicker',
      type: 'colorInlinePicker',
      extraProps: {
        label: '選擇顏色',
      },
    },
    {
      name: 'date',
      type: 'date',
      extraProps: {
        label: '選擇日期',
      },
    },
    {
      name: 'dateRange',
      type: 'dateRange',
      extraProps: {
        label: '選擇日期範圍',
      },
    },
    {
      name: 'time',
      type: 'time',
      extraProps: {
        label: '選擇時間',
      },
    },
    {
      name: 'timeRange',
      type: 'timeRange',
      extraProps: {
        label: '選擇時間範圍',
      },
    },
    {
      name: 'dateTime',
      type: 'dateTime',
      extraProps: {
        label: '選擇日期時間',
      },
    },
    {
      name: 'dateTimeRange',
      type: 'dateTimeRange',
      extraProps: {
        label: '選擇日期時間範圍',
      },
      extraOptions: { space: 'none' },
    },
    {
      name: 'rememberMe',
      type: 'checkbox',
      presets: [['translateProp', 'label', 'rememberMe']],
      defaultValue: false,
    },
    {
      name: 'submit',
      type: 'submit',
      presets: [['translateProp', 'children', 'builtin-components:submit']],
    },
  ],
});
