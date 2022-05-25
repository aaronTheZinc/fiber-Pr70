import React from "react";

type Props = {};

const BtnForm: React.FC<{
  title: string;
  type: any;
  customClass?: string;
  formik: any;
}> = ({ title, type, customClass, formik }) => {
  return (
    <button
      type={type}
      className={`bg-secondary px-3 py-2 w-full rounded-full font-medium text-2xl text-white hover:bg-secondary/70 transition-all duration-300 ${customClass}`}
      disabled={!formik.isValid || formik.isSubmitting}
    >
      {title}
    </button>
  );
};

export default BtnForm;
