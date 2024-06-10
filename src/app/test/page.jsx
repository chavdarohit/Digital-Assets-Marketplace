"use client"

import React, { useState } from "react";

const page = () => {
  const [name, setName] = useState("");
  const handleClick = () => {
    console.log("clicked")
  }
  return <div style={{marginTop:"200px", display:"flex", flexDirection:"column", border:"2px solid green"}}>
    <form action="">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{height:"50px", width:"50px", border:"2px solid red"}}/>
      <button type="submit" onClick={handleClick}>submit</button>
    </form>
  </div>;
};

export default page;
