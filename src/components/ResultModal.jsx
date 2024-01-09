import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { onReset, remainingTime, targetTime },
  ref
) {
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = remainingTime / 1000;
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>you Lost</h2>}
      {!userLost && <h2>your score : {score}</h2>}
      <p>
        the target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        you stopped the timer with{" "}
        <strong>
          {formattedRemainingTime} second{formattedRemainingTime > 1 ? "s" : ""}{" "}
          left
        </strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
