import Element from './Element';
import Styles from './Elements.module.scss';
import { elements } from './ElementsData';

const Elements: React.FC = () => {
  const activeElements = elements.filter((ele) => ele.active === true);
  const inactiveElements = elements.filter((ele) => ele.active === false);
  return (
    <div className={Styles.elements}>
      <div className={Styles.elements__left}>
        {/* ACTIVE ELEMENTS */}
        <div className={Styles.title}>Active Elements</div>
        <div className={Styles.element_container}>
          {activeElements.map((element, index) => (
            <Element key={index} element={element} />
          ))}
        </div>

        {/* INACTIVE ELEMENTS */}
        <div className={Styles.title}>Inactive Elements</div>
        <span className={Styles.sub_title}>Toggle To Activate Element</span>
        <div className={Styles.element_container}>
          {inactiveElements.map((element, index) => (
            <Element key={index} element={element} />
          ))}
        </div>
      </div>

      <div className={Styles.elements__right}>
        <h1>Preview</h1>
      </div>
    </div>
  );
};

export default Elements;
