import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    const wrap = document.querySelector(".loader-wrap");
    if (wrap) wrap.classList.add("done");
  }, []);
  return (
    <div className="loader-wrap">
      <div className="spinner" />
    </div>
  );
}
