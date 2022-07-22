import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./bottomNav.css";

export default function BottomNav() {
  return (
    <div className="appBottomMenu pb-2" style={{ height: 60, paddingTop: 10, backgroundColor:"#f0f0f5" }}>
      <NavLink className="item" to="/history/list">
        <div className="col pt-1">
          <i class="icon-format_list_bulleted" style={{ fontSize: 25 }}></i>
          <strong className="text-black" style={{ fontSize: 15 }}>
            ການເຄື່ອນໄຫວ
          </strong>
        </div>
      </NavLink>
      <NavLink className="item" to="/home">
        <div className="col pt-1">
          <i className="icon-home" style={{ fontSize: 25 }} />
          <strong className="text-black" style={{ fontSize: 15 }}>
            ໜ້າຫຼັກ
          </strong>
        </div>
      </NavLink>
      <NavLink className="item" to="/profile">
        <div className="col pt-1">
          <i className="icon-user" style={{ fontSize: 25 }} />
          <strong className="text-black" style={{ fontSize: 15 }}>
            ໂປຣໄຟລ໌
          </strong>
        </div>
      </NavLink>
    </div>
  );
}
