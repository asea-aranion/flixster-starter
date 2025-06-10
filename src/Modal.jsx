import { useRef } from "react";

const Modal = (props) => {
    const overlayRef = useRef(null);

    const handleOverlayClick = (event) => {
        if (event.target == overlayRef.current) {
            props.hideModal();
        }
    };

    return (
        <div
            className="overlay"
            ref={overlayRef}
            style={{ display: props.movie == null ? "none" : "block" }}
            onClick={handleOverlayClick}>
            <div className="modal"></div>
        </div>
    );
};

export default Modal;
