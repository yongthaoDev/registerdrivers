import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import React from "react";
import useReactRouter from "use-react-router";
import { messageSuccess, messageWarning, valiDate } from "../helper";
import { CREATE_FEEDBACK } from "../pages/feedback/apollo";
export default function ActionSheet({ params }) {
  const { history, location } = useReactRouter();
  const [createFeedBack, { loading }] = useMutation(CREATE_FEEDBACK);
  return (
    <div>
      <button
        className="btn btn-success btn-lg mt-3 rounded-pill"
        data-toggle="modal"
        data-target="#actionSheetInset"
        style={{
          zIndex: "9999",
          position: "fixed",
          bottom: 10,
          right: 10,
          borderTopLeftRadius: 30,
        }}
      >
        <i class="icon-edit mr-1" /> ເພີ່ມເລື່ອງ
      </button>
      <Formik
          initialValues={{
            reportType: "",
            title: "",
            content: "",
            phone: "",
          }}
          validate={(values) => {
            console.log({values})
            const errors = {};
            if (!values.reportType) errors.reportType = "ກະລຸນາເລືອກຫົວເລື່ອງທີ່ຈະຮ້ອງຮຽນ";
            if (!values.title) errors.title = "ກະລຸນາປ້ອນຫົວຂໍ້ຮ້ອງຮຽນ";
            return errors;
          }}
          onSubmit={async (values) => {
            try {
              let _created = await createFeedBack({
                variables: {
                  data: {
                    reportType: String(values?.reportType),
                    title: String(values?.title),
                    content: String(values?.content),
                    phone: String(values?.phone),
                  },
                },
              });
              if(_created){
                messageSuccess("ສົ່ງຂໍ້ມູນຮ້ອງຮຽນສຳເລັດແລ້ວ");
                 window.location.reload()
              }
              
            } catch (error) {
              // console.log(error);
              messageWarning('ການດຳເນີນງານຜິດຜາດ ກະລຸນາກວດຄືນ')
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
      <div
        className="modal fade action-sheet inset"
        id="actionSheetInset"
        show="true"
        tabIndex={1}
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                ຟອມຮ້ອງຮຽນ ບໍລິສັດ ອານຸສິດ ໂລຈິສຕິກ
              </h5>
            </div>
            <div className="modal-body p-2">
              <form className="form-horizontal">
              <div className="form-group">
                        <label className="control-label">
                          ເບີໂທ{valiDate()}
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          placeholder="ປ້ອນເບີໂທເພື່ອຮັບການຕອບກັບ "
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                        />
                        <i className="text-danger mt-2">
                          {errors.phone && touched.phone && errors.phone}
                        </i>
                      </div>
                <div className="form-group">
                  <label className="control-label">ເລື່ອງທີ່ຮ້ອງຮຽນ{valiDate()}</label>
                  <select className="form-control" 
                    name="reportType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.reportType}
                  >
                    <option value="">ຫົວເລື່ອງ</option>
                    <option value="SYSTEM">ລະບົບ ແລະ ແອັບ</option>
                    <option value="COD">ການຮັບເງິນ COD</option>
                    <option value="REPLY">ການຕອບແຊັດ</option>
                    <option value="SERVICE">ການບໍລິການລູກຄ້າ</option>
                    <option value="LOST">ເຄື່ອງເສຍຫາຍ</option>
                    <option value="BROKED">ເຄື່ອງເປ່ເພ</option>
                    <option value="VEHICLE">ພາຫະນະ</option>
                  </select>
                  <i className="text-danger mt-2">{errors.reportType && touched.reportType && errors.reportType}</i>
                </div>
                <div className="form-group">
                  <label className="control-label">ຫົວຂໍ້ການຮ້ອງຮຽນ{valiDate()}</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="ຫົວຂໍ້ການຮ້ອງຮຽນ"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  <i className="text-danger mt-2">{errors.title && touched.title && errors.title}</i>
                </div>
                <div className="form-group">
                  <label className="control-label">ເນື້ອໃນການຮ້ອງຮຽນ</label>
                  <textarea
                    className="form-control"
                    rows="19"
                    placeholder="ເນື້ອໃນການຮ້ອງຮຽນ"
                    name="content"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.content}
                  ></textarea>
                </div>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="btn btn-block rounded btn-lg btn-primary"
                >
              <i className="icon-check-circle mr-1"/>    ບັນທຶກ
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
        )}
      </Formik>
    </div>
  );
}
