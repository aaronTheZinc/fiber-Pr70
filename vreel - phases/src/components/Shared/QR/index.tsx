import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { expandQR } from 'src/redux/createSlice/createMenuSlice';
import { RootState, useAppDispatch } from 'src/redux/store/store';
import Styles from './QR.module.scss';

const QR: React.FC = () => {
  const state = useSelector((state: RootState) => state.expandMenu.initQRState);
  const dispatch = useAppDispatch();

  return (
    <div
      className={clsx(Styles.qr, state ? Styles.qr__show : Styles.qr__hidden)}
    >
      <button onClick={() => dispatch(expandQR())} className={Styles.button}>
        X
      </button>
      <div className={Styles.container}>
        <h2 className={Styles.qr__title}>
          Avangard <br /> qr code
        </h2>
        <div className={Styles.qr__imageWrapper}>
          <img src='/assets/images/qr-lg.png' alt='QR image' />
        </div>
      </div>
    </div>
  );
};

export default QR;
