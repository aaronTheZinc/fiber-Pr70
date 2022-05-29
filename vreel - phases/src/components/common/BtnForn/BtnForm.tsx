import React from "react";
import Styles from "./BtnForm.module.scss";

const BtnForm: React.FC<{
  title: string;
  type: any;
  customClass?: string;
  formik?: any;
}> = ({ title, type, customClass, formik }) => {
  return (
    <button
      type={type}
      className={Styles.btnForm}
      // disabled={!formik.isValid || formik.isSubmitting}
    >
      {title}
    </button>
  );
};

export default BtnForm;
