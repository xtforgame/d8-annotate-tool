import React from 'react';
import InputLinker from '~/utils/InputLinker';
import {
  propagateOnChangeEvent,
} from '~/utils/InputLinker/helpers';

export default class LayoutBase extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.resetInputLinker(props);
    this.il = this.state.il;

    const { onInited = () => {} } = this.props;
    onInited(this.il);
  }

  componentDidMount() {
    const { onDidMount = () => {} } = this.props;
    onDidMount(this.il);
  }

  resetInputLinker = (props, state) => {
    const {
      value,
      fields = [],
      namespace = '',
      defaultValues = {},
      ignoredUndefinedFromOutputs = true,
    } = props;

    const il = new InputLinker(this, { namespace, ignoredUndefinedFromOutputs, controlled: !!value });
    il.add(...(fields.map(field => ({
      presets: [field, propagateOnChangeEvent()],
    }))));

    il.setDefaultValues(defaultValues);

    return il.mergeInitState({
      ...state,
      il,
      resetInputLinker: this.resetInputLinker,
    });
  }

  handleSubmit = () => {
    const { onSubmit = () => {} } = this.props;
    if (this.il.validate()) {
      const outputs = this.il.getOutputs();
      onSubmit(outputs, this.il);
      return {
        outputs,
        linker: this.il,
      };
    }
    return null;
  }
}
