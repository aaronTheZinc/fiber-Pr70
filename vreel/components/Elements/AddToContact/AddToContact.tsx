import React, { useState } from "react";
import { loginUser, registerUser } from "../../../graphql";
import { PrimaryButton, PrimaryInput, SecretInput } from "../../index";
import { useRouter } from "next/router";

interface FormDataType {
  name: string;
  phone: string;
  email: string;
}

const AddToContact = (): JSX.Element => {
  const [userFormData, setUserFormData] = useState<FormDataType>({
    email: "",
    name: "",
    phone: ""
  });
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const router = useRouter();

  const { username } = router.query
  const submitForm = async (e) => {
    try {
      e.preventDefault();

      const { email, name, phone } = userFormData;

      const response = await addToContact(email, name, phone);
      
      console.log(response);

      // console.log("data", data);
    } catch (err) {
      console.error("ERROR WITH ADD TO CONTACT:", err);
    }
  };

  return (
    <div
      style={{ height: "100%", background: '#000', padding: '30px 0px 40px' }}
      className="d-flex flex-column justify-content-center align-items-center vreel-add-to-contact-form"
    >
      <img src="/vreel-logo.png" alt="Vreel Logo" width="60" height="60" />
      <h1>Join {username ? `${username[0].toUpperCase() + username.slice(1) + "'s"}` : 'Our'} Contact List</h1>
      <form onSubmit={submitForm} className="vreel-add-to-contact-form__wrapper">
        <PrimaryInput
          setValue={setEmail}
          placeHolder="Email"
          value={email}
          type="email"
        />
        <PrimaryInput
          setValue={setName}
          placeHolder="Name"
          value={name}
          type="text"
        />
        <PrimaryInput
          setValue={setPhone}
          placeHolder="Phone (123-456-7890)"
          value={phone}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
          type="tel"
        />

        <div>
          <p>
            By clicking register you agree to VReel’s{" "}
            <a href="#">Privacy policy</a> and <a href="#">Terms of service</a>
          </p>
          <PrimaryButton
            type="submit"
            action={() => {
              if (!email)
                return alert("Email is Required");
              setUserFormData({
                email,
                name,
                phone
              });
            }}
            title="Add To Contact List"
          />
        </div>
      </form>
    </div>
  );
};

export default AddToContact;
