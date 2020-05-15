import React from "react";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return(<div><h1>{props.name}</h1></div>)
}

export default Header