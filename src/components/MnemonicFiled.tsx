import { useState, useEffect, useRef, useCallback } from 'react';
import { MdContentCopy, MdQrCode } from 'react-icons/md';

import useInfoPopupStore from './InfoPopup.store';
import useQRCodeModalStore from './QRCodeModal.store';

import MnemonicFiledCSS from './MnemonicFiled.module.css';

type Props = {
  bip39: string;
  xmr?: string;
};

const MnemonicFiled = ({ bip39, xmr }: Props) => {
  const [isXMR, setIsXMR] = useState(Boolean(xmr));
  useEffect(() => {
    setIsXMR(Boolean(xmr));
  }, [xmr]);

  const { openPopup } = useInfoPopupStore();
  const handleCopy = useCallback(() => {
    const value = isXMR ? xmr : bip39;
    if (!value) return;

    navigator.clipboard
      .writeText(value)
      .then(() => {
        openPopup('copied', 'success', 1000);
      })
      .catch(error => {
        console.error('Failed to copy text: ', error);
        openPopup('failed to copy', 'error', 1000);
      });
  }, [isXMR, bip39, xmr, openPopup]);

  const spanRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const currentSpan = spanRef.current;
    const copy = (e: ClipboardEvent) => {
      e.preventDefault();
      handleCopy();
    };

    currentSpan?.addEventListener('copy', copy);
    return () => {
      currentSpan?.removeEventListener('copy', copy);
    };
  }, [handleCopy]);

  const { openQRCodeModal } = useQRCodeModalStore();
  const handleQR = () => {
    const value = isXMR ? xmr : bip39;
    if (!value) return;

    openQRCodeModal(value);
  };

  return (
    <div className={MnemonicFiledCSS.container}>
      <header style={xmr ? { marginBottom: '0.4rem' } : {}}>
        <label className={MnemonicFiledCSS.label}>Mnemonic Seed</label>
        {xmr && (
          <button
            className={MnemonicFiledCSS.switch}
            aria-pressed={isXMR}
            aria-label={isXMR ? 'show bip39 mnemonic' : 'show xmr mnemonic'}
            onClick={() => setIsXMR(!isXMR)}
          >
            <span className={MnemonicFiledCSS.xmr}>XMR</span>
            <span className={MnemonicFiledCSS.bip}>BIP</span>
          </button>
        )}
      </header>
      <section className={MnemonicFiledCSS.box}>
        <span ref={spanRef} className={MnemonicFiledCSS.text}>
          {isXMR ? xmr : bip39}
        </span>
        <div className={MnemonicFiledCSS.buttons}>
          <button
            className={MnemonicFiledCSS.btn}
            aria-label="show QR code"
            onClick={handleQR}
          >
            <MdQrCode />
          </button>
          <button
            className={MnemonicFiledCSS.btn}
            aria-label="Copy text"
            onClick={handleCopy}
          >
            <MdContentCopy />
          </button>
        </div>
      </section>
    </div>
  );
};

export default MnemonicFiled;
