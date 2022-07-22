import React from "react";
import useReactRouter from "use-react-router";
export default function ActionHistory({ params, index }) {
  const { history, location } = useReactRouter();
  return (
    <div>
      <div
        className="modal fade action-sheet inset"
        show="true"
        tabIndex={1}
        id={`actionSheetInset${index}`}
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header  ">
              <h5 className="modal-title">ເລືອກຂໍ້ມູນທີ່ຕ້ອງການຈັດການ</h5>
            </div>
            <div className="modal-body">
              <ul className="action-button-list">
                <li className="border">
                  <a
                    href="javascript:void(0)"
                    className="btn btn-list"
                    data-dismiss="modal"
                    onClick={() => history.push(`/history/timeline/${params}`)}
                  >
                    <span>ເບີ່ງລາຍລະອຽດເຄື່ອງ</span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)" className="btn btn-list" data-dismiss="modal">
                    <span>ສະຫຼຸບບິນ</span>
                  </a>
                </li>
                <li className="action-divider" />
                <li>
                  <a
                   href="javascript:void(0)"
                    className="btn btn-list text-danger "
                    data-dismiss="modal"
                    style={{ textAlign: "center", justifyContent: "center" }}
                  >
                    <span>ປິດ</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
