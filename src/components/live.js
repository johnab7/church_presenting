import React, { useEffect, useState } from "react";


const Live = () => {
  const mc = new BroadcastChannel('mc');

  const [v, setV] = useState();

  useEffect(() => {
    mc.onmessage = message => setV(message.data);

  }, []);
  
  return (
    <div className="main"  scroll="no">
      <div className="om" dangerouslySetInnerHTML={{ __html: v }} />
    </div>
  );
}
export default Live;