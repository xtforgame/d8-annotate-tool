import React from 'react';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {
  FormSpace,
  FormContent,
} from '~/core/FormInputs';

import InputLinker from '~/utils/InputLinker';
import {
  propagateOnChangeEvent,
} from '~/utils/InputLinker/helpers';

import createFormPaperStyle from '~/styles/FormPaper';

const styles = theme => ({
  ...createFormPaperStyle(theme),
});

class SimpleLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      fields = [],
      namespace = '',
      defaultValues = {},
      ignoredUndefinedFromOutputs = true,
    } = props;

    this.il = new InputLinker(this, { namespace, ignoredUndefinedFromOutputs });
    this.il.add(...(fields.map(field => ({
      presets: [field, propagateOnChangeEvent()],
    }))));

    this.il.setDefaultValues(defaultValues);

    this.state = this.il.mergeInitState({});
  }

  handleSubmit = () => {
    const { onSubmit = () => {} } = this.props;
    if (this.il.validate()) {
      const outputs = this.il.getOutputs();
      onSubmit(outputs);
    }
  }

  render() {
    const {
      t: translate,
      classes,
      submitButtonText,
      children,
    } = this.props;

    return (
      <div>
        <FormSpace variant="top" />
        <FormContent>
          {
            this.il.fieldLinks.map((fieldLink) => {
              const space = 'space' in fieldLink.options ? fieldLink.options.space : <FormSpace variant="content1" />;
              return (
                <React.Fragment key={fieldLink.name}>
                  {this.il.renderComponent(fieldLink.name, { translate })}
                  {space}
                </React.Fragment>
              );
            })
          }
          <Button
            variant="contained"
            fullWidth
            color="primary"
            className={classes.loginBtn}
            onClick={this.handleSubmit}
          >
            {submitButtonText}
          </Button>
          <FormSpace variant="content1" />
        </FormContent>
        {children}
      </div>
    );
  }
}

export default compose(
  withTranslation(['app-common']),
  withStyles(styles),
)(SimpleLayout);
