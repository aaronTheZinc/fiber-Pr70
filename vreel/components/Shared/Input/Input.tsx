import { Row } from "reactstrap";
import {IoGlobeOutline} from "react-icons/io5"
import {FiLayers, FiPhoneCall} from "react-icons/fi"
import {MdOutlineContactMail} from "react-icons/md"
import {RiGroup2Line, RiMailSendLine, RiShoppingCart2Line, RiSlideshow4Line, RiTicket2Line} from "react-icons/ri"
import {BsPersonPlus} from "react-icons/bs"

interface InputProps {
  value?: string;
  setValue?: (s: string) => void;
  placeHolder?: string;
  type?: string;
  style?: object;
  label?: string;
  // pattern: string;
}

export const PrimaryInput = ({
  value,
  setValue,
  placeHolder,
  type,
}: // pattern,
InputProps): JSX.Element => {
  return (
    <div className="vreel-input vreel-input__wrapper">
      <input
        // pattern={pattern}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeHolder}
      />
    </div>
  );
};
export const EditInput = ({
  value,
  setValue,
  placeHolder,
  type,
  style,
  label,
}: // pattern,
InputProps): JSX.Element => {
  return (
    <div className="vreel-input vreel-input__wrapper edit">
      <label htmlFor="edit">{label}:</label>
      <input
        style={style}
        name="edit"
        id="edit"
        // pattern={pattern}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeHolder}
      />
    </div>
  );
};

export const LinkButtons = ({
  value,
  setValue,
  placeHolder,
  type,
  style,
  label,
}: // pattern,
InputProps): JSX.Element => {
  return (
    <div className="vreel-input vreel-input__wrapper edit">
      <label className="checkbox-label" htmlFor="edit-checkbox">
        {label}:
      </label>
      <Row xs={5} className="vreel-input__linkRow">
        <button className="vreel-input__linkButton" onClick={(e) => {setValue("url")}} style={{background: value === "url" ? "#FF7A00" : "white"}} >
          <IoGlobeOutline color="black" size="32" />
          <p>URL</p>
        </button>
        <button className="vreel-input__linkButton" onClick={(e) => setValue("call")} style={{background: value === "call" ? "#FF7A00" : "white"}}>
          <FiPhoneCall color="black" size="32" />
          <p>Call</p>
        </button>
        <button className="vreel-input__linkButton" onClick={(e) => setValue("text")} style={{background: value === "text" ? "#FF7A00" : "white"}}>
          <MdOutlineContactMail color="black" size="32" />
          <p>Text</p>
        </button>
        <button className="vreel-input__linkButton" onClick={(e) => setValue("email")} style={{background: value === "email" ? "#FF7A00" : "white"}}>
          <RiMailSendLine color="black" size="32" />
          <p>Email</p>
        </button>
        <button className="vreel-input__linkButton" onClick={(e) => setValue("element")} style={{background: value === "element" ? "#FF7A00" : "white"}}>
          <FiLayers color="black" size="32" />
          <p>Element</p>
        </button>
        <button className="vreel-input__linkButton" onClick={(e) => setValue("slide")} style={{background: value === "slide" ? "#FF7A00" : "white"}}>
          <RiSlideshow4Line color="black" size="32" />
          <p>Slide</p>
        </button>
        <button className="vreel-input__linkButton" onClick={(e) => setValue("contact")} style={{background: value === "contact" ? "#FF7A00" : "white"}}>
          <BsPersonPlus color="black" size="32" />
          <p>Contact</p>
        </button>
        <button className="vreel-input__linkButton" onClick={(e) => setValue("ticket")} style={{background: value === "ticket" ? "#FF7A00" : "white"}}>
          <RiTicket2Line color="black" size="32" />
          <p>Ticket</p>
        </button>
        <button className="vreel-input__linkButton" onClick={(e) => setValue("group")} style={{background: value === "group" ? "#FF7A00" : "white"}}>
          <RiGroup2Line color="black" size="32" />
          <p>Group</p>
        </button>
        <button className="vreel-input__linkButton" onClick={(e) => setValue("product")} style={{background: value === "product" ? "#FF7A00" : "white"}} disabled>
          <RiShoppingCart2Line color="#bbbbbb" size="32" />
          <p>Product</p>
        </button>
      </Row>
      </div>
  )
}

export const CheckboxInput = ({
  value,
  setValue,
  placeHolder,
  type,
  style,
  label,
}: // pattern,
InputProps): JSX.Element => {
  return (
    <div className="vreel-input vreel-input__wrapper edit">
      <label className="checkbox-label" htmlFor="edit-checkbox">
        {label}:
      </label>
      <input
        style={style}
        name="edit-checkbox"
        id="edit-checkbox"
        // pattern={pattern}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};

// Secure Text Entry (Passwords)
export const SecretInput = ({
  value,
  setValue,
  placeHolder,
}: InputProps): JSX.Element => {
  return (
    <div>
      <input
        style={{ display: "none" }}
        type="password"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeHolder}
      />
    </div>
  );
};
