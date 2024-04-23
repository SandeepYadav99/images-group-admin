import React from "react";
import CountryPhone from "../country/index";


const CustomCountryFC = ({
  value,
  error,
  country_code,
  input,
  helperText,
  type,
  isError,
  errorText,
  label,
  onTextChange,

}) => {
  return (
    <div
      style={{
        marginTop: "8px",
        marginBottom: "4px",
        position: "relative",
      }}
    >
      <CountryPhone
        {...input}
        inputProps={
          {
            //     name: input?.name,
            //     onBlur: input?.onBlur,
            //     onChange: (e, text) => { onTextChange && onTextChange(e?.target?.value) },
            //     onDragStart: input?.onDragStart,
            //     onDrop: input?.onDrop,
            //     onFocus: input?.onFocus,
          }
        }
        placeholder={label}
        inputStyle={isError ? { borderColor: "red" } : {}}
        country={country_code ? country_code.toLowerCase() : "in"}
        value={value}
        onChange={(text) => {
          onTextChange && onTextChange(text);
        }}
      />
      {errorText ?
      <p
        style={{
          color: "#f44336",
          right: "0px",
          bottom: "-10px",
          margin: "0px",
          position: "absolute",
          marginLeft: "5px",
          fontSize: "0.60rem",
        }}
      >

        {errorText}
      </p>: <p></p>}
    </div>
  );
}

export default CustomCountryFC;
