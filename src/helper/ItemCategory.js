import { useEffect, useState } from "react";
import { currency } from "../helper";

const items = [
  { value: "CUSTOM", title: "ກຳນົດເອງ", price: 8000 },
  { value: "WAVE100", title: "ລົດຈັກ WAVE100", price: 250000 },
  { value: "CLICK-I", title: "ລົດຈັກ CLICK-I", price: 300000 },
  { value: "FINO", title: "ລົດຈັກ FINO", price: 300000 },
  { value: "SCOOPY", title: "ລົດຈັກ SCOOPY", price: 300000 },
  { value: "PCX", title: "ລົດຈັກ PCX", price: 400000 },
  { value: "BIG_BIKE", title: "ລົດຈັກ Big Bike", price: 600000 },
  { value: "ELECTRIC_BICYCLE", title: "ລົດໄຟຟ້າ", price: 200000 },
  { value: "BICYCLE_SMALL", title: "ລົດຖີບ (ນ້ອຍ)", price: 60000 },
  { value: "BICYCLE_MEDIUM", title: "ລົດຖີບ (ກາງ)", price: 80000 },
  { value: "BICYCLE_LARGE", title: "ລົດຖີບ (ໃຫຍ່)", price: 100000 },
  { value: "DOCUMENT_FINAL", title: "ເອກະສານສະບັບ Copy", price: 15000 },
  { value: "DOCUMENT_COPY", title: "ເອກະສານສະບັບແທ້", price: 25000 },
  { value: "SOFA_SMALL", title: "ໂຊຟາ (ນ້ອຍ)", price: 150000 },
  { value: "SOFA_BIG", title: "ໂຊຟາ (ໃຫຍ່)", price: 200000 },
  { value: "MAT_SMALL", title: "ເສື່ອນອນ (ນ້ອຍ)", price: 120000 },
  { value: "MAT_BIG", title: "ເສື່ອນອນ (ໃຫຍ່)", price: 160000 },
];

export default function ItemCategory({ onChange, defaultState, onClick }) {
  const [showDrpCategory, setShowDrpCategory] = useState({
    value: "CUSTOM",
    title: "ກຳນົດເອງ",
    price: 8000,
  });

  useEffect(() => {
    if (onChange && showDrpCategory?.value) {
      onChange(showDrpCategory);
    }

    const docClick = (e) => {
      if (!e.target.closest(".item-category-out")) {
        setShowDrpCategory({ ...showDrpCategory, show: false });
      }
    };
    document.addEventListener("click", docClick);
    return () => {
      document.removeEventListener("click", docClick);
    };
  }, [showDrpCategory]);

  return (
    <div className="item-category-out">
      <div
        className="form-control d-flex justify-content-between user-select-none"
        onClick={() => {
          if (showDrpCategory?.show) {
            setShowDrpCategory({ ...showDrpCategory, show: false });
          } else {
            setShowDrpCategory({ ...showDrpCategory, show: true });
          }
        }}
      >
        <span>{defaultState?.title}</span>
        <label>ຄ່າສົ່ງ: {currency(defaultState?.price)} ກີບ</label>
      </div>
      {showDrpCategory?.show && (
        <div className="p-0 item-category-inner">
          {items?.map((item, index) => (
            <div
              key={index}
              className="item-category-list"
              onClick={() => {
                setShowDrpCategory({
                  title: item?.title,
                  value: item?.value,
                  price: item?.price,
                });
                if (onClick) {
                  onClick(item);
                }
              }}
            >
              {/* <span>
                {item?.value === showDrpCategory?.value && (
                  <i className="fas fa-check me-1" />
                )}
                {item?.title}
              </span> */}
              <table className="table ">
                <tr>
                  <td className="text-left fs-6 text-black " style={{marginBottom:"-40px"}}>
                    <i class="fa-solid fa-gift text-danger mr-2"></i>
                    {item?.title}
                  </td>
                  <td className="text-right fs-6 text-black">
                    {currency(item?.price)} ກີບ
                  </td>
                </tr>
              </table>
              {/* <label>ຄ່າສົ່ງ: {currency(item?.price)} ກີບ</label> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
