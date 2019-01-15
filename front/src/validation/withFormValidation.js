import React, { Component } from 'react';

function validateField(value, rules) {
  return rules
    .reduce((acc, rule) => {
      const ruleValidation = rule(value);
      return {
        isValid: (acc.isValid && ruleValidation.isValid),
        errors: ruleValidation.errorMessage
          ? acc.errors.concat([ruleValidation.errorMessage])
          : acc.errors,
      };
    }, { isValid: true, errors: [] });
}

export default function withFormValidation(FormComponent, validationRules = {}) {
  return class WrapperComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        valid: true,
        fields: {},
      };
      this.validate = this.validate.bind(this);
      this.validateField = this.validateField.bind(this);
      this.resetFieldValidation = this.resetFieldValidation.bind(this);
    }

    validate(e) {
      e.preventDefault();

      const { fieldValues = {}, onSubmit } = this.props;

      const validation = Object.keys(fieldValues)
        .reduce((newState, fieldName) => {
          if (!(fieldName in validationRules)) return newState;
          const fieldValidation = validateField(fieldValues[fieldName], validationRules[fieldName]);
          return {
            valid: newState.valid && fieldValidation.isValid,
            fields: Object.assign({}, newState.fields, { [fieldName]: fieldValidation }),
          };
        }, { valid: true, fields: {} });

      this.setState(validation);

      if (validation.valid) {
        onSubmit(e);
      }
    }

    validateField(fieldName) {
      const { fieldValues } = this.props;
      const { fields } = this.state;
      const fieldValidation = validateField(fieldValues[fieldName], validationRules[fieldName]);
      this.setState({ fields: Object.assign({}, fields, { [fieldName]: fieldValidation }) });
    }

    resetFieldValidation(fieldName) {
      const { fields: { [fieldName]: deletedValidation, ...otherFields } } = this.state;
      this.setState({ fields: otherFields });
    }

    render() {
      const {
        onSubmit, fieldValues, children, ...otherProps
      } = this.props;
      const { fields } = this.state;

      const childs = React.Children.map(children, (child) => {
        const { name, onChange, onBlur } = child.props;

        if (!name) return child;

        const fieldValidation = fields[name];

        return React.cloneElement(child, {
          error: fieldValidation && !fieldValidation.isValid,
          helperText: fieldValidation && fieldValidation.errors.join('; '),
          onBlur: (e) => {
            this.validateField(name);
            if (onBlur) onBlur(e);
          },
          onChange: (e) => {
            this.resetFieldValidation(name);
            if (onChange) onChange(e);
          },
        });
      });

      return (
        <FormComponent onSubmit={this.validate} {...otherProps}>
          {childs}
        </FormComponent>
      );
    }
  };
}
