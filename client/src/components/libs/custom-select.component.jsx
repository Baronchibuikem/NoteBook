import React from "react";
import { FormControl, FormHelperText, makeStyles } from "@material-ui/core";
import { string, bool, node, func } from "prop-types";

const useStyles = makeStyles({
  root: {
    background: "#fff",
    fontSize: "13px",
    borderRadius: 3,
    borderColor: "#ddd",
    height: 40,
    marginTop: "0px",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "#f9f9f9",
    },
  },
  wrapper: {},
  formControl: {
    marginTop: "0px",
  },
});

export const CustomSelect = ({
  name,
  error,
  label,
  disabled = false,
  customRef,
  multiple = false,
  onChange = () => {},
  children,
  fullWidth = true,
  width,
  placeholder = "",
  value = "",
}) => {
  const classes = useStyles();
  return (
    <FormControl
      // classes={{ formControl: classes.formControl }}
      variant="outlined"
      error={!!error}
      fullWidth
      style={{ width: width }}
      className={classes.wrapper}
    >
      <label
        style={{ fontSize: "10px", color: "rgba(50,50,50,0.8)" }}
        htmlFor={name}
      >
        {label}
      </label>
      <select
        name={name}
        label={name}
        disabled={disabled}
        onChange={onChange}
        multiple={multiple}
        // color="primary"
        style={{
          width: width,
          paddingLeft: "10px",
          background: "#fff",
          borderRadius: 3,
          borderColor: "rgba(50, 50, 50, 0.3)",
          height: 50,
          marginTop: "0px",
          "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "#f9f9f9",
            borderColor: "#323232",
          },
          fontSize: "0.9rem",
        }}
        ref={customRef}
        value={value}
      >
        {children}
      </select>
      {error && (
        <FormHelperText id={`${name}-component-error-text`}>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

CustomSelect.propTypes = {
  name: string,
  fullWidth: bool,
  disabled: bool,
  width: string,
  multiple: bool,
  children: node,
  error: string,
  onChange: func,
  placeholder: string,
  value: string,
};

export default CustomSelect;
