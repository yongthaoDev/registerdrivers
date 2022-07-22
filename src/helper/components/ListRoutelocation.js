import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { currency, loadingData } from "..";
import { LIST_ROUTE_LOCATION } from "./apollo";
import "./utils/index.css";

export default function ListRouteLocation({
  style,
  className,
  defaultValue,
  size,
  getData,
  where,
  disabled,
}) {
  const inputSize =
    size === "lg"
      ? "form-control-lg"
      : size === "sm"
      ? "form-control-sm"
      : "form-control-md";
  const [searchValue, setSearchValue] = useState();
  const [show, setShow] = useState(false);
  const [fetchData, { data, loading }] = useLazyQuery(LIST_ROUTE_LOCATION);

  useEffect(() => {
    fetchData({
      variables: {
        where: {
          title: searchValue ? searchValue : undefined,
          isPublic: 1,
          ...where,
        },
        noLimit: true,
      },
    });
  }, [searchValue, where]);
  const handleClick = (value) => {
    if (!value && getData) {
      getData(null);
      setShow(false);
      return;
    }

    try {
      const result = data?.routeLocationDrivers?.data?.filter(
        (obj) => obj?.title === value
      );

      if (result.length > 0 && getData) {
        getData(result[0]);
        setShow(false);
      }
    } catch (error) {
      if (getData) getData();
    }
  };

  return (
    <React.Fragment>
      <input
        type={"button"}
        className={`form-control text-left ${inputSize} ${className}`}
        style={{ opacity: defaultValue ? 1 : 0.3 }}
        value={defaultValue ? defaultValue : "ເລືອກສາຍລົດ"}
        onClick={() => setShow(true)}
        disabled={disabled}
      />
      <Modal
        show={show}
        centered
        style={style}
        className={className}
        onHide={() => setShow(false)}
        animation={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-5">ເລືອກເລືອກສາຍລົດ</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <div class="form-group mb-2">
            <input
              type={"search"}
              className="form-control form-control-lg"
              onChange={(e) => setSearchValue(e.target.value)}
              onInput={(e) => {
                if (!e.target.value && getData) getData();
              }}
              placeholder="ຄົ້ນຫາສາຍແລ່ນ"
            />
          </div>
          {loading ? (
            <center>{loadingData(25, "ກຳລັງໂຫຼດຂໍ້ມູນ...")}</center>
          ) : (
            <div className="mt-2">
              {data?.routeLocationDrivers?.data?.map((data, index) => (
                <div
                  className="d-flex "
                  key={index}
                  onClick={() => handleClick(data?.title)}
                >
                  <table className="table">
                    <tr>
                      <td
                        className="text-left fs-6 text-black"
                        style={{
                          borderTop: "1px solid white",
                          borderBottom: "1px solid #d9d8f0",
                        }}
                      >
                        <i className="fa-solid fa-truck me-1 text-danger"></i>
                        {data?.title}
                      </td>
                      <td
                        className="text-right fs-6 text-black"
                        style={{
                          borderTop: "1px solid white",
                          borderBottom: "1px solid #d9d8f0",
                        }}
                      >
                        {data?.priceDay ? (
                          <>
                            ລາຄາຕໍ່ຖ່ຽວ ກະເຊົ້າ:{" "}
                            <b className="text-success">
                              {currency(data?.priceDay ? data?.priceDay : "")}
                            </b>{" "}
                            ກີບ
                          </>
                        ) : null}
                        {data?.priceNight ? (
                          <>
                            ລາຄາຕໍ່ຖ່ຽວ ກະແລງ:{" "}
                            <b className="text-warning">
                              {currency(
                                data?.priceNight ? data?.priceNight : ""
                              )}{" "}
                            </b>
                            ກີບ
                          </>
                        ) : null}
                      </td>
                    </tr>
                  </table>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
