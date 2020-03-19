import React from 'react';
import { compose } from 'recompose';
import InputFormDialog from '~/core/Dialogs/InputFormDialog';
import { withStyles } from '@material-ui/core/styles';
import Chip from './Chip';

const styles = theme => ({
  chip: {
    margin: 2,
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class DialogWithChips extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      controlled: !!props.value,
      data: {},
    };
  }

  handleClose = (data) => {
    if (data) {
      this.setState({ data });
    }

    const { onClose } = this.props;
    if (onClose) {
      onClose(data);
    }
  }

  handleDeleteChip = (k, v) => () => {
    const { onDeleteChip, value } = this.props;
    const { controlled, data } = this.state;
    const chipDataSource = (controlled ? value : data) || {};
    if (!controlled) {
      const newData = { ...chipDataSource };
      delete newData[k];
      this.setState({ data: newData });
    }
    if (onDeleteChip) {
      onDeleteChip(k, v, chipDataSource);
    }
  }

  defaultRenderChip = classes => ({
    key,
    value,
    keyArray,
    index,
    map,
    handleDeleteChip,
  }) => (
    <Chip
      key={key}
      label={`${key}:${value}`}
      onDelete={handleDeleteChip}
      className={classes.chip}
    />
  )

  render() {
    const {
      classes,
      open,
      fields,
      value,
      defaultValue,
      renderChip,
      ...rest
    } = this.props;

    const { controlled, data } = this.state;
    const chipDataSource = (controlled ? value : data) || {};
    const defaultValuesSource = (controlled ? value : defaultValue) || {};
    const renderChipFunction = renderChip || this.defaultRenderChip(classes);

    return (
      <React.Fragment>
        <div className={classes.chipContainer}>
          {
            Object.keys(chipDataSource).map((key, index, keyArray) => {
              const handleDeleteChip = this.handleDeleteChip(key, value);
              const result = renderChipFunction({
                key,
                value: chipDataSource[key],
                index,
                keyArray,
                map: chipDataSource,
                handleDeleteChip,
              });
              if (!result) {
                return null;
              }

              if (typeof result === 'string') {
                return (
                  <Chip
                    key={key}
                    label={result}
                    onDelete={handleDeleteChip}
                    className={classes.chip}
                  />
                );
              }

              if (React.isValidElement(result)) {
                return result;
              }

              if (result.label) {
                return (
                  <Chip
                    {...result.props}
                    key={key}
                    label={result.label}
                    onDelete={handleDeleteChip}
                    className={classes.chip}
                  />
                );
              }

              return null;
            })
          }
        </div>
        {open && (
          <InputFormDialog
            open={open}
            onClose={this.handleClose}
            fields={fields}
            defaultValues={defaultValuesSource}
            {...rest}
          />
        )}
      </React.Fragment>
    );
  }
}

export default compose(
  withStyles(styles),
)(DialogWithChips);
