/* eslint-disable react/prop-types, react/forbid-prop-types, react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

const styles = theme => ({
});

class FormOutlinedSelect extends React.PureComponent {
  state = {
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  render() {
    const {
      id,
      name,
      label,
      helperText,
      formProps,
      inputProps,
      classes,
      children,
      ...rest
    } = this.props;
    return (
      <FormControl variant="outlined" {...formProps}>
        {!!label && (
          <InputLabel
            ref={(ref) => {
              this.InputLabelRef = ref;
            }}
            htmlFor={id}
          >
            {label}
          </InputLabel>
        )}
        <Select
          input={<OutlinedInput {...inputProps} labelWidth={this.state.labelWidth} name={name} id={id} />}
          {...rest}
        >
          {children}
        </Select>
        {!!helperText && (
          <FormHelperText id={`${id}-helper-text`}>
            XXXXX
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}

FormOutlinedSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
)(FormOutlinedSelect);
