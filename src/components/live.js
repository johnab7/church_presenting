import React, { useEffect, useState } from "react";

const mc = new BroadcastChannel('mc');

const Live = () => {

  const [v, setV] = useState();
  const [s, setS] = useState();

  function r (){
    setS(JSON.parse(localStorage.getItem("s")))

  }


  useEffect(() => {
    r()
    mc.onmessage = message => {
      if (message.data === 1) {
        r()
        console.log(message.data)

      }
      else {
        console.log(message.data)
        setV(message.data)
      }
    };

  }, []);

  return (
    <div className="main" style={s && {color: s.tc, background:`url(${s.bi}) no-repeat center center fixed`,backgroundSize: "100% 100%"}} scroll="no">
      <div className="om" dangerouslySetInnerHTML={{ __html: v }} />
    </div>
  );
}
export default Live;